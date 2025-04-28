// src/app/page.tsx
"use client";
import { useState } from "react";
import { RuleGroupType } from "react-querybuilder";
import QueryBuilderEditor from "@/components/query-builder/QueryBuilderEditor";

const fields = [
  { name: "a", label: "a" },
  { name: "b", label: "b" },
];

const initialQuery: RuleGroupType = {
  combinator: "and",
  rules: [
    {
      field: "a",
      operator: ">",
      value: 12.1,
    },
    {
      field: "b",
      operator: "=",
      value: 0,
    },
    {
      combinator: "or",
      rules: [
        {
          field: "b",
          operator: "<",
          value: 0,
        },
      ],
    },
  ],
};

export default function QueryBuilderPage() {

  const [query, setQuery] = useState<RuleGroupType>(initialQuery);

  return (
    <main className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Query Builder Editor</h1>

      <div>
        <h2 className="text-lg font-semibold mb-2">Editor de Condição</h2>
        <QueryBuilderEditor
          fields={fields}
          query={query}
          onQueryChange={setQuery}
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold mt-8 mb-2">Condição gerada:</h2>
        <pre className="bg-gray-100 p-4 rounded text-xs">
          {JSON.stringify(query, null, 2)}
        </pre>
      </div>
    </main>
  );
}
