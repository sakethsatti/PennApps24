"use client";
import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MediaProcessing from "./mediaProcessing";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import NavbarHomeScreen from "../components/navbar";
import { useEffect } from "react";
import { Alert } from "react-bootstrap";

export default function MediaProcessingPage() {
  let isLoggedIn = localStorage.getItem("username") != null;
  console.log(isLoggedIn);
  return (
    <div>
      {isLoggedIn ? (
        <>
          {NavbarHomeScreen([
            "font-bold text-black text-decoration-underline underline-offset-4",
            "text-normal",
            "text-normal",
          ])}
          <MediaProcessing />
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
