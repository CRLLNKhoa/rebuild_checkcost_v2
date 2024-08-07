"use client";
import React, { useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchStore } from "@/store/search-store";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import jsonSingle from "../public/new-single-rw.json";
import jsonDouble from "../public/new-double-rw.json";
import { AnimatedList } from "./magicui/animated-list";
import useClickCounter from "@/hooks/useClickCounter";

function Steps() {
  const {
    step,
    setStep,
    setTypeSeach,
    currentDay,
    setResultSearch,
    resultSearch,
    typeSearch,
  }: any = useSearchStore();
  const [isOpen, setIsOpen] = useState(false);
  const { incrementClickCount } = useClickCounter();

  const handleSearchStreaming = () => {
    incrementClickCount();
    if (currentDay === 0 || currentDay === "") {
      toast.error("Vui lòng nhập ngày hiện tại !");
      return;
    }
    setIsOpen(true);
    const handleSearch = () => {
      if (typeSearch === "single") {
        return jsonSingle.filter(
          (item) =>
            item.day >= Number(currentDay) &&
            item.day <= Number(currentDay) + Number(step)
        );
      }
      if (typeSearch === "double") {
        return jsonDouble.filter(
          (item) =>
            item.day >= Number(currentDay) &&
            item.day <= Number(currentDay) + Number(step)
        );
      }
      if (typeSearch === "time") {
        return jsonSingle.filter(
          (item) =>
            item.day >= Number(currentDay) &&
            item.day <= Number(currentDay) + Number(step)
        );
      }
    };
    const result = handleSearch();
    function assignColorsToItems(items: any, colors: any) {
      // Bước 1: Tìm giá trị day lớn nhất và nhỏ nhất
      const days = items.map((item: any) => item.day);
      const maxDay = typeSearch === "single" ? 400 : 625;
      const minDay = typeSearch === "single" ? 162 : 262;

      // Bước 2: Tính khoảng cách giữa giá trị day lớn nhất và nhỏ nhất
      const range = maxDay - minDay;

      // Bước 3: Chia khoảng cách này ra thành 10 đoạn đều
      const step = range / 10;

      // Bước 4: Gán màu cho mỗi đoạn
      const colorRanges: any[] = [];
      for (let i = 0; i < 10; i++) {
        colorRanges.push({
          start: minDay + i * step,
          end: minDay + (i + 1) * step,
          color: colors[i],
        });
      }

      // Bước 5: Gán màu cho các item
      const coloredItems = items.map((item: any) => {
        const colorRange = colorRanges.find(
          (range) => item.cost >= range.start && item.cost < range.end
        );
        return {
          ...item,
          color: colorRange ? colorRange.color : colors[colors.length - 1], // Màu cuối cùng nếu không tìm thấy đoạn phù hợp
        };
      });

      return coloredItems;
    }
    const fromattedResult = assignColorsToItems(result, [
      "#00FF00",
      "#7FFF00",
      "#FFFF00",
      "#FFBF00",
      "#FF7F00",
      "#FF4000",
      "#FF0000",
      "#BF0000",
      "#7F0000",
      "#3F0000",
    ]);
    setResultSearch(fromattedResult);
  };

  return (
    <div className="flex items-center justify-between text-white">
      <div className="flex items-center gap-2">
        <div
          onClick={() => setStep(100)}
          className={cn(
            "flex group items-center justify-center duration-300 bg-slate-400/20 px-2 py-1 rounded-md text-sm cursor-pointer",
            step === 100 && "text-black bg-white"
          )}
        >
          +100
        </div>
        <div
          onClick={() => setStep(300)}
          className={cn(
            "flex group items-center justify-center duration-300 bg-slate-400/20 px-2 py-1 rounded-md text-sm cursor-pointer",
            step === 300 && "text-black bg-white"
          )}
        >
          +300
        </div>
        <div
          onClick={() => setStep(500)}
          className={cn(
            "flex group items-center justify-center duration-300 bg-slate-400/20 px-2 py-1 rounded-md text-sm cursor-pointer",
            step === 500 && "text-black bg-white"
          )}
        >
          +500
        </div>
        <Select defaultValue="single" onValueChange={(e) => setTypeSeach(e)}>
          <SelectTrigger
            className="w-[140px] h-[28px] text-white
         bg-slate-400/20 outline-none"
          >
            <SelectValue placeholder="Chọn check" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="single">Single</SelectItem>
            <SelectItem value="double">Double</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div
        onClick={handleSearchStreaming}
        className="flex itemscenter justify-center cursor-pointer
     hover:bg-slate-400/20 py-2 px-3 rounded-lg duration-500"
      >
        <HiOutlineArrowRight className="size-5" />
      </div>
      <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <AlertDialogContent className="max-w-[800px] h-[90vh] flex flex-col">
          <AlertDialogHeader>
            <AlertDialogTitle>Kết quả tìm kiếm:</AlertDialogTitle>
            <AlertDialogDescription>
              Cost thấp thời gian rewind của bạn sẽ nhanh
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="w-ful flex-1 overflow-y-auto rounded-xl">
            {resultSearch?.map((item: any) => (
              <div
                style={{ backgroundColor: item.color }}
                key={item.day}
                className={cn(
                  "flex items-center justify-between  px-4 py-2 font-semibold",
                  ["#00FF00", "#7FFF00", "#FFFF00", "#FFBF00"].includes(
                    item.color
                  )
                    ? `text-black`
                    : "text-white"
                )}
              >
                <p>DAY: {item.day}</p>
                <p>TICKETS: {Math.floor(item.ticket)}</p>
                <p>COST: {Math.floor(item.cost)}</p>
              </div>
            ))}
          </div>
          <AlertDialogFooter>
            <AlertDialogAction>Cancel</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Steps;
