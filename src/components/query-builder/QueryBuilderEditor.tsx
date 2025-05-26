// src/components/query-builder/QueryBuilderEditor.tsx
"use client";
import { QueryBuilder, RuleGroupType, Option, ControlElementsProp, Field, Operator } from "react-querybuilder"; // Alterado OperatorName para Operator
import { CustomValueEditor } from './CustomValueEditor';
import "react-querybuilder/dist/query-builder.css";
import "./styles.css";

interface QueryBuilderEditorProps {
  fields: { name: string; label: string }[];
  query: RuleGroupType;
  onQueryChange: (query: RuleGroupType) => void;
  operators?: Option[];
  className?: string;
  showAddGroup?: boolean;
}

export default function QueryBuilderEditor({
  fields,
  query,
  onQueryChange,
  operators,
  className = "",
  showAddGroup = true,
}: QueryBuilderEditorProps) {
  const controlElements: Partial<ControlElementsProp<any, any>> = { 
    valueEditor: CustomValueEditor,
  };

  if (!showAddGroup) {
    controlElements.addGroupAction = () => null;
  }

  return (
    <div className={`${className}`}>
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={onQueryChange}
        controlElements={controlElements}
        controlClassnames={{}}
        operators={operators}
      />
    </div>
  );
}
