import React, { ComponentProps } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

type ButtonProps = ComponentProps<'button'> &
VariantProps<typeof button> & {
  children: React.ReactNode;
};

const button = tv({
  base: `rounded-lg h-14 font-poppins font-medium mt-2 
  bg-primary-button text-white
  dark:bg-primary-dark-100-dark-100 dark:text-primary-dark-300
  disabled:opacity-50 disabled:cursor-not-allowed
  `,
  variants: {
    color: {
    },
    width: {
      md: 'w-40',
      full: 'w-full',
    },
    fixed: {
      top: 'fixed top-0',
      bottom: 'fixed bottom-0',
    },
    height: {
      default: 'h-14',
      small: 'h-10',
    },
  },
  defaultVariants: {
    width: 'full',
    height: 'default',
  },
});

function Button({ height, width, color, fixed, children, ...props } : ButtonProps) {
  const { className } = props;
  return (
    <button { ...props } className={ button({ height, width, color, fixed, className }) }>
      {children}
    </button>
  );
}

export default Button;
