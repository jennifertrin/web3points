"use client"

import Hero from "../components/Hero";
import Dashboard from "../components/Dashboard";
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core';

export default function Main() {
  const isDynamicLoggedIn = useIsLoggedIn();

  return (
    <div className="w-screen top-0 -z-10 h-full w-full bg-white">
      {isDynamicLoggedIn ? <Dashboard isDynamicLoggedIn={isDynamicLoggedIn} /> : <Hero />}
    </div>
  );
}