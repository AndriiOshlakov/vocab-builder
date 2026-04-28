export type Word = {
  en: string;
  ua: string;
  category: string;
  isIrregular?: boolean;
};

export type WordResponse = {
  _id: string;
  en: string;
  ua: string;
  category: string;
  isIrregular?: boolean;
  owner: string;
  progress: number;
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
  results: WordResponse[];
  totalPages: number;
  page: number;
  perPage: number;
};

export type OwnWordsResponse = {
  results: WordResponse[];
  totalPages: number;
  page: number;
  perPage: number;
};

export type Task = {
  en?: string;
  ua?: string;
  task: 'ua' | 'en';
  _id: string;
};

export type Answer = Task & { isDone: boolean };

export type TasksResponse = {
  tasks: Task[];
};
