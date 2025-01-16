import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
interface ContentRendererProps {
  content: JSONContent;
}
export const ContentRenderer = ({ content }: ContentRendererProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editable: false,
    immediatelyRender: false,
  });

  return <EditorContent editor={editor} />;
};
