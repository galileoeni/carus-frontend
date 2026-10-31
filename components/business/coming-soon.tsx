import type { LucideIcon } from "lucide-react";

// Placeholder for portal sections that are still being built
export default function PortalComingSoon({
  icon: Icon,
  title,
  description,
  points,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
}) {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-black">{title}</h1>
      <div className="mt-6 rounded-[22px] bg-white border border-primary-10 p-8 md:p-12 text-center flex flex-col items-center">
        <div className="size-16 rounded-2xl bg-primary-10 text-primary-60 flex items-center justify-center">
          <Icon className="size-8" />
        </div>
        <p className="mt-5 text-xs font-bold tracking-widest uppercase text-primary-60">
          Coming soon
        </p>
        <p className="mt-2 max-w-lg text-grey-50">{description}</p>
        <ul className="mt-6 text-left space-y-2 text-sm">
          {points.map((p) => (
            <li key={p} className="flex gap-2">
              <span className="mt-1.5 size-1.5 rounded-full bg-primary-40 shrink-0" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
