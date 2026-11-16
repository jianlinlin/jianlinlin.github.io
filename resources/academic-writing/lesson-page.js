(() => {
  "use strict";

  const STORAGE_KEY = "academic-writing-library-v3";
  const routeParts = window.location.pathname.split("/").filter(Boolean);
  const paperId = routeParts[routeParts.length - 2];
  const dayMatch = (routeParts[routeParts.length - 1] || "").match(/^day-(\d{2})\.html$/);
  const dayNumber = Number(dayMatch?.[1]);
  const paper = paperLibrary.find((item) => item.id === paperId);
  const allLessons = dailyLessons[paperId] || [];
  const lessonIndex = paperId === "iage" ? dayNumber - 1 : (dayNumber > 7 ? dayNumber - 8 : dayNumber - 1);
  const lesson = allLessons[lessonIndex];
  const root = document.querySelector("#lesson-content");
  const navs = [...document.querySelectorAll(".lesson-navigation")];
  const pageState = document.querySelector("#lesson-progress");
  const wordGroup = vocabularyBank.find((group) => group.paperId === paperId);

  const readState = () => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return Object.assign({ papers: {}, sentences: {}, wordSentences: {}, translations: {}, recall: {}, drafts: {}, weakPoints: {}, logicChecks: {}, dailyExercises: {} }, stored);
    } catch (_) {
      return { papers: {}, sentences: {}, wordSentences: {}, translations: {}, recall: {}, drafts: {}, weakPoints: {}, logicChecks: {}, dailyExercises: {} };
    }
  };
  const state = readState();
  state.papers = state.papers || {};
  state.sentences = state.sentences || {};
  state.wordSentences = state.wordSentences || {};
  state.dailyExercises = state.dailyExercises || {};
  const paperState = state.papers[paperId] || {};
  let planLength = paperState.planLength === 14 || dayNumber > 7 ? 14 : 7;
  const index = dayNumber - 1;
  const answerKey = (field) => paperId + ":" + index + ":" + field;
  const saved = (field) => state.dailyExercises[answerKey(field)] || {};
  const writeState = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = String(text);
    return node;
  };
  const reveal = (summary, text) => {
    const details = el("details", "lesson-answer-reveal");
    details.append(el("summary", "", summary), el("p", "", text));
    return details;
  };
  const saveField = (field, value, extra = {}) => {
    state.dailyExercises[answerKey(field)] = Object.assign({}, state.dailyExercises[answerKey(field)], extra, { answer: value });
    writeState();
  };

  if (!paper || !lesson || !root) {
    root?.append(el("p", "empty-note", "没有找到这一天的训练内容，请返回论文库重新选择。"));
    return;
  }

  document.title = "第 " + dayNumber + " 天 · " + lesson.title + " | Academic Writing Lab";
  document.querySelector("#paper-title").textContent = paper.title;
  document.querySelector("#lesson-title").textContent = lesson.title;
  document.querySelector("#lesson-day-label").textContent = "DAY " + String(dayNumber).padStart(2, "0") + " / 14 · " + lesson.section;
  document.querySelector("#lesson-scope").textContent = lesson.scope;
  const source = paper.links.find((link) => link.label.includes("PMC 全文"))
    || paper.links.find((link) => link.label.includes("作者版本"))
    || paper.links[0];
  const sourceLink = document.querySelector("#open-source-paper");
  sourceLink.href = source.url;
  sourceLink.textContent = "打开论文全文：" + source.label;
  sourceLink.target = "_blank";
  sourceLink.rel = "noopener noreferrer";

  const savedDays = paperState.checkedDays || {};
  const planSelect = document.querySelector("#lesson-plan-length");
  planSelect.value = String(planLength);
  if (dayNumber > 7) planSelect.querySelector('option[value="7"]').disabled = true;
  planSelect.addEventListener("change", () => {
    planLength = Number(planSelect.value);
    state.papers[paperId] = Object.assign({}, state.papers[paperId], { planLength });
    writeState();
    renderNavigation();
  });

  const renderNavigation = () => {
    navs.forEach((container) => {
      container.replaceChildren();
      const back = el("a", "lesson-nav-link", "← 返回论文库");
      back.href = "../../index.html#paper-library";
      container.append(back);
      if (dayNumber > 1) {
        const previous = el("a", "lesson-nav-link", "← 第 " + (dayNumber - 1) + " 天");
        previous.href = "day-" + String(dayNumber - 1).padStart(2, "0") + ".html";
        container.append(previous);
      }
      if (dayNumber < planLength) {
        const next = el("a", "lesson-nav-link lesson-nav-next", "第 " + (dayNumber + 1) + " 天 →");
        next.href = "day-" + String(dayNumber + 1).padStart(2, "0") + ".html";
        container.append(next);
      }
    });
  };
  renderNavigation();

  const phase = paperId === "iage"
    ? (dayNumber <= 7 ? "第一周 · 原文分节精读" : "第二周 · 结果、机制与全文综合")
    : (dayNumber <= 7 ? "首次精读 · 先读原文再做练习" : "间隔复习 · 先回忆，再回原文核对");
  root.append(el("p", "lesson-phase", phase));
  const readingCard = el("section", "lesson-card lesson-reading-card");
  readingCard.append(el("h2", "", "原文精读与逐句翻译"), el("p", "", "先通过上方链接打开论文全文，再读完今天指定的全部段落。每读一句，就在本页下方录入原句并写出中文翻译；保存后可逐句回看。题目按原文各章节的研究内容编写，参考答案是训练用改写，不是论文原句的翻译。"));
  readingCard.append(el("p", "lesson-reading-scope", lesson.scope));
  root.append(readingCard);

  const vocabulary = el("section", "lesson-card");
  vocabulary.append(el("h2", "", "今日重点词汇"));
  const vocabularyGrid = el("div", "lesson-vocabulary-grid");
  (lesson.terms || []).forEach((term) => {
    const word = wordGroup?.items.find((entry) => entry.term === term);
    if (!word) return;
    const card = el("article", "lesson-word-card");
    card.append(el("h3", "", word.term + " · " + word.pos));
    card.append(el("p", "", word.meaning), el("p", "", "常见搭配：" + word.collocation), el("p", "lesson-word-example", "例句：" + word.example));
    const label = el("label", "lesson-field-label", word.practice?.prompt || lesson.sentence.prompt);
    const makeSentence = document.createElement("textarea");
    makeSentence.rows = 2;
    makeSentence.placeholder = "自己造一句学术英语。";
    makeSentence.value = state.wordSentences[paperId + ":" + word.term] || "";
    makeSentence.addEventListener("input", () => {
      state.wordSentences[paperId + ":" + word.term] = makeSentence.value;
      writeState();
    });
    label.append(makeSentence);
    card.append(label, reveal("查看造句参考", word.practice?.model || lesson.sentence.model));
    vocabularyGrid.append(card);
  });
  vocabulary.append(vocabularyGrid);
  root.append(vocabulary);

  const cloze = el("section", "lesson-card lesson-exercise-card");
  cloze.append(el("h2", "", "词汇填空"), el("p", "", "每题都围绕今天读到的研究概念或学术表达，先独立作答，再核对。"));
  const clozeItems = lesson.clozes || [lesson.cloze];
  clozeItems.forEach((item, itemIndex) => {
    const field = lesson.clozes ? "cloze-" + (itemIndex + 1) : "cloze";
    const prior = saved(field);
    const exercise = el("article", "lesson-daily-exercise");
    exercise.append(el("p", "", (itemIndex + 1) + ". " + item.prompt));
    const clozeInput = document.createElement("input");
    clozeInput.type = "text";
    clozeInput.className = "lesson-answer-input";
    clozeInput.placeholder = item.hint;
    clozeInput.value = prior.answer || "";
    clozeInput.addEventListener("input", () => saveField(field, clozeInput.value));
    const clozeResult = el("p", "lesson-feedback", prior.checked ? (prior.correct ? "上次核对正确。" : "上次答案需要复习。") : "");
    const checkCloze = el("button", "practice-button practice-button-small", "核对答案");
    checkCloze.type = "button";
    checkCloze.addEventListener("click", () => {
      const correct = clozeInput.value.trim().toLowerCase() === item.answer.toLowerCase();
      clozeResult.textContent = correct ? "正确。" : "再想一次；参考词：" + item.answer;
      clozeResult.className = "lesson-feedback " + (correct ? "is-correct" : "is-incorrect");
      saveField(field, clozeInput.value, { checked: true, correct });
    });
    exercise.append(clozeInput, checkCloze, clozeResult);
    cloze.append(exercise);
  });
  root.append(cloze);

  const translation = el("section", "lesson-card lesson-exercise-card");
  translation.append(el("h2", "", "中译英：论文内容改写"), el("p", "", "中文题目依据原文中的研究设计、发现和论证关系编写。请先自己译成学术英语，再看一种参考写法。"));
  const translationItems = lesson.translations || [lesson.translation];
  translationItems.forEach((item, itemIndex) => {
    const field = lesson.translations ? "translation-" + (itemIndex + 1) : "translation";
    const exercise = el("article", "lesson-daily-exercise");
    exercise.append(el("p", "", (itemIndex + 1) + ". " + item.prompt));
    const translationInput = document.createElement("textarea");
    translationInput.rows = 3;
    translationInput.placeholder = "先独立翻译，再展开参考译文；允许多种准确表达。";
    translationInput.value = saved(field).answer || "";
    translationInput.addEventListener("input", () => saveField(field, translationInput.value));
    exercise.append(translationInput, reveal("查看参考译文", item.answer));
    translation.append(exercise);
  });
  root.append(translation);

  const logic = el("section", "lesson-card lesson-exercise-card");
  logic.append(el("h2", "", "逻辑递进词辨析"), el("p", "lesson-connector-prompt", lesson.connector.before + " ___ " + lesson.connector.after));
  const connectorSelect = document.createElement("select");
  connectorSelect.className = "lesson-answer-input";
  connectorSelect.append(new Option("选择最合适的逻辑关系词", ""));
  lesson.connector.options.forEach((choice) => connectorSelect.append(new Option(choice, choice)));
  connectorSelect.value = saved("connector").answer || "";
  connectorSelect.addEventListener("change", () => saveField("connector", connectorSelect.value));
  const connectorResult = el("p", "lesson-feedback", "");
  const checkConnector = el("button", "practice-button", "核对逻辑");
  checkConnector.type = "button";
  checkConnector.addEventListener("click", () => {
    const correct = connectorSelect.value === lesson.connector.answer;
    connectorResult.textContent = correct ? "正确。" : "参考答案：" + lesson.connector.answer;
    connectorResult.className = "lesson-feedback " + (correct ? "is-correct" : "is-incorrect");
    saveField("connector", connectorSelect.value, { checked: true, correct });
  });
  logic.append(connectorSelect, checkConnector, connectorResult, reveal("查看解析", lesson.connector.why));
  root.append(logic);

  const paragraph = el("section", "lesson-card lesson-exercise-card");
  paragraph.append(el("h2", "", "段落训练"), el("p", "", lesson.paragraph));
  const paragraphInput = document.createElement("textarea");
  paragraphInput.rows = 8;
  paragraphInput.placeholder = "Write your paragraph here. The draft is saved in this browser.";
  paragraphInput.value = saved("paragraph").answer || "";
  paragraphInput.addEventListener("input", () => {
    saveField("paragraph", paragraphInput.value);
    paragraph.querySelector(".lesson-save-status").textContent = "已保存到本机浏览器";
  });
  paragraph.append(paragraphInput, el("span", "lesson-save-status", paragraphInput.value ? "已保存到本机浏览器" : "输入后自动保存"));
  root.append(paragraph);

  const notebook = el("section", "lesson-card lesson-notebook");
  notebook.append(el("h2", "", "原文逐句精读与中译记录"), el("p", "", "从论文全文中每次选一句：先写中文翻译，再保存。重复这一过程直到读完整篇。原文和译文只保存在当前浏览器。"));
  const sentenceForm = el("div", "lesson-sentence-form");
  sentenceForm.append(el("span", "lesson-section-tag", lesson.section));
  const sourceSentence = document.createElement("textarea");
  sourceSentence.rows = 2;
  sourceSentence.placeholder = "粘贴正在学习的这一句英文原文";
  sourceSentence.setAttribute("aria-label", "正在学习的英文原文句子");
  const chineseSentence = document.createElement("textarea");
  chineseSentence.rows = 2;
  chineseSentence.placeholder = "写下这一句的中文翻译";
  chineseSentence.setAttribute("aria-label", "英文原句的中文翻译");
  const targetWord = document.createElement("input");
  targetWord.type = "text";
  targetWord.placeholder = "可选：关键词（保存后可生成原文填空）";
  const saveSentence = el("button", "practice-button", "保存这一句");
  saveSentence.type = "button";
  const sentenceList = el("ol", "lesson-sentence-list");
  const renderSentenceRows = () => {
    sentenceList.replaceChildren();
    const rows = state.sentences[paperId] || [];
    rows.forEach((row, rowIndex) => {
      const item = el("li", "lesson-sentence-row");
      item.append(el("span", "lesson-section-tag", row.section + (row.day ? " · 第 " + row.day + " 天" : "")));
      if (row.targetWord && row.original.toLocaleLowerCase().includes(row.targetWord.toLocaleLowerCase())) {
        const clozeText = row.original.replace(new RegExp(row.targetWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), "________");
        item.append(el("p", "lesson-source-cloze", clozeText));
        const recallInput = document.createElement("input");
        recallInput.className = "lesson-answer-input";
        recallInput.placeholder = "回忆关键词";
        const recallButton = el("button", "practice-button practice-button-small", "核对原文填空");
        recallButton.type = "button";
        const recallFeedback = el("span", "lesson-feedback", "");
        recallButton.addEventListener("click", () => {
          const correct = recallInput.value.trim().toLowerCase() === row.targetWord.toLowerCase();
          recallFeedback.textContent = correct ? "正确。" : "请重新回忆后再核对。";
          recallFeedback.className = "lesson-feedback " + (correct ? "is-correct" : "is-incorrect");
        });
        item.append(recallInput, recallButton, recallFeedback);
      }
      const revealRow = el("details", "lesson-answer-reveal");
      revealRow.append(el("summary", "", "展开原文与我的译文"), el("p", "", row.original), el("p", "", row.translation));
      const remove = el("button", "text-button", "删除本条记录");
      remove.type = "button";
      remove.addEventListener("click", () => {
        rows.splice(rowIndex, 1);
        state.sentences[paperId] = rows;
        writeState();
        renderSentenceRows();
      });
      item.append(revealRow, remove);
      sentenceList.append(item);
    });
    pageState.textContent = "本篇已保存 " + rows.length + " 句";
  };
  saveSentence.addEventListener("click", () => {
    if (!sourceSentence.value.trim() || !chineseSentence.value.trim()) {
      (sourceSentence.value.trim() ? chineseSentence : sourceSentence).focus();
      return;
    }
    state.sentences[paperId] = state.sentences[paperId] || [];
    state.sentences[paperId].push({ section: lesson.section, day: dayNumber, original: sourceSentence.value.trim(), translation: chineseSentence.value.trim(), targetWord: targetWord.value.trim(), savedAt: Date.now() });
    writeState();
    sourceSentence.value = "";
    chineseSentence.value = "";
    targetWord.value = "";
    renderSentenceRows();
  });
  sentenceForm.append(sourceSentence, chineseSentence, targetWord, saveSentence);
  notebook.append(sentenceForm, pageState, sentenceList);
  root.append(notebook);
  renderSentenceRows();

  const complete = el("section", "lesson-completion");
  const completeButton = el("button", "practice-button", "标记当天训练完成");
  completeButton.type = "button";
  const completionText = el("span", "lesson-feedback", savedDays[String(planLength)]?.[String(index)] ? "今天已完成。" : "");
  completeButton.addEventListener("click", () => {
    state.papers[paperId] = state.papers[paperId] || { checkedDays: {} };
    state.papers[paperId].planLength = planLength;
    state.papers[paperId].checkedDays = state.papers[paperId].checkedDays || {};
    state.papers[paperId].checkedDays[String(planLength)] = state.papers[paperId].checkedDays[String(planLength)] || {};
    state.papers[paperId].checkedDays[String(planLength)][String(index)] = true;
    const done = Object.values(state.papers[paperId].checkedDays[String(planLength)]).filter(Boolean).length;
    state.papers[paperId].mastery = done === planLength ? "已完成" : "学习中";
    writeState();
    completionText.textContent = "已标记完成；本周期完成 " + done + " / " + planLength + " 天。";
  });
  complete.append(completeButton, completionText);
  root.append(complete);
})();
