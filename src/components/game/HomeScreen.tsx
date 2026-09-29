import { BookOpen, Landmark, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { allQuestions, gameData, lessonProgress } from "@/lib/game/data";
import { CornerMarks } from "./CornerMarks";

type Props = {
  unlocked: ReadonlySet<number>;
  onStart: () => void;
  onGallery: () => void;
  onLessons: () => void;
};

export function HomeScreen({ unlocked, onStart, onGallery, onLessons }: Props) {
  const total = allQuestions.length;
  const found = unlocked.size;
  const lessonsDone = gameData.lessons.filter((lesson) => {
    const { cleared, total: t } = lessonProgress(lesson, unlocked);
    return t > 0 && cleared === t;
  }).length;

  return (
    <div className="museum-content relative mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-5 py-8 sm:px-8 sm:py-12">
      <header className="mb-8 flex items-center justify-between gap-3 text-[11px] tracking-[0.22em] text-faint uppercase">
        <span>Cục Bảo tàng Số</span>
        <span className="hidden sm:inline">Archive · Lịch sử 11</span>
        <span className="tabular-nums text-signal">
          {found}/{total} cổ vật
        </span>
      </header>

      <div className="holo-panel relative flex flex-1 flex-col justify-center overflow-hidden rounded-2xl px-6 py-10 sm:px-12 sm:py-14">
        <CornerMarks />
        <div className="stagger-in relative z-10 flex flex-col items-center text-center">
          <p className="mb-4 font-mono text-[11px] tracking-[0.28em] text-signal uppercase">
            Tech-Archaeology · Cyber Museum
          </p>
          <h1 className="font-display text-[clamp(2rem,7vw,3.4rem)] leading-[1.12] font-semibold tracking-wide text-fg">
            MẬT MÃ LỊCH SỬ
          </h1>
          <div className="mt-4 mb-8 h-px w-24 bg-signal/50" />
          <p className="max-w-xl text-[0.95rem] leading-relaxed text-muted sm:text-base">
            Chào nhà khảo cổ tương lai! Hệ thống đã phân loại các mật mã cổ vật
            theo từng bài học trong Sách giáo khoa. Hãy chọn bài học bạn muốn ôn
            tập để bắt đầu giải mã và hoàn thiện bộ sưu tập bảo vật!
          </p>

          <div className="mt-10 flex w-full max-w-md flex-col gap-3">
            <Button size="lg" className="w-full" onClick={onStart}>
              <ScanLine className="size-4" aria-hidden />
              Bắt đầu giải mã
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              onClick={onGallery}
            >
              <Landmark className="size-4" aria-hidden />
              Thư viện Cổ vật
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              onClick={onLessons}
            >
              <BookOpen className="size-4" aria-hidden />
              Chọn Bài học
            </Button>
          </div>
        </div>
      </div>

      <footer className="mt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-faint">
        <span>
          Mục lục: {gameData.lessons.length} bài · Hoàn thành {lessonsDone}/
          {gameData.lessons.length}
        </span>
        <span className="tabular-nums">Bộ sưu tập {found}/{total}</span>
      </footer>
    </div>
  );
}
