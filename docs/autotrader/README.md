# Auto Trader Connect — Developer documentation (Asahi)

Local knowledge base for integrating [Auto Trader Connect](https://developers.autotrader.co.uk/documentation) with the Asahi UK dealership stock platform.

| File | Purpose |
|------|---------|
| [README.md](./README.md) | This index, integration priorities, quick reference |
| [autotrader-connect-full-reference.md](./autotrader-connect-full-reference.md) | Full API portal content (~8k lines): auth, every API, webhooks, errors |
| [autotrader-deprecated-apis.md](./autotrader-deprecated-apis.md) | Deprecated Search1 & Leads APIs — do not use for new work |

**Official sources (always verify before production):**

- Documentation: https://developers.autotrader.co.uk/documentation  
- API reference: https://developers.autotrader.co.uk/api  
- Get access: https://www.autotrader.co.uk/partners/retailer/auto-trader-connect#get-started  
- Status: https://status.autotrader.co.uk  

**Last synced:** 2026-05-21 (scraped from live developer portal)

---

## Platform overview

Auto Trader Connect is a public API platform for UK automotive retailers and partners. It connects dealer systems with the Auto Trader marketplace and data products (valuations, metrics, stock sync, deals, search, etc.).

**Change policy (summary):**

- **Breaking changes:** minimum ~30 days notice; includes removed endpoints/properties, new mandatory params, auth model changes, status class changes (4xx ↔ 5xx).
- **Non-breaking:** new optional fields, new endpoints, new status codes within same class, message text changes — clients must tolerate without prior notice.

See [Release notes](./autotrader-connect-full-reference.md#release-notes) in the full reference for dated changes (e.g. deal notifications `DEAL` → `DEAL_CREATE` / `DEAL_UPDATE` from May 2026).

---

## Authentication

All APIs require a **Bearer access token** obtained via OAuth-style client credentials (key + secret).

### Obtain token

```http
POST https://api-sandbox.autotrader.co.uk/authenticate
Content-Type: application/x-www-form-urlencoded

key=YOUR_KEY&secret=YOUR_SECRET
```

**Production:** `https://api.autotrader.co.uk/authenticate`

**Response:**

```json
{
  "access_token": "<token>",
  "expires_at": "2024-10-01T13:06:30.625Z"
}
```

### Use token

```http
Authorization: Bearer <access_token>
```

### Environments

| Environment | Base URL |
|-------------|----------|
| Sandbox | `https://api-sandbox.autotrader.co.uk/` |
| Production | `https://api.autotrader.co.uk/` |

- Start integration in **sandbox** (separate key/secret; does not consume production quotas).
- Sandbox is not for production traffic (performance / rate limits).
- **IP reputation:** unexpected **403** responses may be IP scoring; capture **CF-RAY** from response headers for support.

Full detail: [Authentication](./autotrader-connect-full-reference.md#authentication)

---

## Production APIs (quick map)

| API | Sandbox base path | Purpose |
|-----|-------------------|---------|
| **Vehicles** | `/vehicles` | UK registration / VIN lookup; optional MOT, features, history, provenance, valuations, metrics, competitors |
| **Taxonomy** | `/taxonomy` | Vehicle types, makes, models, generations, derivatives, facets, technical data, features, prices |
| **Stock** | `/stock` | Create/update/list/read forecourt stock; advertising channels; intelligence (metrics, valuations, competitors) |
| **Images** | `/images` | Upload images to Auto Trader CDN; link `imageId` to stock |
| **Co-Driver** | (see reference) | AI image management & generated descriptions |
| **Search** | `/search` | Consumer-facing advert list/filter/sort |
| **Valuations** | `/valuations` | Current valuation data |
| **Historic valuations** | `/historic-valuations` | Past-date valuations |
| **Future valuations** | `/future-valuations` | Predicted valuations for a future date |
| **Vehicle metrics** | `/vehicle-metrics` | Retail Rating and related metrics |
| **Deals** | `/deals` | Deal lifecycle on Auto Trader platform |
| **Messages** | `/messages` | Deal messaging |
| **Part exchange** | `/part-exchange` | PX on a deal |
| **Delivery** | `/delivery` | Delivery details on a deal |
| **Calls** | `/calls` | Call details on a deal |

### Beta APIs

| API | Notes |
|-----|--------|
| **Advertisers (BETA)** | List/search advertisers and details; `capabilities` object for permitted Connect features |
| **Integrations (BETA)** | Partner integrations and capabilities |
| **Finance (BETA)** | Finance applications, quotes, proposals on deals |

### Deprecated (do not use)

- **Search1 API**, **Leads API** — see [autotrader-deprecated-apis.md](./autotrader-deprecated-apis.md)

---

## APIs most relevant to Asahi stock management

Suggested integration order for this project:

1. **Authentication** — server-side token refresh before expiry; store key/secret in backend env only.
2. **Vehicles API** — enrich stock from UK registration (make/model/derivative, MOT, specs).
3. **Taxonomy API** — build/edit stock when registration lookup is incomplete (unregistered / import).
4. **Stock API** — sync Asahi `vehicles` ↔ Auto Trader stock records (create, update, list, read).
5. **Images API** — publish photos to CDN and attach to stock.
6. **Valuations / Vehicle metrics** — pricing guidance and Retail Rating on dashboard.
7. **Notifications webhook** — inbound `STOCK_*`, `DEAL_*`, `ADVERTISER_*` events to keep DB in sync.

Optional later: Search (consumer site), Deals/Messages (if selling through Auto Trader checkout flow), Co-Driver (AI copy/images).

### Stock API capabilities (high level)

- **Create** new stock for an `advertiserId`
- **Update** existing stock (`PATCH`; **202** if no change)
- **List & filter** advertiser stock
- **Read** single item or summary
- Attach **valuations**, **metrics**, **competitors**, **highlights**, finance offers, EV charge times, etc. (see reference subsections)

Common constraints (see [Error handling](./autotrader-connect-full-reference.md#error-handling)):

- Minimum advert price (e.g. rejected if price null &lt; £75)
- Category A/B DVLA vehicles not permitted
- LCV requires `vatStatus`
- **409** duplicate stock → use returned `stockId` to update instead
- Fields **locked by external datafeed** → **400** with `locked by UVL datafeed` style message

### Vehicles API (high level)

- `GET /vehicles?registration=...&advertiserId=...` — base vehicle data
- Optional bundles: MOT, features, history, full vehicle check, valuations, metrics, competitor link
- **VIN lookup**, EV charge times, etc.
- Many valuation/metric calls need **`odometerReadingMiles`**

---

## Notifications webhook

Auto Trader pushes realtime events to your **HTTPS endpoint** via **PUT** with JSON body.

| Topic | `type` examples | `id` field |
|-------|-----------------|------------|
| Stock | `STOCK_UPDATE`, etc. | `stockId` |
| Deal | `DEAL_CREATE`, `DEAL_UPDATE` (replacing legacy `DEAL`) | `dealId` |
| Advertiser | `ADVERTISER_UPDATE` | `advertiserId` |

**Envelope:**

```json
{
  "id": "<resource-id>",
  "time": "2022-07-01T14:06:18.422Z",
  "type": "STOCK_UPDATE",
  "integrationId": "...",
  "data": { }
}
```

**Security:** header `AutoTrader-Signature` (or `autotrader-signature`) with `t=<epoch>` and `v1=<hmac>`.

- HMAC-SHA256 over: `{t}.{raw JSON body}` using secret `sk_test_...` (sandbox) or `sk_live_...` (live).
- Allow traffic from domain **autotrader.co.uk** if using firewall rules.

**Retries:** non-2xx → retry at **10s**, **30s**, **30m**. Use `time` to dedupe superseded events.

**Your responses:** **200** processed, **202** accepted but ignored, **400** bad payload, **401** bad signature, **422** unknown advertiser, optional **429** for client rate limit.

Full detail: [Notifications Webhook](./autotrader-connect-full-reference.md#notifications-webhook)

---

## HTTP status codes (summary)

| Code | Meaning |
|------|---------|
| 200/201 | Success; may include `warnings[]` on stock/vehicles |
| 202 | Stock PATCH with no changes; webhook accepted but not processed |
| 400 | Validation / locked fields / bad registration |
| 401 | Expired or invalid token |
| 403 | Wrong integration, advertiser not permitted, IP reputation |
| 404 | Resource not found |
| 409 | Duplicate stock — update existing `stockId` |
| 422 | Finance proposal cannot be processed |
| 429 | Rate limited |
| 503/504 | Outage / timeout — check status site |

---

## Asahi app integration (implemented)

**Backend** (`backend/.env`):

```env
AUTOTRADER_ENV=sandbox
AUTOTRADER_KEY=your_sandbox_key
AUTOTRADER_SECRET=your_sandbox_secret
AUTOTRADER_ADVERTISER_ID=your_advertiser_id
```

**API routes** (Firebase auth required, `vehicles:read` permission):

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/autotrader/stock?page=1&pageSize=20` | List forecourt stock |
| GET | `/api/autotrader/stock/:stockId` | Single stock record |

**Frontend routes:**

| Path | Page |
|------|------|
| `/autotrader` | List all Auto Trader cars |
| `/autotrader/:stockId` | Vehicle detail (URL updates on click) |

Sidebar nav: **Auto Trader**. Token is cached server-side; key/secret never sent to the browser.

---

## Full documentation table of contents

All sections below are in [autotrader-connect-full-reference.md](./autotrader-connect-full-reference.md):

- [Introduction](./autotrader-connect-full-reference.md#introduction)
- [Release notes](./autotrader-connect-full-reference.md#release-notes)
- [Authentication](./autotrader-connect-full-reference.md#authentication)
- [Vehicles API](./autotrader-connect-full-reference.md#vehicles-api) — base info, VIN, MOT, EV charge, features, history, vehicle check, valuations, metrics, competitors
- [Taxonomy API](./autotrader-connect-full-reference.md#taxonomy-api) — types, makes, models, generations, derivatives, facets, technical data, features, prices
- [Stock API](./autotrader-connect-full-reference.md#stock-api) — create, update, list, view, metrics, valuations, competitors, taxonomy features
- [Images API](./autotrader-connect-full-reference.md#images-api)
- [Co Driver API](./autotrader-connect-full-reference.md#co-driver-api)
- [Search API](./autotrader-connect-full-reference.md#search-api)
- [Valuations API](./autotrader-connect-full-reference.md#valuations-api)
- [Historic / Future valuations](./autotrader-connect-full-reference.md#historic-valuations-api)
- [Vehicle metrics API](./autotrader-connect-full-reference.md#vehicle-metrics-api)
- [Deals API](./autotrader-connect-full-reference.md#deals-api)
- [Messages API](./autotrader-connect-full-reference.md#messages-api)
- [Finance API (BETA)](./autotrader-connect-full-reference.md#finance-api-beta)
- [Part exchange / Delivery / Calls](./autotrader-connect-full-reference.md#part-exchange-api)
- [Integrations API (BETA)](./autotrader-connect-full-reference.md#integrations-api-beta)
- [Notifications webhook](./autotrader-connect-full-reference.md#notifications-webhook)
- [Error handling](./autotrader-connect-full-reference.md#error-handling)
- [Branding / Contact](./autotrader-connect-full-reference.md#branding-guidelinesassets)

---

## Next steps for Asahi implementation

1. Obtain sandbox **key**, **secret**, and **advertiserId** from Auto Trader Connect onboarding.
2. Add backend module `modules/autotrader/` (auth client, stock sync, webhook handler).
3. Map Asahi `vehicles` fields ↔ Stock API vehicle/advertiser payload (registration, price, mileage, status, images).
4. Expose admin UI toggle: “Publish to Auto Trader” per vehicle.
5. Register webhook URL (staging/production) and verify HMAC signatures.

When you are ready, share your sandbox credentials setup (not the secrets themselves) and we can implement the first vertical slice: **auth + registration lookup + stock create**.
