import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import type { Editor as TiptapEditor, EditorOptions } from '@tiptap/react';
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
import { TextAlign } from '@tiptap/extension-text-align';
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  PilcrowIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SquareCodeIcon,
  StrikethroughIcon,
  TextQuoteIcon,
  Undo2Icon,
  WrapTextIcon,
  YoutubeIcon,
} from 'lucide-react';
import { Separator } from '@/react/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/react/tooltip';
import { cn } from '@/lib/utils';

/* -----------------------------------------------------------------------------
 * Component: Editor
 * -------------------------------------------------------------------------- */

export interface EditorProps
  extends Omit<EditorOptions, 'editorProps' | 'extensions'> {
  className?: string;
  classNames?: {
    root?: string;
    editor?: string;
    menuBar?: string;
  };
}

export const Editor = React.forwardRef<HTMLDivElement, EditorProps>(
  ({ classNames, className, ...props }, forwardedRef) => {
    const editor = useEditor({
      ...props,
      editorProps: {
        attributes: {
          class: twMerge(
            'prose prose-sm dark:prose-invert sm:prose-base max-w-full p-4 focus:outline-none',
            classNames?.editor,
          ),
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
            class: 'w-full h-auto aspect-video',
          },
        }),
        Highlight,
        TaskItem,
        TaskList,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
      ],
    });

    return (
      <>
        {editor ? (
          <div
            className={cn(
              'divide-y rounded-md border',
              className,
              classNames?.root,
            )}
            data-test-id="root"
            ref={forwardedRef}
          >
            <MenuBar
              className={cn('bg-background p-1', classNames?.menuBar)}
              data-test-id="menu-bar"
              editor={editor}
            />

            <EditorContent
              className={cn(
                'overflow-hidden focus-within:rounded focus-within:ring',
              )}
              editor={editor}
            />
          </div>
        ) : null}
      </>
    );
  },
);

Editor.displayName = 'Editor';

/* -----------------------------------------------------------------------------
 * Component: MenuBar
 * -------------------------------------------------------------------------- */

type Item =
  | {
      icon: React.ReactNode;
      title: string;
      shortcut?: string;
      action: () => boolean;
      isActive?: () => boolean;
      type?: undefined;
    }
  | {
      type: 'divider';
    };

export interface MenuBarProps {
  className?: string;
  editor: TiptapEditor;
}

