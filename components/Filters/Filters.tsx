'use client';

import { useEffect, useState } from 'react';
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
  const [isOpen, setIsOpen] = useState(true);
  const isVerb = newCategory === 'verb';
  const chooseCategory = (category: Category) => {
    onCtegoryChange(category);
    setNewCategory(category);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(value.trim());
    }, 500);

    return () => clearTimeout(timeout);
  }, [value, onSearch]);

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
      <div className={css.box}>
        <label className={css.label}>
          <input
            className={css.input}
            type="text"
            placeholder="Find the word"
            name="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <svg className={css.search} width={20} height={20}>
            <use href="/symbol-defs.svg#search" />
          </svg>
        </label>
        <label className={css.categoryLabel}>
          <select
            onClick={() => setIsOpen(!isOpen)}
            name="categories"
            className={css.select}
            value={newCategory}
            onChange={(e) => chooseCategory(e.target.value as Category)}
          >
            <option value="">Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {isOpen && (
            <svg className={css.icon} width={20} height={20}>
              <use href="/symbol-defs.svg#chevron-down" />
            </svg>
          )}
          {!isOpen && (
            <svg className={css.icon} width={20} height={20}>
              <use href="/symbol-defs.svg#chevron-up" />
            </svg>
          )}
        </label>
        {isVerb && (
          <div className={css.radioBox}>
            <label className={css.radio}>
              <input type="radio" name="verb" value="regular" onChange={() => onVerb(true)} />
              Regular
            </label>
            <label className={css.radio}>
              <input type="radio" name="verb" value="iregular" onChange={() => onVerb(false)} />
              Iregular
            </label>
          </div>
        )}
      </div>
    </form>
  );
}
