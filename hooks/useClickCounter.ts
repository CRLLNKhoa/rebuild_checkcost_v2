"use client";
// useClickCounter.js
import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const useClickCounter = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isLoading,setIsloading] = useState(true)

  useEffect(() => {
    const docRef = doc(db, 'clicks', 'click');

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setClickCount(docSnap.data().count);
        setIsloading(false)
      }
    });

    return () => unsubscribe();
  }, []);

  const incrementClickCount = async () => {
    const docRef = doc(db, 'clicks', 'click');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const newCount = docSnap.data().count + 1;
      await updateDoc(docRef, { count: newCount });
    } else {
      await setDoc(docRef, { count: 1 });
    }
  };

  return { clickCount, incrementClickCount, isLoading };
};

export default useClickCounter;
