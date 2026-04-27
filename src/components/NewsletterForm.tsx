"use client";

import { useRef } from "react";

interface NewsletterFormProps {
  placeholder?: string;
  buttonText?: string;
  variant?: "light" | "dark";
}

export default function NewsletterForm({
  placeholder = "输入你的邮箱",
  buttonText = "订阅",
}: NewsletterFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const setBorderColor = (color: string) => {
    if (formRef.current) {
      formRef.current.style.borderColor = color;
    }
  };

  return (
    <form
      ref={formRef}
      style={{
        display: "flex",
        flexWrap: "wrap",
        border: "1px solid rgba(201,185,154,0.12)",
        borderRadius: "8px",
        overflow: "hidden",
        transition: "border-color 0.25s ease",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
        if (email) {
          alert(`感谢订阅！我们会将更新发送到 ${email}`);
          form.reset();
        }
      }}
    >
      <input
        type="email"
        name="email"
        placeholder={placeholder}
        required
        style={{
          flex: 1,
          minWidth: "200px",
          height: 50,
          padding: "0 16px",
          fontSize: "14px",
          border: "none",
          backgroundColor: "rgba(255,255,255,0.03)",
          color: "#F0EDE8",
          outline: "none",
          letterSpacing: "0.01em",
        }}
        onFocus={() => setBorderColor("rgba(201,185,154,0.35)")}
        onBlur={() => setBorderColor("rgba(201,185,154,0.12)")}
      />
      <button
        type="submit"
        style={{
          height: 50,
          padding: "0 24px",
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.04em",
          border: "none",
          backgroundColor: "#C9B99A",
          color: "#0C0C10",
          cursor: "pointer",
          transition: "background-color 0.25s ease, box-shadow 0.25s ease",
          whiteSpace: "nowrap",
          textTransform: "uppercase",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#D8CBAF";
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(201,185,154,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#C9B99A";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {buttonText}
      </button>
    </form>
  );
}
