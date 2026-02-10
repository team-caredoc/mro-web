"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Breakpoint } from "@/components/ui/breakpoint";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { cn } from "@/libs/utils";

const IconSelectBoxArrow = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.7395 5.22404C15.0275 4.9263 15.4945 4.9263 15.7825 5.22404C16.0702 5.52176 16.0703 6.00447 15.7825 6.30216L9.52077 12.7768C9.41276 12.8884 9.27936 12.9579 9.13991 12.9858C9.04708 13.0043 8.95149 13.0043 8.85866 12.9858C8.74225 12.9625 8.63014 12.9102 8.53346 12.8285L8.4778 12.7768L2.21608 6.30216C1.92828 6.00447 1.92831 5.52176 2.21608 5.22404C2.50404 4.9263 2.97109 4.9263 3.25905 5.22404L8.99928 11.1586L14.7395 5.22404Z"
        fill="#757575"
      />
    </svg>
  );
};
interface Props {
  title: string;
  value: string;
  onChange: (value: string) => void;
  options: { text: string; value: string }[];
  popupOnly?: boolean;
}
const ResponsiveRadioButton = ({
  value,
  onChange,
  options,
  title,
  popupOnly = false,
}: Props) => {
  const [open, setOpen] = useState(false);

  const handleChange = (value: string) => {
    onChange(value);
    setOpen(false);
  };
  return (
    <Breakpoint>
      <Breakpoint.Mobile>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger className="flex h-[62px] w-full items-center justify-between rounded-[10px] border border-gray-300 px-[16px]">
            <Trigger options={options} title={title} value={value} />
            <IconSelectBoxArrow className={cn(open && "rotate-180")} />
          </DrawerTrigger>
          <DrawerContent className="max-w-[720px]">
            <DrawerHeader borderBottom>
              <DrawerTitle>{title}</DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col items-start self-stretch overflow-y-auto pb-[20px] pt-[12px]">
              <RadioGroup
                className="flex w-full flex-wrap gap-0"
                value={value}
                onValueChange={handleChange}
              >
                {options.map((item) => (
                  <Label
                    key={`${item.value}`}
                    className={cn(
                      "group flex w-full cursor-pointer items-center justify-between self-stretch rounded-[8px] bg-white px-[16px] py-[12px] hoverable:hover:bg-gray-100",
                    )}
                    htmlFor={`${item.value}`}
                  >
                    <p className="tracking-[-0.48px] text-gray-900 single-16-400">
                      {item.text}
                    </p>
                    <RadioGroupItem
                      className="h-[20px] w-[20px] group-hover:border-primary"
                      id={`${item.value}`}
                      value={item.value as string}
                    />
                  </Label>
                ))}
              </RadioGroup>
            </div>
          </DrawerContent>
        </Drawer>
      </Breakpoint.Mobile>
      <Breakpoint.Desktop>
        <Select onValueChange={handleChange}>
          <SelectTrigger
            className="h-[62px] w-full tracking-[-0.48px] text-[#9e9e9e] single-16-500"
            icon={<IconSelectBoxArrow className={cn(open && "rotate-180")} />}
          >
            <Trigger options={options} title={title} value={value} />
          </SelectTrigger>
          <SelectContent className="z-[202]">
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value || ""}>
                {option.text}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Breakpoint.Desktop>
    </Breakpoint>
  );
};

export default ResponsiveRadioButton;

interface TriggerProps {
  value: string;
  options: { text: string; value: string }[];
  title: string;
}
const Trigger = ({ value, options, title }: TriggerProps) => {
  return (
    <AnimatePresence>
      <div className="relative flex h-[40px] w-full items-center">
        {!value && (
          <motion.p
            className={cn("font-pretendard text-gray-500 single-16-500")}
            exit={{ opacity: 0 }}
          >
            {title}
          </motion.p>
        )}
        {value && (
          <motion.p
            animate={{
              scale: "100%",
              top: 0,
            }}
            className={cn(
              "font-pretendard absolute text-gray-600 single-12-400",
            )}
            initial={{
              scale: "110%",
              top: "4px",
              transformOrigin: "top left",
            }}
          >
            {title}
          </motion.p>
        )}
        {value && (
          <motion.p
            animate={{ opacity: 100 }}
            className={cn(
              "font-pretendard absolute bottom-0 text-gray-900 single-16-500",
            )}
            initial={{ opacity: 0 }}
          >
            {options.find((option) => option.value === value)?.text}
          </motion.p>
        )}
      </div>
    </AnimatePresence>
  );
};
