'use client';

import { useState } from 'react';
import css from './Filters.module.css';
import { Category } from '@/types/words';

interface FilersProps {
  onSearch: (newSearch: string) => void;
  onCtegoryChange: (newCategory: Category) => void;
  onVerb: (verb: boolean) => void;
}

export default function Filters({ onSearch, onCtegoryChange, onVerb }: FilersProps) {
  const [value, setValue] = useState('');
  const [newCategory, setNewCategory] = useState<Category | ''>('');
  const [isOpen, setIsOpen] = useState(false);
  const isVerb = newCategory === 'verb';
  const chooseCategory = (category: Category) => {
    onCtegoryChange(category);
    setNewCategory(category);
  };
  const chooseWord = (word: string) => {
    onSearch(word.trim());
    setValue(word);
  };

  const categories = [
    'verb',
    'participle',
    'noun',
    'adjective',
    'pronoun',
    'numerals',
    'adverb',
    'preposition',
    'conjunction',
    'phrasal verb',
    'functional phrase',
  ];
  return (
    <form className={css.form}>
      <label className={css.categoryLabel}>
        <select
          onClick={() => setIsOpen(!isOpen)}
          name="categories"
          className={css.select}
          value={newCategory}
          onChange={(e) => chooseCategory(e.target.value as Category)}
        >
          <option value="">Product category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {!isOpen && (
          <svg className={css.icon} width={16} height={16}>
            <use href="/symbol-defs.svg#chevron-down" />
          </svg>
        )}
        {isOpen && (
          <svg className={css.icon} width={16} height={16}>
            <use href="/symbol-defs.svg#chevron-up" />
          </svg>
        )}
      </label>
      <label className={css.label}>
        <input
          className={css.input}
          type="text"
          placeholder="Search medicine"
          name="search"
          value={value}
          onChange={(e) => chooseWord(e.target.value)}
        />
        <svg className={css.search} width={16} height={16}>
          <use href="/symbol-defs.svg#search" />
        </svg>
      </label>

      {isVerb && (
        <div className={css.radioBox}>
          <label className={css.radio}>
            <input
              type="radio"
              name="verb"
              value="regular"
              //   checked={activeRadio === 'popular'}
              onChange={() => onVerb(true)}
            />
            Regular
          </label>
          <label className={css.radio}>
            <input
              type="radio"
              name="verb"
              value="iregular"
              //   checked={activeRadio === 'popular'}
              onChange={() => onVerb(false)}
            />
            Popular
          </label>
        </div>
      )}
    </form>
  );
}
