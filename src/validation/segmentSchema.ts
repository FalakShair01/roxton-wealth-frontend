// utils/zodFromFields.ts
import * as z from 'zod';
import type { FormField } from '@/constants/form-data';

const toNumber = (v: unknown) => {
  if (typeof v === 'number') return v;
  if (typeof v !== 'string') return NaN;
  const cleaned = v.replace(/[^\d.-]/g, '');
  if (cleaned.trim() === '') return NaN;
  return Number(cleaned);
};

const isISODate = (s: string) => !Number.isNaN(Date.parse(s));

function fieldSchema(f: FormField): z.ZodTypeAny {
  const reqMsg = `${f.label} is required`;

  switch (f.input_type) {
    case 'input_string':
    case 'input_textarea':
      return z.string().trim().min(1, reqMsg);

    case 'input_number':
      return z.preprocess(
        toNumber,
        z.number({ invalid_type_error: reqMsg }).finite(reqMsg)
      );

    case 'input_date':
      return z
        .string()
        .trim()
        .min(1, reqMsg)
        .refine(isISODate, `${f.label} must be a valid date`);

    case 'input_radio':
    case 'input_dropdown':
      if (f.options?.length) {
        const vals = f.options.map((o) => o.value);
        return z.enum(vals as [string, ...string[]], {
          invalid_type_error: reqMsg
        });
      }
      return z.string().trim().min(1, reqMsg);

    case 'input_checklist':
      return z
        .array(z.string().min(1))
        .min(1, `${f.label}: select at least one`);

    default:
      return z.any(); // fallback (won’t block submission)
  }
}

export function zodFromFields(fields: FormField[]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const f of fields) shape[f.name] = fieldSchema(f);
  return z.object(shape);
}
