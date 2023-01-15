import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteNoteService,
  editNoteService,
  getNoteSerivce,
  sendNoteService,
} from "./noteService";

const initialState = {
  note: null,
  status: null,
  notes: null,
  isLoading: false,
};

export const sendNote = createAsyncThunk("note/sendNote", async (payload) => {
  try {
    console.log(payload);
    return await sendNoteService(payload);
  } catch (error) {
    return error;
  }
});

export const getNote = createAsyncThunk("note/getNote", async (userInput) => {
  try {
    return await getNoteSerivce(userInput);
  } catch (error) {
    return error;
  }
});

export const deleteNote = createAsyncThunk("note/deleteNote", async (Input) => {
  try {
    return await deleteNoteService(Input);
  } catch (error) {
    return error;
  }
});

export const editNote = createAsyncThunk("note/editNote", async (Input) => {
  try {
    return await editNoteService(Input);
  } catch (error) {
    return error;
  }
});

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (state) => {
      state.note = null;
      state.status = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(sendNote.fulfilled, (state, action) => {
        state.status = action.payload.msg;
        const note = action.payload.note;

        state.notes = [note, ...state.notes];
      })
      .addCase(getNote.fulfilled, (state, action) => {
        state.notes = action.payload.msg;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.status = action.payload.msg;
        const id = action.payload.id;

        // notes = all notes besides the note with the deleted id
        state.notes = state.notes.filter((item) => item.id !== id);
        /// new = [...old, new value]
      })
      .addCase(editNote.fulfilled, (state, action) => {
        state.status = action.payload.msg;
        const note = action.payload.note;

        state.notes = state.notes.map((item) => {
          if (item.id === note.id) {
            return note;
          } else {
            return item;
          }
        });
      }),
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
