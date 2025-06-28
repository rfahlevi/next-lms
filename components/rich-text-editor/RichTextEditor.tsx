import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import TextAlign from "@tiptap/extension-text-align";
import { ControllerRenderProps } from "react-hook-form";

export default function RichTextEditor({
  field,
}: {
  field: ControllerRenderProps<any, string>;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] p-4 focus:outline-none prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert !w-full !max-w-none !text-sm !leading-[4px]",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },
    content: field.value ? JSON.parse(field.value) : "",
  });

  return (
    <div className="w-full border border-input rounded-lg overflow-hidden dark:bg-input/30">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
