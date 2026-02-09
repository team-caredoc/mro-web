"use client";

// Error boundaries must be Client Components
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: any;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h2 className="single-16-600">
        {error?.statusMsg || "페이지를 찾을 수 없습니다."}
      </h2>

      <Link href="/">홈 으로 가기</Link>
    </div>
  );
}
