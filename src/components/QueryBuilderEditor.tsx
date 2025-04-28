// src/components/QueryBuilderEditor.tsx
"use client";
import { QueryBuilder, RuleGroupType } from "react-querybuilder";
import "react-querybuilder/dist/query-builder.css";  // Importa o CSS padrão
import { useState } from "react";

const fields = [
  { name: "a", label: "a" },
  { name: "b", label: "b" },
];

export default function QueryBuilderEditor() {
  const [query, setQuery] = useState<RuleGroupType>({
    combinator: "and",
    rules: [
      {
        field: "a",
        operator: ">",
        value: 12.1,
      },
    ],
  });

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-lg font-semibold mb-4">Editor de Condição</h2>
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={(q) => setQuery(q)}
      />
      <div className="mt-6">
        <h3 className="text-sm font-semibold">JSON gerado:</h3>
        <pre className="bg-gray-100 p-4 rounded mt-2 text-xs">
          {JSON.stringify(query, null, 2)}
        </pre>
      </div>
    </div>
  );
}
