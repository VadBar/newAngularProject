export interface User {
  email: string,
  password: string
}
export interface Category {
  name: string,
  imageSrc?: string,
  user?: string,
  _id?: string
}
export interface Message {
  message: string
}
export interface Position {
  name: string,
  cost: number,
  category: string,
  user?: string,
  _id?: string,
  quanitity?: number
}
export interface Order {
  date?: Date,
  order?: number,
  user?: string,
  list: orderPosition[]
}
export interface orderPosition {
  name: string,
  cost: number,
  quanitity: number,
  _id?: string
}
export interface Filter {
  offset?: number,
  limit?: number,
  order?: number,
  start?: Date,
  end?: Date
}
export interface OverviewPage {
  gain: OverviewPageItem,
  orders: OverviewPageItem
}
export interface OverviewPageItem {
  percent: number,
  yersteday: number,
  compare: number,
  isHigh: boolean
}
export interface AnalyticsPage {
  average: number,
  chart: AnalyticsPageItem[]
}
export interface AnalyticsPageItem {
  label: string,
  gain: number,
  order: number
}
