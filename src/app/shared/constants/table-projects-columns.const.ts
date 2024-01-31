import { TableColumns } from "../interfaces/table-columns";

export const PROJECTS_TABLE_COLUMNS: TableColumns[] = [
  {
    displayName: "LABEL.PROJECT_NAME",
    valueField: "projectName",
  },
  {
    displayName: "LABEL.PROJECT_START_DATE",
    valueField: "startDate",
  },
  {
    displayName: "LABEL.PROJECT_END_DATE",
    valueField: "endDate",
  },
  // {
  //   displayName: "LABEL.TEAM_SIZE",
  //   valueField: "teamSize",
  // },
  {
    displayName: "LABEL.TECH_STACK",
    valueField: "techStack",
  },
];
