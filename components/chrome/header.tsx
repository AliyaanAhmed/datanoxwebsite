"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Route } from "next";

import { Logo } from "@/components/brand/logo";
import { nav, routes, href, type NavIcon, type RouteKey } from "@/lib/routes";
import { Action, ArrowRight } from "@/components/ui/primitives";
import {
  IconD365,
  IconPlatform,
  IconAi,
  IconGovernance,
  IconForm,
  IconAssessment,
  IconInsureOs,
  IconBrokerOs,
  IconNonprofit,
  IconInsurance,
  IconEducation,
  IconBlog,
  IconCaseStudy,
  IconPaper,
  IconCompare,
  IconAbout,
  IconPartners,
  IconClients,
  IconGovernment,
  IconMigration,
  IconContact,
} from "./nav-icons";

const icons: Record<NavIcon, (p: { className?: string }) => React.ReactElement> = {
  d365: IconD365,
  platform: IconPlatform,
  ai: IconAi,
  governance: IconGovernance,
  form: IconForm,
  assessment: IconAssessment,
  insureos: IconInsureOs,
  brokeros: IconBrokerOs,
  nonprofit: IconNonprofit,
  insurance: IconInsurance,
  education: IconEducation,
  blog: IconBlog,
  caseStudy: IconCaseStudy,
  paper: IconPaper,
  compare: IconCompare,
  about: IconAbout,
  contact: IconContact,
  partners: IconPartners,
  clients: IconClients,
  government: IconGovernment,
  migration: IconMigration,
};

/**
 * Every navigation parent resolves to a real page. There is no href of "#"
 * anywhere in this build, which the guards enforce.
 *
 * Panels open on hover and on click, close on Escape and on outside click,
 * and the whole group is keyboard reachable.
 */
