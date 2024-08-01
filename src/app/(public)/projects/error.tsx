'use client';

// Components
import { ErrorContent } from '@/components';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorContent onClick={reset} />;
}
