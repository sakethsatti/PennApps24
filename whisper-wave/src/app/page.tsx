"use client";
import Image from "next/image";
import signInForm from "./components/signInForm";
import { useEffect } from "react";
import "./styles.css";
import Button from 'react-bootstrap/Button';
import {faUpRightFromSquare} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';

import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-white justify-center items-center">
      <h1 className="text-black mb-4 text-6xl text-center">WhisperWave™</h1>
      <h2 className="text-black text-4xl text-center">A Toolkit  for the Deaf.</h2>
      <h3 className="text-black mt-16 mb-4 text-3xl text-center">Take a look at our features:</h3>
      <div className="flex flex-col justify-center items-center bg-gray-200 rounded-lg p-6">
        <Button className="flex justify-center items-center m-2 text-black text-3xl hover:underline font-bold" variant="primary" href="/media-processing">
          <h1 className="mr-2">Media Processing</h1>
          <FontAwesomeIcon icon={faUpRightFromSquare} />
        </Button>
        <Button className="flex justify-center items-center m-2 text-black text-3xl hover:underline font-bold" variant="primary" href="/speech-analyzer">
          <h1 className="mr-2">Speech Analyzer</h1>
          <FontAwesomeIcon icon={faUpRightFromSquare} />
        </Button>
      </div>
    </div>
  );
}
