'use client'
import { useState, useEffect, useRef } from 'react'
import { 
  MessageCircle, 
  Phone, 
  X, 
  Sparkles, 
  ArrowUp, 
  ChevronRight, 
  Send, 
  Bot, 
  User, 
  RotateCcw,
  CheckCircle2,
  Store,
  Compass
} from 'lucide-react'
import styles from './FloatingConcierge.module.css'

interface ChatMessage {
  id: string
  sender: 'ai' | 'user'
  text: string
  time: string
  actionUrl?: string
  actionLabel?: string
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-init-1',
    sender: 'ai',
    text: 'Namaste! 🙏 I am MM Siva\'s AI Furniture Consultant. Ask me anything about wood selection (Burma Teak vs Sheesham), custom dimensions, showroom walkthroughs, or our 50% festive sale!',
    time: 'Just now'
  }
]

const QUICK_PROMPTS = [
  '🪵 Burma Teak vs Sheesham wood?',
  '🛏️ Custom Hydraulic Bed pricing?',
  '🍽️ 6-Seater Solid Dining Sets',
  '🔥 Festive Sale 50% discount code',
  '🏬 Chennai & TN Showroom locations',
  '📐 Can I order custom sizes?'
]

function getAIResponse(userText: string): { reply: string; actionUrl?: string; actionLabel?: string } {
  const lower = userText.toLowerCase()

  if (lower.includes('teak') || lower.includes('sheesham') || lower.includes('wood') || lower.includes('mango') || lower.includes('material')) {
    return {
      reply: '🪵 Burma Teak has high natural resin oils, making it 100% termite-proof and immune to Chennai’s coastal humidity. Indian Sheesham (Rosewood) offers a dense, rich two-tone grain with supreme strength. Both are kiln-seasoned at 8% moisture. For living & bedroom suites, we highly recommend Burma Teak or Grade-A Sheesham!',
      actionUrl: 'https://wa.me/919999999999?text=Hi MM Siva, I want to discuss Teak vs Sheesham wood for my home.',
      actionLabel: 'Chat with Timber Architect on WhatsApp'
    }
  }

  if (lower.includes('bed') || lower.includes('hydraulic') || lower.includes('storage') || lower.includes('king') || lower.includes('queen')) {
    return {
      reply: '🛏️ Our Flagship Lotus Hydraulic King Bed (₹38,999 • MRP ₹64,999) features heavy-duty German gas-lift struts (800L storage capacity), heirloom joinery, and a 10-year structural warranty. Available in King (78x72") and Queen (78x60") in Teak, Walnut, and Honey finishes.',
      actionUrl: 'https://wa.me/919999999999?text=Hi MM Siva, I want details and photos of the Hydraulic King Storage Bed.',
      actionLabel: 'Get Bed Photos & Specs on WhatsApp'
    }
  }

  if (lower.includes('sofa') || lower.includes('couch') || lower.includes('l-shape') || lower.includes('sectional') || lower.includes('living')) {
    return {
      reply: '🛋️ Our Royal Teak 5-Seater Sofa (3+1+1) and Albus L-Shape Sectional feature hand-planed solid teak structural frames, 38-density high-resilience foam, and stain-resistant velvet fabric. Starting from ₹45,999 with 42% festive discount.',
      actionUrl: 'https://wa.me/919999999999?text=Hi MM Siva, please share fabric swatches and prices for Solid Teak Sofas.',
      actionLabel: 'Request Fabric Swatches on WhatsApp'
    }
  }

  if (lower.includes('dining') || lower.includes('table') || lower.includes('chair') || lower.includes('6-seater') || lower.includes('8-seater')) {
    return {
      reply: '🍽️ Our 6-Seater Solid Wood Dining Set (₹42,999) and 4-Seater compact sets feature a thick 1.5-inch solid mango & teak tabletop with scratch-resistant matte PU lacquer, paired with ergonomically cushioned high-back chairs.',
      actionUrl: 'https://wa.me/919999999999?text=Hi MM Siva, please share dining table designs and dimensions.',
      actionLabel: 'View Dining Catalog on WhatsApp'
    }
  }

  if (lower.includes('discount') || lower.includes('sale') || lower.includes('offer') || lower.includes('coupon') || lower.includes('festive') || lower.includes('price')) {
    return {
      reply: '🔥 You get Flat 40%–50% festive clearance discounts today! Plus, apply promo coupon code "MMSIVA10" at checkout for an EXTRA 10% instant discount on orders above ₹20,000. Free doorstep white-glove delivery & assembly across Tamil Nadu is included!',
      actionUrl: 'https://wa.me/919999999999?text=Hi MM Siva, I would like to claim the 50% Festive Sale discount with coupon MMSIVA10.',
      actionLabel: 'Claim 50% Sale Discount'
    }
  }

  if (lower.includes('custom') || lower.includes('size') || lower.includes('dimension') || lower.includes('bespoke') || lower.includes('floorplan') || lower.includes('interior')) {
    return {
      reply: '📐 Yes! Since 1998, MM Siva operates an in-house solid wood atelier in Tamil Nadu. We customize lengths, widths, wood species, and stain finishes to match your exact floorplan or architect blueprints. Send us your room measurements for a 3D sketch and quote!',
      actionUrl: 'https://wa.me/919999999999?text=Hi MM Siva, I have custom dimensions for furniture. Can you provide a quote?',
      actionLabel: 'Send Custom Dimensions to Artisan'
    }
  }

  if (lower.includes('showroom') || lower.includes('store') || lower.includes('visit') || lower.includes('chennai') || lower.includes('coimbatore') || lower.includes('madurai') || lower.includes('location')) {
    return {
      reply: '🏬 We have 4 Flagship Experience Studios:\n• Chennai Guindy (12,000 sq.ft Flagship Studio)\n• Chennai OMR (Perungudi Express Hub)\n• Coimbatore (R.S. Puram Atelier)\n• Madurai (KK Nagar)\nOpen 10 AM – 9 PM daily with free valet parking and timber consultants.',
      actionUrl: 'https://wa.me/919999999999?text=Hi MM Siva, I would like to book a showroom visit in Chennai.',
      actionLabel: 'Book Free Showroom Visit'
    }
  }

  if (lower.includes('warranty') || lower.includes('guarantee') || lower.includes('delivery')) {
    return {
      reply: '🛡️ Every MM Siva furniture piece comes with our 10-Year Structural Durability Certificate, covering termite resistance, joint stability, and timber integrity. We deliver and assemble free of charge with white-glove safety across Tamil Nadu.',
      actionUrl: 'https://wa.me/919999999999?text=Hi MM Siva, please share warranty and delivery details.',
      actionLabel: 'Verify 10-Year Warranty'
    }
  }

  return {
    reply: `Thank you for asking! We specialize in 100% solid Burma Teak, Indian Sheesham, and Mango wood furniture. We can guide you on custom dimensions, room styling, or share our complete 2026 Lookbook PDF with festive pricing.`,
    actionUrl: `https://wa.me/919999999999?text=Hi MM Siva, I am asking about: ${encodeURIComponent(userText)}`,
    actionLabel: 'Chat on WhatsApp with Specialist'
  }
}

