import React from 'react';

export const buttonVariants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm',
  secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800 shadow-sm',
  outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100',
  ghost: 'text-surface-700 hover:bg-surface-100 active:bg-surface-200',
  danger: 'bg-error text-white hover:bg-red-600 active:bg-red-700 shadow-sm',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'default';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  // ...existing code...

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    icon: 'h-9 w-9 p-0',
    default: 'px-4 py-2 text-base',
  };
  
  return (
    <button 
      className={`${baseStyles} ${buttonVariants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
