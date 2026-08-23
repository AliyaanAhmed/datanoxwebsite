"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Route } from "next";

import { Reveal } from "@/components/ui/reveal";
import { IconChip, type IconName } from "@/components/ui/icons";
import { PaperGate } from "./paper-gate";
import { href, type RouteKey } from "@/lib/routes";

/**
 * The white paper library.
 *
 * Each card opens a short form before the download rather than linking
 * straight at the file. The cards themselves, including every title and
 * description, are still rendered into the static HTML, so nothing about the
 * gate hides the library from a search engine or from a reader deciding
 * whether a paper is worth their email address.
 */

export type Paper = {
  name: string;
  file: string;
  blurb: string;
  icon: IconName;
  product: RouteKey;
};

export function PaperLibrary({ papers }: { papers: Paper[] }) {
  const [open, setOpen] = useState<Paper | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {papers.map((paper, index) => (
          <Reveal as="li" key={paper.file} delay={index * 70}>
            <div className="flex h-full flex-col rounded-lg bg-surface p-7 shadow-[var(--shadow-soft)] ring-1 ring-rule transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] hover:ring-o-200 lg:p-8">
              <IconChip name={paper.icon} />
              <h3 className="mt-5 text-d4">{paper.name}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed">
                {paper.blurb}
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-7">
                <button
                  type="button"
                  onClick={() => setOpen(paper)}
                  className="group inline-flex items-center gap-2 font-medium text-o-700 transition-colors hover:text-o-800"
                >
                  Get the paper
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 2.5v9M4.5 8L8 11.5 11.5 8M2.5 13.5h11" />
                  </svg>
                </button>
                <Link
                  href={href(paper.product) as Route}
                  className="text-[0.875rem] text-muted underline underline-offset-4 transition-colors hover:text-o-700"
                >
                  Product page
                </Link>
              </div>
              <noscript>
                <a
                  href={paper.file}
                  download
                  className="mt-4 inline-block text-[0.875rem] text-o-700 underline underline-offset-4"
                >
                  Download without the form
                </a>
              </noscript>
            </div>
          </Reveal>
        ))}
      </ul>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Download ${open.name}`}
          className="fixed inset-0 z-[80] flex items-end justify-center overflow-y-auto bg-ink/40 p-4 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(null);
          }}
        >
          <div className="relative w-full max-w-[30rem] rounded-xl bg-surface p-7 shadow-[var(--shadow-lift)] ring-1 ring-rule lg:p-9">
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-o-50 hover:text-ink"
            >
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              >
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
            <PaperGate
              paper={open.name}
              file={open.file}
              onClose={() => setOpen(null)}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
