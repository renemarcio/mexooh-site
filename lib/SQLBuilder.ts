export function SELECTBuilder(
  searchParams: URLSearchParams,
  table: string,
  columns?: string[],
  conditions?: { [key: string]: (value: string) => string }
) {
  let SQL: string = `SELECT ${columns ? columns : "*"} FROM ${table}`;
  const SQLConditions: string[] = [];

  if (conditions) {
    Object.entries(conditions).forEach(([param, conditionFn]) => {
      const value = searchParams.get(param);
      if (value) {
        SQLConditions.push(conditionFn(value));
      }
    });
  }

  if (SQLConditions.length > 0) {
    SQL += " WHERE " + SQLConditions.join(" AND ");
  }

  return SQL;
}
