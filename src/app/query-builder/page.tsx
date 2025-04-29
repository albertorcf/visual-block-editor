// src/app/page.tsx
"use client";
import { useState, useEffect } from "react";
import { RuleGroupType } from "react-querybuilder";
import QueryBuilderEditor from "@/components/query-builder/QueryBuilderEditor";
import { baseStrategy } from "@/data/strategies/baseStrategy";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"

const { init, varsCondicao, varsAcao, rules } = baseStrategy;
console.log('init =', init)
console.log('varsCondicao =', varsCondicao)
console.log('varsAcao =', varsAcao)
console.log('rules =', rules)

// condicao: "index == 1 || (atual.close <= suporte && saldoUSDT >= atual.close * qty && flagBuy)"
const fields = [
  { name: "a", label: "a", valueSources: ['field', 'value'], },
  { name: "b", label: "b", valueSources: ['field', 'value'], },
  {
    name: 'groupedField1',
    label: 'Grouped Field 1',
    //comparator: 'groupNumber',
    //groupNumber: 'group1',
    valueSources: ['field', 'value'],
  },
  { name: "index", label: "index", valueSources: ['field', 'value'], },
  { name: "atual.close", label: "atual.close", valueSources: ['field', 'value'], },
  { name: "suporte", label: "suporte", valueSources: ['field', 'value'], },
  { name: "saldoUSDT", label: "saldoUSDT", valueSources: ['field', 'value'], },
  { name: "qty", label: "qty", valueSources: ['field', 'value'], },
  { name: "flagBuy", label: "flagBuy", valueSources: ['field', 'value'], },
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

export default function QueryBuilderPage() {

  const [selectedRuleIndex, setSelectedRuleIndex] = useState(0);

  const selectedRule = rules[selectedRuleIndex];
  const [condQuery, setCondQuery] = useState(selectedRule.condicao);

  const [query, setQuery] = useState<RuleGroupType>(initialQuery);
  const [actionQuery, setActionQuery] = useState<RuleGroupType>(initialAction);

  useEffect(() => {
    setCondQuery(rules[selectedRuleIndex].condicao);
  }, [selectedRuleIndex]);


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
    <main className="flex flex-col gap-4 p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Query Builder Editor</h1>

      <div className="max-w-md mb-4">
        <label className="block text-sm font-medium mb-1">Regra selecionada:</label>
        <ScrollArea className="h-40 rounded border p-2">
          <RadioGroup
            value={String(selectedRuleIndex)}
            onValueChange={(value) => setSelectedRuleIndex(parseInt(value))}
          >
            {rules.map((r, i) => (
              <div key={i} className="flex items-center space-x-2">
                <RadioGroupItem value={String(i)} id={`rule-${i}`} />
                <label htmlFor={`rule-${i}`} className="text-sm">
                  {`${i + 1} - ${r.descr}`}
                </label>
              </div>
            ))}
          </RadioGroup>
        </ScrollArea>
      </div>


      <div className="flex flex-col lg:flex-row gap-4">
        {/* Coluna 1: Editor de Condição */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-1">Editor de Condição</h2>
          <QueryBuilderEditor
            fields={fields}
            query={query}
            onQueryChange={setQuery}
          />
        </div>

        {/* Coluna 2: Editor de Ação */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-1">Editor de Ação</h2>
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
      <div className="flex flex-col lg:flex-row gap-4 mt-1 mx-auto">
        {/* Coluna 1: JSON Condição */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-1">JSON Condição:</h2>
          <pre className="bg-gray-100 p-4 rounded text-xs">
            {JSON.stringify(query, null, 2)}
          </pre>
        </div>

        {/* Coluna 2: JSON Ação */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-1">Ação (como código):</h2>
          <pre className="bg-red-50 p-4 rounded text-xs">
            {generateActionCode(actionQuery)}
          </pre>

          <h2 className="text-lg font-semibold mt-4 mb-1">JSON bruto:</h2>
          <pre className="bg-red-50 p-4 rounded text-xs">
            {JSON.stringify(actionQuery, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  ); 
}
