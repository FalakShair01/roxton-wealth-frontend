'use client';

import { TextInput } from './TextInput';
import { DateInput } from './DateInput';
import { DropdownInput } from './DropdownInput';
import { RadioInput } from './RadioInput';
import { FileInput } from './FileInput';
import { DropdownChecklist } from './DropdownChecklist';
import { TextAreaInput } from './TextAreaInput';
import { InputFieldProps, InputProps } from '../types';

interface SmartInputProps {
  field: InputProps & InputFieldProps;
}

export function SmartInput({ field }: SmartInputProps) {
  const normalizedOptions = Array.isArray((field as any).value)
    ? ((field as any).value as any[])
    : field.options;

  const inputProps = { ...field };

  switch (field.input_type) {
    case 'input_string':
      return <TextInput {...inputProps} type='text' />;
    case 'input_number':
      return <TextInput {...inputProps} type='number' />;
    case 'input_email':
      return <TextInput {...inputProps} type='email' />;
    case 'input_phone':
      return <TextInput {...inputProps} type='tel' />;
    case 'input_date':
      return <DateInput {...inputProps} />;
    case 'input_dropdown':
      return (
        <DropdownInput {...inputProps} options={normalizedOptions || []} />
      );
    case 'input_radio':
      return <RadioInput {...inputProps} options={normalizedOptions || []} />;
    case 'input_checklist':
      return (
        <DropdownChecklist {...inputProps} options={normalizedOptions || []} />
      );
    case 'input_textarea':
      return <TextAreaInput {...inputProps} />;
    case 'file':
      return <FileInput {...inputProps} />;
    default:
      return null;
  }
}
