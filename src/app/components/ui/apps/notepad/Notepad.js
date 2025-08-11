import { useState, useRef, useEffect } from "react";
import {
  IconDeviceFloppy,
  IconFolderOpen,
  IconPrinter,
  IconSearch,
  IconReplace,
  IconCut,
  IconCopy,
  IconClipboard,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconZoomIn,
  IconZoomOut,
  IconTextWrap,
  IconListSearch,
  IconSelectAll,
} from "@tabler/icons-react";

const Notepad = () => {
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState("Untitled");
  const [isModified, setIsModified] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [wordWrap, setWordWrap] = useState(true);
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleContentChange = (e) => {
    const newContent = e.target.value;

    setUndoStack((prev) => [...prev, content]);
    setRedoStack([]);

    setContent(newContent);
    setIsModified(true);
    updateUndoRedoState();
  };

  const updateUndoRedoState = useCallback(() => {
    setCanUndo(undoStack.length > 0);
    setCanRedo(redoStack.length > 0);
  }, [undoStack, redoStack]);

  useEffect(() => {
    updateUndoRedoState();
  }, [updateUndoRedoState]);

  const handleTextSelection = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      setSelectedText(content.substring(start, end));
    }
  };

  const handleOpen = () => {
    fileInputRef.current?.click();
  };

  const handleFileRead = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setContent(e.target.result);
        setFileName(file.name);
        setIsModified(false);
        setUndoStack([]);
        setRedoStack([]);
      };
      reader.readAsText(file);
    }
  };

  const handleSave = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.endsWith(".txt") ? fileName : fileName + ".txt";
    a.click();
    URL.revokeObjectURL(url);
    setIsModified(false);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head><title>${fileName}</title></head>
        <body><pre>${content}</pre></body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const lastState = undoStack[undoStack.length - 1];
      setRedoStack((prev) => [...prev, content]);
      setContent(lastState);
      setUndoStack((prev) => prev.slice(0, -1));
      setIsModified(true);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1];
      setUndoStack((prev) => [...prev, content]);
      setContent(nextState);
      setRedoStack((prev) => prev.slice(0, -1));
      setIsModified(true);
    }
  };

  const handleCut = () => {
    if (selectedText) {
      navigator.clipboard.writeText(selectedText);
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const newContent = content.substring(0, start) + content.substring(end);
      setContent(newContent);
      setIsModified(true);
    }
  };

  const handleCopy = () => {
    if (selectedText) {
      navigator.clipboard.writeText(selectedText);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const newContent =
        content.substring(0, start) + text + content.substring(end);
      setContent(newContent);
      setIsModified(true);
    } catch (err) {
      console.error("Failed to paste:", err);
    }
  };

  const handleSelectAll = () => {
    textareaRef.current?.select();
  };

  const handleFind = () => {
    if (findText) {
      const index = content.toLowerCase().indexOf(findText.toLowerCase());
      if (index !== -1) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(index, index + findText.length);
      } else {
        alert("Text not found");
      }
    }
  };

  const handleReplace = () => {
    if (findText && selectedText.toLowerCase() === findText.toLowerCase()) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const newContent =
        content.substring(0, start) + replaceText + content.substring(end);
      setContent(newContent);
      setIsModified(true);
    }
  };

  const handleReplaceAll = () => {
    if (findText) {
      const newContent = content.replace(
        new RegExp(findText, "gi"),
        replaceText
      );
      setContent(newContent);
      setIsModified(true);
    }
  };

  const handleZoomIn = () => {
    setFontSize((prev) => Math.min(prev + 2, 32));
  };

  const handleZoomOut = () => {
    setFontSize((prev) => Math.max(prev - 2, 8));
  };

  const handleWordWrap = () => {
    setWordWrap((prev) => !prev);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="px-2 py-1">
        <div className="flex gap-4 text-xs">
          <div className="relative group">
            <button className="px-2 py-1 hover:bg-black/40 rounded">
              File
            </button>
            <div className="absolute top-full left-0 bg-black/30 backdrop-blur-3xl shadow-[0_0_10px_rgba(120,102,140,0.2)] min-w-40 hidden group-hover:block z-10">
              <button
                onClick={handleOpen}
                className="w-full text-left px-3 py-1 hover:bg-black/40 flex items-center gap-2"
              >
                <IconFolderOpen size={16} /> Open
              </button>
              <button
                onClick={handleSave}
                className="w-full text-left px-3 py-1 hover:bg-black/40 flex items-center gap-2"
              >
                <IconDeviceFloppy size={16} /> Save
              </button>
              <button
                onClick={handlePrint}
                className="w-full text-left px-3 py-1 hover:bg-black/40 flex items-center gap-2"
              >
                <IconPrinter size={16} /> Print
              </button>
            </div>
          </div>
          <div className="relative group">
            <button className="px-2 py-1 hover:bg-black/40 rounded">
              Edit
            </button>
            <div className="absolute top-full left-0 bg-black/30 backdrop-blur-3xl shadow-[0_0_10px_rgba(120,102,140,0.2)] min-w-40 hidden group-hover:block z-10">
              <button
                onClick={handleUndo}
                disabled={!canUndo}
                className="w-full text-left px-3 py-1 hover:bg-black/40 flex items-center gap-2 disabled:opacity-50"
              >
                <IconArrowBackUp size={16} /> Undo
              </button>
              <button
                onClick={handleRedo}
                disabled={!canRedo}
                className="w-full text-left px-3 py-1 hover:bg-black/40 flex items-center gap-2 disabled:opacity-50"
              >
                <IconArrowForwardUp size={16} /> Redo
              </button>
              <button
                onClick={handleCut}
                className="w-full text-left px-3 py-1 hover:bg-black/40 flex items-center gap-2"
              >
                <IconCut size={16} /> Cut
              </button>
              <button
                onClick={handleCopy}
                className="w-full text-left px-3 py-1 hover:bg-black/40 flex items-center gap-2"
              >
                <IconCopy size={16} /> Copy
              </button>
              <button
                onClick={handlePaste}
                className="w-full text-left px-3 py-1 hover:bg-black/40 flex items-center gap-2"
              >
                <IconClipboard size={16} /> Paste
              </button>
              <button
                onClick={handleSelectAll}
                className="w-full text-left px-3 py-1 hover:bg-black/40 flex items-center gap-2"
              >
                <IconSelectAll size={16} />
                Select All
              </button>
              <button
                onClick={() => setShowFindReplace(true)}
                className="w-full text-left px-3 py-1 hover:bg-black/40 flex items-center gap-2"
              >
                <IconSearch size={16} /> Find & Replace
              </button>
            </div>
          </div>

          {/* View Menu */}
          <div className="relative group">
            <button className="px-2 py-1 hover:bg-black/30 rounded">
              View
            </button>
            <div className="absolute top-full left-0 bg-black/30 backdrop-blur-3xl shadow-[0_0_10px_rgba(120,102,140,0.2)] min-w-40 hidden group-hover:block z-10">
              <button
                onClick={handleZoomIn}
                className="w-full text-left px-3 py-1 hover:bg-black/40 flex items-center gap-2"
              >
                <IconZoomIn size={16} /> Zoom In
              </button>
              <button
                onClick={handleZoomOut}
                className="w-full text-left px-3 py-1 hover:bg-black/40 flex items-center gap-2"
              >
                <IconZoomOut size={16} /> Zoom Out
              </button>
              <button
                onClick={handleWordWrap}
                className="w-full text-left px-3 py-1 hover:bg-black/40 flex items-center gap-2"
              >
                <IconTextWrap size={16} /> Word Wrap {wordWrap ? "✓" : ""}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-2 py-1">
        <div className="flex items-center gap-2">
          <button
            onClick={handleOpen}
            className="p-1 hover:bg-black/40 rounded"
            title="Open"
          >
            <IconFolderOpen size={20} />
          </button>
          <button
            onClick={handleSave}
            className="p-1 hover:bg-black/40 rounded"
            title="Save"
          >
            <IconDeviceFloppy size={20} />
          </button>
          <div className="w-px h-6 bg-gray-700 mx-1"></div>
          <button
            onClick={handleUndo}
            disabled={!canUndo}
            className="p-1 hover:bg-black/40 rounded disabled:opacity-50"
            title="Undo"
          >
            <IconArrowBackUp size={20} />
          </button>
          <button
            onClick={handleRedo}
            disabled={!canRedo}
            className="p-1 hover:bg-black/40 rounded disabled:opacity-50"
            title="Redo"
          >
            <IconArrowForwardUp size={20} />
          </button>
          <div className="w-px h-6 bg-gray-700 mx-1"></div>
          <button
            onClick={handleCut}
            className="p-1 hover:bg-black/40 rounded"
            title="Cut"
          >
            <IconCut size={20} />
          </button>
          <button
            onClick={handleCopy}
            className="p-1 hover:bg-black/40 rounded"
            title="Copy"
          >
            <IconCopy size={20} />
          </button>
          <button
            onClick={handlePaste}
            className="p-1 hover:bg-black/40 rounded"
            title="Paste"
          >
            <IconClipboard size={20} />
          </button>
        </div>
      </div>

      {showFindReplace && (
        <div className="p-3 text-xs">
          <div className="flex items-center gap-2 mb-2">
            <label className="w-16">Find</label>
            <input
              type="text"
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
              className="outline-0 shadow-[0_0_10px_rgba(120,102,140,0.5)] rounded px-2 py-1 flex-1"
              placeholder="Enter text to find"
            />
            <button onClick={handleFind}>
              <IconListSearch size={15} />
            </button>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <label className="w-16">Replace</label>
            <input
              type="text"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              className="outline-0 shadow-[0_0_10px_rgba(120,102,140,0.5)] px-2 py-1 flex-1"
              placeholder="Enter replacement text"
            />
            <button onClick={handleReplace}>
              <IconReplace size={15} />
            </button>
          </div>
          <div className="flex items-center justify-end gap-2 mt-3">
            <button
              onClick={handleReplaceAll}
              className="px-3 py-1 rounded shadow-[0_0_10px_rgba(120,102,140,0.5)]"
            >
              Replace All
            </button>
            <button
              onClick={() => setShowFindReplace(false)}
              className="px-3 py-1 rounded shadow-[0_0_10px_rgba(120,102,140,0.5)]"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="text-white text-[10px] px-3 py-1 text-xs">
        <div className="flex justify-between">
          <span>
            {fileName}
            {isModified ? " *" : ""}
          </span>
          <span>
            Characters: {content.length} | Lines: {content.split("\n").length}
          </span>
        </div>
      </div>

      <div className="flex-1 p-2">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          onSelect={handleTextSelection}
          className="w-full h-full p-2 font-mono rounded shadow-[0_0_10px_rgba(120,102,140,0.5)] resize-none overflow-y-auto outline-none"
          style={{
            fontSize: `${fontSize}px`,
            whiteSpace: wordWrap ? "pre-wrap" : "pre",
            overflowWrap: wordWrap ? "break-word" : "normal",
          }}
          placeholder="Start typing..."
        />
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt"
        onChange={handleFileRead}
        className="hidden"
      />
    </div>
  );
};

export default Notepad;