export default function FloatingConcierge() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'ai' | 'contact'>('ai')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showBubble, setShowBubble] = useState(true)
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [inputQuery, setInputQuery] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(false)
    }, 14000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isOpen && activeTab === 'ai') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen, isTyping, activeTab])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputQuery).trim()
    if (!text) return

    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text,
      time: timeStr
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInputQuery('')
    setIsTyping(true)

    setTimeout(() => {
      const response = getAIResponse(text)
      const aiMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: response.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionUrl: response.actionUrl,
        actionLabel: response.actionLabel
      }
      setMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, 600)
  }

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES)
    setInputQuery('')
    setIsTyping(false)
  }

  return (
    <div className={styles.conciergeWrap}>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          className={styles.scrollTopBtn} 
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* Floating Notification Speech Bubble */}
      {showBubble && !isOpen && (
        <div className={styles.speechBubble} onClick={() => setIsOpen(true)}>
          <button 
            className={styles.bubbleClose} 
            onClick={(e) => {
              e.stopPropagation()
              setShowBubble(false)
            }}
            aria-label="Close notification"
          >
            <X size={12} />
          </button>
          <div className={styles.bubbleIcon}>
            <Sparkles size={14} className={styles.sparkle} />
          </div>
          <div className={styles.bubbleText}>
            <strong>MM Siva AI Assistant Online</strong>
            <span>Ask wood questions or get custom quotes instantly!</span>
          </div>
        </div>
      )}

      {/* Concierge Trigger / Open Hub */}
      {isOpen ? (
        <div className={styles.popupBox}>
          {/* Header */}
          <div className={styles.popupHead}>
            <div className={styles.headAvatar}>
              <Bot size={20} className={styles.botIcon} />
              <span className={styles.onlineDot} />
            </div>
            <div className={styles.headInfo}>
              <h4 className={styles.headName}>MM Siva AI Chat Support</h4>
              <p className={styles.headStatus}>Online 24/7 • Solid Wood Atelier</p>
            </div>
            <div className={styles.headActions}>
              <button 
                className={styles.headActionBtn} 
                onClick={handleResetChat} 
                title="Restart Chat"
                aria-label="Restart chat"
              >
                <RotateCcw size={15} />
              </button>
              <button 
                className={styles.popupClose} 
                onClick={() => setIsOpen(false)} 
                aria-label="Close concierge"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Mode Tabs */}
          <div className={styles.tabBar}>
            <button
              className={`${styles.tabBtn} ${activeTab === 'ai' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('ai')}
            >
              <Sparkles size={14} />
              <span>AI Wood Consultant</span>
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === 'contact' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('contact')}
            >
              <Phone size={14} />
              <span>Direct Concierge</span>
            </button>
          </div>

          {/* Tab 1: AI Chat Assistant */}
          {activeTab === 'ai' && (
            <div className={styles.aiChatContainer}>
              {/* Message Feed */}
              <div className={styles.messageFeed}>
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`${styles.msgRow} ${msg.sender === 'user' ? styles.msgRowUser : styles.msgRowAi}`}
                  >
                    {msg.sender === 'ai' && (
                      <div className={styles.msgAvatarAi}>
                        <Bot size={14} />
                      </div>
                    )}
                    <div className={styles.msgBubbleWrap}>
                      <div className={`${styles.msgBubble} ${msg.sender === 'user' ? styles.msgBubbleUser : styles.msgBubbleAi}`}>
                        <p className={styles.msgText}>{msg.text}</p>
                        {msg.actionUrl && (
                          <a
                            href={msg.actionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.msgActionBtn}
                          >
                            <MessageCircle size={14} />
                            <span>{msg.actionLabel || 'Chat on WhatsApp'}</span>
                          </a>
                        )}
                      </div>
                      <span className={styles.msgTime}>{msg.time}</span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className={`${styles.msgRow} ${styles.msgRowAi}`}>
                    <div className={styles.msgAvatarAi}>
                      <Bot size={14} />
                    </div>
                    <div className={`${styles.msgBubble} ${styles.msgBubbleAi} ${styles.typingBubble}`}>
                      <span className={styles.typingDot} />
                      <span className={styles.typingDot} />
                      <span className={styles.typingDot} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestion Chips */}
              <div className={styles.chipsScroll}>
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    className={styles.chipBtn}
                    onClick={() => handleSendMessage(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Bar */}
              <form 
                className={styles.inputBar}
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
              >
                <input
                  type="text"
                  placeholder="Ask AI: e.g. Teak vs Sheesham, custom sizes..."
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  className={styles.chatInput}
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim()}
                  className={styles.sendBtn}
                  aria-label="Send message"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          )}

          {/* Tab 2: Direct Contact Concierge */}
          {activeTab === 'contact' && (
            <div className={styles.popupBody}>
              <p className={styles.popupWelcome}>
                Prefer speaking directly with a senior furniture artisan or booking a private showroom tour?
              </p>

              <a
                href="https://wa.me/919999999999?text=Hi MM Siva, I need help selecting furniture for my home."
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionBtnWhatsapp}
              >
                <div className={styles.waIconWrap}>
                  <MessageCircle size={18} />
                </div>
                <div className={styles.btnText}>
                  <strong>Chat on WhatsApp</strong>
                  <span>Direct hotline with atelier masters</span>
                </div>
                <ChevronRight size={16} />
              </a>

              <a href="tel:+919999999999" className={styles.actionBtnPhone}>
                <div className={styles.phoneIconWrap}>
                  <Phone size={16} />
                </div>
                <div className={styles.btnText}>
                  <strong>Call Furniture Hotline</strong>
                  <span>+91 99999 99999 (10 AM - 9 PM)</span>
                </div>
                <ChevronRight size={16} />
              </a>

              <a 
                href="#showroom" 
                className={styles.actionBtnVisit} 
                onClick={() => setIsOpen(false)}
              >
                <div className={styles.storeIconWrap}>
                  <Store size={16} />
                </div>
                <div className={styles.btnText}>
                  <strong>Experience Studios</strong>
                  <span>Chennai, Coimbatore, Madurai</span>
                </div>
                <ChevronRight size={16} />
              </a>
            </div>
          )}
        </div>
      ) : (
        <button 
          className={styles.mainTrigger} 
          onClick={() => setIsOpen(true)}
          aria-label="Open AI chat support and furniture assistance"
        >
          <div className={styles.triggerPulse} />
          <div className={styles.triggerIconWrap}>
            <Bot size={22} className={styles.triggerBot} />
            <Sparkles size={13} className={styles.triggerSparkle} />
          </div>
          <span className={styles.aiBadgePill}>AI Support</span>
          <span className={styles.onlineStatusRing} />
        </button>
      )}
    </div>
  )
}
