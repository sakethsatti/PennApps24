"use client";
import Image from "next/image";
import signInForm from "./components/signInForm";
import { useEffect, useLayoutEffect, useState } from "react";
import "./styles.css";
import registerForm from "./components/registerForm";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  faUpRightFromSquare,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import NavbarHomeScreen from "./components/navbar";
config.autoAddCss = false; /* eslint-disable import/first */

export default function Home() {
  const [isLoggedIn, setHidden]: any = useState("nonone");
  useEffect(() => {
    let x = localStorage.getItem("DrakeIsFun");
    if (localStorage.getItem("username") != null) {
      setHidden(false);
    } else {
      setHidden(true);
    }
    console.log(x == null);
    console.log("isLoggedIn");
    console.log("here");
    document.getElementById("signOutButton")?.addEventListener("click", () => {
      setHidden(true);
      localStorage.clear();
      location.reload();
    });
    return () => {
      document
        .getElementById("signOutButton")
        ?.removeEventListener("click", () => {
          localStorage.clear();
          location.reload();
          setHidden(true);
        });
    };
  });
  const usePage = (
    <>
      <div className={!isLoggedIn ? "block" : "hidden"}>
        {NavbarHomeScreen(["text-normal", "text-normal", "text-normal"])}
        <div
          className={
            !isLoggedIn
              ? "flex flex-col h-screen bg-white justify-center items-center"
              : "hidden"
          }
        >
          <h1 className="text-black mb-4 text-6xl text-center">WhisperWave™</h1>
          <h2 className="text-black text-4xl text-center">
            A Toolkit for the Deaf.
          </h2>
          <h3 className="text-black mt-16 mb-4 text-3xl text-center">
            Take a look at our features:
          </h3>
        </div>
      </div>
    </>
  );
  return (
    <>
      {registerForm(isLoggedIn === true ? "block" : "hidden")}
      {
        <div
          className={
            isLoggedIn === true ? "flex ml-auto mr-auto items-center" : "hidden"
          }
        >
          <hr className="w-[45%] mr-[2%]"></hr>
          <span className="text-[275%] font-bold text-[rgb(51,145,238)]">
            OR
          </span>
          <hr className="w-[45%] ml-[2%]"></hr>
        </div>
      }
      {signInForm(isLoggedIn === true ? "block" : "hidden")}
      {usePage}
    </>
  );
}
