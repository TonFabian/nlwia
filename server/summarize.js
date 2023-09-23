import { summaryExample } from "./utils/summary.js"

export async function summarize(text) {
  return text ? text : summaryExample
}
