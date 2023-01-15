import {
  SEND_NOTE_URL,
  GET_NOTE_URL,
  DELETE_NOTE_URL,
  EDIT_NOTE_URL,
} from "../../constants/apiUrls";

export const sendNoteService = async (payload) => {
  const data = { user: payload.name, note: payload.note };
  let response = await fetch(SEND_NOTE_URL, {
    method: "POST",
    body: JSON.stringify(data),
  });
  response = await response.json();
  return response;
};

export const getNoteSerivce = async (userInput) => {
  const name = userInput.name;
  const payload = { name };
  let response = await fetch(GET_NOTE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  response = await response.json();
  return response;
};

export const deleteNoteService = async (Input) => {
  const name = Input.name;
  const payload = { name };
  const id = Input.id;
  let response = await fetch(`${DELETE_NOTE_URL}${id}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  response = await response.json();
  return response;
};

export const editNoteService = async (Input) => {
  const id = Input.id;
  const name = Input.name;
  const note = Input.note;
  const payload = { name, note };
  let response = await fetch(`${EDIT_NOTE_URL}${id}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  response = await response.json();
  return response;
};
