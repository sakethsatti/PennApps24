import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const SignInForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/signInUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.message === "user successfully signed in") {
        localStorage.setItem("username", userName);
        location.reload();
      } else {
        alert("Sign in failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FloatingLabel>
        <div className="text-center">
          <Button variant="primary" type="submit" className="w-full">
            Sign In
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignInForm;