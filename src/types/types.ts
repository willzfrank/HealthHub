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

export interface Gender {
  id: number
  name: string
}

export interface Doctor {
  id: number
  name: string
  email: string
  hospital: string
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
export interface PatientRegistrationData {
  facility_id: string
  marital_status_id: string
  title_id: string
  rin?: string
  gender_id: string
  occupation_id: string
  religion_id: string
  educational_level_id: string
  language_id: string
  citizenship_id: string
  country_id: string
  state_id: string
  lga_id: string
  city_id: string
  nok_country_id: string
  nok_state_id: string
  nok_lga_id: string
  nok_relationship_id: string
  first_name: string
  middle_name?: string
  last_name: string
  date_of_birth: string
  email?: string
  phone: string
  address: string
  nearest_bus_stop?: string
  nok_first_name: string
  nok_middle_name?: string
  nok_last_name: string
  nok_phone: string
  nok_address: string
}

export interface IInvoice {
  id: number
  invoice_number: string
  invoice_date: string
  patient_name: string
  description: string
  total: number
  amount_due: number
  amount_paid: number
  payment_status: number
  request_reference: string
  year: number
  payment_url: string
  email: string
  phone: string
}

export interface IBillData {
  name: string
  purchase_price: string
  selling_price: string
}
