export interface Question {
  id: number;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  dimensionLabel: string;
  dimensionIcon: string;
  text: string;
  optionA: string;
  optionB: string;
}

export interface MBTIType {
  code: string;
  name: string;
  subtitle: string;
  coreTrait: string;
  strengths: string[];
  weaknesses: string[];
  songs: { name: string; artist: string; reason: string }[];
}

export const questions: Question[] = [
  // 维度一: 演唱动力源 (E/I)
  { id: 1, dimension: 'EI', dimensionLabel: '维度一：演唱动力源', dimensionIcon: 'compass', text: '当你准备一首经典老歌时，更倾向于：', optionA: '找歌友、合唱团伙伴一起讨论，听他们的建议调整演唱细节', optionB: '一个人反复听原唱、琢磨旋律歌词，自己感受情感后再尝试演唱' },
  { id: 2, dimension: 'EI', dimensionLabel: '维度一：演唱动力源', dimensionIcon: 'compass', text: '演唱结束后，你最在意的是：', optionA: '身边歌友、听众的反馈和掌声，希望得到大家的认可', optionB: '自己对演唱的满意度，是否唱出了老歌的韵味和核心情感' },
  { id: 3, dimension: 'EI', dimensionLabel: '维度一：演唱动力源', dimensionIcon: 'compass', text: '遇到演唱瓶颈（如高音上不去、咬字不准），你会：', optionA: '主动向合唱团老师、资深歌友请教，加入声乐交流小组寻求帮助', optionB: '自己听原唱对比、练气息，慢慢摸索解决方法，不麻烦别人' },
  { id: 4, dimension: 'EI', dimensionLabel: '维度一：演唱动力源', dimensionIcon: 'compass', text: '你更享受哪种演唱场景？', optionA: '广场合唱、社区歌会、老友聚会演唱等多人参与的场景', optionB: '家里练唱、公园独自演唱，专注于自己的声音和歌曲情感' },
  { id: 5, dimension: 'EI', dimensionLabel: '维度一：演唱动力源', dimensionIcon: 'compass', text: '学习一首新的经典老歌时，你会：', optionA: '喜欢和歌友一起练习，互相督促、比拼唱功，一起进步', optionB: '独自练习，避免被打扰，专注于打磨自己的演唱细节' },
  // 维度二: 演唱表达偏好 (S/N)
  { id: 6, dimension: 'SN', dimensionLabel: '维度二：演唱表达偏好', dimensionIcon: 'eye', text: '选择演唱歌曲时，你更看重：', optionA: '旋律熟悉、歌词好记，朗朗上口，能快速学会并唱好', optionB: '歌曲有年代回忆、有深层意义，能唱出自己的人生感悟' },
  { id: 7, dimension: 'SN', dimensionLabel: '维度二：演唱表达偏好', dimensionIcon: 'eye', text: '演唱时，你对歌词的处理方式是：', optionA: '准确咬字、清晰发音，确保身边人能听清每一句歌词', optionB: '结合旋律起伏，灵活处理咬字和语气，更注重唱出歌曲的韵味' },
  { id: 8, dimension: 'SN', dimensionLabel: '维度二：演唱表达偏好', dimensionIcon: 'eye', text: '学习一首新的经典老歌，你会先从哪里入手？', optionA: '先跟着原唱唱准旋律和节奏，再慢慢加入自己的情感', optionB: '先了解歌曲的创作背景、年代故事，再配合旋律表达情感' },
  { id: 9, dimension: 'SN', dimensionLabel: '维度二：演唱表达偏好', dimensionIcon: 'eye', text: '你更擅长演唱哪种类型的歌曲？', optionA: '经典红歌、民俗小调、通俗老歌等旋律舒缓、情感直白的歌曲', optionB: '抒情老歌、经典民歌等情感细腻、有年代回忆的歌曲' },
  { id: 10, dimension: 'SN', dimensionLabel: '维度二：演唱表达偏好', dimensionIcon: 'eye', text: '演唱时，你更关注：', optionA: '音准、节奏的准确性，避免出现失误，唱得规范好听', optionB: '情感的层次感，能否通过演唱勾起自己和听众的年代回忆' },
  // 维度三: 演唱决策方式 (T/F)
  { id: 11, dimension: 'TF', dimensionLabel: '维度三：演唱决策方式', dimensionIcon: 'scale', text: '当演唱出现失误（如忘词、跑调），你会：', optionA: '冷静调整，快速衔接下一句，尽量不影响整体演唱效果', optionB: '会有点慌乱，情绪受影响，可能会影响后续演唱状态' },
  { id: 12, dimension: 'TF', dimensionLabel: '维度三：演唱决策方式', dimensionIcon: 'scale', text: '选择演唱曲目时，你会优先考虑：', optionA: '自己的音域、音色是否适合，能否发挥自身唱功优势', optionB: '自己是否喜欢这首歌，是否有年代情怀，能否产生情感共鸣' },
  { id: 13, dimension: 'TF', dimensionLabel: '维度三：演唱决策方式', dimensionIcon: 'scale', text: '歌友或老师对你的演唱提出批评时，你会：', optionA: '认真倾听，分析问题所在，针对性改进自己的演唱', optionB: '先感受情绪，可能会有点失落，再慢慢调整自己的演唱' },
  { id: 14, dimension: 'TF', dimensionLabel: '维度三：演唱决策方式', dimensionIcon: 'scale', text: '演唱时，你会根据什么调整自己的状态？', optionA: '音准、气息的控制，用简单的技巧调整演唱效果', optionB: '自身的情绪状态，跟着感觉唱，唱出自己的真情实感' },
  { id: 15, dimension: 'TF', dimensionLabel: '维度三：演唱决策方式', dimensionIcon: 'scale', text: '面对"演唱技巧"和"情感表达"，你会优先侧重：', optionA: '演唱技巧，技巧到位才能更好地唱出歌曲的韵味', optionB: '情感表达，哪怕技巧有小瑕疵，唱出真情实感最重要' },
  // 维度四: 演唱习惯 (J/P)
  { id: 16, dimension: 'JP', dimensionLabel: '维度四：演唱习惯', dimensionIcon: 'clock', text: '你会为合唱、歌会等演唱活动做详细的准备吗？', optionA: '会，提前熟悉曲目、练习节奏，按计划准备，不拖大家后腿', optionB: '不会，大多临时熟悉，根据当天状态发挥，放松就好' },
  { id: 17, dimension: 'JP', dimensionLabel: '维度四：演唱习惯', dimensionIcon: 'clock', text: '日常练习演唱时，你更倾向于：', optionA: '固定时间、固定时长，有规律地练习，慢慢提升唱功', optionB: '随缘练习，散步、饭后有兴致就唱，不刻意安排' },
  { id: 18, dimension: 'JP', dimensionLabel: '维度四：演唱习惯', dimensionIcon: 'clock', text: '演唱结束后，你会：', optionA: '总结这次演唱的优点和不足，下次尽量改进', optionB: '随缘感受，不刻意总结，下次自然发挥即可' },
  { id: 19, dimension: 'JP', dimensionLabel: '维度四：演唱习惯', dimensionIcon: 'clock', text: '当有合唱、社区歌会等演唱任务时，你会：', optionA: '提前很久开始准备，反复练习，避免临时抱佛脚', optionB: '临近活动再准备，觉得临时练习更有状态' },
  { id: 20, dimension: 'JP', dimensionLabel: '维度四：演唱习惯', dimensionIcon: 'clock', text: '你对演唱的追求是：', optionA: '希望自己的演唱更规范、更好听，有明确的提升目标', optionB: '享受演唱的过程，能陶冶情操、结交朋友，开心就好' },
];

