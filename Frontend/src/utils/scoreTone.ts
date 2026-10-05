export type ScoreTone = "neutral" | "low" | "mid" | "high";

export const getScoreTone = (score: number | null | undefined): ScoreTone => {
  const value = Number(score);

  if (score === null || score === undefined || Number.isNaN(value)) {
    return "neutral";
  }

  if (value < 5) return "low";
  if (value <= 7) return "mid";

  return "high";
};

export const scoreTextTone: Record<ScoreTone, string> = {
  neutral: "text-faint",
  low: "text-red-700",
  mid: "text-brand-700",
  high: "text-success-700",
};

export const scoreBadgeTone: Record<ScoreTone, string> = {
  neutral: "border-line bg-canvas text-muted",
  low: "border-red-200 bg-red-50 text-red-700",
  mid: "border-brand-200 bg-brand-50 text-brand-700",
  high: "border-success-200 bg-success-50 text-success-700",
};

export const scoreBarTone: Record<ScoreTone, string> = {
  neutral: "bg-line-strong",
  low: "bg-red-400",
  mid: "bg-brand-500",
  high: "bg-success-700",
};