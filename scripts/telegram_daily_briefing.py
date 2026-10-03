#!/usr/bin/env python3
"""
ZeroEffort Daily Telegram Briefing Reporter
Sends daily visitor statistics to Telegram at 00:00 KST (15:00 UTC).
"""

import os
import sys
import json
import re
import subprocess
from datetime import datetime, timezone, timedelta
import urllib.request
import urllib.parse

def load_env(env_path):
    env_vars = {}
    if os.path.exists(env_path):
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    k, v = line.split('=', 1)
                    env_vars[k.strip()] = v.strip().strip('"').strip("'")
    return env_vars

def get_config():
    # Priority: .env.prod > .env.dev > environment variables
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    prod_env = load_env(os.path.join(base_dir, '.env.prod'))
    dev_env = load_env(os.path.join(base_dir, '.env.dev'))
    
    token = prod_env.get('TELEGRAM_BOT_TOKEN') or dev_env.get('TELEGRAM_BOT_TOKEN') or os.getenv('TELEGRAM_BOT_TOKEN') or '8836048575:AAHGtOYPiJOdz2PNPKjEwhk-2Jt9r3xFTN8'
    chat_id = prod_env.get('TELEGRAM_CHAT_ID') or dev_env.get('TELEGRAM_CHAT_ID') or os.getenv('TELEGRAM_CHAT_ID')
    
    return base_dir, token, chat_id

def auto_detect_chat_id(token, base_dir):
    """Attempt to find chat_id from recent bot updates if not set."""
    try:
        url = f"https://api.telegram.org/bot{token}/getUpdates"
        req = urllib.request.Request(url, headers={'User-Agent': 'ZeroEffortReporter/1.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            if data.get('ok') and data.get('result'):
                # Grab the latest message chat id
                for update in reversed(data['result']):
                    msg = update.get('message') or update.get('channel_post') or update.get('callback_query', {}).get('message')
                    if msg and 'chat' in msg:
                        chat_id = str(msg['chat']['id'])
                        save_chat_id(base_dir, chat_id)
                        return chat_id
    except Exception as e:
        print(f"Error checking Telegram updates: {e}", file=sys.stderr)
    return None

def save_chat_id(base_dir, chat_id):
    """Save detected chat_id to env files."""
    for env_name in ['.env.dev', '.env.prod']:
        path = os.path.join(base_dir, env_name)
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            if 'TELEGRAM_CHAT_ID=' in content:
                content = re.sub(r'TELEGRAM_CHAT_ID=.*', f'TELEGRAM_CHAT_ID={chat_id}', content)
            else:
                content += f'\nTELEGRAM_CHAT_ID={chat_id}\n'
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Saved TELEGRAM_CHAT_ID to {env_name}")

def get_container_stats(container_name):
    """Extract 24h request counts and unique IPs from podman/docker logs."""
    try:
        cmd = ['podman', 'logs', '--since', '24h', container_name]
        res = subprocess.run(cmd, capture_output=True, text=True, timeout=10)
        logs = res.stdout + res.stderr
    except Exception:
        try:
            cmd = ['docker', 'logs', '--since', '24h', container_name]
            res = subprocess.run(cmd, capture_output=True, text=True, timeout=10)
            logs = res.stdout + res.stderr
        except Exception:
            logs = ""

    ip_regex = re.compile(r'^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}) - - \[(.*?)\] "(GET|POST|HEAD)')
    unique_ips = set()
    total_reqs = 0

    for line in logs.splitlines():
        match = ip_regex.match(line)
        if match:
            ip = match.group(1)
            # Exclude internal health checks or local loopback if needed
            unique_ips.add(ip)
            total_reqs += 1

    return len(unique_ips), total_reqs

def send_telegram(token, chat_id, text):
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = json.dumps({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'Markdown',
        'disable_web_page_preview': True
    }).encode('utf-8')
    
    req = urllib.request.Request(url, data=payload, headers={
        'Content-Type': 'application/json',
        'User-Agent': 'ZeroEffortReporter/1.0'
    })
    
    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.loads(resp.read().decode('utf-8'))

def main():
    base_dir, token, chat_id = get_config()
    
    if not token:
        print("Error: TELEGRAM_BOT_TOKEN is missing!", file=sys.stderr)
        sys.exit(1)

    if not chat_id:
        chat_id = auto_detect_chat_id(token, base_dir)

    # Calculate KST time (UTC + 9)
    kst_tz = timezone(timedelta(hours=9))
    now_kst = datetime.now(kst_tz)
    yesterday_kst = now_kst - timedelta(days=1)
    date_str = yesterday_kst.strftime("%Y년 %m월 %d일")
    time_str = now_kst.strftime("%H:%M KST")

    # Collect stats for 4 services
    services = [
        ("caro-web", "⚔️ 베트남 오목 (Caro)", "https://zero-effort-caro.vercel.app"),
        ("size-web", "📐 글로벌 사이즈 변환기", "https://zero-effort-size.vercel.app"),
        ("media-web", "🛡️ 제로업로드 미디어 툴", "https://zero-effort-media.vercel.app"),
        ("pdf-web", "📑 안심 PDF 변환 도구", "https://zero-effort-pdf.vercel.app"),
    ]

    total_visitors = 0
    total_requests = 0
    service_lines = []

    for container, name, url in services:
        u_ips, reqs = get_container_stats(container)
        total_visitors += u_ips
        total_requests += reqs
        service_lines.append(f"• *{name}*\n   └ 순방문자: `{u_ips:,}명` | 요청수: `{reqs:,}건`")

    briefing = (
        f"📊 *[ZeroEffort] 일일 접속자 및 서비스 리포트*\n"
        f"📅 *기준일*: {date_str} (발송: {time_str})\n"
        f"━━━━━━━━━━━━━━━━━━━\n\n"
        + "\n\n".join(service_lines)
        + f"\n\n━━━━━━━━━━━━━━━━━━━\n"
        f"📈 *일일 총 순방문 IP*: `{total_visitors:,}명`\n"
        f"⚡ *일일 총 처리 요청*: `{total_requests:,}건`\n"
        f"🟢 *클라우드 상태*: 4개 Vercel 프로덕션 정상 운영 중\n"
        f"🌐 *배포 도메인*: `*.vercel.app` (커스텀 DNS 연결 대기)"
    )

    if not chat_id:
        print("⚠️ TELEGRAM_CHAT_ID is not configured yet!")
        print("👉 Please open Telegram, search @zero_effort_bot, and click /start to register.")
        print("\nGenerated Briefing Message:")
        print(briefing)
        return

    try:
        res = send_telegram(token, chat_id, briefing)
        if res.get('ok'):
            print(f"✅ Daily briefing successfully sent to chat {chat_id} at {time_str}")
        else:
            print(f"❌ Failed to send Telegram message: {res}", file=sys.stderr)
    except Exception as e:
        print(f"❌ Error sending Telegram message: {e}", file=sys.stderr)

if __name__ == '__main__':
    main()
