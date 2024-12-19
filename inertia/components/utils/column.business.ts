import { Column } from '../../types/column'

const columnDataKey = Symbol('column')

export type ColumnData = { [columnDataKey]: true; column: Column }

export function getColumnData(column: Column): ColumnData {
  return { [columnDataKey]: true, column: column }
}

export function isColumnData(data: Record<string | symbol, unknown>): data is ColumnData {
  return data[columnDataKey] === true
}