export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close every panel when the route changes. Adjusting during render rather
  // than in an effect, because an effect here schedules a second render pass
  // in which the menu is still visibly open over the new page.
  const [menuRoute, setMenuRoute] = useState(pathname);
  if (menuRoute !== pathname) {
    setMenuRoute(pathname);
    setMobileOpen(false);
    setOpenGroup(null);
    setOpenMobileGroup(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenGroup(null);
      setMobileOpen(false);
    };
    const onClick = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenGroup(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const hoverOpen = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenGroup(label);
  }, []);

  const hoverClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenGroup(null), 140);
  }, []);

  const isCurrent = (key: RouteKey) => {
    const path = href(key);
    return path === "/" ? pathname === "/" : pathname.startsWith(path);
  };

  const groupIsCurrent = (children: { key: RouteKey }[]) =>
    children.some((child) => isCurrent(child.key));

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-b border-rule bg-canvas/80 shadow-[0_1px_24px_-12px_rgba(122,62,12,0.25)] backdrop-blur-xl"
          : "border-b border-transparent bg-canvas"
      }`}
    >
      <div
        ref={navRef}
        className="mx-auto flex h-[4.25rem] max-w-[88rem] items-center gap-6 px-5 sm:px-8 lg:h-[4.75rem] lg:px-12"
      >
        <Link
          href="/"
          className="shrink-0 text-ink transition-opacity hover:opacity-70"
          aria-label="Datanox home"
        >
          <Logo className="h-5 w-auto" />
        </Link>

        {/* ---------------- Desktop ---------------- */}
        <nav aria-label="Main" className="hidden flex-1 lg:block">
          <ul className="flex items-center gap-0.5">
            {nav.map((group) => {
              const open = openGroup === group.label;
              const active = group.key
                ? isCurrent(group.key)
                : groupIsCurrent(group.children);

              // A group with no children is a page in its own right, so it
              // renders as a link rather than a panel trigger. No empty
              // dropdown, and no parent that resolves to nothing.
              if (group.children.length === 0 && group.key) {
                return (
                  <li key={group.label}>
                    <Link
                      href={href(group.key) as Route}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center rounded-pill px-3.5 py-2 text-[0.9375rem] font-medium transition-colors ${
                        active
                          ? "bg-o-50 text-o-700"
                          : "text-ink-2 hover:bg-o-50/70 hover:text-o-700"
                      }`}
                    >
                      {group.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => hoverOpen(group.label)}
                  onMouseLeave={hoverClose}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenGroup(open ? null : group.label)}
                    className={`relative flex items-center gap-1.5 rounded-pill px-3.5 py-2 text-[0.9375rem] font-medium transition-colors ${
                      open || active
                        ? "bg-o-50 text-o-700"
                        : "text-ink-2 hover:bg-o-50/70 hover:text-o-700"
                    }`}
                  >
                    {group.label}
                    <svg
                      viewBox="0 0 10 6"
                      aria-hidden="true"
                      className={`h-1.5 w-2.5 opacity-60 transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 1.5l4 3 4-3" />
                    </svg>
                  </button>

                  <div
                    className={`absolute left-0 top-full pt-2.5 transition-all duration-200 ${
                      group.columns === 2 ? "w-[38rem]" : "w-[25rem]"
                    } ${
                      open
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-1.5 opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden rounded-xl border border-rule bg-surface shadow-[var(--shadow-lift)]">
                      <ul
                        className={`grid gap-1 p-2.5 ${
                          group.columns === 2 ? "grid-cols-2" : "grid-cols-1"
                        }`}
                      >
                        {group.children.map((child) => {
                          const Icon = icons[child.icon];
                          const current = isCurrent(child.key);
                          return (
                            <li key={child.key}>
                              <Link
                                href={href(child.key) as Route}
                                aria-current={current ? "page" : undefined}
                                className={`group flex items-start gap-3.5 rounded-lg p-3 transition-colors ${
                                  current ? "bg-o-50" : "hover:bg-o-50"
                                }`}
                              >
                                <Icon />
                                <span className="min-w-0">
                                  <span className="flex items-center gap-1.5 font-display text-[0.9375rem] font-semibold text-ink">
                                    {routes[child.key].label}
                                    <ArrowRight className="text-o-600 opacity-0 transition-opacity group-hover:opacity-100" />
                                  </span>
                                  <span className="mt-1 block text-[0.8125rem] leading-snug text-muted">
                                    {child.blurb}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>

                      {group.footer ? (
                        <Link
                          href={href(group.footer.key) as Route}
                          className="group flex items-center justify-between gap-4 border-t border-rule bg-warm-1 px-5 py-4 transition-colors hover:bg-o-50"
                        >
                          <span className="text-[0.8125rem] leading-snug text-ink-2">
                            {group.footer.label}
                          </span>
                          <span className="flex shrink-0 items-center gap-1.5 text-[0.8125rem] font-medium text-o-700">
                            {group.footer.blurb}
                            <ArrowRight />
                          </span>
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <Link
            href={href("contact") as Route}
            className="rounded-pill px-4 py-2 text-[0.9375rem] font-medium text-ink-2 transition-colors hover:text-o-700"
          >
            Talk to sales
          </Link>
          <Action href={href("contact")} className="!px-5 !py-3">
            Book a demo
          </Action>
        </div>

        {/* ---------------- Mobile trigger ---------------- */}
        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          className="ml-auto grid h-10 w-10 place-items-center rounded-full text-ink ring-1 ring-rule transition-colors hover:bg-o-50 lg:hidden"
        >
          <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          <span className="relative block h-3 w-4.5" aria-hidden="true">
            <span
              className={`absolute left-0 block h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
                mobileOpen ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-full rounded-full bg-current transition-opacity duration-200 ${
                mobileOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
                mobileOpen ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {/* ---------------- Mobile panel ---------------- */}
      <div
        id="mobile-nav"
        hidden={!mobileOpen}
        className="max-h-[calc(100dvh-4.25rem)] overflow-y-auto border-t border-rule bg-canvas lg:hidden"
      >
        <nav aria-label="Main, mobile" className="px-5 pb-8 pt-4 sm:px-8">
          <ul className="flex flex-col">
            {nav.map((group) => {
              const open = openMobileGroup === group.label;

              if (group.children.length === 0 && group.key) {
                return (
                  <li key={group.label} className="border-b border-rule">
                    <Link
                      href={href(group.key) as Route}
                      aria-current={isCurrent(group.key) ? "page" : undefined}
                      className="flex w-full items-center justify-between py-4 font-display text-[1.0625rem] font-semibold text-ink"
                    >
                      {group.label}
                      <ArrowRight className="text-o-600" />
                    </Link>
                  </li>
                );
              }

              return (
                <li key={group.label} className="border-b border-rule">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenMobileGroup(open ? null : group.label)}
                    className="flex w-full items-center justify-between py-4 text-left"
                  >
                    <span className="font-display text-[1.0625rem] font-semibold text-ink">
                      {group.label}
                    </span>
                    <span
                      className={`grid h-7 w-7 place-items-center rounded-full ring-1 transition-colors ${
                        open
                          ? "bg-o-50 text-o-700 ring-o-200"
                          : "text-muted ring-rule"
                      }`}
                    >
                      <svg
                        viewBox="0 0 10 6"
                        aria-hidden="true"
                        className={`h-1.5 w-2.5 transition-transform duration-200 ${
                          open ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 1.5l4 3 4-3" />
                      </svg>
                    </span>
                  </button>

                  <ul hidden={!open} className="flex flex-col gap-1 pb-3">
                    {group.children.map((child) => {
                      const Icon = icons[child.icon];
                      return (
                        <li key={child.key}>
                          <Link
                            href={href(child.key) as Route}
                            aria-current={isCurrent(child.key) ? "page" : undefined}
                            className="flex items-start gap-3.5 rounded-lg p-3 transition-colors hover:bg-o-50"
                          >
                            <Icon />
                            <span>
                              <span className="block font-display text-[0.9375rem] font-semibold text-ink">
                                {routes[child.key].label}
                              </span>
                              <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted">
                                {child.blurb}
                              </span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>

          <div className="mt-7 flex flex-col gap-3">
            <Action href={href("contact")} className="w-full">
              Book a demo
            </Action>
            <Action href={href("resources")} variant="ghost" className="w-full">
              Read a white paper
              <ArrowRight />
            </Action>
          </div>
        </nav>
      </div>
    </header>
  );
}
