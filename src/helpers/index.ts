export function phoneMaskClean(phone: string) {
  return phone.replace(/[ -]/g, "");
}

export function saveToLocal(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data))
}

export function leaveOnlyId(arr: any) {
   return arr.map((item) => ({id: item?.id})) || []
}