"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { IPhoneMockup } from "@/components/iphone-mockup";
import { MenuPill } from "@/components/menu-pill";
import { GlassPanel } from "@/components/ui/glass-panel";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const StlModelViewer = dynamic(
  () =>
    import("@/components/StlModelViewer").then((mod) => mod.StlModelViewer),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse rounded-2xl bg-black/5" aria-hidden />
    ),
  },
);

type ProjectDetailViewProps = {
  project: Project;
};

function HeadlineSegments({
  segments,
  className,
}: {
  segments: { text: string; emphasis?: boolean }[];
  className?: string;
}) {
  return (
    <h1 className={className}>
      {segments.map((seg, i) => (
        <span
          key={i}
          className={
            seg.emphasis
              ? "font-bold text-neutral-900"
              : "font-medium text-neutral-600"
          }
        >
          {seg.text}
        </span>
      ))}
    </h1>
  );
}

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const defaultImageIndex = project.model ? 0 : 0;
  const [activeImage, setActiveImage] = useState(defaultImageIndex);
  const showModel = Boolean(project.model && activeImage === 0);
  const previewImageIndex = project.model
    ? Math.max(0, activeImage - 1)
    : activeImage;

  const thumbnails = project.model
    ? [
        { type: "model" as const },
        ...project.images.map((img) => ({ type: "image" as const, img })),
      ]
    : project.images.map((img) => ({ type: "image" as const, img }));

  const activeScreen =
    project.images[previewImageIndex]?.src ?? project.thumbnail;

  return (
    <>
      <div className="bg-white">
        {/* Hero — same framed card language as project slides */}
        <section className="min-h-svh p-2.5 sm:p-3">
          <div className="relative min-h-[calc(100svh-1.25rem)] overflow-hidden rounded-[2.5rem] sm:min-h-[calc(100svh-1.5rem)] sm:rounded-[2.75rem]">
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.5rem] sm:rounded-[2.75rem]"
              aria-hidden
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br",
                  project.frameGradient,
                )}
              />
              <div className="absolute -top-[20%] left-[5%] h-[60%] w-[50%] rounded-full bg-orange-400/45 blur-[110px]" />
              <div className="absolute top-[10%] -right-[10%] h-[55%] w-[45%] rounded-full bg-sky-400/40 blur-[110px]" />
              <div className="absolute -bottom-[15%] left-[25%] h-[50%] w-[45%] rounded-full bg-amber-300/45 blur-[110px]" />
            </div>

            <Link
              href="/#work"
              className="absolute top-5 left-5 z-20 inline-flex items-center gap-2 rounded-full bg-black/80 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-black sm:top-7 sm:left-7"
            >
              <span aria-hidden>←</span>
              Back
            </Link>

            <div className="relative grid min-h-[calc(100svh-1.25rem)] grid-rows-[auto_1fr] gap-[10px] p-[10px] pt-16 sm:min-h-[calc(100svh-1.5rem)] sm:pt-[4.5rem] md:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] md:grid-rows-1 md:pt-[10px]">
              {/* Left — info */}
              <GlassPanel
                variant="light"
                className="flex min-h-[340px] flex-col overflow-hidden rounded-[2.25rem] sm:rounded-[2.5rem]"
              >
                <div className="flex flex-1 flex-col px-8 pt-8 sm:px-10 sm:pt-10 lg:px-11 lg:pt-11">
                  <span
                    className={cn(
                      "inline-flex w-fit rounded-full px-8 py-3 text-xl font-semibold text-white sm:px-10 sm:py-4 sm:text-2xl",
                      project.badgeClass,
                    )}
                  >
                    {project.title}
                  </span>

                  <div className="flex flex-1 flex-col justify-center py-10 sm:py-14 lg:py-16">
                    <HeadlineSegments
                      segments={project.headlineSegments}
                      className="max-w-[15rem] text-[1.6rem] leading-[1.18] tracking-tight sm:max-w-[17rem] sm:text-[2rem] lg:max-w-xs lg:text-[2.25rem]"
                    />
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-neutral-400">
                      {project.slideTags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-auto p-[10px]">
                  <GlassPanel
                    variant="inset"
                    className={cn(
                      "rounded-[1.875rem] p-8 sm:rounded-[2rem] sm:p-10",
                      project.insetClass,
                    )}
                  >
                    <p className="text-[15px] leading-[1.55] font-semibold text-black sm:text-base">
                      {project.blurb}
                    </p>
                    <p className="mt-4 text-sm text-neutral-600">
                      {project.readTime}
                    </p>
                  </GlassPanel>
                </div>
              </GlassPanel>

              {/* Right — phone / preview */}
              <GlassPanel
                variant="warm"
                className="relative flex min-h-[360px] flex-col rounded-[2.25rem] sm:min-h-0 sm:rounded-[2.5rem]"
              >
                <div className="flex h-full flex-col items-center justify-center gap-4 px-6 py-10 sm:gap-5 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
                  <GlassPanel
                    variant="screen"
                    className="w-full max-w-[min(90%,320px)] shrink-0 rounded-[1.75rem] p-3 sm:rounded-[2rem] sm:p-4"
                  >
                    {showModel ? (
                      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[1.35rem] bg-white/95 sm:rounded-[1.5rem]">
                        <StlModelViewer
                          url={project.model!.src}
                          color={project.model!.color}
                          scale={project.model!.scale}
                          showHint
                        />
                      </div>
                    ) : (
                      <IPhoneMockup
                        screenSrc={activeScreen}
                        screenAlt={project.title}
                        className="max-w-none"
                        priority
                      />
                    )}
                  </GlassPanel>

                  {thumbnails.length > 1 && (
                    <GlassPanel
                      variant="pill"
                      className="flex w-auto max-w-full shrink-0 items-center justify-center rounded-full px-3 py-2 sm:px-4"
                    >
                      <div className="flex items-center gap-1.5 overflow-x-auto sm:gap-2">
                        {thumbnails.slice(0, 7).map((item, thumbIndex) => {
                          const isActive = activeImage === thumbIndex;

                          if (item.type === "model") {
                            return (
                              <button
                                key="model"
                                type="button"
                                onClick={() => setActiveImage(0)}
                                className={cn(
                                  "relative h-8 w-12 shrink-0 overflow-hidden rounded-lg border border-white/50 bg-white/60 transition-all sm:h-9 sm:w-[3rem]",
                                  isActive
                                    ? "ring-2 ring-white/90 shadow-md"
                                    : "opacity-55 hover:opacity-100",
                                )}
                                aria-label={`${project.title} 3D model`}
                              >
                                <div className="flex h-full w-full items-center justify-center text-[9px] font-semibold text-neutral-600">
                                  3D
                                </div>
                              </button>
                            );
                          }

                          return (
                            <button
                              key={item.img.src}
                              type="button"
                              onClick={() => setActiveImage(thumbIndex)}
                              className={cn(
                                "relative h-8 w-12 shrink-0 overflow-hidden rounded-lg border border-white/50 bg-white/80 transition-all sm:h-9 sm:w-[3rem]",
                                isActive
                                  ? "ring-2 ring-white/90 shadow-md"
                                  : "opacity-55 hover:opacity-100",
                              )}
                            >
                              <Image
                                src={item.img.src}
                                alt={item.img.alt}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </button>
                          );
                        })}
                      </div>
                    </GlassPanel>
                  )}
                </div>
              </GlassPanel>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-muted-foreground">
              {siteStrapline}
            </p>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-neutral-500 sm:text-lg sm:leading-[1.55]">
              {project.description}
            </p>
          </div>
        </section>

        {/* Case study sections */}
        {project.detail.caseStudySections.length > 0 && (
          <section className="border-t border-neutral-100 px-6 py-20 sm:px-8 sm:py-28">
            <div className="mx-auto max-w-3xl space-y-12">
              {project.detail.caseStudySections.map((section) => (
                <article key={section.id}>
                  <h2 className="text-sm font-semibold tracking-wide text-neutral-400 uppercase">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-[1.0625rem] leading-relaxed text-neutral-600 sm:text-lg">
                    {section.content}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* All screens */}
        {project.images.length > 1 && (
          <section className="bg-neutral-50 px-6 py-20 sm:px-8 sm:py-28">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                Screens &amp; assets
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {project.images.map((image) => (
                  <GlassPanel
                    key={image.src}
                    variant="light"
                    className="overflow-hidden rounded-[1.75rem] p-3 sm:rounded-[2rem] sm:p-4"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-white sm:rounded-[1.5rem]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={
                          project.previewFit === "contain"
                            ? "object-contain p-4"
                            : "object-contain object-top p-2"
                        }
                      />
                    </div>
                    <p className="mt-3 px-1 text-sm text-neutral-500">
                      {image.alt}
                    </p>
                  </GlassPanel>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <Footer />
      <MenuPill />
    </>
  );
}

const siteStrapline =
  "A look into the messy, magical journey behind our products.";
