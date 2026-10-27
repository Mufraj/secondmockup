import subprocess
import os
import sys

browser = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(browser):
    browser = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

os.makedirs("research/screens", exist_ok=True)
os.makedirs("home-v2/screenshots", exist_ok=True)

targets = [
    ("desktop_1440", 1440, 900),
    ("tablet_768", 768, 1024),
    ("mobile_375", 375, 812),
]

for name, w, h in targets:
    out = os.path.abspath(f"home-v2/screenshots/{name}.png")
    cmd = [
        browser,
        "--headless",
        "--disable-gpu",
        f"--screenshot={out}",
        f"--window-size={w},{h}",
        "http://localhost:3000/"
    ]
    print(f"Capturing {name} at {w}x{h}...")
    try:
        subprocess.run(cmd, timeout=25, capture_output=True)
        if os.path.exists(out):
            print(f"Captured: {out} ({os.path.getsize(out)} bytes)")
    except Exception as e:
        print(f"Error: {e}")

print("Screenshots done.")
