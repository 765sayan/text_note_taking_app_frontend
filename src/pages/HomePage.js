import { Button, TextField, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getNote,
  sendNote,
  deleteNote,
  editNote,
} from "../features/note/noteSlice";
import Logout from "../components/Logout";
import { getUser } from "../features/auth/authSlice";

export default function HomePage() {
  const navigate = useNavigate();
  const [note, setNote] = useState();
  const dispatch = useDispatch();

  const { user, nm } = useSelector((state) => state.auth);
  const { notes, status } = useSelector((state) => state.note);

  function send() {
    console.log(note);
    const name = user.name;
    const payload = { name, note };
    // dispatch(sendNote(name, note));
    dispatch(sendNote(payload));
    // window.location.reload();
  }

  function get() {
    const name = user.name;
    const userInput = { name };
    dispatch(getNote(userInput));
    const Input = { id: name };
    dispatch(getUser(Input));
  }

  function deleteElement(id) {
    const name = user.name;
    const Input = { name, id };
    dispatch(deleteNote(Input));
    // window.location.reload();
  }

  function editNoteData(id, note) {
    const name = user.name;
    const Input = { id: id, name: name, note: note };
    dispatch(editNote(Input));
    // window.location.reload();
  }

  useEffect(() => {
    if (user !== null) {
      get();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <br />
      <br></br>
      &nbsp;&nbsp;
      <Logout />
      <br></br>
      <br></br>
      {nm !== null ? <h1>Hello {nm}</h1> : null}
      <br></br>
      <br></br>
      <h2>&nbsp;&nbsp;Write Note:</h2>
      &nbsp;&nbsp;&nbsp;
      <TextField
        label="Enter your note"
        variant="outlined"
        // color="success"
        // focused
        multiline
        onChange={(e) => setNote(e.target.value)}
      />
      <br></br>
      <br></br>
      &nbsp;&nbsp;&nbsp;
      <Button variant="outlined" onClick={send}>
        Send
      </Button>
      <Container maxWidth="sm">
        <h2>&nbsp;&nbsp;Your Notes</h2>
      </Container>
      {notes
        ? notes.map((element) => (
            <div key={element.id}>
              &nbsp;&nbsp;
              <Container maxWidth="sm">
                <TextField
                  defaultValue={element.note}
                  variant="outlined"
                  onChange={(e) => setNote(e.target.value)}
                  multiline
                ></TextField>
                <br></br>
                <br></br>
                <Button
                  variant="outlined"
                  onClick={() => editNoteData(element.id, note)}
                >
                  Edit
                </Button>
                <br></br>
                <br></br>
                <Button
                  variant="outlined"
                  onClick={() => deleteElement(element.id)}
                >
                  Delete
                </Button>
              </Container>
              <br></br>
              <br></br>
            </div>
          ))
        : null}
    </>
  );
}
