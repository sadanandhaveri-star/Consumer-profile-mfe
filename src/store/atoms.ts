import { atom } from 'jotai';

// ===== Types =====

export const ProfileStatus = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  EDITING: 'EDITING',
  SAVING: 'SAVING',
  ERROR: 'ERROR',
} as const;

export type ProfileStatus = (typeof ProfileStatus)[keyof typeof ProfileStatus];

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  bio: string;
  avatarUrl: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

// ===== User Profile Atoms =====

export const profileAtom = atom<UserProfile | null>(null);
export const originalProfileAtom = atom<UserProfile | null>(null);
export const profileStatusAtom = atom<ProfileStatus>(ProfileStatus.IDLE);
export const isEditingAtom = atom(false);
export const isSavingAtom = atom(false);
export const validationErrorsAtom = atom<ValidationError[]>([]);
export const profileErrorAtom = atom<string | null>(null);
export const lastSavedAtAtom = atom<string | null>(null);

// Derived atom - display name
export const userDisplayNameAtom = atom((get) => {
  const profile = get(profileAtom);
  if (!profile) return 'Anonymous User';
  return `${profile.firstName} ${profile.lastName}`.trim() || 'Anonymous User';
});

// ===== Theme Atoms =====
export const themeAtom = atom<'light' | 'dark'>('light');
