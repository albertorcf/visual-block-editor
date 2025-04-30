// src/components/Listbox.tsx
interface ListboxProps {
  items: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function Listbox({ items, selectedIndex, onSelect }: ListboxProps) {
  return (
    <div className="h-40 overflow-y-auto rounded border bg-white">
      <ul className="divide-y divide-gray-200">
        {items.map((item, index) => (
          <li
            key={index}
            className={`cursor-pointer px-4 py-2 text-sm select-none 
              ${index === selectedIndex ? "bg-blue-100 font-semibold" : "hover:bg-gray-50"}`}
            onClick={() => onSelect(index)}
          >
            {`${index + 1} - ${item}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
