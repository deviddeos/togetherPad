import { useEffect, useRef, useState } from "react";
import { updateContent } from "../../services/noteApi";

const STATUS = {
  TYPING: "Typing",
  SAVING: "Saving...",
  SAVED: "Saved",
  FAILED: "Failed to save",
};

const STATUS_COLOR = {
  [STATUS.TYPING]: "text-gray-400",
  [STATUS.SAVING]: "text-yellow-500",
  [STATUS.SAVED]: "text-green-600",
  [STATUS.FAILED]: "text-red-500",
};

function NoteEditor({ note, accessToken }) {
  const [content, setContent] = useState(note.content);
  const [saveStatus, setSaveStatus] = useState(STATUS.SAVED);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setSaveStatus(STATUS.TYPING);

    const timer = setTimeout(() => {
      saveContent(content);
    }, 1000);

    return () => clearTimeout(timer);
  }, [content]);

  const saveContent = async (value) => {
    setSaveStatus(STATUS.SAVING);
    const token = accessToken ?? sessionStorage.getItem(`note-${note.slug}`);
    try {
      await updateContent(note.slug, value, token);
      setSaveStatus(STATUS.SAVED);
    } catch {
      setSaveStatus(STATUS.FAILED);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
        <span className="text-sm font-medium tracking-wide">TogetherPad</span>
        <span className={`text-sm ${STATUS_COLOR[saveStatus]}`}>
          ● {saveStatus}
        </span>
      </header>

      {/* Editor */}
      <textarea
        className="flex-1 w-full px-6 py-5 text-base leading-relaxed resize-none outline-none border-none bg-transparent placeholder-gray-300"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing..."
        autoFocus
      />
    </div>
  );
}

export default NoteEditor;
