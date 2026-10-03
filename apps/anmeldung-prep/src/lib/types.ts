export type City = 'berlin' | 'munich' | 'hamburg' | 'frankfurt' | 'cologne' | 'other';
export type ResidenceType = 'own_apartment' | 'wg_sublet' | 'dormitory' | 'host_family';
export type CivilStatus = 'single' | 'married' | 'student' | 'employed';

export interface ChecklistItem {
  id: string;
  title: string;
  germanTerm: string;
  required: boolean;
  category: 'identity' | 'housing' | 'family' | 'appointment';
  description: string;
  criticalTips: string;
  downloadUrl?: string;
}

export interface MaskRect {
  x: number;
  y: number;
  width: number;
  height: number;
}
