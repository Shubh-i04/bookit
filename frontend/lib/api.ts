import axios from 'axios'

// When deployed behind rewrites, leave NEXT_PUBLIC_API_URL blank to use same-origin paths.
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

export interface Experience {
  id: number
  title: string
  shortDescription: string
  description: string
  image: string
  price: number
  availableSlots: string[]
  createdAt: string
  updatedAt: string
  availableDates?: string[]
  availableTimes?: { time: string; left?: number; soldOut?: boolean }[]
}

export interface PromoValidation {
  valid: boolean
  type?: string
  value?: number
  message?: string
}

export interface BookingRequest {
  experienceId: number
  userName: string
  email: string
  slotDate: string
  promoCode?: string
}

export interface BookingResponse {
  id: number
  message: string
}

export const api = {
  // Get all experiences
  getExperiences: async (): Promise<Experience[]> => {
    const response = await axios.get(`${API_URL}/experiences`)
    return response.data
  },

  // Get single experience by ID
  getExperience: async (id: number | string): Promise<Experience> => {
    const response = await axios.get(`${API_URL}/experiences/${id}`)
    return response.data
  },

  // Validate promo code
  validatePromo: async (code: string): Promise<PromoValidation> => {
    try {
      const response = await axios.post(`${API_URL}/promo/validate`, { code })
      return response.data
    } catch (error) {
      /*if (error.response?.status === 404) {
        return { valid: false, message: 'Invalid promo code' }
      }*/
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return { valid: false, message: 'Invalid promo code' }
      }
      throw error
    }
  },

  // Create booking
  createBooking: async (booking: BookingRequest): Promise<BookingResponse> => {
    const response = await axios.post(`${API_URL}/bookings`, booking)
    return response.data
  }
}
