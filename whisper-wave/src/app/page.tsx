"use client";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import SignInForm from "./components/SignInForm";
import RegisterForm from "./components/RegisterForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);

  useEffect(() => {
    const username = localStorage.getItem("username");
    setIsLoggedIn(username != null);
  }, []);

  const handleSignOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  const toggleForm = () => {
    setShowSignIn(!showSignIn);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="text-6xl font-bold text-center mb-2">WhisperWave™</h1>
        <h2 className="text-4xl text-center mb-8">A Toolkit for the Deaf.</h2>

        {isLoggedIn ? (
          <div className="w-full max-w-md">
            <h3 className="text-3xl text-center mb-4">Our Features:</h3>
            <div className="bg-gray-200 rounded-lg p-6 flex flex-col items-center">
              <Button
                className="w-full mb-3 text-2xl font-bold"
                variant="dark"
                href="/media-processing"
              >
                Media Processing
                <FontAwesomeIcon className="ml-2" icon={faUpRightFromSquare} />
              </Button>
              <Button
                className="w-full mb-3 text-2xl font-bold"
                variant="dark"
                href="/notetaking"
              >
                Speech Analyzer
                <FontAwesomeIcon className="ml-2" icon={faUpRightFromSquare} />
              </Button>
              <Button
                className="w-full text-2xl font-bold"
                variant="danger"
                onClick={handleSignOut}
              >
                Sign Out
                <FontAwesomeIcon className="ml-2" icon={faUpRightFromSquare} />
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md">
            {showSignIn ? <SignInForm /> : <RegisterForm />}
            <p className="text-center mt-4">
              {showSignIn ? "Don't have an account? " : "Already have an account? "}
              <button
                className="text-blue-500 underline"
                onClick={toggleForm}
              >
                {showSignIn ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}