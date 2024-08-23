import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type ColorCheckboxProps = {
  color: string;
  isSelected: boolean;
  onToggle: (color: string) => void;
};
export default function ColorCheckbox({
  color,
  isSelected,
  onToggle,
}: ColorCheckboxProps) {
  return (
    <motion.div
      onClick={() => onToggle(color)}
      style={{ backgroundColor: color }}
      className={cn(
        'size-6 cursor-pointer relative',
        isSelected && 'ring-1 ring-offset-1 ring-muted-foreground/70'
      )}
      whileTap={{ scale: 0.9 }}
      animate={{
        scale: isSelected ? 1.2 : 1,
        borderRadius: isSelected ? '8px' : '4px',
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
      data-color={color}
    />
  );
}
