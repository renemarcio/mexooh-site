//Deprecated
export function SELECTBuilder(
  searchParams: URLSearchParams,
  table: string,
  columns?: string[],
  validParams?: { [key: string]: (value: string) => string },
  filter?: string,
  sorting?: string
) {
  let SQL: string = `SELECT ${columns ? columns : "*"} FROM ${table}`;
  SQL += "WHERE " + ConditionsBuilder(searchParams, validParams);

  if (sorting != undefined) {
    SQL += ` ORDER BY ${sorting}`;
  }
  return SQL;
}

export function ConditionsBuilder(
  searchParams: URLSearchParams,
  validParams?: { [key: string]: (value: string) => string }
) {
  const SQLConditions: string[] = [];
  if (validParams) {
    Object.entries(validParams).forEach(([param, conditionFn]) => {
      const value = searchParams.get(param);
      if (value) {
        SQLConditions.push(conditionFn(value));
      }
    });
  }
  console.log("Resulting SQLConditions: ", SQLConditions);
  if (SQLConditions.length > 0) {
    return "AND " + SQLConditions.join(" AND ");
  } else {
    return "";
  }
}
