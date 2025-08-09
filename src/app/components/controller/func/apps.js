import Browser from "../../ui/apps/browser/Browser";
import Notepad from "../../ui/apps/notepad/Notepad";
import Settings from "../../ui/apps/settings/Settings";
import Terminal from "../../ui/apps/terminal/Terminal";
import ThisPC from "../../ui/apps/thispc/ThisPC";
import {
  IconDeviceImac,
  IconNotes,
  IconSettings,
  IconTerminal2,
  IconWorldWww,
} from "@tabler/icons-react";

export const apps = [
  {
    name: "This PC",
    icon: <IconDeviceImac size={27} />,
    iconInApp: <IconDeviceImac size={15} />,
    app: <ThisPC />,
  },
  {
    name: "Browser",
    icon: <IconWorldWww size={27} />,
    iconInApp: <IconWorldWww size={15} />,
    app: <Browser />,
  },
  {
    name: "Notepad",
    icon: <IconNotes size={27} />,
    iconInApp: <IconNotes size={15} />,
    app: <Notepad />,
  },
  {
    name: "Settings",
    icon: <IconSettings size={27} />,
    iconInApp: <IconSettings size={15} />,
    app: <Settings />,
  },
  {
    name: "Terminal",
    icon: <IconTerminal2 size={27} />,
    iconInApp: <IconTerminal2 size={15} />,
    app: <Terminal />,
  },
];
