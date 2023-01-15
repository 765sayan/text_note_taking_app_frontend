import { Input, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { login, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  function send() {
    dispatch(reset());
    const data = { name, password };
    console.log(data);
    dispatch(login(data));
  }

  useEffect(() => {
    navigate("/home");
  }, [user]);

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
        Login
      </Button>
    </>
  );
}
