"use client";
import { useSearchStore } from "@/store/search-store";
import React from "react";
import toast from "react-hot-toast";
import { LuBadgeInfo } from "react-icons/lu";


function Input() {
  const { currentDay, setCurrentDay }: any = useSearchStore();
  return (
    <>
      <div className="flex items-center justify-between">
        <input
          value={currentDay === 0 ? "" : currentDay}
          onChange={(e) => setCurrentDay(e.target.value)}
          type="number"
          className="flex-1 bg-transparent outline-none text-white"
          placeholder="Nhập số day hiện tại"
        />
        <LuBadgeInfo
          onClick={() =>
            toast.success("Nhập vào số day hiện tại và chọn loại muốn check.")
          }
          className="text-white size-6 cursor-pointer mr-2"
        />
      </div>
    </>
  );
}

export default Input;
