import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({ label, error, icon, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-surface-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
            {icon}
          </div>
        )}
        <input
          className={`w-full px-4 py-2.5 bg-white border border-surface-300 rounded-[var(--radius-md)] 
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent 
            transition-all duration-200 placeholder:text-surface-400
            ${icon ? 'pl-10' : ''} 
            ${error ? 'border-error focus:ring-error' : ''} 
            ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-surface-700">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-2.5 bg-white border border-surface-300 rounded-[var(--radius-md)] 
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent 
          transition-all duration-200 placeholder:text-surface-400 resize-none
          ${error ? 'border-error focus:ring-error' : ''} 
          ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className = '', ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-surface-700">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-2.5 bg-white border border-surface-300 rounded-[var(--radius-md)] 
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent 
          transition-all duration-200
          ${error ? 'border-error focus:ring-error' : ''} 
          ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
}
