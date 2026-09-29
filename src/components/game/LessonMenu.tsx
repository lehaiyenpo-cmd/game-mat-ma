import * as Dialog from "@radix-ui/react-dialog";
import { Check, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gameData, lessonProgress } from "@/lib/game/data";
import { cn } from "@/lib/utils";
import { CornerMarks } from "./CornerMarks";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  unlocked: ReadonlySet<number>;
  onSelect: (lessonId: string) => void;
};

export function LessonMenu({ open, onOpenChange, unlocked, onSelect }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-bg/80 data-[state=open]:animate-in" />
        <Dialog.Content
          className="holo-panel fixed top-1/2 left-1/2 z-50 flex max-h-[min(88dvh,720px)] w-[min(92vw,560px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl p-5 sm:p-7"
          aria-describedby={undefined}
        >
          <CornerMarks inset={10} />
          <div className="relative z-10 mb-5 flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] tracking-[0.22em] text-signal uppercase">
                Mục lục Sách giáo khoa
              </p>
              <Dialog.Title className="font-display mt-1 text-xl font-semibold tracking-wide sm:text-2xl">
                Chọn bài học
              </Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Đóng">
                <X className="size-5" />
              </Button>
            </Dialog.Close>
          </div>

          <ul className="relative z-10 -mx-1 flex-1 space-y-3 overflow-y-auto px-1 py-1">
            {gameData.lessons.map((lesson, index) => {
              const { cleared, total } = lessonProgress(lesson, unlocked);
              const done = total > 0 && cleared === total;
              return (
                <li key={lesson.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(lesson.id)}
                    className={cn(
                      "group flex w-full min-h-11 items-center gap-4 rounded-xl bg-raised/70 p-4 text-left shadow-[0_0_0_1px_var(--color-line)] transition-[box-shadow,transform,background-color] duration-150",
                      "hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-signal)_50%,transparent)]",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-lg font-mono text-sm",
                        done
                          ? "bg-relic/15 text-relic"
                          : "bg-signal/10 text-signal",
                      )}
                    >
                      {done ? <Check className="size-4" /> : String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm leading-snug font-medium text-fg sm:text-[0.95rem]">
                        {lesson.title}
                      </span>
                      <span className="mt-1 flex items-center gap-3 text-xs text-muted">
                        <span className="tabular-nums">
                          Số cổ vật: {cleared}/{total}
                        </span>
                        <span className="progress-seg w-20">
                          <span
                            style={{
                              width: `${total ? (cleared / total) * 100 : 0}%`,
                            }}
                          />
                        </span>
                      </span>
                    </span>
                    <ChevronRight className="size-4 shrink-0 text-faint transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-signal" />
                  </button>
                </li>
              );
            })}
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
