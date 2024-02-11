"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>Automatic</h1>
        <h1> Impact Reports for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-600">
          <TypewriterComponent
            options={{
              strings: [
                "Hurricanes.",
                "Flash Floods.",
                "Arctic Winds.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Analyze how current natural disasters will affect your business.
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
            Start Exploring Data Right Now
          </Button>
        </Link>
      </div>
    </div>
  );
};