"use client";
import Image from "next/image";
import signInForm from "./components/signInForm";
import { useEffect } from "react";
import "./styles.css";
export default function Home() {
  useEffect(() => {
    localStorage.setItem("user", "123");
  });
  return (
    <>
      {signInForm("block")}
      <div>Test</div>
    </>
  );
}
