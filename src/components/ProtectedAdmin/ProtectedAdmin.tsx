'use client';

import { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/contexts/AuthContext';

interface Props {
  children: ReactNode;
}

export default function ProtectedAdmin({
  children,
}: Props) {

  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {

      router.push('/login');

    return;
  }

  if (user.role !== 'ADMIN') {

    router.push('/');
  }

  }, [user, loading, router]);

  if (loading) {
    return null;
  }

  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  return <>{children}</>;
}