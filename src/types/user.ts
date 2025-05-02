export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  taxId: string;
  address: string;
  postalCode: string;
  city: string;
  province: string;
  birthCity: string;
  birthProvince: string;
  signature?: string;
}

export interface PasswordChange {
  currentPassword: string;
  confirmPassword: string;
  newPassword: string;
} 