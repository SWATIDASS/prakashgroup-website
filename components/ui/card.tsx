import React from 'react';

type CardProps = React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode };

export function Card({ children, className = '', ...rest }: CardProps) {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '', ...rest }: CardProps) {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}

export default Card;
