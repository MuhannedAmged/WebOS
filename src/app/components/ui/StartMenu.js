import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { IconSearch } from "@tabler/icons-react";
import { apps } from "../controller/func/apps";
import { useArrayApps } from "@/store/arrayApps";
import { useAppsOpenContext } from "@/context/AppsOpenContext";
import { useStartMenu } from "@/store/startMenu";
import {
  useMinimizeBrowser,
  useMinimizeNotepad,
  useMinimizeSettings,
  useMinimizeTerminal,
  useMinimizeThisPc,
} from "@/store/minimizeApps";

const StartMenu = () => {
  const [query, setQuery] = useState("");

  const filteredApps = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? apps.filter((a) => a.name.toLowerCase().includes(q)) : apps;
  }, [query]);

  const { arrayApps, addApp } = useArrayApps();
  const { arrayAppsOpenContext, setArrayAppsOpenContext } =
    useAppsOpenContext();
  const { OpenModelStartMenuChange } = useStartMenu();

  const isMinimizedThisPc = useMinimizeThisPc((s) => s.isMinimizedThisPc);
  const toggleMinimizeThisPc = useMinimizeThisPc((s) => s.toggleMinimizeThisPc);
  const isMinimizedBrowser = useMinimizeBrowser((s) => s.isMinimizedBrowser);
  const toggleMinimizeBrowser = useMinimizeBrowser(
    (s) => s.toggleMinimizeBrowser
  );
  const isMinimizedNotepad = useMinimizeNotepad((s) => s.isMinimizedNotepad);
  const toggleMinimizeNotepad = useMinimizeNotepad(
    (s) => s.toggleMinimizeNotepad
  );
  const isMinimizedSettings = useMinimizeSettings((s) => s.isMinimizedSettings);
  const toggleMinimizeSettings = useMinimizeSettings(
    (s) => s.toggleMinimizeSettings
  );
  const isMinimizedTerminal = useMinimizeTerminal((s) => s.isMinimizedTerminal);
  const toggleMinimizeTerminal = useMinimizeTerminal(
    (s) => s.toggleMinimizeTerminal
  );

  return (
    <motion.div
      onContextMenu={(e) => e.preventDefault()}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="p-5 shadow-[0_0_10px_rgba(120,102,140,0.3)] absolute z-10 left-1/2 bottom-14 -translate-x-1/2 rounded-md w-7/12 min-md:w-5/12 h-10/12 bg-black/30 backdrop-blur-3xl"
    >
      <div className="relative text-white flex items-center text-xs border-1 p-2 rounded-2xl">
        <IconSearch size={15} />
        <input
          className="absolute pl-5 w-full h-full outline-0 bg-transparent"
          type="text"
          placeholder="Search for apps"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-2.5 text-white mt-2">
        {filteredApps.length === 0 ? (
          <p className="col-span-3 text-center text-sm opacity-60 py-4">
            No matching apps found
          </p>
        ) : (
          filteredApps.map((item, index) => (
            <button
              key={index}
              className="p-3 flex flex-col items-center gap-1 transition-all hover:bg-black/30 hover:backdrop-blur-3xl"
              onClick={() => {
                OpenModelStartMenuChange(false);
                const alreadyOpen = arrayApps?.some(
                  (app) => app.name === item.name
                );
                if (alreadyOpen) {
                  if (item.name === "This PC" && isMinimizedThisPc)
                    toggleMinimizeThisPc();
                  else if (item.name === "Browser" && isMinimizedBrowser)
                    toggleMinimizeBrowser();
                  else if (item.name === "Notepad" && isMinimizedNotepad)
                    toggleMinimizeNotepad();
                  else if (item.name === "Settings" && isMinimizedSettings)
                    toggleMinimizeSettings();
                  else if (item.name === "Terminal" && isMinimizedTerminal)
                    toggleMinimizeTerminal();
                  return;
                }
                addApp(item);
                setArrayAppsOpenContext([
                  ...arrayAppsOpenContext,
                  {
                    app: item.app,
                    name: item.name,
                    icon: item.iconInApp,
                    minimumSize: false,
                    status: true,
                  },
                ]);
              }}
            >
              {item.icon}
              <p className="text-[13px]">{item.name}</p>
            </button>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default StartMenu;
