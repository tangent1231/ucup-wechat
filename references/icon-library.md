# 插画图标素材

素材目录：`assets/icons/`。蓝紫、冰蓝、青色为主，少量杏金色；柔和立体材质，适合与科创长卷搭配。此套为可迭代 demo 素材，不代表官方 UCup 标志系统。

| ID | 图标 | 适用位置 |
|---|---|---|
| balloons | 三只气球 | 开篇、欢迎、相聚、活动回顾 |
| code | 代码窗口 | 题目介绍、解题分享、技术讲座 |
| keyboard | 机械键盘 | 正赛、参赛过程、编程主题 |
| trophy | 装饰奖杯 | 获奖章节或小提示；不冒充真实奖杯照片 |

每款有 `*-original.png`、`*-512.png`、`*-160.png`。透明背景；512px 适合首屏插画，160px 适合章节标记。保留比例和透明通道，不加不必要的底框。把装饰与文字留出距离，不盖住人脸、正文、Logo。原图与小尺寸都要检查边缘和辨识度。

## 使用现有素材

`build_lab.py` 默认读取本 skill 的 `assets/icons/manifest.json`，将图标嵌入独立预览页。需要替换图标库时用 `--ornaments /path/to/manifest.json`。图标库弹窗下载 512px PNG；原图和小图另行随稿打包。

`manifest.json` 保存每张图的提示词、生成渠道、尺寸、SHA-256 与相对文件名。本套由内置 image_gen 生成；工具没有暴露具体底层型号，不把它记录成已经确认的 gpt-image-2。

复制版中的插画为普通内嵌 PNG，仍可能被编辑器过滤；可用独立 PNG 上传。预览中的图标浮动和绝对定位不会带入安全导出。照片与装饰图标分别计数，不能用图标数量掩盖正文照片遗漏。

## 增量生成

当用户需要新物件或不同风格时，使用可用的图像生成能力；当前环境可按 imagegen skill 的内置工具路径执行。需要精确指定模型或 API 路径时遵循该工具的可用能力，不擅自声称型号。

参考现有图与 manifest 提示词，保持色板、光照方向、材质、视角和视觉重量。一次生成一个独立物件，真实透明背景，无 Logo、无水印、无背景场景。小图尽量不含文字；代号与题目名称用可编辑正文排。

提示词的共同要点：premium playful soft 3D illustration; satin ceramic and frosted glass; ice blue / periwinkle lavender / cyan / small apricot accent; soft upper-left studio lighting; isolated transparent background; clean silhouette; readable at 60–160px; no logos or watermark。物件细节以 manifest 的完整提示词为准，按新需求调整，不把这套配色用于所有 UCup 项目。

生成后把选定输出复制到本篇素材目录与 skill 资产目录，保留原始图、缩小版本与生成记录。先查看浅色和深色底的实际显示，再放入 demo。不要把一次生成的所有候选都积累进素材库。
