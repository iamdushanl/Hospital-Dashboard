'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, X, MessageSquare, Bot, Sparkles, ChevronDown } from 'lucide-react'

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
}

export default function PrismoChatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hi! I'm Prismo 🤖, your AI Hospital Analytics Assistant. I can help you analyze trends, predict readmissions, or explain any metric on this dashboard. What would you like to know?",
            timestamp: new Date()
        }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isOpen])

    const handleSend = async () => {
        if (!inputValue.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInputValue('')
        setIsTyping(true)

        // Simulate AI processing
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: generateResponse(userMessage.content),
                timestamp: new Date()
            }
            setMessages(prev => [...prev, aiResponse])
            setIsTyping(false)
        }, 1500)
    }

    const generateResponse = (query: string): string => {
        const lowerQuery = query.toLowerCase()
        if (lowerQuery.includes('revenue') || lowerQuery.includes('money')) {
            return "Based on current data, our monthly revenue is **Rs. 19.2M**, up 7.3% vs last month. The biggest driver is Major Joint Replacement surgeries (Rs. 1.2M). Would you like a breakdown by payer mix?"
        }
        if (lowerQuery.includes('readmission') || lowerQuery.includes('risk')) {
            return "Our current readmission rate is **12.0%**, which is improving (down 0.3pts). However, **Heart Failure** patients have the highest risk at 24.5%. I recommend reviewing the care transition protocols for cardiac patients."
        }
        if (lowerQuery.includes('occupancy') || lowerQuery.includes('bed')) {
            return "Current bed occupancy is **78%**. We have capacity available, but Orthopedics is running high at 92%. We might need to divert some non-urgent admissions if it crosses 95%."
        }
        if (lowerQuery.includes('satisfaction')) {
            return "Patient satisfaction is strong at **88%**, beating our 85% target! Cleanliness and Nursing Care are top-rated, but Discharge Process scores (76%) could use some improvement."
        }
        return "I can analyze that for you. I'm scanning the dashboard metrics... \n\nBased on the trends, I see stable performance in this area. Is there a specific department or time range you'd like me to focus on?"
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans">
            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-[380px] h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-200">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex items-center justify-between text-white shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                                <Bot size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Prismo AI</h3>
                                <div className="flex items-center gap-2 text-xs text-indigo-100">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    Online • Analyzing Real-time Data
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <ChevronDown size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${msg.role === 'user'
                                            ? 'bg-indigo-600 text-white rounded-br-none'
                                            : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                                        }`}
                                >
                                    {msg.role === 'assistant' && (
                                        <div className="flex items-center gap-2 mb-1 text-xs font-bold text-indigo-600 uppercase tracking-wider">
                                            <Sparkles size={12} />
                                            AI Analysis
                                        </div>
                                    )}
                                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                                        {msg.content.split('**').map((part, i) =>
                                            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                                        )}
                                    </div>
                                    <div className={`text-[10px] mt-2 text-right ${msg.role === 'user' ? 'text-indigo-200' : 'text-gray-400'}`}>
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none p-4 shadow-sm flex gap-1">
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask Prismo about readmissions, revenue..."
                                className="flex-1 bg-gray-100 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!inputValue.trim() || isTyping}
                                className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`group flex items-center gap-3 h-14 pl-4 pr-6 rounded-full shadow-2xl transition-all duration-300 ${isOpen
                        ? 'bg-gray-900 text-white rotate-0'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-105'
                    }`}
            >
                <div className={`relative transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                    {isOpen ? <X size={24} /> : <Bot size={28} />}

                    {/* Notification Badge */}
                    {!isOpen && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                    )}
                </div>

                <div className="flex flex-col items-start">
                    <span className="font-bold text-base">Ask Prismo AI</span>
                    <span className="text-[10px] text-indigo-100 uppercase tracking-widest font-semibold">
                        {isOpen ? 'Close Chat' : 'Click to Analyze'}
                    </span>
                </div>

                {/* Hover Tooltip - "Chart above all charts" explanation */}
                {!isOpen && (
                    <div className="absolute bottom-20 right-0 w-64 bg-gray-900 text-white p-4 rounded-xl shadow-xl transform transition-all duration-300 origin-bottom-right pointer-events-none opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                        <div className="relative">
                            <h4 className="font-bold mb-1 flex items-center gap-2">
                                <Sparkles size={14} className="text-yellow-400" />
                                Smart Assistant
                            </h4>
                            <p className="text-xs text-gray-300 leading-relaxed">
                                I'm Prismo, your AI analyst. I sit <strong>above all your charts</strong> to give you instant insights from every data point!
                            </p>
                            {/* Arrow */}
                            <div className="absolute -bottom-6 right-8 w-4 h-4 bg-gray-900 rotate-45 transform"></div>
                        </div>
                    </div>
                )}
            </button>
        </div>
    )
}
