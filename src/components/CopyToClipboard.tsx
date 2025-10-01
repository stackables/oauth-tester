"use client";

import { Check, ClipboardCopy } from "lucide-react";
import { useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function CopyToClipboard(props: {
  text: string;
  onClear?: () => void;
  onClick?: () => void;
  className?: string;
}) {
  const [, copy] = useCopyToClipboard();
  const [checkmark, setCheckmark] = useState(false);

  const handleCopy = () => {
    copy(props.text)
      .then(() => {
        setCheckmark(true);
        props.onClick?.();
        setTimeout(() => {
          setCheckmark(false);
          props.onClear?.();
        }, 1000);
      })
      .catch(console.error);
  };

  return (
    <Button
      {...props}
      variant="ghost"
      size="icon"
      type="button"
      className={cn(
        "size-6 p-1 rounded-full text-secondary-foreground",
        props.className
      )}
      onClick={handleCopy}
    >
      {checkmark ? <Check /> : <ClipboardCopy />}
    </Button>
  );
}
