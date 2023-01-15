import { Input, Button, Typography } from "@mui/material";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";

export default function Register() {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  function send() {
    dispatch(reset());
    const user = { name, password };
    dispatch(register(user));
  }

  return (
    <>
      <Typography>Name: </Typography>
      <Input onChange={(e) => setName(e.target.value)}></Input>
      <Typography>Password: </Typography>
      <Input onChange={(e) => setPassword(e.target.value)}></Input>
      <br></br>
      <br></br>
      &nbsp;&nbsp;
      <Button variant="outlined" onClick={send}>
        Register
      </Button>
    </>
  );
}
