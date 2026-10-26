"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { IPhoneMockup } from "@/components/iphone-mockup";
import {
  ProjectStills,
  SlideshowDots,
  useProjectSlideshow,
} from "@/components/project-slideshow";
import { GlassPanel } from "@/components/ui/glass-panel";
import { type Project } from "@/data/projects";
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

type ProjectSlideProps = {
  project: Project;
  index: number;
};

export function ProjectSlide({ project, index }: ProjectSlideProps) {
  const slideCount = (project.model ? 1 : 0) + project.images.length;
  const { index: activeImage, outgoing, select, reduceMotion, setPaused } =
    useProjectSlideshow(slideCount, !project.model);
  const showModel = Boolean(project.model && activeImage === 0);
  const previewImageIndex = project.model
    ? Math.max(0, activeImage - 1)
    : activeImage;
  const outgoingImageIndex =
    outgoing == null ? null : project.model ? outgoing - 1 : outgoing;
  const activeStill = project.images[previewImageIndex];
  const showPhone = !showModel && activeStill?.frame === "phone";
  const showDirect =
    !showModel &&
    !showPhone &&
    activeStill?.tone === "dark" &&
    activeStill.fit !== "cover";

  const slideLabels = [
    ...(project.model ? [`${project.title} 3D model`] : []),
    ...project.images.map((img) => img.alt),
  ];

  return (
    <article
      data-project-wrapper
      className={`relative h-[220svh] ${index > 0 ? "-mt-[100svh]" : ""}`}
      style={{ zIndex: index + 1 }}
    >
      <div className="sticky top-0 h-svh overflow-hidden bg-white p-2.5 sm:p-3">
        <div
          data-project-card
          className="relative h-full origin-top overflow-hidden rounded-[2.5rem] will-change-transform sm:rounded-[2.75rem]"
        >
          {/* Full-bleed ambient gradient — scales with card */}
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.5rem] sm:rounded-[2.75rem]"
            aria-hidden
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.frameGradient}`}
            />
            <div className="absolute -top-[20%] left-[5%] h-[60%] w-[50%] rounded-full bg-orange-400/45 blur-[110px]" />
            <div className="absolute top-[10%] -right-[10%] h-[55%] w-[45%] rounded-full bg-sky-400/40 blur-[110px]" />
            <div className="absolute -bottom-[15%] left-[25%] h-[50%] w-[45%] rounded-full bg-amber-300/45 blur-[110px]" />
          </div>

          {/* Two glass panels on gradient — no solid card shell */}
          <div className="relative grid h-full grid-rows-[auto_1fr] gap-[10px] p-[10px] md:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] md:grid-rows-1">
          {/* Left — white info card */}
          <GlassPanel
            variant="light"
            className="flex min-h-[340px] flex-col overflow-hidden rounded-[2.25rem] sm:rounded-[2.5rem]"
          >
            <div className="flex flex-1 flex-col px-8 pt-8 sm:px-10 sm:pt-10 lg:px-11 lg:pt-11">
              <div>
                <span
                  className={`inline-flex rounded-full px-8 py-3 text-xl font-semibold text-white sm:px-10 sm:py-4 sm:text-2xl ${project.badgeClass}`}
                >
                  {project.title}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-center py-10 sm:py-14 lg:py-16">
                <h3 className="max-w-[15rem] text-[1.6rem] leading-[1.18] tracking-tight sm:max-w-[17rem] sm:text-[2rem] lg:max-w-xs lg:text-[2.25rem]">
                  {project.headlineSegments.map((seg, i) => (
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
                </h3>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-neutral-400">
                  {project.slideTags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div data-project-reveal className="mt-auto p-[10px] will-change-transform">
              <GlassPanel
                variant="inset"
                className={cn(
                  "flex flex-col gap-8 rounded-[1.875rem] p-8 sm:gap-10 sm:rounded-[2rem] sm:p-10",
                  project.insetClass,
                )}
              >
                <p className="text-[15px] leading-[1.55] font-semibold text-black sm:text-base">
                  {project.blurb}
                </p>
                <Link
                  href={`/projects/${project.slug}`}
                  className="w-fit rounded-full bg-black px-10 py-4 text-lg font-semibold text-white shadow-[0_10px_28px_rgba(0,0,0,0.35)] transition-[transform,box-shadow] hover:scale-[1.02] hover:shadow-[0_14px_32px_rgba(0,0,0,0.42)] sm:px-12 sm:py-[1.125rem] sm:text-xl"
                >
                  {project.status}
                </Link>
              </GlassPanel>
            </div>
          </GlassPanel>

          {/* Right — glass backdrop with floating screen */}
          <GlassPanel
            variant="warm"
            className="relative flex min-h-[300px] flex-col rounded-[2.25rem] sm:min-h-0 sm:rounded-[2.5rem]"
          >
            <div
              className="flex h-full flex-col items-center justify-center gap-4 px-6 py-10 sm:gap-5 sm:px-10 sm:py-12 lg:px-12 lg:py-14"
              onMouseEnter={() => {
                if (window.matchMedia("(hover: hover)").matches) setPaused(true);
              }}
              onMouseLeave={() => setPaused(false)}
            >
              <GlassPanel
                variant="screen"
                className={cn(
                  "w-full shrink-0 rounded-[1.75rem] sm:rounded-[2rem]",
                  showPhone
                    ? "max-w-[min(90%,320px)] p-3 sm:p-4"
                    : "max-w-[min(90%,560px)] p-2 sm:p-2.5",
                )}
              >
                {showModel ? (
                  <div className="relative block aspect-[16/11] w-full overflow-hidden rounded-[1.35rem] bg-white/95 shadow-[inset_0_1px_0_rgba(0,0,0,0.04)] sm:rounded-[1.5rem]">
                    <StlModelViewer
                      url={project.model!.src}
                      color={project.model!.color}
                      scale={project.model!.scale}
                    />
                  </div>
                ) : showDirect ? (
                  <Link
                    href={`/projects/${project.slug}`}
                    draggable={false}
                    onDragStart={(event) => event.preventDefault()}
                    className="block overflow-hidden rounded-[1.35rem] bg-[#2d2e32] p-4 sm:rounded-[1.5rem] sm:p-5"
                  >
                    <Image
                      src={activeStill.src}
                      alt={activeStill.alt}
                      width={1024}
                      height={925}
                      sizes="(max-width: 768px) 80vw, 520px"
                      className="h-auto w-full"
                      priority={index === 0}
                    />
                  </Link>
                ) : showPhone ? (
                  <Link
                    href={`/projects/${project.slug}`}
                    draggable={false}
                    onDragStart={(event) => event.preventDefault()}
                    className="block"
                  >
                    <IPhoneMockup
                      screenSrc={activeStill.src}
                      screenAlt={activeStill.alt}
                      className="max-w-none"
                      priority={index === 0}
                    />
                  </Link>
                ) : (
                  <Link
                    href={`/projects/${project.slug}`}
                    draggable={false}
                    onDragStart={(event) => event.preventDefault()}
                    className="relative block aspect-[16/11] w-full overflow-hidden rounded-[1.35rem] bg-white/95 shadow-[inset_0_1px_0_rgba(0,0,0,0.04)] sm:rounded-[1.5rem]"
                  >
                    <ProjectStills
                      images={project.images}
                      activeIndex={previewImageIndex}
                      outgoingIndex={outgoingImageIndex}
                      reduceMotion={reduceMotion}
                      priority={index === 0}
                      sizes="(max-width: 768px) 80vw, 520px"
                    />
                  </Link>
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
      </div>
    </article>
  );
}
