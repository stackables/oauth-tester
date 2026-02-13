"use client";

import { useEffect, useState, useCallback } from "react";
import { z } from "zod";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

function LogoCheck({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient
          id="linear0"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="1"
          y2="0"
          gradientTransform="matrix(20.00061,0,0,20.001343,2.002441,1.996216)"
        >
          <stop
            offset="0"
            style={{
              stopColor: "rgb(91.764706%,36.470589%,0%)",
              stopOpacity: 0.99609,
            }}
          />
          <stop
            offset="1"
            style={{
              stopColor: "rgb(100%,40.000001%,0%)",
              stopOpacity: 0.99609,
            }}
          />
        </linearGradient>
        <linearGradient
          id="linear1"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="1"
          y2="0"
          gradientTransform="matrix(14.687256,0,0,14.687622,4.750122,4.59375)"
        >
          <stop
            offset="0"
            style={{ stopColor: "rgb(0%,20%,40.000001%)", stopOpacity: 1 }}
          />
          <stop
            offset="1"
            style={{
              stopColor: "rgb(0%,37.254903%,74.901962%)",
              stopOpacity: 0.99609,
            }}
          />
        </linearGradient>
      </defs>
      <g id="surface1">
        <path
          style={{
            fill: "none",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            stroke: "url(#linear0)",
            strokeMiterlimit: 4,
          }}
          d="M 21.800903 10.000122 C 22.742065 14.618408 20.3302 19.26709 16.012573 21.157471 C 11.69458 23.047485 6.643066 21.665771 3.888428 17.841431 C 1.133423 14.01709 1.423096 8.787964 4.583496 5.291016 C 7.744263 1.794434 12.917358 0.979248 16.999878 3.335083 "
          transform="matrix(10.666667,0,0,10.666667,0,0)"
        />
        <path
          style={{
            fillRule: "nonzero",
            fill: "url(#linear1)",
            strokeWidth: 0.5,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            stroke: "rgb(100%,100%,100%)",
            strokeOpacity: 1,
            strokeMiterlimit: 4,
          }}
          d="M 19.437378 11.937378 C 19.437378 15.993164 16.149536 19.281372 12.09375 19.281372 C 8.037964 19.281372 4.750122 15.993164 4.750122 11.937378 C 4.750122 7.881592 8.037964 4.59375 12.09375 4.59375 C 16.149536 4.59375 19.437378 7.881592 19.437378 11.937378 Z M 19.437378 11.937378 "
          transform="matrix(10.666667,0,0,10.666667,0,0)"
        />
        <path
          style={{
            fill: "none",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            stroke: "rgb(0%,20%,40.000001%)",
            strokeOpacity: 1,
            strokeMiterlimit: 4,
          }}
          d="M 9 10.999878 L 12 13.999878 L 22.000122 4.000122 "
          transform="matrix(10.666667,0,0,10.666667,0,0)"
        />
        <path
          style={{
            fill: "none",
            strokeWidth: 3,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            stroke: "rgb(100%,100%,100%)",
            strokeOpacity: 1,
            strokeMiterlimit: 4,
          }}
          d="M 9 10.999878 L 12 13.999878 L 22.000122 4.000122 "
          transform="matrix(10.666667,0,0,10.666667,0,0)"
        />
        <path
          style={{
            fill: "none",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            stroke: "rgb(0%,20%,40.000001%)",
            strokeOpacity: 1,
            strokeMiterlimit: 4,
          }}
          d="M 9 10.999878 L 12 13.999878 L 22.000122 4.000122 "
          transform="matrix(10.666667,0,0,10.666667,0,0)"
        />
      </g>
    </svg>
  );
}

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
      <div
        className={cn(
          buttonVariants({ variant: "default" }),
          "fixed z-50 shadow-lg font-semibold tracking-wide p-0 gap-0 overflow-hidden",
          side === "right" &&
            "right-0 top-1/2 -translate-y-1/2 -rotate-90 origin-bottom-right rounded-b-none rounded-t-md",
          side === "left" &&
            "left-0 top-1/2 -translate-y-1/2 rotate-90 origin-bottom-left rounded-b-none rounded-t-md",
          side === "bottom" && "bottom-0 right-8 rounded-b-none rounded-t-md",
          className,
        )}
      >
        {attribution === "button" && (
          <a
            href="https://youropinion.is"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 h-full flex items-center justify-center hover:bg-primary-foreground/10 transition-colors"
            onClick={(e) => e.stopPropagation()}
            title="Powered by YourOpinion.is"
          >
            <LogoCheck className="w-4 h-4 object-contain" />
          </a>
        )}
        <button
          onClick={() => setOpen(true)}
          className={cn(
            "h-full flex items-center justify-center hover:bg-primary-foreground/10 transition-colors outline-none focus-visible:bg-primary-foreground/20",
            attribution === "button" ? "pl-2 pr-4" : "px-4",
          )}
        >
          Feedback
        </button>
      </div>
      <DialogContent className="sm:max-w-150 h-[80vh] p-0 overflow-hidden flex flex-col gap-0">
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
                <LogoCheck className="w-full h-full object-contain" />
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
