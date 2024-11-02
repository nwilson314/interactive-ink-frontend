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

export interface StorySegment {
  content: string;
  choices: string[];
}

export interface BlockImage {
  url: string;
  image_style: string;
  image_description: string;
}

export interface StoryBlock {
  id_: string;
  segment: StorySegment;
  chosen?: string;
  block_template: string;
  block_image?: BlockImage;
}

export interface Story {
  id_: string;
  blocks: StoryBlock[];
  genre: string;
  length: string;
}
