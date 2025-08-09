import { useState, useRef, useEffect } from "react";
import { IconCopy, IconTrash } from "@tabler/icons-react";

const Terminal = () => {
  const [terminalHistory, setTerminalHistory] = useState([
    { type: "system", content: "Windows Terminal v1.0" },
    { type: "system", content: "Type 'help' for available commands" },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentPath, setCurrentPath] = useState("Desktop> ");
  const [terminalSettings, setTerminalSettings] = useState({ theme: "dark" });

  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const clearTerminal = () => setTerminalHistory([]);

  const copyTerminalContent = () => {
    const lastCmdIndex = [...terminalHistory]
      .map((item) => item.type)
      .lastIndexOf("command");

    if (lastCmdIndex === -1) return;

    const outputLines = terminalHistory
      .slice(lastCmdIndex + 1)
      .filter((item) => item.type === "output" || item.type === "error")
      .map((item) => item.content)
      .join("\n");

    if (outputLines) navigator.clipboard.writeText(outputLines);
  };

  const commands = {
    help: () => [
      "Available commands:",
      "help            Show this help message",
      "clear           Clear terminal screen",
      "dir             List directory contents",
      "cd [path]       Change directory",
      "echo [text]     Display text",
      "date            Show current date and time",
      "calc [expr]     Simple calculator",
      "color [theme]   Change terminal theme",
      "exit            Close terminal",
    ],
    clear: () => "__CLEAR__",
    dir: () => [
      "Directory of " + currentPath,
      "",
      "Mode                LastWriteTime         Length Name",
      "----                -------------         ------ ----",
      "d-----        12/01/2024   2:30 PM                Documents",
      "d-----        12/01/2024   2:30 PM                Downloads",
      "d-----        12/01/2024   2:30 PM                Pictures",
      "-a----        12/01/2024   3:45 PM           1024 readme.txt",
      "-a----        12/01/2024   4:15 PM           2048 data.json",
      "",
      "               2 File(s)          3,072 bytes",
      "               3 Dir(s)   15,728,640 bytes free",
    ],
    date: () => [new Date().toString()],
    echo: (args) => [args.join(" ")],
    calc: (args) => {
      if (args.length === 0) return ["Usage: calc [expression]"];
      try {
        const expr = args.join(" ");
        const result = eval(expr.replace(/[^0-9+\-*/.() ]/g, ""));
        return [`${expr} = ${result}`];
      } catch {
        return ["Error: Invalid expression"];
      }
    },
    cd: (args) => {
      if (args.length === 0) return [currentPath];
      const newPath = args[0];
      if (newPath === "..") {
        const parts = currentPath.replace("> ", "").split("\\");
        if (parts.length > 1) {
          parts.pop();
          setCurrentPath(parts.join("\\") + "> ");
        }
      } else {
        setCurrentPath(currentPath.replace("> ", "") + "\\" + newPath + "> ");
      }
      return [];
    },
    color: (args) => {
      if (args.length === 0) return ["Current theme: " + terminalSettings.theme];
      const theme = args[0].toLowerCase();
      if (["dark", "light", "blue", "green"].includes(theme)) {
        setTerminalSettings({ theme });
        return [`Theme changed to: ${theme}`];
      }
      return ["Available themes: dark, light, blue, green"];
    },
    exit: () => ["Terminal session ended."],
  };

  const executeCommand = (input) => {
    const trimmed = input.trim();
    if (!trimmed) return;

    let history = [
      ...terminalHistory,
      { type: "command", content: currentPath + trimmed },
    ];

    const [cmd, ...args] = trimmed.split(" ");
    const action = commands[cmd.toLowerCase()];

    if (action) {
      const result = action(args);
      if (result === "__CLEAR__") {
        setTerminalHistory([]);
        return;
      }
      if (Array.isArray(result) && result.length) {
        history = [...history, ...result.map((line) => ({ type: "output", content: line }))];
      }
    } else {
      history.push({
        type: "error",
        content: `'${cmd}' is not recognized as an internal or external command.`,
      });
    }

    setTerminalHistory(history);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    executeCommand(currentInput);
    setCurrentInput("");
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  return (
    <div className="p-4 w-full h-full flex flex-col text-white font-mono">
      <div className="flex-1 overflow-hidden">
        <div
          className="w-full h-full overflow-y-auto cursor-text relative"
          onClick={() => inputRef.current?.focus()}
          ref={terminalRef}
        >
          <div className="absolute top-0 right-0 flex gap-2 p-2">
            <button onClick={copyTerminalContent} className="p-1 hover:bg-white/20 rounded">
              <IconCopy size={16} />
            </button>
            <button onClick={clearTerminal} className="p-1 hover:bg-white/20 rounded">
              <IconTrash size={16} />
            </button>
          </div>

          <div className="px-1 pt-6 space-y-1 text-sm">
            {terminalHistory.map((item, i) => (
              <div key={i} className={item.type === "error" ? "text-red-400" : ""}>
                {item.content}
              </div>
            ))}

            <form onSubmit={handleInputSubmit} className="flex items-center">
              <span className="mr-1">{currentPath}</span>
              <input
                ref={inputRef}
                className="bg-transparent outline-none flex-1 caret-white"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                autoFocus
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
