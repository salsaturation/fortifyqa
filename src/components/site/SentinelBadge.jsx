import React from "react";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SentinelBadge({ className, label = "Sentinel-ready" }) {
  return (
    <span
      className={cn(
        "mono-label inline-flex items-center gap-1.5 border border-accent/40 bg-accent/10 px-2 py-1 text-accent",
        className
      )}
    >
      <ShieldCheck className="h-3 w-3" />
      {label}
    </span>
  );
}