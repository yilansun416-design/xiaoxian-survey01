import { SurveySection } from './types';

export const SURVEY_SECTIONS: SurveySection[] = [
  {
    id: 'B',
    title: '基本信息',
    questions: [
      {
        id: 'ageGroup',
        text: '您的年龄段？',
        type: 'radio',
        options: [
          { value: '12岁以下', label: '12 岁以下' },
          { value: '12-18岁', label: '12–18 岁' },
          { value: '19-25岁', label: '19–25 岁' },
          { value: '26-35岁', label: '26–35 岁' },
          { value: '36岁以上', label: '36 岁以上' },
        ],
      },
      {
        id: 'identity',
        text: '您的身份更接近于？',
        type: 'radio',
        allowOther: true,
        options: [
          { value: '中小学生', label: '中小学生' },
          { value: '高校学生', label: '高校学生' },
          { value: '上班族', label: '上班族' },
          { value: '家长', label: '家长' },
        ],
      },
      {
        id: 'redInterest',
        text: '您平时对“红色题材/红色旅游”的兴趣如何？',
        type: 'radio',
        options: [
          { value: 1, label: '完全不感兴趣' },
          { value: 2, label: '不太感兴趣' },
          { value: 3, label: '一般' },
          { value: 4, label: '比较感兴趣' },
          { value: 5, label: '非常感兴趣' },
        ],
      },
      {
        id: 'firstTime',
        text: '这是您第一次在展馆/景区中体验这种“扫码玩小游戏”的项目吗？',
        type: 'radio',
        options: [
          { value: '是', label: '是' },
          { value: '否', label: '否' },
        ],
      },
    ],
  },
  {
    id: 'C',
    title: '游戏整体体验',
    description: '请根据您的实际感受打分（1=非常不同意，5=非常同意）',
    questions: [
      { id: 'c1_easyToPlay', text: '我很容易就懂得怎么玩这个游戏。', type: 'scale' },
      { id: 'c2_smoothUI', text: '游戏的操作和界面整体比较流畅、清晰。', type: 'scale' },
      { id: 'c3_duration', text: '游戏流程时长对我来说是合适的。', type: 'scale' },
      { id: 'c4_immersion', text: '在游玩的过程中，我有“沉浸在故事里”的感觉。', type: 'scale' },
      { id: 'c5_funFactor', text: '这个游戏让我觉得“好玩”，而不是在“做题/考试”。', type: 'scale' },
    ],
  },
  {
    id: 'D',
    title: '剧情与红色叙事体验',
    description: '庄重感与趣味性的平衡（1=非常不同意，5=非常同意）',
    questions: [
      { id: 'd1_plotHook', text: '游戏中的故事情节让我想继续往下推理。', type: 'scale' },
      { id: 'd2_historySense', text: '我能感受到游戏故事背后是真实的历史事件。', type: 'scale' },
      { id: 'd3_balance', text: '游戏在“好玩”和“红色主题的庄重感”之间平衡得比较好。', type: 'scale' },
      { id: 'd4_curiosity', text: '相比刚开始，我现在更好奇这段红色历史的真实故事。', type: 'scale' },
    ],
  },
  {
    id: 'E',
    title: '情感共鸣与价值认同',
    description: '（1=非常不同意，5=非常同意）',
    questions: [
      { id: 'e1_resonance', text: '我对游戏中的人物（战士/群众/角色）产生了一定的共鸣。', type: 'scale' },
      { id: 'e2_empathy', text: '这个游戏让我更能理解当时人们做出选择的原因。', type: 'scale' },
      { id: 'e3_values', text: '体验后，我更认同游戏中传达的价值观（如信念、担当、牺牲等）。', type: 'scale' },
      { id: 'e4_recommend', text: '我愿意把这个游戏推荐给身边的朋友/家人体验。', type: 'scale' },
    ],
  },
  {
    id: 'F',
    title: '线下展馆体验 & 消费意向',
    description: '关于线下互动与文创（1=非常不同意，5=非常同意）',
    questions: [
      { id: 'f1_visitIntent', text: '这个游戏让我更想去展馆/景区里看看相关的真实展品或场景。', type: 'scale' },
      { id: 'f2_checkinIntent', text: '如果展馆中有与游戏相关的线下打卡点（盖章、合影点等），我会愿意去完成。', type: 'scale' },
      { id: 'f3_buyIntent', text: '看到与游戏相关的文创产品（比如明信片、徽章、书签等），我会有购买的冲动。', type: 'scale' },
      {
        id: 'f4_offlineActivities',
        text: '下面哪些形式是你愿意参与的？（可多选）',
        type: 'checkbox',
        allowOther: true,
        options: [
          { value: '打卡路线', label: '和游戏故事相关的线下打卡路线' },
          { value: '文创纪念品', label: '与游戏角色/剧情相关的文创纪念品' },
          { value: '解锁更多章节', label: '解锁更多章节/线下限定剧情' },
          { value: '线下活动', label: '线下红色主题活动（剧本杀、讲解员带领等）' },
        ],
      },
    ],
  },
  {
    id: 'G',
    title: '整体满意度与建议',
    questions: [
      {
        id: 'g1_overallSatisfaction',
        text: '整体来说，您对《啸仙丹心》这款游戏的满意度是？',
        type: 'radio',
        options: [
          { value: 1, label: '非常不满意' },
          { value: 2, label: '不太满意' },
          { value: 3, label: '一般' },
          { value: 4, label: '比较满意' },
          { value: 5, label: '非常满意' },
        ],
      },
      { id: 'g2_likedPoint', text: '您最喜欢这个游戏的哪一点？', type: 'textarea' },
      { id: 'g3_improvementPoint', text: '您觉得哪一点最需要改进？', type: 'textarea' },
      { id: 'g4_futureContent', text: '如果以后推出更多类似的红色推理游戏，您最希望看到的内容是？', type: 'textarea' },
    ],
  },
];
