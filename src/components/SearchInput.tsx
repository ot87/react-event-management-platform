import { useEffect, useRef } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  const searchRef = useRef<HTMLInputElement>(null);
  const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  return (
    <input
      ref={searchRef}
      type="text"
      value={value}
      onChange={handleOnSearchChange}
      placeholder="Search events..."
      className="w-full rounded border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
    />
  );
}
