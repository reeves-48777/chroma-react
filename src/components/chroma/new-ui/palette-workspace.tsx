import DragNDropPalette from '../old-ui/drag-n-drop-palette';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

export default function PaletteWorkspace() {
  return (
    <div>
      <TransformWrapper>
        <TransformComponent>
          <DragNDropPalette />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
