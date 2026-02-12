export const getNextPageParam = <
  T extends { data?: { pageData?: unknown[]; totalCount?: number } },
>(
  lastPage: T,
  allPages: T[],
) => {
  const totalPage = Math.ceil(
    (lastPage?.data?.totalCount ?? 0) /
      (allPages?.[0]?.data?.pageData?.length ?? 0),
  );
  const currentPage = allPages.length;
  if (totalPage > currentPage) {
    return allPages.length + 1;
  }
  return undefined;
};
