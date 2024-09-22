"use client";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import queryDataBase from "../functions/queryUserOutputs.js";

export default function TestPage() {
  const [passwordName, setPasswordState] = useState("");
  const [userName, setUserNameState] = useState("");
  const [categories, setCategories]: any = useState([]);

  return (
    <>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          setCategories(await queryDataBase(userName));
        }}
      >
        <FloatingLabel
          controlId="floatingInput"
          label="UserName"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="name@example.com"
            onChange={(e) => {
              setUserNameState(e.target.value);
              console.log(userName);
            }}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={async (e) => {
              setPasswordState(e.target.value);
            }}
          />
        </FloatingLabel>
        <Button variant="dark" type="submit" className="mt-2">
          Submit
        </Button>
      </Form>
      <div>{categories}</div>
    </>
  );
}
