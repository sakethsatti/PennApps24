"use client";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import NavbarHomeScreen from "./components/navbar";
import SignInForm from "./components/signInForm";
import RegisterForm from "./components/registerForm";
import UserNotes from "./components/UserNotes";
import UserStories from "./components/UserStories";
import queryDataBaseForNotes from "./functions/queryUserNotes";
import queryDataBaseForStories from "./functions/queryUserStories";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [showSignIn, setShowSignIn] = useState(true);
  const [userNotes, setUserNotes] = useState<any[]>([]);
  const [userStories, setUserStories] = useState<any[]>([]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    setIsLoggedIn(username != null);

    if (username) {
      fetchUserNotes(username);
      fetchUserStories(username);
    }
  }, []);

  const fetchUserNotes = async (username: string) => {
    try {
      const notes = await queryDataBaseForNotes(username);
      setUserNotes(Array.isArray(notes) ? notes : [notes]);
    } catch (error) {
      console.error("Error fetching user notes:", error);
    }
  };

  const fetchUserStories = async (username: string) => {
    try {
      const stories = await queryDataBaseForStories(username);
      setUserStories(Array.isArray(stories) ? stories : [stories]);
    } catch (error) {
      console.error("Error fetching user stories:", error);
    }
    console.log(userStories);
  };

  const handleSignOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserNotes([]);
  };

  const toggleForm = () => {
    setShowSignIn(!showSignIn);
  };

  return (
    <>
      {isLoggedIn &&
        NavbarHomeScreen(["text-normal", "text-normal", "text-normal"])}
      <div className="flex flex-col min-h-screen bg-white">
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          <h1 className="text-6xl font-bold text-center mb-2">WhisperWave™</h1>
          <h2 className="text-4xl text-center mb-16">
            A Toolkit for the Deaf.
          </h2>

          {isLoggedIn === true ? (
            <>
              <>
                <h1>Your Notes</h1>
                {userNotes.length != 0 ? (
                  <UserNotes notes={userNotes} />
                ) : (
                  <div>Add stuff here!</div>
                )}
              </>
              <>
                <h1>Your Stories</h1>
                {userStories.length != 0 ? (
                  <UserStories stories={userStories} />
                ) : (
                  <div>Add Stuff here</div>
                )}
              </>
            </>
          ) : isLoggedIn === false ? (
            <div className="w-full max-w-md">
              {showSignIn ? <SignInForm /> : <RegisterForm />}
              <p className="text-center mt-4">
                {showSignIn
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  className="text-blue-500 underline"
                  onClick={toggleForm}
                >
                  {showSignIn ? "Sign up" : "Log in"}
                </button>
              </p>
            </div>
          ) : null}
        </main>
      </div>
    </>
  );
}
