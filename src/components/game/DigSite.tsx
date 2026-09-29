import { ArrowLeft, BookOpen, Landmark, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { artifactGlyph, lessonProgress } from "@/lib/game/data";
import type { Lesson } from "@/lib/game/types";
import { cn } from "@/lib/utils";

type Props = {
  lesson: Lesson;
  unlocked: ReadonlySet<number>;
  muted: boolean;
  onToggleMute: () => void;
  onBack: () => void;
  onLessons: () => void;
  onGallery: () => void;
  onOpenVault: (questionId: number) => void;
};

function vaultPosition(index: number, total: number) {
  const angle = (index / Math.max(total, 1)) * Math.PI * 2 - Math.PI / 2;
  const radius = 38;
  return {
    left: `${50 + Math.cos(angle) * radius}%`,
    top: `${50 + Math.sin(angle) * radius}%`,
  };
}

export function DigSite({
  lesson,
  unlocked,
  muted,
  onToggleMute,
  onBack,
  onLessons,
  onGallery,
  onOpenVault,
}: Props) {
  const { cleared, total } = lessonProgress(lesson, unlocked);
  const complete = total > 0 && cleared === total;

  return (
    <div className="museum-content flex min-h-dvh flex-col">
      <header className="flex items-center gap-2 px-3 py-3 sm:px-6 sm:py-4">
        <Button variant="ghost" size="icon" onClick={onBack} aria-label="Về màn hình chính">
          <ArrowLeft className="size-5" />
        </Button>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] tracking-[0.2em] text-signal uppercase">
            Khu khai quật · Radar
          </p>
          <h1 className="truncate text-sm font-medium sm:text-base">{lesson.title}</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={onToggleMute} aria-label={muted ? "Bật âm thanh" : "Tắt âm thanh"}>
          {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={onGallery} aria-label="Thư viện Cổ vật">
          <Landmark className="size-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onLessons} aria-label="Chọn bài học">
          <BookOpen className="size-5" />
        </Button>
      </header>

      <div className="px-4 sm:px-6">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="progress-seg flex-1">
            <span style={{ width: `${total ? (cleared / total) * 100 : 0}%` }} />
          </div>
          <p className="tabular-nums text-xs text-muted">
            {cleared}/{total} cổ vật
          </p>
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-3 py-6">
        <div
          className="radar-disc aspect-square w-[min(92vw,68vh,440px)]"
          role="list"
          aria-label="Radar cổ vật của bài học"
        >
          <div className="radar-sweep" />
          <div className="radar-cross" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <p className="font-display text-lg tracking-wide text-signal/80">
                {complete ? "Giải mã xong" : "Chọn hầm"}
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
                Dig Site
              </p>
            </div>
          </div>

          {lesson.questions.map((item, index) => {
            const isOpen = unlocked.has(item.id);
            const pos = vaultPosition(index, lesson.questions.length);
            return (
              <button
                key={item.id}
                type="button"
                role="listitem"
                style={pos}
                onClick={() => onOpenVault(item.id)}
                className={cn("vault-node", isOpen ? "vault-open" : "vault-locked")}
                aria-label={
                  isOpen
                    ? `Cổ vật đã mở: ${item.artifact}`
                    : `Hầm mật mã ${index + 1}, chưa giải`
                }
              >
                <span className="text-xl leading-none" aria-hidden>
                  {isOpen ? artifactGlyph(item.artifact) : "▣"}
                </span>
                <span className="absolute top-[calc(100%+6px)] left-1/2 w-24 -translate-x-1/2 text-center font-mono text-[10px] tracking-wide text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
