import subprocess
import os
import sys

edge_paths = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe"
]

browser = None
for p in edge_paths:
    if os.path.exists(p):
        browser = p
        break

if not browser:
    print("No Edge or Chrome executable found!")
    sys.exit(1)

print(f"Using browser: {browser}")

targets = [
    ("razab", "https://razab.com"),
    ("apple", "https://apple.com"),
    ("carawayhome", "https://carawayhome.com"),
    ("stasherbag", "https://stasherbag.com")
]

os.makedirs("research/refs", exist_ok=True)

for name, url in targets:
    out_path = os.path.abspath(f"research/refs/{name}.png")
    cmd = [
        browser,
        "--headless",
        "--disable-gpu",
        f"--screenshot={out_path}",
        "--window-size=1440,900",
        url
    ]
    print(f"Capturing {name} from {url}...")
    try:
        res = subprocess.run(cmd, timeout=30, capture_output=True)
        if os.path.exists(out_path) and os.path.getsize(out_path) > 0:
            print(f"Captured {out_path} ({os.path.getsize(out_path)} bytes)")
        else:
            print(f"Failed to capture {name}: file missing or empty")
    except Exception as e:
        print(f"Error capturing {name}: {e}")

print("Completed capturing references.")
