export interface IPropsPagination {
  totalDataElements: number
  limitPerPage: number
  totalShowedButtonsInPagination: number
  offsetFc: (offset: number) => void
}
