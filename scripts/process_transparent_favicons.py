import os
from PIL import Image, ImageFilter
import numpy as np
from collections import deque

def process_app_favicon(app_dir, tolerance=25, blur_radius=0.8, center_y_ratio=0.5):
    static_dir = os.path.join(app_dir, 'static')
    raw_path = os.path.join(static_dir, 'flow_icon_raw.png')
    if not os.path.exists(raw_path):
        print(f"Skipping {app_dir}, no flow_icon_raw.png")
        return

    im = Image.open(raw_path).convert('RGB')
    w, h = im.size
    
    # Center crop square around target
    center_y = int(h * center_y_ratio)
    side = min(w, h)
    top = max(0, min(h - side, center_y - side // 2))
    sq = im.crop((0, top, w, top + side)).resize((512, 512), Image.Resampling.LANCZOS)
    arr = np.array(sq, dtype=np.float32)

    # Edge colors
    edge_pixels = np.concatenate([arr[0, :], arr[-1, :], arr[:, 0], arr[:, -1]], axis=0)
    bg_color = np.median(edge_pixels, axis=0)

    # Color difference
    diff = np.sqrt(np.sum((arr - bg_color) ** 2, axis=2))

    # Floodfill from 4 borders
    mask = np.zeros((512, 512), dtype=bool)
    visited = np.zeros((512, 512), dtype=bool)
    queue = deque()

    for x in range(512):
        for y in [0, 511]:
            if diff[y, x] <= tolerance:
                visited[y, x] = True
                mask[y, x] = True
                queue.append((y, x))
    for y in range(512):
        for x in [0, 511]:
            if not visited[y, x] and diff[y, x] <= tolerance:
                visited[y, x] = True
                mask[y, x] = True
                queue.append((y, x))

    while queue:
        cy, cx = queue.popleft()
        for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < 512 and 0 <= nx < 512 and not visited[ny, nx]:
                visited[ny, nx] = True
                if diff[ny, nx] <= tolerance:
                    mask[ny, nx] = True
                    queue.append((ny, nx))

    # Anti-aliased alpha mask
    alpha_mask = Image.fromarray((~mask * 255).astype(np.uint8), mode='L')
    if blur_radius > 0:
        alpha_mask = alpha_mask.filter(ImageFilter.GaussianBlur(radius=blur_radius))

    result = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
    result.paste(sq, (0, 0), mask=alpha_mask)

    # Save multi-size favicon formats
    # 1. 512x512
    fav_512 = result
    fav_512.save(os.path.join(static_dir, 'favicon.png'), 'PNG')
    fav_512.save(os.path.join(static_dir, 'icon-512.png'), 'PNG')

    # 2. 180x180 apple touch icon
    fav_180 = result.resize((180, 180), Image.Resampling.LANCZOS)
    fav_180.save(os.path.join(static_dir, 'apple-touch-icon.png'), 'PNG')

    # 3. 48x48 (Google search standard)
    fav_48 = result.resize((48, 48), Image.Resampling.LANCZOS)
    fav_48.save(os.path.join(static_dir, 'favicon-48x48.png'), 'PNG')

    # 4. Multi-res .ico (16, 32, 48)
    fav_512.save(os.path.join(static_dir, 'favicon.ico'), format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
    
    print(f"✅ Processed {app_dir}: transparent favicons saved! (Transparent pixels: {np.sum(mask)}/262144)")

if __name__ == '__main__':
    apps = [
        ('apps/wasm-media-tools', 24, 0.8, 0.50),
        ('apps/pdf-tools', 30, 0.8, 0.50),
        ('apps/size-converter', 35, 0.8, 0.50),
        ('apps/caro-game', 40, 0.8, 0.50),
        ('apps/schengen-calculator', 30, 0.8, 0.50),
        ('apps/anmeldung-prep', 30, 0.8, 0.50),
        ('apps/rirekisho-builder', 30, 0.8, 0.50),
        ('apps/visarun-planner', 30, 0.8, 0.50),
    ]
    for app, tol, blur, cy in apps:
        process_app_favicon(app, tolerance=tol, blur_radius=blur, center_y_ratio=cy)


