const menuButton = document.querySelector(".site-nav .menu-icon");
const navigation = document.querySelector(".site-nav .trigger");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link?.getAttribute("href") === "#resources") {
      const resources = document.querySelector("#resources-details");
      if (resources) resources.open = true;
    }
    if (link) {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("open");
    }
  });
}

const publications = [...document.querySelectorAll(".pub")];
document.querySelector("#show-selected-btn")?.addEventListener("click", () => {
  publications.forEach((publication) => {
    publication.hidden = publication.dataset.selected !== "true";
  });
});
document.querySelector("#show-all-btn")?.addEventListener("click", () => {
  publications.forEach((publication) => {
    publication.hidden = false;
  });
});

const backToTop = document.querySelector(".back-to-top");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 220 ? "block" : "none";
  });
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// Keep the page bilingual without duplicating its layout or breaking inline links.
const englishToChinese = {
  "Toggle navigation": "展开导航",
  "Biography": "个人简介",
  "Experiences": "经历",
  "Publications": "论文发表",
  "Blog & Research Notes": "博客与研究笔记",
  "Honors & Awards": "荣誉与奖励",
  "Academic Services": "学术服务",
  "中文": "English",
  "PhD Student · Macao Polytechnic University": "澳门理工大学博士生",
  "· Macau, China": "· 中国澳门",
  "About": "关于我",
  "I am a PhD student at": "我目前是",
  ". My research uses epidemiological and statistical approaches to study population health, with a particular interest in aging and changes in health over time. I am interested in careful study design, longitudinal data, and methods that can make evidence from observational health research more informative.": "博士生，主要运用流行病学和统计学方法研究人群健康，尤其关注老龄化及健康随时间的变化。我也关注严谨的研究设计、纵向数据，以及提升观察性健康研究证据质量的方法。",
  "My previous training is in applied statistics and epidemiology and health statistics. I have worked on questions spanning healthy aging, chronic conditions, lifestyle, health services, and clinical research.": "我接受过应用统计学、流行病学与卫生统计学训练，研究涉及健康老龄化、慢性病、生活方式、卫生服务和临床研究。",
  "Interests": "研究兴趣",
  "Healthy aging and life-course health": "健康老龄化与生命历程健康",
  "Longitudinal epidemiology and population cohorts": "纵向流行病学与人群队列",
  "Causal inference and applied statistics": "因果推断与应用统计",
  "Health services, chronic conditions, and lifestyle": "卫生服务、慢性病与生活方式",
  "R programming and reproducible analysis": "R 编程与可重复分析",
  "Education": "教育经历",
  "Macao Polytechnic University": "澳门理工大学",
  "Xiamen University": "厦门大学",
  "Hainan Medical University": "海南医科大学",
  "Peking University Shenzhen Hospital": "北京大学深圳医院",
  "PhD student · Supervisor:": "博士生 · 导师：",
  "MM in Epidemiology & Health Statistics, 2019–2022 · Supervisor:": "流行病与卫生统计学硕士，2019–2022 · 导师：",
  "BS in Applied Statistics, 2015–2019 · Supervisor:": "应用统计学学士，2015–2019 · 导师：",
  "Professor Kefeng Li": "李克峰教授",
  "Professor Ya Fang": "方亚教授",
  "Professor Li Cao": "曹莉教授",
  "News": "新闻动态",
  "Research on nonlinear molecular trajectories in human cerebellar aging appeared in": "关于人类小脑衰老中非线性分子轨迹的研究发表于",
  "A longitudinal analysis of cardiovascular-kidney-metabolic syndrome and sensory impairments appeared in": "关于心血管-肾脏-代谢综合征与感觉障碍的纵向分析发表于",
  "A comparative causal-inference analysis of dietary patterns and mortality appeared in": "关于膳食模式与死亡率的比较因果推断分析发表于",
  "Experiences": "经历",
  "Current": "目前",
  "PhD Student @": "博士生 ·",
  "Research in population health, epidemiology, aging, and applied statistics.": "研究方向包括人群健康、流行病学、老龄化与应用统计。",
  "From July 2022": "2022年7月起",
  "Statistician for Clinical Research @": "临床研究统计师 ·",
  "Supported clinical research through study design, sample-size calculation, and statistical-methods consulting.": "为临床研究提供设计、样本量计算和统计方法咨询支持。",
  "Show Representative": "显示代表作",
  "Show All": "显示全部",
  "See the full publication list on": "完整论文列表请见",
  "Research notes, methods, and reflections": "研究笔记、方法与思考",
  "Short notes and occasional posts on epidemiology, statistical methods, cohort data, public health, and academic life will be collected in one place.": "在这里分享流行病学、统计方法、队列数据、公共卫生及学术生活相关的简短笔记与文章。",
  "New entries will be added as they are ready.": "内容将陆续更新。",
  "Open Blog & Research Notes": "进入博客与研究笔记",
  "← Back to Jianlin Lin's homepage": "← 返回林建林主页",
  "Graduate National Scholarship": "研究生国家奖学金",
  ", 2021.": "，2021年。",
  "Second-class Wanfu Biotech Outstanding Student Scholarship": "万孚生物优秀学生奖学金二等奖",
  "Outstanding Student of Xiamen University": "厦门大学三好学生",
  "National Undergraduate Mathematical Modeling Contest": "全国大学生数学建模竞赛",
  ", Hainan provincial second-prize award, 2016–2018.": "，海南省二等奖，2016–2018年。",
  ", Hainan provincial third-prize award, 2016–2018.": "，海南省三等奖，2016–2018年。",
  "National Encouragement Scholarship": "国家励志奖学金",
  ", 2018.": "，2018年。",
  "People's Scholarship": "人民奖学金",
  ", three consecutive years, 2015–2017.": "，连续三年，2015–2017年。",
  "Outstanding Student": "优秀学生",
  "Outstanding Student Cadre": "优秀学生干部",
  "Outstanding Youth Volunteer": "优秀青年志愿者",
  "Outstanding Communist Youth League Member": "优秀共青团员",
  ", 2015–2017.": "，2015–2017年。",
  "Self-Improvement Star": "自强之星",
  ", 2018.": "，2018年。",
  "Academic Services": "学术服务",
  "Teaching": "教学",
  "Teaching Assistant, Health Statistics, Xiamen University": "厦门大学卫生统计学课程助教",
  "Teaching Assistant, Calculus, Macao Polytechnic University": "澳门理工大学微积分课程助教",
  "Teaching Assistant, Statistics, Macao Polytechnic University": "澳门理工大学统计学课程助教",
  "Journal Reviewer": "期刊审稿人",
  "WeChat Official Account": "个人公众号",
  "WeChat Official Account QR Code": "个人公众号二维码",
  "Personal public account": "个人公众号",
  "Reserved for the account name, introduction, and QR code. Details can be added when you share them.": "此处预留公众号名称、简介和二维码，后续可补充具体信息。",
  "Email:": "邮箱：",
  "Personal academic website": "个人学术网站",
  "Resources": "资源",
  "Google Scholar": "Google 学术",
  "View my publications, citation counts, and author profile on Google Scholar.": "查看 Google 学术上的论文、引用情况及作者信息。",
  "Open Google Scholar profile": "打开 Google Scholar 主页",
  "Data Resources": "数据资源",
  "Curated datasets and reusable research resources will be collected here.": "这里将整理可复用的数据集与科研资源。",
  "Data Platforms": "数据平台",
  "Cross-national studies and harmonized aging data": "跨国家老龄化研究与协调数据",
  "Discover and access research datasets": "检索并申请访问研究数据",
  "Research Color Palette": "科研配色",
  "Colors transcribed from the supplied palette image. Select a swatch to copy its HEX value.": "根据你提供的配色图片整理。点击色卡可复制 HEX 色值。",
  "Top": "返回顶部"
};

