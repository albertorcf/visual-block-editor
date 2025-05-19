// packages/visual-editor/src/app/query-builder/page.tsx
"use client";
import { useState, useEffect, Fragment } from "react";
import { RuleGroupType } from "react-querybuilder";
import { QueryBuilderEditor, Listbox } from "visual-editor";
import { fields } from './fields';
import { initialQuery } from './initialQuery';

// Carrega a estratégia de exemplo
import { baseStrategy } from "@/data/strategies/baseStrategy";
const { vars, rules } = baseStrategy;

// Separe as variáveis por tipo
const init = vars.filter(v => v.type === "state" || v.type === "candle");
const varsCondition = vars.filter(v => v.type === "computed" && !v.name.endsWith("()"));
const varsAction = vars.filter(v => v.type === "action");

console.log('vars =', vars)
console.log('init =', init)
console.log('varsCondition =', varsCondition)
console.log('varsAction =', varsAction)
console.log('rules =', rules)

const actionOperators = [
  { name: "=", label: "=" },
  //{ name: "+=", label: "+=" },
  //{ name: "-=", label: "-=" },
  //{ name: "*=", label: "*=" },
  //{ name: "/=", label: "/=" },
];

export default function QueryBuilderPage() {

  const [selectedRuleIndex, setSelectedRuleIndex] = useState(0);

  const selectedRule = rules[selectedRuleIndex];

  const [condQuery, setCondQuery] = useState<RuleGroupType>(
    rules[selectedRuleIndex].condition
  );

  const [actionQuery, setActionQuery] = useState<RuleGroupType>(
    rules[selectedRuleIndex].action
  );

  useEffect(() => {
    setCondQuery(rules[selectedRuleIndex].condition);
    setActionQuery(rules[selectedRuleIndex].action);
  }, [selectedRuleIndex]);

  function handleSelectRule(newIndex: number) {
    // Atualiza o objeto da regra atual com a condição e ação editada
    rules[selectedRuleIndex].condition = condQuery as any;
    rules[selectedRuleIndex].action = actionQuery as any;

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

  // init: mostra expr se houver, senão mostra valor
  const initDisplay = init.map((v: any) =>
    v.expr ? `${v.name} (${v.expr})` :
      v.value !== undefined ? `${v.name}: ${String(v.value)}` :
        v.name
  );

  // varsCondition: mostra expr se houver
  const varsConditionDisplay = varsCondition.map((v: any) =>
    v.expr ? `${v.name} (${v.expr})` : v.name
  );

  // varsAction: por enquanto, apenas nome
  const varsActionDisplay = varsAction.map((v: any) =>
    v.expr ? `${v.name} (${v.expr})` : v.name
  );

  // CustomValueEditor test!
  const [query, setQuery] = useState(initialQuery);

  return (
    <main className="flex flex-col gap-4 w-full max-w-none px-4 sm:px-6 mx-auto">

      <h1 className="text-2xl font-bold mb-2">Query Builder Editor</h1>

      {/* CustomValueEditor test! */}
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        {/* QueryBuildEditor */}
        <div className="flex-3">
          <h2 className="text-lg font-semibold mb-1">CustomValueEditor test</h2>
          <QueryBuilderEditor
            fields={fields}
            query={query}
            onQueryChange={setQuery}
          />
        </div>
        {/* JSON query */}
        <div className="flex-2">
          <h2 className="text-lg font-semibold mb-1">CustomValueEditor test:</h2>
          <pre className="bg-gray-100 p-4 rounded text-xs">
            {JSON.stringify(query, null, 2)}
          </pre>
        </div>
      </div>
      {/* Área de visualização do JSON gerado */}
      <div className="flex flex-col lg:flex-row gap-4 mt-1">
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-4 h-37 w-full">

        {/* Listbox de regras (selecionável) */}
        <div className="flex-1">
          <h2 className="mb-1 font-semibold">Regras</h2>
          <Listbox
            className="rounded border bg-white h-37"
            items={rules.map((r) => r.descr)}
            selectedIndex={selectedRuleIndex}
            onSelect={handleSelectRule}
          />
        </div>

        {/* Listbox de variáveis da condição */}
        <div className="flex-1">
          <h2 className="mb-1 font-semibold">Variáveis da Condição</h2>
          <Listbox
            className="rounded border bg-white"
            headers={["Nome", "Valor", "Expr"]}
            items={[...init, ...varsCondition].map((v: any) => [
              v.name,
              v.value ? v.value : "",
              v.expr ?? ""
            ])}
          />
        </div>

        {/* Listbox de variáveis da ação */}
        <div className="flex-1">
          <h2 className="mb-1 font-semibold">Variáveis da Ação</h2>
          <Listbox
            className="rounded border bg-white"
            headers={["Nome", "Valor", "Expr"]}
            items={[...init, ...varsAction].map((v: any) => [
              v.name,
              v.value ? v.value : "",
              v.expr ?? ""
            ])}
          />
        </div>

      </div>


      <div className="flex flex-col lg:flex-row gap-4 w-full">
        {/* Editor de Condição */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-1">Editor de Condição</h2>
          <QueryBuilderEditor
            fields={buildFieldList([
              ...init.map((v) => v.name),
              ...varsCondition.map((v) => v.name)
            ])}
            query={condQuery}
            onQueryChange={setCondQuery}
          />
        </div>

        {/* Editor de Ação */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-1">Editor de Ação</h2>
          <QueryBuilderEditor
            fields={buildFieldList([
              ...init.map((v) => v.name),
              ...varsAction.map((v) => v.name)
            ])}
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