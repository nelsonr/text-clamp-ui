import { useEffect, useRef, useState } from "react";
import "./ResizableContainer.css";

interface ResizableContainerProps {
  children: React.ReactNode;
  onFullWidth?: () => void;
}

export function ResizableContainer({
  children,
  onFullWidth,
}: ResizableContainerProps) {
  const [maxWidth, setMaxWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const containerWidthRef = useRef(0);
  const contentWidthRef = useRef(0);
  const clientXRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.getBoundingClientRect().width;
    setMaxWidth(width);
  }, []);

  const onPointerMove = (ev: PointerEvent) => {
    const diff = ev.clientX - clientXRef.current;
    const width = containerWidthRef.current + diff;
    const finalWidth = Math.min(width, maxWidth);

    if (finalWidth === maxWidth && onFullWidth) {
      onFullWidth();
    }

    containerRef.current!.style.width = `${finalWidth}px`;
  };

  const onPointerDown = (ev: React.PointerEvent) => {
    if (!contentRef.current || !containerRef.current || !handleRef.current) {
      return;
    }

    const containerWidth = containerRef.current.getBoundingClientRect().width;
    const contentWidth = contentRef.current.getBoundingClientRect().width;
    containerWidthRef.current = containerWidth;
    contentWidthRef.current = contentWidth;
    clientXRef.current = ev.clientX;

    handleRef.current.onpointermove = onPointerMove;
    handleRef.current.setPointerCapture(ev.pointerId);
  };

  const onPointerCancel = (ev: React.PointerEvent) => {
    if (!handleRef.current) return;

    handleRef.current.onpointermove = null;
    handleRef.current.releasePointerCapture(ev.pointerId);
  };

  return (
    <div className="resizable-container" ref={containerRef}>
      <div className="resizable-container__content" ref={contentRef}>
        {children}
      </div>
      <div
        className="resizable-container__handle"
        ref={handleRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerCancel}
        onPointerCancel={onPointerCancel}
      >
        <div className="resizable-container__dots">
          <div className="resizable-container__dot"></div>
          <div className="resizable-container__dot"></div>
          <div className="resizable-container__dot"></div>
        </div>
      </div>
    </div>
  );
}
