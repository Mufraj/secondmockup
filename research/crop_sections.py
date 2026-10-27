from PIL import Image
import os

im = Image.open('home-v2/screenshots/desktop_full_page.png')
w, total_h = im.size
print(f'Full desktop image dimensions: {w}x{total_h}')

# Define bounding boxes roughly for sections
# Total height is around 6400
slices = [
    ("sec_01_header_hero", 0, 950),
    ("sec_02_trust_problem_solution", 950, 2100),
    ("sec_03_bestsellers", 2100, 3100),
    ("sec_04_deepdive", 3100, 4200),
    ("sec_05_sizeguide_collections", 4200, 5200),
    ("sec_06_faq_blog_footer", 5200, total_h)
]

for name, top, bottom in slices:
    if top < total_h:
        b = min(bottom, total_h)
        cropped = im.crop((0, top, w, b))
        out_name = f"home-v2/screenshots/{name}.png"
        cropped.save(out_name)
        print(f"Saved {out_name} ({w}x{b-top})")

# Also crop mobile into 4 chunks
mob_im = Image.open('home-v2/screenshots/mobile_full_page.png')
mw, mh = mob_im.size
print(f'Full mobile image dimensions: {mw}x{mh}')
mob_slices = [
    ("mob_01_hero_trust", 0, 1600),
    ("mob_02_comparison_bestsellers", 1600, 3400),
    ("mob_03_deepdive_sizeguide", 3400, 5400),
    ("mob_04_faq_blog_footer", 5400, mh)
]

for name, top, bottom in mob_slices:
    if top < mh:
        b = min(bottom, mh)
        cropped = mob_im.crop((0, top, mw, b))
        out_name = f"home-v2/screenshots/{name}.png"
        cropped.save(out_name)
        print(f"Saved {out_name} ({mw}x{b-top})")
