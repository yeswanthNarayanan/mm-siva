'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  Search, 
  MapPin, 
  Phone, 
  Heart, 
  Sparkles, 
  ChevronDown, 
  Menu, 
  X, 
  MessageCircle, 
  Truck, 
  Calendar,
  ArrowRight
} from 'lucide-react'
import styles from './Navbar.module.css'

interface NavProduct {
  id: string
  name: string
  category: string
  price: string
  mrp: string
  discount: string
  image: string
}

const SAMPLE_SEARCH_PRODUCTS: NavProduct[] = [
  { id: 'demo-1', name: 'Royal Teak Wood Sofa Set (3+1+1)', category: 'Sofa', price: '₹45,999', mrp: '₹79,999', discount: '42% OFF', image: '/images/products/sofa.png' },
  { id: 'demo-2', name: 'Sheesham Wood King Size Bed with Storage', category: 'Bed', price: '₹38,999', mrp: '₹64,999', discount: '40% OFF', image: '/images/products/bed.png' },
  { id: 'demo-3', name: 'Premium 6-Seater Solid Wood Dining Set', category: 'Dining Table', price: '₹42,999', mrp: '₹74,999', discount: '43% OFF', image: '/images/products/dining.png' },
  { id: 'demo-4', name: 'Solid Teak 3-Door Wardrobe with Mirror', category: 'Wardrobe', price: '₹35,999', mrp: '₹59,999', discount: '40% OFF', image: '/images/products/wardrobe.png' },
  { id: 'demo-5', name: 'Cane Weave Accent Armchair', category: 'Chair', price: '₹12,999', mrp: '₹22,999', discount: '43% OFF', image: '/images/products/chair.png' },
  { id: 'demo-6', name: 'Executive Solid Wood Study Table', category: 'Study Table', price: '₹18,999', mrp: '₹32,999', discount: '42% OFF', image: '/images/products/study.png' },
  { id: 'demo-7', name: 'Hand-Carved Walnut Coffee Table', category: 'Coffee Table', price: '₹14,999', mrp: '₹26,999', discount: '44% OFF', image: '/images/products/coffee-table.png' },
  { id: 'demo-8', name: 'Solid Wood Heritage Bookshelf', category: 'Storage', price: '₹22,999', mrp: '₹39,999', discount: '43% OFF', image: '/images/products/storage.png' },
]

const SEARCH_PLACEHOLDERS = [
  "Search 'Teak Wood Sofa Sets'...",
  "Search 'King Size Hydraulic Beds'...",
  "Search '6-Seater Solid Wood Dining'...",
  "Search 'Sheesham Bookshelves'...",
  "Search 'Cane Accent Chairs'..."
]

