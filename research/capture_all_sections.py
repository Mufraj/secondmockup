import subprocess
import os
from PIL import Image

browser = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(browser):
    browser = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

os.makedirs("home-v2/screenshots", exist_ok=True)

out_desktop_full = os.path.abspath("home-v2/screenshots/desktop_full_page.png")
cmd_desktop = [
    browser,
    "--headless",
    "--disable-gpu",
    f"--screenshot={out_desktop_full}",
    "--window-size=1440,10500",
    "http://localhost:3000/"
]
print("Capturing desktop full page (1440x10500)...")
subprocess.run(cmd_desktop, timeout=40)
print(f"Captured: {out_desktop_full} ({os.path.getsize(out_desktop_full)} bytes)")

out_mobile_full = os.path.abspath("home-v2/screenshots/mobile_full_page.png")
cmd_mobile = [
    browser,
    "--headless",
    "--disable-gpu",
    f"--screenshot={out_mobile_full}",
    "--window-size=375,12500",
    "http://localhost:3000/"
]
print("Capturing mobile full page (375x12500)...")
subprocess.run(cmd_mobile, timeout=40)
print(f"Captured: {out_mobile_full} ({os.path.getsize(out_mobile_full)} bytes)")

# Crop into section views
im = Image.open(out_desktop_full)
w, total_h = im.size
print(f"Full desktop size: {w}x{total_h}")

sections = [
    ("sec_01_announcement_header_hero", 0, 950),
    ("sec_02_trust_problem_solution", 950, 2150),
    ("sec_03_bestsellers", 2150, 3150),
    ("sec_04_feature_deepdive", 3150, 4350),
    ("sec_05_sizeguide", 4350, 5300),
    ("sec_06_collections", 5300, 6200),
    ("sec_07_reviews", 6200, 6950),
    ("sec_08_faq", 6950, 7850),
    ("sec_09_blog", 7850, 8750),
    ("sec_10_newsletter_footer", 8750, total_h)
]

for name, t, b in sections:
    if t < total_h:
        bot = min(b, total_h)
        crop = im.crop((0, t, w, bot))
        crop.save(f"home-v2/screenshots/{name}.png")
        print(f"Saved home-v2/screenshots/{name}.png ({w}x{bot-t})")

print("All sections cropped successfully!")
