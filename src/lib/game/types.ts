export type Question = {
  id: number;
  q: string;
  a: string[];
  correct: number;
  artifact: string;
  exp: string;
};

export type Lesson = {
  id: string;
  title: string;
  questions: Question[];
};

export type GameData = {
  lessons: Lesson[];
};

export type SaveState = {
  version: number;
  unlocked: number[];
};

export type Screen = "home" | "dig" | "gallery";
