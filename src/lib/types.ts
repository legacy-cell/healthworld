export interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  imageUrl?: string;
  link?: string; // For external articles
  content?: string; // For internal articles
  keywords?: string[];
}

export interface SymptomLog {
  id: string;
  date: string; // ISO string format
  symptoms: string;
  severity: number; // e.g., 1-10 or 1-5 scale
  notes?: string;
}

export interface AISymptomCheckerOutput {
  possibleConditions: string[];
  reasoning: string;
  disclaimer: string;
}

export interface Prescription {
  id: string;
  dateIssued: string; // ISO string format
  medicationName: string;
  dosage: string;
  frequency: string;
  doctorName: string;
  notes?: string;
}

export interface ClientProfile {
  id: string; // Using 'currentUserProfile' as a fixed ID for localStorage
  fullName?: string;
  dateOfBirth?: string; // Store as ISO string for consistency, format for display
  contactNumber?: string;
  address?: string;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
  // Add more fields as needed, e.g., allergies, bloodType
}
