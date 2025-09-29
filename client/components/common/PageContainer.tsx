import React from "react";

type PageContainerProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  bg?: string;
  // allow extra props to be passed through (safest for incremental changes)
  [key: string]: any;
};

// Simple page wrapper used by routes. Keeps full-height background and spacing.
export default function PageContainer({ children, className = "", style = {}, bg, ...rest }: PageContainerProps) {
  const mergedStyle: React.CSSProperties = { ...(style || {}) };
  if (bg) mergedStyle.background = bg;
  return (
    <div
      className={`min-h-screen w-full bg-background text-foreground ${className}`}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </div>
  );
}
