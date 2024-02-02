import { LocalType } from "@/layout";
import { atom } from "jotai";
const LocaleAtom = atom<LocalType>("en");
const CollapsibleAtom = atom<boolean>(false);
export { LocaleAtom, CollapsibleAtom };
