export interface Visibility {
  homeAddress: boolean;
  dateOfBirth: boolean;
  education: boolean;
  workHistory: boolean;
  phoneNumber: boolean;
}

export interface BasicInfo {
  firstName: string;
  lastName: string;
  email: string;
  homeAddress: string;
  phoneNumber: string;
  dateOfBirth: string;
}

export interface SocialLinks {
  x: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  tiktok: string;
}

// Nama disesuaikan dengan kontrak (ProfesionalInfo)
export interface ProfesionalInfo {
  jobTitle: string;
  info: string;
  education: string;
  workHistory: string;
  skills: string[];
  imageURL: string;
}

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  homeAddress: string;
  phoneNumber: string;
  dateOfBirth: string;

  workHistory: string;

  x: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  tiktok: string;

  jobTitle: string;
  education: string;
  info: string;
  skills: string[];
  imageURL: string;

  exists: boolean;
  appliedJobs: bigint[]; // sesuaikan jika memakai BigNumber/string
  visibility: Visibility;
}
