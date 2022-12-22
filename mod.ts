export interface D1ConfigOptions {
  accountId: string;
  apiToken: string;
  accountEmail: string;
  databaseUuid: string;
}

export interface D1Methods {
  query: Function;
}

export const computeAccountBaseUrl = (accountId: string): URL =>
  new URL(`https://api.cloudflare.com/client/v4/accounts/${accountId}/`);

export default ({
  accountId,
  apiToken,
  accountEmail,
  databaseUuid,
}: D1ConfigOptions): D1Methods => ({
  query: async (
    sql: string,
    params?: (null | number | string | ArrayBuffer)[]
  ): Promise<readonly unknown[]> =>
    fetch(
      new URL(
        `./d1/database/${databaseUuid}/query`,
        computeAccountBaseUrl(accountId)
      ),
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "X-Auth-Key": apiToken,
          "X-auth-email": accountEmail,
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
        },
        body: JSON.stringify({ sql, params }),
      }
    )
      .then((r) => r.json())
      .then((r) => (r.errors?.length > 0 ? r : r?.result)),
});
