import type { DataCategory, QueryParams } from './types';

const BASE_URL = "http://localhost:8123";

export async function fetchData({ category, page, itemsPerPage, filters }: QueryParams) {
  const offset = (page - 1) * itemsPerPage;
  
  // Build WHERE clause for filters
  const whereClause = filters 
    ? Object.entries(filters)
        .map(([key, value]) => `${key} = '${value}'`)
        .join(' AND ')
    : '';

  // Get total count first
  const countQuery = `
    SELECT COUNT(*) as total
    FROM file('${category}.tsv', 'TSVWithNames')
    ${whereClause ? `WHERE ${whereClause}` : ''}
  `;

  const countResponse = await fetch(`${BASE_URL}/?add_http_cors_header=1&user=default&default_format=JSON`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain"
    },
    body: countQuery
  });

  if (!countResponse.ok) {
    throw new Error(`HTTP error! status: ${countResponse.status}`);
  }

  const countResult = await countResponse.json();
  const totalRows = countResult.data[0].total;

  // If we're filtering and got no results, throw an error
  if (whereClause && totalRows === 0) {
    throw new Error(`No results found for ${category} with filter: ${whereClause}`);
  }

  // Get the actual data
  const dataQuery = `
    SELECT *
    FROM file('${category}.tsv', 'TSVWithNames')
    ${whereClause ? `WHERE ${whereClause}` : ''}
    LIMIT ${itemsPerPage}
    OFFSET ${offset}
  `;

  const dataResponse = await fetch(`${BASE_URL}/?add_http_cors_header=1&user=default&default_format=JSON`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain"
    },
    body: dataQuery
  });

  if (!dataResponse.ok) {
    throw new Error(`HTTP error! status: ${dataResponse.status}`);
  }

  const dataResult = await dataResponse.json();

  return {
    data: dataResult.data,
    meta: dataResult.meta,
    totalRows
  };
}