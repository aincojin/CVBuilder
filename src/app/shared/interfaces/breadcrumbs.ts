export interface BreadcrumbsInterface {
  label: string;
  link: BreadcrumbLinkInterface;
}

export interface BreadcrumbLinkInterface {
  path: string;
  id?: number;
}
