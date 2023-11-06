export function fromArray<const T extends readonly any[]>(arr: T): T[number] {
  return arr[Math.floor(arr.length * Math.random())]
}
