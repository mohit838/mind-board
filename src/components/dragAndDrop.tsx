import { data } from '../assets';
import { useDragAndDrop } from '../hook/useDragAndDrop';
import { Status } from '../interface';
import { ContainerCards } from './containerCards';

const typesHero: Status[] = ['good', 'normal', 'bad'];

export const DragAndDrop = () => {
  const { isDragging, listItems, handleDragging, handleUpdateList } =
    useDragAndDrop(data);

  return (
    <div className="grid">
      {typesHero?.map((container) => (
        <ContainerCards
          items={listItems}
          status={container}
          key={container}
          isDragging={isDragging}
          handleDragging={handleDragging}
          handleUpdateList={handleUpdateList}
        />
      ))}
    </div>
  );
};
