import { ErrorMessage } from "@hookform/error-message";
import { cva, VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import { FieldErrors } from "react-hook-form";

import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "rounded-full px-[16px] relative outline-none disabled:cursor-not-allowed disabled:opacity-50 flex items-center transition-all ",
  {
    variants: {
      variant: {
        default:
          "rounded-full border border-gray-300 [&>input]:placeholder:text-gray-500 text-gray-900 border bg-gray-50 data-[error=true]:border-red",
        primary:
          "group relative flex !h-[62px] items-center justify-between overflow-hidden rounded-[10px] border border-gray-300 px-[16px] py-[12px] transition-all duration-200 focus-within:border-[#111] data-[error=true]:border-red ",
      },
      size: {
        "42": "gap-[8px] h-[42px] flex px-[16px] single-14-500 tracking-[-0.42px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "42",
    },
  },
);
export interface InputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "prefix" | "width"
    >,
    VariantProps<typeof inputVariants> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  /** react-hook-form의 errors를 주입할 때 사용합니다. name을 전달해야 합니다. */
  errors?: FieldErrors;
  /** 직접 에러 메시지를 주입할 때 사용합니다. errors보다 우선순위가 높습니다. */
  errorMessage?: string;
  /** 에러 메시지를 표시할지 여부를 결정합니다. 기본값은 true입니다. */
  showErrorMessage?: boolean;
  wrapperClassName?: string;
  label?: string;
  focusLabelText?: string;
  isResetButton?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      id,
      variant,
      size,
      prefix,
      suffix,
      errors,
      errorMessage,
      name,
      wrapperClassName,
      label,
      placeholder,
      focusLabelText,
      isResetButton,
      showErrorMessage = true,
      ...props
    },
    ref,
  ) => {
    const reactId = React.useId();
    const inputId = id || `input-${reactId}`;
    const internalRef = React.useRef<HTMLInputElement | null>(null);

    const isFieldError = name ? Boolean(errors?.[name]) : false;
    const isError = Boolean(errorMessage || isFieldError);

    const combinedRef = (node: HTMLInputElement) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
      internalRef.current = node;
    };

    const handleReset = () => {
      const input = internalRef.current;
      if (input) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value",
        )?.set;

        nativeInputValueSetter?.call(input, ""); // value를 실제로 비우고

        // onChange를 트리거할 이벤트를 생성해서 전달
        const event = new Event("input", { bubbles: true });
        input.focus();
        input.dispatchEvent(event);
      }
    };

    return (
      <div className={cn("flex flex-col gap-[6px]", wrapperClassName)}>
        <Label
          className={cn(inputVariants({ variant, size, className }))}
          data-error={isError}
          htmlFor={inputId}
        >
          {prefix && prefix}
          <div
            className={cn(
              "flex w-full flex-col-reverse justify-center gap-[6px]",
              wrapperClassName,
            )}
          >
            <input
              ref={combinedRef}
              className={cn(
                "peer h-[inherit] w-full bg-transparent outline-none disabled:bg-transparent",
                label &&
                  "opacity-0 focus:opacity-100 [&:not(:placeholder-shown)]:!opacity-100",
              )}
              id={inputId}
              name={name}
              placeholder={placeholder || " "}
              type={type}
              {...props}
            />
            {label && (
              <p
                className={cn(
                  "absolute z-[1] text-gray-500 transition-all duration-150 single-16-500",
                  "peer-focus:relative peer-focus:top-[0px] peer-focus:translate-y-0 peer-focus:text-gray-600 peer-focus:single-12-400",

                  "peer-[:not(:placeholder-shown)]:relative peer-[:not(:placeholder-shown)]:top-[0px] peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-gray-600 peer-[:not(:placeholder-shown)]:single-12-400",
                  focusLabelText &&
                    label &&
                    "[&_.focus-label-text]:hidden peer-focus:[&_.focus-label-text]:block peer-[:not(:placeholder-shown)]:[&_.focus-label-text]:block [&_.label-text]:block peer-focus:[&_.label-text]:hidden peer-[:not(:placeholder-shown)]:[&_.label-text]:hidden",
                )}
              >
                <span className="focus-label-text">{focusLabelText}</span>
                <span className="label-text">{label}</span>
              </p>
            )}
          </div>
          {suffix
            ? suffix
            : isResetButton && (
                <button
                  className={cn(
                    "mt-auto opacity-0 transition-opacity group-focus-within:opacity-100",
                  )}
                  id="reset-button"
                  type="button"
                  onClick={handleReset}
                >
                  <svg
                    fill="none"
                    height="19"
                    viewBox="0 0 18 19"
                    width="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="9" cy="9.5" fill="#E9E9E9" r="9" />
                    <path
                      d="M12 6.5L6 12.5"
                      stroke="#999999"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6 6.5L12 12.5"
                      stroke="#999999"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </button>
              )}
        </Label>
        <AnimatePresence>
          {isError && showErrorMessage && (
            <motion.div
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              initial={{ opacity: 0 }}
            >
              {errorMessage ? (
                <ErrorText errorMessage={errorMessage} />
              ) : isFieldError && name ? (
                <ErrorMessage
                  errors={errors}
                  name={name}
                  render={({ message }) =>
                    message && <ErrorText errorMessage={message} />
                  }
                />
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };

const ErrorText = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <p
      className="text-left tracking-[-0.36px] text-[#f02e2e] single-12-500"
      id="input-error-text"
    >
      {errorMessage}
    </p>
  );
};
