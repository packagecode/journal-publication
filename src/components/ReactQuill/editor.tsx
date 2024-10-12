import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  value: string;
  withHeading?: boolean;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const colors = [
  "#000000",
  "#e60000",
  "#ff9900",
  "#ffff00",
  "#008a00",
  "#0066cc",
  "#9933ff",
  "#ffffff",
  "#facccc",
  "#ffebcc",
  "#ffffcc",
  "#cce8cc",
  "#cce0f5",
  "#ebd6ff",
  "#bbbbbb",
  "#f06666",
  "#ffc266",
  "#ffff66",
  "#66b966",
  "#66a3e0",
  "#c285ff",
  "#888888",
  "#a10000",
  "#b26b00",
  "#b2b200",
  "#006100",
  "#0047b2",
  "#6b24b2",
  "#444444",
  "#5c0000",
  "#663d00",
  "#666600",
  "#003700",
  "#002966",
  "#3d1466",
];

const modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ color: colors }, { background: colors }],
      ["link", "image", "video"],
      ["code-block"],
      ["clean"],
    ],
  },
};

const withOutHeadingModule = {
  toolbar: {
    container: [
      [{ font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ color: colors }, { background: colors }],
      ["link"],
      ["code-block"],
      ["clean"],
    ],
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "code-block",
  "color",
  "background",
];

const Editor: React.FC<EditorProps> = ({
  value,
  onChange,
  placeholder,
  withHeading,
}) => {
  const [editorHtml, setEditorHtml] = useState(value);
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    setEditorHtml(value);
  }, [value]);

  const handleChange = (html: string) => {
    setEditorHtml(html);
    if (onChange) {
      onChange(html);
    }
  };

  // Attempt to access Quill instance directly
  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.on("text-change", () => {
        if (onChange) {
          onChange(quill.root.innerHTML);
        }
      });
    }
  }, []);

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={editorHtml}
        onChange={handleChange}
        modules={withHeading ? modules : withOutHeadingModule}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Editor;
