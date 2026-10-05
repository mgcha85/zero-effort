#!/usr/bin/env python3
"""
IndexNow URL Submission Script for MiniToolbox.dev
Pushes all hub and sub-app URLs directly to Bing, Copilot, SearchGPT, and IndexNow network.
"""
import urllib.request
import json
import sys

def main():
    payload = {
        'host': 'minitoolbox.dev',
        'key': 'c8d19572b4f3465780a1e459db4b86e1',
        'keyLocation': 'https://minitoolbox.dev/c8d19572b4f3465780a1e459db4b86e1.txt',
        'urlList': [
            'https://minitoolbox.dev/',
            'https://minitoolbox.dev/llms.txt',
            'https://minitoolbox.dev/llms-full.txt',
            'https://minitoolbox.dev/sitemap.xml',
            'https://pdf.minitoolbox.dev/',
            'https://media.minitoolbox.dev/',
            'https://schengen.minitoolbox.dev/',
            'https://visarun.minitoolbox.dev/',
            'https://anmeldung.minitoolbox.dev/',
            'https://rirekisho.minitoolbox.dev/',
            'https://size.minitoolbox.dev/',
            'https://timesync.minitoolbox.dev/',
            'https://qr.minitoolbox.dev/',
            'https://invoice.minitoolbox.dev/',
            'https://exif.minitoolbox.dev/',
            'https://caro.minitoolbox.dev/'
        ]
    }

    data = json.dumps(payload).encode('utf-8')
    endpoints = [
        'https://api.indexnow.org/indexnow',
        'https://www.bing.com/indexnow'
    ]

    for ep in endpoints:
        try:
            req = urllib.request.Request(
                ep,
                data=data,
                headers={'Content-Type': 'application/json; charset=utf-8'}
            )
            with urllib.request.urlopen(req, timeout=10) as resp:
                print(f"[{ep}] HTTP {resp.status} - Submitted successfully!")
        except Exception as e:
            print(f"[{ep}] Error: {e}", file=sys.stderr)

if __name__ == '__main__':
    main()
