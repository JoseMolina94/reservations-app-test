'use client'

import BlockItem from "./BlockItem";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type BlockTimeProps = {
  totalHeight?: number
}

export default function BlockTime (props : BlockTimeProps) {
  const { 
    totalHeight = 1440 
  } = props

  const { data: blockTimes, isLoading } = useSWR('/api/block-times', fetcher);

  return (
    <div className="flex h-fit w-fit relative" style={{ height: `${totalHeight}px` }} >
      <div 
        className={`w-12 flex border border-gray-700 flex-col rounded-md items-center absolute z-[1]`}
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
        !isLoading &&
          <div className="bg-white opacity-75 z-0">
            {blockTimes.map((block: any, index: number) => (
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