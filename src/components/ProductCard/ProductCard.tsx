'use client'
import { useState } from 'react'
import Link from 'next/link'
import { 
  Heart, 
  Star, 
  Truck, 
  ShieldCheck, 
  MessageCircle, 
  Eye, 
  Ruler, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { getImageUrl } from '@/lib/gdrive'
import type { ProductWithImages } from '@/lib/types'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  product: ProductWithImages
  onEnquire?: (product: ProductWithImages) => void
  onQuickView?: (product: ProductWithImages) => void
}

// Swatch color definitions
const FINISH_COLORS: Record<string, string> = {
  'Honey Finish': '#B46A31',
  'Teak Finish': '#8B4513',
  'Walnut Finish': '#4A2E1B',
  'Natural Finish': '#D4A373',
  'Mahogany Finish': '#3F1A13',
}

export default function ProductCard({ product, onEnquire, onQuickView }: ProductCardProps) {
  const [imgIdx, setImgIdx] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedFinish, setSelectedFinish] = useState(
    product.finishes && product.finishes.length > 0 ? product.finishes[0] : 'Teak Finish'
  )

  const images = (product.product_images || []).sort((a, b) => a.display_order - b.display_order)
  const currentImg = images[imgIdx] || images[0]

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setImgIdx((imgIdx + 1) % images.length)
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setImgIdx(imgIdx === 0 ? images.length - 1 : imgIdx - 1)
  }

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  const defaultFinishes = product.finishes || ['Honey Finish', 'Teak Finish', 'Walnut Finish']
  const rating = product.rating || 4.8
  const reviewsCount = product.reviews_count || 86
  const mrp = product.mrp || '₹69,999'
  const discount = product.discount || '38% OFF'
  const price = product.price_range || '₹42,999'

  return (
    <div className={styles.card} id={`product-${product.id}`}>
      {/* ─── Image Container ─── */}
      <div className={styles.imageWrap}>
        {currentImg ? (
          <img
            src={getImageUrl(currentImg.image_url, currentImg.image_source)}
            alt={product.name}
            className={styles.img}
            loading="lazy"
          />
        ) : (
          <div className={styles.noImage}>
            <span>🪵</span>
            <p>Solid Wood Craftsmanship</p>
          </div>
        )}

        {/* Quality / Promotional Badges */}
        <div className={styles.badgeTopLeft}>
          {product.tag ? (
            <span className={styles.badgeBestseller}>★ {product.tag}</span>
          ) : product.featured ? (
            <span className={styles.badgeBestseller}>★ Bestseller</span>
          ) : null}
          {product.material && (
            <span className={styles.badgeMaterial}>{product.material}</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlistActive : ''}`}
          onClick={toggleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          title="Save to Wishlist"
        >
          <Heart size={18} fill={isWishlisted ? '#DC2626' : 'transparent'} color={isWishlisted ? '#DC2626' : '#4B5563'} />
        </button>

        {/* Quick View Button */}
        <button
          className={styles.quickViewBtn}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onQuickView?.(product)
          }}
          title="Quick View Details"
        >
          <Eye size={15} />
          <span>Quick View</span>
        </button>

        {/* Discount Sticker */}
        {discount && (
          <span className={styles.discountBadge}>{discount}</span>
        )}

        {/* Image Nav Arrows (if multiple images) */}
        {images.length > 1 && (
          <>
            <button className={`${styles.imgArrow} ${styles.imgArrowLeft}`} onClick={handlePrev} aria-label="Previous image">
              <ChevronLeft size={16} />
            </button>
            <button className={`${styles.imgArrow} ${styles.imgArrowRight}`} onClick={handleNext} aria-label="Next image">
              <ChevronRight size={16} />
            </button>
            <div className={styles.imgDots}>
              {images.map((_, i) => (
                <span key={i} className={`${styles.imgDot} ${i === imgIdx ? styles.imgDotActive : ''}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ─── Card Body ─── */}
      <div className={styles.body}>
        {/* Rating & In-Stock Row */}
        <div className={styles.ratingRow}>
          <div className={styles.starsWrap}>
            <Star size={13} className={styles.starIcon} fill="#F59E0B" />
            <span className={styles.ratingVal}>{rating}</span>
            <span className={styles.ratingCount}>({reviewsCount})</span>
          </div>
          <span className={styles.inStockTag}>
            <CheckCircle2 size={11} className={styles.stockIcon} />
            <span>In Stock</span>
          </span>
        </div>

        {/* Product Title */}
        <h3 className={styles.name} title={product.name}>
          {product.name}
        </h3>

        {/* Wood Finish Swatches */}
        <div className={styles.swatchSection}>
          <span className={styles.swatchLabel}>Finish:</span>
          <div className={styles.swatchList}>
            {defaultFinishes.map((finish) => {
              const bg = FINISH_COLORS[finish] || '#8B4513'
              return (
                <button
                  key={finish}
                  className={`${styles.swatchDot} ${selectedFinish === finish ? styles.swatchActive : ''}`}
                  style={{ backgroundColor: bg }}
                  onClick={(e) => {
                    e.preventDefault()
                    setSelectedFinish(finish)
                  }}
                  title={finish}
                  aria-label={finish}
                />
              )
            })}
          </div>
          <span className={styles.selectedFinishName}>{selectedFinish.replace(' Finish', '')}</span>
        </div>

        {/* Dimensions Snippet */}
        {product.dimensions && (
          <div className={styles.dimensionsRow}>
            <Ruler size={13} className={styles.dimIcon} />
            <span>{product.dimensions}</span>
          </div>
        )}

        {/* Pricing Matrix */}
        <div className={styles.priceRow}>
          <div className={styles.priceBlock}>
            <span className={styles.offerPrice}>{price}</span>
            {mrp && <span className={styles.mrpPrice}>{mrp}</span>}
          </div>
          <span className={styles.emiPill}>EMI from ₹1,499</span>
        </div>

        {/* Delivery Guarantee Pill */}
        <div className={styles.deliveryBadge}>
          <Truck size={13} className={styles.truckIcon} />
          <span>Free Assembly & Delivery in 3-5 Days</span>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button
            className={styles.enquireBtn}
            onClick={() => onEnquire?.(product)}
            id={`enquire-${product.id}`}
          >
            Enquire / Custom
          </button>
          <a
            href={`https://wa.me/919999999999?text=Hi MM Siva, I am interested in ${encodeURIComponent(product.name)} with ${encodeURIComponent(selectedFinish)}. Please share best discount & details.`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappBtn}
            id={`wa-${product.id}`}
            title="Instant WhatsApp Assistance"
          >
            <MessageCircle size={18} />
          </a>
        </div>
      </div>
    </div>
  )
}
