import { Editor } from "@tiptap/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Toggle } from "../ui/toggle";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  ListIcon,
  ListOrdered,
  LucideProps,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Button } from "../ui/button";

interface propTypes {
  editor: Editor | null;
}

type TMenuBarToggle = {
  pressed?: boolean | undefined;
  onPressedChange: () => void;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  iconClassname?: string | boolean | undefined;
  tooltipContent: string;
  disabled?: boolean | undefined;
};

export default function MenuBar({ editor }: propTypes) {
  const menuBarToggleList: TMenuBarToggle[] = [
    {
      pressed: editor?.isActive("bold"),
      onPressedChange: () => editor?.chain().focus().toggleBold().run(),
      icon: Bold,
      iconClassname: editor?.isActive("bold") && "text-primary bg-primary/10",
      tooltipContent: "Bold",
    },
    {
      pressed: editor?.isActive("italic"),
      onPressedChange: () => editor?.chain().focus().toggleItalic().run(),
      icon: Italic,
      iconClassname: editor?.isActive("italic") && "text-primary bg-primary/10",
      tooltipContent: "Italic",
    },
    {
      pressed: editor?.isActive("strike"),
      onPressedChange: () => editor?.chain().focus().toggleStrike().run(),
      icon: Strikethrough,
      iconClassname: editor?.isActive("strike") && "text-primary bg-primary/10",
      tooltipContent: "Strikethrough",
    },
    {
      pressed: editor?.isActive("heading", { level: 1 }),
      onPressedChange: () =>
        editor?.chain().focus().toggleHeading({ level: 1 }).run(),
      icon: Heading1,
      iconClassname:
        editor?.isActive("heading", { level: 1 }) &&
        "text-primary bg-primary/10",
      tooltipContent: "Heading 1",
    },
    {
      pressed: editor?.isActive("heading", { level: 2 }),
      onPressedChange: () =>
        editor?.chain().focus().toggleHeading({ level: 2 }).run(),
      icon: Heading2,
      iconClassname:
        editor?.isActive("heading", { level: 2 }) &&
        "text-primary bg-primary/10",
      tooltipContent: "Heading 2",
    },
    {
      pressed: editor?.isActive("heading", { level: 3 }),
      onPressedChange: () =>
        editor?.chain().focus().toggleHeading({ level: 3 }).run(),
      icon: Heading3,
      iconClassname:
        editor?.isActive("heading", { level: 3 }) &&
        "text-primary bg-primary/10",
      tooltipContent: "Heading 3",
    },
    {
      pressed: editor?.isActive("bulletList"),
      onPressedChange: () => editor?.chain().focus().toggleBulletList().run(),
      icon: ListIcon,
      iconClassname:
        editor?.isActive("bulletList") && "text-primary bg-primary/10",
      tooltipContent: "Bullet List",
    },
    {
      pressed: editor?.isActive("orderedList"),
      onPressedChange: () => editor?.chain().focus().toggleOrderedList().run(),
      icon: ListOrdered,
      iconClassname:
        editor?.isActive("orderedList") && "text-primary bg-primary/10",
      tooltipContent: "Ordered List",
    },
    {
      pressed: editor?.isActive({ textAlign: "left" }),
      onPressedChange: () =>
        editor?.chain().focus().toggleTextAlign("left").run(),
      icon: AlignLeft,
      iconClassname:
        editor?.isActive({ textAlign: "left" }) && "text-primary bg-primary/10",
      tooltipContent: "Align Left",
    },
    {
      pressed: editor?.isActive({ textAlign: "center" }),
      onPressedChange: () =>
        editor?.chain().focus().toggleTextAlign("center").run(),
      icon: AlignCenter,
      iconClassname:
        editor?.isActive({ textAlign: "center" }) &&
        "text-primary bg-primary/10",
      tooltipContent: "Align Center",
    },
    {
      pressed: editor?.isActive({ textAlign: "right" }),
      onPressedChange: () =>
        editor?.chain().focus().toggleTextAlign("right").run(),
      icon: AlignRight,
      iconClassname:
        editor?.isActive({ textAlign: "right" }) &&
        "text-primary bg-primary/10",
      tooltipContent: "Align Right",
    },
    {
      onPressedChange: () => editor?.chain().focus().undo().run(),
      disabled: !editor?.can().undo(),
      icon: Undo,
      tooltipContent: "Undo",
    },
    {
      onPressedChange: () => editor?.chain().focus().redo().run(),
      disabled: !editor?.can().redo(),
      icon: Redo,
      tooltipContent: "Redo",
    },
  ];

  return (
    <div className="border boder-input rounded-t-lg border-t-0 border-x-0 p-2 bg-card flex flex-wrap gap-1 items-center">
      <TooltipProvider>
        <div className="flex flex-wrap gap-1">
          {menuBarToggleList.slice(0, 8).map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={item.pressed}
                  onPressedChange={item.onPressedChange}
                >
                  {<item.icon className={cn(item.iconClassname)} />}
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>{item.tooltipContent}</TooltipContent>
            </Tooltip>
          ))}
        </div>

        <div className="w-px h-6 bg-border mx-2" />

        <div className="flex flex-wrap gap-1">
          {menuBarToggleList.slice(8, 11).map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={item.pressed}
                  onPressedChange={item.onPressedChange}
                >
                  {<item.icon className={cn(item.iconClassname)} />}
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>{item.tooltipContent}</TooltipContent>
            </Tooltip>
          ))}
        </div>

        <div className="w-px h-6 bg-border mx-2" />

        <div className="flex flex-wrap gap-1">
          {menuBarToggleList.slice(11).map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  type="button"
                  onClick={item.onPressedChange}
                  disabled={item.disabled}
                >
                  {<item.icon />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{item.tooltipContent}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}
