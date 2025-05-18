// src/app/query-builder/initialQuery.ts
import { format, subDays } from 'date-fns';
import { RuleGroupType } from 'react-querybuilder';

const initialRange = [subDays(new Date(), 14), new Date()]
  .map(d => format(d, 'yyyy-MM-dd'))
  .join(',');

export const initialQuery: RuleGroupType = {
  rules: [
    {
      field: 'name',
      operator: '=',
      value: 'Steve Vai',
    },
    {
      field: 'dateOfBirth',
      operator: '=',
      value: '1960-06-06',
    },
    {
      field: 'dateRange',
      value: initialRange,
      operator: 'between',
    },
  ],
  combinator: 'and',
  not: false,
};
