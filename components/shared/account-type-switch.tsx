import Link from "next/link";

// Individual / Business tabs shown at the top of the login pages
export default function AccountTypeSwitch({
  active,
}: {
  active: "individual" | "business";
}) {
  const tab = (key: "individual" | "business", label: string, href: string) => (
    <Link
      href={href}
      aria-current={active === key ? "page" : undefined}
      className={`flex-1 h-10 rounded-full flex items-center justify-center text-sm md:text-base text-[#4F4F4F] transition-colors ${
        active === key
          ? "bg-[#CCE1D7] font-bold"
          : "bg-white hover:bg-[#E6F0EB]"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="w-full flex gap-2 md:gap-4 items-center rounded-full bg-[#F3F3F3] h-[56px] px-2 mb-8">
      {tab("individual", "As an Individual", "/login")}
      {tab("business", "As a Business", "/business/login")}
    </div>
  );
}
