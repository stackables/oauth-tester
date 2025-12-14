"use client";

import { useEffect, useState, useCallback } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";

const PostMessageSchema = z.discriminatedUnion("message", [
  z.object({
    message: z.literal("survey-ready"),
  }),
  z.object({
    message: z.literal("survey-completed"),
  }),
]);

interface FeedbackWidgetProps {
  side?: "left" | "right" | "bottom";
  attribution?: "none" | "button" | "dialog";
  className?: string;
  src: string;
  lang?: string;
  theme?: "light" | "dark" | "system";
}

export function FeedbackWidget({
  side = "right",
  attribution = "dialog",
  className,
  src,
  lang,
  theme,
}: FeedbackWidgetProps) {
  const [open, setOpen] = useState(false);

  const getSurveyUrl = () => {
    try {
      const url = new URL(src);
      if (lang) url.searchParams.set("lang", lang);
      if (theme) url.searchParams.set("theme", theme);
      return url.toString();
    } catch {
      return src;
    }
  };

  const surveyUrl = getSurveyUrl();

  const handlePostMessage = useCallback((event: MessageEvent) => {
    if (event.origin !== "https://youropinion.is") {
      return;
    }

    const result = PostMessageSchema.safeParse(event.data);

    if (result.success) {
      if (result.data.message === "survey-completed") {
        setOpen(false);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", handlePostMessage);
    return () => {
      window.removeEventListener("message", handlePostMessage);
    };
  }, [handlePostMessage]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        className={cn(
          "fixed z-50 shadow-lg font-semibold tracking-wide",
          side === "right" &&
            "right-0 top-1/2 -translate-y-1/2 rotate-[-90deg] origin-bottom-right rounded-b-none rounded-t-md",
          side === "left" &&
            "left-0 top-1/2 -translate-y-1/2 rotate-90 origin-bottom-left rounded-b-none rounded-t-md",
          side === "bottom" && "bottom-0 right-8 rounded-b-none rounded-t-md",
          className
        )}
        onClick={() => setOpen(true)}
      >
        {attribution === "button" && (
          <a
            href="https://youropinion.is"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2 relative h-4 w-4 inline-block"
            onClick={(e) => e.stopPropagation()}
            title="Powered by YourOpinion.is"
          >
            <Image
              src="https://youropinion.is/images/logo-check.svg"
              alt="YourOpinion.is"
              fill
              className="object-contain"
            />
          </a>
        )}
        Feedback
      </Button>
      <DialogContent className="sm:max-w-[600px] h-[80vh] p-0 overflow-hidden flex flex-col gap-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Feedback Survey</DialogTitle>
        </DialogHeader>
        <div className="flex-1 relative">
          <iframe
            src={surveyUrl}
            className="w-full h-full border-0 absolute inset-0"
            title="Feedback Survey"
          />
        </div>
        {attribution === "dialog" && (
          <div className="bg-gray-50 p-2 border-t flex items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground">
              Feedback powered by
            </span>
            <a
              href="https://youropinion.is"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <div className="relative h-4 w-4">
                <Image
                  src="https://youropinion.is/images/logo-check.svg"
                  alt="YourOpinion.is Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-semibold text-blue-600">
                YourOpinion.is
              </span>
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
