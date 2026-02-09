"use client";

import { IconCaredocCI } from "@/components/icons";
import ImageLoader from "@/components/ImageLoader";
import { cn } from "@/libs/utils";

function LoginForm() {
  return (
    <div
      className={cn(
        "px-[16px]",
        "desktop:grid desktop:grid-cols-[1fr_820px] desktop:px-0",
      )}
    >
      <div className="desktop:flex relative hidden min-h-screen items-center justify-center bg-orange-50">
        <IconCaredocCI className="absolute left-[40px] top-[40px] h-[24px] text-primary" />
        <ImageLoader
          alt=""
          className={cn(
            "hidden",
            "desktop:flex mx-auto mt-[80px] h-[671px] w-[873px] object-cover",
          )}
          env="PRODUCTION"
          height={671}
          src="/home.png"
          width={873}
        />
        <svg
          className="absolute right-[-40px] top-[100px]"
          fill="none"
          height="86"
          viewBox="0 0 118 86"
          width="118"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 53.5L53.1 21L118 53.5L64.9 86L0 53.5Z" fill="#FFEDE5" />
          <path
            d="M0 32.5L53.1 0L118 32.5L64.9 65L0 32.5Z"
            fill="#FFCEBA"
            opacity="0.5"
          />
        </svg>
      </div>
      <main
        className={cn(
          "mx-auto flex min-h-screen max-w-[600px] flex-col items-center justify-center gap-[20px]",
        )}
      >
        <IconCaredocCI className="h-[24px] text-primary" />
        <p className="text-center tracking-[-0.72px] text-gray-900 single-24-700">
          케어닥 MRO 시스템
        </p>
        <p className="text-center tracking-[-0.48px] text-gray-600 multi-16-400">
          케어닥 임직원 및 파트너사 전용 <br />
          MRO 시스템 입니다.
        </p>
        <ImageLoader
          alt=""
          className={cn("h-[174px] object-contain", "desktop:hidden")}
          env="PRODUCTION"
          height={600}
          src="/m-home.png"
          width={640}
        />
        <button
          className={cn(
            "ripple h-[52px] w-full rounded-[10px] bg-primary px-[16px] py-[10px] text-white single-16-500",
            "desktop:mt-[10px] desktop:w-[422px]",
          )}
        >
          <p className="text-center tracking-[-0.48px] text-[#ffffff] single-16-600">
            로그인
          </p>
        </button>
      </main>
    </div>
  );
}

export default LoginForm;
