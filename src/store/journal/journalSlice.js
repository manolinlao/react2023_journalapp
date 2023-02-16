import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journalSlice',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
    // active: {
    //   id: 'ABC123',
    //   title: '',
    //   body: '',
    //   date: 12345,
    //  imageUrls: [] // https://foto1.jpg,https://foto2.jpg,https://foto3.jpg
    // }
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {},
    updateNotes: (state, action) => {},
    deleteNoteById: (state, action) => {}
  }
});

export const { savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNotes, deleteNoteById } = journalSlice.actions;
