import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';

export const BackButton = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <Button onClick={goBack} className="font-bold border-none" variant="outline">
      ⬅️ BACK
    </Button>
  );
};
