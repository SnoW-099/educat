import React from 'react';

interface SafeLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export const SafeLink: React.FC<SafeLinkProps> = ({ 
  href, 
  children, 
  className = '',
  target = '_blank',
  rel = 'noopener noreferrer',
  ...props 
}) => {
  return (
    <a 
      href={href} 
      target={target}
      rel={rel}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
};