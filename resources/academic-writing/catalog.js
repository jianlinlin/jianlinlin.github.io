const writingLessons = [
  {
    title: "Extreme Heat and Old Age",
    date: "2026-08-24",
    level: "Intermediate",
    topics: ["老龄健康", "气候变化", "公共卫生"],
    keywords: ["extreme heat", "older adults", "heat stress", "climate"],
    description: "从高温对老年人健康的影响出发，练习风险描述、因果表达和公共卫生词汇。",
    href: "extreme-heat-old-age/"
  }
];

const lessonCards = document.querySelector("#lesson-cards");
const lessonSearch = document.querySelector("#lesson-search");
const lessonTopic = document.querySelector("#lesson-topic");
const lessonCount = document.querySelector("#lesson-count");
const lessonEmpty = document.querySelector("#lesson-empty");

if (lessonCards && lessonSearch && lessonTopic && lessonCount && lessonEmpty) {
  const topics = [...new Set(writingLessons.flatMap((lesson) => lesson.topics))].sort((a, b) => a.localeCompare(b, "zh-CN"));
  topics.forEach((topic) => {
    const option = document.createElement("option");
    option.value = topic;
    option.textContent = topic;
    lessonTopic.append(option);
  });

  const renderLessons = () => {
    const query = lessonSearch.value.trim().toLocaleLowerCase();
    const topic = lessonTopic.value;
    const visibleLessons = writingLessons.filter((lesson) => {
      const searchableText = [lesson.title, lesson.description, lesson.level, ...lesson.topics, ...lesson.keywords].join(" ").toLocaleLowerCase();
      return searchableText.includes(query) && (!topic || lesson.topics.includes(topic));
    });
    lessonCards.replaceChildren();
    visibleLessons.forEach((lesson) => {
      const card = document.createElement("a");
      card.className = "lesson-card";
      card.href = lesson.href;
      const icon = document.createElement("i");
      icon.className = "fa fa-book lesson-card-icon";
      icon.setAttribute("aria-hidden", "true");
      const meta = document.createElement("span");
      meta.className = "lesson-meta";
      meta.textContent = `${lesson.date} · ${lesson.level}`;
      const title = document.createElement("h2");
      title.textContent = lesson.title;
      const description = document.createElement("p");
      description.textContent = lesson.description;
      const tags = document.createElement("span");
      tags.className = "lesson-tags";
      lesson.topics.forEach((topicName) => {
        const tag = document.createElement("span");
        tag.className = "lesson-tag";
        tag.textContent = topicName;
        tags.append(tag);
      });
      const open = document.createElement("span");
      open.className = "lesson-open";
      open.textContent = "开始练习 →";
      card.append(icon, meta, title, description, tags, open);
      lessonCards.append(card);
    });
    lessonCount.textContent = `共收录 ${writingLessons.length} 篇 · 当前显示 ${visibleLessons.length} 篇`;
    lessonEmpty.hidden = visibleLessons.length > 0;
  };

  lessonSearch.addEventListener("input", renderLessons);
  lessonTopic.addEventListener("change", renderLessons);
  renderLessons();
}
