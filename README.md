# visual-block-editor

- [ToDo](#todo)
- [Setup](#setup)
- [JS edit text](#js-edit-text)
- [Componentes](#componentes)


# Todo

- Componente ```<ConditionEditor />``` Editar as condições (campos, operadores, valores)
  - Múltiplos campos! (Ex: a > 12.1 && b < 5) e uso de parênteses para definir prioridades
  - Usar Query Builder???
- Componente ```<ActionEditor />```	Editar as ações (atribuição ou chamada de função)
- Componente ```<RuleEditor />```	Junta ambos (condição + ação) numa regra
- Componente ```StrategyEditor.tsx```	Permite editar toda a estratégia (init + estrategia)
- Estilo visual tipo Query Builder: campos, dropdowns e inputs lado a lado
- Adicionar botão mover para cima/baixo as ações e condições
- Validar tipos (ex.: se for atribuição, valor precisa existir)
- No futuro: salvar como JSON ou fazer export para outros sistemas


# Setup

Next.js + Tailwind + shadcn/ui + App Router

```bash
# criar repositório vazio sem README e .gitignore
git clone git@github.com:albertorcf/visual-block-editor.git
cd visual-block-editor/

npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --src-dir \
  --app \
  --eslint

npx shadcn@latest init
npx shadcn@latest add input card button select radio-group scroll-area

npm install react-querybuilder
```


# JS edit text

```js
{
  init: { 
    a: 21.7,
    b: 0,
    flag: false,
    f: "() => console.log(a, b);"
  },
  estrategia: [
    {
      descr: "Regra 1",
      condition: "a > b",
      action: "b = 1;"
    },
    {
      descr: "Regra 2",
      condition: "a > b && (b >= 1)",
      action: "flag = true; b++; f();"
    }
  ]
}
```


# Componentes

## Blockly

[Site/Demo](https://developers.google.com/blockly?hl=pt-br)

## react-awesome-query-builder

[GitHub](https://github.com/ukrbublik/react-awesome-query-builder)  
[Demo](https://ukrbublik.github.io/react-awesome-query-builder/)

## React Query Builder

[Site/Demo](https://react-querybuilder.js.org/)  
[GitHub](https://github.com/react-querybuilder/react-querybuilder)

```bash
npm install react-querybuilder
```