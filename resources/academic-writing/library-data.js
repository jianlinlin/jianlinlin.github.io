const paperLibrary = [
  {
    id: "iage",
    title: "An inflammatory aging clock (iAge) based on deep learning tracks multimorbidity, immunosenescence, frailty and cardiovascular aging",
    citation: "Sayed N, Huang Y, et al. Nature Aging. 2021;1:598–615. DOI: 10.1038/s43587-021-00082-y",
    year: 2021,
    type: "指标开发与验证",
    topics: ["生物衰老", "炎症", "深度学习", "衰弱"],
    doi: "10.1038/s43587-021-00082-y",
    publisherUrl: "https://www.nature.com/articles/s43587-021-00082-y",
    links: [
      { label: "Nature Aging 出版社页面", url: "https://www.nature.com/articles/s43587-021-00082-y" },
      { label: "PMC 全文（作者稿）", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8654267/" },
      { label: "PubMed 记录", url: "https://pubmed.ncbi.nlm.nih.gov/34888528/" }
    ],
    access: "PMC 提供全文；页面仅链接，不镜像正文。",
    focus: {
      abstract: "标出 iAge 的研究目的、模型来源、验证环节和临床关联，不把预测关联写成因果结论。",
      introduction: "追踪从炎症与衰老背景，到既有指标不足，再到提出 iAge 的研究缺口。",
      methods: "梳理深度学习模型如何形成炎症年龄指标，以及训练、验证和临床表型测量的关系。",
      results: "把多病共存、免疫衰老、衰弱和心血管衰老的结果分组，区分模型性能与临床关联。",
      discussion: "识别作者如何解释 iAge 的生物学意义、临床用途和验证范围。",
      conclusion: "检查结论是否仅支持风险分层与关联发现，避免把年龄指标描述成已验证的临床干预工具。"
    }
  },
  {
    id: "pace-frailty",
    title: "Disparities in the pace of biological aging among midlife adults of the same chronological age have implications for future frailty risk and policy",
    citation: "Elliott ML, Caspi A, et al. Nature Aging. 2021;1(3):295–308. DOI: 10.1038/s43587-021-00044-4",
    year: 2021,
    type: "纵向队列研究",
    topics: ["生物衰老", "纵向研究", "衰弱", "公共卫生政策"],
    doi: "10.1038/s43587-021-00044-4",
    publisherUrl: "https://www.nature.com/articles/s43587-021-00044-4",
    links: [
      { label: "Nature Aging 出版社页面", url: "https://www.nature.com/articles/s43587-021-00044-4" },
      { label: "PMC 全文", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8009092/" },
      { label: "PubMed 记录", url: "https://pubmed.ncbi.nlm.nih.gov/33796868/" }
    ],
    access: "PMC 提供全文；Dunedin 队列的原文可直接阅读。",
    focus: {
      abstract: "区分 chronological age 与 Pace of Aging，并抓住队列年龄、随访信息和主要功能性结果。",
      introduction: "分析作者为何认为相同日历年龄不足以表示个体差异，以及研究对未来衰弱风险的切入点。",
      methods: "追踪 Dunedin 出生队列、19 项生物标志物和多个测量年龄点如何构成衰老速度指标。",
      results: "练习表达衰老速度与认知、感觉运动、外观和主观衰老感受的关联。",
      discussion: "区分队列发现与政策推论，检查作者对早期支持需求的解释范围。",
      conclusion: "总结日历年龄的局限，同时保留“需要进一步研究”的不确定性。"
    }
  },
  {
    id: "severe-disability",
    title: "Risk Factors and Precipitants of Severe Disability Among Community-Living Older Persons",
    citation: "Gill TM, Han L, et al. JAMA Network Open. 2020;3(6):e206021. DOI: 10.1001/jamanetworkopen.2020.6021",
    year: 2020,
    type: "纵向队列研究",
    topics: ["失能", "老年医学", "风险因素", "纵向研究"],
    doi: "10.1001/jamanetworkopen.2020.6021",
    publisherUrl: "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2766605",
    links: [
      { label: "JAMA Network Open 全文", url: "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2766605" },
      { label: "PMC 全文", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7267844/" },
      { label: "PubMed 记录", url: "https://pubmed.ncbi.nlm.nih.gov/32484551/" }
    ],
    access: "JAMA 页面标注 CC BY 开放获取；使用原文请保留来源署名。",
    focus: {
      abstract: "标出研究目的、754 名参与者、近 19 年随访、渐进型与灾难型失能定义和主要发现。",
      introduction: "梳理年度测量的不足如何引出月度功能状态与潜在诱发事件的研究设计。",
      methods: "提取样本、评估频率、失能结局定义，以及 risk factors 与 precipitants 的操作化差别。",
      results: "比较传统风险因素和住院、急诊、活动受限等诱发事件的关联强度及风险差异。",
      discussion: "理解作者如何把观察性关联转成预防、管理和康复建议，并检查因果措辞。",
      conclusion: "用一两句概括临床意义，同时明确这是队列关联证据，不等同于随机干预效果。"
    }
  },
  {
    id: "multimorbidity-frailty",
    title: "Dynamics of multimorbidity and frailty, and their contribution to mortality, nursing home and home care need: A primary care cohort of 1 456 052 ageing people",
    citation: "eClinicalMedicine. 2022;52:101610. DOI: 10.1016/j.eclinm.2022.101610",
    year: 2022,
    type: "大样本真实世界队列",
    topics: ["多病共存", "衰弱", "基层医疗", "竞争风险"],
    doi: "10.1016/j.eclinm.2022.101610",
    publisherUrl: "https://www.thelancet.com/journals/eclinm/article/PIIS2589-5370(22)00340-6/fulltext",
    links: [
      { label: "PMC 全文", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9399153/" },
      { label: "eClinicalMedicine 出版社页面", url: "https://www.thelancet.com/journals/eclinm/article/PIIS2589-5370(22)00340-6/fulltext" },
      { label: "PubMed 记录", url: "https://pubmed.ncbi.nlm.nih.gov/36034409/" }
    ],
    access: "PMC 提供全文；文章许可为 CC BY-NC-ND，本站只链接，不改编或转载正文。",
    correction: "你给出的 PMC 链接实际对应本条所列的 eClinicalMedicine 论文；原消息中的链接标题“Social inequalities … Whitehall II”与链接目标不一致。",
    focus: {
      abstract: "按 Background、Methods、Findings、Interpretation 拆出研究缺口、数据、结果和实践含义。",
      introduction: "辨认多病共存与衰弱的定义争议、既有纵向证据不足和研究目标。",
      methods: "梳理加泰罗尼亚基层电子病历队列、eFRAGICAP 与 SNAC-K 指标、Cox 模型和竞争风险处理。",
      results: "比较疾病相关缺陷和其他衰弱缺陷随年龄的变化，以及死亡与照护需求的不同关联。",
      discussion: "分析 85 岁前后衰弱构成变化如何支持分层照护，同时讨论外推范围。",
      conclusion: "总结对基层照护计划的启示，保留数据库研究的观察性边界。"
    }
  },
  {
    id: "frailty-review",
    title: "Frailty in Older Adults",
    citation: "Kim DH, Rockwood K. New England Journal of Medicine. 2024;391:538–548. DOI: 10.1056/NEJMra2301292",
    year: 2024,
    type: "临床综述",
    topics: ["衰弱", "老年医学", "临床评估", "综述写作"],
    doi: "10.1056/NEJMra2301292",
    publisherUrl: "https://www.nejm.org/doi/full/10.1056/NEJMra2301292",
    links: [
      { label: "NEJM 出版社全文页", url: "https://www.nejm.org/doi/full/10.1056/NEJMra2301292" },
      { label: "PMC 全文", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11634188/" },
      { label: "PubMed 记录", url: "https://pubmed.ncbi.nlm.nih.gov/39115063/" }
    ],
    access: "PMC 提供全文；也可从 NEJM 阅读，出版社访问权限可能因机构而异。",
    focus: {
      abstract: "抓住衰弱定义、临床重要性和综述覆盖的评估、病理生理与管理范围。",
      introduction: "学习如何从衰弱普遍性与临床决策需求引出综述框架。",
      methods: "这是临床综述，不是 IMRaD 原始研究；检查作者如何界定主题和组织证据，不虚构样本、模型或统计方法。",
      results: "综述没有单一结果表；练习按概念主题整合评估工具、机制和临床证据。",
      discussion: "分析证据强弱、评估和管理建议之间的衔接，以及尚未解决的问题。",
      conclusion: "将综合性结论限定在临床评估和个体化照护，不写成已被证明的统一疗法。"
    }
  },
  {
    id: "heterogeneous-aging",
    title: "Heterogeneous aging across multiple organ systems and prediction of chronic disease and mortality",
    citation: "Tian YE, Cropley V, Maier AB, et al. Nature Medicine. 2023;29(5):1221–1231. DOI: 10.1038/s41591-023-02296-6",
    year: 2023,
    type: "多系统衰老建模研究",
    topics: ["多器官衰老", "UK Biobank", "慢性病预测", "现代对照"],
    doi: "10.1038/s41591-023-02296-6",
    publisherUrl: "https://www.nature.com/articles/s41591-023-02296-6",
    links: [
      { label: "Nature Medicine 出版社页面", url: "https://www.nature.com/articles/s41591-023-02296-6" },
      { label: "VU Research Portal 作者版本", url: "https://research.vu.nl/files/291201566/Heterogeneous_aging_across_multiple_organ_systems_and_prediction_of_chronic_disease_and_mortality.pdf" },
      { label: "DOI 页面", url: "https://doi.org/10.1038/s41591-023-02296-6" }
    ],
    access: "出版社全文访问权限可能因机构而异；VU 仓储版本仅供个人学习或研究使用，不在本站转载。",
    focus: {
      abstract: "按背景、数据、模型、系统间发现和预测结果重建研究摘要的逻辑骨架。",
      introduction: "分析为何单一生物年龄不足以描述多器官异质性，以及研究目标如何分层提出。",
      methods: "识别 UK Biobank 的影像和生理表型、三个脑系统与七个身体系统模型及验证策略。",
      results: "区分系统间关联网络、慢性病器官年龄特征和疾病/死亡预测三类结果。",
      discussion: "关注器官衰老之间的关联如何解释系统异质性，并辨别预测发现与机制因果解释。",
      conclusion: "比较 2021 与 2023 年文章的多系统概念表达，避免把年代差异归因为 AI 污染。"
    }
  }
];

const expressionBank = [
  { id: "in-addition", phrase: "In addition, …", relation: "additive", relationLabel: "同层补充", section: "Results", function: "增加一个同等级结果或证据。", template: "In addition, [secondary finding] was observed in [population].", mistake: "不要把普通补充误写成更重要的证据。", paperId: "severe-disability" },
  { id: "furthermore", phrase: "Furthermore, …", relation: "additive", relationLabel: "同层补充", section: "Introduction", function: "在已有论点上增加相关背景或证据。", template: "Furthermore, [prior evidence] suggests that [related point].", mistake: "避免每句都用 furthermore；只有逻辑确实并列时才用。", paperId: "pace-frailty" },
  { id: "more-importantly", phrase: "More importantly, …", relation: "emphasis", relationLabel: "重点递进", section: "Discussion", function: "把读者注意力转向更关键的证据或含义。", template: "More importantly, [finding] may inform [specific decision].", mistake: "它提升重要性，不等于 merely adding another item。", paperId: "iage" },
  { id: "notably", phrase: "Notably, …", relation: "emphasis", relationLabel: "重点递进", section: "Results", function: "提示一个值得注意的结果或模式。", template: "Notably, the association remained [stable / present] after [analysis].", mistake: "不要用 notably 掩盖结果大小或不确定性。", paperId: "heterogeneous-aging" },
  { id: "however", phrase: "However, …", relation: "contrast", relationLabel: "对照转折", section: "Introduction", function: "引出与前一句不同的事实、证据或限制。", template: "However, [current evidence] does not address [specific gap].", mistake: "转折两侧必须有可辨认的差异。", paperId: "multimorbidity-frailty" },
  { id: "by-contrast", phrase: "By contrast, …", relation: "contrast", relationLabel: "对照转折", section: "Results", function: "并列比较两类人群、模型或结局。", template: "By contrast, [group B] showed [different pattern].", mistake: "先给出清楚的比较对象，不要孤立使用。", paperId: "multimorbidity-frailty" },
  { id: "whereas", phrase: "whereas …", relation: "contrast", relationLabel: "对照转折", section: "Results", function: "在同一句中并置不同结果。", template: "[Outcome A] was associated with [factor X], whereas [outcome B] was associated with [factor Y].", mistake: "whereas 表示差别；不要只因句子变长而使用。", paperId: "severe-disability" },
  { id: "although", phrase: "Although …, …", relation: "concession", relationLabel: "让步限定", section: "Discussion", function: "先承认限制或相反证据，再提出主要判断。", template: "Although [limitation], [carefully bounded interpretation].", mistake: "although 从句后必须有主句。", paperId: "frailty-review" },
  { id: "nevertheless", phrase: "Nevertheless, …", relation: "concession", relationLabel: "让步限定", section: "Discussion", function: "承认前述限制后，说明结论仍有哪些合理支持。", template: "Nevertheless, [evidence] supports [narrow conclusion].", mistake: "不是无条件地忽略限制。", paperId: "pace-frailty" },
  { id: "given-that", phrase: "Given that …, …", relation: "cause", relationLabel: "原因依据", section: "Introduction", function: "把已知事实作为研究动机或推理前提。", template: "Given that [context], it is important to [research action].", mistake: "前提要与后面的研究动机相关。", paperId: "iage" },
  { id: "because", phrase: "because …", relation: "cause", relationLabel: "原因依据", section: "Methods", function: "说明某项方法选择的理由。", template: "We selected [measure] because it captures [construct].", mistake: "方法理由需与研究问题或测量目标相连。", paperId: "multimorbidity-frailty" },
  { id: "consequently", phrase: "Consequently, …", relation: "result", relationLabel: "结果推论", section: "Discussion", function: "表达前述结果带来的直接推论。", template: "Consequently, [bounded implication] may be relevant to [setting].", mistake: "不要把相关性推成确定因果后果。", paperId: "severe-disability" },
  { id: "therefore", phrase: "Therefore, …", relation: "result", relationLabel: "结果推论", section: "Conclusion", function: "从已呈现的证据推出简洁结论。", template: "Therefore, [conclusion] should be interpreted in light of [scope].", mistake: "结论需要前文证据支撑，不是重复研究目标。", paperId: "heterogeneous-aging" },
  { id: "specifically", phrase: "Specifically, …", relation: "elaboration", relationLabel: "具体展开", section: "Methods", function: "把概括性方法或结果细化成具体内容。", template: "Specifically, [measure / model / outcome] was defined as [definition].", mistake: "后面要给出具体定义或例子。", paperId: "severe-disability" },
  { id: "for-example", phrase: "For example, …", relation: "elaboration", relationLabel: "具体展开", section: "Introduction", function: "为概括观点提供代表性实例。", template: "For example, [specific prior finding] illustrates [broader point].", mistake: "例子不能代替总体证据。", paperId: "frailty-review" },
  { id: "in-line-with", phrase: "In line with …", relation: "evidence", relationLabel: "证据对照", section: "Discussion", function: "说明当前发现与既有研究方向一致。", template: "In line with previous work, [current finding] was observed in [setting].", mistake: "一致性不代表研究完全相同。", paperId: "pace-frailty" },
  { id: "may-indicate", phrase: "may indicate …", relation: "qualification", relationLabel: "谨慎解释", section: "Discussion", function: "表达有证据但仍不确定的解释。", template: "This pattern may indicate [interpretation], although [alternative] remains possible.", mistake: "may 的不确定性不能与确定性结论混用。", paperId: "iage" },
  { id: "is-associated-with", phrase: "is associated with …", relation: "qualification", relationLabel: "谨慎解释", section: "Results", function: "描述观察性研究中变量之间的统计关联。", template: "[Exposure] was associated with [outcome] after adjustment for [covariates].", mistake: "观察性关联不自动证明因果关系。", paperId: "severe-disability" },
  { id: "taken-together", phrase: "Taken together, …", relation: "synthesis", relationLabel: "综合归纳", section: "Conclusion", function: "合并多项结果后给出整体判断。", template: "Taken together, these findings suggest that [synthesis].", mistake: "综合句应概括前文已报告的证据。", paperId: "multimorbidity-frailty" },
  { id: "in-light-of", phrase: "in light of …", relation: "qualification", relationLabel: "谨慎解释", section: "Discussion", function: "根据局限、设计或样本背景限定解释。", template: "The finding should be interpreted in light of [limitation].", mistake: "不要把局限只放在段落末尾而不说明其影响。", paperId: "frailty-review" }
];

const translationTasks = [
  { id: "tr-iage-1", paperId: "iage", topic: "指标开发", prompt: "研究团队利用深度学习构建了炎症年龄指标，并考察了它与多种年龄相关健康状况的关联。", answer: "The research team used deep learning to develop an inflammatory aging clock and examined its associations with several age-related health conditions.", criteria: [{ label: "深度学习方法", terms: ["deep learning"] }, { label: "开发衰老时钟", terms: ["develop", "constructed", "built"] }, { label: "表达关联而非因果", terms: ["association", "associated", "relationship"] }], errorType: "precision" },
  { id: "tr-iage-2", paperId: "iage", topic: "研究结论", prompt: "该指标与多病共存、免疫衰老、衰弱和心血管衰老相关，但关联本身不能证明因果。", answer: "The measure was associated with multimorbidity, immunosenescence, frailty, and cardiovascular aging, but these associations alone do not establish causality.", criteria: [{ label: "四类健康结局", terms: ["multimorbidity", "immunosenescence", "frailty", "cardiovascular"] }, { label: "因果限定", terms: ["causality", "causal", "cause"] }], errorType: "overclaim" },
  { id: "tr-pace-1", paperId: "pace-frailty", topic: "研究背景", prompt: "日历年龄相同的中年人，生物衰老速度仍可能存在显著差异。", answer: "Midlife adults of the same chronological age may still differ substantially in their pace of biological aging.", criteria: [{ label: "日历年龄相同", terms: ["same chronological age", "same age"] }, { label: "生物衰老速度差异", terms: ["pace of biological aging", "biological aging", "age at different rates"] }, { label: "谨慎语气", terms: ["may", "can"] }], errorType: "precision" },
  { id: "tr-pace-2", paperId: "pace-frailty", topic: "公共卫生意义", prompt: "更快的中年期生物衰老速度与多项功能困难相关，这可能意味着部分人会更早需要支持。", answer: "A faster pace of biological aging in midlife was associated with several functional difficulties, suggesting that some people may need support earlier.", criteria: [{ label: "中年期衰老速度", terms: ["pace of biological aging", "pace of aging"] }, { label: "功能困难", terms: ["functional difficulties", "functional impairment", "functional limitations"] }, { label: "可能更早需要支持", terms: ["support earlier", "earlier support"] }], errorType: "hedging" },
  { id: "tr-disability-1", paperId: "severe-disability", topic: "研究目的", prompt: "研究区分了逐渐发生和突然发生的严重失能，并评估了相关风险因素与诱发事件。", answer: "The study distinguished between progressively and catastrophically developing severe disability and evaluated associated risk factors and precipitants.", criteria: [{ label: "两种失能发生模式", terms: ["progressively", "catastrophically"] }, { label: "风险因素", terms: ["risk factors"] }, { label: "诱发事件", terms: ["precipitants", "precipitating events"] }], errorType: "precision" },
  { id: "tr-disability-2", paperId: "severe-disability", topic: "讨论与因果", prompt: "住院与严重失能之间的关联很强，但观察性队列不能单独确定因果关系。", answer: "Hospitalization was strongly associated with severe disability, but an observational cohort alone cannot establish a causal relationship.", criteria: [{ label: "住院与严重失能关联", terms: ["hospitalization", "severe disability", "associated"] }, { label: "观察性研究限定", terms: ["observational", "cohort"] }, { label: "不能确定因果", terms: ["causal", "causality", "cause"] }], errorType: "overclaim" },
  { id: "tr-multi-1", paperId: "multimorbidity-frailty", topic: "方法", prompt: "研究人员使用基层医疗电子病历，追踪了加泰罗尼亚老年人群中多病共存与衰弱的长期变化。", answer: "The researchers used primary care electronic health records to track the long-term dynamics of multimorbidity and frailty among older adults in Catalonia.", criteria: [{ label: "基层医疗电子病历", terms: ["primary care", "electronic health records", "ehr"] }, { label: "长期变化", terms: ["longitudinal", "long-term", "dynamics"] }, { label: "研究地区", terms: ["catalonia"] }], errorType: "precision" },
  { id: "tr-multi-2", paperId: "multimorbidity-frailty", topic: "结果比较", prompt: "随着年龄增长，疾病相关缺陷和其他衰弱缺陷对结局的关联并不相同。", answer: "As people aged, disease-related deficits and other frailty-related deficits showed different associations with health outcomes.", criteria: [{ label: "随年龄变化", terms: ["as people aged", "with age", "as age increased"] }, { label: "区分两类缺陷", terms: ["disease-related", "frailty-related"] }, { label: "关联结局", terms: ["health outcomes", "outcomes"] }], errorType: "logic" },
  { id: "tr-review-1", paperId: "frailty-review", topic: "概念定义", prompt: "衰弱反映生理储备下降，并伴随着对多种不良健康结局的易感性增加。", answer: "Frailty reflects diminished physiological reserve and increased vulnerability to a range of adverse health outcomes.", criteria: [{ label: "生理储备下降", terms: ["diminished physiological reserve", "reduced physiological reserve"] }, { label: "易感性增加", terms: ["increased vulnerability", "greater vulnerability"] }, { label: "不良健康结局", terms: ["adverse health outcomes", "poor health outcomes"] }], errorType: "precision" },
  { id: "tr-review-2", paperId: "frailty-review", topic: "综述表达", prompt: "评估衰弱有助于临床人员根据患者状况调整医疗照护。", answer: "Assessing frailty can help clinicians tailor care to individual patients.", criteria: [{ label: "评估衰弱", terms: ["assessing frailty", "frailty assessment"] }, { label: "临床人员", terms: ["clinicians", "healthcare professionals"] }, { label: "个体化照护", terms: ["tailor care", "individualized care", "individualised care"] }], errorType: "precision" },
  { id: "tr-hetero-1", paperId: "heterogeneous-aging", topic: "多系统概念", prompt: "人体不同器官系统的生物衰老并不同步，而且一个系统的衰老可能与其他系统相关。", answer: "Biological aging differs across organ systems, and aging in one system may be associated with changes in others.", criteria: [{ label: "器官系统间异质性", terms: ["across organ systems", "between organ systems", "different organ systems"] }, { label: "系统间联系", terms: ["associated with", "linked to", "related to"] }, { label: "谨慎语气", terms: ["may", "might"] }], errorType: "hedging" },
  { id: "tr-hetero-2", paperId: "heterogeneous-aging", topic: "预测结论", prompt: "多器官年龄特征可用于预测若干慢性疾病和死亡风险，但预测能力不等同于机制解释。", answer: "Multi-organ age profiles can predict several chronic diseases and mortality risk, but predictive performance is not equivalent to a mechanistic explanation.", criteria: [{ label: "多器官年龄特征", terms: ["multi-organ age", "organ age profiles", "biological age"] }, { label: "疾病和死亡预测", terms: ["predict", "prediction", "mortality"] }, { label: "区分预测与机制", terms: ["mechanistic explanation", "mechanism", "not equivalent"] }], errorType: "overclaim" }
];

const logicQuiz = [
  { id: "lq1", before: "The primary association was observed in the full cohort.", after: "a similar pattern appeared in the sensitivity analysis.", answer: "additive", options: ["additive", "emphasis", "contrast", "cause/result"], why: "第二句增加同层证据，属于补充；没有表示重要性上升。" },
  { id: "lq2", before: "Several organ-specific associations were identified.", after: "the brain-age profile showed the strongest link with the outcome.", answer: "emphasis", options: ["additive", "emphasis", "concession", "sequence"], why: "第二句把重点提升到最重要的一项，适合重点递进。" },
  { id: "lq3", before: "The study used a large primary-care cohort.", after: "the data came from one regional health system.", answer: "concession", options: ["cause/result", "emphasis", "concession", "example"], why: "后半句限定前文优势的适用范围，是让步或局限。" },
  { id: "lq4", before: "Frailty-related deficits increased with age.", after: "the need for home care was also greater in the older groups.", answer: "cause/result", options: ["additive", "cause/result", "contrast", "sequence"], why: "如果想表达前后结果的关联推论，需谨慎使用结果关系词；不要把观察性结果写成确定因果。" },
  { id: "lq5", before: "Earlier studies assessed function annually.", after: "the current cohort measured functional status every month.", answer: "contrast", options: ["contrast", "emphasis", "cause/result", "synthesis"], why: "两种测量频率构成方法差异，应使用对照关系。" },
  { id: "lq6", before: "The review discusses frailty assessment.", after: "it also summarizes management strategies.", answer: "additive", options: ["concession", "additive", "emphasis", "cause/result"], why: "管理策略是平行增加的综述主题。" },
  { id: "lq7", before: "The association remained after adjustment.", after: "the observational design still limits causal interpretation.", answer: "concession", options: ["emphasis", "sequence", "concession", "example"], why: "先承认稳健性，再说明因果解释的限制。" },
  { id: "lq8", before: "The analysis covered several outcomes.", after: "mortality was the primary endpoint.", answer: "emphasis", options: ["additive", "contrast", "emphasis", "cause/result"], why: "第二句指出结果层级中的重点，不只是再列一项。" },
  { id: "lq9", before: "The team defined the cohort and measures.", after: "it then fitted adjusted time-to-event models.", answer: "sequence", options: ["sequence", "concession", "emphasis", "synthesis"], why: "句子表示方法步骤的先后顺序。" },
  { id: "lq10", before: "The findings were consistent across two analyses.", after: "they should be interpreted in light of the limited follow-up window.", answer: "qualification", options: ["additive", "qualification", "cause/result", "example"], why: "第二句不是反驳结果，而是限定解释范围。" }
];

const paragraphPrompts = {
  Abstract: "用 4–6 句写出背景、研究缺口、目的、设计、核心结果和谨慎结论。每句承担一个功能。",
  Introduction: "按“已知背景 → 尚未解决的问题 → 研究目的/假设”组织段落。标出每句话如何推动研究问题。",
  Methods: "用可复现的顺序说明研究设计、研究对象、测量/暴露、结局和主要分析。不要把结果提前写进方法。",
  Results: "先报告主要结果，再给出方向、比较对象和不确定性指标。区分统计关联与临床意义。",
  Discussion: "从主要发现开始，连接既有证据、可能解释、研究局限和实践含义；每个解释都要与设计相匹配。",
  Conclusion: "用 1–3 句回答研究问题，限定人群和结局范围，并避免超过证据支持的因果表述。"
};

// Original-paper text stays on the publisher/PMC pages. The sentence notebook
// lets the learner work through every sentence there without republishing it.
const vocabularyBank = [
  { paperId: "iage", items: [
    { term: "inflammatory", pos: "adjective", meaning: "炎症性的；由炎症相关过程表征的", collocation: "inflammatory marker / inflammatory aging", example: "The analysis compared inflammatory markers across age groups.", prompt: "用 inflammatory 描述一个研究指标。" },
    { term: "multimorbidity", pos: "noun", meaning: "多病共存；同一个体同时患有多种慢性病", collocation: "multimorbidity burden / multimorbidity patterns", example: "Multimorbidity was more common in the older study group.", prompt: "用 multimorbidity 写一句说明人群或研究问题的句子。" },
    { term: "immunosenescence", pos: "noun", meaning: "免疫衰老；免疫系统随年龄发生的变化", collocation: "markers of immunosenescence", example: "The team examined markers of immunosenescence in later life.", prompt: "用 immunosenescence 写一句介绍测量内容的句子。" },
    { term: "track", pos: "verb", meaning: "追踪；持续测量或描述变化", collocation: "track changes / track disease progression", example: "Repeated assessments can track changes in health over time.", prompt: "用 track 写一句描述纵向研究的句子。" },
    { term: "frailty", pos: "noun", meaning: "衰弱；生理储备降低、对不良结局易感性增加的状态", collocation: "frailty risk / frailty assessment", example: "Frailty can influence care needs in older adults.", prompt: "用 frailty 写一句限定研究对象或结局的句子。" }
  ]},
  { paperId: "pace-frailty", items: [
    { term: "disparity", pos: "noun", meaning: "差异；不平等，常用于描述群体间差别", collocation: "health disparities / disparities in risk", example: "The study described disparities in functional health.", prompt: "用 disparity 写一句比较两个群体的句子。" },
    { term: "chronological", pos: "adjective", meaning: "按日历时间计算的", collocation: "chronological age", example: "Chronological age does not capture every aspect of health.", prompt: "用 chronological age 与 biological aging 写一句对比。" },
    { term: "pace", pos: "noun", meaning: "速度；进程速率", collocation: "pace of aging / pace of change", example: "The pace of change differed across participants.", prompt: "用 pace of aging 描述个体差异。" },
    { term: "frailty risk", pos: "noun phrase", meaning: "衰弱风险", collocation: "future frailty risk", example: "Early-life conditions may be relevant to future frailty risk.", prompt: "用 future frailty risk 写一句谨慎的预测表达。" },
    { term: "implication", pos: "noun", meaning: "意义；可能带来的影响", collocation: "policy implications / clinical implications", example: "The findings may have implications for prevention policy.", prompt: "用 implication 写一句从结果过渡到公共卫生意义的话。" }
  ]},
  { paperId: "severe-disability", items: [
    { term: "precipitant", pos: "noun", meaning: "诱发因素；使某事件突然发生的因素", collocation: "acute precipitant / precipitating event", example: "An acute illness may act as a precipitant of functional decline.", prompt: "用 precipitant 区分长期风险因素和急性事件。" },
    { term: "severe", pos: "adjective", meaning: "严重的；程度较高的", collocation: "severe disability / severe impairment", example: "The outcome was defined as severe disability.", prompt: "用 severe disability 写一句定义结局的句子。" },
    { term: "community-living", pos: "adjective", meaning: "居住在社区中的；非机构居住的", collocation: "community-living older persons", example: "The cohort included community-living older persons.", prompt: "用 community-living 描述目标人群。" },
    { term: "progressively", pos: "adverb", meaning: "逐步地；渐进地", collocation: "progressively developing disability", example: "Some participants experienced progressively worsening limitations.", prompt: "用 progressively 写一句描述变化过程的话。" },
    { term: "precipitate", pos: "verb", meaning: "促使；引发（常指较快发生的变化）", collocation: "precipitate a decline / precipitate an event", example: "A hospitalization may precipitate a temporary loss of function.", prompt: "用 may precipitate 写一句避免确定因果的句子。" }
  ]},
  { paperId: "multimorbidity-frailty", items: [
    { term: "dynamics", pos: "noun", meaning: "动态变化；随时间发生的相互作用或变化", collocation: "dynamics of multimorbidity", example: "The analysis examined the dynamics of health conditions over time.", prompt: "用 dynamics 写一句概括纵向研究目的的话。" },
    { term: "contribution", pos: "noun", meaning: "贡献；对某一结果所起的作用", collocation: "contribution to mortality / contribution of risk factors", example: "The study estimated the contribution of frailty to care needs.", prompt: "用 contribution to 写一句报告研究问题的话。" },
    { term: "cohort", pos: "noun", meaning: "队列；按共同特征纳入并随访的一组研究对象", collocation: "population-based cohort / primary-care cohort", example: "A large cohort was followed through linked health records.", prompt: "用 cohort 交代研究设计和数据来源。" },
    { term: "competing risk", pos: "noun", meaning: "竞争风险；阻止或改变目标事件发生机会的事件", collocation: "competing-risk analysis", example: "Death was considered when estimating later care needs.", prompt: "用 competing risk 写一句说明分析策略的理由。" },
    { term: "need", pos: "noun", meaning: "需求；本文语境中常指照护或服务需求", collocation: "home-care need / nursing-home need", example: "Health services should anticipate changing care needs.", prompt: "用 care need 写一句连接结果与服务规划的话。" }
  ]},
  { paperId: "frailty-review", items: [
    { term: "diminished", pos: "adjective", meaning: "降低的；减弱的", collocation: "diminished physiologic reserve", example: "Frailty is associated with diminished physiologic reserve.", prompt: "用 diminished 写一句概念定义。" },
    { term: "vulnerability", pos: "noun", meaning: "易感性；容易受到伤害或不良结果影响的状态", collocation: "increased vulnerability to outcomes", example: "Reduced reserve may increase vulnerability to acute stressors.", prompt: "用 vulnerability to 描述某个不良结局。" },
    { term: "adverse", pos: "adjective", meaning: "不良的；负面的", collocation: "adverse health outcomes", example: "Frailty is linked to several adverse health outcomes.", prompt: "用 adverse health outcomes 写一句综述式概括。" },
    { term: "phenotype", pos: "noun", meaning: "表型；可观察到的一组特征", collocation: "physical frailty phenotype", example: "The phenotype includes observable physical features.", prompt: "用 phenotype 区分临床表征与潜在机制。" },
    { term: "individualize", pos: "verb", meaning: "个体化；根据个人特征调整", collocation: "individualize clinical management", example: "Clinicians can individualize care according to patient needs.", prompt: "用 individualize 写一句临床照护建议。" }
  ]},
  { paperId: "heterogeneous-aging", items: [
    { term: "heterogeneous", pos: "adjective", meaning: "异质的；不同部分之间存在差异的", collocation: "heterogeneous aging patterns", example: "Aging patterns were heterogeneous across organ systems.", prompt: "用 heterogeneous 描述多器官发现。" },
    { term: "organ system", pos: "noun phrase", meaning: "器官系统", collocation: "across multiple organ systems", example: "The model evaluated biological changes across organ systems.", prompt: "用 organ system 写一句界定研究范围的话。" },
    { term: "prediction", pos: "noun", meaning: "预测；利用已有信息估计未来或未知结果", collocation: "prediction of chronic disease", example: "The model improved prediction of selected outcomes.", prompt: "用 prediction 区分预测能力和机制解释。" },
    { term: "mortality", pos: "noun", meaning: "死亡；死亡率或死亡结局", collocation: "all-cause mortality / mortality risk", example: "Mortality was assessed during follow-up.", prompt: "用 mortality 写一句准确报告结局的话。" },
    { term: "profile", pos: "noun", meaning: "特征谱；由多个指标组成的整体模式", collocation: "organ-age profile / risk profile", example: "Each participant had a distinct organ-age profile.", prompt: "用 profile 写一句描述多指标组合的句子。" }
  ]}
];

const clozeTasks = [
  { paperId: "iage", section: "Abstract", prompt: "An inflammatory aging clock was developed using ______ learning.", answer: "deep", hint: "一种建模方法" },
  { paperId: "iage", section: "Results", prompt: "The clock was evaluated in relation to multimorbidity and ______.", answer: "frailty", hint: "衰弱" },
  { paperId: "pace-frailty", section: "Introduction", prompt: "People of the same chronological age may differ in their pace of biological ______.", answer: "aging", hint: "生物衰老" },
  { paperId: "pace-frailty", section: "Discussion", prompt: "The findings may have implications for future frailty risk and ______.", answer: "policy", hint: "公共政策" },
  { paperId: "severe-disability", section: "Methods", prompt: "The study distinguishes risk factors from acute ______ of disability.", answer: "precipitants", hint: "诱发事件（复数）" },
  { paperId: "severe-disability", section: "Results", prompt: "The outcome of interest was severe ______ among older persons.", answer: "disability", hint: "失能" },
  { paperId: "multimorbidity-frailty", section: "Methods", prompt: "The authors used a large primary-care ______.", answer: "cohort", hint: "队列" },
  { paperId: "multimorbidity-frailty", section: "Conclusion", prompt: "The study examined mortality and long-term care ______.", answer: "needs", hint: "需求（复数）" },
  { paperId: "frailty-review", section: "Introduction", prompt: "Frailty is characterized by diminished physiologic ______.", answer: "reserve", hint: "储备" },
  { paperId: "frailty-review", section: "Discussion", prompt: "Frailty increases vulnerability to adverse health ______.", answer: "outcomes", hint: "结局（复数）" },
  { paperId: "heterogeneous-aging", section: "Abstract", prompt: "Biological aging can vary across multiple organ ______.", answer: "systems", hint: "系统（复数）" },
  { paperId: "heterogeneous-aging", section: "Results", prompt: "The models were used to predict chronic disease and ______.", answer: "mortality", hint: "死亡结局" }
];
