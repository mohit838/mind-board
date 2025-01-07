import { Data, Status } from '../interface';
import { CardItem } from './cardItem';

interface Props {
  items: Data[];
  status: Status;
  isDragging: boolean;
  handleUpdateList: (id: number, status: Status, targetIndex?: number) => void;
  handleDragging: (dragging: boolean) => void;
}

export const ContainerCards = ({
  items = [],
  status,
  isDragging,
  handleDragging,
  handleUpdateList,
}: Props) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = +e.dataTransfer.getData('text');

    // Get all items in the current container
    const itemsInContainer = Array.from(
      e.currentTarget.querySelectorAll('.card-container')
    );

    // Calculate the target index based on the mouse position
    let targetIndex = itemsInContainer.length; // Default to the end of the list
    for (let i = 0; i < itemsInContainer.length; i++) {
      const item = itemsInContainer[i];
      const rect = item.getBoundingClientRect();
      if (e.clientY < rect.top + rect.height / 2) {
        targetIndex = i;
        break;
      }
    }

    handleUpdateList(id, status, targetIndex);
    handleDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  return (
    <div
      className={`layout-cards ${isDragging ? 'layout-dragging' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <p>{status} hero</p>
      {items?.map(
        (item) =>
          status === item.status && (
            <CardItem
              data={item}
              key={item.id}
              handleDragging={handleDragging}
            />
          )
      )}
    </div>
  );
};
