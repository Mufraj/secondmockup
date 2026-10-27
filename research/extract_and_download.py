import json
import urllib.request
import re
import os
import ssl
from html.parser import HTMLParser

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

with open("research/products.json", "r", encoding="utf-8") as f:
    prod_data = json.load(f)

# Download all images
print("--- DOWNLOADING PRODUCT IMAGES ---")
image_catalog = []
for p in prod_data.get('products', []):
    title = p['title']
    handle = p['handle']
    print(f"\nProcessing {title}: {len(p.get('images', []))} images")
    for idx, img in enumerate(p.get('images', [])):
        src = img['src']
        # Request highest res
        high_res = re.sub(r'(\?v=\d+)?$', '', src)
        high_res = high_res.split('?')[0] + '?width=2000'
        ext = os.path.splitext(src.split('?')[0])[1] or '.jpg'
        clean_handle = "8_5L" if "8-5l" in handle else "6_5L"
        filename = f"assets/original/{clean_handle}_img_{idx+1}{ext}"
        try:
            req = urllib.request.Request(high_res, headers=headers)
            with urllib.request.urlopen(req, context=ssl_ctx, timeout=20) as resp:
                content = resp.read()
                with open(filename, 'wb') as img_f:
                    img_f.write(content)
                print(f"Downloaded: {filename} ({len(content)} bytes)")
                image_catalog.append({
                    "product": title,
                    "handle": handle,
                    "local_path": filename,
                    "original_src": src,
                    "alt": img.get('alt') or title
                })
        except Exception as e:
            print(f"Failed to download {high_res}: {e}")

with open("research/image_catalog.json", "w", encoding="utf-8") as f:
    json.dump(image_catalog, f, indent=2)

# Simple HTML text stripper
class HTMLTextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.result = []
        self.in_script = False
        self.links = []

    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'):
            self.in_script = True
        if tag == 'a':
            attrs_dict = dict(attrs)
            if 'href' in attrs_dict:
                self.links.append((attrs_dict['href'], ''))

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.in_script = False

    def handle_data(self, data):
        if not self.in_script:
            txt = data.strip()
            if txt:
                self.result.append(txt)

def extract_text_from_html(filename):
    if not os.path.exists(filename):
        return "", []
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()
    parser = HTMLTextExtractor()
    parser.feed(content)
    return "\n".join(parser.result), parser.links

blog_text, blog_links = extract_text_from_html("research/html_Blog.html")
blog_articles = []
for href, _ in blog_links:
    if '/blogs/kitchen-tips/' in href:
        slug = href.split('/')[-1]
        if slug and slug not in [b['slug'] for b in blog_articles]:
            blog_articles.append({"slug": slug, "url": f"https://whitefeathersupplies.com{href}" if href.startswith('/') else href})

print(f"Found blog links: {blog_articles}")

about_txt, _ = extract_text_from_html("research/html_About.html")
shipping_txt, _ = extract_text_from_html("research/html_Shipping.html")
returns_txt, _ = extract_text_from_html("research/html_Returns.html")
home_txt, _ = extract_text_from_html("research/html_Home.html")
pantry_txt, _ = extract_text_from_html("research/html_Pantry_collection.html")
flour_txt, _ = extract_text_from_html("research/html_Flour_and_Sugar_collection.html")
prod_8_5_txt, _ = extract_text_from_html("research/html_8.5L_product.html")
prod_6_5_txt, _ = extract_text_from_html("research/html_6.5L_product.html")

info = {
    "blog_articles": blog_articles,
    "about": about_txt[:4000],
    "shipping": shipping_txt[:3000],
    "returns": returns_txt[:3000],
    "home": home_txt[:6000],
    "pantry": pantry_txt[:4000],
    "flour_sugar": flour_txt[:4000],
    "prod_8_5": prod_8_5_txt[:5000],
    "prod_6_5": prod_6_5_txt[:5000]
}

with open("research/extracted_text.json", "w", encoding="utf-8") as f:
    json.dump(info, f, indent=2)

print("\nSaved research/extracted_text.json successfully.")
