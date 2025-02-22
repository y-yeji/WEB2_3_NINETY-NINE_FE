import { useMemo } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "../../css/quill.css";
import ReactModule from "../../utils/QuillModule";

const ReactEditor = () => {
  const formats: string[] = [
    "header",
    "size",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "indent",
    "link",
    "image",
    "color",
    "background",
    "align",
    "script",
  ];

  const modules: {} = useMemo(
    () => ({
      toolbar: {
        container: "#toolBar",
      },
    }),
    []
  );

  return (
    <div>
      <div
        id="toolBar"
        className="flex justify-starter items-center w-full gap-2 border-b-0 rounded-t-[8px] "
      >
        <ReactModule />
      </div>
      <ReactQuill theme="snow" modules={modules} formats={formats} />
    </div>
  );
};

export default ReactEditor;
