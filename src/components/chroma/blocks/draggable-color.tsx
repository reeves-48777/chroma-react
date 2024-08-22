import { useColors } from '@/hooks/colors';
import { useSortable } from '@dnd-kit/sortable';
import { motion } from 'framer-motion';

type DraggrableColorProps = {
  id: string;
  color: string;
};

export default function DraggableColor({ id, color }: DraggrableColorProps) {
  const { getColorLuminance } = useColors();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: transition,
    zIndex: isDragging ? 2 : 1,
    backgroundColor: color,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='grow flex items-center justify-center font-semibold'
      initial={{
        border: 'none',
        borderRadius: '0',
      }}
      animate={{
        border: isDragging ? '2px solid black' : 'none',
        borderRadius: isDragging ? '0.25rem' : '0',
      }}
    >
      <span
        className='font-bold'
        style={{
          color: getColorLuminance(color) > 0.5 ? '#000' : '#fff',
        }}
      >
        {color}
      </span>
    </motion.div>
  );
}
