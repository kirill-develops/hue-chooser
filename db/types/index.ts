import { Tables } from "./database.types";

type UserBase = Tables<"users">;
type ColorHistory = Tables<"color_history">;

export type Friend = UserBase & {
   color_history: Pick<ColorHistory, "color" | "created_at">[];
};
