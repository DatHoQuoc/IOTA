"use client";

import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClientQueryEvent } from "@iota/dapp-kit";
import { Transaction } from "@iota/iota-sdk/transactions";
import { ConnectButton } from "@iota/dapp-kit";
import { MOOD_BOARD_ID, MOODS, PACKAGE_ID } from "@/lib/constants";
import { useNetworkVariable } from "@/lib/constants"; // Note: If you didn't create this, remove this import and use constants directly
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function Home() {
  const account = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  
  // Local state to show numbers immediately (optimistic UI)
  const [counts, setCounts] = useState([0, 0, 0]);

  // Function to submit a mood to the blockchain
  const submitMood = (moodIndex: number) => {
    if (!account) return alert("Please connect your wallet first!");

    const tx = new Transaction();
    
    // Call the 'submit_mood' function on our smart contract
    tx.moveCall({
      target: `${PACKAGE_ID}::mood_board::submit_mood`,
      arguments: [
        tx.object(MOOD_BOARD_ID), // The shared board object
        tx.pure.u8(moodIndex),    // The mood (0, 1, or 2)
      ],
    });

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: () => {
          alert("Mood submitted!");
          // Optimistically update the count on screen
          const newCounts = [...counts];
          newCounts[moodIndex]++;
          setCounts(newCounts);
        },
        onError: (err) => {
          console.error(err);
          alert("Transaction failed. Do you have IOTA gas?");
        },
      }
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-10">
        <p className="text-xl font-bold">IOTA Mood Board</p>
        <ConnectButton />
      </div>

      <div className="grid grid-cols-3 gap-8">
        {MOODS.map((mood, index) => (
          <div key={mood.label} className="flex flex-col items-center gap-4">
            <button
              onClick={() => submitMood(mood.value)}
              className={clsx(
                "w-32 h-32 rounded-2xl text-6xl flex items-center justify-center transition-all hover:scale-110 active:scale-95",
                index === 0 && "bg-green-500 hover:bg-green-400",
                index === 1 && "bg-gray-500 hover:bg-gray-400",
                index === 2 && "bg-red-500 hover:bg-red-400"
              )}
            >
              {mood.emoji}
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-bold">{mood.label}</h2>
              <p className="text-gray-400 text-lg">Count: {counts[index]}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-4 bg-gray-800 rounded-lg max-w-lg text-center">
        <p className="text-gray-400 text-sm">
          Contract ID: <span className="font-mono text-yellow-500">{MOOD_BOARD_ID.slice(0, 6)}...{MOOD_BOARD_ID.slice(-4)}</span>
        </p>
      </div>
    </main>
  );
}