const CATEGORIES = [
  {
    id: 'living',
    label: 'Living',
    href: '#products',
    featured: {
      title: 'Royal Teak Sofas',
      desc: 'Handcrafted solid wood frames with high-density foam',
      image: '/images/lifestyle/living.png',
      badge: 'Bestseller'
    },
    subcategories: [
      {
        title: 'Seating & Sofas',
        items: ['3-Seater Sofas', '5-Seater Sets (3+1+1)', 'L-Shape Sectionals', 'Reclining Lounge Chairs', 'Wooden Diwans']
      },
      {
        title: 'Tables & Centerpieces',
        items: ['Solid Wood Coffee Tables', 'End & Side Tables', 'Console Tables', 'Nest of Tables']
      },
      {
        title: 'Living Storage',
        items: ['TV Units & Consoles', 'Display Cabinets', 'Shoe Racks & Benches', 'Partition Screens']
      }
    ]
  },
  {
    id: 'bedroom',
    label: 'Bedroom',
    href: '#products',
    featured: {
      title: 'King Size Storage Beds',
      desc: 'Hydraulic lift-up storage built from kiln-dried sheesham wood',
      image: '/images/lifestyle/bedroom.png',
      badge: 'Save 40%'
    },
    subcategories: [
      {
        title: 'Beds by Size',
        items: ['King Size Beds', 'Queen Size Beds', 'Single & Poster Beds', 'Hydraulic Storage Beds']
      },
      {
        title: 'Storage & Wardrobes',
        items: ['3-Door Wardrobes', '4-Door Solid Wood Almirahs', 'Dressing Tables with Mirror', 'Chest of Drawers']
      },
      {
        title: 'Bedside & Mattresses',
        items: ['Nightstands & Bedside Tables', 'Orthopedic Mattresses', 'Bedroom Benches']
      }
    ]
  },
  {
    id: 'dining',
    label: 'Dining',
    href: '#products',
    featured: {
      title: '6-Seater Dining Sets',
      desc: 'Solid mango & teak wood dining tables with cushioned chairs',
      image: '/images/lifestyle/dining.png',
      badge: 'Trending'
    },
    subcategories: [
      {
        title: 'Dining Sets',
        items: ['6-Seater Dining Sets', '4-Seater Compact Sets', '8-Seater Grand Banquet', 'Dining Tables Only']
      },
      {
        title: 'Dining Storage & Bar',
        items: ['Crockery Units', 'Sideboards & Buffets', 'Bar Cabinets', 'Bar Stools']
      }
    ]
  },
  {
    id: 'storage',
    label: 'Storage',
    href: '#products',
    subcategories: [
      {
        title: 'Display & Books',
        items: ['Tall Bookshelves', 'Wall Display Racks', 'Curio Cabinets']
      },
      {
        title: 'Entryway & Utility',
        items: ['Shoe Storage Units', 'Console Tables', 'Solid Wood Trunks']
      }
    ]
  },
  {
    id: 'study',
    label: 'Study & Office',
    href: '#products',
    subcategories: [
      {
        title: 'Study Workstations',
        items: ['Solid Wood Study Desks', 'Executive Computer Tables', 'Corner Desks with Drawers']
      },
      {
        title: 'Ergonomic & Chairs',
        items: ['Artisan Wooden Chairs', 'Ergonomic High-Back Chairs', 'Study Bookshelves']
      }
    ]
  },
  {
    id: 'hardwood',
    label: 'Solid Hardwood',
    href: '#why-us',
    badge: '100% PURE',
    subcategories: [
      {
        title: 'Wood Species Selection',
        items: ['Burma & CP Teak Wood', 'Indian Sheesham (Rosewood)', 'Seasoned Mango Wood', 'Custom Hardwood Stains']
      },
      {
        title: 'Bespoke Services',
        items: ['Made-to-Order Custom Sizing', 'Wood Finish Matching (Honey, Walnut, Teak)', 'Architect & Designer Collaboration']
      }
    ]
  },
  {
    id: 'sale',
    label: '🔥 Festive Sale',
    href: '#products',
    highlight: true,
    badge: 'FLAT 50% OFF'
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [wishlistCount] = useState(3)
  const searchRef = useRef<HTMLDivElement>(null)

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Rotating placeholder
  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SEARCH_PLACEHOLDERS.length)
    }, 3200)
    return () => clearInterval(timer)
  }, [])

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filter products based on search
  const filteredSearch = searchQuery.trim() === ''
    ? SAMPLE_SEARCH_PRODUCTS.slice(0, 4)
    : SAMPLE_SEARCH_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )

  const handleProductSelect = () => {
    setSearchFocused(false)
    setSearchQuery('')
    window.location.hash = '#products'
  }

  return (
    <header className={styles.headerWrap}>
      {/* ─── Top Utility Announcement Bar (Wooden Street style) ─── */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topInner}`}>
          <div className={styles.topLeft}>
            <span className={styles.storeBadge}>
              <MapPin size={13} className={styles.pinIcon} />
              <span>9+ Experience Centers in Tamil Nadu</span>
            </span>
            <span className={styles.topSep}>•</span>
            <span className={styles.truckBadge}>
              <Truck size={13} />
              <span>Free Delivery & Assembly</span>
            </span>
          </div>

          <div className={styles.topCenter}>
            <span className={styles.promoTicker}>
              <Sparkles size={13} className={styles.sparkleIcon} />
              <span><strong>Festive Sale:</strong> Up to 50% Off Solid Teak + Extra 10% with code <strong>MMSIVA</strong></span>
            </span>
          </div>

          <div className={styles.topRight}>
            <a href="tel:+919999999999" className={styles.phoneLink}>
              <Phone size={13} />
              <span>+91 99999 99999</span>
            </a>
            <span className={styles.topSep}>|</span>
            <a href="#showroom" className={styles.topLink}>Store Locator</a>
            <span className={styles.topSep}>|</span>
            <a href="#contact" className={styles.consultationLink}>
              <Calendar size={13} />
              <span>Book Showroom Visit</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── Main Header ─── */}
      <div className={`${styles.mainHeader} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.mainInner}`}>
          {/* Brand Logo */}
          <Link href="/" className={styles.logo} id="nav-logo">
            <div className={styles.logoBadge}>
              <span className={styles.logoWoodIcon}>🪵</span>
              <div className={styles.logoTextWrap}>
                <span className={styles.logoMain}>MM SIVA</span>
                <span className={styles.logoTagline}>FINE SOLID WOOD FURNITURE</span>
              </div>
            </div>
          </Link>

          {/* Predictive Omnisearch Bar */}
          <div className={styles.searchContainer} ref={searchRef}>
            <div className={`${styles.searchBox} ${searchFocused ? styles.searchBoxActive : ''}`}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                placeholder={SEARCH_PLACEHOLDERS[placeholderIndex]}
                id="main-omnisearch"
              />
              {searchQuery && (
                <button 
                  className={styles.searchClear} 
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
              <button 
                className={styles.searchSubmit} 
                onClick={handleProductSelect}
                aria-label="Search"
              >
                Search
              </button>
            </div>

            {/* Live Autocomplete Dropdown */}
            {searchFocused && (
              <div className={styles.searchDropdown}>
                <div className={styles.searchDropdownHead}>
                  <span>{searchQuery ? 'Matching Products' : 'Trending Furniture Searches'}</span>
                  <span className={styles.searchHint}>Press ESC to close</span>
                </div>

                {!searchQuery && (
                  <div className={styles.trendingTags}>
                    {['Solid Teak Sofas', 'King Storage Bed', '6-Seater Dining', 'Hydraulic Bed', 'Cane Chairs', 'Coffee Tables'].map((tag) => (
                      <button
                        key={tag}
                        className={styles.tagPill}
                        onClick={() => {
                          setSearchQuery(tag)
                          setSearchFocused(true)
                        }}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}

                <div className={styles.searchResultsList}>
                  {filteredSearch.map((prod) => (
                    <div 
                      key={prod.id} 
                      className={styles.searchResultItem}
                      onClick={handleProductSelect}
                    >
                      <img src={prod.image} alt={prod.name} className={styles.searchResultImg} />
                      <div className={styles.searchResultInfo}>
                        <h4 className={styles.searchResultName}>{prod.name}</h4>
                        <div className={styles.searchResultMeta}>
                          <span className={styles.searchResultCat}>{prod.category}</span>
                          <span className={styles.searchResultPrice}>{prod.price}</span>
                          <span className={styles.searchResultMrp}>{prod.mrp}</span>
                          <span className={styles.searchResultDiscount}>{prod.discount}</span>
                        </div>
                      </div>
                      <ArrowRight size={16} className={styles.searchResultArrow} />
                    </div>
                  ))}
                </div>

                <div className={styles.searchDropdownFooter}>
                  <a href="#products" onClick={() => setSearchFocused(false)} className={styles.viewAllResults}>
                    Explore All Wooden Street Grade Furniture →
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Action Icons Cluster */}
          <div className={styles.actionCluster}>
            <a href="#showroom" className={styles.actionItem} title="Find Experience Stores">
              <MapPin size={20} className={styles.actionIcon} />
              <span className={styles.actionLabel}>Stores</span>
            </a>

            <a href="#products" className={styles.actionItem} title="Wishlist">
              <div className={styles.iconWithBadge}>
                <Heart size={20} className={styles.actionIcon} />
                <span className={styles.badgeCount}>{wishlistCount}</span>
              </div>
              <span className={styles.actionLabel}>Wishlist</span>
            </a>

            <a 
              href="https://wa.me/919999999999?text=Hi, I want a free catalog and quote for MM Siva Furniture" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.whatsappAction}
              title="Chat with Furniture Specialist"
            >
              <div className={styles.whatsappIconCircle}>
                <MessageCircle size={18} />
              </div>
              <div className={styles.whatsappText}>
                <span className={styles.whatsappTitle}>WhatsApp</span>
                <span className={styles.whatsappStatus}>Online</span>
              </div>
            </a>

            <a href="#contact" className="btn btn-primary btn-sm" id="nav-quote-btn">
              Get Quote
            </a>

            {/* Mobile Hamburger */}
            <button 
              className={styles.mobileHamburger}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* ─── Mega Menu Category Bar ─── */}
      <nav className={styles.categoryNav}>
        <div className={`container ${styles.categoryInner}`}>
          {CATEGORIES.map((cat) => {
            const hasSub = cat.subcategories && cat.subcategories.length > 0
            return (
              <div 
                key={cat.id} 
                className={styles.catItemWrapper}
                onMouseEnter={() => hasSub && setActiveMegaMenu(cat.id)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <a 
                  href={cat.href}
                  className={`${styles.categoryLink} ${cat.highlight ? styles.categoryLinkHighlight : ''}`}
                >
                  <span>{cat.label}</span>
                  {cat.badge && (
                    <span className={`${styles.catBadge} ${cat.highlight ? styles.catBadgeSale : ''}`}>
                      {cat.badge}
                    </span>
                  )}
                  {hasSub && <ChevronDown size={14} className={styles.catChevron} />}
                </a>

                {/* Mega Menu Dropdown */}
                {hasSub && activeMegaMenu === cat.id && (
                  <div className={styles.megaMenuDropdown}>
                    <div className={styles.megaMenuGrid}>
                      {cat.subcategories!.map((sub, idx) => (
                        <div key={idx} className={styles.megaCol}>
                          <h4 className={styles.megaColTitle}>{sub.title}</h4>
                          <ul className={styles.megaColList}>
                            {sub.items.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                <a 
                                  href="#products" 
                                  className={styles.megaSubLink}
                                  onClick={() => setActiveMegaMenu(null)}
                                >
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      {/* Featured Promotion Card inside Mega Menu */}
                      {cat.featured && (
                        <div className={styles.megaFeaturedCol}>
                          <div className={styles.megaFeaturedCard}>
                            <img src={cat.featured.image} alt={cat.featured.title} className={styles.megaFeaturedImg} />
                            <div className={styles.megaFeaturedContent}>
                              <span className={styles.megaFeaturedBadge}>{cat.featured.badge}</span>
                              <h5 className={styles.megaFeaturedTitle}>{cat.featured.title}</h5>
                              <p className={styles.megaFeaturedDesc}>{cat.featured.desc}</p>
                              <a href="#products" className={styles.megaFeaturedCta} onClick={() => setActiveMegaMenu(null)}>
                                Shop Collection →
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </nav>

      {/* ─── Mobile Drawer Menu ─── */}
      {menuOpen && (
        <div className={styles.mobileOverlay} onClick={() => setMenuOpen(false)}>
          <div className={styles.mobileDrawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.mobileDrawerHead}>
              <div className={styles.mobileLogo}>
                <span className={styles.logoMain}>MM SIVA</span>
                <span className={styles.logoTagline}>FURNITURE</span>
              </div>
              <button 
                className={styles.mobileDrawerClose} 
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.mobileSearchWrap}>
              <input 
                type="text" 
                placeholder="Search sofas, beds, dining..."
                className={styles.mobileSearchInput}
                onClick={() => {
                  setMenuOpen(false)
                  window.location.hash = '#products'
                }}
              />
            </div>

            <div className={styles.mobileDrawerNav}>
              <div className={styles.mobileSectionTitle}>Categories</div>
              {CATEGORIES.map((cat) => (
                <a 
                  key={cat.id} 
                  href={cat.href}
                  className={`${styles.mobileNavLink} ${cat.highlight ? styles.mobileNavHighlight : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{cat.label}</span>
                  {cat.badge && <span className={styles.mobileNavBadge}>{cat.badge}</span>}
                </a>
              ))}

              <hr className={styles.mobileDivider} />
              <div className={styles.mobileSectionTitle}>Explore MM Siva</div>
              <a href="#showroom" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
                🏬 Experience Showrooms (Chennai & TN)
              </a>
              <a href="#why-us" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
                🌲 The Solid Wood Difference
              </a>
              <a href="#testimonials" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
                ⭐ Customer Reviews (4.9/5)
              </a>
              <a href="#about" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
                📜 25 Years of Heritage (Est. 1998)
              </a>
              <a href="#contact" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
                📍 Contact & Showroom Visit
              </a>

              <div className={styles.mobileCtaBox}>
                <a 
                  href="https://wa.me/919999999999?text=Hi, I would like to consult with a wood furniture specialist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileWhatsappBtn}
                >
                  <MessageCircle size={18} />
                  <span>Chat on WhatsApp</span>
                </a>
                <a href="tel:+919999999999" className={styles.mobileCallBtn}>
                  <Phone size={16} />
                  <span>Call +91 99999 99999</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}