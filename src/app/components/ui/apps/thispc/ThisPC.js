import { useState, useMemo } from "react";
import { IconCaretLeft, IconCaretRight } from "@tabler/icons-react";
import { useArrayApps } from "@/store/arrayApps";
import { useAppsOpenContext } from "@/context/AppsOpenContext";
import {
  useMinimizeBrowser,
  useMinimizeNotepad,
  useMinimizeSettings,
  useMinimizeTerminal,
  useMinimizeThisPc,
} from "@/store/minimizeApps";
import { apps } from "@/app/components/controller/func/apps";

const ThisPC = () => {
  const [path, setPath] = useState("Desktop\\");
  const [history, setHistory] = useState([path]);
  const [index, setIndex] = useState(0);

  const { arrayApps, addApp } = useArrayApps();
  const { arrayAppsOpenContext, setArrayAppsOpenContext } = useAppsOpenContext();

  const isMinimizedThisPc = useMinimizeThisPc((s) => s.isMinimizedThisPc);
  const toggleMinimizeThisPc = useMinimizeThisPc((s) => s.toggleMinimizeThisPc);
  const isMinimizedBrowser = useMinimizeBrowser((s) => s.isMinimizedBrowser);
  const toggleMinimizeBrowser = useMinimizeBrowser((s) => s.toggleMinimizeBrowser);
  const isMinimizedNotepad = useMinimizeNotepad((s) => s.isMinimizedNotepad);
  const toggleMinimizeNotepad = useMinimizeNotepad((s) => s.toggleMinimizeNotepad);
  const isMinimizedSettings = useMinimizeSettings((s) => s.isMinimizedSettings);
  const toggleMinimizeSettings = useMinimizeSettings((s) => s.toggleMinimizeSettings);
  const isMinimizedTerminal = useMinimizeTerminal((s) => s.isMinimizedTerminal);
  const toggleMinimizeTerminal = useMinimizeTerminal((s) => s.toggleMinimizeTerminal);

  const openApp = (item) => {
    const alreadyOpen = arrayApps?.some((a) => a.name === item.name);
    if (alreadyOpen) {
      if (item.name === "This PC" && isMinimizedThisPc) toggleMinimizeThisPc();
      else if (item.name === "Browser" && isMinimizedBrowser) toggleMinimizeBrowser();
      else if (item.name === "Notepad" && isMinimizedNotepad) toggleMinimizeNotepad();
      else if (item.name === "Settings" && isMinimizedSettings) toggleMinimizeSettings();
      else if (item.name === "Terminal" && isMinimizedTerminal) toggleMinimizeTerminal();
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
  };

  const currentApps = useMemo(
    () => apps.filter((a) => a.name !== "This PC"),
    []
  );

  const navigate = (direction) => {
    const newIndex = direction === "back" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= history.length) return;
    setIndex(newIndex);
    setPath(history[newIndex]);
  };

  const handlePathChange = (value) => {
    setPath(value);
    const newHistory = history.slice(0, index + 1);
    newHistory.push(value);
    setHistory(newHistory);
    setIndex(newHistory.length - 1);
  };

  return (
    <div className="w-full p-4">
      <div className="w-full flex items-center gap-2">
        <div className="h-6 flex gap-1">
          <button
            className="w-6 h-6 flex items-center justify-center disabled:opacity-30"
            disabled={index === 0}
            onClick={() => navigate("back")}
          >
            <IconCaretLeft size={14} />
          </button>
          <button
            className="w-6 h-6 flex items-center justify-center disabled:opacity-30"
            disabled={index === history.length - 1}
            onClick={() => navigate("forward")}
          >
            <IconCaretRight size={14} />
          </button>
        </div>
        <div className="grow rounded-sm shadow-[0_0_5px_rgba(120,102,140,0.7)] h-6 overflow-hidden">
          <input
            className="w-full h-full px-2 text-xs outline-0"
            type="text"
            value={path}
            onChange={(e) => handlePathChange(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4 mt-4 text-white text-sm">
        {currentApps.map((item, i) => (
          <button
            key={i}
            className="flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded-md"
            onDoubleClick={() => openApp(item)}
          >
            {item.icon}
            <span className="truncate max-w-[80px]">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThisPC;
