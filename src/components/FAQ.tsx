import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqText = string | React.ReactNode;

interface FaqItem {
  id: string;
  question: string;
  answer: FaqText[] | FaqText;
}

interface Faq1Props {
  heading?: string;
  items?: FaqItem[];
}

const Faq1 = ({
  heading = "Frequently asked questions",
  items = [
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
            href="https://bsky.app/profile/aarnelaur.bsky.social"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            bsky
          </a>{" "}
          and we can discuss the details.
        </>,
      ],
    },
  ],
}: Faq1Props) => {
  return (
    <Accordion type="single" collapsible>
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="font-semibold hover:no-underline text-base">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground text-base space-y-2">
            {Array.isArray(item.answer)
              ? item.answer.map((ans, i) => <p key={i}>{ans}</p>)
              : item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export { Faq1 };
