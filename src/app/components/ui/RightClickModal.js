import React from "react";
import { motion } from "framer-motion";
import Settings from "./apps/settings/Settings";
import { IconSettings, IconTerminal2 } from "@tabler/icons-react";
import { useAppsOpenContext } from "@/context/AppsOpenContext";
import { useArrayApps } from "@/store/arrayApps";
import Terminal from "./apps/terminal/Terminal";

const RightClickModal = ({ visible, position, onClose }) => {
  if (!visible) return null;

  const style = {
    top: position.y,
    left: position.x,
  };

  const { arrayAppsOpenContext, setArrayAppsOpenContext } =
    useAppsOpenContext();
  const { arrayApps, addApp } = useArrayApps();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      style={style}
      className="absolute shadow-[0_0_10px_rgba(120,102,140,0.3)] text-white z-10 bg-black/30 backdrop-blur-3xl rounded-sm w-40 overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => onClose()}
        className="p-1 pl-3 text-left text-sm hover:bg-black/40 w-full transition-all"
      >
        Refresh
      </button>
      <button
        onClick={() => {
          onClose();
          const safeApps = Array.isArray(arrayAppsOpenContext)
            ? arrayAppsOpenContext
            : [];
          const alreadyOpen = safeApps.some((app) => app.name === "Terminal");
          if (alreadyOpen) {
            return;
          }

          addApp({
            app: <Terminal />,
            name: "Terminal",
            icon: <IconTerminal2 size={27} />,
            minimumSize: false,
            status: true,
          });

          setArrayAppsOpenContext([
            ...arrayAppsOpenContext,
            {
              app: <Terminal />,
              name: "Terminal",
              icon: <IconTerminal2 size={27} />,
              minimumSize: false,
              status: true,
            },
          ]);
        }}
        className="p-1 pl-3 text-left text-sm hover:bg-black/40 w-full transition-all"
      >
        Terminal
      </button>
      <button
        onClick={() => {
          onClose();
          const safeApps = Array.isArray(arrayAppsOpenContext)
            ? arrayAppsOpenContext
            : [];
          const alreadyOpen = safeApps.some((app) => app.name === "Settings");
          if (alreadyOpen) {
            return;
          }

          addApp({
            app: <Settings />,
            name: "Settings",
            icon: <IconSettings size={27} />,
            minimumSize: false,
            status: true,
          });

          setArrayAppsOpenContext([
            ...arrayAppsOpenContext,
            {
              app: <Settings />,
              name: "Settings",
              icon: <IconSettings size={15} />,
              minimumSize: false,
              status: true,
            },
          ]);
        }}
        className="p-1 pl-3 text-left text-sm hover:bg-black/40 w-full transition-all"
      >
        Settings
      </button>
    </motion.div>
  );
};

export default RightClickModal;
