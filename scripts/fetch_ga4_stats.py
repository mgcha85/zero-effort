#!/usr/bin/env python3
"""
Fetch GA4 stats via CDP or return latest snapshot.
"""
import asyncio
import re
import json
import sys

async def get_ga4_stats():
    from playwright.async_api import async_playwright
    try:
        async with async_playwright() as p:
            browser = await p.chromium.connect_over_cdp('http://localhost:9222')
            context = browser.contexts[0]
            page = await context.new_page()
            await page.goto('https://analytics.google.com/analytics/web/#/a410584264p557257002/reports/intelligenthome', timeout=15000)
            await page.wait_for_timeout(6000)

            content = await page.content()
            text = await page.inner_text('body')
            await page.close()

            # Extract Active users and Events
            # Patterns like "활성 사용자\s*(\d+)", "이벤트 수\s*(\d+)", "새 사용자 수\s*(\d+)"
            active_users = "0"
            new_users = "0"
            events = "0"

            m_active = re.search(r'활성 사용자[^\d]*(\d+)', content)
            if m_active:
                active_users = m_active.group(1)

            m_new = re.search(r'새 사용자 수[^\d]*(\d+)', content)
            if m_new:
                new_users = m_new.group(1)

            m_events = re.search(r'이벤트 수[^\d]*(\d+)', content)
            if m_events:
                events = m_events.group(1)

            # Extract Page breakdown
            pages_breakdown = []
            lines = text.split('\n')
            for i, l in enumerate(lines):
                if '페이지 제목 및 화면 클래스\t조회수' in l or '페이지 제목 및 화면 클래스' in l:
                    # Next few lines contain rows
                    for offset in range(1, 10):
                        if i + offset < len(lines):
                            row = lines[i + offset].strip()
                            if '\t' in row:
                                parts = row.split('\t')
                                if len(parts) >= 2 and parts[1].isdigit():
                                    pages_breakdown.append({'title': parts[0], 'views': int(parts[1])})
                            elif '페이지 및 화면 보기' in row:
                                break
                    break

            return {
                'active_users': active_users,
                'new_users': new_users,
                'events': events,
                'pages': pages_breakdown,
                'status': 'success'
            }
    except Exception as e:
        return {'status': 'error', 'error': str(e)}

if __name__ == '__main__':
    res = asyncio.run(get_ga4_stats())
    print(json.dumps(res, ensure_ascii=False))
