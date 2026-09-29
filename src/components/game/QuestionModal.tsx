import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useRef, useState } from "react";
import { Timer, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QUESTION_TIME_MS } from "@/lib/game/data";
import { playBuzz, playTimeout, playTing, playUnlock } from "@/lib/game/audio";
import type { Question } from "@/lib/game/types";
import { cn } from "@/lib/utils";
import { CornerMarks } from "./CornerMarks";

type Props = {
  question: Question | null;
  alreadyUnlocked: boolean;
  onClose: () => void;
  onSolved: (id: number) => void;
  onContinue: () => void;
  onBurst: () => void;
};

export function QuestionModal({
  question,
  alreadyUnlocked,
  onClose,
  onSolved,
  onContinue,
  onBurst,
}: Props) {
  const open = question != null;
  const [wrong, setWrong] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [shake, setShake] = useState(0);
  const [remaining, setRemaining] = useState(QUESTION_TIME_MS);
  const [round, setRound] = useState(0);
  const remainingRef = useRef(QUESTION_TIME_MS);
  const lastRef = useRef(0);
  const rafRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (!question) return;
    setWrong([]);
    setSolved(alreadyUnlocked);
    setTimedOut(false);
    setRemaining(QUESTION_TIME_MS);
    remainingRef.current = QUESTION_TIME_MS;
    setRound((n) => n + 1);
  }, [question?.id]);

  useEffect(() => {
    if (!open || solved || timedOut || alreadyUnlocked) return;
    pausedRef.current = false;
    lastRef.current = performance.now();

    const onVis = () => {
      if (document.visibilityState === "hidden") {
        pausedRef.current = true;
      } else {
        pausedRef.current = false;
        lastRef.current = performance.now();
      }
    };
    document.addEventListener("visibilitychange", onVis);

    const loop = (now: number) => {
      if (!pausedRef.current) {
        const dt = Math.min(0.1, (now - lastRef.current) / 1000);
        remainingRef.current = Math.max(0, remainingRef.current - dt * 1000);
        setRemaining(remainingRef.current);
        if (remainingRef.current <= 0) {
          setTimedOut(true);
          playTimeout();
          document.removeEventListener("visibilitychange", onVis);
          return;
        }
      }
      lastRef.current = now;
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [open, solved, timedOut, alreadyUnlocked, round]);

  const retry = () => {
    setTimedOut(false);
    setWrong([]);
    remainingRef.current = QUESTION_TIME_MS;
    setRemaining(QUESTION_TIME_MS);
    setRound((n) => n + 1);
  };

  const pick = (index: number) => {
    if (!question || solved || timedOut) return;
    if (index === question.correct) {
      setSolved(true);
      playTing();
      playUnlock();
      onBurst();
      if (!alreadyUnlocked) onSolved(question.id);
      return;
    }
    if (!wrong.includes(index)) setWrong((w) => [...w, index]);
    setShake((n) => n + 1);
    playBuzz();
  };

  const secs = Math.ceil(remaining / 1000);
  const low = remaining < 8000;
  const ratio = remaining / QUESTION_TIME_MS;

  return (
    <Dialog.Root open={open} onOpenChange={(next) => { if (!next) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-bg/80" />
        <Dialog.Content
          key={shake}
          className={cn(
            "holo-panel fixed top-1/2 left-1/2 z-50 flex max-h-[min(92dvh,760px)] w-[min(94vw,560px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl p-5 sm:p-7",
            shake > 0 && !solved && "shake",
          )}
          aria-describedby={undefined}
        >
          <CornerMarks inset={10} />
          {question && (
            <div className="relative z-10 flex min-h-0 flex-1 flex-col">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.22em] text-signal uppercase">
                    Hologram mật mã · #{question.id}
                  </p>
                  <Dialog.Title className="sr-only">Câu hỏi #{question.id}</Dialog.Title>
                </div>
                <Dialog.Close asChild>
                  <Button variant="ghost" size="icon" aria-label="Đóng">
                    <X className="size-5" />
                  </Button>
                </Dialog.Close>
              </div>

              {!alreadyUnlocked && !solved && (
                <div className="mb-4 flex items-center gap-3">
                  <Timer className={cn("size-4", low && "text-danger")} />
                  <div className="progress-seg flex-1">
                    <span
                      style={{
                        width: `${ratio * 100}%`,
                        background: low ? "var(--color-danger)" : undefined,
                      }}
                    />
                  </div>
                  <span
                    className={cn(
                      "w-10 text-right font-mono text-sm tabular-nums",
                      low && "text-danger",
                    )}
                  >
                    {secs}s
                  </span>
                </div>
              )}

              <p className="mb-5 text-[0.98rem] leading-relaxed font-medium text-fg sm:text-lg">
                {question.q}
              </p>

              {timedOut && !solved ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 py-6 text-center">
                  <p className="text-danger">Hết giờ — tín hiệu mật mã đã nhiễu.</p>
                  <Button onClick={retry}>Thử lại</Button>
                </div>
              ) : solved ? (
                <div className="flex min-h-0 flex-1 flex-col">
                  <div className="rounded-xl bg-raised/80 p-4 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-relic)_40%,transparent)]">
                    <p className="font-mono text-[11px] tracking-[0.18em] text-relic uppercase">
                      Cổ vật đã giải mã
                    </p>
                    <p className="mt-2 font-display text-lg text-fg">{question.artifact}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{question.exp}</p>
                  </div>
                  <Button className="mt-6 w-full" variant="relic" onClick={onContinue}>
                    Tiếp tục
                  </Button>
                </div>
              ) : (
                <ul className="flex flex-col gap-2">
                  {question.a.map((label, index) => {
                    const isWrong = wrong.includes(index);
                    return (
                      <li key={label}>
                        <button
                          type="button"
                          disabled={isWrong}
                          onClick={() => pick(index)}
                          className={cn(
                            "w-full min-h-11 rounded-lg px-4 py-3 text-left text-sm leading-snug transition-[background-color,box-shadow,opacity] duration-150",
                            isWrong
                              ? "bg-danger/10 text-danger/80 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-danger)_40%,transparent)]"
                              : "bg-raised text-fg shadow-[0_0_0_1px_var(--color-line)] hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-signal)_55%,transparent)]",
                          )}
                        >
                          {label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
