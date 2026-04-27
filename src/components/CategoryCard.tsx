"use client";

import Link from "next/link";
import type { ReactNode } from "react";

interface CategoryCardProps {
  name: string;
  icon: ReactNode;
  href: string;
}

export default function CategoryCard({ name, icon, href }: CategoryCardProps) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "24px",
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        textDecoration: "none",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(201, 185, 154, 0.3)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(201, 185, 154, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(201, 185, 154, 0.15)",
          borderRadius: 8,
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontSize: "16px",
          fontWeight: 500,
          color: "#F0EDE8",
        }}
      >
        {name}
      </span>
    </Link>
  );
}
