# 使用与部署

## 本地预览

在仓库目录运行：

```bash
python3 scripts/validate.py
python3 -m http.server 8000
```

访问 http://localhost:8000 ，按 Ctrl+C 停止预览。仅查看网页也可直接打开 `index.html`。

## GitHub Pages

1. 打开仓库 Settings → Pages。
2. Source 选择 Deploy from a branch。
3. Branch 选择 main，目录选择 / (root)，保存。
4. 等待 GitHub 返回实际站点地址并检查发布状态。

本次上传不等于已开启 Pages。本仓库不添加 Actions 自动任务，也不自动修改仓库可见性。所有资源使用相对路径，兼容项目站点的 `/YuxPaper/` 路径前缀。

## 编辑内容

- 修改 `index.html`：首页正文与模块结构。
- 修改 `assets/site.js`：模块详情、阶段说明与文档索引。
- 修改 `assets/style.css`：布局与视觉样式。
- 修改 `docs/`：框架依据与扩展计划。
- `templates/`：教学模板，不能替换既有研究记录。

页面和文档入口索引是静态维护的；新增文档后同步更新 `assets/site.js` 中的列表。

## 校验范围

`validate.py` 检查 HTML 本地资源及锚点、Markdown 本地链接、JSON 格式和清单哈希字段，限制公开文件类型并筛查常见密钥和本机绝对路径。它不会联网，不验证学术结论，也无法替代人工内容审查。网页交互与布局需在浏览器中核对。
