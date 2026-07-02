"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedContent from "@/components/AnimatedContent";
import DecryptedText from "@/components/DecryptedText";
import StarBorder from "@/components/StarBorder";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/data/site";

export function CTA() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <AnimatedContent distance={30} duration={0.6}>
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
            <DecryptedText
              text={site.contact.headline}
              animateOn="view"
              speed={40}
              maxIterations={15}
              sequential={true}
              revealDirection="center"
              className="text-foreground"
              encryptedClassName="text-muted-foreground/40"
            />
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] text-muted-foreground">
            {site.contact.subhead}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <StarBorder
              as="a"
              href={`mailto:${site.email}`}
              speed="5s"
              className="cursor-pointer"
            >
              <span className="flex items-center gap-2 text-sm font-medium">
                Start a project
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </StarBorder>
            <Link
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("work")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "h-10 cursor-pointer px-5 text-sm",
              })}
            >
              View our work
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">{site.email}</p>
        </AnimatedContent>
      </div>
    </section>
  );
}
