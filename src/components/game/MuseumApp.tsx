import { useEffect, useMemo, useState } from "react";
import {
  attachAudioLifecycle,
  isMuted,
  playClick,
  setMuted as setAudioMuted,
  unlockAudio,
} from "@/lib/game/audio";
import { getLesson, getQuestion } from "@/lib/game/data";
import { loadSave, persistSave, saveOnLeave } from "@/lib/game/save";
import type { Screen } from "@/lib/game/types";
import { ArtifactGallery } from "./ArtifactGallery";
import { DigSite } from "./DigSite";
import { HomeScreen } from "./HomeScreen";
import { LessonMenu } from "./LessonMenu";
import { ParticleSplash } from "./ParticleSplash";
import { QuestionModal } from "./QuestionModal";

export function MuseumApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const [lessonsOpen, setLessonsOpen] = useState(false);
  const [lessonId, setLessonId] = useState<string | null>(null);
  const [questionId, setQuestionId] = useState<number | null>(null);
  const [unlocked, setUnlocked] = useState<number[]>([]);
  const [muted, setMuted] = useState(false);
  const [burst, setBurst] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [galleryFrom, setGalleryFrom] = useState<Screen>("home");

  const unlockedSet = useMemo(() => new Set(unlocked), [unlocked]);
  const lesson = lessonId ? getLesson(lessonId) : undefined;
  const question = questionId != null ? getQuestion(questionId) ?? null : null;

  useEffect(() => {
    setUnlocked(loadSave().unlocked);
    setHydrated(true);
    return attachAudioLifecycle();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    return saveOnLeave(() => ({ version: 1, unlocked }));
  }, [hydrated, unlocked]);

  const unlock = (id: number) => {
    setUnlocked((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      persistSave({ version: 1, unlocked: next });
      return next;
    });
  };

  const openLessons = () => {
    unlockAudio();
    setLessonsOpen(true);
  };

  const selectLesson = (id: string) => {
    setLessonId(id);
    setLessonsOpen(false);
    setScreen("dig");
    playClick();
  };

  const openVault = (id: number) => {
    playClick();
    setQuestionId(id);
  };

  const toggleMute = () => {
    const next = !isMuted();
    setAudioMuted(next);
    setMuted(next);
  };

  return (
    <main className="museum-shell">
      <div className="vignette" />
      {screen === "gallery" ? (
        <ArtifactGallery unlocked={unlockedSet} onBack={() => setScreen(galleryFrom)} />
      ) : screen === "dig" && lesson ? (
        <DigSite
          lesson={lesson}
          unlocked={unlockedSet}
          muted={muted}
          onToggleMute={toggleMute}
          onBack={() => setScreen("home")}
          onLessons={openLessons}
          onGallery={() => {
            setGalleryFrom("dig");
            setScreen("gallery");
          }}
          onOpenVault={openVault}
        />
      ) : (
        <HomeScreen
          unlocked={unlockedSet}
          onStart={openLessons}
          onGallery={() => {
            setGalleryFrom("home");
            setScreen("gallery");
          }}
          onLessons={openLessons}
        />
      )}

      <LessonMenu
        open={lessonsOpen}
        onOpenChange={setLessonsOpen}
        unlocked={unlockedSet}
        onSelect={selectLesson}
      />

      <QuestionModal
        question={question}
        alreadyUnlocked={questionId != null && unlockedSet.has(questionId)}
        onClose={() => setQuestionId(null)}
        onSolved={unlock}
        onContinue={() => setQuestionId(null)}
        onBurst={() => setBurst((n) => n + 1)}
      />

      <ParticleSplash burst={burst} />
    </main>
  );
}
