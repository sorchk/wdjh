import type { ProjectsDict } from "../types";

export const zh: ProjectsDict = {
  projects: "项目",
  newProject: "新建项目",
  noProjectsYet: "暂无项目",
  createYourFirstProject: "创建您的第一个项目",
  noLead: "无负责人",
  members: "成员",
  agents: "代理",
  noResults: "无结果",
  name: "名称",
  priority: "优先级",
  status: "状态",
  progress: "进度",
  lead: "负责人",
  created: "创建时间",
  today: "今天",
  daysAgo: (n: number) => (n === 1 ? "1天前" : `${n}天前`),
  monthsAgo: (n: number) => `${n}个月前`,
};