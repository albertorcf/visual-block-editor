// fields.ts
import { Field } from 'react-querybuilder';

export const fields: Field[] = [
  {
    name: 'name',
    label: 'Name',
    operators: [
      { name: '=', label: 'is' },
      { name: 'beginsWith', label: 'begins with' },
    ],
  },
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    operators: [{ name: '=', label: 'is' }],
    datatype: 'date',
  },
  {
    name: 'dateRange',
    label: 'Date Range',
    operators: [{ name: 'between', label: 'is between' }],
    datatype: 'dateRange',
  },
];