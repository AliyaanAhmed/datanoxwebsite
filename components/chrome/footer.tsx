import Link from "next/link";
import type { Route } from "next";
import { Logo } from "@/components/brand/logo";
import { footerColumns, routes, href } from "@/lib/routes";
import { site } from "@/content/site";

/**
 * The live site closes every page with "Built for Microsoft Ecoystem."
 * That typo appears on 22 of 23 pages. It is corrected here, and the line
 * now says something rather than nothing.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-o-100">
      <div className="mx-auto max-w-[90rem] px-6 sm:px-8 lg:px-10">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.4fr_2.6fr] lg:gap-16 lg:py-20">
          <div className="flex flex-col gap-6">
            <Logo className="h-[1.15rem] w-auto text-white" />
            <p className="measure-tight text-[0.9375rem] leading-relaxed text-o-100/65">
              {site.shortDefinition}
            </p>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-o-300">
              {site.regions[0]}, {site.regions[1]}, {site.regions[2]} and{" "}
              {site.regions[3]}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.label}>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-o-400">
                  {column.label}
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.keys.map((key) => (
                    <li key={key}>
                      <Link
                        href={href(key) as Route}
                        className="text-[0.9375rem] text-o-100/70 transition-colors hover:text-o-400"
                      >
                        {routes[key].label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-white/10 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-[0.9375rem] !text-o-100/80">
            Built for the Microsoft ecosystem.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8125rem] text-o-100/50">
            <span>
              {"©"} {year} {site.name}
            </span>
            <Link
              href={href("privacy") as Route}
              className="transition-colors hover:text-o-400"
            >
              Privacy
            </Link>
            <Link
              href={href("terms") as Route}
              className="transition-colors hover:text-o-400"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
