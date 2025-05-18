// CustomValueEditor.tsx
import { format, parse } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ValueEditor, ValueEditorProps } from 'react-querybuilder';

const dateFormat = 'yyyy-MM-dd';

export const CustomValueEditor = (props: ValueEditorProps) => {
  if (props.fieldData.datatype === 'date') {
    return (
      <div>
        <DatePicker
          dateFormat={dateFormat}
          selected={!props.value ? null : parse(props.value, dateFormat, new Date())}
          onChange={(date: Date | null, event?: React.SyntheticEvent) =>
            props.handleOnChange(date ? format(date, dateFormat) : null)
          }
        />
      </div>
    );
  } else if (props.fieldData.datatype === 'dateRange') {
    const [startDate, endDate] = props.value.split(',');
    return (
      <div>
        <DatePicker
          selectsRange
          dateFormat={dateFormat}
          startDate={!startDate ? null : parse(startDate, dateFormat, new Date())}
          endDate={!endDate ? null : parse(endDate, dateFormat, new Date())}
          onChange={(dates: [Date | null, Date | null] | null, event?: React.SyntheticEvent) => {
            const [s, e] = dates || [null, null];
            props.handleOnChange(
              [!s ? '' : format(s, dateFormat), !e ? '' : format(e, dateFormat)].join(',')
            );
          }}
        />
      </div>
    );
  }
  return <ValueEditor {...props} />;
};