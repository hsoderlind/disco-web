import { ValueFormatterFunc } from "ag-grid-community";

export const booleanFormatter: ValueFormatterFunc = (params) => params.value === true ? 'Ja' : 'Nej'
