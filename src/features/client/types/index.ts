export interface InputProps {
  name: string;
  label: string;
  defaultValue?: string;
  type?: 'text' | 'email' | 'number' | 'tel';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean; // optional: to disable the input
}

export type InputType =
  | 'input_string'
  | 'input_number'
  | 'input_email'
  | 'input_phone'
  | 'input_date'
  | 'input_dropdown'
  | 'input_radio'
  | 'input_checklist'
  | 'input_textarea'
  | 'file';

export interface InputFieldProps {
  name: string;
  label: string;
  input_type: InputType;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  defaultValue?: any;
  error?: string;
  onChange?: (value: any) => void;
  onSelect?: (value: any) => void;
  onInput?: (value: any) => void;
  disabled?: boolean;
}
