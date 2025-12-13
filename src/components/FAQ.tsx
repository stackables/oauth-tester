"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqText = string | React.ReactNode;

interface FaqItem {
  id: string;
  question: string;
  answer: FaqText[] | FaqText;
}

interface Faq1Props {
  items?: FaqItem[];
}

const Faq1 = ({
  items = [
    {
      id: "faq-0",
      question: "Who built this and why?",
      answer: (
        <>
        <p>
          I am Aarne, the founder of <a href="https://youropinion.is" target="_blank" className="text-blue-500 hover:underline">YourOpinion.is</a> (the best free AI native survey platform). And I built this fake identity provider to help my team and me develop and test our application more efficiently. We needed a simple way to simulate different user roles without the hassle of managing real accounts, so I created this tool to streamline our workflow and make testing easier for everyone involved.
        </p>
        <p>
          We decided to open it to everyone because we believe it can be a valuable resource for other developers facing similar challenges. Also we are using it actively ourselves, so it creates no extra maintenance burden for us.
        </p>
        </>
      ),
    },
    {
      id: "faq-1",
      question: "Why would anyone need a fake identity provider?",
      answer: (
        <>
          <p>
            Modern applications rely on external identity providers instead of
            traditional passwords. This is especially common in systems using
            OAuth, OpenID Connect, or social login. During development and
            testing, we need to simulate multiple user roles. That’s where a
            fake identity provider comes in:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>No need for real accounts:</strong> Instead of asking
              every developer or tester to create Google (or other provider)
              accounts and configure them locally, you can just use the fake
              provider.
            </li>
            <li>
              <strong>Shared test users:</strong> Your team can agree on shared
              PINs for test accounts. For example:
            </li>
            <ul className="list-disc pl-6 space-y-1">
              <li>PIN 345 → Shared test accounts</li>
              <li>
                <i>Frederik Abshire</i> → Admin user
              </li>
              <li>
                <i>Dejon King-Pagac</i> → Blocked user
              </li>
            </ul>
            <li>
              <strong>Ideal for E2E testing:</strong> Real identity providers
              often have strict security and anti-automation measures. This is
              good in production, but makes automated testing harder.
            </li>
            <li>
              <strong>Lax security by design:</strong> This fake provider
              intentionally skips most security requirements, making it perfect
              for local development and end-to-end automation.
            </li>
          </ul>
          <p className="mt-4">
            All configurations like client_id and client_secret are safe to
            commit to source control. This makes the applications easier to set
            up and reduces friction for new team members.
          </p>
        </>
      ),
    },
    {
      id: "faq-2",
      question: "What about client_id and client_secret?",
      answer:
        "We accept all values for client_id, client_secret and redirect_url",
    },
    {
      id: "faq-3",
      question: "How can I reference specific users in my testcases?",
      answer: [
        "Every user has a data-testid attribute with the format test-user-{[1-9]}",
        "The page displays total of 9 users. If PIN is set then first 7 users will be fixed identities and last 2 users will be randomly generated on every page load",
        'For automated tests we recommend picking `data-testid="test-user-9"` to get a random user (works as expected even if the pin was set by accident). We recommend using a testcase specific pin for creating stable users',
      ],
    },
    {
      id: "faq-4",
      question: "Where is the source, can I self-host?",
      answer: [
        "This is a trivial app, anyone can rebuilt it in 30 minutes :) We published it because firstly we need it, and setting up the domains and hosting still takes a bit of time",
        "Feel free to use the hosted version, but if you want to host your own (or contribute changes) then the source is available and we are happy to publish the repo on first request (MIT license as usual)",
        <>
          Just give me a ping on{" "}
          <a
            href="https://www.linkedin.com/in/aarnelaur"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            LinkedIn
          </a>{" "}
          and we can discuss the details.
        </>,
      ],
    },
  ],
}: Faq1Props) => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="space-y-8" itemScope itemType="https://schema.org/FAQPage">
      <div className="w-full">
        {items.map((item) => (
          <div
            key={item.id}
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
            className="border-b last:border-b-0"
          >
            <button
              type="button"
              className="flex w-full items-start justify-between gap-4 rounded-md py-4 text-left text-base font-semibold transition-all outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              onClick={() => toggleFaq(item.id)}
              aria-expanded={openFaq === item.id}
            >
              <span itemProp="name">{item.question}</span>
              <ChevronDown
                className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200"
                style={{
                  transform: openFaq === item.id ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>
            <div
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
              className="overflow-hidden transition-all duration-200"
              style={{
                maxHeight: openFaq === item.id ? "1000px" : "0",
                opacity: openFaq === item.id ? 1 : 0,
              }}
            >
              <div
                itemProp="text"
                className="pb-4 text-muted-foreground text-base space-y-2"
              >
                {Array.isArray(item.answer)
                  ? item.answer.map((ans, i) => <p key={i}>{ans}</p>)
                  : item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Faq1 };
