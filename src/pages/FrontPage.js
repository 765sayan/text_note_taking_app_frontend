import { useSelector } from "react-redux";

import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import { useEffect } from "react";

export default function FrontPage() {
  const { user, msg } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Container maxWidth="sm">
        <h1>Register here</h1>
        {msg ? (
          <>
            <b>{msg.msg}</b>
            <br></br>
            <br></br>
          </>
        ) : null}

        <Register />
      </Container>
      <br></br>
      <br></br>
      <Container maxWidth="sm">
        <h1>Login here</h1>
        <Login />
      </Container>
      &nbsp;&nbsp;
      <Container maxWidth="sm">
        <Button variant="outlined" onClick={() => navigate("/home")}>
          Home
        </Button>
      </Container>
    </div>
  );
}
