import { z } from 'zod';

export const startupSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre de la startup es obligatorio')
    .max(80, 'El nombre no puede superar los 80 caracteres'),
  founders: z
    .string()
    .min(1, 'El/Los nombres de los founders son obligatorios'),
  industry: z
    .string()
    .min(1, 'Por favor, selecciona una industria'),
  stage: z.enum(['idea', 'mvp', 'traccion', 'escala'], {
    message: 'Por favor, selecciona una etapa de desarrollo',
  }),


  city: z
    .string()
    .min(1, 'La ciudad es obligatoria'),
  website_or_ig: z
    .string()
    .transform((val) => val.trim())
    .optional()
    .refine(
      (val) => {
        if (!val || val === '') return true;
        const isUrl = /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(val);
        const isIgHandle = /^@[a-zA-Z0-9_.-]{1,30}$/.test(val);
        return isUrl || isIgHandle;
      },
      {
        message: 'Debe ser una URL válida (http/https) o un usuario de Instagram (@usuario)',
      }
    ),
  description: z
    .string()
    .min(1, 'Una descripción corta es obligatoria')
    .max(150, 'La descripción no puede superar los 150 caracteres'),
  attended_event: z.boolean(),

});

export type StartupFormValues = z.infer<typeof startupSchema>;
export type StartupStage = 'idea' | 'mvp' | 'traccion' | 'escala';
