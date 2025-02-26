'use client'
import React, { useEffect, useState } from "react";
import BlockItem from "./BlockItem";

type BlockTimeProps = {
  summaryHours?: boolean
  totalHeight?: number
}

export default function BlockTime (props : BlockTimeProps) {
  const { 
    summaryHours = false, 
    totalHeight = 1440 
  } = props
  const [blockTimes, setBlockTimes] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const getBlockTimes = async () => {
    try {
      const response = await fetch("/api/block-times").then(data => data.json())
      console.log(response)
      if (response?.success) {
        setBlockTimes(response.data)
      } else {
        throw new Error("No se pudo acceder a la api...")
      }
      setLoading(false)

    } catch (error) {
      setBlockTimes([])
      setLoading(false)
      console.error(error)
    }
  }

  useEffect(() => {
    getBlockTimes()
  }, [])

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

      <div className="bg-white opacity-75 z-0">
        {blockTimes.map((block: any, index: number) => (
          <BlockItem 
            block={block} 
            key={`blocktime-item-${index}`}
            totalHeight={totalHeight}
          />
        ))}
      </div>
    </div>
  );
}