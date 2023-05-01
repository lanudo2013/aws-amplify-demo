export const getQueryParamsStr = (urlparam) => {
  const url = new URL(urlparam);
  const params = url.searchParams;
  const list = [];
  for (const entry of params.entries()) {
    const [param, value] = entry;
    list.push(`${param}=${value}`);
  }
  return list.join("&");
};
