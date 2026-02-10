"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useLogin } from "@/hooks/use-login";

import { Input } from "@/components/ui/input";

import { IconCaredocCI } from "@/components/icons";
import ImageLoader from "@/components/ImageLoader";
import ResponsiveRadioButton from "@/components/ResponsiveRadioButton";
import { cn } from "@/libs/utils";

const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  phoneNumber: z.string().min(1),
  type: z.enum(["케어닥", "파트너점", "직영점"]),
});
type UserSchemaType = z.infer<typeof UserSchema>;

function LoginForm() {
  const { onSubmit } = useLogin();
  const { register, handleSubmit } = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: "caredoc@caredoc.kr",
      name: "",
      phoneNumber: "",
      type: "케어닥",
    },
  });
  const handleSubmitForm = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <form
      className={cn(
        "px-[16px]",
        "desktop:grid desktop:grid-cols-[1fr_820px] desktop:px-0",
      )}
      onSubmit={handleSubmitForm}
    >
      <div className="relative hidden min-h-screen items-center justify-center bg-orange-50 desktop:flex">
        <IconCaredocCI className="absolute left-[40px] top-[40px] h-[24px] text-primary" />
        <ImageLoader height={671} src="/home.png" width={873} />
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
      <div
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
        <div className="flex w-full flex-col items-start gap-[10px]">
          <div className="flex items-center gap-[2px]">
            <svg
              fill="none"
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66675 5.83333C6.66675 6.71739 7.01794 7.56523 7.64306 8.19036C8.26818 8.81548 9.11603 9.16667 10.0001 9.16667C10.8841 9.16667 11.732 8.81548 12.3571 8.19036C12.9822 7.56523 13.3334 6.71739 13.3334 5.83333C13.3334 4.94928 12.9822 4.10143 12.3571 3.47631C11.732 2.85119 10.8841 2.5 10.0001 2.5C9.11603 2.5 8.26818 2.85119 7.64306 3.47631C7.01794 4.10143 6.66675 4.94928 6.66675 5.83333Z"
                stroke="#9E9E9E"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path
                d="M5 17.5V15.8333C5 14.9493 5.35119 14.1014 5.97631 13.4763C6.60143 12.8512 7.44928 12.5 8.33333 12.5H11.6667C12.5507 12.5 13.3986 12.8512 14.0237 13.4763C14.6488 14.1014 15 14.9493 15 15.8333V17.5"
                stroke="#9E9E9E"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
            <p className="text-center tracking-[-0.48px] text-gray-900 single-16-600">
              사용자 등록
            </p>
          </div>
          <Input
            disabled
            readOnly
            variant="primary"
            wrapperClassName="bg-gray-100 w-full text-gray-400"
            {...register("email")}
          />
          <Input
            disabled
            readOnly
            variant="primary"
            wrapperClassName="bg-gray-100 w-full text-gray-400"
            {...register("name")}
          />
          <Input
            disabled
            readOnly
            variant="primary"
            wrapperClassName="bg-gray-100 w-full text-gray-400"
            {...register("phoneNumber")}
          />

          <ResponsiveRadioButton
            options={[
              { text: "케어닥", value: "홍길동" },
              { text: "파트너점", value: "010-1234-5678" },
              { text: "직영점", value: "010-1234-56782" },
            ]}
            title="사용자 등록"
            value="홍길동"
            onChange={() => {}}
          />
        </div>
        <button
          className={cn(
            "ripple h-[52px] w-full rounded-[10px] bg-primary px-[16px] py-[10px] text-white single-16-500",
            "desktop:mt-[10px] desktop:w-[422px]",
          )}
          onClick={onSubmit}
        >
          <p className="text-center tracking-[-0.48px] text-[#ffffff] single-16-600">
            로그인
          </p>
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
