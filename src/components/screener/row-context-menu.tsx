import { ReactNode } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { ChartIcon, FileIcon, StarIcon } from "@/icons";

interface RowContextMenuProps {
  children: ReactNode;
  isFavourited: boolean;
  onToggleFavourite: () => void;
  onOpenNews?: () => void;
  onOpenChart?: () => void;
}

export function RowContextMenu({
  children,
  isFavourited,
  onToggleFavourite,
  onOpenNews,
  onOpenChart,
}: RowContextMenuProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div>{children}</div>
      </ContextMenuTrigger>
      <ContextMenuContent
        className="bg-[#212121] border border-[#363636] p-1.5 min-w-60"
        style={{
          boxShadow:
            "0px 0px 0px 1px #1111110F, 0px 24px 40px 0px #0000000A, 0px 16px 28px 0px #0000000A, 0px 4px 6px 0px #0000000A, 0px 0px 2px 0px #0000000A",
        }}
      >
        <ContextMenuItem
          onSelect={onToggleFavourite}
          className="text-white text-[13px] py-2 gap-1.5 cursor-pointer hover:bg-[#323232]! hover:text-white! rounded-[6px]"
        >
          <StarIcon />
          <span>
            {isFavourited ? "Remove from favorites" : "Add to favorites"}
          </span>
        </ContextMenuItem>
        <ContextMenuItem
          onSelect={onOpenNews}
          className="text-white text-[13px] py-2 gap-1.5 cursor-pointer hover:bg-[#323232]! hover:text-white! rounded-[6px]"
        >
          <FileIcon />
          <span>Open in news widget</span>
        </ContextMenuItem>
        <ContextMenuItem
          onSelect={onOpenChart}
          className="text-white text-[13px] py-2 gap-1.5 cursor-pointer hover:bg-[#323232]! hover:text-white! rounded-[6px]"
        >
          <ChartIcon />
          <span>Open in price chart</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
