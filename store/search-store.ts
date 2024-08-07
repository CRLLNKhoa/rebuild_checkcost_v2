import { create } from "zustand";

export const useSearchStore = create((set) => ({
  step: 100,
  typeSearch: "single",
  currentDay: 0,
  resultSearch: [],

  setStep: (inputStep: number) => set(() => ({ step: inputStep })),
  setTypeSeach: (inputTypeSearch: string) =>
    set(() => ({ typeSearch: inputTypeSearch })),
  setCurrentDay: (inputCurrentDay: number) =>
    set(() => ({ currentDay: inputCurrentDay })),
  setResultSearch: (inputResultSearch: any) => set(() => ({
    resultSearch: inputResultSearch
  }))
}));
