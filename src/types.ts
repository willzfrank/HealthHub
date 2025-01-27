export interface User {
  id: number
  first_name: string
  last_name: string
  middle_name: string | null
  facility_id: number | null
  email: string
  phone: string | null
  last_login: string
  login_count: number
  active: number
  facility_name: string | null
}

export interface Role {
  id: number
  slug: string
  name: string
}

export interface AuthState {
  isAuthenticated: boolean
  accessToken: string | null
  tokenType: string | null
  expiresAt: string | null
  user: User | null
  role: Role | null
  facility: any | null
  environment: string | null
}
