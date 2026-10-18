#!/usr/bin/env python3
"""Render supplied lecture pages without altering the PDFs."""
from pathlib import Path
import json, subprocess, tempfile
from PIL import Image

root=Path(__file__).resolve().parents[1]
manifest=json.loads((root/'assets/data/final-sources.json').read_text())
manifest.append(dict(path='raw/formu_214_fin_69.pdf',key='formula',pages=9))
for item in manifest:
    dest=root/'assets/source-pages'/item['key'];dest.mkdir(parents=True,exist_ok=True)
    if all((dest/(str(n)+'.webp')).exists() for n in range(1,item['pages']+1)):continue
    with tempfile.TemporaryDirectory(prefix='em-source-') as tmp:
        prefix=Path(tmp)/'page'
        subprocess.run(['pdftoppm','-scale-to','1400','-png',str(root/item['path']),str(prefix)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
        files=sorted(Path(tmp).glob('page-*.png'),key=lambda p:int(p.stem.split('-')[-1]))
        assert len(files)==item['pages']
        for n,p in enumerate(files,1):
            Image.open(p).convert('RGB').save(dest/(str(n)+'.webp'),quality=87,method=4)
    print(item['key'],item['pages'],flush=True)
