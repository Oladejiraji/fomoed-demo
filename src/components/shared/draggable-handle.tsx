import React from "react";

export function DraggableHandle() {
  return (
    <div className="absolute top-1 left-[50%] -translate-x-[50%] z-99 pt-1 pb-1 px-1 app_drag_handle cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity duration-50">
      <div className="w-12 h-1.25 bg-[#D4D4D4] rounded-[20px]"></div>
    </div>
  );
}
