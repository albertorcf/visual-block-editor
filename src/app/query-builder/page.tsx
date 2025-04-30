// src/app/page.tsx
"use client";
import { useState, useEffect, Fragment } from "react";
import { RuleGroupType } from "react-querybuilder";
import QueryBuilderEditor from "@/components/query-builder/QueryBuilderEditor";
import Listbox from "@/components/Listbox";

// Carrega a estratégia de exemplo
import { baseStrategy } from "@/data/strategies/baseStrategy";
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

  const [condQuery, setCondQuery] = useState<RuleGroupType>(
    rules[selectedRuleIndex].condicao
  );

  const [actionQuery, setActionQuery] = useState<RuleGroupType>(
    rules[selectedRuleIndex].acao
  );

  useEffect(() => {
    setCondQuery(rules[selectedRuleIndex].condicao);
    setActionQuery(rules[selectedRuleIndex].acao);
  }, [selectedRuleIndex]);

  function handleSelectRule(newIndex: number) {
    // Atualiza o objeto da regra atual com a condição e ação editada
    rules[selectedRuleIndex].condicao = condQuery as any;
    rules[selectedRuleIndex].acao = actionQuery as any;

    // Muda o índice selecionado
    setSelectedRuleIndex(newIndex);
  }

  function buildFieldList(rawFields: string[]): { name: string; label: string; valueSources: string[] }[] {
    return rawFields.map((name) => ({
      name,
      label: name,
      valueSources: name.endsWith("()") ? ['value'] : ['value', 'field'],
    }));
  }

  return (
    <main className="flex flex-col gap-4 w-full max-w-none px-4 sm:px-6 mx-auto">
      <h1 className="text-2xl font-bold mb-2">Query Builder Editor</h1>


      <div className="flex flex-col lg:flex-row gap-6 mb-1 w-full">
        {/* Listbox de regras (selecionável) */}
        <div className="flex-1">
          <Listbox
            items={rules.map((r) => r.descr)}
            selectedIndex={selectedRuleIndex}
            onSelect={handleSelectRule}
            title="Regras"
            heightClass="h-37"
          />
        </div>

        {/* Listbox de variáveis da condição */}
        <div className="flex-1">
          <Listbox
            items={[...Object.keys(init), ...varsCondicao]}
            title="Variáveis da Condição"
            heightClass="h-37"
          />
        </div>

        {/* Listbox de variáveis da ação */}
        <div className="flex-1">
          <Listbox
            items={[...Object.keys(init), ...varsAcao]}
            title="Variáveis da Ação"
            heightClass="h-37"
          />
        </div>
      </div>


      <div className="flex flex-col lg:flex-row gap-4 w-full">
        {/* Editor de Condição */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-1">Editor de Condição</h2>
          <QueryBuilderEditor
            fields={buildFieldList([...Object.keys(init), ...varsCondicao])}
            query={condQuery}
            onQueryChange={setCondQuery}
          />
        </div>

        {/* Editor de Ação */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-1">Editor de Ação</h2>
          <QueryBuilderEditor
            fields={buildFieldList([...Object.keys(init), ...varsAcao])}
            query={actionQuery}
            onQueryChange={setActionQuery}
            className="bg-red-50"
            operators={actionOperators}
          />
        </div>
      </div>


      {/* Área de visualização do JSON gerado */}
      <div className="flex flex-col lg:flex-row gap-4 mt-1">
        
        {/* Coluna 1: JSON Condição */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-1">JSON Condição:</h2>
          <pre className="bg-gray-100 p-4 rounded text-xs">
            {JSON.stringify(condQuery, null, 2)}
          </pre>
        </div>

        {/* Coluna 2: JSON Ação */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-1">JSON ação:</h2>
          <pre className="bg-red-50 p-4 rounded text-xs">
            {JSON.stringify(actionQuery, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  ); 
}