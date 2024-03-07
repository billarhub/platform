import React from 'react';
import { Disclosure } from '@headlessui/react';

interface AccordionPanelProps {
  children: React.ReactNode;
  className?: string;
}

function AccordionPanel({ children, className }: AccordionPanelProps) {
  return <Disclosure.Panel className={className}>{children}</Disclosure.Panel>;
}

export default AccordionPanel;
