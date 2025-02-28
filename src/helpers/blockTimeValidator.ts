import { BlockTime } from "@/types/BlockTime";

export const isTimeRangeOverlapping = (reservationsList: BlockTime[], formData: BlockTime, isEditing: boolean) => (
  reservationsList.some((blockTime) => {
    if (isEditing && blockTime.id === formData.id && 
        blockTime.startTime === formData.startTime && 
        blockTime.endTime === formData.endTime) {
      return false;
    }

    if (formData.date !== blockTime.date) {
      return false;
    }

    const newStartTime = formData.startTime;
    const newEndTime = formData.endTime;
    const existingStartTime = blockTime.startTime;
    const existingEndTime = blockTime.endTime;

    return (
      (newStartTime >= existingStartTime && newStartTime < existingEndTime) ||
      (newEndTime > existingStartTime && newEndTime <= existingEndTime) || 
      (newStartTime <= existingStartTime && newEndTime >= existingEndTime) 
    );
  })
);