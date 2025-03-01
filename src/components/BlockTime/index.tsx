'use client'

import { useContext } from "react";
import BlockItem from "./BlockItem";
import { ReservationContext } from "@/contexts/ReservationsContext";
import { BlockTime as BlockTimeType } from "@/types/BlockTime";

type BlockTimeProps = {
  totalHeight?: number
}

export default function BlockTime (props : BlockTimeProps) {
  const { 
    totalHeight = 1440 
  } = props
  const { reservationsList, reservationsLoading } = useContext(ReservationContext)

  return (
    <div className="flex h-fit w-fit relative" style={{ height: `${totalHeight}px` }} >
      <div 
        className={`w-12 flex border border-gray-700 flex-col rounded-md items-center absolute z-0`}
        style={{ height: `${totalHeight}px` }} 
      >
       {Array.from({ length: 24 }).map((_, hour) => (
          <div
            key={`hour-${hour}h`}
            className={`text-center w-8 text-sm pr-1 ${hour !== 23 && 'border-b'}`}
            style={{
              height: `${100 / 24}%`,
            }}
          >
            {hour}h
          </div>
       ))}
     </div>

     {
        !reservationsLoading &&
          <div className="bg-white opacity-75 z-[1]">
            {reservationsList.map((block: BlockTimeType, index: number) => (
              <BlockItem 
                block={block} 
                key={`blocktime-item-${index}`}
                totalHeight={totalHeight}
              />
            ))}
          </div>
     }
    </div>
  );
}