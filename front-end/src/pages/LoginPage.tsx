import { Alert, Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event?.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event?.target.value);
  };

  const onLoginClicked = () => {
    // console.log("username", username);
    // console.log("password", password);
    setMessage("");
    login(username, password).then(
      (token) => {
        // console.log("token", token);
        navigate("/");
      },
      (err) => {
        setMessage(err.error);
      }
    );
  };

  return (
    <>
      <Box sx={{ display: "flex", width: "100vw", justifyContent: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", justifyContent: "center" }}>
          <TextField sx={{ mb: 2 }} label="Username" variant="outlined" value={username} onChange={onUsernameChange} />
          <TextField sx={{ mb: 2 }} label="Password" variant="outlined" value={password} onChange={onPasswordChange} />
          <Button variant="contained" onClick={onLoginClicked}>
            Login
          </Button>
          {message !== "" ? (
            <Alert sx={{ mt: 2 }} severity="error">
              {message}
            </Alert>
          ) : null}
        </Box>
      </Box>
    </>
  );
}

export default LoginPage;
