#!/usr/bin/env python3
"""One-time background removal for portfolio product images."""

from pathlib import Path

from PIL import Image
from rembg import remove

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "assets"

# (source relative to ROOT, dest relative to OUT, remove_bg)
JOBS = [
    ("poplight/image copy 2.png", "poplight/poplight-sconce.png", True),
    ("poplight/image.png", "poplight/poplight-lifestyle.png", True),
    ("poplight/image copy.png", "poplight/poplight-logo.png", False),
    ("spira/image.png", "spira/spira-device.png", True),
    ("spira/spiraapp.webp", "spira/spira-app.webp", False),
    (
        "cardiogram/WhatsApp Image 2026-06-03 at 02.52.50.jpeg",
        "cardiogram/cardiogram-home.png",
        True,
    ),
    (
        "cardiogram/WhatsApp Image 2026-06-03 at 02.53.07.jpeg",
        "cardiogram/cardiogram-ecg.png",
        True,
    ),
    (
        "cardiogram/WhatsApp Image 2026-06-03 at 02.53.19.jpeg",
        "cardiogram/cardiogram-report.png",
        True,
    ),
    (
        "cardiogram/WhatsApp Image 2026-06-03 at 02.53.42.jpeg",
        "cardiogram/cardiogram-metrics.png",
        True,
    ),
    (
        "cardiogram/WhatsApp Image 2026-06-03 at 02.55.00.jpeg",
        "cardiogram/cardiogram-ai.png",
        True,
    ),
]


def process(src: Path, dest: Path, strip_bg: bool) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    img = Image.open(src)
    if strip_bg:
        result = remove(img)
        if dest.suffix.lower() != ".png":
            dest = dest.with_suffix(".png")
        result.save(dest, "PNG")
    else:
        if dest.suffix.lower() == ".webp" and src.suffix.lower() != ".webp":
            img.save(dest, "WEBP", quality=90)
        else:
            img.save(dest)


def main() -> None:
    for rel_src, rel_dest, strip_bg in JOBS:
        src = ROOT / rel_src
        dest = OUT / rel_dest
        if not src.exists():
            print(f"SKIP missing: {src}")
            continue
        print(f"Processing {rel_src} -> {rel_dest} (bg={strip_bg})")
        process(src, dest, strip_bg)
    print("Done.")


if __name__ == "__main__":
    main()
