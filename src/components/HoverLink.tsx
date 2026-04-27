"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface HoverLinkProps {
  href: string;
  children: ReactNode;
  style?: React.CSSProperties;
  hoverStyle?: React.CSSProperties;
  className?: string;
}

export default function HoverLink({
  href,
  children,
  style,
  hoverStyle,
  className,
}: HoverLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      style={style}
      onMouseEnter={(e) => {
        if (hoverStyle) {
          Object.assign(e.currentTarget.style, hoverStyle);
        }
      }}
      onMouseLeave={(e) => {
        if (style) {
          Object.assign(e.currentTarget.style, style);
        }
      }}
    >
      {children}
    </Link>
  );
}
