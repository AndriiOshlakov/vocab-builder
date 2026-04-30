'use client';

import { Suspense } from 'react';
import DictionaryContent from './DictionaryContent';

export default function DictionaryPage() {
  return (
    <Suspense fallback={null}>
      <DictionaryContent />
    </Suspense>
  );
}
