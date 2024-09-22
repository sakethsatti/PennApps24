"use client";

import React, { useState } from "react";
import OpenAI from "openai";
import "../styles.css";
import queryDataBase from "../functions/queryUserOutputs";

type StoryType = "funny" | "sad" | "serious";

const StoryCreation: React.FC = () => {
  const [story, setStory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [storyType, setStoryType] = useState<StoryType | null>(null);
  const [customInput, setCustomInput] = useState<string>(""); // New state for extra input

  console.log(process.env.NEXT_PUBLIC_OPENAI_API_KEY);

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleStoryRequest = async (type: StoryType) => {
    setIsLoading(true);
    setError(null);
    setStory(null);
    setStoryType(type);
    let role = "";
    let recentSound: any = await queryDataBase(
      localStorage.getItem("username")
    );
    recentSound = new Set(recentSound);
    recentSound = Array.from(recentSound);
    console.log("array");
    if (typeof recentSound != "string") {
      let roles = "";
      recentSound.forEach((element: any) => {
        roles += element + " and ";
        console.log("logging element");
        console.log(element);
      });
      role = `Tell me a ${type} story about a ${roles} using ${roles} sounds.`;
    }
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a storyteller that can only tell ${type} stories about ${recentSound}s.`,
          },
          {
            role: "user",
            content: `Tell me a ${type} story about a ${recentSound} using ${recentSound} sounds. Here is some extra information: ${customInput}`, // Include extra user input
          },
        ],
        max_tokens: 500,
      });

      const generatedStory =
        response.choices[0]?.message?.content || "No story available.";
      setStory(generatedStory);
      const storeAStory = await fetch("http://127.0.0.1:8000/storeStories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // <-- Include the Content-Type header
        },
        body: JSON.stringify({
          story: generatedStory,
          username: localStorage.getItem("username"),
          tone: type,
        }),
      }).then((response) => response.json());
    } catch (err) {
      setError(
        "Error generating story: " +
          (err instanceof Error ? err.message : String(err))
      );
    } finally {
      setIsLoading(false);
    }
  };

  const StoryButton: React.FC<{ type: StoryType; label: string }> = ({
    type,
    label,
  }) => (
    <button
      className={`px-6 py-3 w-24 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition-colors duration-300 ${
        isLoading && storyType === type ? "animate-pulse" : ""
      }`}
      onClick={() => handleStoryRequest(type)}
      disabled={isLoading}
    >
      {isLoading && storyType === type ? "..." : label}
    </button>
  );

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 bg-white min-h-screen font-[Outfit]">
      <h1 className="text-4xl font-bold mb-4 text-center text-black">
        Story Time
      </h1>
      <p className="text-lg mb-4 text-black text-center">
        Click a button below to hear a story about your most recent sound.
      </p>

      {/* New textarea for extra user input */}
      <div className="mt-8 flex justify-center gap-4">
        <StoryButton type="funny" label="Funny!" />
        <StoryButton type="sad" label="Sad..." />
        <StoryButton type="serious" label="Serious." />
      </div>

      {isLoading && (
        <div className="mt-4 w-full h-1 bg-black animate-pulse"></div>
      )}
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}
      {story && (
        <div className="mt-8 w-full max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-black text-center">
            Here's Your{" "}
            {(storyType as string).charAt(0).toUpperCase() +
              storyType?.slice(1)}{" "}
            Story
          </h2>
          <p className="text-black p-4 bg-gray-100 rounded-md whitespace-pre-wrap">
            {story}
          </p>
        </div>
      )}
    </div>
  );
};

export default StoryCreation;
