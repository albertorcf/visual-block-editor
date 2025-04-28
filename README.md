# visual-block-editor

# Setup

```bash
git clone git@github.com:albertorcf/visual-block-editor.git
cd visual-block-editor/

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