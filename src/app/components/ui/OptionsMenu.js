import {
  IconWifi,
  IconBluetooth,
  IconPlane,
  IconMapPin,
  IconBattery,
  IconBellOff,
  IconSun,
  IconFlame,
  IconRotateClockwise,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";

const OptionsMenu = () => {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);
  const [airplane, setAirplane] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState(false);
  const [batterySaver, setBatterySaver] = useState(false);
  const [dnd, setDnd] = useState(false);
  const [nightLight, setNightLight] = useState(false);
  const [hotspot, setHotspot] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  const optionsArray = [
    {
      label: "Wi-Fi",
      icon: <IconWifi size={20} />,
      status: wifi,
      action: setWifi,
    },
    {
      label: "Bluetooth",
      icon: <IconBluetooth size={20} />,
      status: bluetooth,
      action: setBluetooth,
    },
    {
      label: "Airplane",
      icon: <IconPlane size={20} />,
      status: airplane,
      action: setAirplane,
    },
    {
      label: "Location",
      icon: <IconMapPin size={20} />,
      status: location,
      action: setLocation,
    },
    {
      label: "Battery Saver",
      icon: <IconBattery size={20} />,
      status: batterySaver,
      action: setBatterySaver,
    },
    {
      label: "Do Not Disturb",
      icon: <IconBellOff size={20} />,
      status: dnd,
      action: setDnd,
    },
    {
      label: "Night Light",
      icon: <IconSun size={20} />,
      status: nightLight,
      action: setNightLight,
    },
    {
      label: "Hotspot",
      icon: <IconFlame size={20} />,
      status: hotspot,
      action: setHotspot,
    },
    {
      label: "Auto Rotate",
      icon: <IconRotateClockwise size={20} />,
      status: autoRotate,
      action: setAutoRotate,
    },
  ];

  return (
    <motion.div
      onContextMenu={(e) => e.preventDefault()}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="p-5 absolute z-10 right-2 bottom-14 shadow-[0_0_10px_rgba(120,102,140,0.3)] rounded-md w-10/12 min-md:w-3/12 max-h-[90vh] overflow-y-auto bg-black/30 backdrop-blur-3xl"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {optionsArray.map((item, index) => (
          <div className="text-white text-center" key={index}>
            <button
              onClick={() => item.action((prev) => !prev)}
              className={`w-full flex flex-col items-center gap-1 border p-3 rounded-md transition ${
                item.status
                  ? "bg-white text-black"
                  : "bg-transparent hover:bg-white/10"
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
            <span className="text-xs">{item.status ? "On" : "Off"}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default OptionsMenu;
