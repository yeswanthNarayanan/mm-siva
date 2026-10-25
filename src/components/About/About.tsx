'use client'
import { Award, Hammer, TreePine, Sparkles, Check, ArrowRight } from 'lucide-react'
import styles from './About.module.css'

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Visual Storytelling */}
          <div className={styles.imageCol}>
            <div className={styles.imageCard}>
              <img 
                src="/hero.png" 
                alt="MM Siva Master Wood Artisans at Work" 
                className={styles.aboutImg} 
              />
              <div className={styles.estBadge}>
                <span className={styles.estYear}>1998</span>
                <span className={styles.estLabel}>ESTABLISHED IN TAMIL NADU</span>
              </div>
            </div>

            {/* Quick Stats Grid under image */}
            <div className={styles.statsGrid}>
              <div className={styles.statBox}>
                <span className={styles.statNum}>25+</span>
                <span className={styles.statText}>Years of Wood Mastery</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statNum}>50+</span>
                <span className={styles.statText}>Master Artisans & Fitters</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statNum}>10,000+</span>
                <span className={styles.statText}>Homes Furnished</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Heritage Content */}
          <div className={styles.contentCol}>
            <span className="section-label">
              <Sparkles size={13} />
              <span>Our Heritage & Atelier</span>
            </span>
            <h2 className={styles.heading}>
              Crafting Generational Furniture With Integrity Since 1998
            </h2>
            <div className={styles.headingDivider} />

            <p className={styles.leadPara}>
              MM Siva was founded with one unrelenting commitment: to bring true, uncompromised solid hardwood furniture 
              into Indian homes — free from cheap particle boards, synthetic fillers, or showroom markups.
            </p>

            <p className={styles.bodyPara}>
              From our timber seasoning yards in Tamil Nadu, our master woodcarvers hand-select sustainably harvested 
              Burma and Indian Teak, heavy-density Sheesham, and golden Mango wood. Each timber plank is kiln-seasoned for 
              weeks, shaped with time-tested mortise-and-tenon interlocking joinery, and buffed with multi-coat Italian lacquers.
            </p>

            {/* Value checklist */}
            <div className={styles.valuesList}>
              <div className={styles.valueItem}>
                <div className={styles.valueIcon}><TreePine size={18} /></div>
                <div>
                  <h4 className={styles.valueTitle}>Sustainably Harvested Hardwood</h4>
                  <p className={styles.valueDesc}>100% ethically sourced timbers from certified plantations.</p>
                </div>
              </div>

              <div className={styles.valueItem}>
                <div className={styles.valueIcon}><Hammer size={18} /></div>
                <div>
                  <h4 className={styles.valueTitle}>Bespoke Floorplan Customization</h4>
                  <p className={styles.valueDesc}>Custom dimensions, storage drawers, and wood stain adjustments.</p>
                </div>
              </div>

              <div className={styles.valueItem}>
                <div className={styles.valueIcon}><Award size={18} /></div>
                <div>
                  <h4 className={styles.valueTitle}>Direct Factory Warranty</h4>
                  <p className={styles.valueDesc}>Every purchase backed by our 10-year structural integrity guarantee.</p>
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <a href="#contact" className="btn btn-primary btn-lg" id="about-consultation-btn">
                <span>Book Free Design Consultation</span>
                <ArrowRight size={16} />
              </a>
              <a href="#products" className="btn btn-outline btn-lg" id="about-catalog-btn">
                View All Collections
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
