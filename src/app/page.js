"use client";
import { useEffect, useState } from "react";
import StartMenu from "./components/ui/StartMenu";
import Apps from "./components/ui/Apps";
import TaskBar from "./components/ui/TaskBar";
import { AnimatePresence } from "framer-motion";
import DateMenu from "./components/ui/DateMenu";
import OptionsMenu from "./components/ui/OptionsMenu";
import { useChangeBg } from "@/store/settings";
import { useStartMenu } from "@/store/startMenu";
import { useOptionsMenu } from "@/store/optionsMenu";
import { useDateMenu } from "@/store/dateMenu";

export default function Home() {
  const [isHydrated, setIsHydrated] = useState(false);
  const { hydrate, bg } = useChangeBg();
  const { isOpenStartMenu } = useStartMenu((state) => state);
  const { isOpenOptionsMenu } = useOptionsMenu((state) => state);
  const { isOpenDateMenu } = useDateMenu((state) => state);

  useEffect(() => {
    hydrate();
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null; 

  return (
    <div
      className={`h-screen w-full flex flex-col bg-no-repeat bg-cover bg-center overflow-hidden bg-linear-0 from-[#2b2b2b] to-[#030202] font-[family-name:var(--font-geist-sans)]`}
      style={{ backgroundImage: `url(/wallpaper${bg}.jpg)` }}
    >
      <Apps />
      <AnimatePresence>{isOpenStartMenu && <StartMenu />}</AnimatePresence>
      <AnimatePresence>{isOpenOptionsMenu && <OptionsMenu />}</AnimatePresence>
      <AnimatePresence>{isOpenDateMenu && <DateMenu />}</AnimatePresence>
      <TaskBar />
    </div>
  );
}
