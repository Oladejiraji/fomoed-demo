"use client";
import React, { useEffect, useRef, useState } from "react";
import { DashboardGridLayout } from "@/components/dashboard/dashboard-grid-layout";

export default function Page() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.getBoundingClientRect().width);
    }
  }, []);

  return (
    <div ref={ref} className="flex-1 bg flex overflow-hidden">
      {width && <DashboardGridLayout initialWidth={width} />}
    </div>
  );
}
