# 实验室输入

`build_lab.py article.json manifest.json --output preview.html` 使用 Python 标准库；输出包含图片的独立 HTML，打开文件即可看样式，使用 localhost 打开通常更便于剪贴板权限。

article.json：
```json
{
  "title": "本篇标题",
  "subtitle": "赛事名称",
  "source": "https://example.org/original-article",
  "notice": "样式试排，使用正文摘要，非全文复排。",
  "intro": "已核对的导语",
  "locationLabel": "EVENT LOCATION",
  "periodLabel": "本篇日期",
  "statsLabel": "经核对的关键数字",
  "heroes": {"editorial": 0, "arena": 1, "community": 2, "prism": 1},
  "variants": {"editorial": ["特刊标题"], "arena": ["赛场标题"], "community": ["纪实标题"], "prism": ["科创标题"]},
  "sections": [
    {"date": "05.08", "title": "章节标题", "label": "场景分类", "text": "正文", "images": [0,1], "captions": ["图注一","图注二"]}
  ],
  "closing": "结束语",
  "thanks": "按本篇来源确认的致谢"
}
```

manifest.json 中 file 相对清单所在目录，图片 id 必须唯一。可选 width/height 用于记录原图尺寸：
```json
{"source":"https://example.org/original-article","assets":[
  {"id":0,"file":"assets/group.jpg","url":"https://example.org/group.jpg"}
]}
```

所有图片须实际存在，sections/hero 引用有效 id。当前支持 JPG、PNG（用于真实照片及 Logo）；动图另行设计。不要把原文照片或活动专属事实写进通用模板。

样式选择、间距、图序及焦点可通过工作台保存为 JSON；它是调整记录。后续助手应据此应用到 article.json/模板，不能声称当前工具已自动持久化或自动导入这些设置。用户未保存的浏览器调整刷新后会丢失。

新增插画款的键名为 `celebration`、`notebook`、`keylab`；在 heroes 和 variants 中按同样方式提供本篇封面图 ID 和标题行。没有指定时使用通用回退，不把本次活动标题写进模板。

页尾默认带 UCup 二维码与已确认署名，可通过 article.json 的 footer 对象覆盖。配置字段与路径规则见 [页尾组件](footer.md)。

构建器读取 `assets/illustration.js`、`assets/illustration.css` 和默认 `assets/icons/manifest.json`，与主模板一并打包。图标清单 assets 中各项含 id、label、file，file 相对清单目录；可用 --ornaments 指定另一份清单。生成记录和图标使用规则见 [图标素材](icon-library.md)。
