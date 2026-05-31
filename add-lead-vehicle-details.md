# Add lead: details we capture (including vehicle interest)

This describes what staff enter when using **Add physical lead** in Asahi CRM. The “car” side is a single **Vehicle interest** text field (make / model or free-text description), not a separate vehicle inventory record.

## Where this appears in the app

- **Add physical lead** (modal): showroom, phone-in, or manual enquiry saved to **Sanity** only (no Gmail thread).
- The same core fields exist on the **lead detail** panel when editing a lead synced to CRM (`Name`, `Phone`, `Car`, `Status`, etc.).

## Fields you fill in

| Field | Required | What to enter |
| --- | --- | --- |
| **Name** | Yes | Customer or contact name. |
| **Phone** | No | Contact phone (used for WhatsApp links elsewhere in the app when present). |
| **Email** | No | Contact email. |
| **Vehicle interest** | No | Short text: e.g. make/model, trim, or “what they’re looking for”. Placeholder in UI: *Make / model*. Stored in CRM as the `car` field. |
| **Source** | No (has default) | How the enquiry arrived. Default: **Physical**. Other options: Autotrader (manual), Website (manual), Car dealer (manual), Phone enquiry, Referral. |
| **Status** | No (has default) | Pipeline stage. Default: **New**. See [Status values](#status-values) below. |
| **Follow-up date** | No | Optional next follow-up date (date picker). |
| **Handled by** | No | Staff member name handling the lead. |
| **Notes** | No | Free-text notes. Also used to build a short preview/snippet for lists. |

## Values set automatically on save

These are not separate form fields; the app sets them when you click **Save to CRM**:

| Field | How it is set |
| --- | --- |
| **date** | Today’s date (local calendar day when possible). |
| **subject** | If name is filled: `Walk-in: {name}`. Otherwise: `Walk-in / showroom lead`. |
| **snippet** | First 200 characters of **Notes** (or empty if no notes). |
| **bodyText** | Full **Notes** text (same as notes for physical leads). |

## Status values

Allowed **Status** options in the app:

- New  
- Contacted  
- Follow-up  
- Done  
- Sold  
- Lost  

## Vehicle / “car” scope (important)

- **Vehicle interest** is one **text** line in the CRM lead document (`car`).
- The CRM lead form does **not** currently collect structured vehicle inventory fields (for example stock ID, VIN, registration plate, mileage, colour, features list) unless you add those to the product and Sanity schema later.
- For structured vehicle data, you would extend the schema and UI; this document only reflects the **current** physical-lead flow.

## Related code (for maintainers)

- Form and payload: `src/components/PhysicalLeadModal.jsx`
- Persisted via: `upsertLeadToSanity` in `src/services/sanityLeadsApi.js`
- Status list: `STATUSES` in `src/constants.js`
- Default source label: `PHYSICAL_LEAD_SOURCE` (`"Physical"`) in `src/constants.js`
