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

const initialAction: RuleGroupType = {
  combinator: "and",
  rules: [
    {
      field: "a",
      operator: "=",
      value: 21,
    },
  ],
};

const actionFields = [
  { name: "a", label: "a" },
  { name: "b", label: "b" },
  { name: "func()", label: "func()" },
  { name: "reset()", label: "reset()" },
];

const actionOperators = [
  { name: "=", label: "=" },
  { name: "+=", label: "+=" },
  { name: "-=", label: "-=" },
  { name: "*=", label: "*=" },
  { name: "/=", label: "/=" },
];

// Para tipos de ação
const actionTypes = [
  { name: "assign", label: "Atribuição" },
  { name: "function", label: "Função" },
];

export default function QueryBuilderPage() {

  const [query, setQuery] = useState<RuleGroupType>(initialQuery);
  const [actionQuery, setActionQuery] = useState<RuleGroupType>(initialAction);

  function generateActionCode(action: RuleGroupType): string {
    return action.rules
      .map((rule) => {
        if ("field" in rule && typeof rule.field === "string") {
          const isFunction = rule.field.endsWith("()");
          if (isFunction) {
            return `${rule.field}`;
          } else {
            return `${rule.field} ${rule.operator} ${rule.value}`;
          }
        }
        return "";
      })
      .filter(Boolean)
      .join("; ");
  }

  return (
    <main className="flex flex-col gap-6 p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Query Builder Editor</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Coluna 1: Editor de Condição */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">Editor de Condição</h2>
          <QueryBuilderEditor
            fields={fields}
            query={query}
            onQueryChange={setQuery}
          />
        </div>

        {/* Coluna 2: Editor de Ação */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">Editor de Ação</h2>
          <QueryBuilderEditor
            fields={actionFields}
            query={actionQuery}
            onQueryChange={setActionQuery}
            className="bg-red-50" // <- vermelho super suave
            operators={actionOperators}
          />
        </div>
      </div>

      {/* Área de visualização do JSON gerado */}
      <div className="flex flex-col lg:flex-row gap-6 mt-10">
        {/* Coluna 1: JSON Condição */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">JSON Condição:</h2>
          <pre className="bg-gray-100 p-4 rounded text-xs">
            {JSON.stringify(query, null, 2)}
          </pre>
        </div>

        {/* Coluna 2: JSON Ação */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">Ação (como código):</h2>
          <pre className="bg-red-100 p-4 rounded text-xs">
            {generateActionCode(actionQuery)}
          </pre>

          <h2 className="text-lg font-semibold mt-4 mb-2">JSON bruto:</h2>
          <pre className="bg-gray-50 p-4 rounded text-xs">
            {JSON.stringify(actionQuery, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  ); 
}
