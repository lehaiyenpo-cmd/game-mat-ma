import { ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { allQuestions, artifactGlyph, artifactName, gameData, lessonProgress } from "@/lib/game/data";
import { cn } from "@/lib/utils";

type Props = {
  unlocked: ReadonlySet<number>;
  onBack: () => void;
};

export function ArtifactGallery({ unlocked, onBack }: Props) {
  const total = allQuestions.length;
  const found = unlocked.size;

  return (
    <div className="museum-content mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-6 sm:px-8 sm:py-10">
      <header className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack} aria-label="Về màn hình chính">
          <ArrowLeft className="size-5" />
        </Button>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[11px] tracking-[0.22em] text-signal uppercase">
            Thư viện Cổ vật
          </p>
          <h1 className="font-display truncate text-xl font-semibold tracking-wide sm:text-2xl">
            Bộ sưu tập bảo vật
          </h1>
        </div>
        <p className="tabular-nums text-sm text-muted">
          {found}/{total}
        </p>
      </header>

      <div className="progress-seg mb-8 w-full">
        <span style={{ width: `${total ? (found / total) * 100 : 0}%` }} />
      </div>

      <div className="space-y-10 pb-10">
        {gameData.lessons.map((lesson) => {
          const { cleared, total: t } = lessonProgress(lesson, unlocked);
          return (
            <section key={lesson.id}>
              <div className="mb-3 flex items-end justify-between gap-3">
                <h2 className="text-sm font-medium text-fg sm:text-base">{lesson.title}</h2>
                <span className="tabular-nums text-xs text-faint">
                  {cleared}/{t}
                </span>
              </div>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {lesson.questions.map((item) => {
                  const isOpen = unlocked.has(item.id);
                  const icon = artifactGlyph(item.artifact);
                  const name = artifactName(item.artifact);
                  return (
                    <li
                      key={item.id}
                      className={cn(
                        "rounded-xl p-4 shadow-[0_0_0_1px_var(--color-line)] transition-[box-shadow,opacity] duration-200",
                        isOpen
                          ? "bg-raised/80 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-relic)_40%,transparent)]"
                          : "bg-panel/60 opacity-55",
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={cn(
                            "grid size-12 shrink-0 place-items-center rounded-lg text-2xl",
                            isOpen ? "bg-relic/12" : "bg-raised text-faint",
                          )}
                          aria-hidden
                        >
                          {isOpen && icon ? (
                            icon
                          ) : isOpen ? (
                            <span className="text-relic">◆</span>
                          ) : (
                            <HelpCircle className="size-5" />
                          )}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-fg">
                            {isOpen ? name : `Cổ vật #${item.id}`}
                          </p>
                          {isOpen ? (
                            <p className="mt-1 text-[13px] leading-relaxed text-muted">{item.exp}</p>
                          ) : (
                            <p className="mt-1 text-[13px] text-faint">
                              Chưa giải mã — hoàn thành mật mã tương ứng trên radar.
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
