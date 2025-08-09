import RightClickModal from "./RightClickModal";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useRightClickModal } from "@/store/rightClick";
import BodyApps from "./apps/BodyApps";
import { apps } from "../controller/func/apps";
import { useAppsOpenContext } from "@/context/AppsOpenContext";
import {
  useMinimizeBrowser,
  useMinimizeNotepad,
  useMinimizeSettings,
  useMinimizeTerminal,
  useMinimizeThisPc,
} from "@/store/minimizeApps";
import { useStartMenu } from "@/store/startMenu";
import { useOptionsMenu } from "@/store/optionsMenu";
import { useDateMenu } from "@/store/dateMenu";
import { useArrayApps } from "@/store/arrayApps";

const Apps = () => {
  const { arrayApps, addApp } = useArrayApps();
  const { arrayAppsOpenContext, setArrayAppsOpenContext } =
    useAppsOpenContext();
  const { OpenModelStartMenuChange } = useStartMenu((state) => state);
  const { OpenModelOptionsMenuChange } = useOptionsMenu((state) => state);
  const { OpenModelDateMenuChange } = useDateMenu((state) => state);

  const { isOpenModelRightClick, OpenModelRightClickChange } =
    useRightClickModal((state) => state);

  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const isMinimizedThisPc = useMinimizeThisPc(
    (state) => state.isMinimizedThisPc
  );
  const toggleMinimizeThisPc = useMinimizeThisPc(
    (state) => state.toggleMinimizeThisPc
  );

  const isMinimizedBrowser = useMinimizeBrowser(
    (state) => state.isMinimizedBrowser
  );
  const toggleMinimizeBrowser = useMinimizeBrowser(
    (state) => state.toggleMinimizeBrowser
  );
  const toggleMinimizeNodepad = useMinimizeNotepad(
    (state) => state.toggleMinimizeNotepad
  );
  const isMinimizedNotepad = useMinimizeNotepad(
    (state) => state.isMinimizedNotepad
  );
  const isMinimizedSettings = useMinimizeSettings(
    (state) => state.isMinimizedSettings
  );
  const toggleMinimizeSettings = useMinimizeSettings(
    (state) => state.toggleMinimizeSettings
  );
  const isMinimizedTerminal = useMinimizeTerminal(
    (state) => state.isMinimizedTerminal
  );
  const toggleMinimizeTerminal = useMinimizeTerminal(
    (state) => state.toggleMinimizeTerminal
  );

  const handleRightClick = (e) => {
    e.preventDefault();
    OpenModelStartMenuChange(false);
    OpenModelOptionsMenuChange(false);
    OpenModelDateMenuChange(false);
    setModalPosition({ x: e.pageX, y: e.pageY });
    OpenModelRightClickChange(true);
  };

  const handleCloseModal = () => {
    OpenModelRightClickChange(false);
  };
  return (
    <div
      onContextMenu={handleRightClick}
      onClick={() => {
        OpenModelStartMenuChange(false);
        OpenModelOptionsMenuChange(false);
        OpenModelDateMenuChange(false);
        handleCloseModal();
      }}
      className="h-full grow relative"
    >
      <AnimatePresence>
        {isOpenModelRightClick && (
          <RightClickModal
            visible={isOpenModelRightClick}
            position={modalPosition}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
      <div className="text-white p-5 grid grid-flow-col grid-cols-8 min-md:grid-cols-14 grid-rows-6 gap-2.5">
        {apps.map((item, index) => (
          <button
            key={index}
            className="p-3 flex flex-col items-center gap-1 transition-all hover:bg-black/30 hover:backdrop-blur-3xl"
            onDoubleClick={() => {
              const safeApps = Array.isArray(arrayApps) ? arrayApps : [];
              const alreadyOpen = safeApps.some(
                (app) => app.name === item.name
              );
              if (alreadyOpen) {
                if (item.name === "This PC" && isMinimizedThisPc)
                  toggleMinimizeThisPc();
                else if (item.name === "Browser" && isMinimizedBrowser)
                  toggleMinimizeBrowser();
                else if (item.name === "Notepad" && isMinimizedNotepad)
                  toggleMinimizeNodepad();
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
        ))}
      </div>

      {arrayAppsOpenContext.length > 0
        ? arrayAppsOpenContext.map((item, index) => {
            return item.status ? (
              <AnimatePresence key={index}>
                <BodyApps
                  nameApp={item.name}
                  iconApp={item.icon}
                  minimumSize={item.minimumSize}
                  indexAppInArray={index}
                >
                  {item.app}
                </BodyApps>
              </AnimatePresence>
            ) : null;
          })
        : null}
    </div>
  );
};

export default Apps;
