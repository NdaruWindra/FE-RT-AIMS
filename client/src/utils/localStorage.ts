export function setLocalStorage(key: string, data: string) {
  localStorage.setItem(key, data)
}

export function getLocalStorage(key: string) {
  const data = localStorage.getItem(key)

  if (data) {
    return data
  }
}

export function removeLocalStorage(key: string) {
  localStorage.removeItem(key)
}
