# YuxPaper

把论文读成知识，把知识连接到证据与写作。

YuxPaper 是从一套本地 Zotero + Markdown + Codex 科研工作区提炼的**知识库构建框架与静态网站**。它说明如何组织文献、阅读状态、概念、想法、项目证据和论文写作，并为后续网站开发提供信息架构。

当前版本是可直接打开的框架展示站，包含模块探索、阅读阶段切换和文档搜索。**尚未连接真实 Zotero、私有笔记、数据库或模型 API**。本仓库只保存公开框架与空白模板，不是原研究工作区的替代注册表。

## 从这里开始

- [构建框架](docs/architecture.md)：目录、数据对象、事实来源与关系。
- [阅读与研究流程](docs/workflow.md)：入库、速览、深读、归档、复盘与写作。
- [网站扩展设计](docs/website-plan.md)：页面、接口、阶段计划与验收条件。
- [使用与部署](docs/quickstart.md)：本地预览和 GitHub Pages 配置。
- [发布与研究边界](docs/governance.md)：公开导出、人类决策、证据规则。
- [来源清单](docs/source-manifest.json)：本地依据的相对路径与 SHA-256。
- [可复制模板](templates/)：空白结构，仅供新用户学习与初始化。

## 本地浏览

```bash
python3 -m http.server 8000 --directory /path/to/YuxPaper
```

浏览器访问 http://localhost:8000 。也可直接打开 `index.html`，网站无需构建、第三方 CDN 或安装依赖。

## 核心链路

```text
Zotero 原文与元数据 → 全局索引 → 分阶段阅读
                                  ↓
                            Research Memory
                                  ↓
项目 source map → claim ledger + evidence gate → 论文 / HTML 汇报
```

想法进入论断必须有证据与 Human 审批。工程实现完成不代表科学结论成立。

## 当前交付

- 中文静态网站：响应式布局、模块导航、阶段说明和文档筛选。
- 可追溯框架文档：基于本地工作流与模板提炼。
- 教学模板：论文记录、概念卡、写作证据表和项目目录。
- 校验脚本：检查本地链接、公开文件与来源清单格式。

未启用定时任务、付费 API、自动实验或本地文件同步。GitHub Pages 需要在仓库 Settings → Pages 中选择 `main / (root)` 才会产生网站地址。
