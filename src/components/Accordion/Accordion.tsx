import React from "react";
import * as Accordion from "@radix-ui/react-accordion";

import { AiOutlineDown } from "react-icons/ai";

import { styled } from "stitches.config";

export const TriggerComponent = styled(Accordion.Trigger, {
  all: "unset",
  fontFamily: "inherit",
  background: "none",
  border: "none",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontWeight: 800,
  fontSize: "16px",
  lineHeight: "28px",
  margin: "$8 0",
});

export const Content = styled(Accordion.AccordionContent, {
  padding: "$4 0",
});

export const AccordionIcon = styled(AiOutlineDown, {
  transition: "transform 300ms",
  "[data-state=open] &": { transform: "rotate(180deg)" },
});

export const Badge = styled("span", {
  padding: "2px 8px",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "18px",
  marginLeft: "16px",
});

interface AccordionProps {
  type?: any;
  defaultValue?: string;
  collapsible?: boolean;
  children?: React.ReactNode;
  asChild?: boolean;
}

export const AtomAccordion = ({
  asChild,
  type,
  defaultValue,
  collapsible,
  children,
}: AccordionProps) => {
  return (
    <Accordion.Root
      asChild={asChild}
      type={type}
      defaultValue={defaultValue}
      collapsible={collapsible}
    >
      {children}
    </Accordion.Root>
  );
};

interface AccordionItemProps {
  value: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export const AtomAccordionItem = ({
  value,
  trigger,
  children,
}: AccordionItemProps) => {
  return (
    <Accordion.Item value={value}>
      <TriggerComponent>
        <div>{trigger}</div>
        <AccordionIcon size={12} />
      </TriggerComponent>
      <Content>{children}</Content>
    </Accordion.Item>
  );
};
