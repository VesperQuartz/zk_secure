import React from "react";
import { Marketplace } from "@/components/marketplace";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Marketplace />
      </main>
    </div>
  );
};

export default Home;
