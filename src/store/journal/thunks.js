import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FireBaseDB } from '../../firebase/config';
import { fileUpload, loadNotes } from '../../helpers';
import {
  addNewEmptyNote,
  setActiveNote,
  savingNewNote,
  setNotes,
  setSaving,
  updateNote,
  setPhotosToActiveNote,
  deleteNoteById
} from './journalSlice';

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

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFirestore = { ...note };

    //eliminamos el id de la nota
    delete noteToFirestore.id;

    const docRef = doc(FireBaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFirestore, { merge: true });

    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    // para subir 1 único fichero
    //await fileUpload(files[0]);

    // para subir todos los files
    // creo un array de todas las promesas que he de disparar
    const fileUploadPromises = [];
    for (const file of files) {
      // no estamos disparando la petición, porque no estamos haciendo fileUpload(file).then
      // simplemente lo estamos metiendo en el array de promesas, luego las disparemos secuencialmente
      fileUploadPromises.push(fileUpload(file));
    }

    // disparamos las promesas
    const photosUrls = await Promise.all(fileUploadPromises);

    dispatch(setPhotosToActiveNote(photosUrls));
  };
};

export const startDeletingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const docRef = doc(FireBaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id));
  };
};
