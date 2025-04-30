// src/components/Listbox.tsx

interface ListboxProps {
  items: string[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  title?: string;
  heightClass?: string; // 👈 novo
}

export default function Listbox({ 
  items, 
  selectedIndex, 
  onSelect, 
  title,
  heightClass = "h-40", // 👈 valor padrão
}: ListboxProps) {
  return (
    <div className="mb-1">
      {title && <label className="block text-sm font-medium mb-1">{title}</label>}
      <div className={`${heightClass} overflow-y-auto rounded border bg-white`}>
        <ul className="divide-y divide-gray-200">
          {items.map((item, index) => (
            <li
              key={index}
              className={`px-4 py-2 text-sm select-none 
                ${onSelect ? "cursor-pointer" : "cursor-default"} 
                ${selectedIndex === index ? "bg-blue-100 font-semibold" : "hover:bg-gray-50"}`}
              onClick={() => onSelect?.(index)}
            >
              {onSelect ? `${index + 1} - ${item}` : item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
