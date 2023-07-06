export type Entry<T> = {
  [k in keyof T]: [k, T[k]]
}[keyof T]
