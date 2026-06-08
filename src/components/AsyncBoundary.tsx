interface AsyncBoundaryProps {
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  emptyMessage?: string;
  children: React.ReactNode;
}

export function AsyncBoundary({
  loading,
  error,
  isEmpty,
  emptyMessage,
  children,
}: AsyncBoundaryProps) {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (isEmpty) {
    return <p>{emptyMessage}</p>;
  }

  return <>{children}</>;
}
