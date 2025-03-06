import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { ControllerRenderProps } from "react-hook-form";
import { MenuBar } from "./MenuBar";
import { useEffect } from "react";

interface iAppProps {
  field: ControllerRenderProps;
}

export function JobDescriptionEditor({ field }: iAppProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3], // Enable headings with levels 1, 2, and 3
        },
        bulletList: false, // Disable default bullet list to use custom configuration
        orderedList: false, // Disable default ordered list to use custom configuration
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"], // Allow text alignment for headings and paragraphs
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc list-outside pl-5", // Customize bullet list styling
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal list-outside pl-5", // Customize ordered list styling
        },
      }),
      ListItem, // Required for bullet and ordered lists
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] p-4 max-w-none dark:prose-invert",
      },
    },
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON())); // Update form field value on editor change
    },
    content: field.value ? JSON.parse(field.value) : "", // Initialize editor content from field value
  });
  useEffect(() => {
    if (editor) {
      window.editor = editor;
    }
  }, [editor]);

  return (
    <div className="w-full border rounded-lg overflow-hidden bg-card">
      <MenuBar editor={editor} /> {/* Pass the editor instance to MenuBar */}
      <EditorContent editor={editor} /> {/* Render the editor content */}
    </div>
  );
}
