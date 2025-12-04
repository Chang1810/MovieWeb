export const saveHistory = (videoId: string) => {
  const history = JSON.parse(localStorage.getItem("watchHistory") || "[]")
  if (!history.includes(videoId)) {
    history.push(videoId)
    localStorage.setItem("watchHistory", JSON.stringify(history))
  }
}

export const getHistory = (): string[] => {
  return JSON.parse(localStorage.getItem("watchHistory") || "[]")
}

export const clearHistory = () => {
  localStorage.removeItem("watchHistory")
}
