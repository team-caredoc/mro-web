"use client";

import React from "react";

import { useBreakpointContext } from "@/hooks/breakpoint/BreakpointProviderClient";

type BreakpointProps = {
  children: React.ReactNode;
};

/*** @example
 * 
 *   <Breakpoint>
      <Breakpoint.Mobile>
        <div className="bg-red-500 single-20-600">Mobile</div>
      </Breakpoint.Mobile>
      <Breakpoint.Desktop>
        <div className="flex">Desktop</div>
      </Breakpoint.Desktop>
    </Breakpoint>
 * 
 */
export const Mobile: React.FC<BreakpointProps> = ({ children }) => {
  const breakpoint = useBreakpointContext();

  if (breakpoint === "desktop") return null;
  if (Array.isArray(children)) {
    // children이 배열인 경우 처리
    return (
      <>
        {children.map((child, index) => {
          if (React.isValidElement<HTMLElement>(child)) {
            return React.cloneElement(child, {
              key: child.key || index,
              className: [child.props.className, "desktop:hidden"]
                .filter(Boolean)
                .join(" "),
            });
          }
          return child;
        })}
      </>
    );
  }

  // children이 단일 요소인 경우 처리
  return React.isValidElement<HTMLElement>(children)
    ? React.cloneElement(children, {
        className: [children.props.className, "desktop:hidden"]
          .filter(Boolean)
          .join(" "),
      })
    : children;
};

export const Desktop: React.FC<BreakpointProps> = ({ children }) => {
  const breakpoint = useBreakpointContext();

  if (breakpoint === "mobile") return null;

  // children이 배열인 경우 처리
  if (Array.isArray(children)) {
    return (
      <>
        {children.map((child, index) => {
          if (React.isValidElement<HTMLElement>(child)) {
            return React.cloneElement(child, {
              key: child.key || index,
              className: [child.props.className, "mobile:hidden"]
                .filter(Boolean)
                .join(" "),
            });
          }
          return child;
        })}
      </>
    );
  }

  // children이 단일 요소인 경우 처리
  return React.isValidElement<HTMLElement>(children)
    ? React.cloneElement(children, {
        className: [children.props.className, "mobile:hidden"]
          .filter(Boolean)
          .join(" "),
      })
    : children;
};

type BreakpointComponent = React.FC<BreakpointProps> & {
  Mobile: typeof Mobile;
  Desktop: typeof Desktop;
};

const BreakpointRoot: React.FC<BreakpointProps> = ({ children }) => {
  return <>{children}</>;
};

export const Breakpoint = BreakpointRoot as BreakpointComponent;
Breakpoint.Mobile = Mobile;
Breakpoint.Desktop = Desktop;
