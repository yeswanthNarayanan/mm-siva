'use client'
import { useState, useEffect, useMemo } from 'react'
import { 
  Sparkles, 
  X, 
  Check, 
  ShieldCheck, 
  Truck, 
  TreePine, 
  Star,
  MessageCircle,
  FileText,
  ArrowRight,
  SlidersHorizontal,
  Compass
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import ProductCard from '@/components/ProductCard/ProductCard'
import LeadForm from '@/components/LeadForm/LeadForm'
import type { ProductWithImages } from '@/lib/types'
import styles from './ProductsSection.module.css'

const CATEGORY_TABS = [
  { label: 'All Curated Samples', value: 'All' },
  { label: 'Sofas & Living', value: 'Sofa' },
  { label: 'Beds & Bedroom', value: 'Bed' },
  { label: 'Dining Sets', value: 'Dining Table' },
  { label: 'Wardrobes', value: 'Wardrobe' },
  { label: 'Accent Chairs', value: 'Chair' },
  { label: 'Study & Work', value: 'Study Table' },
  { label: 'Living Storage', value: 'Storage' },
]

const DEMO_PRODUCTS: ProductWithImages[] = [
  {
    id: 'demo-1',
    name: 'Royal Teak Wood 5-Seater Sofa Set (3+1+1)',
    description: 'Bespoke hand-carved solid teak frame with high-resilience foam and stain-resistant velvet fabric upholstery.',
    category: 'Sofa',
    material: 'Burma Teak Wood',
    dimensions: '84 x 34 x 36 inches',
    price_range: '₹45,999',
    mrp: '₹79,999',
    discount: '42% OFF',
    rating: 4.9,
    reviews_count: 142,
    finishes: ['Teak Finish', 'Honey Finish', 'Walnut Finish'],
    tag: 'Flagship Sofa',
    in_stock: true,
    warranty: '10-Year Structural Warranty',
    featured: true,
    is_active: true,
    created_at: '',
    product_images: [
      { id: '1', product_id: 'demo-1', image_url: '/images/products/sofa.png', image_source: 'upload', display_order: 0, is_primary: true, created_at: '' }
    ]
  },
  {
    id: 'demo-2',
    name: 'Sheesham Wood King Size Bed with Hydraulic Storage',
    description: 'Engineered with 100% kiln-dried Indian Sheesham wood and German heavy-duty hydraulic gas lift mechanisms for effortless storage access.',
    category: 'Bed',
    material: 'Seasoned Sheesham Wood',
    dimensions: '78 x 72 x 44 inches',
    price_range: '₹38,999',
    mrp: '₹64,999',
    discount: '40% OFF',
    rating: 4.8,
    reviews_count: 98,
    finishes: ['Honey Finish', 'Walnut Finish', 'Teak Finish'],
    tag: 'Flagship Bed',
    in_stock: true,
    warranty: '10-Year Warranty',
    featured: true,
    is_active: true,
    created_at: '',
    product_images: [
      { id: '2', product_id: 'demo-2', image_url: '/images/products/bed.png', image_source: 'upload', display_order: 0, is_primary: true, created_at: '' }
    ]
  },
  {
    id: 'demo-3',
    name: 'Premium 6-Seater Solid Wood Dining Table Set',
    description: 'Substantial solid mango and teak wood dining table with 6 ergonomically cushioned comfort chairs. Scratch-resistant matte PU lacquer finish.',
    category: 'Dining Table',
    material: 'Solid Mango & Teak',
    dimensions: '72 x 36 x 30 inches',
    price_range: '₹42,999',
    mrp: '₹74,999',
    discount: '43% OFF',
    rating: 4.9,
    reviews_count: 114,
    finishes: ['Teak Finish', 'Walnut Finish', 'Natural Finish'],
    tag: 'Flagship Dining',
    in_stock: true,
    warranty: '10-Year Warranty',
    featured: true,
    is_active: true,
    created_at: '',
    product_images: [
      { id: '3', product_id: 'demo-3', image_url: '/images/products/dining.png', image_source: 'upload', display_order: 0, is_primary: true, created_at: '' }
    ]
  },
  {
    id: 'demo-4',
    name: 'Solid Teak Wood 3-Door Wardrobe with Full Mirror',
    description: 'Spacious multi-compartment armoire with integrated hanging rod, internal lockable drawer, and full-length dressing mirror.',
    category: 'Wardrobe',
    material: 'Solid Teak Wood',
    dimensions: '72 x 22 x 78 inches',
    price_range: '₹35,999',
    mrp: '₹59,999',
    discount: '40% OFF',
    rating: 4.7,
    reviews_count: 67,
    finishes: ['Teak Finish', 'Walnut Finish'],
    tag: 'Flagship Wardrobe',
    in_stock: true,
    warranty: '10-Year Warranty',
    featured: false,
    is_active: true,
    created_at: '',
    product_images: [
      { id: '4', product_id: 'demo-4', image_url: '/images/products/wardrobe.png', image_source: 'upload', display_order: 0, is_primary: true, created_at: '' }
    ]
  },
  {
    id: 'demo-5',
    name: 'Handcrafted Cane Weave Accent Armchair',
    description: 'Artisan natural woven rattan cane backrest paired with a contoured solid teak frame and plush high-resilience cushion.',
    category: 'Chair',
    material: 'Teak Wood & Natural Cane',
    dimensions: '26 x 26 x 34 inches',
    price_range: '₹12,999',
    mrp: '₹22,999',
    discount: '43% OFF',
    rating: 4.9,
    reviews_count: 85,
    finishes: ['Honey Finish', 'Natural Finish', 'Teak Finish'],
    tag: 'Flagship Chair',
    in_stock: true,
    warranty: '5-Year Warranty',
    featured: true,
    is_active: true,
    created_at: '',
    product_images: [
      { id: '5', product_id: 'demo-5', image_url: '/images/products/chair.png', image_source: 'upload', display_order: 0, is_primary: true, created_at: '' }
    ]
  },
  {
    id: 'demo-6',
    name: 'Executive Solid Wood Study Table with Drawers',
    description: 'Ergonomically designed home office desk with smooth ball-bearing soft-close drawers and concealed wire management port.',
    category: 'Study Table',
    material: 'Solid Sheesham Wood',
    dimensions: '52 x 26 x 30 inches',
    price_range: '₹18,999',
    mrp: '₹32,999',
    discount: '42% OFF',
    rating: 4.8,
    reviews_count: 92,
    finishes: ['Honey Finish', 'Walnut Finish'],
    tag: 'Flagship Study',
    in_stock: true,
    warranty: '10-Year Warranty',
    featured: false,
    is_active: true,
    created_at: '',
    product_images: [
      { id: '6', product_id: 'demo-6', image_url: '/images/products/study.png', image_source: 'upload', display_order: 0, is_primary: true, created_at: '' }
    ]
  },
  {
    id: 'demo-7',
    name: 'Hand-Carved Walnut Coffee Table with Brass Inlay',
    description: 'Round center coffee table showcasing artisan hand-carvings along the apron and subtle brass motif inlays.',
    category: 'Storage',
    material: 'Walnut & Sheesham',
    dimensions: '36 x 36 x 18 inches',
    price_range: '₹14,999',
    mrp: '₹26,999',
    discount: '44% OFF',
    rating: 4.7,
    reviews_count: 53,
    finishes: ['Walnut Finish', 'Teak Finish'],
    tag: 'Flagship Coffee Table',
    in_stock: true,
    warranty: '5-Year Warranty',
    featured: false,
    is_active: true,
    created_at: '',
    product_images: [
      { id: '7', product_id: 'demo-7', image_url: '/images/products/coffee-table.png', image_source: 'upload', display_order: 0, is_primary: true, created_at: '' }
    ]
  }
]

export default function ProductsSection() {
  const [products, setProducts] = useState<ProductWithImages[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [enquireProduct, setEnquireProduct] = useState<ProductWithImages | null>(null)
  const [quickViewProduct, setQuickViewProduct] = useState<ProductWithImages | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const supabase = createClient()
        const { data } = await supabase
          .from('products')
          .select('*, product_images(*)')
          .eq('is_active', true)
          .order('featured', { ascending: false })
          .order('created_at', { ascending: false })
        if (data && data.length > 0) {
          setProducts(data as ProductWithImages[])
        } else {
          setProducts(DEMO_PRODUCTS)
        }
      } catch {
        setProducts(DEMO_PRODUCTS)
      }
      setLoading(false)
    }
    fetchProducts()
  }, [])

  // Show only 1 flagship sample per category in "All" view to prevent clutter!
  const processedProducts = useMemo(() => {
    if (activeCategory === 'All') {
      const coreCategories = ['Sofa', 'Bed', 'Dining Table', 'Wardrobe', 'Chair', 'Study Table']
      const samples: ProductWithImages[] = []
      
      coreCategories.forEach(cat => {
        const item = products.find(p => p.category === cat)
        if (item) samples.push(item)
      })

      // If still fewer than 6, add remaining without repeating
      if (samples.length < 6) {
        products.forEach(p => {
          if (!samples.find(s => s.id === p.id) && samples.length < 6) {
            samples.push(p)
          }
        })
      }
      return samples
    } else {
      // For a specific category, show the premier sample of that category
      return products.filter(p => p.category === activeCategory)
    }
  }, [products, activeCategory])

  return (
    <section id="products" className={styles.section}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <span className="section-label">
            <Sparkles size={13} />
            <span>Curated Workmanship Showcase</span>
          </span>
          <h2 className="section-title">Flagship Samples — One For Every Space</h2>
          <p className="section-subtitle">
            Rather than cluttering your view with hundreds of variants, we present one hand-selected master 
            sample for each room. Tap any piece to customize wood stains, dimensions, or request the full catalog.
          </p>
        </div>

        {/* Filter Tabs (Clean, elegant pills without noisy numbers) */}
        <div className={styles.controlsBar}>
          <div className={styles.tabGroup} role="tablist">
            {CATEGORY_TABS.map(tab => (
              <button
                key={tab.value}
                className={`${styles.tabBtn} ${activeCategory === tab.value ? styles.tabActive : ''}`}
                onClick={() => setActiveCategory(tab.value)}
                id={`tab-${tab.value.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className={styles.sampleStatusPill}>
            <Compass size={14} className={styles.compassIcon} />
            <span>Showing {processedProducts.length} Flagship Sample{processedProducts.length > 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Product Grid (Crisp 3x2 sample layout) */}
        {loading ? (
          <div className={styles.loadingGrid}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        ) : (
          <div className={styles.grid}>
            {processedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onEnquire={setEnquireProduct}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        )}

        {/* ─── Bottom Full-Catalog Prompt Box (Eliminates Homepage Clutter) ─── */}
        <div className={styles.catalogBanner}>
          <div className={styles.catalogLeft}>
            <div className={styles.catalogBadge}>150+ SOLID HARDWOOD DESIGNS IN STOCK</div>
            <h3 className={styles.catalogTitle}>Want to explore the complete collection?</h3>
            <p className={styles.catalogDesc}>
              We maintain an extensive archive of custom sizes, 8-seater dining suites, L-shaped sectionals, 
              and Pooja mandirs. Access our complete 2026 lookbook or discuss bespoke dimensions.
            </p>
          </div>

          <div className={styles.catalogActions}>
            <a
              href="https://wa.me/919999999999?text=Hi MM Siva, please share your complete 2026 Solid Wood Furniture Catalog (PDF) with pricing."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.waCatalogBtn}
            >
              <MessageCircle size={18} />
              <span>Get Full PDF Catalog on WhatsApp</span>
            </a>
            <a href="#contact" className={styles.customQuoteBtn}>
              <span>Request Custom Floorplan Sizing</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* ─── Quick View Modal ─── */}
      {quickViewProduct && (
        <div className={styles.modalBackdrop} onClick={() => setQuickViewProduct(null)}>
          <div className={styles.quickViewModal} onClick={e => e.stopPropagation()}>
            <button 
              className={styles.modalClose} 
              onClick={() => setQuickViewProduct(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className={styles.qvGrid}>
              <div className={styles.qvImageCol}>
                <img
                  src={quickViewProduct.product_images?.[0]?.image_url || '/images/products/sofa.png'}
                  alt={quickViewProduct.name}
                  className={styles.qvImage}
                />
                <div className={styles.qvPillars}>
                  <div className={styles.qvPillarItem}>
                    <TreePine size={16} />
                    <span>100% Solid Seasoned Wood</span>
                  </div>
                  <div className={styles.qvPillarItem}>
                    <Truck size={16} />
                    <span>Free White-Glove Setup</span>
                  </div>
                  <div className={styles.qvPillarItem}>
                    <ShieldCheck size={16} />
                    <span>10-Yr Structural Warranty</span>
                  </div>
                </div>
              </div>

              <div className={styles.qvContentCol}>
                <div className={styles.qvHeader}>
                  <span className={styles.qvCategory}>{quickViewProduct.category} Sample</span>
                  <div className={styles.qvRating}>
                    <Star size={14} fill="#F59E0B" color="#F59E0B" />
                    <span>{quickViewProduct.rating || 4.9} (120+ verified reviews)</span>
                  </div>
                  <h3 className={styles.qvTitle}>{quickViewProduct.name}</h3>
                </div>

                <div className={styles.qvPricing}>
                  <span className={styles.qvOfferPrice}>{quickViewProduct.price_range}</span>
                  <span className={styles.qvMrp}>{quickViewProduct.mrp || '₹74,999'}</span>
                  <span className={styles.qvDiscount}>{quickViewProduct.discount || '42% OFF'}</span>
                </div>

                <p className={styles.qvDesc}>{quickViewProduct.description}</p>

                <div className={styles.qvSpecsList}>
                  <div className={styles.qvSpecItem}>
                    <strong>Primary Timber:</strong>
                    <span>{quickViewProduct.material || 'Seasoned Hardwood'}</span>
                  </div>
                  {quickViewProduct.dimensions && (
                    <div className={styles.qvSpecItem}>
                      <strong>Dimensions:</strong>
                      <span>{quickViewProduct.dimensions}</span>
                    </div>
                  )}
                  <div className={styles.qvSpecItem}>
                    <strong>Available Finishes:</strong>
                    <span>Honey, Natural Teak, Walnut, Dark Mahogany</span>
                  </div>
                  <div className={styles.qvSpecItem}>
                    <strong>Delivery Timeline:</strong>
                    <span>Direct factory dispatch in 48-72 hours</span>
                  </div>
                </div>

                <div className={styles.qvActions}>
                  <button
                    className="btn btn-primary btn-lg"
                    style={{ flex: 1 }}
                    onClick={() => {
                      const prod = quickViewProduct
                      setQuickViewProduct(null)
                      setEnquireProduct(prod)
                    }}
                  >
                    Enquire / Custom Dimensions
                  </button>
                  <a
                    href={`https://wa.me/919999999999?text=Hi MM Siva, I need quick details for ${encodeURIComponent(quickViewProduct.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.qvWhatsappBtn}
                  >
                    <MessageCircle size={20} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Enquiry Lead Modal ─── */}
      {enquireProduct && (
        <div className={styles.modalBackdrop} onClick={() => setEnquireProduct(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setEnquireProduct(null)}
              id="modal-close-btn"
              aria-label="Close enquiry form"
            >
              <X size={20} />
            </button>
            <LeadForm
              productId={enquireProduct.id}
              productName={enquireProduct.name}
              onSuccess={() => setTimeout(() => setEnquireProduct(null), 2500)}
            />
          </div>
        </div>
      )}
    </section>
  )
}
