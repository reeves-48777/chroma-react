import DraggableColor from './blocks/draggable-color';
import { cn } from '@/lib/utils';
import useChromaStore from '@/stores/chroma';
import useUIStore from '@/stores/ui';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensors,
  useSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';

// const colors = ['#FF5733', '#33FF57', '#3357FF', '#F0FF33', '#FF33C4'];

export default function DragNDropPalette() {
  const items = useChromaStore((state) => state.palette);
  const setItems = useChromaStore((state) => state.setPalette);

  const orientation = useUIStore((state) => state.paletteOrientation);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over?.id) {
      const oldIndex = items.indexOf(active.id as string);
      const newIndex = items.indexOf(over!.id as string);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items}
        strategy={rectSortingStrategy}
      >
        <div
          className={cn(
            'flex h-full w-full justify-center',
            orientation === 'landscape' ? 'flex-row' : 'flex-col',
            items.length === 0 && 'items-center'
          )}
          id='palette-container'
        >
          {items.length > 0 ? (
            items.map((color) => (
              <DraggableColor
                key={color}
                id={color}
                color={color}
              />
            ))
          ) : (
            <span
              className={cn(
                'text-2xl text-muted-foreground/40 dark:text-muted text-pretty',
                orientation === 'portrait' && 'writing-mode-vertical-lr'
              )}
            >
              NO PALETTE FOR NOW
            </span>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}
