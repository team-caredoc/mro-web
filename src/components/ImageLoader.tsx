"use client";

import Image, { getImageProps, ImageProps } from "next/image";
import { useState } from "react";

import { cn } from "@/libs/utils";

const SERVICE_PATH = "";
const ERROR_SRC = "";
interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
  blurWidth?: number;
  blurHeight?: number;
}
interface StaticRequire {
  default: StaticImageData;
}
type StaticImport = StaticRequire | StaticImageData;

// ******************* //
// *** URL 확인 필요 ***//
// ******************  //

function cloudfrontLoader({
  src,
  width,
  quality = 80,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  let optimizedSrc = src.replace(/w\d+/g, `w${width}`);
  optimizedSrc = optimizedSrc.replace(/q\d+/g, `q${quality}`);

  const url = new URL(optimizedSrc);

  return url.href;
}

function buildOptimizedImageUrl(
  src: string,
  width: `${number}` | number,
  quality: number = 80,
  format: string = "webp",
  env: "DEVELOPMENT" | "PRODUCTION" | undefined,
  servicePath: string,
): string {
  const domain =
    env === "DEVELOPMENT"
      ? "https://cache.probe.caredoc.kr"
      : "https://cache.caredoc.kr";

  let url;
  if (src.startsWith("https://image.probe.caredoc.kr")) {
    url = src.replace("https://image.probe.caredoc.kr", "");
  }
  if (src.startsWith("https://image.caredoc.kr")) {
    url = src.replace("https://image.caredoc.kr", "");
  }

  if (src.startsWith("http")) {
    url = new URL(src);
  }
  if (!src.startsWith("https://image") && !src.startsWith("/")) {
    return src;
  }
  if (url && url.host.includes("caredoc.kr")) {
    src = url.href.split(servicePath)[1];
  }

  const extensionMatch = src?.match(/\.\w+$/);
  if (!extensionMatch) {
    throw new Error("Invalid image filename format: " + src);
  }

  const extension = extensionMatch[0]; // 예: ".png"
  const baseName = src.slice(0, -extension.length); // 예: "history_1_mobile"
  const optimizedName = `${baseName}@(${`w${width}`}_q${quality}_f${format})${extension}`;

  return `${domain}/${servicePath}${decodeURIComponent(optimizedName).normalize("NFC")}`;
}

export type ImageLoaderProps = Omit<
  ImageProps,
  "src" | "width" | "height" | "alt"
> & {
  src: string | StaticImport | string[];
  width: number | `${number}` | number[];
  height: number | `${number}` | number[];
  isLoading?: boolean;
  format?: string;
  quality?: number;
  env?: "DEVELOPMENT" | "PRODUCTION";
  alt?: string;
  priority?: boolean;
  servicePath?: string;
  errorSrc?: string;
};

/*** @example
 // 반응형이 필요한 경우 [mobile,desktop] 순으로 작성

 <ImageLoader
 alt=""
 height={[1096, 326]}
 src={["/grade-consult/service-m.png", "/grade-consult/service.png"]}
 width={[640, 1144]}
 />
 */
const ImageLoader = ({
  src,
  width,
  height,
  isLoading,
  className,
  format,
  quality,
  env = process.env.NEXT_PUBLIC_ENV as "DEVELOPMENT" | "PRODUCTION" | undefined,
  alt = "alt",
  priority = false,
  servicePath = SERVICE_PATH,
  errorSrc = ERROR_SRC,
  ...props
}: ImageLoaderProps) => {
  const [hasError, setHasError] = useState(false);
  if (!servicePath && process.env.NODE_ENV === "development") {
    throw new TypeError("servicePath가 필요합니다.");
  }
  if (
    typeof src === "string" &&
    !Array.isArray(width) &&
    !Array.isArray(height)
  ) {
    const finalSrc = hasError
      ? errorSrc
      : buildOptimizedImageUrl(src, width, quality, format, env, servicePath);

    return (
      <Image
        alt={alt}
        className={cn("transition-opacity", className)}
        height={height as number | `${number}`}
        loader={hasError ? undefined : cloudfrontLoader}
        loading={priority ? undefined : "lazy"}
        priority={priority}
        src={finalSrc}
        width={width as number | `${number}`}
        onError={() => {
          if (!hasError) {
            setHasError(true);
          }
        }}
        {...props}
      />
    );
  }

  if (
    Array.isArray(src) &&
    Array.isArray(width) &&
    Array.isArray(height) &&
    src.length > 0 &&
    src.length < 3
  ) {
    const common = { ...props, loader: cloudfrontLoader };
    const {
      props: { srcSet: pcSet },
    } = getImageProps({
      ...common,
      alt,
      src: buildOptimizedImageUrl(
        src.at(-1) as string,
        width[1],
        quality,
        format,
        env,
        servicePath,
      ),
      width: width[1],
      height: height[1],
    });
    const {
      props: { srcSet: mobileSet, ...rest },
    } = getImageProps({
      ...common,
      alt,
      src: buildOptimizedImageUrl(
        src.at(0) as string,
        width[0],
        quality,
        format,
        env,
        servicePath,
      ),
      width: width[0],
      height: height[0],
    });
    return (
      <picture>
        <source media="(min-width: 1200px)" srcSet={pcSet} />
        <source srcSet={mobileSet} />
        <img {...rest} alt={alt} className={className} />
      </picture>
    );
  }
  if (Array.isArray(src) && (!Array.isArray(width) || !Array.isArray(height))) {
    throw new TypeError(
      "이미지를 반응형으로 사용하려면 width와 height props 도 같이 지정해주세요.",
    );
  }
  throw new Error("props를 확인해보세요");
};

export default ImageLoader;
