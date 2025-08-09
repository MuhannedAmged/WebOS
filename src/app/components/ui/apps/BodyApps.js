import { IconMinus, IconSquare, IconX } from "@tabler/icons-react";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAppsOpenContext } from "@/context/AppsOpenContext";
import {
  useMinimizeBrowser,
  useMinimizeNotepad,
  useMinimizeSettings,
  useMinimizeTerminal,
  useMinimizeThisPc,
} from "@/store/minimizeApps";
import { useZIndexApps } from "@/store/zIndexApps";
import { useArrayApps } from "@/store/arrayApps";

const BodyApps = ({ iconApp, nameApp, indexAppInArray, children }) => {
  const { arrayAppsOpenContext, setArrayAppsOpenContext } =
    useAppsOpenContext();
  const { removeApp } = useArrayApps();

  const appRef = useRef(null);
  const isDraggingRef = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const prevBounds = useRef({ left: 100, top: 100, width: 650, height: 480 });
  const [isFullSize, setIsFullSize] = useState(false);
  const toggleThisPc = useMinimizeThisPc((state) => state.toggleMinimizeThisPc);
  const isMinimizedThisPc = useMinimizeThisPc(
    (state) => state.isMinimizedThisPc
  );

  const toggleBrowser = useMinimizeBrowser(
    (state) => state.toggleMinimizeBrowser
  );
  const isMinimizedBrowser = useMinimizeBrowser(
    (state) => state.isMinimizedBrowser
  );

  const toggleNodepad = useMinimizeNotepad(
    (state) => state.toggleMinimizeNotepad
  );
  const isMinimizedNotepad = useMinimizeNotepad(
    (state) => state.isMinimizedNotepad
  );
  const toggleSettings = useMinimizeSettings(
    (state) => state.toggleMinimizeSettings
  );
  const isMinimizedSettings = useMinimizeSettings(
    (state) => state.isMinimizedSettings
  );
  const toggleTerminal = useMinimizeTerminal(
    (state) => state.toggleMinimizeTerminal
  );
  const isMinimizedTerminal = useMinimizeTerminal(
    (state) => state.isMinimizedTerminal
  );
  const { zIndexApp, zIndexAppChange } = useZIndexApps((state) => state);
  const appType = arrayAppsOpenContext[indexAppInArray]?.type || nameApp;

  const isMinimized =
    appType === "This PC"
      ? isMinimizedThisPc
      : appType === "Browser"
      ? isMinimizedBrowser
      : appType === "Notepad"
      ? isMinimizedNotepad
      : appType === "Settings"
      ? isMinimizedSettings
      : appType === "Terminal"
      ? isMinimizedTerminal
      : false;

  const toggleMinimize = () => {
    if (appType === "This PC") {
      toggleThisPc();
    } else if (appType === "Browser") {
      toggleBrowser();
    } else if (appType === "Notepad") {
      toggleNodepad();
    } else if (appType === "Settings") {
      toggleSettings();
    } else if (appType === "Terminal") {
      toggleTerminal();
    }
  };

  const toggleFullSize = () => {
    const appEl = appRef.current;

    if (!isFullSize) {
      prevBounds.current = {
        left: parseInt(appEl.style.left || 0),
        top: parseInt(appEl.style.top || 0),
        width: appEl.offsetWidth,
        height: appEl.offsetHeight,
      };
      setIsFullSize(true);
    } else {
      setIsFullSize(false);
      setTimeout(() => {
        appEl.style.left = `${prevBounds.current.left}px`;
        appEl.style.top = `${prevBounds.current.top}px`;
        appEl.style.width = `${prevBounds.current.width}px`;
        appEl.style.height = `${prevBounds.current.height + 50}px`;
      }, 0);
    }
  };

  const onMouseDown = (e) => {
    const appEl = appRef.current;

    if (isFullSize) {
      const prev = prevBounds.current;
      appEl.style.width = `${prev.width}px`;
      appEl.style.height = `${prev.height}px`;

      const newLeft = e.clientX - prev.width / 2;
      const newTop = e.clientY - 20;

      appEl.style.left = `${Math.max(0, newLeft)}px`;
      appEl.style.top = `${Math.max(0, newTop)}px`;

      setIsFullSize(false);
    }

    isDraggingRef.current = true;

    const updatedRect = appEl.getBoundingClientRect();
    offset.current = {
      x: e.clientX - updatedRect.left,
      y: e.clientY - updatedRect.top,
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    if (!isDraggingRef.current || !appRef.current) return;

    const appEl = appRef.current;
    const { offsetWidth, offsetHeight } = appEl;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight - 48;

    let newLeft = e.clientX - offset.current.x;
    let newTop = e.clientY - offset.current.y;

    if (newLeft < 0) newLeft = 0;
    if (newTop < 0) newTop = 0;
    if (newLeft + offsetWidth > windowWidth) {
      newLeft = windowWidth - offsetWidth;
    }
    if (newTop + offsetHeight > windowHeight) {
      newTop = windowHeight - offsetHeight;
    }

    appEl.style.left = `${newLeft}px`;
    appEl.style.top = `${newTop}px`;
  };

  const onMouseUp = () => {
    isDraggingRef.current = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  useEffect(() => {
    const appEl = appRef.current;
    if (!appEl) return;

    if (isFullSize) {
      appEl.style.left = "0px";
      appEl.style.top = "0px";
      appEl.style.width = "100%";
      appEl.style.height = `${window.innerHeight - 48}px`;
    } else {
      appEl.style.left = `${prevBounds.current.left}px`;
      appEl.style.top = `${prevBounds.current.top}px`;
      appEl.style.width = `${prevBounds.current.width}px`;
      appEl.style.height = `${prevBounds.current.height}px`;
    }
  }, [isFullSize]);

  useEffect(() => {
    const appEl = appRef.current;
    if (!appEl) return;

    const observer = new ResizeObserver(() => {
      const rect = appEl.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight - 48;

      if (rect.right > windowWidth) {
        appEl.style.width = `${windowWidth - rect.left}px`;
      }

      if (rect.bottom > windowHeight) {
        appEl.style.height = `${windowHeight - rect.top}px`;
      }
    });

    observer.observe(appEl);

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={appRef}
      className="absolute text-white bg-black/30 backdrop-blur-3xl shadow-[0_0_10px_rgba(120,102,140,0.2)] min-w-[600px] min-h-[480px] overflow-auto resize transition-all duration-100"
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isMinimized ? 0 : 1,
        x: isMinimized ? "-100%" : "0%",
      }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        left: "200px",
        top: "100px",
        width: isFullSize ? "100%" : `${prevBounds.current.width}px`,
        height: isFullSize ? undefined : `${prevBounds.current.height}px`,
        transformOrigin: "top left",
        zIndex: zIndexApp === nameApp ? 5 : 0,
      }}
      onClick={() => {
        zIndexAppChange(nameApp);
      }}
    >
      <div
        onDoubleClick={() => {
          setIsFullSize((prev) => !prev);
        }}
        onMouseDown={onMouseDown}
        className="p-4 w-full h-5 flex items-center justify-between shadow-[0_0_5px_rgba(120,102,140,0.4)]"
      >
        <div className="flex items-center gap-1 text-sm">
          <span>{iconApp}</span>
          <p>{nameApp}</p>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleMinimize}
            className="w-8 h-5 flex items-center justify-center hover:bg-gray-600 rounded"
          >
            <IconMinus size={15} />
          </button>

          <button
            className="w-full h-5 flex items-center justify-center hover:bg-gray-600 rounded"
            onClick={toggleFullSize}
          >
            <IconSquare size={13} />
          </button>

          <button
            onClick={() => {
              setArrayAppsOpenContext((prevItems) => {
                const updatedItems = [...prevItems];
                updatedItems[indexAppInArray] = {
                  ...updatedItems[indexAppInArray],
                  status: false,
                };
                return updatedItems;
              });

              removeApp(nameApp);
            }}
            className="w-full h-5 flex items-center justify-center transition hover:bg-red-500 rounded"
          >
            <IconX size={15} />
          </button>
        </div>
      </div>

      <div>{children}</div>
    </motion.div>
  );
};

export default BodyApps;
