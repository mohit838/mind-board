import { useState } from "react";
import { Data, Status } from "../interface";

export const useDragAndDrop = (initialState: Data[]) => {
  const [isDragging, setIsDragging] = useState(false);
  const [listItems, setListItems] = useState<Data[]>(initialState);

  const handleUpdateList = (
    id: number,
    status: Status,
    targetIndex?: number
  ) => {
    let card = listItems.find((item) => item.id === id);

    if (card) {
      // Remove the card from its current position
      const filteredItems = listItems.filter((item) => item.id !== id);

      // If the status is changing, move the card to the top of the new status
      if (card.status !== status) {
        card.status = status;
        setListItems([card, ...filteredItems]);
      } else {
        // If the status is the same, reorder the card within the same status
        const itemsWithSameStatus = filteredItems.filter(
          (item) => item.status === status
        );

        // If targetIndex is provided, insert the card at the specified position
        if (targetIndex !== undefined) {
          const updatedItems = [
            ...itemsWithSameStatus.slice(0, targetIndex),
            card,
            ...itemsWithSameStatus.slice(targetIndex),
          ];

          // Merge the updated items with the rest of the list
          const finalItems = filteredItems
            .filter((item) => item.status !== status)
            .concat(updatedItems);

          setListItems(finalItems);
        } else {
          // If no targetIndex is provided, move the card to the top of the same status
          setListItems([card, ...filteredItems]);
        }
      }
    }
  };

  const handleDragging = (dragging: boolean) => setIsDragging(dragging);

  return {
    isDragging,
    listItems,
    handleUpdateList,
    handleDragging,
  };
};
