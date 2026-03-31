import React, { useMemo, useState } from "react";
import { useSetAtom } from "jotai";
import { widgetSizeAtom } from "@/lib/atoms/widget";
import {
  AddIndicator,
  AeveIcon,
  CaretDown,
  ConnectMore,
  CustomiseWidget,
  EllipsisIcon,
  LargeIcon,
  MediumIcon,
  QuestionIcon,
  SmallIcon,
} from "@/icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

function Content() {
  const [open, setOpen] = useState(false);
  const setSize = useSetAtom(widgetSizeAtom);
  const popoverOptions = useMemo(() => {
    const up = [
      {
        id: 1,
        label: "Small",
        icon: <SmallIcon />,
        onclick: () => setSize("small"),
      },
      {
        id: 2,
        label: "Medium",
        icon: <MediumIcon />,
        onclick: () => setSize("medium"),
      },
      {
        id: 3,
        label: "Large",
        icon: <LargeIcon />,
        onclick: () => setSize("large"),
      },
      {
        id: 4,
        label: "Customize Widget",
        icon: <CustomiseWidget />,
        onclick: () => {},
      },
    ];

    const down = [
      {
        id: 1,
        label: "Connect More",
        icon: <ConnectMore />,
        onclick: () => {},
      },
      {
        id: 2,
        label: "Add Indicator",
        icon: <AddIndicator />,
        onclick: () => {},
      },
    ];
    return {
      up,
      down,
    };
  }, [setSize]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="w-6 h-6 rounded-full flex justify-center items-center bg-[#161718] cursor-pointer"
        >
          <EllipsisIcon />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        className="w-52.5 ml-8 -mt-3 bg-[#111213] border border-[#202021] rounded-xl p-1.5 flex flex-col gap-0"
        align="start"
      >
        {popoverOptions?.up?.map((item) => {
          return (
            <button
              key={item?.id}
              type="button"
              className="rounded-md overflow-hidden hover:bg-[#1B1C1D] cursor-pointer"
              onClick={() => {
                item?.onclick();
                setOpen(false);
              }}
            >
              <div className="flex items-center gap-1.5 p-1.75 ">
                <div className="w-5 h-5 flex justify-center items-center">
                  {item?.icon}
                </div>
                <p className="text-[#D0D6E0] text-[13px] leading-4">
                  {item?.label}
                </p>
              </div>
            </button>
          );
        })}
        <div className="w-full h-px bg-[#202021]"></div>
        {popoverOptions?.down?.map((item) => {
          return (
            <button
              key={item?.id}
              type="button"
              className="rounded-md overflow-hidden hover:bg-[#1B1C1D] cursor-pointer"
              onClick={() => {
                item?.onclick();
                setOpen(false);
              }}
            >
              <div className="flex items-center gap-1.5 p-1.75 ">
                <div className="w-5 h-5 flex justify-center items-center">
                  {item?.icon}
                </div>
                <p className="text-[#D0D6E0] text-[13px] leading-4">
                  {item?.label}
                </p>
              </div>
            </button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}

export function Header() {
  return (
    <div className="h-12 shadow-[0_2px_2px_0_rgba(0,0,0,0.25)] bg-[#111213] flex items-center justify-between px-3">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-[#9391F7] flex justify-center items-center rounded-sm">
          <AeveIcon />
        </div>
        <div className="flex items-center gap-0.5">
          <div className="flex items-center gap-1">
            <p className="text-[#D0D6E0] font-medium text-xs tracking-[-0.004em] leading-none">
              Aave
            </p>
            <p className="text-[#D0D6E066] text-[10px] tracking-[-0.004em] leading-none">
              Perps
            </p>
          </div>
          <button
            type="button"
            className="w-4 h-4 flex justify-center items-center"
          >
            <CaretDown />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          className="w-6 h-6 flex justify-center items-center"
        >
          <QuestionIcon />
        </button>
        <Content />
      </div>
    </div>
  );
}
