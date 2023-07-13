export interface IPropsBreadcrumb {
  links: {
    path: string
    pageName: string
    isCurrent?: boolean
  }[]
}
