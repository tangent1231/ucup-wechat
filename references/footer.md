# UCup 默认页尾

用户于 2026-11-06 提供二维码原图，并指定以下默认结尾顺序：

1. UCup 二维码（`assets/brand/ucup-qr.png`），保留白边、比例及清晰度。
2. 编辑&排版｜Tangent
3. 审核｜Universal Cup Organizing Comittee、qingyu

署名放在文章最末，文本可编辑。`Comittee` 为用户给定拼写，原样保留；如用户之后调整，以最新要求为准。此处是编辑排版及审核署名，不自动用作文章作者、投稿人或视频创作者。

二维码保持原图和静态，不重绘、不裁切、不着色、不做浮动动画；不能使用 AI 重新生成二维码。建议手机排版实际宽度约 180–220px，并用实际渲染图测试识别。保留原图文件方便在编辑器单独上传。

默认配置 `assets/brand/footer.json`。文章 JSON 可用 footer 对象覆盖 editor、reviewer、qrCaption、qrAlt、qrFile。自定义 qrFile 相对 article.json 目录；未覆盖则使用 skill 内的默认原图。

`build_lab.py` 将二维码嵌入独立预览和静态导出。二维码独立于 AI 图标开关，关闭装饰图标或收起所有章节不会移除页尾。复制含码不等于目标编辑器已保存，仍需检查实际草稿和手机端。
