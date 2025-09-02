import qs from "qs";

export class CustomError extends Error {
  statusCd = "";
  constructor(statusCd: string, statusMsg: string) {
    super(statusMsg); // 기본 메시지는 Error 클래스에 전달
    this.statusCd = statusCd; // 추가적인 속성을 설정
  }
}

export const fetcher = async <T>(
  pathname: string,
  options?: Omit<RequestInit, "body"> & {
    params?: Record<string, any>;
    baseURL?: string;
    body?: Record<string, any>;
  },
) => {
  const _params = options?.params ? `?${qs.stringify(options?.params)}` : "";
  const _body =
    typeof options?.body === "object"
      ? JSON.stringify(options?.body)
      : options?.body;

  // TODO 주소는 POC 별로 어떻게 처리할지 고민해봐야함
  const res = await fetch(
    options?.baseURL ||
      "https://caredoc-api.probe.caredoc.kr" + pathname + _params,
    {
      ...options,
      body: _body,
    },
  ).then((res) => res.json());

  if (res.ok) {
    if (res.statusCd !== "S000") {
      throw new CustomError(res.statusCd, res.statusMsg);
    }

    return res;
  } else {
    throw new CustomError(res.statusCd, res.statusMsg);
  }
};
