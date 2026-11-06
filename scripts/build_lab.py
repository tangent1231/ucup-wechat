#!/usr/bin/env python3
"""Build a self-contained style lab from article.json and an asset manifest."""
import argparse,base64,json
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('article');p.add_argument('manifest');p.add_argument('--output',required=True);p.add_argument('--ornaments',help='Optional ornament manifest; defaults to bundled icon library');a=p.parse_args()
article_path=Path(a.article).resolve();manifest_path=Path(a.manifest).resolve()
data=json.loads(article_path.read_text());manifest=json.loads(manifest_path.read_text())
assets=[]
for x in manifest['assets']:
 q=manifest_path.parent/x['file']
 if not q.is_file():raise FileNotFoundError(q)
 mime='image/png' if q.suffix.lower()=='.png' else 'image/jpeg'
 assets.append({**x,'data':'data:'+mime+';base64,'+base64.b64encode(q.read_bytes()).decode()})
ids={x['id'] for x in assets}
if len(ids)!=len(assets):raise ValueError('Duplicate image IDs')
if any(i not in ids for i in data.get('heroes',{}).values()):raise ValueError('Unknown hero image ID')
for section in data['sections']:
 if any(i not in ids for i in section['images']):raise ValueError('Unknown image ID in section')
asset_dir=Path(__file__).resolve().parents[1]/'assets'
ornament_path=Path(a.ornaments).resolve() if a.ornaments else asset_dir/'icons/manifest.json'
ornaments=[]
if ornament_path.is_file():
 for icon in json.loads(ornament_path.read_text())['assets']:
  q=ornament_path.parent/icon['file']
  ornaments.append({'id':icon['id'],'label':icon['label'],'data':'data:image/png;base64,'+base64.b64encode(q.read_bytes()).decode()})
content=(asset_dir/'lab.html').read_text()
content=content.replace('__ILLUSTRATION_CSS__',(asset_dir/'illustration.css').read_text()).replace('__ILLUSTRATION_JS__',(asset_dir/'illustration.js').read_text())
content=content.replace('__ORNAMENT_DATA__',json.dumps(ornaments,ensure_ascii=False).replace('</','<\\/'))
footer_path=asset_dir/'brand/footer.json'
footer=json.loads(footer_path.read_text())
footer.update(data.get('footer',{}))
qr_path=Path(footer['qrFile'])
if not qr_path.is_absolute():
 qr_path=(article_path.parent if 'qrFile' in data.get('footer',{}) else footer_path.parent)/qr_path
footer['qrData']='data:image/png;base64,'+base64.b64encode(qr_path.read_bytes()).decode()
content=content.replace('__FOOTER_DATA__',json.dumps(footer,ensure_ascii=False).replace('</','<\\/'))
content=content.replace('__ARTICLE_DATA__',json.dumps(data,ensure_ascii=False).replace('</','<\\/')).replace('__ASSET_DATA__',json.dumps(assets,ensure_ascii=False).replace('</','<\\/'))
Path(a.output).write_text(content)
print(a.output)
