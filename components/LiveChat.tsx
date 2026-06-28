import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: '1', 
      text: 'Cześć! Jestem asystentem AI agencji. Pomogę Ci wybrać odpowiednią usługę i sfinalizować zamówienie. Czego dzisiaj potrzebujesz? Strony WWW, automatyzacji, czy czegoś innego?', 
      sender: 'ai' 
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setMessage('');
    setIsTyping(true);

    // Track GA4 event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'live_chat_message', {
        'event_category': 'engagement',
        'event_label': 'AI Chat'
      });
    }

    // Simulate AI Sales response
    setTimeout(() => {
      setIsTyping(false);
      
      const userText = newUserMessage.text.toLowerCase();
      let aiResponseText = "";

      if (userText.includes('@') || userText.includes('telefon') || userText.match(/\d{9}/)) {
        aiResponseText = "Dziękuję za podanie danych kontaktowych! Nasz specjalista otrzymał już Twoje zgłoszenie i skontaktuje się z Tobą w ciągu kilku godzin, aby domknąć zamówienie. Czy masz jeszcze jakieś pytania?";
      } else if (userText.includes('stron') || userText.includes('www') || userText.includes('sklep')) {
        aiResponseText = "Świetnie! Nowoczesne strony internetowe i sklepy to nasza specjalność. Abyśmy mogli ruszyć z realizacją i przygotować precyzyjną wycenę, zostaw proszę swój adres e-mail lub numer telefonu, a nasz ekspert skontaktuje się z Tobą od razu!";
      } else if (userText.includes('automatyzacj') || userText.includes('ai') || userText.includes('bot')) {
        aiResponseText = "Automatyzacje AI potrafią zaoszczędzić mnóstwo czasu i pieniędzy (sprawdź nasz kalkulator ROI!). Jesteśmy gotowi wdrożyć to dla Ciebie. Zostaw swój kontakt (e-mail/telefon), a przygotujemy umowę i harmonogram wdrożenia.";
      } else {
        aiResponseText = "Brzmi rewelacyjnie! Jesteśmy w stanie zrealizować ten projekt. Aby przejść do szczegółów i domknąć zamówienie, podaj nam swój adres e-mail lub numer telefonu w tym oknie. Przekażę go od razu do zespołu!";
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'ai'
      }]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full bg-gradient-to-r from-synapse-primary to-synapse-accent text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
      </button>

      {/* Chat Window */}
      <div className={`absolute bottom-0 right-0 w-[350px] sm:w-[400px] h-[550px] max-h-[80vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-synapse-primary to-synapse-accent p-4 flex justify-between items-center text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Asystent AI ds. Sprzedaży</h3>
              <p className="text-xs text-white/80 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Dostępny online
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-slate-50 dark:bg-slate-800/50 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-synapse-primary/10 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-synapse-primary" />
                </div>
              )}
              <div 
                className={`p-3 rounded-2xl text-sm max-w-[75%] ${
                  msg.sender === 'user' 
                    ? 'bg-synapse-primary text-white rounded-br-sm' 
                    : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-gray-100 border border-slate-200 dark:border-white/5 shadow-sm rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start items-end gap-2">
              <div className="w-8 h-8 rounded-full bg-synapse-primary/10 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-synapse-primary" />
              </div>
              <div className="bg-white dark:bg-slate-700 p-4 rounded-2xl rounded-bl-sm border border-slate-200 dark:border-white/5 shadow-sm flex gap-1">
                <div className="w-2 h-2 bg-synapse-primary/60 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-synapse-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-synapse-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <div className="relative flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Wpisz odpowiedź lub zostaw kontakt..."
              className="w-full pl-4 pr-12 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-synapse-primary outline-none text-sm transition-all"
            />
            <button
              type="submit"
              disabled={!message.trim() || isTyping}
              className="absolute right-2 p-2 bg-synapse-primary text-white rounded-lg hover:bg-synapse-accent disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-2">
            AI asystent odpowiada automatycznie.
          </p>
        </form>
      </div>
    </div>
  );
};
