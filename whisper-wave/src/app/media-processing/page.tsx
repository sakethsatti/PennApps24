"use client";
import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MediaProcessing from "./mediaProcessing";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import NavbarHomeScreen from "../components/navbar";

export default function MediaProcessingPage() {
  return (
    <div>
      {NavbarHomeScreen([
        "font-bold text-black text-decoration-underline underline-offset-4",
        "text-normal",
        "text-normal",
      ])}

      <MediaProcessing />
    </div>
  );
}
