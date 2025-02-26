
type BlockItemProps = {
  block: any
  totalHeight?: number
}

export default function BlockItem ({ block, totalHeight = 1440 } : BlockItemProps) {

  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const startMinutes = timeToMinutes(block.startTime);
  const endMinutes = timeToMinutes(block.endTime);
  const height = endMinutes - startMinutes;
  const top = (startMinutes / totalHeight) * 100;

  return (
    <div
      key={block.id}
      className="absolute w-12 flex items-center pl-2 text-white text-xs border-b rounded-md border-white cursor-pointer opacity-75"
      style={{
        top: `${top}%`,
        height: `${(height / totalHeight) * 100}%`,
        backgroundColor: block.color || '#4CAF50',
      }}
    />
  );
} 