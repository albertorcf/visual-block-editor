// src/components/query-builder/QueryBuilderEditor.tsx
"use client";
import { QueryBuilder, RuleGroupType } from "react-querybuilder";
import "react-querybuilder/dist/query-builder.css";
import "./query-builder.css";

interface QueryBuilderEditorProps {
  fields: { name: string; label: string }[];
  query: RuleGroupType;
  onQueryChange: (query: RuleGroupType) => void;
  className?: string; // <- novo parâmetro opcional
}

export default function QueryBuilderEditor({
  fields,
  query,
  onQueryChange,
  className = "",
}: QueryBuilderEditorProps) {
  return (
    <div className={`p-4 border rounded-md ${className}`}>
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={onQueryChange}
      />
    </div>
  );
}
