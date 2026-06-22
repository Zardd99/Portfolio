"use client";

import { useEffect, useRef } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Contacts } from "../constants/contact";
import { scrambleText } from "../lib/scramble";
import ContactForm from "./contact/ContactForm";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const info = Contacts[0];
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const cards = [
    { icon: Mail, label: "EMAIL", value: info.email, href: `mailto:${info.email}` },
    { icon: Phone, label: "PHONE", value: info.phone, href: `tel:${info.phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: "LOCATION", value: info.address, href: undefined },
  ];

  return (
    <section
      id="contact"
      ref={rootRef}
      className="relative w-full border-t border-line px-6 py-28 md:px-12"
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-[1600px]">
        <div className="contact-reveal mb-4 font-hud text-[11px] text-accent">
          ■ 03 / GET IN TOUCH
        </div>
        <h2
          className="contact-reveal font-display text-[18vw] leading-[0.82] md:text-[12vw]"
          onMouseEnter={(e) => scrambleText(e.currentTarget, "LET'S BUILD")}
        >
          LET&apos;S BUILD
        </h2>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-10">
            <p className="contact-reveal max-w-md text-base leading-relaxed text-muted">
              {info.description2}
            </p>
            <div className="space-y-px border border-line bg-line">
              {cards.map((c) => {
                const Inner = (
                  <div className="group flex items-center justify-between bg-[#0a0a0b] p-6 transition-colors hover:bg-[#101013]">
                    <div className="flex items-center gap-4">
                      <c.icon size={18} className="text-accent" />
                      <div>
                        <div className="font-hud text-[9px] text-muted">{c.label}</div>
                        <div className="mt-1 text-sm text-ink">{c.value}</div>
                      </div>
                    </div>
                    {c.href && (
                      <span className="font-hud text-[10px] text-muted transition-colors group-hover:text-accent">
                        →
                      </span>
                    )}
                  </div>
                );
                return (
                  <div key={c.label} className="contact-reveal">
                    {c.href ? <a href={c.href}>{Inner}</a> : Inner}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="contact-reveal">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
