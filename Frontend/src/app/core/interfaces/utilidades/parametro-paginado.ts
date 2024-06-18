export interface ParametroPaginado {
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    searchTerm: string | null,
    searchColumn: string | null,
    filter: Array<{ key: string; value: any }>
}