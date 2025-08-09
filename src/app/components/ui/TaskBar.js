import {
  IconBatteryFilled,
  IconBrandWindowsFilled,
  IconVolume,
  IconWifi,
  IconWifiOff,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import useInternetStatus from "./useInternetStatus";
import {
  useMinimizeBrowser,
  useMinimizeNotepad,
  useMinimizeSettings,
  useMinimizeTerminal,
  useMinimizeThisPc,
} from "@/store/minimizeApps";
import { useRightClickModal } from "@/store/rightClick";
import { useStartMenu } from "@/store/startMenu";
import { useOptionsMenu } from "@/store/optionsMenu";
import { useDateMenu } from "@/store/dateMenu";
import { useArrayApps } from "@/store/arrayApps";

const TaskBar = () => {
  const [time, setTime] = useState([]);
  const isOnline = useInternetStatus();
  const { arrayApps } = useArrayApps();
  const { isOpenStartMenu, OpenModelStartMenuChange } = useStartMenu(
    (state) => state
  );
  const { isOpenOptionsMenu, OpenModelOptionsMenuChange } = useOptionsMenu(
    (state) => state
  );
  const { isOpenDateMenu, OpenModelDateMenuChange } = useDateMenu(
    (state) => state
  );
  const { OpenModelRightClickChange } = useRightClickModal((state) => state);

  const toggleMinimizeThisPc = useMinimizeThisPc(
    (state) => state.toggleMinimizeThisPc
  );
  const toggleMinimizeBrowser = useMinimizeBrowser(
    (state) => state.toggleMinimizeBrowser
  );
  const toggleMinimizeNotepad = useMinimizeNotepad(
    (state) => state.toggleMinimizeNotepad
  );
  const toggleMinimizeSettings = useMinimizeSettings(
    (state) => state.toggleMinimizeSettings
  );
  const toggleMinimizeTerminal = useMinimizeTerminal(
    (state) => state.toggleMinimizeTerminal
  );

  const toggleMinimize = (type) => {
    switch (type) {
      case "This PC":
        toggleMinimizeThisPc();
        break;
      case "Browser":
        toggleMinimizeBrowser();
        break;
      case "Notepad":
        toggleMinimizeNotepad();
        break;
      case "Settings":
        toggleMinimizeSettings();
        break;
      case "Terminal":
        toggleMinimizeTerminal();
        break;
    }
  };

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, "0");
      const timeNow = `${h % 12 || 12}:${m} ${h >= 12 ? "PM" : "AM"}`;
      const dateNow = `${
        now.getMonth() + 1
      }/${now.getDate()}/${now.getFullYear()}`;
      setTime([timeNow, dateNow]);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      onClick={() => {
        OpenModelStartMenuChange(false);
        OpenModelOptionsMenuChange(false);
        OpenModelDateMenuChange(false);
        OpenModelRightClickChange(false);
      }}
      className="flex items-center justify-between w-full h-13 px-2.5 py-0.5 text-white bg-black/30 backdrop-blur-3xl border-t border-white/20 select-none"
    >
      <div></div>
      <div className="flex gap-1 h-full">
        <button
          onClick={(e) => {
            e.stopPropagation();
            OpenModelStartMenuChange(!isOpenStartMenu);
            OpenModelOptionsMenuChange(false);
            OpenModelDateMenuChange(false);
            OpenModelRightClickChange(false);
          }}
          className="flex items-center justify-center px-1 rounded-xs hover:bg-white/10"
        >
          <IconBrandWindowsFilled size={30} />
        </button>
        {Array.isArray(arrayApps) &&
          arrayApps.map((app) => (
            <button
              key={app.name}
              onClick={(e) => {
                e.stopPropagation();
                toggleMinimize(app.name);
              }}
              className="flex items-center justify-center px-1 rounded-xs hover:bg-white/10 relative"
            >
              {app.icon}
            </button>
          ))}
      </div>
      <div className="flex items-center gap-1 h-full">
        <button
          onClick={(e) => {
            e.stopPropagation();
            OpenModelOptionsMenuChange(!isOpenOptionsMenu);
            OpenModelStartMenuChange(false);
            OpenModelDateMenuChange(false);
            OpenModelRightClickChange(false);
          }}
          className="flex items-center gap-1 px-1 h-full rounded-xs hover:bg-white/10"
        >
          {isOnline ? <IconWifi size={15} /> : <IconWifiOff size={15} />}
          <IconVolume size={15} />
          <IconBatteryFilled size={15} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            OpenModelDateMenuChange(!isOpenDateMenu);
            OpenModelStartMenuChange(false);
            OpenModelOptionsMenuChange(false);
            OpenModelRightClickChange(false);
          }}
          className="flex flex-col items-center justify-center px-1 h-full text-[10px] rounded-xs hover:bg-white/10 text-right"
        >
          <span>{time[0]}</span>
          <span>{time[1]}</span>
        </button>
      </div>
    </div>
  );
};

export default TaskBar;
