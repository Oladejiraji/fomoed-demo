import React from "react";
import { DraggableHandle } from "./draggable-handle";

const SHADOW =
  "shadow-[0px_0px_0px_1px_#FFFFFF0A_inset,0px_2px_0px_0px_#FFFFFF14_inset,0px_0px_0px_1px_#00000029,0px_1px_1px_-0.5px_#0000002E,0px_3px_3px_-1.5px_#0000002E,0px_6px_6px_-3px_#00000040,0px_12px_12px_-6px_#0000002E]";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const DraggableWidget = React.forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-2xl overflow-hidden relative group ${SHADOW} ${className ?? ""}`}
        {...props}
      >
        {children}
        <DraggableHandle />
      </div>
    );
  }
);

DraggableWidget.displayName = "DraggableWidget";
