"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StoryCreation from "./storyCreation";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import NavbarHomeScreen from "../components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";

export default function StoryCreationPage() {
  return (
    <div>
      {NavbarHomeScreen([
        "text-normal",
        "font-bold text-black text-decoration-underline underline-offset-4",
        "text-normal",
      ])}

      <StoryCreation />
    </div>
  );
}
