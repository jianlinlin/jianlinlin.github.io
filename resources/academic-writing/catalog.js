(() => {
  "use strict";

  const STORAGE_KEY = "academic-writing-library-v3";
  const SECTION_NAMES = ["Abstract", "Introduction", "Methods", "Results", "Discussion", "Conclusion"];
  const RELATION_LABELS = {
    additive: "同层补充",
    emphasis: "重点递进",
    contrast: "对照转折",
    concession: "让步限定",
    cause: "原因依据",
    result: "结果推论",
    sequence: "步骤顺序",
    elaboration: "具体展开",
    evidence: "证据一致",
    synthesis: "综合归纳",
    qualification: "谨慎解释"
  };
  const PLAN_7 = [
    { section: "Abstract", task: "先读摘要；分别标出背景、目的、方法、主要结果和结论。" },
    { section: "Introduction", task: "精读前言；标出已知背景、研究缺口和研究问题如何递进。" },
    { section: "Methods", task: "精读方法；整理设计、人群、测量、结局和分析步骤。" },
    { section: "Results", task: "精读结果；按主要发现分组，记录方向、比较对象和不确定性。" },
    { section: "Discussion", task: "精读讨论；区分结果重述、文献比较、解释、局限和意义。" },
    { section: "Conclusion", task: "精读结尾；检查结论是否与研究设计和样本范围匹配。" },
    { section: "Synthesis", task: "回看全文；用一段话复述逻辑链，并完成尚未记录的原文逐句翻译。" }
  ];
  const PLAN_14 = [
    { section: "Abstract", focus: "Abstract", task: "读摘要第一遍：标出研究背景、目的和研究对象/数据。" },
    { section: "Abstract", focus: "Abstract", task: "读摘要第二遍：标出方法、核心结果、结论和限制语气。" },
    { section: "Introduction", focus: "Introduction", task: "读前言背景段：提取概念定义与已有证据。" },
    { section: "Introduction", focus: "Introduction", task: "读前言后段：定位研究缺口、目标或假设，画出递进关系。" },
    { section: "Methods", focus: "Methods", task: "读方法前半：整理设计、样本来源、纳入人群和时间范围。" },
    { section: "Methods", focus: "Methods", task: "读方法后半：整理变量定义、测量方式、统计模型和敏感性分析。" },
    { section: "Results", focus: "Results", task: "读主要结果：按研究目标对照结果段与表格/图。" },
    { section: "Results", focus: "Results", task: "读补充结果：辨认次要发现、亚组/稳健性结果及不确定性。" },
    { section: "Discussion", focus: "Discussion", task: "读讨论开头：用自己的话总结主要发现，不照抄摘要。" },
    { section: "Discussion", focus: "Discussion", task: "读文献比较部分：记录哪些结果一致、哪些结果不同，以及作者给出的理由。" },
    { section: "Discussion", focus: "Discussion", task: "读局限部分：逐项说明偏倚、测量、样本和外推范围可能影响什么。" },
    { section: "Discussion", focus: "Discussion", task: "读意义部分：区分临床/公共卫生启示与尚未验证的推论。" },
    { section: "Conclusion", focus: "Conclusion", task: "读结尾并回看摘要：比较结论范围，标记新增或被收窄的判断。" },
    { section: "Synthesis", task: "回顾全文：完成逻辑图、词汇回忆和未记录句子的逐句翻译。" }
  ];

  const readState = () => {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return Object.assign({ papers: {}, sentences: {}, wordSentences: {}, translations: {}, recall: {}, drafts: {}, weakPoints: {}, logicChecks: {} }, parsed);
    } catch (_) {
      return { papers: {}, sentences: {}, wordSentences: {}, translations: {}, recall: {}, drafts: {}, weakPoints: {}, logicChecks: {} };
    }
  };
  const state = readState();
  let storageAvailable = true;
  const saveState = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch (_) {
      storageAvailable = false;
      return false;
    }
  };
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  };
  const option = (value, label) => {
    const node = el("option", "", label);
    node.value = value;
    return node;
  };
  const safeText = (value) => String(value || "");
  const paperFor = (id) => paperLibrary.find((paper) => paper.id === id);
  const setWeakPoint = (label) => {
    state.weakPoints[label] = (state.weakPoints[label] || 0) + 1;
  };
  const sourceLinkFor = (paper, label) => paper.links.find((link) => link.label.toLowerCase().includes(label)) || paper.links[0];
  const renderLinks = (paper, parent) => {
    const wrap = el("div", "paper-source-links");
    paper.links.forEach((link) => {
      const a = el("a", "", link.label);
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      wrap.append(a);
    });
    parent.append(wrap);
  };

  const paperCards = document.querySelector("#paper-cards");
  const paperSearch = document.querySelector("#paper-search");
  const paperTopic = document.querySelector("#paper-topic-filter");
  const paperType = document.querySelector("#paper-type-filter");
  const paperEmpty = document.querySelector("#paper-empty");
  const paperCount = document.querySelector("#paper-count");
  const paperPageStatus = document.querySelector("#paper-page-status");
  const paperPrevious = document.querySelector("#paper-prev");
  const paperNext = document.querySelector("#paper-next");
  const PAPERS_PER_PAGE = 6;
  let paperPage = 0;

  const renderPaperFilters = () => {
    [...new Set(paperLibrary.flatMap((paper) => paper.topics))].sort((a, b) => a.localeCompare(b, "zh-CN")).forEach((topic) => paperTopic.append(option(topic, topic)));
    [...new Set(paperLibrary.map((paper) => paper.type))].sort((a, b) => a.localeCompare(b, "zh-CN")).forEach((type) => paperType.append(option(type, type)));
  };

  const getPlan = (paperId) => state.papers[paperId]?.planLength === 14 ? PLAN_14 : PLAN_7;

  const renderSentenceNotebook = (paper, parent) => {
    const details = el("details", "sentence-notebook");
    const summary = el("summary", "", "原文逐句精读记录");
    details.append(summary);
    const note = el("p", "notebook-help", "打开上方原文链接，在论文中逐句阅读。每次记录一条英文原句和自己的中文翻译；完成整篇时可逐句累积。记录仅保存在当前浏览器。");
    details.append(note);
    const editor = el("div", "sentence-entry");
    editor.dataset.paperId = paper.id;
    const section = document.createElement("select");
    section.className = "sentence-section";
    section.setAttribute("aria-label", "原文所在章节");
    SECTION_NAMES.forEach((name) => section.append(option(name, name)));
    const original = document.createElement("textarea");
    original.className = "sentence-original";
    original.rows = 2;
    original.placeholder = "粘贴正在学习的这一句英文原文";
    original.setAttribute("aria-label", "English source sentence");
    const translation = document.createElement("textarea");
    translation.className = "sentence-chinese";
    translation.rows = 2;
    translation.placeholder = "写下这一句的中文翻译";
    translation.setAttribute("aria-label", "Chinese translation");
    const targetWord = document.createElement("input");
    targetWord.className = "sentence-cloze-target";
    targetWord.type = "text";
    targetWord.placeholder = "可选：填入本句想练习的关键词，保存后会生成原文填空";
    targetWord.setAttribute("aria-label", "Word to blank out for a source sentence exercise");
    const save = el("button", "practice-button", "保存这一句");
    save.type = "button";
    save.dataset.action = "save-source-sentence";
    save.dataset.paperId = paper.id;
    editor.append(section, original, translation, targetWord, save);
    details.append(editor);
    const rows = state.sentences[paper.id] || [];
    const list = el("ol", "saved-sentence-list");
    rows.forEach((row, index) => {
      const item = el("li", "saved-sentence");
      item.append(el("span", "sentence-section-label", row.section));
      if (row.targetWord && row.original.toLocaleLowerCase().includes(row.targetWord.toLocaleLowerCase())) {
        const exercise = el("div", "saved-source-cloze");
        const clozeText = row.original.replace(new RegExp(row.targetWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), "________");
        exercise.append(el("p", "sentence-source-text", clozeText));
        const answer = document.createElement("input");
        answer.type = "text";
        answer.className = "saved-source-cloze-answer";
        answer.placeholder = "回忆原文关键词";
        const check = el("button", "practice-button practice-button-small", "核对原文填空");
        check.type = "button";
        check.dataset.action = "check-source-cloze";
        check.dataset.expected = row.targetWord;
        const result = el("span", "cloze-result", "");
        exercise.append(answer, check, result);
        item.append(exercise);
      }
      const reveal = el("details", "saved-sentence-reveal");
      reveal.append(el("summary", "", "查看原文句子与中文翻译"));
      reveal.append(el("p", "sentence-source-text", row.original));
      reveal.append(el("p", "sentence-translation-text", row.translation));
      item.append(reveal);
      const remove = el("button", "text-button", "删除本条");
      remove.type = "button";
      remove.dataset.action = "remove-source-sentence";
      remove.dataset.paperId = paper.id;
      remove.dataset.index = String(index);
      item.append(remove);
      list.append(item);
    });
    if (rows.length) details.append(list);
    const count = el("p", "sentence-progress", "已记录 " + rows.length + " 句");
    details.append(count);
    parent.append(details);
  };

  const renderWordBank = (paper, parent, keepOpen) => {
    const group = vocabularyBank.find((entry) => entry.paperId === paper.id);
    if (!group) return;
    const details = el("details", "paper-vocabulary");
    details.open = Boolean(keepOpen);
    details.append(el("summary", "", "重点词汇与造句（" + group.items.length + " 个）"));
    const grid = el("div", "vocabulary-grid");
    group.items.forEach((word) => {
      const card = el("article", "vocabulary-card");
      const heading = el("h4", "", word.term);
      heading.append(el("span", "word-pos", word.pos));
      card.append(heading);
      card.append(el("p", "vocabulary-meaning", word.meaning));
      card.append(el("p", "vocabulary-collocation", "常见搭配： " + word.collocation));
      card.append(el("p", "vocabulary-example", "例句： " + word.example));
      const prompt = el("label", "sentence-make-label", word.prompt);
      const input = document.createElement("textarea");
      input.rows = 2;
      input.placeholder = "用这个词写一句学术英语";
      input.value = state.wordSentences[word.paperId + ":" + word.term] || "";
      input.dataset.wordKey = word.paperId + ":" + word.term;
      prompt.append(input);
      const save = el("button", "practice-button practice-button-small", "保存造句");
      save.type = "button";
      save.dataset.action = "save-word-sentence";
      save.dataset.wordKey = word.paperId + ":" + word.term;
      card.append(prompt, save);
      grid.append(card);
    });
    details.append(grid);
    parent.append(details);
  };

  const renderCloze = (paper, parent, keepOpen) => {
    const items = clozeTasks.filter((task) => task.paperId === paper.id);
    const details = el("details", "paper-cloze");
    details.open = Boolean(keepOpen);
    details.append(el("summary", "", "填空练习（" + items.length + " 题）"));
    details.append(el("p", "cloze-note", "题目依据论文的研究内容编写，用于回忆关键术语；逐句精读请使用上方原文记录区。"));
    const list = el("div", "cloze-list");
    items.forEach((task) => {
      const card = el("article", "cloze-card");
      card.dataset.taskId = task.paperId + ":" + task.section + ":" + task.prompt;
      card.append(el("span", "section-chip", task.section));
      const p = el("p", "cloze-sentence", task.prompt.replace("______", "________"));
      const input = document.createElement("input");
      input.type = "text";
      input.autocomplete = "off";
      input.placeholder = task.hint;
      input.value = state.translations["cloze:" + card.dataset.taskId]?.answer || "";
      input.className = "cloze-answer";
      card.append(p, input);
      const check = el("button", "practice-button practice-button-small", "核对");
      check.type = "button";
      check.dataset.action = "check-cloze";
      check.dataset.expected = task.answer;
      const result = el("span", "cloze-result", "");
      card.append(check, result);
      list.append(card);
    });
    details.append(list);
    parent.append(details);
  };

  const renderPlan = (paper, parent) => {
    const controls = el("div", "plan-controls");
    const label = el("label", "", "学习周期");
    const select = document.createElement("select");
    select.className = "plan-length";
    select.dataset.paperId = paper.id;
    select.append(option("7", "一周 · 7 天"));
    select.append(option("14", "两周 · 14 天"));
    select.value = String(state.papers[paper.id]?.planLength || 7);
    label.append(select);
    controls.append(label);
    const plan = getPlan(paper.id);
    const checked = state.papers[paper.id]?.checkedDays?.[String(plan.length)] || {};
    const list = el("ol", "study-plan-list");
    plan.forEach((day, index) => {
      const row = el("li", "study-plan-day");
      const labelDay = el("label", "study-day-label");
      const box = document.createElement("input");
      box.type = "checkbox";
      box.checked = Boolean(checked[index]);
      box.dataset.action = "complete-plan-day";
      box.dataset.paperId = paper.id;
      box.dataset.dayIndex = String(index);
      const main = el("span", "study-day-main");
      main.append(el("b", "", "第 " + (index + 1) + " 天 · " + day.section));
      const focusKey = day.focus || day.section.toLowerCase();
      if (paper.focus[focusKey]) main.append(el("span", "study-day-focus", paper.focus[focusKey]));
      main.append(el("span", "study-day-task", day.task));
      labelDay.append(box, main);
      row.append(labelDay);
      list.append(row);
    });
    parent.append(controls, list);
  };

  const renderPaperCards = (openId, keepVocabularyOpen, keepClozeOpen) => {
    const query = paperSearch.value.trim().toLocaleLowerCase();
    const topic = paperTopic.value;
    const type = paperType.value;
    const visible = paperLibrary.filter((paper) => {
      const searchable = [paper.title, paper.citation, paper.doi, paper.type, ...paper.topics, ...Object.values(paper.focus)].join(" ").toLocaleLowerCase();
      return searchable.includes(query) && (!topic || paper.topics.includes(topic)) && (!type || paper.type === type);
    });
    const pageCount = Math.max(1, Math.ceil(visible.length / PAPERS_PER_PAGE));
    paperPage = Math.min(paperPage, pageCount - 1);
    const pageItems = visible.slice(paperPage * PAPERS_PER_PAGE, (paperPage + 1) * PAPERS_PER_PAGE);
    paperCards.replaceChildren();
    pageItems.forEach((paper) => {
      const card = el("article", "paper-card");
      card.dataset.paperCard = paper.id;
      const head = el("div", "paper-card-heading");
      const titleWrap = el("div", "");
      titleWrap.append(el("span", "paper-type-label", paper.type + " · " + paper.year));
      titleWrap.append(el("h3", "", paper.title));
      titleWrap.append(el("p", "paper-citation", paper.citation));
      head.append(titleWrap);
      const mastery = el("span", "mastery-badge", state.papers[paper.id]?.mastery || "未开始");
      head.append(mastery);
      card.append(head);
      const tags = el("div", "paper-tags");
      paper.topics.forEach((tag) => tags.append(el("span", "paper-tag", tag)));
      card.append(tags);
      const links = el("div", "paper-source-block");
      links.append(el("b", "", "论文原文入口"));
      renderLinks(paper, links);
      card.append(links);
      if (paper.correction) card.append(el("p", "metadata-correction", paper.correction));
      card.append(el("p", "paper-access-note", paper.access));
      const study = el("details", "paper-study");
      study.open = openId === paper.id;
      study.append(el("summary", "", "展开章节学习计划与练习"));
      const focusList = el("ul", "paper-focus-list");
      SECTION_NAMES.forEach((section) => {
        const key = section.toLowerCase();
        const item = el("li", "");
        item.append(el("b", "", section + "："), document.createTextNode(paper.focus[key] || "阅读原文并记录本节结构。"));
        focusList.append(item);
      });
      study.append(el("h4", "paper-subheading", "本篇专项阅读重点"), focusList);
      const planHeading = el("h4", "paper-subheading", "按天学习原文");
      study.append(planHeading);
      renderPlan(paper, study);
      renderSentenceNotebook(paper, study);
      renderWordBank(paper, study, keepVocabularyOpen && openId === paper.id);
      renderCloze(paper, study, keepClozeOpen && openId === paper.id);
      card.append(study);
      paperCards.append(card);
    });
    paperCount.textContent = "共收录 " + paperLibrary.length + " 篇 · 符合筛选 " + visible.length + " 篇";
    paperEmpty.hidden = visible.length > 0;
    paperPageStatus.textContent = "第 " + (paperPage + 1) + " / " + pageCount + " 页，每页 " + PAPERS_PER_PAGE + " 篇";
    paperPrevious.disabled = paperPage <= 0;
    paperNext.disabled = paperPage >= pageCount - 1;
  };

  const expressionCards = document.querySelector("#expression-cards");
  const relationFilter = document.querySelector("#expression-relation-filter");
  const sectionFilter = document.querySelector("#expression-section-filter");
  const expressionSearch = document.querySelector("#expression-search");
  const expressionCount = document.querySelector("#expression-count");
  const renderExpressionFilters = () => {
    [...new Set(expressionBank.map((item) => item.relation))].forEach((relation) => relationFilter.append(option(relation, RELATION_LABELS[relation] || relation)));
    [...new Set(expressionBank.map((item) => item.section))].sort().forEach((section) => sectionFilter.append(option(section, section)));
  };
  const renderExpressions = () => {
    const query = expressionSearch.value.trim().toLocaleLowerCase();
    const visible = expressionBank.filter((item) => {
      const searchable = [item.phrase, item.function, item.template, item.mistake, item.section, item.relationLabel].join(" ").toLocaleLowerCase();
      return searchable.includes(query) && (!relationFilter.value || item.relation === relationFilter.value) && (!sectionFilter.value || item.section === sectionFilter.value);
    });
    expressionCards.replaceChildren();
    visible.forEach((item) => {
      const card = el("article", "expression-card");
      card.append(el("span", "relation-chip", item.relationLabel), el("span", "section-chip", item.section));
      card.append(el("h3", "", item.phrase), el("p", "expression-function", item.function), el("p", "expression-template", item.template), el("p", "expression-mistake", "易错点： " + item.mistake));
      const paper = paperFor(item.paperId);
      if (paper) {
        const source = el("a", "expression-source", "对应论文： " + paper.title);
        source.href = paper.publisherUrl;
        source.target = "_blank";
        source.rel = "noopener noreferrer";
        card.append(source);
      }
      expressionCards.append(card);
    });
    expressionCount.textContent = "共 " + expressionBank.length + " 条 · 当前显示 " + visible.length + " 条";
  };

  const quizContainer = document.querySelector("#logic-quiz-items");
  logicQuiz.forEach((item, index) => {
    const card = el("article", "logic-question");
    card.dataset.quizId = item.id;
    card.append(el("span", "quiz-number", "Q" + (index + 1)));
    card.append(el("p", "quiz-before", item.before), el("p", "quiz-after", item.after));
    const select = document.createElement("select");
    select.className = "logic-answer";
    select.append(option("", "选择逻辑关系"));
    item.options.forEach((value) => select.append(option(value, RELATION_LABELS[value] || value)));
    card.append(select, el("p", "logic-explanation", item.why));
    quizContainer.append(card);
  });

  const translationContainer = document.querySelector("#translation-items");
  const translationFilter = document.querySelector("#translation-paper-filter");
  const translationCount = document.querySelector("#translation-count");
  paperLibrary.forEach((paper) => translationFilter.append(option(paper.id, paper.title)));
  const renderTranslations = () => {
    const visible = translationTasks.filter((task) => !translationFilter.value || task.paperId === translationFilter.value);
    translationContainer.replaceChildren();
    visible.forEach((task, index) => {
      const paper = paperFor(task.paperId);
      const saved = state.translations[task.id] || {};
      const card = el("article", "translation-task");
      card.dataset.taskId = task.id;
      card.append(el("div", "translation-task-meta", (index + 1) + " · " + task.topic + " · " + (paper ? paper.title : "")));
      if (saved.attempts?.length) {
        const latest = saved.attempts[saved.attempts.length - 1];
        const reviewDate = saved.nextReviewAt ? new Date(saved.nextReviewAt).toLocaleDateString() : "未安排";
        card.append(el("p", "translation-history-summary", "已作答 " + saved.attempts.length + " 次 · 最近概念覆盖 " + latest.coverage + "/" + latest.total + " · 复测日期 " + reviewDate));
        if (saved.nextReviewAt && saved.nextReviewAt <= Date.now() && !saved.reviewing) {
          const review = el("button", "practice-button practice-button-small", "开始延迟复测");
          review.type = "button";
          review.dataset.action = "start-delayed-translation-review";
          review.dataset.taskId = task.id;
          card.append(review);
        }
        const history = el("details", "translation-attempt-history");
        history.append(el("summary", "", "查看历次作答"));
        const attempts = el("ol", "translation-attempt-list");
        saved.attempts.forEach((attempt, attemptIndex) => {
          const row = el("li", "", "第 " + (attemptIndex + 1) + " 次 · " + new Date(attempt.at).toLocaleString() + " · 概念覆盖 " + attempt.coverage + "/" + attempt.total + (attempt.kind === "delayed" ? " · 延迟复测" : ""));
          row.append(el("p", "", attempt.answer));
          attempts.append(row);
        });
        history.append(attempts);
        card.append(history);
      }
      card.append(el("p", "translation-prompt", task.prompt));
      const input = document.createElement("textarea");
      input.rows = 3;
      input.className = "translation-answer";
      input.placeholder = "先不看参考答案，试着翻译这句话。";
      input.value = saved.answer || "";
      card.append(input);
      const actions = el("div", "practice-actions");
      const check = el("button", "practice-button", "查看概念覆盖与参考表达");
      check.type = "button";
      check.dataset.action = "check-translation";
      const result = el("span", "practice-result", "");
      actions.append(check, result);
      card.append(actions);
      const feedback = el("div", "translation-feedback");
      feedback.hidden = !saved.checked;
      card.append(feedback);
      if (feedback.hidden === false) fillTranslationFeedback(task, input.value, feedback);
      translationContainer.append(card);
    });
    translationCount.textContent = visible.length + " 道练习 · 共 " + translationTasks.length + " 道";
  };
  const fillTranslationFeedback = (task, answer, parent) => {
    parent.replaceChildren();
    const normalized = answer.toLocaleLowerCase();
    const found = [];
    const missed = [];
    task.criteria.forEach((criterion) => {
      const matches = criterion.terms.some((term) => normalized.includes(term.toLocaleLowerCase()));
      (matches ? found : missed).push(criterion.label);
    });
    parent.append(el("p", "coverage-summary", "关键词提示：覆盖 " + found.length + "/" + task.criteria.length + " 个要点（仅供自查，不是自动语义评分）。"));
    if (found.length) parent.append(el("p", "coverage-found", "已体现： " + found.join("；")));
    if (missed.length) parent.append(el("p", "coverage-missed", "可再检查： " + missed.join("；")));
    parent.append(el("p", "model-answer", "参考表达： " + task.answer));
  };

  const recallCard = document.querySelector("#recall-card");
  const dueCount = document.querySelector("#recall-due-count");
  const recallDeck = expressionBank.map((item) => ({ id: "expr:" + item.id, front: item.phrase, back: item.function + " " + item.template, error: item.mistake, paperId: item.paperId, type: "表达" }));
  vocabularyBank.forEach((group) => group.items.forEach((word) => recallDeck.push({ id: "word:" + group.paperId + ":" + word.term, front: word.term + " · " + word.pos, back: word.meaning + "；搭配：" + word.collocation, error: word.prompt, paperId: group.paperId, type: "词汇" })));
  let activeRecallId = "";
  const renderRecall = () => {
    const now = Date.now();
    const due = recallDeck.filter((item) => !state.recall[item.id] || (state.recall[item.id].due || 0) <= now);
    dueCount.textContent = due.length + " 张待复习";
    const item = due[0] || recallDeck.slice().sort((a, b) => (state.recall[a.id]?.due || 0) - (state.recall[b.id]?.due || 0))[0];
    recallCard.replaceChildren();
    if (!item) return;
    activeRecallId = item.id;
    const paper = paperFor(item.paperId);
    recallCard.append(el("span", "recall-type", item.type), el("h3", "recall-front", item.front));
    const reveal = el("button", "practice-button practice-button-secondary", "显示解释与搭配");
    reveal.type = "button";
    reveal.dataset.action = "reveal-recall";
    recallCard.append(reveal);
    const back = el("div", "recall-back");
    back.hidden = true;
    back.append(el("p", "", item.back), el("p", "recall-error", "提醒： " + item.error));
    if (paper) back.append(el("p", "recall-paper", "来源论文： " + paper.title));
    recallCard.append(back);
    const rating = el("div", "recall-ratings");
    [["again", "再练 · 1 天"], ["hard", "有点难 · 3 天"], ["good", "记住了 · 7 天"]].forEach(([value, label]) => {
      const button = el("button", "practice-button practice-button-small", label);
      button.type = "button";
      button.dataset.action = "rate-recall";
      button.dataset.rating = value;
      rating.append(button);
    });
    recallCard.append(rating);
  };

  const paragraphPaper = document.querySelector("#paragraph-paper-select");
  const paragraphSection = document.querySelector("#paragraph-section-select");
  const paragraphPrompt = document.querySelector("#paragraph-prompt");
  const paragraphDraft = document.querySelector("#paragraph-draft");
  const draftWordCount = document.querySelector("#draft-word-count");
  const draftStatus = document.querySelector("#draft-save-status");
  const feedbackOutput = document.querySelector("#feedback-prompt-output");
  let draftTimer;
  paperLibrary.forEach((paper) => paragraphPaper.append(option(paper.id, paper.title)));
  const draftKey = () => paragraphPaper.value + ":" + paragraphSection.value;
  const updateWordCount = () => {
    const words = paragraphDraft.value.trim().match(/\b[\w'-]+\b/g) || [];
    draftWordCount.textContent = words.length + " words";
  };
  const loadDraft = () => {
    const draft = state.drafts[draftKey()] || { text: "", checks: [] };
    paragraphDraft.value = draft.text || "";
    document.querySelectorAll(".self-review-checklist input").forEach((checkbox) => { checkbox.checked = (draft.checks || []).includes(checkbox.value); });
    const paper = paperFor(paragraphPaper.value);
    const key = paragraphSection.value.toLowerCase();
    const specific = paper?.focus[key] || "";
    paragraphPrompt.replaceChildren();
    paragraphPrompt.append(el("p", "", paragraphPrompts[paragraphSection.value] || ""));
    if (specific) paragraphPrompt.append(el("p", "paper-specific-prompt", "结合所选论文： " + specific));
    updateWordCount();
    const versionList = document.querySelector("#draft-version-list");
    versionList.replaceChildren();
    (draft.versions || []).forEach((version, index) => {
      const row = el("li", "", "版本 " + (index + 1) + " · " + new Date(version.at).toLocaleString());
      row.append(el("pre", "draft-version-text", version.text));
      versionList.append(row);
    });
    draftStatus.textContent = state.drafts[draftKey()]?.updated ? "上次保存：" + new Date(state.drafts[draftKey()].updated).toLocaleString() : "尚未保存";
  };
  const saveDraft = (recordVersion, keyOverride, textOverride, checksOverride) => {
    const checks = checksOverride || [...document.querySelectorAll(".self-review-checklist input:checked")].map((checkbox) => checkbox.value);
    const key = keyOverride || draftKey();
    const text = textOverride === undefined ? paragraphDraft.value : textOverride;
    const previous = state.drafts[key] || {};
    const versions = previous.versions || [];
    if (recordVersion && text.trim() && (!versions.length || versions[versions.length - 1].text !== text)) versions.push({ text, at: Date.now() });
    state.drafts[key] = { text, checks, updated: Date.now(), versions };
    saveState();
    if (recordVersion) loadDraft();
    draftStatus.textContent = storageAvailable ? "已保存在当前浏览器" : "浏览器存储空间不足，未能保存";
    renderProgress();
  };
  const buildFeedbackPrompt = () => {
    const paper = paperFor(paragraphPaper.value);
    const checkText = [...document.querySelectorAll(".self-review-checklist input:checked")].map((checkbox) => checkbox.parentElement.textContent.trim()).join("；") || "尚未完成自检";
    const prompt = [
      "请作为学术英语写作导师，评阅下方段落。",
      "论文语境：" + (paper ? paper.title + "。研究重点：" + (paper.focus[paragraphSection.value.toLowerCase()] || "") : ""),
      "训练章节：" + paragraphSection.value,
      "请分别评估：①逻辑递进与连接词关系；②证据是否支持每个判断；③研究设计、样本与结论范围是否匹配；④语气和不确定性；⑤语法与学术搭配。",
      "先指出最影响学术质量的 3 个问题，再提供逐句修改建议和保留原意的修订稿。不要补造研究数据或因果结论。",
      "作者自检：" + checkText,
      "草稿：\n" + paragraphDraft.value
    ].join("\n\n");
    feedbackOutput.value = prompt;
    document.querySelector("#paragraph-feedback-status").textContent = "已生成评阅提示；静态网页不会自动发送草稿。";
  };

  const renderProgress = () => {
    const metrics = document.querySelector("#progress-metrics");
    const paperProgress = document.querySelector("#paper-progress-list");
    const weakList = document.querySelector("#weak-point-list");
    const completedDays = paperLibrary.reduce((sum, paper) => sum + Object.values(state.papers[paper.id]?.checkedDays?.[String(getPlan(paper.id).length)] || {}).filter(Boolean).length, 0);
    const totalDays = paperLibrary.reduce((sum, paper) => sum + getPlan(paper.id).length, 0);
    const translationDone = translationTasks.filter((task) => (state.translations[task.id]?.attempts || []).length > 0).length;
    const translationReviewDue = translationTasks.filter((task) => state.translations[task.id]?.nextReviewAt && state.translations[task.id].nextReviewAt <= Date.now()).length;
    const sentenceCount = Object.values(state.sentences).reduce((sum, rows) => sum + rows.length, 0);
    const draftCount = Object.values(state.drafts).filter((entry) => entry.text && entry.text.trim()).length;
    const draftRevisionCount = Object.values(state.drafts).reduce((sum, entry) => sum + (entry.versions || []).length, 0);
    const due = recallDeck.filter((item) => !state.recall[item.id] || (state.recall[item.id].due || 0) <= Date.now()).length;
    metrics.replaceChildren();
    [[completedDays + "/" + totalDays, "分日任务"], [translationDone + "/" + translationTasks.length, "完成过的中译英"], [translationReviewDue, "到期中译英复测"], [sentenceCount, "原文逐句记录"], [draftCount + " / " + draftRevisionCount, "草稿 / 版本"], [due, "待复习词汇 / 句型"]].forEach(([value, label]) => {
      const card = el("article", "progress-metric");
      card.append(el("b", "", value), el("span", "", label));
      metrics.append(card);
    });
    paperProgress.replaceChildren();
    paperLibrary.forEach((paper) => {
      const total = getPlan(paper.id).length;
      const checked = Object.values(state.papers[paper.id]?.checkedDays?.[String(total)] || {}).filter(Boolean).length;
      const row = el("div", "paper-progress-row");
      row.append(el("span", "", paper.title));
      const progress = document.createElement("progress");
      progress.max = total;
      progress.value = checked;
      progress.setAttribute("aria-label", paper.title + " learning progress");
      row.append(progress, el("small", "", checked + "/" + total + " 天"));
      paperProgress.append(row);
    });
    weakList.replaceChildren();
    const weakEntries = Object.entries(state.weakPoints).sort((a, b) => b[1] - a[1]);
    if (!weakEntries.length) weakList.append(el("p", "empty-note", "完成翻译和逻辑练习后，会在这里汇总待加强项。"));
    weakEntries.slice(0, 8).forEach(([label, count]) => {
      const row = el("p", "weak-point-item", label + " · " + count + " 次需要复查");
      weakList.append(row);
    });
    const note = document.querySelector(".local-storage-note");
    if (note) note.textContent = storageAvailable ? "草稿、答案和学习进度仅保存在当前浏览器 localStorage，不会同步到服务器或其他设备。" : "当前浏览器无法写入 localStorage；请检查隐私模式或存储空间。";
  };

  const openPaperAndRerender = (paperId, keepVocabularyOpen, keepClozeOpen) => renderPaperCards(paperId, keepVocabularyOpen, keepClozeOpen);

  paperCards.addEventListener("change", (event) => {
    const target = event.target;
    const paperId = target.dataset.paperId;
    if (target.classList.contains("plan-length")) {
      state.papers[paperId] = state.papers[paperId] || { checkedDays: {} };
      state.papers[paperId].planLength = Number(target.value);
      saveState();
      renderPaperCards(paperId);
      renderProgress();
    } else if (target.dataset.action === "complete-plan-day") {
      state.papers[paperId] = state.papers[paperId] || { checkedDays: {} };
      state.papers[paperId].checkedDays = state.papers[paperId].checkedDays || {};
      const planLength = target.closest(".paper-card").querySelector(".plan-length").value;
      state.papers[paperId].checkedDays[planLength] = state.papers[paperId].checkedDays[planLength] || {};
      state.papers[paperId].checkedDays[planLength][target.dataset.dayIndex] = target.checked;
      const total = getPlan(paperId).length;
      const count = Object.values(state.papers[paperId].checkedDays[planLength]).filter(Boolean).length;
      state.papers[paperId].mastery = count === total ? "已完成" : count ? "学习中" : "未开始";
      saveState();
      renderProgress();
      const badge = document.querySelector('[data-paper-card="' + paperId + '"] .mastery-badge');
      if (badge) badge.textContent = state.papers[paperId].mastery;
    }
  });

  paperCards.addEventListener("input", (event) => {
    const target = event.target;
    if (target.dataset.wordKey) {
      state.wordSentences[target.dataset.wordKey] = target.value;
      saveState();
    }
  });

  paperCards.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const action = button.dataset.action;
    const paperId = button.dataset.paperId;
    if (action === "save-source-sentence") {
      const entry = button.closest(".sentence-entry");
      const original = entry.querySelector(".sentence-original").value.trim();
      const translation = entry.querySelector(".sentence-chinese").value.trim();
      const targetWord = entry.querySelector(".sentence-cloze-target").value.trim();
      if (!original || !translation) {
        entry.querySelector(".sentence-original").focus();
        return;
      }
      state.sentences[paperId] = state.sentences[paperId] || [];
      state.sentences[paperId].push({ section: entry.querySelector(".sentence-section").value, original, translation, targetWord, savedAt: Date.now() });
      saveState();
      openPaperAndRerender(paperId, false, false);
      renderProgress();
    } else if (action === "remove-source-sentence") {
      const rows = state.sentences[paperId] || [];
      rows.splice(Number(button.dataset.index), 1);
      saveState();
      openPaperAndRerender(paperId, false, false);
      renderProgress();
    } else if (action === "save-word-sentence") {
      const key = button.dataset.wordKey;
      const input = document.querySelector('[data-word-key="' + key.replace(/"/g, '\\"') + '"]');
      if (input) state.wordSentences[key] = input.value.trim();
      saveState();
      openPaperAndRerender(paperId, true, false);
      renderProgress();
    } else if (action === "check-cloze") {
      const card = button.closest(".cloze-card");
      const answer = card.querySelector(".cloze-answer").value.trim().toLowerCase();
      const expected = button.dataset.expected.toLowerCase();
      const result = card.querySelector(".cloze-result");
      const correct = answer === expected;
      result.textContent = correct ? "正确。" : "再看提示后试一次；参考词：" + button.dataset.expected;
      result.className = "cloze-result " + (correct ? "is-correct" : "is-incorrect");
      if (!correct) setWeakPoint("论文关键词填空");
      const key = "cloze:" + card.dataset.taskId;
      state.translations[key] = { answer, checked: true, correct };
      saveState();
      renderProgress();
    } else if (action === "check-source-cloze") {
      const item = button.closest(".saved-sentence");
      const answer = item.querySelector(".saved-source-cloze-answer").value.trim().toLocaleLowerCase();
      const correct = answer === button.dataset.expected.toLocaleLowerCase();
      const result = item.querySelector(".cloze-result");
      result.textContent = correct ? "正确，和原句关键词一致。" : "再想一想，可展开查看原句。";
      result.className = "cloze-result " + (correct ? "is-correct" : "is-incorrect");
      if (!correct) setWeakPoint("原文句子关键词回忆");
      saveState();
      renderProgress();
    }
  });

  translationContainer.addEventListener("input", (event) => {
    const card = event.target.closest(".translation-task");
    if (!card) return;
    state.translations[card.dataset.taskId] = Object.assign({}, state.translations[card.dataset.taskId], { answer: event.target.value });
    saveState();
  });
  translationContainer.addEventListener("click", (event) => {
    const reviewButton = event.target.closest("button[data-action='start-delayed-translation-review']");
    if (reviewButton) {
      const saved = state.translations[reviewButton.dataset.taskId] || {};
      saved.answer = "";
      saved.reviewing = true;
      saved.checked = false;
      state.translations[reviewButton.dataset.taskId] = saved;
      saveState();
      renderTranslations();
      return;
    }
    const button = event.target.closest("button[data-action='check-translation']");
    if (!button) return;
    const card = button.closest(".translation-task");
    const task = translationTasks.find((entry) => entry.id === card.dataset.taskId);
    const answer = card.querySelector(".translation-answer").value.trim();
    const feedback = card.querySelector(".translation-feedback");
    fillTranslationFeedback(task, answer, feedback);
    feedback.hidden = false;
    const normalized = answer.toLocaleLowerCase();
    task.criteria.forEach((criterion) => {
      if (!criterion.terms.some((term) => normalized.includes(term.toLocaleLowerCase()))) setWeakPoint(criterion.label);
    });
    const previous = state.translations[task.id] || {};
    const coverage = task.criteria.filter((criterion) => criterion.terms.some((term) => normalized.includes(term.toLocaleLowerCase()))).length;
    const attempts = previous.attempts || [];
    attempts.push({ answer, coverage, total: task.criteria.length, at: Date.now(), kind: previous.reviewing ? "delayed" : "practice" });
    state.translations[task.id] = {
      answer,
      checked: true,
      checkedAt: Date.now(),
      attempts,
      reviewing: false,
      nextReviewAt: Date.now() + 3 * 24 * 60 * 60 * 1000
    };
    saveState();
    renderTranslations();
    renderProgress();
  });

  document.querySelector("#check-logic-quiz").addEventListener("click", () => {
    let correct = 0;
    document.querySelectorAll(".logic-question").forEach((card) => {
      const item = logicQuiz.find((entry) => entry.id === card.dataset.quizId);
      const answer = card.querySelector(".logic-answer").value;
      const isCorrect = answer === item.answer;
      card.classList.toggle("is-correct", isCorrect);
      card.classList.toggle("is-incorrect", Boolean(answer) && !isCorrect);
      card.querySelector(".logic-explanation").hidden = false;
      if (isCorrect) correct += 1;
      else if (answer) setWeakPoint("学术连接词逻辑辨析");
      state.logicChecks[item.id] = isCorrect;
    });
    document.querySelector("#logic-quiz-result").textContent = "答对 " + correct + "/" + logicQuiz.length + " 题；请按解释复核关系类型。";
    saveState();
    renderProgress();
  });

  expressionSearch.addEventListener("input", renderExpressions);
  relationFilter.addEventListener("change", renderExpressions);
  sectionFilter.addEventListener("change", renderExpressions);
  translationFilter.addEventListener("change", renderTranslations);
  paperSearch.addEventListener("input", () => { paperPage = 0; renderPaperCards(); });
  paperTopic.addEventListener("change", () => { paperPage = 0; renderPaperCards(); });
  paperType.addEventListener("change", () => { paperPage = 0; renderPaperCards(); });
  paperPrevious.addEventListener("click", () => { paperPage = Math.max(0, paperPage - 1); renderPaperCards(); });
  paperNext.addEventListener("click", () => { paperPage += 1; renderPaperCards(); });

  recallCard.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    if (button.dataset.action === "reveal-recall") {
      recallCard.querySelector(".recall-back").hidden = false;
    } else if (button.dataset.action === "rate-recall") {
      const interval = { again: 1, hard: 3, good: 7 }[button.dataset.rating] || 1;
      state.recall[activeRecallId] = { due: Date.now() + interval * 24 * 60 * 60 * 1000, interval, last: Date.now(), rating: button.dataset.rating };
      saveState();
      renderRecall();
      renderProgress();
    }
  });

  paragraphPaper.addEventListener("change", loadDraft);
  paragraphSection.addEventListener("change", loadDraft);
  paragraphDraft.addEventListener("input", () => {
    updateWordCount();
    draftStatus.textContent = "正在保存…";
    const key = draftKey();
    const text = paragraphDraft.value;
    const checks = [...document.querySelectorAll(".self-review-checklist input:checked")].map((checkbox) => checkbox.value);
    window.clearTimeout(draftTimer);
    draftTimer = window.setTimeout(() => saveDraft(false, key, text, checks), 450);
  });
  document.querySelectorAll(".self-review-checklist input").forEach((checkbox) => checkbox.addEventListener("change", () => saveDraft(false)));
  document.querySelector("#save-paragraph").addEventListener("click", () => saveDraft(true));
  document.querySelector("#build-feedback-prompt").addEventListener("click", buildFeedbackPrompt);
  document.querySelector("#copy-feedback-prompt").addEventListener("click", async () => {
    if (!feedbackOutput.value) buildFeedbackPrompt();
    try {
      await navigator.clipboard.writeText(feedbackOutput.value);
      document.querySelector("#paragraph-feedback-status").textContent = "评阅提示已复制。";
    } catch (_) {
      feedbackOutput.focus();
      feedbackOutput.select();
      document.querySelector("#paragraph-feedback-status").textContent = "请手动复制已选中的评阅提示。";
    }
  });

  renderPaperFilters();
  renderExpressionFilters();
  renderPaperCards();
  renderExpressions();
  renderTranslations();
  renderRecall();
  loadDraft();
  renderProgress();
})();
