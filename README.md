# visual-block-editor

- [Setup](#setup)
- [JS edit text](#js-edit-text)


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