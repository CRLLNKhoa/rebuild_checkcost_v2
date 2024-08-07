"use client";
import { ConfettiFireworks } from "@/components/custom/btn-cool";
import Input from "@/components/input";
import Steps from "@/components/steps";
import useClickCounter from "@/hooks/useClickCounter";
import { MdOpenInNew } from "react-icons/md";

export default function Home() {
  const { clickCount, isLoading } = useClickCounter();
  return (
    <main className="flex px-4 min-h-screen w-screen items-center select-none justify-center bg-white bg-[url('/bg.svg')]">
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-2xl lg:text-4xl text-center">
          Consult. Learn. Communicate.
        </h1>
        <p className="text-center text-sm lg:text-[16px] mt-1">
          Xem được thì xem không xem được cũng xem, giao lưu với nhau về game.
        </p>
        <div
          className="border px-4 rounded-md mt-2 text-sm flex items-center gap-2
        font-semibold py-1 uppercase"
        >
          Số lượt checkcost:{" "}
          {isLoading ? (
            <span className="block bg-slate-800/50 animate-pulse w-12 rounded-md h-4"></span>
          ) : (
            clickCount
          )}
        </div>
        <div className="bg-[#18181B] mx-4 shadow-2xl w-full lg:w-[640px] p-3 mt-4 rounded-xl flex flex-col gap-8">
          <Input />
          <Steps />
        </div>
        <div className="hidden lg:flex items-center gap-3 mt-6 text-sm">
          <div
            className="border flex items-center justify-between gap-4 
          cursor-pointer px-4 py-1 border-black/20 hover:border-black/60 
          duration-300 rounded-full"
          >
            <p>Blog Game</p>
            <MdOpenInNew className="size-4" />
          </div>

          <div
            className="border flex items-center justify-between gap-4 
          cursor-pointer px-4 py-1 border-black/20 hover:border-black/60 
          duration-300 rounded-full"
          >
            <p>Build Team</p>
            <MdOpenInNew className="size-4" />
          </div>

          <div
            className="border flex items-center justify-between gap-4 
          cursor-pointer px-4 py-1 border-black/20 hover:border-black/60 
          duration-300 rounded-full"
          >
            <p>Share Progress</p>
            <MdOpenInNew className="size-4" />
          </div>
        </div>
        <div className="hidden">
          <ConfettiFireworks />
        </div>
      </div>
    </main>
  );
}
