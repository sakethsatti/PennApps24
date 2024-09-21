import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./../styles.css";

const signInForm = (displayStatus: string) => {
  const [userName, setUserNameState] = useState("");
  const [passwordName, setPasswordState] = useState("");
  const [confirmPasswordName, setConfirmPasswordState] = useState("");
  return (
    <>
      <div
        className={`${displayStatus} w-50 ml-auto mr-auto p-8 border-1 border-gray-300 shadow-sm mt-4 rounded-lg`}
      >
        <Form
          onSubmit={async (e) => {
            e.preventDefault();
            if (confirmPasswordName === passwordName) {
              const response = await fetch(
                `http://127.0.0.1:8000/registerUser`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json", // Add this line
                  },
                  body: JSON.stringify({
                    username: `${userName}`,
                    password: `${passwordName}`,
                  }),
                }
              ).then((response) => response.json());
              if ((response.message = "user successfully signed in")) {
                localStorage.setItem("username", `${userName}`);
                console.log("line 27, user successfully signed in");
                location.reload();
              }
            } else {
              alert("Password confirmation and password do not match");
            }
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
          <FloatingLabel
            className="mt-2"
            controlId="floatingPassword"
            label="Confirm Password"
          >
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={async (e) => {
                setConfirmPasswordState(e.target.value);
              }}
            />
          </FloatingLabel>
          <Button variant="dark" type="submit" className="mt-2">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default signInForm;
