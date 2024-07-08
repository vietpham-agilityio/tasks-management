import { isEmpty } from './validators';

type QueryParam = Record<string, string | boolean | number | undefined>;

export const getQueryParams = (queryParam: QueryParam): string => {
  const removeEmptyValues = Object.fromEntries(
    Object.entries(queryParam).filter(([_, value]) => value),
  ) as { [k: string]: string };
  if (isEmpty(removeEmptyValues)) {
    return '';
  } else {
    return `?${new URLSearchParams(removeEmptyValues).toString()}`;
  }
};
