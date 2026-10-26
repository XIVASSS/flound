"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { IPhoneMockup } from "@/components/iphone-mockup";
import { MenuPill } from "@/components/menu-pill";
import {
  ProjectStills,
  SlideshowDots,
  useProjectSlideshow,
} from "@/components/project-slideshow";
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
  const slideCount = (project.model ? 1 : 0) + project.images.length;
  const { index: activeImage, outgoing, select, reduceMotion, setPaused } =
    useProjectSlideshow(slideCount, !project.model);
  const showModel = Boolean(project.model && activeImage === 0);
  const previewImageIndex = project.model
    ? Math.max(0, activeImage - 1)
    : activeImage;
  const activeStill = project.images[previewImageIndex];
  const showPhone = !showModel && activeStill?.frame === "phone";
  const showDirect =
    !showModel &&
    !showPhone &&
    activeStill?.tone === "dark" &&
    activeStill.fit !== "cover";
  const showWide = !showModel && !showPhone && activeStill?.fit === "cover";

  const slideLabels = [
    ...(project.model ? [`${project.title} 3D model`] : []),
    ...project.images.map((img) => img.alt),
  ];

  const activeScreen =
    project.images[previewImageIndex]?.src ?? project.thumbnail;

  return (
    <>
      <div className="bg-white">
        {/* Hero — same framed card language as project slides */}
        <section className="p-2.5 sm:p-3 lg:min-h-svh">
          <div className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem] lg:min-h-[calc(100svh-1.5rem)] lg:rounded-[2.75rem]">
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

            <div className="relative grid grid-rows-[auto_auto] gap-2 p-2 pt-16 sm:gap-[10px] sm:p-[10px] sm:pt-[4.5rem] lg:min-h-[calc(100svh-1.5rem)] lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] lg:grid-rows-1 lg:pt-[10px]">
              {/* Left — info */}
              <GlassPanel
                variant="light"
                className="flex min-h-0 flex-col overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] lg:min-h-[340px] lg:rounded-[2.5rem]"
              >
                <div className="flex flex-1 flex-col px-5 pt-5 sm:px-8 sm:pt-8 lg:px-11 lg:pt-11">
                  <span
                    className={cn(
                      "inline-flex w-fit rounded-full px-5 py-2 text-base font-semibold text-white sm:px-8 sm:py-3 sm:text-xl lg:px-10 lg:py-4 lg:text-2xl",
                      project.badgeClass,
                    )}
                  >
                    {project.title}
                  </span>

                  <div className="flex flex-1 flex-col justify-center py-6 sm:py-10 lg:py-16">
                    <HeadlineSegments
                      segments={project.headlineSegments}
                      className="max-w-[18rem] text-[1.35rem] leading-[1.2] tracking-tight sm:max-w-[17rem] sm:text-[1.7rem] lg:max-w-xs lg:text-[2.25rem]"
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
                      "rounded-[1.35rem] p-5 sm:rounded-[1.75rem] sm:p-8 lg:p-10",
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
                className="relative flex min-h-[280px] flex-col rounded-[1.5rem] sm:min-h-[360px] sm:rounded-[2rem] lg:min-h-0 lg:rounded-[2.5rem]"
              >
                <div
                  className="flex h-full flex-col items-center justify-center gap-4 px-4 py-6 sm:gap-5 sm:px-8 sm:py-10 lg:px-12 lg:py-14"
                  onMouseEnter={() => {
                    if (window.matchMedia("(hover: hover)").matches) setPaused(true);
                  }}
                  onMouseLeave={() => setPaused(false)}
                >
                  <GlassPanel
                    variant="screen"
                    className={cn(
                      "w-full shrink-0 rounded-[1.75rem] p-3 sm:rounded-[2rem] sm:p-4",
                      showPhone || showModel
                        ? "max-w-[min(90%,320px)]"
                        : "max-w-[min(90%,560px)]",
                    )}
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
                    ) : showPhone ? (
                      <IPhoneMockup
                        screenSrc={activeScreen}
                        screenAlt={activeStill?.alt ?? project.title}
                        className="max-w-none"
                        priority
                      />
                    ) : showDirect && activeStill ? (
                      <div className="overflow-hidden rounded-[1.35rem] bg-[#2d2e32] p-4 sm:rounded-[1.5rem] sm:p-5">
                        <Image
                          src={activeStill.src}
                          alt={activeStill.alt}
                          width={1024}
                          height={925}
                          sizes="(max-width: 768px) 80vw, 520px"
                          className="h-auto w-full"
                          priority
                        />
                      </div>
                    ) : showWide && activeStill ? (
                      <div className="relative aspect-video w-full overflow-hidden rounded-[1.35rem] bg-[#2d2e32] sm:rounded-[1.5rem]">
                        <Image
                          src={activeStill.src}
                          alt={activeStill.alt}
                          fill
                          sizes="(max-width: 768px) 80vw, 520px"
                          className="object-cover"
                          priority
                        />
                      </div>
                    ) : (
                      <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[1.35rem] bg-white/95 sm:rounded-[1.5rem]">
                        <ProjectStills
                          images={project.images}
                          activeIndex={previewImageIndex}
                          outgoingIndex={outgoing}
                          reduceMotion={reduceMotion}
                          priority
                          sizes="(max-width: 768px) 80vw, 520px"
                        />
                      </div>
                    )}
                  </GlassPanel>

                  {slideLabels.length > 1 && (
                    <GlassPanel
                      variant="pill"
                      className="flex w-auto shrink-0 items-center justify-center rounded-full px-4 py-3"
                    >
                      <SlideshowDots
                        labels={slideLabels}
                        index={activeImage}
                        onSelect={select}
                      />
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
                    {image.frame === "phone" ? (
                      <IPhoneMockup
                        screenSrc={image.src}
                        screenAlt={image.alt}
                        className="mx-auto max-w-[240px]"
                      />
                    ) : image.tone === "dark" && image.fit !== "cover" ? (
                      <div className="overflow-hidden rounded-[1.25rem] bg-[#2d2e32] p-3 sm:rounded-[1.5rem] sm:p-4">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={1024}
                          height={925}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="h-auto w-full"
                        />
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "relative overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem]",
                          image.tone === "dark"
                            ? "aspect-video bg-[#2d2e32]"
                            : "aspect-[4/3] bg-white",
                        )}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className={
                            image.fit === "cover" ? "object-cover" : "object-contain"
                          }
                        />
                      </div>
                    )}
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
