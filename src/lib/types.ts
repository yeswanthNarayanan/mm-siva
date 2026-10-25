export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          category: string | null
          price_range: string | null
          material: string | null
          dimensions?: string | null
          mrp?: string | null
          discount?: string | null
          rating?: number | null
          reviews_count?: number | null
          finishes?: string[] | null
          tag?: string | null
          in_stock?: boolean | null
          warranty?: string | null
          featured: boolean
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category?: string | null
          price_range?: string | null
          material?: string | null
          dimensions?: string | null
          mrp?: string | null
          discount?: string | null
          rating?: number | null
          reviews_count?: number | null
          finishes?: string[] | null
          tag?: string | null
          in_stock?: boolean | null
          warranty?: string | null
          featured?: boolean
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: string | null
          price_range?: string | null
          material?: string | null
          dimensions?: string | null
          mrp?: string | null
          discount?: string | null
          rating?: number | null
          reviews_count?: number | null
          finishes?: string[] | null
          tag?: string | null
          in_stock?: boolean | null
          warranty?: string | null
          featured?: boolean
          is_active?: boolean
          created_at?: string
        }
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          image_url: string
          image_source: string
          is_primary: boolean
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          image_url: string
          image_source?: string
          is_primary?: boolean
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          image_url?: string
          image_source?: string
          is_primary?: boolean
          display_order?: number
          created_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          product_id: string | null
          product_name: string | null
          name: string
          phone: string
          email: string | null
          message: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          product_id?: string | null
          product_name?: string | null
          name: string
          phone: string
          email?: string | null
          message?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string | null
          product_name?: string | null
          name?: string
          phone?: string
          email?: string | null
          message?: string | null
          status?: string
          created_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          customer_name: string
          review: string
          rating: number
          product_name: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          customer_name: string
          review: string
          rating?: number
          product_name?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          customer_name?: string
          review?: string
          rating?: number
          product_name?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
    }
  }
}

export type Product = Database['public']['Tables']['products']['Row']
export type ProductImage = Database['public']['Tables']['product_images']['Row']
export type Lead = Database['public']['Tables']['leads']['Row']
export type Testimonial = Database['public']['Tables']['testimonials']['Row']

export type ProductWithImages = Product & {
  product_images: ProductImage[]
}
