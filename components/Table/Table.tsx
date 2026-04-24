'use client';

import { WordResponse } from '@/types/words';
import css from './Table.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { addWord, deleteWord } from '@/lib/api/clientApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import { AxiosError } from 'axios';
import Backdrop from '../Backdrop/Backdrop';
import EditWordModal from '../EditWordModal/EditWordModal';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

interface TableProps {
  words: WordResponse[];
}

type ApiError = AxiosError<{ error: string }>;

export default function Table({ words }: TableProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [editingWord, setEditingWord] = useState<WordResponse | null>(null);
  const user = useAuthStore((state) => state.user);
  const pathName = usePathname();

  useEffect(() => {
    const handleClick = () => setActiveId(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteWord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
      queryClient.invalidateQueries({ queryKey: ['allWords'] });
      queryClient.invalidateQueries({ queryKey: ['ownWords'] });
      toast.success('Word deleted successfully');
    },
  });

  const deleteCurrentWord = async (id: string) => {
    try {
      deleteMutation.mutate(id);
    } catch (error) {
      toast(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Deleted word falls',
      );
    }
  };

  const addMutation = useMutation({
    mutationFn: addWord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
      queryClient.invalidateQueries({ queryKey: ['ownWords'] });
      toast.success('Word added successfully');
    },
  });

  const addCurrentWord = async (id: string) => {
    try {
      addMutation.mutate(id);
    } catch (error) {
      toast(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Added word falls',
      );
    }
  };

  return (
    <div className={css.tableWrapper}>
      <Toaster />
      <div className={css.table}>
        <div className={css.tableBox}>
          <div
            className={`${css.tableHeadRow} ${pathName === '/dictionary' ? css.word : css.wordRec}`}
          >
            <p>Word</p>
            <Image alt="Flag" width={32} height={32} src="/en.png" className={css.flag} />
          </div>
          <div
            className={`${css.tableHeadRow} ${pathName === '/dictionary' ? css.translation : css.translationRec}`}
          >
            <p>Translation</p>
            <Image alt="Flag" width={32} height={32} src="/uk.png" className={css.flag} />
          </div>
          <div
            className={`${css.tableHeadRow} ${pathName === '/dictionary' ? css.category : css.categoryRec}`}
          >
            Category
          </div>
          {pathName === '/dictionary' && (
            <div className={`${css.tableHeadRow} ${css.progress}`}>Progress</div>
          )}
          <div
            className={`${css.tableHeadRow} ${pathName === '/dictionary' ? css.edit : css.editRec}`}
          ></div>
        </div>
        {words &&
          words.map((word) => (
            <div key={word._id} className={css.wordBox}>
              <div
                className={`${css.wordRow} ${pathName === '/dictionary' ? css.wordWord : css.wordWordRec}`}
              >
                {word.en}
              </div>
              <div
                className={`${css.wordRow} ${pathName === '/dictionary' ? css.wordTranslation : css.wordTranslationRec}`}
              >
                {word.ua}
              </div>
              <div
                className={`${css.wordRow} ${pathName === '/dictionary' ? css.wordCategory : css.wordCategoryRec}`}
              >
                {word.category}
              </div>
              {pathName === '/dictionary' && (
                <div className={`${css.wordRow} ${css.wordProgress}`}></div>
              )}
              <div
                className={`${css.wordRow} ${pathName === '/dictionary' ? css.wordEdit : css.wordEditRec}`}
              >
                {pathName === '/recommend' && user?._id !== word.owner && (
                  <button
                    type="button"
                    className={css.addToMyList}
                    // disabled={user?._id === word.owner}
                    onClick={() => addCurrentWord(word._id)}
                  >
                    <p className={css.text}>Add to dictionary</p>
                    <svg width={20} height={20} className={css.arrowImg}>
                      <use href="/symbol-defs.svg#arrow" />
                    </svg>
                  </button>
                )}
                {pathName === '/dictionary' && (
                  <button
                    type="button"
                    className={css.wordBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveId(activeId === word._id ? null : word._id);
                    }}
                  >
                    ...
                  </button>
                )}
                {activeId === word._id && (
                  <div className={css.editBox} onClick={(e) => e.stopPropagation()}>
                    <button className={css.editBtn} onClick={() => setEditingWord(word)}>
                      <svg width={16} height={16} className={css.editIcon}>
                        <use href="/symbol-defs.svg#pencil" />
                      </svg>
                      Edit
                    </button>
                    <button className={css.editBtn} onClick={() => deleteCurrentWord(word._id)}>
                      <svg width={16} height={16} className={css.editIcon}>
                        <use href="/symbol-defs.svg#trash" />
                      </svg>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        {editingWord && (
          <Backdrop onClose={() => setEditingWord(null)}>
            <EditWordModal
              onModalClose={() => setEditingWord(null)}
              id={editingWord._id}
              category={editingWord.category}
              isIrregular={editingWord.isIrregular}
              en={editingWord.en}
              ua={editingWord.ua}
            />
          </Backdrop>
        )}
      </div>
    </div>
  );
}
