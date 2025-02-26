'use client'
import React, { useEffect, useState } from "react";
import { parse, differenceInHours, differenceInMinutes, format } from "date-fns";
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
    <div className="flex h-screen p-5 border w-fit">
      <div className="w-12 flex flex-col items-center absolute z-[1]" >
       {Array.from({ length: 24 }).map((_, hour) => (
          <div
            key={`hour-${hour}h`}
            className="flex-1 border-b text-center w-8 h-7 min-h-[27.3] text-sm pr-1"
            style={{
              height: `${(60 / totalHeight) * 100}%`,
            }}
          >
            {hour}h
          </div>
       ))}
     </div>

      <div className="relative flex-1 bg-white opacity-75 z-0">
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