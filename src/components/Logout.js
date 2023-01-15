import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

import { logout, reset } from "../features/auth/authSlice";

export default function Logout() {
  const dispatch = useDispatch();

  return (
    <>
      <Button
        variant="outlined"
        color="success"
        onClick={() => {
          dispatch(logout());
          window.location.reload();
          dispatch(reset());
        }}
      >
        Logout
      </Button>
    </>
  );
}
