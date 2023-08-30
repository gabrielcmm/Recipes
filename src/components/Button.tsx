import React, { ComponentProps } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

type ButtonProps = ComponentProps<'button'> &
VariantProps<typeof button> & {
  children: React.ReactNode;
};

const button = tv({
  base: `bg-blue-500 text-white rounded-lg shadow-lg
  hover:brightness-75
  disabled:bg-gray-300 disabled:text-gray-500 disabled:brightness-100
  `,
  variants: {
    color: {
      blue: 'bg-blue-500',
      red: 'bg-red-500',
    },
    size: {
      md: 'w-40 h-14',
    },
  },
  defaultVariants: {
    color: 'blue',
    size: 'md',
  },
});

function Button({ size, color, children, ...props } : ButtonProps) {
  const { className } = props;
  return (
    <button { ...props } className={ button({ size, color, className }) }>
      {children}
    </button>
  );
}

export default Button;
