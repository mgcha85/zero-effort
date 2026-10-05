import urllib.request
import ssl

ctx = ssl.create_default_context()

domains = [
    ("Hub", "https://minitoolbox.dev"),
    ("PDF", "https://pdf.minitoolbox.dev"),
    ("Media", "https://media.minitoolbox.dev"),
    ("Schengen", "https://schengen.minitoolbox.dev"),
    ("Visarun", "https://visarun.minitoolbox.dev"),
    ("Anmeldung", "https://anmeldung.minitoolbox.dev"),
    ("Rirekisho", "https://rirekisho.minitoolbox.dev"),
    ("Size", "https://size.minitoolbox.dev"),
    ("Caro", "https://caro.minitoolbox.dev"),
    ("TimeSync", "https://timesync.minitoolbox.dev"),
    ("QR", "https://qr.minitoolbox.dev"),
    ("Invoice", "https://invoice.minitoolbox.dev"),
    ("EXIF", "https://exif.minitoolbox.dev"),
]

for name, url in domains:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ctx, timeout=5) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            has_gtag = 'G-0PT14QDEK4' in content
            print(f"[{name}] {url} -> HTTP {resp.status} | GA4 Tag: {'✅' if has_gtag else '❌'}")
    except Exception as e:
        print(f"[{name}] {url} -> ERROR: {e}")
