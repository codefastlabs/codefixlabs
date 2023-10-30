import * as React from 'react';
import { forwardRef, Fragment } from 'react';
import { twMerge } from 'tailwind-merge';
import type { Editor as TiptapEditor } from '@tiptap/react';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { TableRow } from '@tiptap/extension-table-row';
import { Table } from '@tiptap/extension-table';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { Image } from '@tiptap/extension-image';
import { Youtube } from '@tiptap/extension-youtube';
import { Highlight } from '@tiptap/extension-highlight';
import { TaskItem } from '@tiptap/extension-task-item';
import { TaskList } from '@tiptap/extension-task-list';
import { BoldIcon, ItalicIcon } from 'lucide-react';

export const Editor = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'> & {
    classNames?: {
      root?: string;
      editor?: string;
      menuBar?: string;
    };
  }
>(({ classNames, className, content, ...props }, forwardedRef) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          'prose prose-sm max-w-full dark:prose-invert sm:prose-base lg:prose-lg focus:outline-none',
      },
    },
    extensions: [
      StarterKit,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      Youtube.configure({
        HTMLAttributes: {
          class: 'w-full aspect-video',
        },
      }),
      Highlight,
      TaskItem,
      TaskList,
    ],
    content,
  });

  return (
    <div
      className={twMerge(
        'divide-y rounded-md border',
        className,
        classNames?.root,
      )}
      ref={forwardedRef}
      {...props}
    >
      {editor ? (
        <MenuBar
          className={twMerge('bg-border p-2', classNames?.menuBar)}
          editor={editor}
        />
      ) : null}

      <EditorContent
        className={twMerge('p-4', classNames?.editor)}
        editor={editor}
      />
    </div>
  );
});

Editor.displayName = 'Editor';

export function MenuBar({
  className,
  editor,
}: {
  className?: string;
  editor: TiptapEditor;
}): React.JSX.Element {
  const items = [
    {
      icon: <BoldIcon className="h-4 w-4" />,
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: <ItalicIcon className="h-4 w-4" />,
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      icon: 'strikethrough',
      title: 'Strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      icon: 'code-view',
      title: 'Code',
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive('code'),
    },
    {
      icon: 'mark-pen-line',
      title: 'Highlight',
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive('highlight'),
    },
    {
      type: 'divider',
    },
    {
      icon: 'h-1',
      title: 'Heading 1',
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      icon: 'h-2',
      title: 'Heading 2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      icon: 'paragraph',
      title: 'Paragraph',
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive('paragraph'),
    },
    {
      icon: 'list-unordered',
      title: 'Bullet List',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      icon: 'list-ordered',
      title: 'Ordered List',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
    {
      icon: 'list-check-2',
      title: 'Task List',
      action: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive('taskList'),
    },
    {
      icon: 'code-box-line',
      title: 'Code Block',
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock'),
    },
    {
      type: 'divider',
    },
    {
      icon: 'double-quotes-l',
      title: 'Blockquote',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      icon: 'separator',
      title: 'Horizontal Rule',
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      type: 'divider',
    },
    {
      icon: 'text-wrap',
      title: 'Hard Break',
      action: () => editor.chain().focus().setHardBreak().run(),
    },
    {
      icon: 'format-clear',
      title: 'Clear Format',
      action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    },
    {
      type: 'divider',
    },
    {
      icon: 'arrow-go-back-line',
      title: 'Undo',
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: 'arrow-go-forward-line',
      title: 'Redo',
      action: () => editor.chain().focus().redo().run(),
    },
  ];

  return (
    <div className={twMerge('flex flex-wrap gap-x-3 gap-y-1', className)}>
      {items.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key -- it's fine
        <Fragment key={index}>
          {item.type === 'divider' ? <div>|</div> : <MenuItem {...item} />}
        </Fragment>
      ))}
    </div>
  );
}

export function MenuItem({
  className,
  icon,
  title,
  action,
  isActive,
}: {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  action?: () => void;
  isActive?: () => boolean;
}): React.JSX.Element {
  return (
    <button
      className={twMerge(isActive?.() ? 'text-sky-500' : '', className)}
      onClick={action}
      title={title}
      type="button"
    >
      {icon}
    </button>
  );
}
