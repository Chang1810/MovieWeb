import { createContext, useContext, useState, useEffect } from "react"
import { getHistory, saveHistory } from "../services/history"

type HistoryContextType = {
  history: string[]
  addToHistory: (videoId: string) => void
  clearAllHistory: () => void
}

const HistoryContext = createContext<HistoryContextType | null>(null)

export const HistoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [history, setHistory] = useState<string[]>([])

  useEffect(() => {
    setHistory(getHistory())
  }, [])

  const addToHistory = (videoId: string) => {
    saveHistory(videoId)
    setHistory(prev => [...prev, videoId])
  }

  const clearAllHistory = () => {
    setHistory([])
    localStorage.removeItem("watchHistory")
  }

  return (
    <HistoryContext.Provider value={{ history, addToHistory, clearAllHistory }}>
      {children}
    </HistoryContext.Provider>
  )
}

export const useHistory = () => {
  const ctx = useContext(HistoryContext)
  if (!ctx) throw new Error("useHistory must be used inside HistoryProvider")
  return ctx
}
