# 从论文到研究产出的工作流

## 1. 入库与去重

用 DOI、arXiv ID、规范化标题核对既有索引。Zotero 管理条目和 PDF，工作区记录 item key、attachment key 与真实路径。元数据、BibTeX 和附件角色需要校验；PDF 默认留在 Zotero storage。已有只读扫描脚本含平台和路径假设，不能当成跨平台即装即用的导入器。

## 2. 阅读阶段

| 状态 | 含义 | 适合进入报告的内容 |
|---|---|---|
| candidate | 检索候选，尚未决定读 | 不进入论文事实页 |
| selected | 已选择准备阅读 | 阅读队列，不推断内容已核验 |
| zotero_imported | 已识别 Zotero 条目与附件 | 来源清单或阅读队列 |
| quicklook_done | 已完成速览 | 一句话背景与分类 |
| deep_reading | 正在深读或已有技术问题记录 | 有来源的机制、公式、实验设计与有限比较 |
| finalized | 最终报告与归档已完成 | 重点展开；结论仍须核验 claim |
| archived | 暂不继续读或废弃 | 保留原因与历史 |

状态不是固定线性流水线：候选可以先 selected 再导入，也可从现有 Zotero 导入开始；任何阶段可归档。Research Memory 的 `active/completed` 是节点状态，不能替代上述阅读状态。

## 3. 速览与深读

速览回答研究问题、方法结构、主要证据、局限和是否值得继续。深读把提问索引放在 `questions.md`，把公式、算法、消融与讨论沉淀在 `deep_reading.md`。

每篇论文保留两轮视角：正向理解贡献、机制和证据；批判性检查 claim 边界、baseline 公平性、输入与预算、消融完整性和 artifact 一致性。没有检索到反例不能被解释成安全证明。

## 4. 总结与记忆

用户确认读完后整理 `final_report.md`，关键问题进入正文，次要问题保留编号、短结论与链接。抽取可复用概念和项目想法，记录来源与下一次复盘动作。不要为每个简单知识点自动建卡。

复盘超过 7 天提示 yellow，超过 14 天提示 red；这是工作流中的提醒规则，不代表此网站运行定时监控。允许 keep / update / merge / upgrade / retire / delete，删除或合并需要明确决策记录。

## 5. 写作证据链

先更新 `source_map.md` 和 `literature_argument_map.md`，再核对 `claim_ledger.md`，通过 `evidence_gate.md` 后组织章节与正文。想法没有证据与 Human 审批时留在 idea_bank。

论断类型包括 implementation_fact、experiment_result、literature_claim、design_choice、project_inference、future_work、placeholder。状态包括 verified、cautious、blocked、future、retired。verified 表示通过相应证据要求，不表示可以脱离原适用范围。

定量结果必须能追溯到 split、样本数、seed、checkpoint、prompt/protocol、指标定义、分母和原始产物；非 matched 比较需显式标注。保留单 seed、缺失消融与泛化未验证等限制，也保留失败与负结果。

## 6. 交付与反馈

汇报要说明内容属于论文机制、教学重构还是项目提案。新报告优先进入 `reports/<report-id>/`。将阅读中的未解问题回流 questions，将待验证想法回流 idea_bank，将证据缺口回流 evidence_gate 和 writing_queue。
