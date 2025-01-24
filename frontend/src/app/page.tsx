"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { shortenUrl } from "@/utils/api"; // Import your API function
import Link from "next/link";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await shortenUrl(originalUrl); // Use the existing API function
      setShortenedUrl(data.shortcode ? process.env.NEXT_PUBLIC_BASE_URL + data.shortcode : "Error shortening URL");
    } catch (error) {
      console.error("Error shortening URL:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
  };

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {/* Background GIF */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <Image src="/short-bg.gif" alt="Short-King Logo" layout="fill" objectFit="cover" priority />
      </div>

      {/* Foreground Content */}
      <div className="bg-black h-full w-full bg-opacity-50">
        <div className="relative z-1 flex flex-col items-center justify-center h-full space-y-6">
          <div className="">
            <div className="flex flex-col items-start py-3">
              <h2 className="text-4xl text-white italic font-extrabold">Short-King</h2>
              <h1 className="text-6xl font-bold text-white">Free URL Shortener</h1>
              <p className="text-white">For the kings. By the kings.</p>
            </div>

            {/* URL Shortening Form */}
            <form className="flex items-center space-x-1" onSubmit={handleSubmit}>
              <Input type="url" placeholder="Paste your link here" value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} className="px-4 py-5 w-[600px] bg-white text-black " required />
              <Button type="submit" disabled={isLoading} className="px-4 py-5 bg-blue-500 text-white font-bold">
                {isLoading ? "Shortening..." : "Shorten URL"}
              </Button>
            </form>
          </div>

          {/* Display Shortened URL */}
          {shortenedUrl && (
            <div className="flex justify-start gap-4 items-center">
              <Link href={shortenedUrl} target="_blank">
                {/* <Input type="text" value={shortenedUrl} readOnly className="px-4 py-2 w-[600px] font-bold underline text-blue-900 bg-white border border-gray-300 cursor-pointer" /> */}
                <p className="font-bold underline text-white cursor-pointer">{shortenedUrl}</p>
              </Link>
              <Button onClick={handleCopy}>Copy URL</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
