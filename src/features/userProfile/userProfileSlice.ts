import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Types
export enum ProfileStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  EDITING = 'EDITING',
  SAVING = 'SAVING',
  ERROR = 'ERROR',
}

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

export interface UserProfileState {
  status: ProfileStatus;
  profile: UserProfile | null;
  originalProfile: UserProfile | null;
  isEditing: boolean;
  isSaving: boolean;
  validationErrors: ValidationError[];
  error: string | null;
  lastSavedAt: string | null;
}

// Initial state
const initialState: UserProfileState = {
  status: ProfileStatus.IDLE,
  profile: null,
  originalProfile: null,
  isEditing: false,
  isSaving: false,
  validationErrors: [],
  error: null,
  lastSavedAt: null,
};

// Async thunks
export const fetchUserProfile = createAsyncThunk(
  'userProfile/fetchProfile',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      const data = await response.json();
      return data as UserProfile;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const saveUserProfile = createAsyncThunk(
  'userProfile/saveProfile',
  async (profile: UserProfile, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/${profile.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });
      if (!response.ok) {
        throw new Error('Failed to save user profile');
      }
      const data = await response.json();
      return data as UserProfile;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Slice
const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    startEditing: (state) => {
      state.isEditing = true;
      state.status = ProfileStatus.EDITING;
      state.originalProfile = state.profile ? { ...state.profile } : null;
      state.validationErrors = [];
    },
    cancelEditing: (state) => {
      state.isEditing = false;
      state.status = ProfileStatus.LOADED;
      state.profile = state.originalProfile ? { ...state.originalProfile } : null;
      state.validationErrors = [];
    },
    updateField: (state, action: PayloadAction<{ field: keyof UserProfile; value: string }>) => {
      if (state.profile) {
        state.profile[action.payload.field] = action.payload.value;
      }
    },
    setValidationErrors: (state, action: PayloadAction<ValidationError[]>) => {
      state.validationErrors = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch user profile
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = ProfileStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = ProfileStatus.LOADED;
        state.profile = action.payload;
        state.originalProfile = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = ProfileStatus.ERROR;
        state.error = action.payload as string;
      });

    // Save user profile
    builder
      .addCase(saveUserProfile.pending, (state) => {
        state.isSaving = true;
        state.status = ProfileStatus.SAVING;
        state.error = null;
      })
      .addCase(saveUserProfile.fulfilled, (state, action) => {
        state.isSaving = false;
        state.isEditing = false;
        state.status = ProfileStatus.LOADED;
        state.profile = action.payload;
        state.originalProfile = action.payload;
        state.lastSavedAt = new Date().toISOString();
        state.validationErrors = [];
        state.error = null;
      })
      .addCase(saveUserProfile.rejected, (state, action) => {
        state.isSaving = false;
        state.status = ProfileStatus.ERROR;
        state.error = action.payload as string;
      });
  },
});

export const {
  startEditing,
  cancelEditing,
  updateField,
  setValidationErrors,
  clearError,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
