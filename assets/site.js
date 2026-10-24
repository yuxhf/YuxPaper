'use strict';
const modules = [
 {title:'文献资产',label:'01 / SOURCE OF MATERIAL',text:'Zotero 保存论文原文、条目元数据与附件。工作区通过稳定 key 和附件映射连接文献，避免重复复制 PDF。',paths:'Zotero items / storage\nitem key · attachment key\nDOI / arXiv / BibTeX',boundary:'边界：不直接修改 Zotero SQLite；公开网站不读取本机附件。'},
 {title:'注册与路由',label:'02 / ONE PAPER, ONE IDENTITY',text:'统一记录论文身份、项目归属、主题和阅读阶段。按稳定 paper_id 连接阅读材料、记忆节点与项目来源。',paths:'codex/registry/projects.yml\npaper_index.csv\nzotero_attachment_manifest.csv',boundary:'边界：复用原主索引，状态视图不能变成另一套事实源。'},
 {title:'阅读材料',label:'03 / READ WITH QUESTIONS',text:'从速览判断价值，再围绕技术问题深入方法、公式、实验和局限。正向理解与批判性阅读共同构成完整记录。',paths:'quicklook.md → questions.md\ndeep_reading.md / critical_reading.md\nfinal_report.md',boundary:'边界：区分论文证据、个人解释与待核对问题。'},
 {title:'研究记忆',label:'04 / BUILD REUSABLE UNDERSTANDING',text:'把可复用内容沉淀为论文节点、概念卡与项目想法，通过来源、关系和复盘记录保持知识的可维护性。',paths:'codex/research_memory/\npapers/ · concepts/ · ideas/\nreview_queue.md / review_log.md',boundary:'边界：概念成熟度不等于阅读状态；研究想法不自动成为 claim。'},
 {title:'项目证据',label:'05 / EVIDENCE BEFORE CLAIMS',text:'将文献、代码和实验产物映射到可写的论断，记录证据、比较条件、适用范围与未完成事项。',paths:'04_writing_support/\nsource_map.md / claim_ledger.md\nevidence_gate.md / writing_queue.md',boundary:'边界：想法晋升需要证据和 Human 审批；保留失败与负结果。'},
 {title:'交付展示',label:'06 / SHARE WITH PROVENANCE',text:'将通过准入检查的研究材料组织为论文、报告与机制讲解。公开网站只展示已经获准发布的内容。',paths:'manuscript_outline.md / drafts/\nreports/<report-id>/\nYuxPaper 公开框架站',boundary:'边界：个人知识库中的论文截图不默认获准在公开站复用。'}
];
const stages = [
 {title:'建立身份，确认来源。',text:'先去重，再选择与入库。保留 DOI、arXiv、Zotero key、项目归属与来源位置。',status:'candidate / selected / zotero_imported',output:'论文索引 · 附件映射 · metadata / BibTeX',rule:'用于候选队列或来源清单，不视为已核验知识。'},
 {title:'先判断，是否值得深入。',text:'用研究问题、方法结构、主要证据与局限形成初步判断，列出值得继续追问的技术问题。',status:'quicklook_done',output:'quicklook.md · 下一步阅读问题',rule:'适合一句话背景与分类；机制和结论需继续核验。'},
 {title:'沿着问题，读懂机制。',text:'记录公式、算法、实验与消融；检查 baseline 公平性、结论边界与代码产物的一致性。',status:'deep_reading',output:'questions.md · deep_reading.md · critical_reading.md',rule:'可以解释有来源的机制、公式与有边界的比较。'},
 {title:'收束理解，保留检索入口。',text:'用户确认读完后整理最终报告。重要问题展开，次要问题保留短结论和链接，再提炼可复用知识。',status:'finalized',output:'final_report.md · paper / concept / idea 关联',rule:'可重点展开；定量结论与写作论断仍需通过证据核验。'},
 {title:'持续复盘，连接写作。',text:'更新、合并或退役知识条目。将有依据的内容进入项目来源与论断体系，明确证据缺口与下一步。',status:'记忆成熟度 / claim 状态，独立于阅读阶段',output:'review_queue · source_map · claim_ledger · evidence_gate',rule:'想法需证据与 Human 审批才能晋升；本站不运行定时复盘。'}
];
const docs=[
 ['FRAMEWORK','构建框架','六层结构、目录契约、核心对象与来源关系。','docs/architecture.md'],
 ['WORKFLOW','阅读与研究流程','从入库、速览和深读，走向归档、复盘与写作。','docs/workflow.md'],
 ['ROADMAP','网站扩展设计','公开索引、全文检索、知识图谱与受控编辑的阶段计划。','docs/website-plan.md'],
 ['GET STARTED','使用与部署','本地预览、内容维护与 GitHub Pages 配置。','docs/quickstart.md'],
 ['GOVERNANCE','发布与研究边界','证据规则、公开导出与 Human 决策权限。','docs/governance.md'],
 ['TEMPLATES','可复制的教学模板','论文记录、概念卡、项目布局与写作证据结构。','https://github.com/yuxhf/YuxPaper/tree/main/templates']
];
function textElement(tag,text,className){const e=document.createElement(tag);e.textContent=text;if(className)e.className=className;return e;}
function showModule(index){const m=modules[index], panel=document.getElementById('module-detail');panel.replaceChildren(textElement('p',m.label,'eyebrow'),textElement('h3',m.title),textElement('p',m.text),textElement('pre',m.paths),textElement('p',m.boundary,'boundary'));document.querySelectorAll('[data-module]').forEach(b=>{const active=Number(b.dataset.module)===index;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});}
function showStage(index){const s=stages[index],panel=document.getElementById('stage-detail'),left=document.createElement('div'),right=document.createElement('div');left.append(textElement('p',s.status,'eyebrow'),textElement('h3',s.title),textElement('p',s.text));right.append(textElement('p','阶段产物','eyebrow'),textElement('code',s.output),textElement('p',s.rule));panel.replaceChildren(left,right);document.querySelectorAll('[data-stage]').forEach(b=>{const active=Number(b.dataset.stage)===index;b.classList.toggle('selected',active);b.setAttribute('aria-pressed',String(active));});}
function renderDocs(query=''){const matches=docs.filter(d=>d.slice(0,3).join(' ').toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));const list=document.getElementById('doc-list');list.replaceChildren();for(const [label,title,summary,url]of matches){const a=document.createElement('a');a.href=url;a.className='doc-card';a.append(textElement('p',label,'eyebrow'),textElement('h3',title),textElement('p',summary),textElement('span','阅读文档 ↗','arrow'));list.append(a);}if(!matches.length)list.append(textElement('p','没有匹配的文档。试试“框架”“阅读”“部署”或“模板”。'));document.getElementById('search-count').textContent=`${matches.length} 篇框架文档与模板入口 · 搜索范围为标题与摘要`;}
document.querySelectorAll('[data-module]').forEach(b=>b.addEventListener('click',()=>showModule(Number(b.dataset.module))));document.querySelectorAll('[data-stage]').forEach(b=>b.addEventListener('click',()=>showStage(Number(b.dataset.stage))));document.getElementById('doc-search').addEventListener('input',e=>renderDocs(e.target.value));showModule(0);showStage(0);renderDocs();
