export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  image?: string;
  mobile: string;
  gender: string;
}