const chineseToEnglish = Object.fromEntries(
  Object.entries(englishToChinese).map(([english, chinese]) => [chinese, english])
);

function setLanguage(language) {
  const dictionary = language === "zh" ? englishToChinese : chineseToEnglish;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let textNode;
  while ((textNode = walker.nextNode())) {
    const original = textNode.nodeValue;
    const trimmed = original.trim();
    const translated = dictionary[trimmed];
    if (translated) {
      const leading = original.match(/^\s*/)?.[0] || "";
      const trailing = original.match(/\s*$/)?.[0] || "";
      textNode.nodeValue = `${leading}${translated}${trailing}`;
    }
  }
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  const toggle = document.querySelector("#language-toggle");
  if (toggle) {
    toggle.textContent = language === "zh" ? "EN" : "中文";
    toggle.setAttribute("aria-label", language === "zh" ? "Switch to English" : "切换到中文");
  }
  try { localStorage.setItem("jianlinlin-language", language); } catch (_) {}
}

const languageToggle = document.querySelector("#language-toggle");
if (languageToggle) {
  let currentLanguage = "en";
  try { currentLanguage = localStorage.getItem("jianlinlin-language") || "en"; } catch (_) {}
  if (currentLanguage === "zh") setLanguage("zh");
  languageToggle.addEventListener("click", () => {
    setLanguage(document.documentElement.lang === "zh-CN" ? "en" : "zh");
  });
}

