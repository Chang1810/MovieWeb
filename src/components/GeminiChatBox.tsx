import { useState } from "react"
import { Send, MessageCircle, X } from "lucide-react"
import { generateText } from "../services/geminiService"
import "./GeminiChatBox.css"

const GeminiChatBox = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([])

  const handleSend = async () => {
    if (!input.trim()) return

    const newMessages = [...messages, { role: "user", text: input }]
    setMessages(newMessages)
    setInput("")

    try {
      const reply = await generateText(input)
      setMessages([...newMessages, { role: "gemini", text: reply }])
    } catch (err) {
      setMessages([...newMessages, { role: "gemini", text: "⚠️ Lỗi khi gọi Gemini API" }])
    }
  }

  return (
    <>
      {/* Icon nhỏ nổi ở góc dưới */}
      <button className="gemini-icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chatbox */}
      {isOpen && (
        <div className="gemini-chatbox">
          <div className="chat-header">
            <span>Gemini AI</span>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="chat-footer">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default GeminiChatBox
