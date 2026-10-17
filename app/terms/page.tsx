import type { Metadata } from "next";

import {
  LEGAL_CONTACT_EMAIL,
  LegalPage,
  type LegalSection,
} from "@/components/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of Carus Recycling, including waste pickups and drop-offs, reward points, donations and redemptions.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service | Carus Recycling",
    description:
      "The terms that govern your use of Carus Recycling and its rewards programme.",
    url: "https://carus.com.ng/terms",
  },
};

const mail = (
  <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>
);

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of these terms",
    body: (
      <>
        <p>
          These Terms of Service (&quot;Terms&quot;) are a binding agreement
          between you and Carus Recycling (&quot;Carus&quot;, &quot;we&quot;,
          &quot;us&quot;). By creating an account, ticking the box at sign-up,
          or otherwise using carus.com.ng and our related services (the
          &quot;Service&quot;), you agree to these Terms and to our Privacy
          Policy. If you do not agree, do not use the Service.
        </p>
        <p>
          If you use the Service for a business, you confirm that you are
          authorised to bind that business to these Terms.
        </p>
      </>
    ),
  },
  {
    id: "the-service",
    title: "What Carus does",
    body: (
      <p>
        Carus is a platform that lets you schedule household or business waste
        for pickup or drop-off, earn points for eligible recycling, donate
        points, and redeem points for airtime or cash. We currently operate in
        selected areas of Lagos, Nigeria, and availability, accepted materials
        and features may change.
      </p>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility and accounts",
    body: (
      <ul>
        <li>You must be at least 18 years old and able to enter a contract.</li>
        <li>
          You must give accurate, current and complete information, and keep it
          up to date. Business accounts must provide a genuine company name and
          CAC number.
        </li>
        <li>
          You may hold only one personal account. Accounts are not transferable.
        </li>
        <li>
          You are responsible for keeping your password and verification codes
          confidential and for all activity under your account. Tell us at{" "}
          {mail} immediately if you suspect unauthorised use.
        </li>
        <li>
          If you sign in with Google, you also remain bound by Google&apos;s
          terms.
        </li>
      </ul>
    ),
  },
  {
    id: "scheduling",
    title: "Pickups and drop-offs",
    body: (
      <>
        <ul>
          <li>
            Scheduling a pickup or drop-off is a request. Time slots depend on
            availability and are not guaranteed until confirmed in the Service.
          </li>
          <li>
            You must provide a correct address and be reachable at the booked
            time. We may cancel or reschedule if we cannot access the location
            or reach you.
          </li>
          <li>
            Only the waste types listed in the Service are accepted. You must
            declare the type and quantity accurately.
          </li>
          <li>
            Do not hand over hazardous, flammable, explosive, medical,
            radioactive, or otherwise unlawful waste, or waste mixed with such
            materials. We may refuse any item, and you are liable for harm or
            cost caused by materials you failed to declare.
          </li>
          <li>
            You may cancel a scheduled request through the Service before it is
            completed. Repeated no-shows or late cancellations may lead to
            restrictions on your account.
          </li>
          <li>
            Waste you hand over becomes our property when collected, and you
            confirm you have the right to hand it over.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "points",
    title: "Reward points",
    body: (
      <ul>
        <li>
          Points are credited after we verify the material and quantity actually
          collected or received. The amount may differ from what you estimated
          when booking.
        </li>
        <li>
          The points-to-naira conversion rate, minimum redemption amounts and
          the points awarded per material are set by Carus, are shown in the
          Service, and may change. Changes apply to points redeemed after the
          change.
        </li>
        <li>
          Points are a promotional reward. They are not money, electronic money,
          a deposit or a financial product, they earn no interest, and they have
          no cash value except as redeemed through the Service.
        </li>
        <li>
          Points cannot be sold, transferred or exchanged between users, except
          through features we provide (such as donations).
        </li>
        <li>
          We may adjust or reverse points credited by error, and may withdraw or
          expire inactive points after giving reasonable notice.
        </li>
      </ul>
    ),
  },
  {
    id: "redemptions",
    title: "Donations and redemptions",
    body: (
      <ul>
        <li>
          You can use points to donate to listed causes, or redeem them for
          airtime or a bank transfer, subject to a sufficient balance and any
          minimums shown in the Service.
        </li>
        <li>
          You are responsible for the accuracy of the phone number, network,
          bank name, account number and account name you enter. We cannot
          recover airtime or transfers sent to the details you provided.
        </li>
        <li>
          Payouts are processed with third-party payment providers and may be
          delayed or fail because of provider downtime, invalid details or
          verification checks. Failed payouts will be returned to your points
          balance where possible.
        </li>
        <li>
          Submitted donations and completed redemptions cannot be reversed
          except where required by law or in cases of our own error.
        </li>
        <li>
          Cash payouts go only to a bank account in your own name (or your
          business&apos;s name for business accounts). We may ask you to verify
          your identity before paying out.
        </li>
        <li>
          You are responsible for any taxes that apply to rewards you receive.
        </li>
      </ul>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>
            provide false information, create multiple or fake accounts, or
            claim points for waste you did not recycle;
          </li>
          <li>
            tamper with weights, quantities or materials, or add contaminants or
            non-recyclable items to inflate rewards;
          </li>
          <li>
            use the Service for money laundering, fraud or any unlawful purpose;
          </li>
          <li>
            access another user&apos;s account, or probe, scrape, overload or
            interfere with the Service or its security;
          </li>
          <li>
            use bots or automation, or abuse the chatbot or support channels;
          </li>
          <li>
            harass or threaten our staff, collection partners or other users.
          </li>
        </ul>
        <p>
          We may investigate suspected violations and cooperate with law
          enforcement.
        </p>
      </>
    ),
  },
  {
    id: "assistant",
    title: "Carus assistant (chatbot)",
    body: (
      <p>
        The in-app assistant uses artificial intelligence to answer questions
        and may give inaccurate or incomplete answers. It is for general
        guidance only. Check important details (such as accepted materials,
        point values or payout status) in your account, and do not enter
        passwords, card details or other sensitive information into it.
      </p>
    ),
  },
  {
    id: "suspension",
    title: "Suspension and termination",
    body: (
      <>
        <p>
          You may stop using the Service and ask us to delete your account at
          any time by emailing {mail}. We may suspend or terminate your account,
          void points, or withhold payouts if you breach these Terms, we
          reasonably suspect fraud or abuse, or we are required to by law. Where
          practical we will tell you why.
        </p>
        <p>
          On termination, your right to use the Service ends. Sections that by
          their nature should survive (including ownership, liability and
          governing law) will continue to apply.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: (
      <p>
        The Service, including the Carus name, logo, design, text and software,
        belongs to Carus or its licensors and is protected by law. We grant you
        a limited, non-exclusive, non-transferable, revocable right to use the
        Service for its intended purpose. You keep ownership of content you
        submit (such as your profile picture and messages), and give us a
        licence to use it as needed to operate and improve the Service.
      </p>
    ),
  },
  {
    id: "availability",
    title: "Availability and changes",
    body: (
      <p>
        We work to keep the Service available, but it is provided on an &quot;as
        is&quot; and &quot;as available&quot; basis and may be interrupted for
        maintenance, upgrades or events beyond our control. We may change,
        suspend or discontinue features at any time. If we make material changes
        to these Terms, we will notify you by email or in the Service before
        they take effect; continuing to use the Service after that means you
        accept the updated Terms.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Disclaimers and limitation of liability",
    body: (
      <>
        <p>
          To the fullest extent permitted by Nigerian law, we disclaim all
          warranties that are not expressly stated in these Terms, including any
          that the Service will be uninterrupted or error-free.
        </p>
        <p>
          To the fullest extent permitted by law, Carus will not be liable for
          indirect, incidental, special or consequential losses, loss of profits
          or data, or for delays or failures caused by third-party providers
          (such as payment, telecom or banking networks) or by events outside
          our reasonable control. Our total liability for any claim arising from
          the Service is limited to the value of the points or payouts in
          dispute.
        </p>
        <p>
          Nothing in these Terms excludes liability that cannot be excluded by
          law, including for fraud or for death or personal injury caused by our
          negligence, or limits any rights you have as a consumer under Nigerian
          law.
        </p>
      </>
    ),
  },
  {
    id: "indemnity",
    title: "Indemnity",
    body: (
      <p>
        You agree to compensate Carus for losses, claims and costs (including
        reasonable legal fees) arising from your breach of these Terms, your
        provision of prohibited or undeclared waste, or your violation of any
        law or third-party right.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law and disputes",
    body: (
      <p>
        These Terms are governed by the laws of the Federal Republic of Nigeria.
        Please contact us first at {mail} so we can try to resolve any dispute
        informally. If we cannot, the courts of Lagos State, Nigeria will have
        jurisdiction, without affecting any right you have to bring a claim in
        another competent forum or to complain to a regulator.
      </p>
    ),
  },
  {
    id: "general",
    title: "General",
    body: (
      <ul>
        <li>
          These Terms and our Privacy Policy are the entire agreement between
          you and Carus about the Service.
        </li>
        <li>
          If any provision is found unenforceable, the rest remains in effect.
        </li>
        <li>If we do not enforce a right, that is not a waiver of it.</li>
        <li>
          You may not assign your rights under these Terms without our consent;
          we may assign ours in connection with a business transfer.
        </li>
      </ul>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions about these Terms? Email {mail}. We are based in Lagos,
        Nigeria.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="Please read these terms carefully. They set out the rules for using Carus Recycling to schedule waste pickups and drop-offs, earn reward points, donate and redeem them."
      sections={sections}
      otherPage={{ href: "/privacy", label: "Privacy Policy" }}
    />
  );
}