export function MenuBar({
  className,
  editor,
}: MenuBarProps): React.JSX.Element {
  const addImage = React.useCallback(() => {
    // eslint-disable-next-line no-alert -- work in progress
    const url = window.prompt('URL');

    if (url) {
      return editor.chain().focus().setImage({ src: url }).run();
    }

    return false;
  }, [editor]);

  const addYoutubeVideo = React.useCallback(() => {
    // eslint-disable-next-line no-alert -- work in progress
    const url = window.prompt('URL');

    if (url) {
      return editor
        .chain()
        .focus()
        .setYoutubeVideo({
          src: url,
          width: 640,
          height: 480,
        })
        .run();
    }

    return false;
  }, [editor]);

  const items: Item[] = [
    {
      icon: <BoldIcon absoluteStrokeWidth size={18} strokeWidth={1.25} />,
      title: 'Bold',
      // Cmd B
      shortcut: '⌘B',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: <ItalicIcon absoluteStrokeWidth size={18} strokeWidth={1.25} />,
      title: 'Italic',
      // Cmd I
      shortcut: '⌘I',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      icon: (
        <StrikethroughIcon absoluteStrokeWidth size={18} strokeWidth={1.25} />
      ),
      title: 'Strike',
      // Cmd Shift X
      shortcut: '⌘⇧X',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      icon: <CodeIcon absoluteStrokeWidth size={18} strokeWidth={1.25} />,
      title: 'Code',
      // Cmd E
      shortcut: '⌘E',
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive('code'),
    },
    {
      icon: (
        <HighlighterIcon absoluteStrokeWidth size={18} strokeWidth={1.25} />
      ),
      title: 'Highlight',
      // Cmd Shift H
      shortcut: '⌘⇧H',
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive('highlight'),
    },
    {
      type: 'divider',
    },
    {
      icon: <AlignLeftIcon absoluteStrokeWidth size={18} strokeWidth={1.25} />,
      title: 'Align Left',
      // Cmd Shift L
      shortcut: '⌘⇧L',
      action: () => editor.chain().focus().setTextAlign('left').run(),
      isActive: () => editor.isActive({ textAlign: 'left' }),
    },
    {
      icon: (
        <AlignCenterIcon absoluteStrokeWidth size={18} strokeWidth={1.25} />
      ),
      title: 'Align Center',
      // Cmd Shift E
      shortcut: '⌘⇧E',
      action: () => editor.chain().focus().setTextAlign('center').run(),
      isActive: () => editor.isActive({ textAlign: 'center' }),
    },
    {
      icon: <AlignRightIcon absoluteStrokeWidth size={18} strokeWidth={1.25} />,
      title: 'Align Right',
      // Cmd Shift R
      shortcut: '⌘⇧R',
      action: () => editor.chain().focus().setTextAlign('right').run(),
      isActive: () => editor.isActive({ textAlign: 'right' }),
    },
    {
      icon: (
        <AlignJustifyIcon absoluteStrokeWidth size={18} strokeWidth={1.25} />
      ),
      title: 'Align Justify',
      shortcut: '⌘⇧J',
      action: () => editor.chain().focus().setTextAlign('justify').run(),
      isActive: () => editor.isActive({ textAlign: 'justify' }),
    },
    {
      type: 'divider',
    },
    {
      icon: <Heading1Icon absoluteStrokeWidth size={18} strokeWidth={1.25} />,
      title: 'Heading 1',
      // Cmd Opt 1
      shortcut: '⌘⌥1',
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      icon: <Heading2Icon absoluteStrokeWidth size={18} strokeWidth={1.25} />,
      title: 'Heading 2',
      // Cmd Opt 2
      shortcut: '⌘⌥2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      icon: <Heading3Icon absoluteStrokeWidth size={18} strokeWidth={1.25} />,
      title: 'Heading 3',
      // Cmd Opt 3
      shortcut: '⌘⌥3',
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive('heading', { level: 3 }),
    },
    {
      icon: <Heading4Icon absoluteStrokeWidth size={18} strokeWidth={1.25} />,
      title: 'Heading 4',
      // Cmd Opt 4
      shortcut: '⌘⌥4',
      action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      isActive: () => editor.isActive('heading', { level: 4 }),
    },
    {
      icon: <PilcrowIcon absoluteStrokeWidth size={18} strokeWidth={1.25} />,
      title: 'Paragraph',
      // Cmd Opt 0
      shortcut: '⌘⌥0',
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive('paragraph'),
    },
    {
      icon: <ListIcon absoluteStrokeWidth size={18} strokeWidth={1.25} />,
      title: 'Bullet List',
      // Cmd Shift 8
      shortcut: '⌘⇧8',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      icon: (
        <ListOrderedIcon absoluteStrokeWidth size={18} strokeWidth={1.25} />
      ),
      title: 'Ordered List',
      // Cmd Shift 7
      shortcut: '⌘⇧7',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
    /* {
      icon: <ListTodoIcon absoluteStrokeWidth size={18} strokeWidth={1.25} />,
      title: 'Task List',
      // Cmd Shift 9
      shortcut: '⌘⇧9',
      action: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive('taskList'),
    }, */
    {
      icon: <SquareCodeIcon absoluteStrokeWidth size={18} strokeWidth={1.25} />,
      title: 'Code Block',
      // Cmd Opt C
      shortcut: '⌘⌥C',
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock'),
    },
    {
      type: 'divider',
    },
    {
      icon: <TextQuoteIcon absoluteStrokeWidth size={18} strokeWidth={1.25} />,
      title: 'Blockquote',
      // Cmd Shift B
      shortcut: '⌘⇧B',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      icon: <ImageIcon absoluteStrokeWidth size={18} strokeWidth={1.25} />,
      title: 'Image',
      action: addImage,
    },
    {
      icon: <YoutubeIcon absoluteStrokeWidth size={18} strokeWidth={1.25} />,
      title: 'YouTube',
      action: addYoutubeVideo,
    },
    {
      icon: <MinusIcon absoluteStrokeWidth size={18} strokeWidth={1.25} />,
      title: 'Horizontal Rule',
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      type: 'divider',
    },
    {
      icon: <WrapTextIcon absoluteStrokeWidth size={18} strokeWidth={1.25} />,
      title: 'Hard Break',
      // Shift Enter
      shortcut: '⇧↩',
      action: () => editor.chain().focus().setHardBreak().run(),
    },
    {
      icon: (
        <RemoveFormattingIcon
          absoluteStrokeWidth
          size={18}
          strokeWidth={1.25}
        />
      ),
      title: 'Clear Format',
      action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    },
    {
      type: 'divider',
    },
    {
      icon: <Undo2Icon absoluteStrokeWidth size={18} strokeWidth={1.25} />,
      title: 'Undo',
      // Cmd Z
      shortcut: '⌘Z',
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: <Redo2Icon absoluteStrokeWidth size={18} strokeWidth={1.25} />,
      title: 'Redo',
      // Cmd Shift Z
      shortcut: '⌘⇧Z',
      action: () => editor.chain().focus().redo().run(),
    },
  ];

  return (
    <div
      className={cn('flex flex-wrap items-center gap-x-1 gap-y-1', className)}
    >
      {items.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key -- it's fine
        <React.Fragment key={index}>
          {item.type === 'divider' ? (
            <Separator className="h-4" orientation="vertical" />
          ) : (
            <MenuItem {...item} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Component: MenuItem
 * -------------------------------------------------------------------------- */

export interface MenuItemProps {
  action: () => boolean;
  className?: string;
  icon: React.ReactNode;
  isActive?: () => boolean;
  shortcut?: string;
  title: string;
}

export function MenuItem({
  action,
  className,
  icon,
  isActive,
  shortcut,
  title,
}: MenuItemProps): React.JSX.Element {
  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          'text-accent-foreground bg-accent rounded p-1.5 transition',
          isActive?.()
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-primary hover:text-primary-foreground',
          className,
        )}
        onClick={action}
      >
        {icon}
      </TooltipTrigger>
      <TooltipContent className="flex items-center gap-2">
        <span>{title}</span>
        {shortcut ? (
          <span className="text-accent-foreground opacity-50">{shortcut}</span>
        ) : null}
      </TooltipContent>
    </Tooltip>
  );
}
