// src/app/page.tsx
"use client";
import QueryBuilderEditor from "@/components/query-builder/QueryBuilderEditor";

export default function QueryBuilderPage() {

  return (
    <main className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Query Builder Editor</h1>

      <QueryBuilderEditor />

    </main>
  );
}
