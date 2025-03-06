// global.d.ts
import { Editor } from "@tiptap/react";

declare global {
  interface Window {
    editor: Editor;
  }
}