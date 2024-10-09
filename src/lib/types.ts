export enum Genre {
  Action = "Action",
  Drama = "Drama",
  Comedy = "Comedy",
  Horror = "Horror",
  Fantasy = "Fantasy",
  SciFi = "Sci-fi",
  Romance = "Romance",
}

export type LengthOption = "Short" | "Medium" | "Long";

export const StoryLength: Record<LengthOption, number> = {
  Short: 3,
  Medium: 7,
  Long: 15,
};

// Arrays for use in UI components
export const genres = Object.values(Genre);
export const lengthOptions: LengthOption[] = ["Short", "Medium", "Long"];
