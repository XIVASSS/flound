"use client";

import dynamic from "next/dynamic";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/data/projects";

const StlModelViewer = dynamic(
  () =>
    import("@/components/StlModelViewer").then((mod) => mod.StlModelViewer),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse bg-muted/20" aria-hidden />
    ),
  },
);

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!project) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [project, onClose, scrollPrev, scrollNext]);

  if (!project) return null;

  const slideCount = project.images.length + (project.model ? 1 : 0);

  return createPortal(
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} gallery`}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close gallery"
      />

      <div className="relative z-10 flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-border p-6">
          <div>
            <h2 className="text-2xl font-semibold">{project.title}</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              {project.description}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="relative bg-background">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {project.model && (
                <div className="relative min-w-0 flex-[0_0_100%]">
                  <div className="relative flex aspect-[4/3] items-center justify-center bg-muted/20 p-4 md:aspect-[16/10] md:p-8">
                    <StlModelViewer
                      url={project.model.src}
                      color={project.model.color}
                      scale={project.model.scale}
                      showHint
                    />
                  </div>
                </div>
              )}
              {project.images.map((image) => (
                <div
                  key={image.src}
                  className="relative min-w-0 flex-[0_0_100%]"
                >
                  <div className="relative flex aspect-[4/3] items-center justify-center p-6 md:aspect-[16/10] md:p-10">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={1200}
                      height={800}
                      className="max-h-full w-auto max-w-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {slideCount > 1 && (
            <>
              <button
                type="button"
                onClick={scrollPrev}
                className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full border border-border bg-card/90 p-2.5 text-foreground backdrop-blur transition-colors hover:bg-card"
                aria-label="Previous image"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M12 4l-6 6 6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={scrollNext}
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full border border-border bg-card/90 p-2.5 text-foreground backdrop-blur transition-colors hover:bg-card"
                aria-label="Next image"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M8 4l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        {slideCount > 1 && (
          <div className="flex justify-center gap-2 border-t border-border p-4">
            {Array.from({ length: slideCount }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                className="h-1.5 w-6 rounded-full bg-border transition-colors hover:bg-muted-foreground"
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
