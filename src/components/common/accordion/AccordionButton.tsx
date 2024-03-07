import React from 'react';
import { Disclosure } from '@headlessui/react';

interface AccordionButtonProps {
  children: React.ReactNode;
  className?: string;
}

function AccordionButton({ children, className }: AccordionButtonProps) {
  return (
    <Disclosure.Button className={className}>{children}</Disclosure.Button>
  );
}

export default AccordionButton;
