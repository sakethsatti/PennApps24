"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StoryCreation from "./storyCreation";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import NavbarHomeScreen from "../components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert } from "react-bootstrap";

export default function StoryCreationPage() {
  let isLoggedIn = localStorage.getItem("username") != null;
  return (
    <div>
      {isLoggedIn ? (
        <>
          {NavbarHomeScreen([
            "text-normal",
            "font-bold text-black text-decoration-underline underline-offset-4",
            "text-normal",
          ])}
          <StoryCreation />
        </>
      ) : (
        <>
          <Alert key="danger" variant="danger">
            You are not logged in. Please go back to{" "}
            <a href="http:localhost:3000">the main page</a>
          </Alert>
        </>
      )}
    </div>
  );
}
