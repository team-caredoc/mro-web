import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

const Drawer = ({
  shouldScaleBackground = true,
  handleOnly = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    handleOnly={handleOnly}
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-[150] bg-[#000]/60", className)}
    {...props}
  />
));
DrawerOverlay.displayName = "DrawerOverlay";

const DrawerPrimitiveContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPrimitive.Content
    ref={ref}
    className={cn(
      "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[16px] bg-white",
      className,
    )}
    {...props}
  >
    <DrawerTitle hidden />
    {children}
  </DrawerPrimitive.Content>
));
DrawerPrimitiveContent.displayName = "DrawerPrimitiveContent";

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
    overlayClassName?: string;
  }
>(({ className, children, overlayClassName, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay className={cn("z-[200]", overlayClassName)} />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-[200] mx-auto mt-24 flex h-auto max-h-[90dvh] flex-col rounded-t-[16px] bg-white outline-none",
        className,
      )}
      {...props}
    >
      <DrawerTitle hidden />
      <DrawerDescription hidden />

      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({
  className,
  children,
  borderBottom = false,
  isCloseButton = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  borderBottom?: boolean;
  isCloseButton?: boolean;
}) => (
  <div className={cn("px-[16px] pt-[20px]", className)} {...props}>
    <div
      className={cn(
        "flex w-full items-center justify-between",
        borderBottom && "border-b border-b-gray-200 pb-[20px]",
      )}
    >
      <div className="w-full">{children}</div>
      {isCloseButton && (
        <DrawerClose>
          <svg
            fill="none"
            height="16"
            viewBox="0 0 16 16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_20095_67634)">
              <path
                d="M13.1429 2.85693L2.85718 13.1426"
                stroke="#333333"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path
                d="M2.85718 2.85693L13.1429 13.1426"
                stroke="#333333"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </g>
            <defs>
              <clipPath id="clip0_20095_67634">
                <rect fill="white" height="16" rx="4" width="16" />
              </clipPath>
            </defs>
          </svg>
        </DrawerClose>
      )}
    </div>
  </div>
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn("text-gray-900 single-18-700", className)}
    {...props}
  />
));
DrawerTitle.displayName = "DrawerTitle";

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DrawerDescription.displayName = "DrawerDescription";

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerPrimitiveContent,
  DrawerTitle,
  DrawerTrigger,
};
