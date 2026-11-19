"use client";

import { ArrowUp, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navLinks, siteConfig } from "@/lib/site-config";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#home");
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  // Scroll state: header elevation, reading progress, back-to-top visibility.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      setScrolled(y > 8);
      setShowTop(y > 900);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Highlight the section currently in the middle of the viewport.
  useEffect(() => {
    const sections = ["home", "about", "profile", "gallery", "connect"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          // The Professional Profile section belongs to "About" in the menu.
          const id = entry.target.id === "profile" ? "about" : entry.target.id;
          setActive(`#${id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Close the mobile menu on Escape and when resizing up to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-[border-color,box-shadow] duration-500 supports-[backdrop-filter]:bg-white/80 ${
          scrolled || open ? "border-line shadow-[0_1px_24px_-12px_rgba(23,23,23,0.12)]" : "border-transparent"
        }`}
      >
        <nav aria-label="Primary" className="container-site flex h-16 items-center justify-between md:h-[4.5rem]">
          <a
            href="#home"
            onClick={() => setOpen(false)}
            className="group flex animate-fade items-center gap-3 font-sans text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-ink"
          >
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center border border-ink font-serif text-[0.95rem] font-medium normal-case tracking-normal transition-colors duration-500 group-hover:bg-ink group-hover:text-white"
            >
              {siteConfig.givenName[0]}
              {siteConfig.familyName[0]}
            </span>
            {siteConfig.name}
          </a>

          <ul className="hidden items-center gap-10 md:flex">
            {navLinks.map((link, i) => {
              const isActive = active === link.href;
              return (
                <li key={link.href} className="animate-fade" style={{ animationDelay: `${150 + i * 70}ms` }}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`group relative py-2 text-[0.78rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 hover:text-ink ${
                      isActive ? "text-ink" : "text-muted"
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-500 ease-soft ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative h-[22px] w-[22px]">
              <Menu
                size={22}
                strokeWidth={1.5}
                className={`absolute inset-0 transition-all duration-300 ${open ? "rotate-90 opacity-0" : "opacity-100"}`}
              />
              <X
                size={22}
                strokeWidth={1.5}
                className={`absolute inset-0 transition-all duration-300 ${open ? "opacity-100" : "-rotate-90 opacity-0"}`}
              />
            </span>
          </button>
        </nav>

        {/* Mobile menu — animates open via grid rows; `inert` keeps hidden links out of tab order. */}
        <div
          id="mobile-menu"
          inert={!open}
          className={`grid transition-[grid-template-rows] duration-500 ease-soft md:hidden ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <ul className="container-site border-t border-line pb-6 pt-2">
              {navLinks.map((link, i) => (
                <li
                  key={link.href}
                  className={`border-b border-line transition-all duration-500 ease-soft ${
                    open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                  }`}
                  style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-4 font-serif text-[1.65rem] text-ink"
                  >
                    {link.label}
                    <span className="font-sans text-[0.7rem] tracking-label text-muted">0{i + 1}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reading progress */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-[-1px] h-px">
          <div ref={progressRef} className="h-full origin-left scale-x-0 bg-accent" />
        </div>
      </header>

      {/* Floating back-to-top */}
      <a
        href="#home"
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        aria-hidden={!showTop}
        className={`fixed bottom-5 right-5 z-40 flex h-11 w-11 sm:bottom-6 sm:right-6 sm:h-12 sm:w-12 items-center justify-center border border-line bg-white text-ink shadow-[0_8px_30px_-12px_rgba(23,23,23,0.25)] transition-all duration-500 ease-soft hover:border-ink hover:bg-ink hover:text-white ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp size={18} strokeWidth={1.5} />
      </a>
    </>
  );
}
