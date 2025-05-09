// src/components/Listbox.tsx

interface ListboxProps {
  items: string[] | string[][];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  title?: string;
  heightClass?: string;
  headers?: string[];
}

export default function Listbox({ items, selectedIndex, onSelect, title, heightClass = "h-40", headers }: ListboxProps) {
  const isTable = Array.isArray(items[0]);

  return (
    <div className="max-w-md mb-1">
      {title && <label className="block text-sm font-medium mb-1">{title}</label>}
      <div className={`${heightClass} overflow-y-auto rounded border bg-white`}>
        {isTable ? (
          // Table
          <table className="table-fixed w-full text-sm">
            {headers && (
              <thead>
                <tr className="bg-gray-100">
                  {headers.map((h, i) => (
                    <th key={i} className="px-2 py-1 text-left font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {(items as string[][]).map((row, index) => (
                <tr
                  key={index}
                  className={`select-none ${onSelect ? "cursor-pointer" : ""} ${selectedIndex === index ? "bg-blue-100 font-semibold" : "hover:bg-gray-50"
                    }`}
                  onClick={() => onSelect?.(index)}
                >
                  {row.map((cell, i) => (
                    <td key={i} className="px-2 py-1">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          // Simples
          <>
          <ul className="divide-y divide-gray-200">
          {(items as string[]).map((item, index) => (
            <li
              key={index}
              className={`px-4 py-2 text-sm select-none ${onSelect ? "cursor-pointer" : "cursor-default"}
                          ${selectedIndex === index ? "bg-blue-100 font-semibold" : "hover:bg-gray-50"}`}
              onClick={() => onSelect?.(index)}
            >
              {item}
            </li>
          ))}
          </ul>

              <div 
              className="h-12 overflow-y-auto bg-green-100 font-semibold cursor-pointer border-solid">
                Teste Tailwind<br/>
                Linha2<br/>
                Linha3<br/>
                Linha4
              </div>          
          </>
        )}
      </div>
    </div>
  );
}
