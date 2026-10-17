import type { Metadata } from "next";

import {
  LEGAL_CONTACT_EMAIL,
  LegalPage,
  type LegalSection,
} from "@/components/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Carus Recycling collects, uses, shares and protects your personal data, and the rights you have under the Nigeria Data Protection Act 2023.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Carus Recycling",
    description:
      "How Carus Recycling collects, uses, shares and protects your personal data.",
    url: "https://carus.com.ng/privacy",
  },
};

const mail = (
  <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>
);

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          Carus Recycling (&quot;Carus&quot;, &quot;we&quot;, &quot;us&quot;,
          &quot;our&quot;) operates the website at carus.com.ng and the related
          services that let you schedule waste pickups and drop-offs, earn
          points for recycling, donate points and redeem points for airtime or
          cash (together, the &quot;Service&quot;).
        </p>
        <p>
          For the purposes of the Nigeria Data Protection Act 2023
          (&quot;NDPA&quot;), Carus is the data controller of the personal data
          described in this policy. You can contact us about privacy at {mail}.
        </p>
      </>
    ),
  },
  {
    id: "data-we-collect",
    title: "Personal data we collect",
    body: (
      <>
        <p>We collect the following categories of data:</p>
        <ul>
          <li>
            <strong>Account data:</strong> first and last name, email address,
            phone number, gender, date of birth (optional), password (stored
            only in hashed form), profile picture, and whether you registered as
            an individual or a business.
          </li>
          <li>
            <strong>Business data:</strong> for business accounts, your company
            name and CAC registration number.
          </li>
          <li>
            <strong>Location data:</strong> the address, region, city and Local
            Government Area you provide for pickups, drop-offs and your profile.
            We do not collect your device&apos;s GPS location.
          </li>
          <li>
            <strong>Schedule data:</strong> the waste type, quantity, number of
            containers, date and status of each pickup or drop-off you book.
          </li>
          <li>
            <strong>Wallet and transaction data:</strong> your points balance,
            naira equivalent, donations, redemption requests and transaction
            history.
          </li>
          <li>
            <strong>Payout details:</strong> when you redeem points, the phone
            number and network (for airtime) or the bank name, account number
            and account name (for cash).
          </li>
          <li>
            <strong>Support and chatbot messages:</strong> complaints you send
            us and messages you type into the Carus assistant.
          </li>
          <li>
            <strong>Sign-in data from Google:</strong> if you choose Google
            sign-in, your name, email address and profile picture as provided by
            Google.
          </li>
          <li>
            <strong>Technical data:</strong> IP address, browser and device
            type, pages visited, error reports and, for a sample of sessions,
            session recordings (see Cookies and similar technologies below).
          </li>
        </ul>
        <p>
          We do not knowingly collect special categories of sensitive personal
          data (such as health, religious or biometric data).
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use your data and our legal bases",
    body: (
      <>
        <p>We process your data on the following bases under the NDPA:</p>
        <ul>
          <li>
            <strong>To provide the Service (contract):</strong> creating and
            securing your account, verifying your email with one-time codes,
            scheduling and fulfilling pickups and drop-offs, crediting points,
            processing donations and paying out redemptions.
          </li>
          <li>
            <strong>
              To communicate with you (contract / legitimate interests):
            </strong>{" "}
            sending verification codes, schedule updates, in-app and email
            notifications, and responding to complaints and support requests.
          </li>
          <li>
            <strong>
              To keep the Service safe (legitimate interests / legal
              obligation):
            </strong>{" "}
            preventing fraud and abuse, enforcing our Terms of Service,
            debugging errors and monitoring performance.
          </li>
          <li>
            <strong>To improve the Service (legitimate interests):</strong>{" "}
            understanding how the Service is used so we can fix problems and
            improve features.
          </li>
          <li>
            <strong>To meet legal duties:</strong> complying with applicable
            Nigerian law, tax, anti-money-laundering and lawful requests from
            authorities.
          </li>
          <li>
            <strong>Consent:</strong> where we rely on consent (for example,
            optional profile fields), you may withdraw it at any time.
          </li>
        </ul>
        <p>
          We do not sell your personal data, and we do not use it for
          third-party advertising.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share data with",
    body: (
      <>
        <p>
          We share personal data only with service providers that help us run
          the Service, and only as needed for them to do so:
        </p>
        <ul>
          <li>
            <strong>Interswitch</strong> – to process airtime and cash payouts
            (receives payout phone number or bank details and amount).
          </li>
          <li>
            <strong>Google</strong> – to provide Google sign-in, and to power
            the Carus assistant (your chatbot messages are sent to Google&apos;s
            generative AI service to produce replies).
          </li>
          <li>
            <strong>Cloudinary</strong> – to store and deliver profile pictures
            and images you upload.
          </li>
          <li>
            <strong>Sentry</strong> – for error monitoring, performance tracing
            and sampled session replay.
          </li>
          <li>
            <strong>Email delivery and hosting providers</strong> – to send
            transactional email and to host our servers and database.
          </li>
          <li>
            <strong>Collection partners and staff</strong> – the address, waste
            details and contact number needed for a pickup or drop-off to be
            carried out.
          </li>
        </ul>
        <p>
          We may also disclose data where required by law or a court order, to
          protect our rights, users or the public, or in connection with a
          merger, acquisition or sale of assets (in which case we will tell you
          and the acquirer must honour this policy).
        </p>
      </>
    ),
  },
  {
    id: "transfers",
    title: "International transfers",
    body: (
      <p>
        Some of our providers (for example Google, Cloudinary and Sentry) may
        process data outside Nigeria. Where we transfer personal data abroad, we
        do so in line with the NDPA, relying on adequate protection in the
        destination, contractual safeguards, or another lawful transfer
        mechanism.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and similar technologies",
    body: (
      <>
        <ul>
          <li>
            <strong>Essential cookies:</strong> we store a sign-in cookie
            (&quot;auth-user&quot;) in your browser that keeps you logged in.
            The Service cannot work without it.
          </li>
          <li>
            <strong>Local storage:</strong> we may keep small items in your
            browser (for example chatbot session identifiers and preferences) to
            make the Service work smoothly.
          </li>
          <li>
            <strong>Monitoring:</strong> Sentry may set identifiers and record a
            sample of sessions (about 10% of sessions, and sessions in which an
            error occurs) to help us diagnose problems.
          </li>
        </ul>
        <p>
          You can clear or block cookies in your browser settings, but doing so
          will sign you out and may stop parts of the Service working. We do not
          use advertising cookies.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep your data",
    body: (
      <>
        <p>
          We keep personal data only as long as needed for the purposes in this
          policy:
        </p>
        <ul>
          <li>
            Account, schedule and wallet data – for as long as your account is
            active, and afterwards while needed to resolve disputes and meet
            legal, tax and accounting obligations.
          </li>
          <li>
            Payout and transaction records – retained for the period required by
            applicable financial record-keeping rules.
          </li>
          <li>
            Support messages – for as long as needed to handle your request and
            for a reasonable period afterwards.
          </li>
          <li>Verification codes – only until they expire.</li>
        </ul>
        <p>
          When data is no longer needed we delete it or anonymise it so it can
          no longer identify you.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "How we protect your data",
    body: (
      <p>
        We use measures appropriate to the risk, including encrypted connections
        (HTTPS), hashed passwords, token-based authentication, role-based access
        controls for staff and admin tools, and limiting access to personal data
        to people who need it. No system is perfectly secure, so we cannot
        guarantee absolute security. If a breach affects your personal data in a
        way that is likely to cause you serious harm, we will notify you and the
        Nigeria Data Protection Commission as required by law. Please keep your
        password confidential and tell us immediately if you suspect
        unauthorised access to your account.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>Under the NDPA you have the right to:</p>
        <ul>
          <li>be informed about how your data is used (this policy);</li>
          <li>access the personal data we hold about you;</li>
          <li>have inaccurate or incomplete data corrected;</li>
          <li>
            ask us to delete your data, where we no longer have a lawful reason
            to keep it;
          </li>
          <li>
            restrict or object to processing based on our legitimate interests,
            or to direct marketing;
          </li>
          <li>
            receive your data in a structured, commonly used, machine-readable
            format (data portability);
          </li>
          <li>
            withdraw consent at any time, without affecting past processing;
          </li>
          <li>
            not be subject to a decision based solely on automated processing
            that significantly affects you.
          </li>
        </ul>
        <p>
          You can update most profile details yourself in Settings. For any
          other request, email {mail}. We may need to verify your identity first
          and will respond within the time required by law. You also have the
          right to complain to the Nigeria Data Protection Commission
          (ndpc.gov.ng).
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        The Service is intended for people aged 18 and over. We do not knowingly
        collect personal data from children. If you believe a child has given us
        personal data, contact us at {mail} and we will delete it.
      </p>
    ),
  },
  {
    id: "third-party-links",
    title: "Third-party links",
    body: (
      <p>
        The Service links to third-party sites such as our social media pages.
        We are not responsible for their privacy practices, so please read their
        policies.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. The &quot;Last
        updated&quot; date at the top shows when it last changed. If we make
        material changes we will notify you by email or in the Service before
        they take effect.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions or requests about this policy or your personal data? Email{" "}
        {mail}. We are based in Lagos, Nigeria.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="Your privacy matters to us. This policy explains what personal data Carus Recycling collects when you use our website and services, why we collect it, who we share it with, and the choices and rights you have."
      sections={sections}
      otherPage={{ href: "/terms", label: "Terms of Service" }}
    />
  );
}
