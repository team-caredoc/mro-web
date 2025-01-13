"use client";

import Image, { getImageProps, ImageProps } from "next/image";
import React from "react";

// ******************* //
// *** URL 확인 필요 ***//
// ******************  //
const DOMAIN = "image.caredoc.kr";
const PATH = "franchise-web";

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

function cloudfrontLoader({ src, width }) {
  if (src.startsWith("http")) {
    const url = new URL(src);
    url.searchParams.set("w", width.toString());
    url.searchParams.set("f", "webp");
    return url.href;
  }
  const url = new URL(`https://${DOMAIN}/${PATH}${src}`);
  url.searchParams.set("f", "webp");
  url.searchParams.set("w", width.toString());
  return url.href;
}

/*** @example
 // 반응형이 필요한 경우 참고
 // https://nextjs.org/docs/app/api-reference/components/image#responsive-images
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
  containerClassName,
  ...props
}: Omit<ImageProps, "src" | "width" | "height"> & {
  src: string | StaticImport | string[];
  width: number | `${number}` | number[];
  height: number | `${number}` | number[];
  containerClassName?: string;
}) => {
  if (typeof src === "string") {
    return (
      <Image
        loader={cloudfrontLoader}
        src={src}
        {...props}
        height={height as number | `${number}`}
        width={width as number | `${number}`}
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
      src: src[1],
      width: width[1],
      height: height[1],
    });
    const {
      props: { srcSet: mobileSet, ...rest },
    } = getImageProps({
      ...common,
      src: src[0],
      width: width[0],
      height: height[0],
    });
    return (
      <picture className={containerClassName}>
        <source media="(min-width: 1200px)" srcSet={pcSet} />
        <source srcSet={mobileSet} />
        <img {...rest} />
      </picture>
    );
  }
  if (Array.isArray(src) && (!Array.isArray(width) || !Array.isArray(height))) {
    throw new Error(
      "이미지를 반응형으로 사용하려면 width와 height props 도 같이 지정해주세요.",
    );
  }
  throw new Error("props를 확인해보세요");
};

export default ImageLoader;