const paletteGroups = [
  [["#E7CACC", "#B8CAE7"], ["#CE4844", "#2A73BA"]],
  [["#63CBA1", "#9E96DC", "#569FD8"], ["#62B7A0", "#EA9A99", "#8CC2E0"]],
  [["#EEADAB", "#8DB18D", "#A5C7E0", "#E8E0AD"], ["#DADADA", "#3F83A4", "#6BAED8", "#EDC3A1"], ["#A53E34"]],
  [["#009391", "#EFB47A", "#B3A9ED", "#C4E3F2"], ["#F1BFDA", "#DBDBDB"]],
  [["#525252", "#F6847A", "#F8B583", "#4194C6"], ["#CA87A7", "#80A0CB"]],
  [["#F6E7C6", "#CFDBCC", "#ACBFE0", "#D7B3D5"], ["#F4C6C7", "#7ABBCF", "#C3C9C9"]],
  [["#C4C2C3", "#D18B96", "#7CD3A3", "#ADDBE1"], ["#FADBAD", "#616566", "#6A9DB9", "#F8C7C5"]],
  [["#B0D5DB", "#ACC3E5", "#D7DADB", "#C05F60"], ["#8A8A8A", "#ED708C", "#A1D1B4", "#E5C9B9"]]
];

const paletteGrid = document.querySelector("#palette-grid");
if (paletteGrid) {
  const status = document.createElement("div");
  status.className = "palette-status";
  status.setAttribute("aria-live", "polite");
  paletteGrid.after(status);
  paletteGroups.forEach((group) => {
    const groupElement = document.createElement("div");
    groupElement.className = "palette-group";
    group.forEach((row) => {
      const rowElement = document.createElement("div");
      rowElement.className = "palette-color-row";
      row.forEach((hex) => {
        const rgb = hex.slice(1).match(/.{2}/g).map((part) => parseInt(part, 16));
        const button = document.createElement("button");
        button.type = "button";
        button.className = "palette-swatch";
        button.style.setProperty("--swatch", hex);
        button.setAttribute("aria-label", `Copy ${hex}, RGB ${rgb.join(", ")}`);
        const dot = document.createElement("span");
        dot.className = "palette-dot";
        dot.setAttribute("aria-hidden", "true");
        const values = document.createElement("span");
        values.className = "palette-values";
        const hexLabel = document.createElement("span");
        hexLabel.textContent = `HEX ${hex}`;
        const rgbLabel = document.createElement("span");
        rgbLabel.textContent = `RGB ${rgb.join(", ")}`;
        values.append(hexLabel, rgbLabel);
        button.append(dot, values);
        button.addEventListener("click", async () => {
          try {
            await navigator.clipboard.writeText(hex);
            status.textContent = document.documentElement.lang === "zh-CN" ? `已复制 ${hex}` : `Copied ${hex}`;
          } catch (_) {
            status.textContent = hex;
          }
        });
        rowElement.append(button);
      });
      groupElement.append(rowElement);
    });
    paletteGrid.append(groupElement);
  });
}
