import React, { useState } from "react";

const getColor = (name = "") => {
  const colors = [
    "bg-violet-500", "bg-blue-500", "bg-emerald-500",
    "bg-rose-500", "bg-amber-500", "bg-cyan-500",
    "bg-pink-500", "bg-indigo-500", "bg-teal-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

const getInitials = (name = "") => {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export default function Avatar({ name = "", src, size = "md", className = "" }) {
  const [imgError, setImgError] = useState(false);
  const sizeMap = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-14 h-14 text-lg",
  };
  const sizeClass = sizeMap[size] || sizeMap.md;
  const color = getColor(name);
  const initials = getInitials(name);
  const showImg = src && !imgError;
  return showImg ? (
    <img src={src} alt={name} onError={() => setImgError(true)}
      className={`${sizeClass} rounded-full object-cover ring-2 ring-white dark:ring-gray-800 ${className}`} />
  ) : (
    <div className={`${sizeClass} ${color} rounded-full flex items-center justify-center font-bold text-white ring-2 ring-white dark:ring-gray-800 shrink-0 ${className}`}>
      {initials}
    </div>
  );
}