"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteTaking from "./notetaking";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarHomeScreen from "../components/navbar";

export default function MediaProcessingPage() {
  return (
    <>
      {NavbarHomeScreen([
        "text-normal",
        "text-normal",
        "font-bold text-black text-decoration-underline underline-offset-4",
      ])}
      <div>
        <NoteTaking />
      </div>
    </>
  );
}
