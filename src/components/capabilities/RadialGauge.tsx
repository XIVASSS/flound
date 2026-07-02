"use client";

interface RadialGaugeProps {
  percent: number;
  centerPrimary: string;
  centerSecondary?: string;
}

export function RadialGauge({
  percent,
  centerPrimary,
  centerSecondary,
}: RadialGaugeProps) {
  const clamped = Math.min(100, Math.max(0, percent));
  const size = 220;
  const stroke = 18;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (clamped / 100) * circumference;
  const center = size / 2;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[220px] text-foreground">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          className="stroke-border"
          strokeWidth={stroke}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          className="stroke-foreground"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${center} ${center})`}
          style={{ transition: "stroke-dashoffset 0.6s ease-out" }}
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="px-2 text-center">
          <p className="text-[22px] font-semibold leading-tight sm:text-[24px]">
            {centerPrimary}
          </p>
          {centerSecondary && (
            <p className="mt-0.5 text-[12px] leading-snug text-muted-foreground">
              {centerSecondary}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
