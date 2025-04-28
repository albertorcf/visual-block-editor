// src/app/page.tsx
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const initialData = {
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
};

export default function HomePage() {
  const [data, setData] = useState(initialData);

  const handleChangeInit = (key: string, value: number) => {
    setData((prev) => ({
      ...prev,
      init: {
        ...prev.init,
        [key]: value,
      },
    }));
  };

  return (
    <main className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Editor Visual de Estratégia</h1>

      <Card>
        <CardHeader>
          <CardTitle>Variáveis Iniciais (init)</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="a" className="text-sm">a</label>
            <Input
              id="a"
              type="number"
              value={data.init.a}
              onChange={(e) => handleChangeInit("a", parseFloat(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="b" className="text-sm">b</label>
            <Input
              id="b"
              type="number"
              value={data.init.b}
              onChange={(e) => handleChangeInit("b", parseFloat(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Regras (estratégia)</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {data.estrategia.map((rule, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <div className="font-semibold mb-2">{rule.descr}</div>
              <div><span className="font-medium">Condição:</span> {rule.condition}</div>
              <div><span className="font-medium">Ação:</span> {rule.action}</div>
            </div>
          ))}
          <Button variant="outline">Adicionar Nova Regra</Button>
        </CardContent>
      </Card>
    </main>
  );
}
