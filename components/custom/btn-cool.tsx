"use client";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { IoIosGift } from "react-icons/io";

export function ConfettiFireworks() {
  const handleClick = () => {
    toast.success("Chúc bạn may mắn lần sau !");
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  return (
    <div className="relative mt-4">
      <Button className="flex itesms-center" onClick={handleClick}> <IoIosGift className="mr-2 size-4" />Nhận quà </Button>
    </div>
  );
}
