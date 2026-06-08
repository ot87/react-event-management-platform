interface LabeledSelectProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

export function LabeledSelect({
  label,
  options,
  value,
  onChange,
}: LabeledSelectProps) {
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={`id${label}`} className="text-sm font-medium">
        {label}
      </label>
      <select
        id={`id${label}`}
        value={value}
        onChange={handleOnChange}
        className="rounded border border-gray-300 bg-white px-2 py-1 dark:border-gray-600 dark:bg-gray-800"
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
