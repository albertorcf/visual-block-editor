// src/components/query-builder/QueryBuilderEditor.tsx

"use client";

import { QueryBuilder, RuleGroupType, Option } from "react-querybuilder";
import "react-querybuilder/dist/query-builder.css";
import "./styles.css";

interface QueryBuilderEditorProps {
  fields: { name: string; label: string }[];
  query: RuleGroupType;
  onQueryChange: (query: RuleGroupType) => void;
  operators?: Option[]; // <- novo opcional para customizar operadores
  className?: string;
}

export default function QueryBuilderEditor({
  fields,
  query,
  onQueryChange,
  operators,
  className = "",
}: QueryBuilderEditorProps) {
  return (
    <div className={`p-2 border rounded-md ${className}`}>
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={onQueryChange}
        controlElements={{}}
        controlClassnames={{}}
        operators={operators}
      />
    </div>
  );
}
