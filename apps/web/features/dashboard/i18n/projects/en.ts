import type { ProjectsDict } from "../types";

export const en: ProjectsDict = {
  projects: "Projects",
  newProject: "New project",
  noProjectsYet: "No projects yet",
  createYourFirstProject: "Create your first project",
  noLead: "No lead",
  members: "Members",
  agents: "Agents",
  noResults: "No results",
  name: "Name",
  priority: "Priority",
  status: "Status",
  progress: "Progress",
  lead: "Lead",
  created: "Created",
  today: "Today",
  daysAgo: (n: number) => (n === 1 ? "1d ago" : `${n}d ago`),
  monthsAgo: (n: number) => `${n}mo ago`,
};