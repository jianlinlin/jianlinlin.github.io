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
  "PhD student · Artificial Intelligence Drug Discovery": "博士生 · 人工智能药物发现",
  "PhD Student · Artificial Intelligence Drug Discovery @": "博士生 · 人工智能药物发现 ·",
  "MM in Epidemiology & Health Statistics, 2019–2022": "流行病与卫生统计学硕士，2019–2022",
  "BS in Applied Statistics, 2015–2019": "应用统计学学士，2015–2019",
  "MM in Epidemiology & Health Statistics @": "流行病与卫生统计学硕士 ·",
  "BS in Applied Statistics @": "应用统计学学士 ·",
  "Supervisor:": "导师：",
  "Professor Kefeng Li": "李克峰教授",
  "Professor Ya Fang": "方亚教授",
  "Professor Li Cao": "曹莉教授",
  "News": "新闻动态",
  "Research on nonlinear molecular trajectories in human cerebellar aging appeared in": "关于人类小脑衰老中非线性分子轨迹的研究发表于",
  "A longitudinal analysis of cardiovascular-kidney-metabolic syndrome and sensory impairments appeared in": "关于心血管-肾脏-代谢综合征与感觉障碍的纵向分析发表于",
  "A comparative causal-inference analysis of dietary patterns and mortality appeared in": "关于膳食模式与死亡率的比较因果推断分析发表于",
  "was accepted for publication in": "被接收并发表于",
  ". I am a co-first author.": "。我是共同第一作者。",
  "2026": "2026年",
  "Feb 2026": "2026年2月",
  "Jan 2026": "2026年1月",
  "Sep 2025": "2025年9月",
  "JCR quartiles shown use the 2025 Journal Citation Reports; journals with multiple categories list category-specific quartiles.": "此处 JCR 分区采用 2025 年《期刊引证报告》；多类别期刊按学科列出对应分区。",
  "JCR 2025 · Q1": "2025 JCR · Q1",
  "JCR 2025 · Q1/Q2": "2025 JCR · Q1/Q2",
  "First author": "第一作者",
  "Co-first author": "共同第一作者",
  "· Accepted 2026": "· 2026年接收",
  "Experiences": "经历",
  "Sep 2024 – Present": "2024年9月至今",
  "Jul 2022 – Aug 2024": "2022年7月至2024年8月",
  "Sep 2019 – Jun 2022": "2019年9月至2022年6月",
  "Sep 2015 – Aug 2019": "2015年9月至2019年8月",
  "PhD Student @": "博士生 ·",
  "Artificial Intelligence Drug Discovery.": "人工智能药物发现。",
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
  "Address:": "地址：",
  "Rua de Luís Gonzaga Gomes, Macao, China": "澳门高美士街",
  "Personal academic website": "个人学术网站",
  "Resources": "资源",
  "Browse each collection on its own page.": "每个资源类别均在独立页面展示。",
  "Datasets, codebooks, and reusable research materials.": "数据集、代码本及可复用的科研材料。",
  "Research platforms for aging and health data.": "老龄化与健康数据研究平台。",
  "Population, geography, study design, and access conditions vary by platform and individual dataset; check each study's documentation before combining data.": "各平台和具体数据集的人群、地区、研究设计及访问条件可能不同，合并数据前请先查阅相应研究文档。",
  "Color swatches transcribed from the supplied image.": "根据你提供的图片整理的色卡。",
  "Open section": "进入模块",
  "← Back to Resources": "← 返回资源主页",
  "Google Scholar": "Google 学术",
  "View my publications, citation counts, and author profile on Google Scholar.": "查看 Google 学术上的论文、引用情况及作者信息。",
  "Open Google Scholar profile": "打开 Google Scholar 主页",
  "Data Resources": "数据资源",
  "Browse the datasets cataloged from my research library. Measurement years refer to data collection or observation periods, not download dates.": "此处整理研究资料库中的数据集。测量年份指实际数据采集或观察期，不是下载年份。",
  "Browse": "导航",
  "Filter": "筛选",
  "Search": "搜索",
  "Population": "研究人群",
  "Study design": "研究设计",
  "Country / region": "国家／地区",
  "Measurement year": "测量年份",
  "Reset filters": "重置筛选",
  "Clear search": "清空搜索",
  "All datasets": "全部数据库",
  "No datasets match these filters. Try removing one or more filters.": "没有符合条件的数据库，请尝试取消部分筛选。",
  "Data Platforms": "数据平台",
  "Cross-national studies and harmonized aging data": "跨国家老龄化研究与协调数据",
  "Discover and access research datasets": "检索并申请访问研究数据",
  "Alzheimer's Disease Neuroimaging Initiative": "阿尔茨海默病神经影像学计划",
  "A longitudinal, multi-center observational cohort combining clinical, cognitive, imaging, and biomarker data for Alzheimer's disease research.": "ADNI 是一项多中心纵向观察性队列，整合临床、认知、影像和生物标志物数据，用于阿尔茨海默病研究。",
  "Gateway to Global Aging Data": "全球老龄化数据门户",
  "A gateway to harmonized data, documentation, and tools from population aging studies around the world.": "提供来自世界各地人口老龄化研究的协调数据、文档和分析工具。",
  "Older adults": "中老年人群",
  "United States & Canada": "美国与加拿大",
  "Longitudinal": "纵向研究",
  "Clinical + imaging": "临床与影像",
  "International": "多国家／地区",
  "Longitudinal studies": "纵向队列",
  "Harmonized data": "协调后数据",
  "United Kingdom": "英国",
  "Population varies by study": "人群因研究而异",
  "Surveys + panels": "调查与追踪面板",
  "Longitudinal / cross-sectional": "纵向／横断面",
  "Visit platform": "访问平台",
  "HCAP Network": "HCAP 国际网络",
  "Harmonized Cognitive Assessment Protocol International Network": "协调认知评估方案国际网络",
  "An international network applying harmonized cognitive assessments within studies of aging to support cross-country comparisons of cognition and dementia.": "该国际网络在老龄化研究中采用协调一致的认知评估，以支持跨国家／地区的认知与痴呆研究比较。",
  "Cognition + dementia": "认知与痴呆",
  "Longitudinal cohorts": "纵向队列",
  "Harvard Dataverse": "哈佛 Dataverse",
  "Harvard Dataverse Repository": "哈佛 Dataverse 数据仓储",
  "A general-purpose repository for sharing, preserving, citing, and discovering research datasets across disciplines.": "面向各学科的通用数据仓储，可用于共享、保存、引用和发现研究数据集。",
  "All ages / varies by dataset": "各年龄段／依具体数据集而异",
  "Global": "全球",
  "Multi-disciplinary": "多学科",
  "Study design varies": "研究设计因数据集而异",
  "WHO Survey Data Archive": "世界卫生组织调查数据档案",
  "World Health Organization Study on Global Ageing and Adult Health and survey catalog": "世界卫生组织全球老龄化与成人健康研究及调查数据目录",
  "A catalog of WHO survey microdata, including multi-country population health surveys and aging studies such as SAGE.": "世界卫生组织调查微观数据目录，收录多国人口健康调查及 SAGE 等老龄化研究。",
  "Multiple countries": "多个国家",
  "Survey microdata": "调查微观数据",
  "Older adults in SAGE": "SAGE 中老年人群",
  "Country + year vary": "国家与年份因研究而异",
  "ICPSR": "ICPSR",
  "Inter-university Consortium for Political and Social Research": "校际政治与社会研究联合会",
  "A curated archive of research data and documentation across social, behavioral, health, and aging topics; access conditions depend on each study.": "收录社会、行为、健康和老龄化等主题的研究数据与文档；访问条件依具体研究而定。",
  "All ages / varies by study": "各年龄段／依具体研究而异",
  "Multi-country": "多国家",
  "Social + health sciences": "社会与健康科学",
  "Design varies by study": "研究设计依具体项目而异",
  "AD Data Initiative": "阿尔茨海默病数据倡议",
  "Alzheimer's Disease Data Initiative": "阿尔茨海默病数据倡议",
  "A discovery and sharing ecosystem for Alzheimer's disease and related dementias datasets, including clinical, imaging, omics, and multimodal data.": "阿尔茨海默病及相关痴呆数据的发现与共享平台，涵盖临床、影像、组学和多模态数据。",
  "Alzheimer's / ADRD": "阿尔茨海默病／相关痴呆",
  "Clinical + imaging + omics": "临床、影像与组学",
  "Multiple studies": "多个研究项目",
  "Access varies by dataset": "访问权限依数据集而异",
  "YODA Project": "YODA 项目",
  "Yale University Open Data Access Project": "耶鲁大学开放数据访问项目",
  "An independent academic process for requesting participant-level data and comprehensive reports from completed clinical trials.": "由独立学术团队负责审查已完成临床试验的个体层面数据及完整研究报告访问申请。",
  "Clinical trials": "临床试验",
  "Participant-level data": "参与者个体层面数据",
  "Longitudinal trial data": "纵向试验数据",
  "Scientific proposal required": "需提交科研方案",
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
  document.dispatchEvent(new Event("site-language-changed"));
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
