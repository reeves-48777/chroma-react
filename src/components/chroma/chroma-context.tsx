import { ReactNode } from 'react';

interface ChromaContextProps {
  visible: boolean;
  children: ReactNode;
}

export default function ChromaContext(props: ChromaContextProps) {
  const classes = 'relative hidden flex-col items-start gap-8 md:flex'.split(
    ' '
  );
  if (!props.visible) {
    classes.pop();
  } else {
    if (!classes.find((className) => className === 'md:flex')) {
      classes.push('md:flex');
    }
  }
  return (
    <>
      <div className={classes.join(' ')} x-chunk="chroma-dashboard-context">
        {props.children}
      </div>
    </>
  );
}
