export type Word = {
  _id: string;
  en: string;
  ua: string;
  category: string;
  isIrregular: boolean;
};

export type Category =
  | 'verb'
  | 'participle'
  | 'noun'
  | 'adjective'
  | 'pronoun'
  | 'numerals'
  | 'adverb'
  | 'preposition'
  | 'conjunction'
  | 'phrasal verb'
  | 'functional phrase';

export type AllWordsRequest = {
  page: number;
  limit: number;
  keyword: string;
  category: Category;
  isIrregular: boolean;
};

export type AllWordsResponse = {
  results: Word[];
  totalPages: number;
  page: number;
  perPage: number;
};
