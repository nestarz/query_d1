# query_d1

Query D1 outside Cloudflare Workers using Cloudflare API call

## Usage

```ts
import queryD1Database from "https://deno.land/x/query_d1/mod.ts";

const db = queryD1Database({
  accountId: Deno.env.get("CF_ACCOUNT_ID"),
  accountEmail: Deno.env.get("CF_ACCOUNT_EMAIL"),
  apiToken: Deno.env.get("CF_API_TOKEN"),
  databaseUuid: Deno.env.get("CF_DATABASE_UUID"),
});

await db.query("SELECT * FROM texts WHERE id = ?1", [1]);
```
