'use client';

import Header from '@/components/Header/Header';
import css from './Training.module.css';
import { useQuery } from '@tanstack/react-query';
import { createAnswer, getTasks } from '@/lib/api/clientApi';
import { useState } from 'react';
import { Task } from '@/types/words';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { AxiosError } from 'axios';
import Backdrop from '@/components/Backdrop/Backdrop';
import WellDoneModal from '@/components/WellDoneModal/WellDoneModal';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader/Loader';
import Message from '@/components/Massege/Message';

type ApiError = AxiosError<{ error: string }>;

export default function TrainingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState<Task[]>([]);
  const [isWellDoneModalOpen, setIsWellDoneModelOpen] = useState(false);

  const router = useRouter();

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  if (isLoading) {
    return <Loader />;
  }

  const englishTasks = tasks?.filter((task) => task.task !== 'en');
  // const ukrainianTasks = tasks?.filter((task) => task.task !== 'ua');
  console.log('ENGLISH', englishTasks);
  // console.log('UKRAINIAN', ukrainianTasks);
  const isLastTask = englishTasks && currentIndex === englishTasks.length - 1;

  const currentTask = englishTasks?.[currentIndex];

  const handleNext = () => {
    if (!currentTask) return null;

    const currentAnswer: Task = {
      _id: currentTask?._id,
      en: currentTask?.en,
      ua: answer,
      task: currentTask?.task,
    };

    if (currentAnswer && currentAnswer.ua?.trim()) {
      setAnswers((prev) => [...prev, currentAnswer]);
    }

    setAnswer('');
    setCurrentIndex((prev) => prev + 1);
  };

  const handleSave = async () => {
    try {
      const finalAnswers = [...answers];
      if (answer.trim() && currentTask) {
        finalAnswers.push({
          _id: currentTask._id,
          ua: answer,
          en: currentTask.en,
          task: currentTask.task,
        });
      }
      const currentAnswers = await createAnswer(finalAnswers);
      if (currentAnswers) {
        toast.success('Answer saved');
        setIsWellDoneModelOpen(true);
      }
    } catch (error) {
      const err = error as ApiError;

      if (err.response?.status === 400) {
        toast.error('Bad answer. Your progress is going to deleted. Try again');
        router.push('/dictionary');
        return;
      }

      toast(err.response?.data?.error ?? err.message ?? 'Answer failed.Try again.');
      router.push('/dictionary');
    }
  };

  return (
    <div className={css.training}>
      <Toaster />
      <Header />
      {englishTasks && englishTasks.length !== 0 && (
        <div className={css.taskContainer}>
          <div className={css.labelsBox}>
            <div className={css.labelUa}>
              <input
                name="ua"
                className={css.input}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Введіть переклад"
              />
              <div className={css.wrapper}>
                <Image width={28} height={28} alt="Flag" src="/uk.png" className={css.image} />
                <p>Ukrainian</p>
              </div>

              {!isLastTask && (
                <button onClick={handleNext} className={css.nextBtn}>
                  Next
                  <svg width={20} height={20}>
                    <use href="/symbol-defs.svg#arrow" />
                  </svg>
                </button>
              )}
            </div>
            <div className={css.labelEn}>
              <input name="en" className={css.input} value={currentTask?.en} readOnly />
              <div className={css.wrapper}>
                <Image width={28} height={28} alt="Flag" src="/en.png" className={css.image} />
                <p>English</p>
              </div>
            </div>
          </div>
          <div className={css.btnsBox}>
            <button className={css.saveBtn} onClick={handleSave}>
              Save
            </button>
            <button className={css.cancelBtn} onClick={() => router.push('/dictionary')}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {(!tasks || englishTasks?.length === 0) && <Message />}
      {isWellDoneModalOpen && (
        <Backdrop
          onClose={() => {
            setIsWellDoneModelOpen(false);
          }}
        >
          <WellDoneModal />
        </Backdrop>
      )}
    </div>
  );
}
