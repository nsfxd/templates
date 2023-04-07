import mime from "mime-types"
export const sum = (x: number, y: number) => x + y
export const m = (s: string) => mime.lookup(s)
