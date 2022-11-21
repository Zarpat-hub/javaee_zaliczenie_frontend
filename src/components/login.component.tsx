import React, { useRef, useState } from "react";
import { Button, Form, FormLabel } from "react-bootstrap";
import { Api } from "../api/Api";

export type AppUser = {
  username?: string;
  password?: string;
};

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const attemptLogin = () => {
    Api.attemptLogin({
      username: username,
      password: password,
    }).then((res) => {
      console.log(res.username, res.password);
      localStorage.setItem("username", res!.username!);
      localStorage.setItem("password", res!.password!);
    });
  };

  return (
    <React.Fragment>
      <Form>
        <Form.Group className="mb-3" id="formBasicEmail">
          <FormLabel>Username</FormLabel>
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            id="usernameId"
            type="text"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            id="passId"
            type="text"
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={() => attemptLogin()}>
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
};
