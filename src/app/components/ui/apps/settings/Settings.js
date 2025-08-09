import { useChangeBg } from "@/store/settings";
import { IconBrush } from "@tabler/icons-react";
import { useState } from "react";
import Image from "next/image";

const Settings = () => {
  const [personalization, setPersonalization] = useState({
    bg: "1",
  });

  const { setBg } = useChangeBg();

  const handleBgChange = (value) => {
    setBg(value);
    setPersonalization({ ...personalization, bg: value });
    localStorage.setItem("bg", value);
  };

  const [activeTab, setActiveTab] = useState("personalization");

  return (
    <div className="w-full h-full flex flex-col text-white">
      <div className="flex-1 flex overflow-hidden">
        <div className="w-48 p-2">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("personalization")}
              className={`w-full text-left px-3 py-1.5 rounded flex items-center gap-2 text-sm ${
                activeTab === "personalization"
                  ? "bg-black/40"
                  : "hover:bg-black/40"
              }`}
            >
              <IconBrush size={20} /> Personalization
            </button>
          </nav>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            {activeTab === "personalization" && (
              <div className="flex flex-wrap items-center gap-2.5">
                {[1, 2, 3, 4, 5].map((item) => {
                  return (
                    <button
                      key={item}
                      onClick={() => handleBgChange(item)}
                      className={`${
                        personalization.bg === item
                          ? "bg-black/40"
                          : "hover:bg-black/40"
                      }`}
                    >
                      <Image
                        src={`/wallpaper${item}.jpg`}
                        width={100}
                        height={100}
                        alt="wallpaper"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
