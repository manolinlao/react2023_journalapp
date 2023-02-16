import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FireBaseDB } from '../../firebase/config';
import { loadNotes } from '../../helpers';
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes } from './journalSlice';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    console.log('startNewNote');
    console.log(getState());

    dispatch(savingNewNote());

    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    };

    const newDoc = doc(collection(FireBaseDB, `${uid}/journal/notes`));
    const setDocResp = await setDoc(newDoc, newNote);
    console.log({ newDoc, setDocResp });

    // añadimos el id a la nota, el id lo da el firebase
    newNote.id = newDoc.id;

    //!dispatch
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

// el uid del usuario ya lo tenemos en el store
export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error('El UID del usuario no existe');

    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};
