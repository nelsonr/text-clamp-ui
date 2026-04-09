import { useEffect, useEffectEvent, useRef, useState } from "react";
import "./TextClamp.css";

interface TextClampProps {
  text: string;
}

export function TextClamp({ text }: TextClampProps) {
  const [displayText, setDisplayText] = useState(text);
  const contentRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<ResizeObserver>(undefined);
  const canvasCtxRef = useRef<CanvasRenderingContext2D>(undefined);

  const fitTextToWidth = useEffectEvent((maxWidth: number) => {
    const shortText = resizeText(
      text,
      text.length,
      maxWidth,
      canvasCtxRef.current!,
    );

    if (shortText != displayText) {
      setDisplayText(shortText);
    }
  });

  useEffect(() => {
    const style = getComputedStyle(contentRef.current!);
    const canvas = document.createElement("canvas");
    canvasCtxRef.current = canvas.getContext("2d")!;
    canvasCtxRef.current.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;

    if (!observerRef.current) {
      observerRef.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          fitTextToWidth(entry.contentRect.width);
        }
      });

      observerRef.current.observe(contentRef.current!);

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = undefined;
        }
      };
    }
  }, []);

  return (
    <div className="text-clamp" ref={contentRef}>
      {displayText}
    </div>
  );
}

function clampText(text: string, maxChars: number): string {
  let result = text;

  if (text.length > maxChars) {
    const half = Math.floor(maxChars / 2);
    const firstHalf = text.slice(0, half);
    const secondHalf = text.slice(text.length - half);

    result = `${firstHalf}...${secondHalf}`;
  }

  return result;
}

function resizeText(
  text: string,
  maxChars: number,
  maxWidth: number,
  ctx: CanvasRenderingContext2D,
): string {
  let shortText = text;
  let textWidth = ctx.measureText(text).width;

  while (textWidth > maxWidth && maxWidth > 0 && maxChars > 0) {
    shortText = clampText(text, maxChars);
    textWidth = ctx.measureText(shortText).width;
    maxChars--;
  }

  return shortText;
}
