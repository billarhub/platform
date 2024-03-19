import React from 'react';
import { Disclosure } from '@headlessui/react';
import AccordionButton from './AccordionButton';
import AccordionPanel from './AccordionPanel';

interface AccordionProps {
  children: (props: { open: boolean }) => React.ReactElement;
  className?: string;
  defaultOpen?: boolean;
}

function Accordion({
  children,
  defaultOpen = false,
  className,
}: AccordionProps) {
  return (
    <Disclosure defaultOpen={defaultOpen} as="div" className={className}>
      {({ open }) => children({ open })}
    </Disclosure>
  );
}

Accordion.Button = AccordionButton;
Accordion.Panel = AccordionPanel;

export default Accordion;
