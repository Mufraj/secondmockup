import urllib.request
import json
import os
import re
import ssl

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

urls = [
    ("Home", "https://whitefeathersupplies.com/"),
    ("All products", "https://whitefeathersupplies.com/collections/all"),
    ("Flour & Sugar collection", "https://whitefeathersupplies.com/collections/flour-sugar-storage-containers"),
    ("Pantry collection", "https://whitefeathersupplies.com/collections/pantry-storage-containers"),
    ("8.5L product", "https://whitefeathersupplies.com/products/extra-large-8-5l-plastic-food-storage-containers-set-of-2"),
    ("6.5L product", "https://whitefeathersupplies.com/products/6-5l-plastic-food-container-set-of-2"),
    ("5.2L + 6.5L set of 4", "https://whitefeathersupplies.com/products/5-2l-and-6-5l-plastic-food-storage-container-set-of-4"),
    ("40pcs airtight set", "https://whitefeathersupplies.com/products/airtight-food-storage-container-set-20-pcs"),
    ("6.5L grey lids", "https://whitefeathersupplies.com/products/6-5l-plastic-food-container-set-of-2-grey-lids"),
    ("5.2L + 6.5L clear lids", "https://whitefeathersupplies.com/products/5-2l-and-6-5l-plastic-food-storage-container-set-of-4-clear-lids"),
    ("About", "https://whitefeathersupplies.com/pages/about-us"),
    ("Shipping", "https://whitefeathersupplies.com/pages/shipping-policy"),
    ("Returns", "https://whitefeathersupplies.com/pages/return-exchange-policy"),
    ("Blog", "https://whitefeathersupplies.com/blogs/kitchen-tips"),
]

print("--- CHECKING URLS ---")
url_status = {}
for name, url in urls:
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ssl_ctx, timeout=15) as resp:
            code = resp.getcode()
            body = resp.read().decode('utf-8', errors='ignore')
            # Check if 404 in title or body
            is_404 = "404" in body[:1000] or "Page not found" in body or code != 200
            url_status[name] = {"code": code, "url": url, "is_404": is_404, "len": len(body)}
            print(f"[{code}] {name} ({'NOT FOUND/404' if is_404 else 'OK, len=' + str(len(body))}) -> {url}")
            # Save html for parsing
            filename = f"research/html_{name.replace(' ', '_').replace('&', 'and').replace('+', 'and')}.html"
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(body)
    except urllib.error.HTTPError as e:
        url_status[name] = {"code": e.code, "url": url, "is_404": True, "error": str(e)}
        print(f"[{e.code}] {name} (FAILED) -> {url}")
    except Exception as e:
        url_status[name] = {"code": 0, "url": url, "is_404": True, "error": str(e)}
        print(f"[ERR] {name} -> {e}")

# Check products.json
print("\n--- FETCHING PRODUCTS.JSON ---")
try:
    req = urllib.request.Request("https://whitefeathersupplies.com/products.json", headers=headers)
    with urllib.request.urlopen(req, context=ssl_ctx, timeout=15) as resp:
        prod_json = json.loads(resp.read().decode('utf-8'))
        with open("research/products.json", "w", encoding="utf-8") as f:
            json.dump(prod_json, f, indent=2)
        print(f"Saved products.json with {len(prod_json.get('products', []))} products")
        for p in prod_json.get('products', []):
            print(f"Product: {p.get('title')} (Handle: {p.get('handle')})")
            for v in p.get('variants', []):
                print(f"  Variant: {v.get('title')} | Price: ${v.get('price')} | Compare: ${v.get('compare_at_price')}")
except Exception as e:
    print(f"Failed products.json: {e}")

# Download logo
print("\n--- DOWNLOADING LOGO ---")
logo_url = "https://cdn.shopify.com/s/files/1/0863/8388/6643/files/White_Feather_Logo_Png.png?v=1746731793"
try:
    req = urllib.request.Request(logo_url, headers=headers)
    with urllib.request.urlopen(req, context=ssl_ctx, timeout=15) as resp:
        with open("assets/brand/white_feather_logo.png", "wb") as f:
            f.write(resp.read())
        print("Logo downloaded to assets/brand/white_feather_logo.png")
except Exception as e:
    print("Logo download failed:", e)
