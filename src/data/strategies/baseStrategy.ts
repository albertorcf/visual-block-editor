// src/data/strategies/baseStrategy.ts
import { RuleGroupType } from "react-querybuilder";

export const baseStrategy = {
  // Estado inicial da simulação
  init: {
    saldoUSDT: 100,
    saldoSOL: 0.1,
    delta: 1,
    qty: 0.1,
    taxa: 0.001,
    flagBuy: true,
    last: 1,
    iddle: 10
  },

  // Campos usados nas condições
  varsCondicao: [
    "resistencia",
    "suporte",
    "atual.close",
    "index",
    "valorOp",  // novo campo virtual - valor da operação (atual.close * qty)
    "tempoInativo" // novo campo virtual (index - last)
  ],

  // Campos/funções usados nas ações
  varsAcao: [
    "buy()",
    "sell()",
    "reset()"
  ],

  // Regras de decisão
  rules: [
    {
      type: "sell",
      descr: "VENDA se o preço romper resistência",
      condicao: {
        combinator: "and",
        rules: [
          { field: "atual.close", operator: ">=", valueSource: "field", value: "resistencia" },
          { field: "saldoSOL", operator: ">=", valueSource: "value", value: 0.1 },
          { field: "flagBuy", operator: "=", valueSource: "value", value: true }
        ]
      } satisfies RuleGroupType,
      acao: {
        combinator: "and",
        rules: [
          { field: "sell()", operator: "=", value: "" },
          { field: "flagBuy", operator: "=", value: true },
          { field: "reset()", operator: "=", value: "" },
          { field: "last", operator: "=", value: "index", valueSource: "field" }
        ]
      } satisfies RuleGroupType,
    },
    {
      type: "buy",
      descr: "COMPRA se o preço cair abaixo do suporte",
      condicao: {
        combinator: "or",
        rules: [
          { field: "index", operator: "=", valueSource: "value", value: 1 },
          {
            combinator: "and",
            rules: [
              { field: "atual.close", operator: "<=", valueSource: "field", value: "suporte" },
              { field: "saldoUSDT", operator: ">=", valueSource: "field", value: "valorOp" },
              { field: "flagBuy", operator: "=", valueSource: "value", value: true }
            ]
          }
        ]
      } satisfies RuleGroupType,
      acao: {
        combinator: "and",
        rules: [
          { field: "buy()", operator: "=", value: "" },
          { field: "flagBuy", operator: "=", value: false },
          { field: "reset()", operator: "=", value: "" },
          { field: "last", operator: "=", value: "index", valueSource: "field" }
        ]
      } satisfies RuleGroupType,
    },
    {
      type: "reset",
      descr: "RESET se tempo inativo for alto",
      condicao: {
        combinator: "and",
        rules: [
          { field: "tempoInativo", operator: ">", valueSource: "value", value: 10 }
        ]
      } satisfies RuleGroupType,
      acao: {
        combinator: "and",
        rules: [
          { field: "reset()", operator: "=", value: "" },
          { field: "last", operator: "=", value: "index", valueSource: "field" }
        ]
      } satisfies RuleGroupType,
    }
  ]
};
