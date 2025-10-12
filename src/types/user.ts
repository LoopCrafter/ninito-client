export type genderType = "male" | "female" | "prefer_not_to_say";
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
  userImage?: string;
  phone: string;
  gender: genderType;
}