export const mbtiTypes: Record<string, MBTIType> = {
  'ESTJ': {
    code: 'E-S-T-J',
    name: '合唱领唱者',
    subtitle: '外倾 · 实感 · 理性 · 判断',
    coreTrait: '擅长在合唱中带动节奏，演唱风格大气、稳定，注重演唱的规范性和整体配合度，适合带领大家一起唱。',
    strengths: ['音准节奏扎实，临场应变能力强', '适合广场合唱、社区歌会领唱', '能快速适应合唱配合需求', '带动大家唱出好效果'],
    weaknesses: ['有时过于注重演唱规范，情感表达不够细腻', '对自己和伙伴要求稍高，容易产生焦虑情绪'],
    songs: [
      { name: '歌唱祖国', artist: '王莘', reason: '大气磅礴的旋律与领唱者的气场完美契合' },
      { name: '没有共产党就没有新中国', artist: '曹火星', reason: '节奏铿锵有力，适合领唱带动全场' },
      { name: '团结就是力量', artist: '牧虹', reason: '合唱经典，彰显领唱者的号召力' },
    ],
  },
  'ESFJ': {
    code: 'E-S-F-J',
    name: '温情传唱者',
    subtitle: '外倾 · 实感 · 感性 · 判断',
    coreTrait: '性格温和，演唱风格亲切自然，擅长用直白的情感传唱经典老歌，注重演唱的舒适度和感染力，深受歌友喜爱。',
    strengths: ['咬字清晰、情感真挚', '能快速拉近与歌友、听众的距离', '适合社区歌会、老友聚会演唱', '演唱的老歌能勾起大家的回忆'],
    weaknesses: ['演唱技巧打磨不够深入，遇到高难度老歌时容易力不从心', '情绪波动较大，影响演唱稳定性'],
    songs: [
      { name: '茉莉花', artist: '何仿', reason: '温婉柔和的旋律，与传唱者的亲切气质相得益彰' },
      { name: '洪湖水浪打浪', artist: '王玉珍', reason: '经典抒情老歌，温暖而富有感染力' },
      { name: '甜蜜蜜', artist: '邓丽君', reason: '柔情似水的歌声，最能传递温暖' },
    ],
  },
  'ENTJ': {
    code: 'E-N-T-J',
    name: '经典创新者',
    subtitle: '外倾 · 直觉 · 理性 · 判断',
    coreTrait: '思维活跃，演唱风格独特，擅长在传唱经典老歌的基础上稍作创新，注重歌曲的年代韵味和个性化呈现。',
    strengths: ['对老歌的理解深刻，能快速捕捉歌曲的核心内涵', '擅长调整演唱语气，让经典焕发新生', '演唱风格有个性，辨识度高'],
    weaknesses: ['创新改动有时不合群，合唱时较难配合', '对歌曲的理解有时过于理性，情感表达略显不足'],
    songs: [
      { name: '月亮代表我的心', artist: '邓丽君', reason: '经典中的经典，创新者能赋予它新的诠释' },
      { name: '夜来香', artist: '黎锦光', reason: '优雅旋律适合个性化演绎与创新表达' },
      { name: '玫瑰玫瑰我爱你', artist: '陈歌辛', reason: '节奏明快，适合加入个人风格的改编' },
    ],
  },
  'ENFJ': {
    code: 'E-N-F-J',
    name: '韵味歌者',
    subtitle: '外倾 · 直觉 · 感性 · 判断',
    coreTrait: '演唱风格韵味十足，擅长用细腻的情感传达歌曲的年代意境，注重听众的情感共鸣和集体演唱体验。',
    strengths: ['情感表达丰富，感染力强', '善于营造演唱氛围，让每首歌都有故事感', '擅长在群体中传递音乐情感'],
    weaknesses: ['演唱有时不够稳定，受情绪影响较大', '对技巧重视不足，高难度段落容易力不从心'],
    songs: [
      { name: '但愿人长久', artist: '王菲', reason: '诗意与旋律交织，韵味歌者的绝佳之选' },
      { name: '送别', artist: '李叔同', reason: '意境深远，适合以韵味诉说情怀' },
      { name: '在水一方', artist: '邓丽君', reason: '婉转悠扬，最能展现歌者的韵味功底' },
    ],
  },
  'ISTJ': {
    code: 'I-S-T-J',
    name: '精益演唱者',
    subtitle: '内倾 · 实感 · 理性 · 判断',
    coreTrait: '性格沉稳，演唱风格严谨细致，注重演唱技巧的打磨，追求老歌演唱的完美度，唱功扎实。',
    strengths: ['音准、节奏把控精准，演唱技巧扎实', '适合独自练唱、小型私密场合演唱', '能精准唱出经典老歌的韵味，演唱质量高'],
    weaknesses: ['不擅长带领合唱、大型场合演唱，面对多人时容易紧张', '情感表达过于内敛，不够外放'],
    songs: [
      { name: '小白杨', artist: '阎维文', reason: '节奏明快、要求精准，与精益演唱者追求完美契合' },
      { name: '打靶归来', artist: '阎维文', reason: '技巧与节奏并重，适合细心打磨' },
      { name: '我的祖国', artist: '郭兰英', reason: '经典美声曲目，需要严谨的技巧支撑' },
    ],
  },
  'ISFJ': {
    code: 'I-S-F-J',
    name: '治愈传唱者',
    subtitle: '内倾 · 实感 · 感性 · 判断',
    coreTrait: '性格温柔，演唱风格治愈舒缓，擅长用温柔的声音传唱经典老歌，注重歌曲的情感传递，能陶冶情操。',
    strengths: ['音色柔和，情感真挚', '演唱的老歌能给人带来温暖和治愈感', '适合家里练唱、公园独自演唱', '既能愉悦自己，也能感染身边人'],
    weaknesses: ['舞台表现力较弱，不擅长带动合唱氛围', '技巧提升较慢，缺乏突破意识'],
    songs: [
      { name: '军港之夜', artist: '苏小明', reason: '舒缓宁静的旋律，与治愈传唱者的温柔气质完美匹配' },
      { name: '月亮代表我的心', artist: '邓丽君', reason: '温暖而细腻的歌声，最能抚慰人心' },
      { name: '大海啊故乡', artist: '郑绪岚', reason: '悠扬柔和，传递温暖与安宁' },
    ],
  },
  'INTP': {
    code: 'I-N-T-P',
    name: '小众怀旧者',
    subtitle: '内倾 · 直觉 · 理性 · 感知',
    coreTrait: '性格内敛，思维独特，擅长演唱一些小众经典老歌，注重歌曲的个性化表达和年代回忆感。',
    strengths: ['对老歌的感知力强，能挖掘出小众老歌的魅力', '演唱风格有格调，能唱出老歌的深层韵味', '适合喜欢怀旧、追求独特的中老年人'],
    weaknesses: ['不喜欢被合唱规则束缚，练习缺乏规律性', '不擅长与人交流演唱技巧，提升速度较慢'],
    songs: [
      { name: '康定情歌', artist: '四川民歌', reason: '小众而经典的民歌，适合独特的审美品味' },
      { name: '在那遥远的地方', artist: '王洛宾', reason: '悠远深邃的旋律，与怀旧者的气质相合' },
      { name: '敖包相会', artist: '通福', reason: '意境深远的小众经典，别有一番风味' },
    ],
  },
  'INFP': {
    code: 'I-N-F-P',
    name: '情怀吟唱者',
    subtitle: '内倾 · 直觉 · 感性 · 感知',
    coreTrait: '性格敏感细腻，演唱风格空灵动人，擅长用声音表达经典老歌中的年代情怀和自身感悟，注重歌曲的灵魂共鸣。',
    strengths: ['情感表达极致，音色独特', '能传递出老歌最纯粹的情感和年代记忆', '适合演唱有诗意、有情怀的经典曲目', '能触动听众的内心'],
    weaknesses: ['情绪波动大，演唱状态不稳定', '不擅长大型场合演唱，容易紧张', '对演唱技巧的重视程度不够'],
    songs: [
      { name: '但愿人长久', artist: '王菲', reason: '诗意与深情交织，情怀吟唱者的灵魂之选' },
      { name: '茉莉花（抒情版）', artist: '民歌', reason: '空灵而深情，吟唱出最纯粹的情感' },
      { name: '知否知否', artist: '胡夏/郁可唯', reason: '古风韵味与情怀共鸣的完美结合' },
    ],
  },
};

export function calculateMBTI(answers: Record<number, 'A' | 'B'>): { type: string; scores: { EI: number; SN: number; TF: number; JP: number } } {
  const scores = { EI: 0, SN: 0, TF: 0, JP: 0 };

  for (const [qId, answer] of Object.entries(answers)) {
    const question = questions.find(q => q.id === Number(qId));
    if (!question) continue;
    if (answer === 'A') {
      scores[question.dimension] += 1;
    }
  }

  const e = scores.EI >= 3 ? 'E' : 'I';
  const s = scores.SN >= 3 ? 'S' : 'N';
  const t = scores.TF >= 3 ? 'T' : 'F';
  const j = scores.JP >= 3 ? 'J' : 'P';

  return { type: `${e}${s}${t}${j}`, scores };
}
