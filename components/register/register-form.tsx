'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { startupSchema, StartupFormValues } from '@/lib/validations/startup';
import { registerStartup } from '@/app/register/actions';
import Button from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { AlertCircle, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export default function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<StartupFormValues>({
    resolver: zodResolver(startupSchema),
    defaultValues: {
      name: '',
      founders: '',
      industry: '',
      stage: 'idea',
      city: 'Caracas',
      website_or_ig: '',
      description: '',
      attended_event: false,
    },
  });

  const selectedStage = watch('stage');
  const watchedDescription = watch('description') || '';
  const attendedEvent = watch('attended_event');

  const onSubmit = async (values: StartupFormValues) => {
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await registerStartup(values);
      if (response.success) {
        setSuccessMsg(
          '¡Registro recibido! El equipo revisará tu startup y aparecerá en el directorio pronto. ☕'
        );
        reset();
      } else {
        setErrorMsg(response.error || 'Ocurrió un error inesperado al procesar el registro.');
      }
    } catch (err: any) {
      setErrorMsg('Error de conexión. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const industries = [
    { label: 'Selecciona una industria', value: '' },
    { label: 'Fintech', value: 'Fintech' },
    { label: 'Healthtech', value: 'Healthtech' },
    { label: 'Edtech', value: 'Edtech' },
    { label: 'SaaS', value: 'SaaS' },
    { label: 'E-commerce', value: 'E-commerce' },
    { label: 'Otra', value: 'Otra' },
  ];

  const stages = [
    { label: 'Idea', value: 'idea', desc: 'En papel o diseño inicial' },
    { label: 'MVP', value: 'mvp', desc: 'Producto mínimo funcional' },
    { label: 'Tracción', value: 'traccion', desc: 'Usuarios activos o ventas' },
    { label: 'Escala', value: 'escala', desc: 'Crecimiento estructurado' },
  ] as const;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-border rounded-3xl shadow-xl overflow-hidden select-none font-body">
      {/* Form Header */}
      <div className="p-8 border-b border-border bg-bg-subtle/50">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[10px] font-semibold text-blue uppercase tracking-wider mb-3">
          <Sparkles className="h-3 w-3 shrink-0" />
          Registra tu Startup
        </div>
        <h2 className="font-display text-2xl font-extrabold text-ink mb-1.5 leading-none">
          Forma parte del semillero
        </h2>
        <p className="text-muted text-xs leading-relaxed max-w-md">
          Tu registro será revisado por el equipo co-organizador antes de publicarse en el directorio comunitario.
        </p>
      </div>

      {/* Form Body */}
      {successMsg ? (
        /* Inline Success Panel */
        <div className="p-8 flex flex-col items-center text-center animate-in fade-in duration-300">
          <div className="h-12 w-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="font-display text-xl font-extrabold text-emerald-950 mb-2">
            ¡Envío Exitoso!
          </h3>
          <p className="text-emerald-800 text-xs sm:text-sm max-w-md mb-6 leading-relaxed select-text">
            {successMsg}
          </p>
          <Button pill size="sm" onClick={() => setSuccessMsg('')}>
            Registrar otra startup
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          {errorMsg && (
            <div className="flex gap-3 bg-rose-50 border border-rose-200 p-4 rounded-xl text-rose-950 items-start select-text animate-in fade-in duration-200">
              <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold uppercase block tracking-wider leading-none mb-1">
                  Error de registro
                </span>
                <p className="leading-relaxed">{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Nombre de la startup */}
          <Input
            label="Nombre de la startup"
            placeholder="Ej. Ridery, Yummy, Smartgib..."
            error={errors.name?.message}
            {...register('name')}
          />

          {/* Founders */}
          <Input
            label="Founder(es)"
            placeholder="Separa los nombres de los fundadores con coma (,)"
            error={errors.founders?.message}
            {...register('founders')}
          />

          {/* Industria Select */}
          <div className="w-full">
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
              Industria
            </label>
            <select
              className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-sm placeholder-muted focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all cursor-pointer font-semibold"
              {...register('industry')}
            >
              {industries.map((ind) => (
                <option key={ind.value} value={ind.value}>
                  {ind.label}
                </option>
              ))}
            </select>
            {errors.industry?.message && (
              <p className="mt-1.5 text-xs font-semibold text-red-600">
                {errors.industry.message}
              </p>
            )}
          </div>

          {/* Stage Radio horizontal chips */}
          <div className="w-full">
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
              Etapa de Desarrollo
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {stages.map((stg) => {
                const isActive = selectedStage === stg.value;
                return (
                  <button
                    key={stg.value}
                    type="button"
                    onClick={() => setValue('stage', stg.value)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isActive
                        ? 'bg-surface border-blue text-blue ring-1 ring-blue'
                        : 'bg-white border-border text-muted hover:border-blue/50 hover:text-ink'
                    }`}
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-wider leading-none mb-1">
                      {stg.label}
                    </span>
                    <span className="text-[8px] opacity-70 leading-none">
                      {stg.desc}
                    </span>
                  </button>
                );
              })}
            </div>
            {errors.stage?.message && (
              <p className="mt-1.5 text-xs font-semibold text-red-600">
                {errors.stage.message}
              </p>
            )}
          </div>

          {/* Ciudad */}
          <Input
            label="Ciudad Sede"
            placeholder="Caracas"
            error={errors.city?.message}
            {...register('city')}
          />

          {/* Web o Instagram */}
          <Input
            label="Sitio web o Instagram"
            placeholder="Ej. https://ridery.app o @smartgib_ve"
            error={errors.website_or_ig?.message}
            {...register('website_or_ig')}
          />

          {/* Descripción & Live Character counter */}
          <Textarea
            label="Descripción corta"
            placeholder="¿Qué hace tu startup en 150 caracteres o menos?"
            charCount={`${watchedDescription.length}/150`}
            error={errors.description?.message}
            rows={3}
            {...register('description')}
          />

          {/* Attended event Toggle Switch */}
          <div className="flex items-center justify-between p-4 bg-bg-subtle/50 border border-border rounded-xl">
            <div>
              <span className="block text-xs font-semibold text-ink leading-tight mb-1">
                ¿Asistieron a un evento?
              </span>
              <span className="block text-[10px] text-muted leading-tight">
                Hemos asistido a Startups Coffee en el HUB BDV Innova
              </span>
            </div>
            
            <button
              type="button"
              onClick={() => setValue('attended_event', !attendedEvent)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                attendedEvent ? 'bg-blue' : 'bg-border'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  attendedEvent ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar registro'
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
