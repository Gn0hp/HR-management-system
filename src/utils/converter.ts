export function convertToNodeArray(arr: any[]): Array<any> {
  return arr.map((item) => item ?? undefined);
}
