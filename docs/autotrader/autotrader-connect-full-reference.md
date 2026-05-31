---
title: Auto Trader Connect — Full API Reference (local copy)
source: https://developers.autotrader.co.uk/api
documentation_portal: https://developers.autotrader.co.uk/documentation
last_synced: 2026-05-21
note: >
  Offline copy for Asahi stock management integration planning.
  Official docs may change; verify breaking changes on the live portal.
---

# Introduction

Welcome to Autotrader Connect developer documentation, where you can find all the information needed to utilise the resources in Autotrader's public API platform

Users will be able to access the suite of APIs designed to better connect automotive systems with each other and the Autotrader marketplace, whilst also leveraging Autotrader's market leading data & insight, to create a smarter, more efficient, automotive ecosystem

### Production APIs

| [Vehicles API Used to lookup UK registered vehicles and return core vehicle data](https://developers.autotrader.co.uk/api#vehicles-api) | [Taxonomy API Used to access Autotrader vehicle taxonomy to help create new or used vehicle records](https://developers.autotrader.co.uk/api#taxonomy-api) | [Stock API Used to manage stock on retailer forecourts, manage advertising channels and retrieve intelligence](https://developers.autotrader.co.uk/api#stock-api) |
| --- | --- | --- |
| [Images API Used to store image files in Autotrader's CDN](https://developers.autotrader.co.uk/api#images-api) | [Co-Driver API Used to manage AI generated image management and vehicle descriptions](https://developers.autotrader.co.uk/api#co-driver-api) | [Search API Used to interactively list, filter and sort adverts suitable to power search in any consumer facing application](https://developers.autotrader.co.uk/api#search-api) |
| [Valuations API Used to look up Autotrader valuation data for UK registered vehicles](https://developers.autotrader.co.uk/api#valuations-api) | [Vehicle Metrics API Used to look up Autotrader vehicle metrics for UK registered vehicles, including Autotrader's Retail Rating](https://developers.autotrader.co.uk/api#vehicle-metrics-api) | [Future Valuations API Used to look up predicted valuation data for registered & unregistered vehicles for a given date in the future](https://developers.autotrader.co.uk/api#future-valuations-api) |
| [Historic Valuations API Used to look up valuation data for registered vehicles for a given date in the past](https://developers.autotrader.co.uk/api#historic-valuations-api) | [Deals API Used for managing deals on the Autotrader platform.](https://developers.autotrader.co.uk/api#deals-api) | [Messages API Used for managing messages on a deal created on the Autotrader platform](https://developers.autotrader.co.uk/api#messages-api) |
| [Part Exchange API Used for managing the part exchange as part of a deal on the Autotrader platform](https://developers.autotrader.co.uk/api#part-exchange-api) | [Delivery API Used for managing the delivery details on a deal on the Autotrader platform](https://developers.autotrader.co.uk/api#delivery-api) | [Calls API Used for managing calls details on a deal created on the Autotrader platform](https://developers.autotrader.co.uk/api#calls-api) |

### Beta APIs

The following APIs are experimental or beta and may be subject to further changes

| [Advertisers API(BETA) Used to fetch or search the list of configured advertisers and their details](https://developers.autotrader.co.uk/api#advertisers-api-(beta)) | [Integrations API (BETA) Used for managing a Partners different integrations and the capabilities that integrations has.](https://developers.autotrader.co.uk/api#integrations-api-(beta)) | [Finance API(BETA) Used for managing finance applications as part of a deal on the Autotrader platform](https://developers.autotrader.co.uk/api#finance-api-(beta)) |
| --- | --- | --- |

### Deprecated APIs

To view the deprecated services please follow this [link](https://developers.autotrader.co.uk/deprecated)

# Release Notes

Breaking Change Policy

We’re constantly looking to improve the services available to our API clients and our aspiration is to do so creating as little disruption to users. These changes will either be classed as Breaking or Non-Breaking changes.

Breaking Changes

A breaking change is defined as a change to our API platform that could require a change to your integration to avoid any disruption and will require investigation. These changes will be communicated and advised at a minimum of 30 days ahead of the change (this period between advisory and implementation can vary change by change). Breaking will include:

- Discontinuing/removing a production service
- Changing error handling and a response status code from class to another (i.e. 4XX to 5XX)
- Removing a property from a production service
- Removing an actively used, supported HTTP request methods in a production service
- Adding new mandatory request parameters in a production service
- Introducing additional validation errors
- Change in the authentication model resulting in unexpected HTTP status codes
- Change to the data type for a given property (could be considered non-breaking)

Non-breaking Changes

A non-breaking change is defined as a change to our API platform that will not result in any disruption to clients' systems. These changes will communicated as part of our normal release process after the changes have been implemented. It's important that clients have the necessary processes in place to ensure the following types of changes can be safely handled without prior notice. Non-breaking will include

- Adding new HTTP response status codes within the same class
- Updating/changing the specific HTTP response status code within the same class (i.e. 200 to 201)
- Updating the error message string in any error response
- Adding a new endpoint/service
- Adding new response headers
- Adding new properties in a production service
- Adding new HTTP request methods in a production service
- Adding new optional request parameters in a production service
- Change to content length of data returned within a given property
- Removal of redundant/unused request headers
- Removal of redundant/unused request parameters

## 28th May 2026

New values for deal type field

Below is an example Deal Notification type change

Example -- Existing Behaviour

```
{
  "id": "12345",
  "type": "DEAL",
  "dealId": "98765"
}
```

Example -- Post Release Behaviour, Deal first created

```
{
  "id": "12345",
  "type": "DEAL_CREATE",
  "dealId": "98765"
}
```

Example -- Post Release Behaviour, Deal updated

```
{
  "id": "12346",
  "type": "DEAL_UPDATE",
  "dealId": "98765"
}
```

Summary

This release changes the values for the deal notification`type` field.

Detailed Changes

1. New values for deal notification type field

Existing`type` field has a value of`DEAL` this release replaces this with two new values to differentiate between deal creation and updates.

- `DEAL_CREATE`-- when a deal is initially created.
- `DEAL_UPDATE`-- any subsequent update to a deal (including status changes or component modifications).

Related documentation

Remove deprecated deal reservation fields

Below are highlighted reservation fields being removed

```
{
  "dealId": "4ae0fc61-f92f-4fa6-9cd5-a8f31a2616c7",
  REMOVED....."consumerReservationFeeStatus":"Held"
  "consumer": {
    ...
  },
  "stock": {
    "stockId": "8a468e9585de69e40185df91b5d87ef9",
    "searchId": "202201237828809"
    REMOVED....."reservationStatus":"Reserved"
  }
  ...
}
```

Below are examples of the deal resource after the field removal.

Deal with reservation request

```
{
  "dealId": "4ae0fc61-f92f-4fa6-9cd5-a8f31a2616c7",
  ...
  "consumer": {
    ...
  },
  "stock": {
    "stockId": "8a468e9585de69e40185df91b5d87ef9",
    "searchId": "202201237828809"
  },
  "reservation": {
    "status": "Requested",
    "fee": {
      "amountGBP": null,
      "status": null
    }
  }
  ...
}
```

Deal with full reservation

```
{
  "dealId": "4ae0fc61-f92f-4fa6-9cd5-a8f31a2616c7",
  ...
  "consumer": {
    ...
  },
  "stock": {
    "stockId": "8a468e9585de69e40185df91b5d87ef9",
    "searchId": "202201237828809"
  },
  "reservation": {
    "status": "Reserved",
    "fee": {
      "amountGBP": 99,
      "status": "Held"
    }
  }
  ...
}
```

Summary

This release removes deprecated fields from Deals API and Deal Notification notified on the [16th January](https://developers.autotrader.co.uk/api#16th-january-2026)

Detailed Changes

1. Remove fields

`stock.reservationStatus` and`consumerReservationFeeStatus` will be removed from the Deals API resource and from the Deal Notification

Related documentation

## 5th March 2026

What's new

- Introduction of`amountNoVatGBP` valuations fields for`retail`,`trade`, and`partExchange` markets for Trended Valuations and in the Future Valuations API
- Introduction of`wheelbaseTypes` to`buyingSignals``preferences` in Deals API and Deals Notification
- Removal of fields from Finance API
- Update to anonymised finance application error handling in applications endpoint

Detailed notes

Introduction of`amountNoVatGBP` valuations fields for`retail`,`trade`, and`partExchange` markets for Trended Valuations and in the Future Valuations API As per the release note on the 6th of August, introducing`amountNoVatGBP` valuations to Vehicles, Stock, Valuations and Historic Valuations. This has now been extended to include the amountNoVatGBP to Trended Valuations and Future Valuations. This valuations will only be available for LCV's and will be produced alongside the`amountExVatGBP` valuations. View documentation for more details [Trended Valuations](https://developers.autotrader.co.uk/api#trended-valuations95) and [Future Valuations](https://developers.autotrader.co.uk/api#future-valuations-api)

Introduction of`wheelbaseTypes` to`buyingSignals``preferences` in Deals API and Deals Notification As per the release of buyingSignals on the 19th of November, we have extended the list of consumer preferences to include wheelbaseTypes. This preference will only be available for wheelbases as part of any Van consumer activity. [View documentation for more details](https://developers.autotrader.co.uk/api#buying-signals)

Removal of fields from Finance API As per the release note the 2nd of February, we have now removed the following fields from the Finance API,`product`,`affordability.replacingExistingLoan` and`affordability.affordabeLoan`. These have been replaced by`productType` and`applicant.replacingExistingLoan`. [View documentation for more details](https://developers.autotrader.co.uk/api#finance-api-(beta))

Update to anonymised finance application error handling in applications endpoint Previously if a finance application was anonymised due to legal reasons a 451 error would appear. We have now improved our error handling so when an application is anonymised a 200 will appear with a payload of just`applicationId` and a`status` of`Expired`. [View documentation for more details](https://developers.autotrader.co.uk/api#api-error-handling)

## 2nd February 2026

What's new

- Introduction of`financeTerms.productType` to applications endpoint
- Introduction of`productType` and`productName` to quotes endpoint
- Introduction of`productType` to proposals endpoint
- Introduction of`applicant.replacingExistingLoan` to applications endpoint
- Introduction of a new`monthlyPriceOption` finance parameter to the Search API
- Ability to mark a stock item as`NOT_PUBLISHED` for a`tradeAdvert` in Stock API

Detailed notes

Introduction of`financeTerms.productType` to applications endpoint`fianceTerms.productType` has been added to the applications endpoint to replace`financeTerms.product` As part of the introduction of the new`financeTerms.productType` field please treat`financeTerms.product` field as deprecated. [View documentation for more details](https://developers.autotrader.co.uk/api#finance-api-(beta))

Introduction of`productType` and`productName` to quotes endpoint`productType` and`productName` have been added to the quotes endpoint.`productType` will replace the current`product` field.`productName` field has been added to include the lender specific name for the product which is available to progress the quote to a proposal As part of the introduction of the new`productType` field please treat`product` field as deprecated. [View documentation for more details](https://developers.autotrader.co.uk/api#getting-quotes)

Introduction of`productType` to proposals endpoint`productType` has been added to the proposals endpoint.`productType` will replace the current`product` field. As part of the introduction of the new`productType` field please treat`product` field as deprecated. [View documentation for more details](https://developers.autotrader.co.uk/api#getting-finance-proposals)

Introduction of`applicant.replacingExistingLoan` to applications endpoint`applicant.replacingExistingLoan` has been added to the applications endpoint.`applicant.replacingExistingLoan` will replace the current`affordability.replacingExistingLoan` field. As part of the introduction of the new`applicant.replacingExistingLoan` field please treat`affordability` object as deprecated. [View documentation for more details](https://developers.autotrader.co.uk/api#api#finance-api-(beta))

Introduction of a new`monthlyPriceOption` finance parameter to the Search API Added a new monthlyPriceOption finance search parameter to the Search API. This new search parameter provides support for additional mileages, deposits, terms when searching for finance. As part of the introduction of the new monthlyPriceOption parameter please treat`financeOption` parameter as deprecated. [View documentation for more details](https://developers.autotrader.co.uk/api#finance-search)

Ability to mark a stock item as`NOT_PUBLISHED` for a`tradeAdvert` in Stock API Previously, when trying to update the stock`lifcycle` state to`SOLD` when a vehicle has a published tradeAdvert, it was not possible to unpublish the record. Support for marking`tradeAdvert` as`NOT_PUBLISHED` has now been made available. [View documentation for more details](https://developers.autotrader.co.uk/api#stock-api)

## 16th January 2026

What's new

- Introduction of`reservation` object to into Deals API and Deal Notification
- Introduction of new`summary` endpoint to into Stock API

Detailed notes

Introduction of`reservation` object to into Deals API and Deal Notification Added a reservation object to bring all reservation related information together on a deal, better represent the reservation status of a vehicle relative to a deal and support multiple state values, which include`Requested` and`Reserved`. As part of the introduction of the reservation object please treat stock.reservationStatus and consumerReservationFeeStatus fields as deprecated. [View documentation for more details](https://developers.autotrader.co.uk/api#deals-api)

Introduction of new`summary` endpoint to into Stock API Added a new /summary endpoint to the Stock API to provide a real time view of state related information for a given stock ID. [View documentation for more details](https://developers.autotrader.co.uk/api#view-a-stock-item-summary)

## 2025

### 19th November 2025

What's new

- Introduction of`buyingSignals` object into the Deals API and Deals Notifications
- Removal of deprecated fields from applicant endpoint
- Removal of deprecated fields from Quotes endpoint
- Additional contract allowance fields added to Stock Notifications
- Ability to Create a Deal via the Deals API
- Introduction of the`capabilities` object to Advertisers Notifications
- Introduction of the Integrations API

Detailed notes

Introduction of`buyingSignals` object into the Deals API and Deals Notifications Previously released to SANDBOX on the 9th of October, buyingSignals is now available in production in both the Deals API and Deals Notifications.

Removal of deprecated fields from applicant endpoint The`applicant.surname`,`applicant.monthlyRentOrMortgageGBP.amountGBP`,`applicant.monthlyChildCareGBP.amountGBP` fields have been removed and replaced by fields which were added on the 9th of October. This is part of our continuous improvement to our Finance API capabilities.

Removal of deprecated fields from Quotes endpoint The`questions` and`ineligibilityReasons` fields have been removed and replaced by fields which were added on the 9th of October. This is part of our continuous improvement to our Finance API capabilities.

Additional contract allowance fields added to Stock Notifications`eligibleContractAllowances` and`allocatedContractAllowance` fields were added to the Stock API on the 6th of August, the introduction of these fields to Stock Notifications ensure we have parity between the two services.

Ability to Create a Deal via the Deals API Previously the Deals API could only access Deals originating from Autotrader. This new capability allows for retailers to create Deals in their system which have originated outside of the Autotrader consumer journey. Following on from the Creation of Deal the retailer can manage the Deal via the Deals API.

Introduction of the`capabilities` object to Advertisers Notifications Previously released on the 9th of October to the Advertisers API, we have now introduced the`capabilities` object to the Advertisers API to create parity between the API and notifications.

Introduction of the Integrations API Integrations API provides a view of what integrations a given partner has access to. These integrations will be API, Datafeeds, or Exports. If the integration is an API, the Integrations will show all the capabilities the integration has access to. Using the API capabilities this showcases which APIs and methods a given integration can access/process.

### 9th October 2025

What's new

- Introduction of manufacturer warranty to the Taxonomy and Vehicles APIs
- Introduction of`buyingSignals` object into the Deals API (SANDBOX ONLY)
- Introduction of`vehicle.origin` field in the Stock and Search APIs
- Introduction of`capabilities` object to the Advertisers API
- Introduction of new applicant fields in the Finance API
- Introduction of`proposalRequirements` and`quotesRequirements` fields in the Quotes API

Detailed notes

Introduction of manufacturer warranty to the Taxonomy and Vehicles APIs Paintwork, Standard, Corrosion, Battery manufacturer warranty details have been added to the Taxonomy and Vehicles APIs. These warranty details will be details provided by the manufacturer when the vehicles were brand new. The warranty may be covered by a term and mileage or could be a term with unlimited mileage. Please note, some manufacturers warranties do not pass on to multiple owners which will need to be discussed with the manufacturer.

Introduction of`buyingSignals` object into the Deals API`buyingSignals` object has been added to the Deals API. These data points include`dealIntentScore`,`intent`,`localCustomer`,`advertSaved` and`preferences` are derived from a consumers behaviour on Autotrader, which indicators a buyers vehicle preferences and their intent on the deal.

Introduction of`vehicle.origin` field in the Stock and Search APIs`vehicle.origin` field has been added to the Stock and Search API to allow retailers to set a stock item as`UK` or`Non UK` which will assist with indicating if the vehicle should be classed as an imported vehicle and is not standard UK specification for a given derivative.

Introduction of`capabilities` object to the Advertisers API`capabilities` object has been added to the Advertiser API, which lists the set of`atConnect` capabilities a partners application is permitted to use on behalf of an advertiser. These advertiser capabilities permit access to selected features of Autotrader Connect APIs and are enabled by advertiser subscriptions.

Introduction of new applicant fields in the Finance API`applicant.lastName`,`applicant.monthlyChildcare.amountGBP`,`applicant.monthlyRentOrMortgage.amountGBP` have been added to the Finance API.`applicant.lastName` has been created to match the details available in the Deals API.`applicant.monthlyChildcare.amountGBP` and`applicant.monthlyRentOrMortgage.amountGBP` have been added to correct the naming structure of the fields to match the rest of the amountGBP fields. Please see the table details for the Finance API to understand the fields these are set to replace.

Introduction of`proposalRequirements` and`quotesRequirements` objects in the Quotes API` proposalRequirements` and`quotesRequirements` objects have been added to the Quotes API. These fields will include details of what an applicant needs to provide to progress the finance application. The`quotesRequirements` will list any additional details which may be required to produce finance quotes.`proposalRequirements` will list any additional details the applicant which may be required to create a finance proposal. Please note the requirements may include items which will stop the applicant continuing with the finance application via the API.

### 27th August 2025

What's new

- Removal of the`stock.availabilityStatus` in Deals API and Deal Notifications
- Introduction of`financeOffers.headlineOffer` object to the Search API

Detailed notes

Removal of the`stock.availabilityStatus` in Deals API and Deal Notifications`stock.availabilityStatus` identified the status of the deal but was not a field which could be amended as this was triggered by`reservationStatus`.`availabilityStatus` field was purely for information purposes and did not control what actions could be taken against the deal. If a Deal was Available or Not Available all actions could still be completed. Removing this field leaves the`stock.reservationStatus` which identifies if the stock item is currently Reserved. Using the`stockId`, a call to the stock endpoint will identify which deal has reserved the stock item. If a reservation is removed from a stock item all deals will be updated to remove the reservationStatus within the deal which highlights if another deal can mark the stock item as reserved.

Introduction of`financeOffers.headlineOffer` object to the Search API`financeOffers.headlineOffer` object has been added to the Search API to allow for partners to have access to a`headlineOffer` for a given stock record. Previously, the`headlineOffer ` was only available in the Stock API and only`calculatedOffer` was available in the Search API. The introduction of the new object allows for partners to review available`headlineOffers` on a stock item when not providing the finance search parameters.

### 6th August 2025

What's new

- Introduction of`amountNoVatGBP` valuations fields for retail, trade, and part exchange in the Vehicles, Stock and Valuations and Historic Valuations API
- Introduction of a parameter for`vatStatus` in Vehicle Metrics API
- `rarityRating`,`valueRating` fields have been added to the Vehicles, Taxonomy, Stock and Search APIs
- `eligibleContractAllowances` and`allocatedContractAllowance` fields have been added to the Stock API
- Ability to search by`oemModelCode` to source Volvo derivatives in the Taxonomy API

Detailed notes

Introduction of`amountNoVatGBP` valuations fields for retail, trade, and part exchange in the Vehicles, Stock and Valuations and Historic Valuations API Currently for commercial vehicles our valuations are produced exclusive of VAT. The introduction of the amountNoVatGBP valuations will allow partners to have access to valuations for any vehicles which does not require any VAT to be paid.

Introduction of a parameter for`vatStatus` in Vehicle Metrics API With the introduction of No Vat valuations for commercial vehicles, when calling the Vehicle Metrics API for Price Adjusted Days to Sell if the`No VAT``vatStatus` is included this will be used to calculate the metrics via the correct valuation data point. If the`vatStatus` is not provided it will use the exVAT valuation to calculate the metrics.

`rarityRating`,`valueRating` fields have been added to the Vehicles, Taxonomy, Stock and Search APIs rarityRating, valueRating fields added to the Autotrader Taxonomy which is available to see in the Vehicles, Taxonomy, Stock and Search AP’s, these ratings allow partners to utilise Autotraders intelligence to identify which features are rare and valuable on a vehicle prior to a vehicle being added to the Stock API.

`eligibleContractAllowances` and`allocatedContractAllowance` fields have been added to the Stock API`eligibleContractAllowances` and`allocatedContractAllowance` fields have been added to allow retailers to understand which stock allowance is the stock item is eligible for and then which one has been allocated for the published stock item. The allowances are linked to the contract the retailer currently has with Autotrader and is decided linked to what other stock items are currently published for the given retailer.

Ability to search by`oemModelCode` to source Volvo derivatives in the Taxonomy API oemModelCode parameter has been introduced to allow for searching for a specific derivative. This search allows for partners to search for Volvo derivatives using the oemModelCode when they cannot search for a vehicle via a VRM or VIN. To search for the derivative the generationId must be provided as part of the request.

### 14th July 2025

What's new

- Introduction of`factoryCodes` field in the`features` object to the Stock, Search, Vehicles and Taxonomy APIs
- Introduction of`priceIndicatorRatingBands` object to the Stock and Valuations APIs
- Removal of the`years` fields in the Finance API
- Introduction of`wheelbaseMM` to the Stock and Search APIs

Detailed notes

Introduction of`factoryCodes` field in the`features` object to the Stock, Search, Vehicles and Taxonomy APIs`factoryCodes` are unique identifiers which the manufacturer provides to assist with identifying the specific standard specification or optional equipment which is available on the vehicles.`factoryCodes` can be used to ensure that the correct specification is added as per to the manufacturer build/specification guides.

Introduction of`priceIndicatorRatingBands` object to the Stock and Valuations APIs Currently in the stock endpoint we return priceIndicatorRating for a stock item. The Valuations API also supports looking up a price indicator banding based on a supplied price, which we know clients use in order to discover these bandings. This change will introduce the priceIndicatorRatingBands which will detail the upper and lower price values for each price indicator rating, and will be returned in both the Stock & Valuations API responses. This now make it much simpler to display the price gap to the target banding for in stock vehicles, while also making it easier to view the bandings when looking up valuations via the Valuations API for vehicles not yet in stock.

Removal of the`years` fields in the Finance API Currently in the finance endpoint, bank, employer, and address details require a years and months field to be added. For employer, and address details these need to be over 3 years to proceed to quotes and proposals. As part of this change, we are removing the years fields and only using the months fields so that can reflect the total amount of months. For example, if previously the`yearsAtBank` was 3 and the`monthsAtBank` was 4, going forward this will be reflected as`monthsAtBank` as 40.

Introduction of`wheelbaseMM` to the Stock and Search APIs`wheelbaseMM` was previously available as part of the Vehicles and Taxonomy API and not available in the Stock API. This has now been added to allow for this value to be set on a stock record.

### 14th April 2025

What's new

- New`partExchange.amountExcludingVatGBP` fields added to Valuations, Stock and Vehicles APIs
- Removal of`clientId` from the Stock Notification message
- Introduction of`financeOffers.headlineOffer` to Stock Notification message
- Introduction of`changedFields` object to Stock Notification message
- Update to`standardMake` facet results when looking for`make` counts in Search API
- Removal of`advertStrapline` field from Advertisers API and Advertiser Notification message
- Introduction of`newVehicleStrapline`,`usedVehicleStrapline`, and`description` fields to Advertisers Notification message
- Toyota Urbancruiser model renamed Urban Cruiser
- Vauxhall "e" models renamed as Electric
- Tourneo Custom Kombi derivatives moved to Transit Custom model

Detailed notes

New`partExchange.amountExcludingVatGBP` fields added to Valuations, Stock and Vehicles APIs Currently if a request for valuations is processed for a van derivative, we only return trade and retail valuations. As part of this release. we've included a new`partExchange.amountExcludingVatGBP` field. Please note, this field is an addition and currently will not return any valuations for van derivatives. Valuations will be available as part of a later release.

Removal of`clientId` from the Stock Notification message We have removed clientId field from the Stock Notification message. This leaves the previously release integrationId field that was released on 26th February.

Introduction of`financeOffers.headlineOffer` to Stock Notification message As per the release note sent on the 8th of April introducing the financeOffers.headlineOffer object in the Stock API. We have now released this object into the Stock Notification message.

Introduction of`changedFields` object to Stock Notification message As part of the Stock Notification message, we've introduced a new`changedFields` object which will list the fields which have been updated as part of the stock notification. This will allow partners to see which specific fields have been amended as part of the Stock update.

Update to`standardMake` facet results when looking for`make` counts in Search API When filtering search results with the facet=standardMake with a pageSize=0 parameter with the Search API, the make descriptions are all in capitals. This does not match descriptions held with the make fields in our APIs. This change has updated the descriptions returned. For example, from AUDI to Audi.

Removal of`advertStrapline` field from Advertisers API and Advertiser Notification message We've removed the`advertStrapline` field within the Advertisers API and Advertisers Notification message. This has been by the previously released`newVehicleStrapline` and`usedVehicleStrapline` fields. Good to know: The`advertStrapline` field is remaining for the Stock and Search APIs. It will read from the relevant new or used strapline fields depending on the`ownershipCondition` of the stock item.

Introduction of`newVehicleStrapline`,`usedVehicleStrapline`, and`description` fields to Advertisers Notification message As part of the introduction of newVehicleStrapline, usedVehicleStrapline, and description to the Advertisers API on the 13th February, we've now released these fields into the Advertiser Notification message.

Toyota Urbancruiser model renamed Urban Cruiser At the request of the OEM, we have renamed Urbancruiser model to Urban Cruiser.

Vauxhall "e" models renamed as Electric At the request of the OEM, we have renamed "e" models to Electric. For example, Corsa-e will be renamed Corsa Electric.

Tourneo Custom Kombi derivatives moved to Transit Custom model After confirmation from the OEM, the Tourneo Custom derivatives with a body of Kombi, should be part of the Transit Custom model as per the vehicle badging.

### 8th April 2025

What's new

- Introduction of`financeOffers.headlineOffer` object to the Stock API
- Introduction of`financeOffers.calculatedOffer` object to the Search API

Detailed notes

Introduction of`financeOffers.headlineOffer` object to the Stock API`financeOffers.headlineOffer` has been added to the Stock API to allow for retailers to add Finance Offers to stock records with an`ownershipCondition` of`New` which will be available on Autotraders platform.

Introduction of`financeOffers.calculatedOffer` object to the Search API`financeOffers.calculatedOffer` has been added to the Search API. This new object will replace the current`finance` object. This object should be considered as deprecated. We will be removing this object at some point in the future. The date will be confirmed and communicated soon.

### 20th March 2025

What's new

- Removal of`expires` field from API authentication

Detailed notes

- Removal of`expires` field from API authentication`expires_at` was previously added to the API authentication as part of the release note on the 7th of October. The`expires` field has now been removed leaving only the`expires_at` field.

### 13th March 2025

What's new

- New`cargoVolumeVDALitres` field has been added to the Stock, Search and Taxonomy APIs.

Detailed notes

- New`cargoVolumeVDALitres` field has been added to the Stock, Search and Taxonomy APIs.`cargoVolumeVDALitres` has been added to the Stock, Search, Taxonomy. This field indicates the cargo volume for a vehicle using the VDA standard. The highlights of`Cargo Volume Large` and`Cargo Volume Very Large` are powered from the`cargoVolumeVDALitres`.

### 26th February 2025

What's new

- Co-Driver API has been released for generated vehicle descriptions
- New`highlights` object added to Stock and Search APIs
- Added new`rarityRating` and`valueRating` to the features object in the Stock and Search APIs
- `integrationId` has been added to Stock Notifications
- GWM ORA make will be renamed to GWM

Detailed notes

Co-Driver API has been released for generated vehicle descriptions As part of our release note on the 6th of December, generated Co-Driver descriptions were added to the Co-Driver API with Sandbox access only. We can now confirm the release of the new generated descriptions into production.

New`highlights` object added to Stock and Search APIs As part of our release note on the 6th of December,`highlights` were added to the Stock and Search APIs for Sandbox access only. We can now confirm the release of the`highlights` object with the production Stock and Search APIs.

Added new`rarityRating` and`valueRating` to the features object in the Stock and Search APIs The features object will now include`features.rarityRating` and`features.valueRating`. This will give the ability to link the specific features of a stock item where the`highlights.name` is either`FEATURES RARE` or`FEATURES VALUABLE`.

`integrationId` has been added to Stock Notifications`integrationId` has been added to Stock Notifications for changes processed via Autotrader Connect. This will let you understand which partner system updated the stock item. The`clientId` field should be considered as deprecated. We will be removing this field at some point in the future. The date will be confirmed and communicated soon. If you need to know which`integrationId` is yours, get in touch with partner.support@autotrader.co.uk

GWM ORA make will be renamed to GWM At the request of the OEM, we have renamed the GWM ORA make to GWM.

### 13th February 2025

What's new

- New fields added to the Advertiser API
- Added new VIN parameter to support VIN lookups in the Vehicles API
- New delivery method added for`Decide later` added to Delivery API

Detailed notes

New fields added to the Advertiser API`descriptions`,`usedVehicleStrapline`,`newVehicleStrapline` have been added to the Advertiser API. This will enable end users to differentiate between retailer details, and New or Used vehicle straplines which can be added to specific adverts on the Autotrader site. The`advertStrapline` field should be considered as deprecated, and we will be removing this field at some point in the future. The specific date will be confirmed and communicated soon.

Added new VIN parameter to support VIN lookups in the Vehicles API Vehicles API now supports a new VIN parameter that allows clients to look up vehicle details by supplying VIN. This can be used to look up a VIN for an unregistered vehicle. Please note - VIN lookup is only available for BMW and MINI at this stage.

New delivery method added for`Decide Later` added to Delivery API This change will return an additional value in the`method` field if the consumer has consciously selected the`Decide Later` option in the consumer journey.

## 2024

### 20th December 2024

What's new

- Removal of the`messages` object for failed or unfulfilled requests

Detailed Notes

- Removal of the`messages` object for failed or unfulfilled requests. Previously when requesting Autotrader APIs any failed or unfulfilled requests, return a`messages` and`warnings` within the error response, detailing the feature/features that are unsuccessfully returned.`warnings` was added to the service on the 7th of October. The change removes the object field name from`messages` and leaving the`warnings` object field name.

### 6th December 2024

Advisory

- Creation of a new Suzuki S-Cross model to separate from the Suzuki SX4 Cross.
- Creation of a new E-Transit Custom and E-Tourneo Custom models to separate from ICE Transit Custom and Tourneo Custom derivatives.

Please Note - The two model changes will be implemented after the 11th December 2024.

- Replacing the object field name for failed or unfulfilled requests from`messages` to`warnings`

Please Note - The`messages` object field name will be removed from the service on the 18th of December. This advisory was first released as part of the 7th of October release note.

What's new

- New Co-Driver API has been released to retrieve suggested image ordering and generated vehicle descriptions.
- New`highlights` object added to the Stock and Search APIs.
- Adding new fields to the`features` object in both the Stock and Search APIs.
- Added new`rarityRating` and`valueRating` to the features object in both the Stock and Search APIs.
- New`imageId` fields have been added Stock and Search API.
- New`lastUpdated` fields have been added to Deal components in Deal Notifications.

Detailed Notes

New Co-Driver API has been released to retrieve suggested image ordering and generated vehicle descriptions. Co-Driver API includes two different capabilities. Suggest image order and missing images which allows clients to retrieve optimally reordered images and identify any missing images which is assigned to stock item. Generated Co-Driver vehicle descriptions (SANDBOX ONLY) which allows client to generate a suggested vehicle description.

New`highlights` object added to the Stock and Search APIs. New highlights object has been added to the Stock and Search APIs to showcase the top 3 Vehicle Highlights which pick out the unique characteristics of the stock item. (SANDBOX ONLY)

Adding new fields to the`features` object in both the Stock and Search APIs. The features object has been extended to now include the`features.standardName` and`features.category` on both the Stock and Search API. This will enable clients to better create a standardised product page execution, similar to that on the Autotrader website.

Added new`rarityRating` and`valueRating` to the features object in both the Stock and Search APIs. The features object will now include`features.rarityRating` and`features.valueRating`, which will provide clients with the ability to link the specific features of a stock item where the highlights.name is either FEATURES RARE or FEATURES VALUABLE.

New`imageId` field have been added Stock and Search APIs.`imageId` has been added to the Stock and Search APIs when getting stock lists or search lists. This will create parity between the stock API and stock notifications.

New`lastUpdated` fields have been added to Deal components in Deal Notifications.`lastUpdated` has been added to deal notification payload to allow clients to understand which component has been updated.

### 28th November 2024

Advisory

- Creation of a new Suzuki S-Cross model to separate from the Suzuki SX4 Cross.
- Creation of a new E-Transit Custom and E-Tourneo Custom models to separate from ICE Transit Custom and Tourneo Custom derivatives.

Please Note - The two model changes will be implemented after the 11th December 2024.

- Replacing the object field name for failed or unfulfilled requests from`messages` to`warnings`

Please Note - The`messages` object field name will be removed from the service on the 18th of December. This advisory was first released as part of the 7th of October release note.

What's new

- New`vehicle.trailerAxleNumber` data point has been added to the Stock API.
- New`vehicle.trailerAxleNumber` data point has been added to the Search API.
- New`adverts.soldPrice.amountGBP` data point has been added to the Search API.
- New`adverts.buyerPostcode` data point has been added to the Search API.
- New`adverts.retailAdverts.adminFeeOverride.amountGBP` data has been added to the Search API.
- Additional data points have been added to the Stock Notifications webhooks to gain parity between the Stock API and the Stock Notifications.

Detailed notes

Creation of a new Suzuki S-Cross model to separate from the Suzuki SX4 Cross. To match the Suzuki OEM vehicle data, a new model of S-Cross will be available in Autotrader taxonomy which will impact derivatives currently available in the SX4 S-Cross SUV (2021 - ) generation.

Creation of a new E-Transit Custom and E-Tourneo Custom models to separate from ICE Transit Custom and Tourneo Custom derivatives. To match the Ford OEM vehicle data and the E-Transit model set up. New models have been created for E-Transit Custom and E-Tourneo Custom to separate the BEV variants from the ICE variants. For Tourneo Custom, this will impact derivatives currently available in the Tourneo Custom Minibus (2022 - ) generation. For Transit Custom, this will impact derivatives currently available in the Transit Custom Combi Van (2023 - ) and Transit Custom Panel Van (2022 - ) generation.

Replacing the object field name for failed or unfulfilled requests from`messages` to`warnings` Currently when requesting Autotrader APIs any failed or unfulfilled requests, have a`messages` object included in the response, detailing the feature/features that are unsuccessfully returned. This change will replace the object field name from`messages` to`warnings`. To allow Partners to migrate without interruption, the new field`warnings` will be added alongside the existing`messages` field until December 18th when the messages field is removed.

New`vehicle.trailerAxleNumber` data point has been added to the Stock API.`vehicle.trailerAxleNumber` has been added to the Stock API to allow retailers to include the number of axles for Touring Caravans.

New`vehicle.trailerAxleNumber` data point has been added to the Search API.`vehicle.trailerAxleNumber` has been added to the Search API to allow retailers to view the number of axles for Touring Caravans.

New`adverts.soldPrice.amountGBP` data point has been added to the Search API.`adverts.SoldPrice.amountGBP` has been added to the Search API to allow for parity with the Stock API.

New`adverts.buyerPostcode` data point has been added to the Search API. adverts.buyerPostcode has been added to the Search API to allow for parity with the Stock API.

New`adverts.retailAdverts.adminFeeOverride.amountGBP` data has been added to the Search API to allow for parity with the Stock API.`adverts.retailAdverts.adminFeeOverride.amountGBP` has been added to the Search API to allow for parity with Stock API.

Additional data points have been added to the Stock Notifications webhooks to gain parity between the Stock API and the Stock Notifications. Following a review, we have introduced a number of additional data points into the Stock Webhook Notifications. This will allow for parity between data being updated against the Stock Id, and the returned data in the webhook.

### 8th November 2024

Advisory

Remove the ability to publish a Car, Van, Bike, or Cycle advert when the price indicator is set to POA in the Stock API.

Creation of a new Suzuki S-Cross model to separate from the Suzuki SX4 Cross.

Creation of a new E-Transit Custom and E-Tourneo Custom models to separate from ICE Transit Custom and Tourneo Custom derivatives.

Please Note - The two model changes will be implemented after the 11th December 2024.

- Replacing the object field name for failed or unfulfilled requests from`messages` to`warnings`

Please Note - The`messages` object field name will be removed from the service on the 18th of December. This advisory was first released as part of the 7th of October release note.

What's new

- New`classificationTag` object has been added to the Stock, Search and Images API.
- New`trendedValuations` object has been added to the Stock API.
- New`consumer.type` data point has been added to the Deals API.
- New`consumuer.tradingName` data point has been added to the Deals API.
- New`consumer.vatRegistrationStatus` data has been added to the Deals API.

Detailed Notes

Remove the ability to publish a Car, Van, Bike, or Cycle advert when the price indicator is set to POA in the Stock API. Any stock item which has a vehicle type of Car, Van, Bike, or Cycle will no longer be able to advertise on Autotrader or Profile Advert destinations with a pricing indicator flag of POA. Any stock item with POA indicator marked as true will be listed as Rejected. Truck, Plant and Farm will continue to all POA price indicators.

Creation of a new Suzuki S-Cross model to separate from the Suzuki SX4 Cross. To match the Suzuki OEM vehicle data, a new model of S-Cross will be available in Autotrader taxonomy which will impact derivatives currently available in the SX4 S-Cross SUV (2021 - ) generation.

Creation of a new E-Transit Custom and E-Tourneo Custom models to separate from ICE Transit Custom and Tourneo Custom derivatives. To match the Ford OEM vehicle data and the E-Transit model set up. New models have been created for E-Transit Custom and E-Tourneo Custom to separate the BEV variants from the ICE variants. For Tourneo Custom, this will impact derivatives currently available in the Tourneo Custom Minibus (2022 - ) generation. For Transit Custom, this will impact derivatives currently available in the Transit Custom Combi Van (2023 - ) and Transit Custom Panel Van (2022 - ) generation.

Replacing the object field name for failed or unfulfilled requests from`messages` to`warnings` Currently when requesting Autotrader APIs any failed or unfulfilled requests, have a`messages` object included in the response, detailing the feature/features that are unsuccessfully returned. This change will replace the object field name from`messages` to`warnings`. To allow Partners to migrate without interruption, the new field`warnings` will be added alongside the existing`messages` field until December 18th when the messages field is removed.

New`classificationTag` object has been added to the Stock, Search and Images API. Currently the Stock, Search, Images API only returns the image Id for the stock item. This change will introduce Autotraders image classifications with all images being assigned a label and category to identify the type of image. This change will only be available for Car, Van, and Bike journeys.

New`trendedValuations` object has been added to the Stock API. Currently in the stock endpoint you can request current valuations for stock. This change will introduce a new parameter of trendedValuations=true. That will return a market available forecast retail valuation for the stock item with`plus30Days`,`plus60Days`,`plus90Days`.

New`consumer.type` data point has been added to the Deals API. Currently within the deals API, a deal cannot distinguish between a Van which is being transacted for private or business purposes. consumer.Type will be used to identify if the consumer is purchasing the van for private use or for use within Limited Company or Soletrader business.

New`consumuer.tradingName` data point has beena added to the Deals API. Currently within the deals API, a deal cannot distinguish between a Van which is being transacted for private or business purposes. If the deal is for business purposes, the name of the trading name of the business will be recorded.

New`consumer.vatRegistrationStatus` data has been added to the Deals API. Currently within the deals API, a deal cannot distinguish between a Van which is being transacted for private or business purposes. consumer.vatRegistrationStatus will be used if the Van is purchased for business purposes. This identifier will indicate the potential finance offering that can be offered to the consumer.

### 7th October 2024

Advisory

- Replacing the object field name for failed or unfulfilled requests from`messages` to`warnings`

Please Note - The`messages` object field name will be removed from the service on the 18th of December.

What's new

- New`expires_at` field added as part of the api authentication

Detailed Notes

Replacing the object field name for failed or unfulfilled requests from`messages` to`warnings` Currently when requesting Autotrader APIs any failed or unfulfilled requests, have a`messages` object included in the response, detailing the feature/features that are unsuccessfully return. This change will replace the object field name from`messages` to`warnings`. To allow Partners to migrate without interruption, the new field`warnings` will be added alongside the existing`messages` field until December 18th when the messages field is removed.

New`expires_at` field added as part of the api authentication`expires_at` has been added as part of the api authentication. The new field follows the ISO date/time standard as per all other Autotrader APIs. The`expires` field will be removed from the response in due course.

### 15th August 2024

What's new

- New`vehicle.engineNumber` field added to the Stock API
- New`retailAdverts.suppliedPrice.amountGBX` field added to the Stock API

Detailed Notes

New`vehicle.engineNumber` field added to the Stock API Engine Number has now been added to the Stock API. Engine Number was previously returned as part of the VRM lookup within the Vehicles API.

New`retailAdverts.suppliedPrice.amountGBX` field added to the Stock API`retailAdverts.suppliedPrice` can now be provided as a pound or pence value. When supplying the supplied price you are not required to provide both values. Depending on which supplied price has provided the stock API will calculate the other value. Please be aware that if`retailAdverts.suppliedPrice.amountGBX` has been supplied the`retailAdverts.suppliedPrice.amountGBP` will round the value to the nearest pound. For example, 1234567 will be £12346

### 4th June 2024

What's new

- New`vehicleMetrics.confidenceOfSale` field added to the Vehicle Metrics API
- New`vehicle.modifications` field added to the Part Exchange API
- Number of leads returned per request will be limited to a 100 in the Leads API
- Removed the functionality to update a`status` of a lead to`NEW_MESSAGE` in the Leads API

Fixes

- Competitor link now automatically includes the seller's`advertiserId`

Detailed Notes

New`vehicleMetrics.confidenceOfSale` field added to the Vehicle Metrics API Currently, it’s possible to supply location and price parameters to return adjusted vehicle metrics. This change now allows a user to additionally supply sales target data, which includes`daysInStock`&`targetDaysToSell` to retrieve Autotrader’s`confidenceOfSale` metric for each target. This indicates the probability of a vehicle selling within certain supplied sales targets.

New`vehicle.modifications` field added to the Part Exchange API Vehicle modifications, for commercial vehicles, can be now added as part of Autotrader Deal Builder journey. This change now includes a new`vehicle.modifications` property, which will expose any after market modifications for the vehicle supplied by consumers, which changes the vehicle from the base models features.

Number of leads returned per request will be limited to a 100 For streamlined data procession, the number of leads returned per request in the Leads API is limited to a 100 per page, if additional leads are required, multiple calls would need to be made.

Removed the functionality to update a`status` of a lead to`NEW_MESSAGE` We have removed the functionality to update a status to NEW_MESSAGE in the Leads API. While a new message will still have the "NEW_MESSAGE" status, it would not be possible to change it back to "NEW_MESSAGE" status from another state. Statuses could only be updated to NEW_LEAD and ACKNOWLEDGED as valid status values. Updating from either direction NEW_LEAD <> ACKNOWLEDGED would be possible. Any other entry is accounted as an incorrect value and a 400 Bad Request would be returned.

Competitor link now automatically includes the sellers`advertiserId` Currently, when retrieving a competitor url from the Stock API for a given advertisers stock, the advertiser ID is not included. Therefore, users are required to add the`advertiserId` parameter when supplying the request to search for competitors. This change will now automatically return the advertiserId as part of the url, removing the need for users to add themselves.

### 7th May 2024

Advisory

- Number of leads returned per request will be limited to a 100
- We're removing the functionality to update a status of a lead to "NEW_MESSAGE"

Detailed Notes

Number of leads returned per request will be limited to a 100 For streamlined data procession, the number of leads returned per request will be limited to a 100 per page, if additional leads are required, multiple calls would need to be made.

Status of a lead can no longer be changed to "NEW_MESSAGE" We’re removing the functionality to update a status to NEW_MESSAGE. While a new message will still have the "NEW_MESSAGE" status, it would not be possible to change it back to "NEW_MESSAGE" status from another state. Statuses could only be updated to NEW_LEAD and ACKNOWLEDGED as valid status values. Updating from either direction NEW_LEAD <> ACKNOWLEDGED would be possible. Any other entry would be accounted as an incorrect value and a 400 Bad Request would be returned.

These changes will be released on 4th June 2024.

### 1st May 2024

What's New

- Update to values returned in adverts.reservationStatus property via Stock API
- Update to values returned in stock.reservationStatus property via Deals API
- Additional validation checks on metadata.lifecycleState updates

Detailed Notes

Update to reservationStatus values

Currently, the reservationStatus, in both the Stock or Deals APIs, returns multiple values, Reserved By Autotrader, Reserved By Advertiser and null. After this change, reservationStatus will return one of 2 values - Reserved or null. The presence of the reservationDealId will indicate whether there is a related Autotrader Deal that a retailer will be actively managing.

Additional validation checks on metadata.lifecycleState updates

Currently, where a stock record is marked as reserved (via the reservationStatus), it may due to a deal holding the reservation, which is represented by the presence of a reservationDealId and lifecycleState is updated to SALE_IN_PROGRESS. Today, while it's still possible to directly update the lifecycleState to SOLD or DELETED, after this change, partners will be prohibited from updating the lifecycleState once the reservationDealId is present. The lifecycleState will automatically be updated to SOLD when a retailer completes the deal or back to FORECOURT when it is cancelled, both these actions will set the reservationStatus and reservationDealId to null. Updating to DELETED is only permitted once the vehicle is no longer advertised and no deals are linked to a vehicle.

### 27th March 2024

Advisory

- Update to values returned in adverts.reservationStatus property via Stock API
- Update to values returned in stock.reservationStatus property via Deals API
- Additional validation checks on metadata.lifecycleState updates

These changes will be released on the 1st May 2024.

Detailed Notes

Update to reservationStatus values

Currently, the reservationStatus, in both the Stock or Deals APIs, returns multiple values, Reserved By Autotrader, Reserved By Advertiser and null. After this change, reservationStatus will return one of 2 values - Reserved or null. The presence of the reservationDealId will indicate whether there is a related Autotrader Deal that a retailer will be actively managing.

Additional validation checks on metadata.lifecycleState updates

Currently, where a stock record is marked as reserved (via the reservationStatus), it may due to a deal holding the reservation, which is represented by the presence of a reservationDealId and lifecycleState is updated to SALE_IN_PROGRESS. Today, while it's still possible to directly update the lifecycleState to SOLD or DELETED, after this change, partners will be prohibited from updating the lifecycleState once the reservationDealId is present. The lifecycleState will automatically be updated to SOLD when a retailer completes the deal or back to FORECOURT when it is cancelled, both these actions will set the reservationStatus and reservationDealId to null. Updating to DELETED is only permitted once the vehicle is no longer advertised and no deals are linked to a vehicle.

### 13th March 2024

What's new

- New advert.reservationDealId field added to the Stock API
- New stock.reservationStatus field added to the Deals API
- New stock.availabilityStatus field added to the Deals API

Detailed Notes

New advert.reservationDealId field added to the Stock API For a stock item that is Reserved, reservationDealId will indicate the dealId that the reservation is linked to.

New stock.reservationStatus field added to the Deals API reservationStatus will show if the stock item is reserved or not. In case it is not yet reserved, value returned will be null.

New stock.availabilityStatus field added to the Deals API When the availability status for the deal is “available”, the deal will be available to be modified, such as add part ex or finance to the deal, etc. When status is “Not Available” the only things available to be modified would be the deal status and sending messages.

### 15th January 2024

What's new

Support for more flexible image resizing

- Currently, when using a resize URL with only one dimension specified, the CDN redirects to the nearest 4:3 aspect ratio with both dimensions specified, resulting in padding. From 15/2/2024, to support use-cases where padding is undesirable, the CDN will redirect for width-only requests without additional padding. Requesting w800 for a tall image, the result will be a narrower image. Additionally, the current redirection for non-existent image IDs to a not-found placeholder image, will be disabled for width-only requests. Instead, users will receive a 404 not found code that the client can decide how they'd like to handle.

# Authentication

## Instructions

```
$ curl -X POST -d 'key=YOUR_KEY&secret=YOUR_SECRET' "https://api.autotrader.co.uk/authenticate" -H "Content-Type: application/x-www-form-urlencoded"

```

The above command returns the following JSON:

```
{
  "access_token": "OTRjMGVjN2ZhMGZlODk5ODJkNDMxOWZjMWRhMDUxZGQ=:4VmMk1x1VTPyNNbzXxHolJAGXnYI30ulXnHMBypklHbslFF2VmA9gqdOhUqxEzXT",
  "expires_at": "2024-10-01T13:06:30.625Z"
}
```

For further information on how to qualify for access to our API suites please [click here](https://www.autotrader.co.uk/partners/retailer/auto-trader-connect#get-started) and fill out our contact form.

All APIs require users to identify themselves by following the steps below:

- You should https POST to...

Sandbox environment:

`https://api-sandbox.autotrader.co.uk/authenticate`

Production environment:

`https://api.autotrader.co.uk/authenticate`

...with a`"x-www-form-urlencoded"` key/secret pair (this will be supplied to you)

- This will generate an access token with an expiration timestamp using the ISO date/time standard as a JSON payload.
- All requests to our APIs will require an Authorization header with the access token in the form:`Authorization: Bearer `

## Environments

Sandbox environment:

```
https://api-sandbox.autotrader.co.uk/

```

Production environment:

```
https://api.autotrader.co.uk/

```

- Initially you will be given a key and secret for our test environment so that you can integrate the API without impacting any API call quotas you might have.
- Once you are happy with the set up, you can then use the credentials for our production environment.
- It is important that you do this as our test environments are not designed to be used in production - you might experience poor performance or rate limiting.

## IP reputation validation

Connecting services and IP addresses through our platform are monitored for dynamic reputation scoring and access. If you should find your application receiving an unexpected volume of rejected connection errors (403s), we ask you to catch the CF-RAY ID contained in the response headers from associated APIs.

# Vehicles API

## Introduction

Sandbox environment:

```
https://api-sandbox.autotrader.co.uk/vehicles

```

Production environment:

```
https://api.autotrader.co.uk/vehicles

```

Used to look up UK registered vehicles and returns core vehicle data.

This resource also allows additional data to be requested by including a series of additional parameters. These can be added individually or concurrently.

Supported additional data include: -

- MOT test history
- Standard & optional equipment (features)
- History
- Full vehicle check (provenance)
- Autotrader valuations
- Autotrader vehicle metrics
- Autotrader suggested marketplace competitors

## Vehicle Base Information

```
GET /vehicles?registration=YOURREG&advertiserId=123456

```

A successful response looks like this:

```
{
  "vehicle": {
    "ownershipCondition": "Used",
    "registration": "WT17TZH",
    "vin": "WMWWG320203E14481",
    "make": "MINI",
    "model": "Convertible",
    "generation": "Convertible (2015 - 2018)",
    "derivative": "1.5 Cooper Convertible 2dr Petrol Manual (s/s) (136 ps)",
    "derivativeId": "5b746c3a24974b8fa1048b0141356a34",
    "vehicleType": "Car",
    "trim": "Cooper",
    "bodyType": "Convertible",
    "fuelType": "Petrol",
    "cabType": null,
    "transmissionType": "Manual",
    "wheelbaseType": "STD",
    "roofHeightType": null,
    "drivetrain": "Front Wheel Drive",
    "seats": 4,
    "doors": 2,
    "cylinders": 3,
    "valves": 12,
    "engineTorqueNM": 220,
    "co2EmissionGPKM": 118,
    "topSpeedMPH": 129,
    "zeroToSixtyMPHSeconds": null,
    "zeroToOneHundredKMPHSeconds": 8.4,
    "badgeEngineSizeLitres": 1.5,
    "engineCapacityCC": 1499,
    "enginePowerBHP": 134,
    "fuelCapacityLitres": 40.0,
    "emissionClass": "Euro 6",
    "owners": 1,
    "fuelEconomyNEDCExtraUrbanMPG": 65.7,
    "fuelEconomyNEDCUrbanMPG": 47.9,
    "fuelEconomyNEDCCombinedMPG": 57.6,
    "fuelEconomyWLTPLowMPG": null,
    "fuelEconomyWLTPMediumMPG": null,
    "fuelEconomyWLTPHighMPG": null,
    "fuelEconomyWLTPExtraHighMPG": null,
    "fuelEconomyWLTPCombinedMPG": null,
    "bootSpaceSeatsUpLitres": 215.0,
    "insuranceGroup": "22",
    "insuranceSecurityCode": "E",
    "firstRegistrationDate": "2017-07-19",
    "colour": "Black",
    "style": null,
    "subStyle": null,
    "lengthMM": 3821,
    "heightMM": 1415,
    "widthMM": 1727,
    "payloadLengthMM": null,
    "payloadWidthMM": null,
    "payloadHeightMM": null,
    "payloadWeightKG": 460,
    "minimumKerbWeightKG": 1205,
    "grossVehicleWeightKG": 1670,
    "engineNumber": "37495029",
    "fuelDelivery": "Turbo Common Rail",
    "gears": 6,
    "startStop": true,
    "enginePowerPS": 136,
    "engineTorqueLBFT": 162.24,
    "bootSpaceSeatsDownLitres": null,
    "batteryRangeMiles": null,
    "batteryCapacityKWH": null,
    "batteryUsableCapacityKWH": null,
    "wheelbaseMM": 2495,
    "grossCombinedWeightKG": null,
    "grossTrainWeightKG": null,
    "boreMM": 82,
    "strokeMM": 95,
    "cylinderArrangement": "Inline",
    "engineMake": "MINI",
    "valveGear": "Double Overhead Camshaft",
    "axles": 2,
    "countryOfOrigin": "United Kingdom",
    "driveType": "4X2",
    "payloadVolumeCubicMetres": null,
    "rde2Compliant": false,
    "vehicleExciseDutyWithoutSupplementGBP": 180,
    "sector": "Supermini Conv",
    "oem": {
      "make": "MINI",
      "model": "Convertible",
      "derivative": "Cooper Convertible",
      "bodyType": "Convertible",
      "transmissionType": "Manual",
      "drivetrain": "Front Wheel Drive",
      "wheelbaseType": null,
      "roofHeightType": null,
      "engineType": null,
      "engineTechnology": null,
      "engineMarketing": null,
      "editionDescription": null,
      "colour": "Midnight Black"
    },
    "manufacturerWarrantyCorrosionDurationYears": 12,
    "manufacturerWarrantyPaintworkDurationYears": 3,
    "manufacturerWarrantyStandardDurationYears": 3,
    "manufacturerWarrantyStandardDistanceMiles": 60000,
    "manufacturerWarrantyBatteryDurationYears": null,
    "manufacturerWarrantyBatteryDistanceMiles": null
  }
}
```

To identify a given vehicle and return the core data, a valid registration number for the vehicle must be provided.

The table below describes each field.

| Vehicle Section | Example | Notes |
| --- | --- | --- |
| ownershipCondition | Used | This field is not directly editable. The default ownership condition of stock is Used, to set New the vehicle.odometerReadingMiles must be supplied with a value from 0 to 100, the vehicle.dateOfRegistration and, the vehicle.plate must be null |
| registration | YO12XXX | Also know as VRM or Vehicle Registration Mark, this is the DVLA registered number plate for the vehicle |
| vin | WAUZXXXXXXXXX12345 | Vehicle Identification Number used to identify a specific vehicle |
| make | Audi | The OEM name, this is a mandatory field |
| model | A3 | The OEM model name, this is a mandatory field for Car, Bike, Van and Truck |
| generation | Saloon (2020 - ) | The body type and year range of this models marque |
| derivative | 2.0 TDI 35 Sport Saloon 4dr Diesel S Tronic Euro 6 (s/s) (150 ps) | Details of vehicle derivative |
| derivativeId | c8be64b89ccb445391c1c3c6d5e57fe5 | Unique ID linked to the Autotrader derivative. derivativeId is essential when accessing Autotrader valuation data, vehicle metrics and exposing vehicle specification on the Autotrader product page when advertising. |
| vehicleType | Car | Valid values can be found using the /taxonomy/vehicleTypes resource. "vehicleType": "Crossover" indicates that Autotrader class this vehicle as being able to be advertised across both Car and Van channels. |
| trim | Black Edition | See /taxonomy/trims ** |
| bodyType | Saloon | See /taxonomy/bodyTypes ** |
| fuelType | Diesel | See /taxonomy/fuelTypes ** |
| cabType | Used for Van or Truck, see /taxonomy/cabTypes resource |
| transmissionType | Automatic | See /taxonomy/bodyTypes ** |
| wheelbaseType | LWB | Used for Van and Truck, see /taxonomy/wheelbaseTypes ** |
| roofHeightType | High Roof | Standardised values for Van Roof Heights |
| drivetrain | Four Wheel Drive | See /taxonomy/drivetrains ** |
| seats | 5 | Number of passenger seats |
| doors | 3 | Number of doors |
| valves | 3 | Total number of valves |
| engineTorqueNM | 3 | Engine torque in Newton Metres |
| co2EmissionGPKM | 102 | CO2 emissions in Grams per Kilometer |
| topSpeedMPH | 125 | Vehicles top speed in Miles per Hour |
| zeroToSixtyMPHSeconds | 8.7 | Time taken from 0 to 60 MPH in seconds |
| zeroToOneHundredKMPHSeconds | 8.9 | Time taken from 0 to 100 KPH in seconds |
| badgeEngineSizeLitres | 2.0 | The badge engine size which may not be the same as numerically rounded CC value e.g. 1449 is quoted as 1.5 |
| engineCapacityCC | 1998 | Engine size in CC |
| enginePowerBHP | 129 | Engine power in Brake Horse Power |
| fuelCapacityLitres | 58 | Fuel capacity in Litres |
| emissionClass | EU5 | The EU emission classification (EU1 to EU7) |
| owners | 6 | The number of owners the vehicle has had |
| fuelEconomyNEDCExtraUrbanMPG | 28.9 | Fuel consumption for Extra Urban scenario tested using the New European Driving Cycle (NEDC) method in Miles per Gallon |
| fuelEconomyNEDCUrbanMPG | 31.2 | As above but for Urban |
| fuelEconomyNEDCCombinedMPG | 30.9 | As above but for Combined (this is the most often quote NEDC value |
| fuelEconomyWLTPLowMPG | 41.2 | Fuel consumption for Low scenario tested using the new Worldwide Harmonised Light Vehicle (WLTP) in Miles per Gallon |
| fuelEconomyWLTPMediumMPG | 40.2 | As above but for Medium |
| fuelEconomyWLTPHighMPG | 39.4 | As above but for High |
| fuelEconomyWLTPExtraHighMPG | 35.9 | As above but for Extra High |
| fuelEconomyWLTPCombinedMPG | 39.9 | As above but for Combined |
| bootSpaceSeatsUpLitres | 360 | Size of the boot luggage compartment when the rear seats are in normal position in Litres |
| bootSpaceSeatsDownLitres | 720 | Size of the boot luggage compartment when the rear seats are in lowered position in Litres |
| insuranceGroup | 26 | 1-50 rating system indicating the cost to insure |
| insuranceSecurityCode | P | Additional classification used by Insurers, values are A, D, E, U, P or G |
| firstRegistrationDate | 2019-07-10 | Date when the vehicle was first registered with the DVLA in the UK |
| colour | Black | Generic Paint Colour of the vehicle |
| style | Used for Truck, Plant, Farm, Caravan vehicle types, describes the top level type, see [taxonomy facets](https://developers.autotrader.co.uk/api#taxonomy-facets)/taxonomy/styles |
| subStyle | For stock with a style this described the most granular level of grouping, see [taxonomy facets](https://developers.autotrader.co.uk/api#taxonomy-facets)/taxonomy/subStyles |
| lengthMM | 4495 | Vehicle length in Millimetres |
| heightMM | 1425 | Vehicle height in Millimetres |
| widthMM | 1984 | Vehicle width in Millimetres |
| payloadLengthMM | 827 | Used for Van or Truck, maximum length of payload in Millimetres |
| payloadHeightMM | 725 | Used for Van or Truck, maximum height of payload in Millimetres |
| payloadWidthMM | 925 | Used for Van or Truck, maximum width of payload in Millimetres |
| payloadWeightKG | 520 | Used for Van or Truck, maximum weight of payload in Kilograms |
| payloadVolumeCubicMetres | 5.2 | Used for Van or Truck, volume of payload in Cubic Metres |
| minimumKerbWeightKG | 1225 | Total weight of the vehicle with water, gas, fluids and oil included, but excluding fuel in Kilograms |
| grossVehicleWeightKG | 3275 | Maximum weight of the loaded vehicle Kilograms |
| grossCombinedWeightKG | Maximum weight of the loaded vehicle and trailer in Kilograms |
| grossTrainWeightKG | maximum weight of the loaded trailer including the maximum load in Kilograms |
| cylinders | 4 | Number of engine cylinders |
| engineNumber | 56985028 | ID number of engine |
| fuelDelivery | Turbo Common Rail | Method of fuel delivery to engine |
| startStop | true | If the vehicle can engine start/stop capability |
| enginePowerPS | 130 | Engine power in Pferdstarke |
| engineTorqueLBFT | 294.99 | Engine torque in Foot Pounds |
| gears | 7 | Number of forward gears |
| batteryRangeMiles | 160 | Range at full change |
| batteryCapacityKWH | 160 | Quoted total battery power in Kilowatt Hours |
| batteryUsableCapacityKWH | 160 | Real world total battery power in Kilowatt Hours |
| wheelbaseMM | 2780 | Length of wheelbase |
| boreMM | 101 | Diameter of cylinder bore in Millimetres |
| strokeMM | 50 | Distance of the piston stroke in Millimetres |
| cylinderArrangement | Inline | Description of cylinder arrangement |
| engineMake | BMW | OEM of the engine |
| valveGear | Double Overhead Camshaft | Description of the valve mechanism |
| axles | 2 | Number of axles |
| countryOfOrigin | Germany | Country where the vehicle was manufactured |
| driveType | 4X2 | Number of wheels X number of powered wheels |
| rde2Compliant | false | Whether this vehicle is RDE2 compliant |
| vehicleExciseDutyWithoutSupplementGBP | 180 | The Vehicle Excise Duty for the vehicle. This excludes any additional supplement due if the initial vehicle cost is above 40k. |
| sector | MPV Small MPV | The description of group or type of vehicle |
| oem | The oem group of fields when populated show the same field as described about but in OEM specific terminology e.g. bodyType might return 'Estate' but oem.bodyType might be 'Shooting Brake' |

## VIN Lookup

```
GET /vehicles?vin=xxx&advertiserId=123456

```

In order to identify a given vehicle and return the core data, a valid vehicle identification number (VIN) for the vehicle must be provided.

VIN lookup can be used to identify a registered or an unregistered vehicle.

VIN lookup can be used with the following optional parameters:

- valuations
- motTests
- fullVehicleCheck
- vehicleMetrics
- features
- chargeTimes

## MOT Test Data

```
GET /vehicles?registration=YOURREG&motTests=true&advertiserId=123456

```

A successful response looks like this:

```
{
  "vehicle": {
    ...
  },
  "motTests": [
    {
      "completedDate": "2018-07-23T10:19:33Z",
      "expiryDate": "2019-08-21",
      "testResult": "Passed",
      "odometerValue": 70642,
      "odometerUnit": "Miles",
      "motTestNumber": "1234567890",
      "rfrAndComments": [
        {
          "type": "Advisory",
          "text": "Offside Front Inner Tyre worn close to legal limit/worn on edge (5.2.3 (e))",
          "dangerous": false
        }
      ]
    },
    {
      "completedDate": "2017-08-11T14:04:28Z",
      "expiryDate": "2018-08-21",
      "testResult": "Passed",
      "odometerValue": 59101,
      "odometerUnit": "Miles",
      "motTestNumber": "803160337856",
      "rfrAndComments": [
        
      ]
    }
  ]
}
```

In order to retrieve MOT test information for the specified vehicle, the request parameter motTests=true can also be included this will expose a list of MOT data associated to the vehicle.

| Property | Description |
| --- | --- |
| completedDate | The date of VOSA / MOT review |
| expiryDate | If passed the date of expiry of the certificate |
| testResult | Status of assessment (Passed / Failed) |
| odometerValue | Odometer reading of the vehicle at examination |
| odometerUnit | Unit for odometer reading |
| motTestNumber | Test number of the assessment centre completing the vehicle test |
| rfrAndComments | A listing of noted items found during examination these will either be Fail, Advisory or User Entered descriptions |

## Electric Vehicle Charge Times

```
GET /vehicles?registration=YOURREG&chargeTimes=true&advertiserId=123456

```

A successful response looks like this:

```
{
  "vehicle": {
    ...
  },
  "chargeTimes": [
    {
      "chargerType": "Fast Charge",
      "chargerDescription": "22 kW",
      "chargerSupplyType": "AC Three Phase",
      "connectorType": "Type 2",
      "startBatteryPercentage": 0,
      "endBatteryPercentage": 100,
      "durationMinutes": 210
    },
    {
      ...
    }
  ]
}
```

In order to retrieve charge times information for the specified vehicle add the request parameter chargeTimes=true

| Property | Description |
| --- | --- |
| chargerType | The classification of charger e.g. Home or Ultra |
| chargerDescription | Power rating of charger |
| chargerSupplyType | The connection type to mains grid of charger |
| connectorType | The connector type between charger and vehicle |
| startBatteryPercentage | Start charge percentage of battery |
| endBatteryPercentage | End charge percentage of battery |
| durationMinutes | Duration of the charge in minutes |

## Features

```
GET /vehicles?registration=YOURREG&features=true&advertiserId=123456

```

A successful response looks like this:

```
{
  "vehicle": {
    ...
  },
  "features": [
    {
      "name": "12V Power Socket - Passenger Footwell",
      "genericName": "12V Socket - Front",
      "type": "Standard",
      "category": "Audio and Communications",
      "basicPrice": 0.0,
      "vatPrice": 0.0,
      "factoryCodes": [
        
      ],
      "rarityRating": null,
      "valueRating": null,
      "factoryFitted": null
    },
    {
      "name": "17in Alloy Wheels - Light Star Spoke - 379",
      "genericName": "Wheels - 17in Alloys",
      "type": "Optional",
      "category": "Exterior",
      "basicPrice": 0.0,
      "vatPrice": 0.0,
      "factoryCodes": [
        "415"
      ],
      "rarityRating": "Rare",
      "valueRating": null,
      "factoryFitted": true
    },
    {
      "name": "Adaptive LED Headlights with High-Beam Assistant",
      "genericName": "Headlights - Adaptive Forward",
      "type": "Optional",
      "category": "Illumination",
      "basicPrice": 991.67,
      "vatPrice": 198.33,
      "factoryCodes": [
        "3AC"
      ],
      "rarityRating": null,
      "valueRating": "High Value",
      "factoryFitted": false
    },
    {
      "name": "Bursting Blue",
      "genericName": "Blue",
      "type": "Optional",
      "category": "Paint",
      "basicPrice": 708.33,
      "vatPrice": 141.67,
      "factoryCodes": [
        "123"
      ],
      "rarityRating": null,
      "valueRating": null,
      "genericFinish": "Special Metallic",
      "finish": "Premium Metallic",
      "factoryFitted": false
    }
  ]
}
```

Standard and optional equipment (features) can be requested using the request parameter features=true

| Property | Description |
| --- | --- |
| name | Consumer facing name of the feature |
| genericName | Consistent standardised name removing OEM specifics |
| type | Standard or Optional |
| category | Name grouping features for ease of organisation when displaying |
| finish | Paint finish specified by the OEM |
| genericFinish | Paint finish by broadly accepted industry standards |
| basicPrice | If the feature was Optional its Net price |
| vatPrice | If the feature was Optional its Vat price |
| factoryFitted | If the feature was Optional, indicates if whether it was fitted or not. Only certain OEM's have this data available, if not then a value of 'null' will be returned. |
| factoryCodes | Unique OEM codes used to identify the specific item of standard specification or optional equipment |
| rarityRating | Identifier to show how rare the feature is compared to similar vehicles. Values will be Rare, Very Rare or null. |
| valueRating | Identifier to understand the value impact the feature has on the vehicle. Values will be High Value or null. |

| Category | Description |
| --- | --- |
| Audio and Communications | Audio, communication and other features available on the centre console |
| Drivers Assistance | Sensors and technology within the vehicle designed to assist the driver |
| Exterior | External features e.g Alloy Wheels |
| Illumination | Lighting features both on the interior and exterior of the vehicle |
| Interior | Internal features e.g Front Accessory Socket |
| Paint | Exterior vehicle paint |
| Performance | Features that relate to the performance of the vehicle |
| Safety and Security | Features related to safety and security functions |
| Upholstery | Upholstery colour and design |
| Other | Features not allocated to any other group |

## History

```
GET /vehicles?registration=YOURREG&history=true&advertiserId=123456

```

A successful response looks like this:

```
{
  "vehicle": {
    ...
  },
  "history": {
    "scrapped": false,
    "stolen": false,
    "imported": false,
    "exported": false,
    "previousOwners": 3,
    "yearOfManufacture": 2012,
    "keeperChanges": [
      {
        "dateOfLastKeeper": "2016-08-30"
      },
      {
        "dateOfLastKeeper": "2013-11-02"
      },
      {
        "dateOfLastKeeper": "2012-07-25"
      }
    ],
    "v5cs": [
      {
        "issuedDate": "2017-04-13"
      }
    ]
  }
}
```

Vehicle history can be requested with parameter history=true

| Property | Description |
| --- | --- |
| scrapped | Has the vehicle been recorded as scrapped with the DVLA |
| stolen | Has the vehicle been recorded as stolen |
| imported | Has the vehicle been imported |
| exported | Has the vehicle been exported |
| previousOwners | Number of previous owners |
| keeperChanged | List of keeper change dates |
| v5cs | List of v5 issue dates |

## Full Vehicle Check

```
GET /vehicles?registration=YOURREG&fullVehicleCheck=true&advertiserId=123456

```

A successful response looks like this:

```
{
  "vehicle": {
    ...
  },
  "check": {
    "insuranceWriteoffCategory": "S",
    "scrapped": false,
    "stolen": false,
    "imported": false,
    "exported": false,
    "previousOwners": 0,
    "keeperChanges": [
      
    ],
    "v5cs": [
      {
        "issuedDate": "2017-04-13"
      }
    ],
    "highRisk": true,
    "privateFinance": true,
    "tradeFinance": false,
    "mileageDiscrepancy": false,
    "registrationChanged": false,
    "colourChanged": false,
    "dvlaVehicle": {
      "make": "BMW",
      "model": "420D GRAN COUPE M SPORT A",
      "bodyType": "COUPE",
      "fuelType": "DIESEL",
      "transmissionType": null,
      "engineCapacityCC": 1995,
      "colour": "GREY",
      "co2EmissionsGKM": 114,
      "dateScrapped": null,
      "dateExported": null
    },
    "policeStolenMarker": {
      "recordedDate": null,
      "policeForce": null,
      "telephoneNumber": null
    },
    "financeAgreements": [
      {
        "agreementId": "1234ABC",
        "company": "ABS123/0001",
        "telephoneNumber": "UNKNOWN",
        "startDate": "2017-04-13",
        "term": 36,
        "type": "CONTRACT HIRE"
      }
    ],
    "plateChanges": [
      
    ],
    "colourChanges": [
      {
        "startDate": "2009-08-25",
        "previousColour": null
      }
    ],
    "odometerReadings": [
      {
        "performed": "2019-01-18",
        "source": "RMI MIL'GE",
        "odometerReadingMiles": 16615
      }
    ],
    "highRiskMarkers": [
      {
        "startDate": "2019-02-18",
        "type": "OTHER",
        "extraInfo": "",
        "company": "",
        "telephoneNumber": "01234 567890",
        "reference": ""
      }
    ],
    "previousSearches": [
      {
        "performed": "2020-03-20T09:38:50Z",
        "typeOfBusiness": "MOTOR TRADE & OTHER"
      }
      ...
    ],
    "insuranceHistory": [
      {
        "type": "C",
        "lossDate": "2015-11-03",
        "removedDate": null
      }
    ],
    "report": "https://api.autotrader.co.uk/vehicle-check-report/931b2463d00443c990f9f9587d5a1562"
  }
}
```

A full vehicle check can be requested with parameter fullVehicleCheck=true

The follow field are in addition to the basic vehicle check.

| Property | Description |
| --- | --- |
| highRisk | Has the vehicle has been marked high risk by an insurer |
| privateFinance | Has the vehicle got unsettled private i.e. consumer finance |
| tradeFinance | Has the vehicle got unsettled trade finance |
| mileageDiscrepancy | If there is a discrepancy in the recorded odometer readings |
| registrationChanged | Has the vehicle has had a registration plate change |
| colourChanged | Has the vehicle colour has changed |
| dvlaVehicle | DVLA vehicle data |
| v5cs | A list of v5 issue dates |
| policeStolenMarker | Details of the police force, stolen date |
| financeAgreements | Finance agreement number, lender, lenders phone number, agreement start date, term and type of finance |
| plateChanges | A list of current & previous registration dates and start date for new registration |
| colourChanges | A list of colour change dates and previous colour |
| odometerReadings | A list of odometer readings, who they were performed by and date |
| highRiskMarkers | A list of values highlighting the high risk details, with company name and contact details |
| previousSearches | A list of previous credit searches, who they were performed by and date |
| insuranceHistory | History of previous insurance events/claims |
| report | URL of downloadable vehicle check pdf |

## Valuations

A successful response looks like this:

```
GET /vehicles?registration=XXXXX&valuations=true&odometerReadingMiles=8000&advertiserId=123456

```

A successful response looks like this:

```
{
  "vehicle": {
    ...
  },
  "valuations": {
    "trade": {
      "amountGBP": 8446,
      "amountExcludingVatGBP": null,
      "amountNoVatGBP": null
    },
    "partExchange": {
      "amountGBP": 8230,
      "amountExcludingVatGBP": null,
      "amountNoVatGBP": null
    },
    "retail": {
      "amountGBP": 10802,
      "amountExcludingVatGBP": null,
      "amountNoVatGBP": null
    },
    "private": {
      "amountGBP": 9380
    }
  }
}
```

A valuation can be requested with parameter valuations=true, you must also additionally supply the odometer reading e.g. odometerReadingMiles=48000

| Property | Description |
| --- | --- |
| trade.amountGBP | The suggested market average trade valuation for the Car |
| trade.amountExcludingVatGBP | The suggested market average trade valuation for a commercial vehicle without UK VAT |
| trade.amountNoVatGBP | The suggested market average trade valuation for a commercial vehicle where there is No VAT to pay |
| partExchange.amountGBP | The suggested market average part exchange valuation for the specified vehicle |
| partExchange.amountExcludingVatGBP | The suggested market average part exchange valuation for a commercial vehicle without UK VAT |
| partExchange.amountNoVatGBP | The suggested market average part exchange valuation for a commercial vehicle where there is No VAT to pay |
| retail.amountGBP | The suggested market average retail valuation for the Car |
| retail.amountExcludingVatGBP | The suggested market average retail valuation for a commercial vehicle without UK VAT |
| retail.amountNoVatGBP | retail.amountNoVatGBP - The suggested market average retail valuation for a commercial vehicle where there is No VAT to pay |
| private.amountGBP | The suggested market average private sale valuation for the specified vehicle |

You can also retrieve this data via a POST method which is detailed in valuations.

## Vehicle Metrics

```
GET /vehicles?registration=YOURREG&odometerReadingMiles=XXXXX&vehicleMetrics=true&advertiserId=123456

```

A successful response looks like this:

```
{
  "vehicle": {
    ...
  },
  "vehicleMetrics": {
    "retail": {
      "supply": {
        "value": 1.84
      },
      "demand": {
        "value": 1.88
      },
      "marketCondition": {
        "value": 0.02
      },
      "rating": {
        "value": 49.48
      },
      "daysToSell": {
        "value": 50.6
      }
    }
  }
}
```

Autotrader vehicle metrics can be requested with the parameter vehicleMetrics=true together with the selected vehicles odometer reading e.g. odometerReadingMiles=48000

| Property | Description |
| --- | --- |
| supply | A comparison of the national market supply for a vehicle on Autotrader over the last 7 days relative to the usual level of market supply that has been observed over the last 6 months. |
| demand | A comparison of the national demand for a vehicle on Autotrader over the last 7 days relative to the level of demand that has been observed over the last 6 months. Demand is calculated by aggregating consumer activity on equivalent vehicles. |
| marketCondition | A metric of the current market condition, taking into account the market supply and buyer demand for a vehicle. |
| rating | An actionable metric personalised to the exact location of a advertiser that more accurately reflects both the consumer and advertiser behaviour that we see on a more localised level. |
| daysToSell | An analysed blend of advertiser pricing and stock rotation behaviour and our total view of daily stock movements. Factoring the average number of days a vehicle takes to sell at 100% price position. |

You can also retrieve this data via a POST method which is detailed in Vehicle Metrics.

## Retrieve Competitor Link

```
GET /vehicles?registration=YOURREG&competitors=true&advertiserId=123456

```

A successful response looks like this:

```
{
  "vehicle": {
    ...
  },
  "links": {
    "competitors": {
      "href": "https://api.autotrader.co.uk/stock?searchType=competitor&valuations=true&registration!=KN20FZG&minPlate=20&maxPlate=20&standardMake=Volkswagen&standardModel=Passat&standardTrim=SEL&minEnginePowerBHP=142&maxEnginePowerBHP=158&standardTransmissionType=Manual&standardFuelType=Diesel&standardBodyType=Estate&standardDrivetrain=Front%20Wheel%20Drive&doors=5&minBadgeEngineSizeLitres=2.0&maxBadgeEngineSizeLitres=2.0&advertiserId=123456"
    }
  }
}
```

By including the parameter competitors=true you will get a pre-constructed URL in your response which will allow you to assess the market competition for the vehicle on Autotrader

More information on how to utilise the link can be found in Find Competitors.

# Taxonomy API

## Introduction

Sandbox environment:

```
https://api-sandbox.autotrader.co.uk/taxonomy

```

Production environment:

```
https://api.autotrader.co.uk/taxonomy

```

This collection of resources allows you to interactively navigate through the Autotrader vehicle taxonomy in order to retrieve the required data to build a stock record. Once a derivativeId is determined, it can then be used to retrieve the vehicle technical data, standard & optional features data. The derivativeId can also be used, together with the other required attributes to retrieve vehicle metrics & valuations data.

The Autotrader vehicle taxonomy have structured levels. With this API you can list:

- Vehicle Types - supported on our platform
- Makes - OEM names for the selected vehicle type
- Models - names of models for the selected make
- Generations - body type and years spanning each vehicle mark or version fo the selected model
- Derivatives - individual variations of each vehicle available for that generation

Each of these resources can be filtered using the parameter productionStatus - values of Current, Discontinued, or Future to return production, out of production or yet to be produced vehicles.

## Vehicle Types

Our taxonomy is split into types of vehicles.

```
GET /taxonomy/vehicleTypes?advertiserId=1234

```

A snippet of a successful response looks like this:

```
{
  "vehicleTypes": [
    {
      "name": "Bike"
    },
    {
      "name": "Car"
    },
    {
      "name": "Caravan"
    },
    {
      "name": "Crossover"
    },
    {
      "name": "Farm"
    },
    {
      "name": "Motorhome"
    },
    {
      "name": "Plant"
    },
    {
      "name": "Truck"
    },
    {
      "name": "Van"
    }
  ]
}
```

## Makes

Brand or manufacturer of the vehicle e.g. BMW, Ford

```
GET /taxonomy/makes?vehicleType=Car&advertiserId=1234

```

A successful response looks like this:

```
{
  "makes": [
    {
      "makeId": "2c9299d1712af419017130a7163969f4",
      "name": "Fiat"
    },
    {
      "makeId": "2c9299017130a7163969f4d1712af419",
      "name": "Ford"
    }
    ...
  ]
}
```

```
GET /taxonomy/makes?vehicleType=Car&make=Ford&advertiserId=1234

```

A successful response when further refined with make looks like this:

```
{
  "makes": [
    {
      "makeId": "2c9299017130a7163969f4d1712af419",
      "name": "Ford"
    }
  ]
}
```

To retrieve the list of makes for specific vehicle type(s), call /taxonomy/makes the using the vehicleType parameter e.g. vehicleType=Car

You can search for a particular make using the make parameter e.g. make=ford

Common derivations or misspellings of names are catered for e.g. make=Mercedes will return the correct Mercedes-Benz

## Models

Name given by manufacturer for a collection of vehicles with the same overall design e.g. Fiesta

```
GET /taxonomy/models?makeId=2c9299017130a7163969f4d1712af419&vehicleType=Car&advertiserId=1234

```

A snippet of a successful response looks like this:

```
{
  "models": [
    {
      "modelId": "2c9299d1712af419017130a7163969f4",
      "name": "Fiesta"
    },
    {
      "modelId": "2c9299017130a7163969f4d1712af419",
      "name": "Mondeo"
    }
    ...
  ]
}
```

```
GET /taxonomy/models?makeId=459cc090aa5ebb32329b292726f74f35&model=fiesta&vehicleType=Car&advertiserId=1234

```

A snippet of a successful response when further refined with model looks like this:

```
{
  "models": [
    {
      "modelId": "2c9299d1712af419017130a7163969f4",
      "name": "Fiesta"
    }
  ]
}
```

Selecting the relevant makeId from the previous endpoint, you can then request all available models.

In order to retrieve the list of models for the chosen make, you need to call /taxonomy/models with the makeId parameter e.g. makeId=2c9299017130a7163969f4d1712af419

You can further refine your results by supplying the specific model name using the model parameter e.g. model=Fiesta

Common derivations or misspellings of names are catered for e.g. model=3-Series will return the correct 3 Series

To retrieve the list of models for specific vehicle types(s), call /taxonomy/models and include the optional vehicleType parameter e.g. vehicleType=Car

## Generations

Combination of body type and years within which this mark or version was available e.g. Hatchback (2015 - 2019)

```
GET /taxonomy/generations?modelId=2c9299017130a7163969f4d1712af419

```

A successful response looks like this:

```
{
  "generations": [
    {
      "generationId": "2c9299d1712af419017130a7163969f4",
      "name": "Saloon (2017 - )"
    },
    {
      "generationId": "2c9299017130a7163969f4d1712af419",
      "name": "Hatchback (2016 - )"
    }
  ]
}
```

Using the relevant modelId, you can request all the different generations of your chosen vehicle.

In order to retrieve the relevant generation for the chosen model, you need to call /taxonomy/generations with the modelId e.g. modelId=2c9299017130a7163969f4d1712af419

To retrieve the list of models for specific vehicle types(s), call /taxonomy/generations and include the optional vehicleType parameter e.g. vehicleType=Car

Once you have your generationId you can use the generationId to request all available derivatives within the generation or you can continue to refine your results in order to get a more succinct list of derivatives.

## Derivatives

A description of the specific vehicle. Comprised of engine, model, trim, body type, door, fuel type & transmission.

e.g. 2.0T EcoBoost Titanium Hatchback 5dr Petrol Auto (s/s) (240 ps)

```
GET /taxonomy/derivatives?generationId=fd73063acd1a4ad881eeb341fb6db79a

```

A successful response looks like this:

```
{
  "derivative": [
    {
      "derivativeId": "5fe438b603114aca998c72edff83ba7a",
      "name": "2.0 318d MHT M Sport Saloon 4dr Diesel Hybrid Auto Euro 6 (s/s) (150 ps)"
    },
    {
      "derivativeId": "cda8536501c4445387db18cd9ded7dac",
      "name": "2.0 318d Sport Saloon 4dr Diesel Auto Euro 6 (s/s) (150 ps)"
    },
    {
      "derivativeId": "4e52a7b5463e487ebe8e7fb12c3c5a92",
      "name": "2.0 318i M Sport Saloon 4dr Petrol Auto Euro 6 (s/s) (156 ps)"
    }
  ]
}
```

```
GET /taxonomy/derivatives?generationId=116f68f52562459faccf99cad49e74ac&fuelType=Diesel&vehicleType=Car&transmission=Automatic&trim=Sport&advertiserId=1234

```

A successful response looks like this:

```
{
  "derivatives": [
    {
      "derivativeId": "cda8536501c4445387db18cd9ded7dac",
      "name": "2.0 318d Sport Saloon 4dr Diesel Auto Euro 6 (s/s) (150 ps)",
      "introduced": "2019-01-01",
      "discontinued": "2020-07-27"
    }
  ]
}
```

This request allows you to retrieve all possible derivatives, using the selected generationId.

In order to retrieve the full list of derivatives, you need to call /taxonomy/derivatives with the generationId e.g. generationId=2c9299017130a7163969f4d1712af419

To retrieve a specific derivative, you can include`oemModelCode` parameter to the api call to return the specific message. Please note - this functionality is only available for Volvo derivatives at this stage.

The derivativeId extracted from this resource is essential when retrieving Technical Data, Features, Valuations and Vehicle Metrics. You can also a patch a derivativeId onto a stock item in instances where this is missing.

At this level it is likely the list of derivatives will be extensive. In the scenario where it’s not desired to show the derivative list in full, Facets can also be requested and then values subsequently used to filter.

## Taxonomy Facets

```
GET /taxonomy/fuelTypes?generationId=116f68f52562459faccf99cad49e74ac&vehicleType=Car&advertiserId=1234

```

A successful response looks like this:

```
{
  "fuelTypes": [
    {
      "name": "Petrol"
    },
    {
      "name": "Diesel"
    }
  ]
}
```

```
GET /taxonomy/transmissionTypes?generationId=116f68f52562459faccf99cad49e74ac&fuelType=Petrol&vehicleType=Car&advertiserId=1234

```

A successful response looks like this:

```
{
  "transmissionTypes": [
    {
      "name": "Automatic"
    },
    {
      "name": "Manual"
    }
  ]
}
```

```
GET /taxonomy/bodyTypes?modelId=6e80b38f4a439b38354892f6e61123ad&advertiserId=1234

```

A successful response looks like this:

```
{
  "bodyTypes": [
    {
      "name": "Estate"
    },
    {
      "name": "Hatchback"
    },
    {
      "name": "Saloon"
    }
  ]
}
```

```
GET /taxonomy/trims?generationId=116f68f52562459faccf99cad49e74ac&fuelType=Petrol&vehicleType=Car&transmission=Automatic&advertiserId=1234

```

A successful response looks like this:

```
{
  "trims": [
    {
      "name": null
    },
    {
      "name": "S line"
    },
    {
      "name": "S line Competition"
    },
    {
      "name": "S line Contrast Edition"
    },
    {
      "name": "S line Style Edition"
    },
    {
      "name": "SE"
    },
    {
      "name": "Sport"
    },
    {
      "name": "Technik"
    },
    {
      "name": "Vorsprung"
    }
  ]
}
```

The following request allow you to retrieve valid values for each of the below facets for vehicleType(s), makeId, modelId or generationId. Your request should be structured like this:

```
GET /taxonomy/**{facet}**?generationId=116f68f52562459faccf99cad49e74ac&advertiserId=1234

```

Available facets:

- taxonomy/fuelTypes
- taxonomy/transmissionTypes
- taxonomy/bodyTypes
- taxonomy/trims
- taxonomy/doors
- taxonomy/drivetrains
- taxonomy/wheelbaseTypes
- taxonomy/cabTypes
- taxonomy/axleConfigurations
- taxonomy/badgeEngineSizes
- taxonomy/styles
- taxonomy/subStyles
- taxonomy/endLayouts
- taxonomy/bedroomLayouts

These facets can be expressed individually or cumulatively in any desired order.

Facets within /taxonomy can also be filtered by productionStatus, there are three possible values Current which will refine the results only showing current in production vehicles, Discontinued for vehicles previously in production and Future for vehicle planned for future production. Facets within /taxonomy may return a value of null. Example /taxonomy/trims may return a value of null where the OEM may have derivatives without a trim value.

## Technical Data

```
GET /taxonomy/derivatives/981d9cad76e54ba6a8cf790dfd569764?advertiserId=1234

```

A successful response looks like this:

```
{
  "derivativeId": "c31ded73f29579d820f6d6ac32164d48",
  "generationId": "32611b7a93e9f9f99e8da7701726bbd9",
  "vehicleType": "Car",
  "make": "Mercedes-Benz",
  "model": "E Class",
  "generation": "Estate (2010 - 2013) S212",
  "name": "3.0 E350 CDI Avantgarde Auto 5dr",
  "longName": "3.0 E350 CDI Avantgarde Estate 5dr Diesel Auto (191 g/km, 231 bhp)",
  "introduced": "2010-01-01",
  "discontinued": "2012-01-31",
  "trim": "Avantgarde",
  "bodyType": "Estate",
  "fuelType": "Diesel",
  "fuelDelivery": "Direct Injection",
  "transmissionType": "Automatic",
  "drivetrain": "Rear Wheel Drive",
  "cabType": null,
  "wheelbaseType": null,
  "roofHeightType": null,
  "seats": 5,
  "doors": 5,
  "valves": 24,
  "gears": 7,
  "cylinders": 6,
  "cylinderArrangement": "Vee",
  "engineMake": "Mercedes cars",
  "valveGear": "Double Overhead Camshaft",
  "axles": 2,
  "countryOfOrigin": "Germany",
  "driveType": "4X2",
  "startStop": false,
  "enginePowerPS": null,
  "engineTorqueNM": 540,
  "engineTorqueLBFT": 398.23,
  "co2EmissionGPKM": 191,
  "topSpeedMPH": 155,
  "zeroToSixtyMPHSeconds": 6.8,
  "zeroToOneHundredKMPHSeconds": 8.4,
  "badgeEngineSizeLitres": 3.0,
  "engineCapacityCC": 2987,
  "enginePowerBHP": 231,
  "fuelCapacityLitres": 59.0,
  "emissionClass": "Euro 5",
  "owners": 1,
  "fuelEconomyNEDCExtraUrbanMPG": 50.4,
  "fuelEconomyNEDCUrbanMPG": 31.4,
  "fuelEconomyNEDCCombinedMPG": 40.9,
  "fuelEconomyWLTPLowMPG": null,
  "fuelEconomyWLTPMediumMPG": null,
  "fuelEconomyWLTPHighMPG": null,
  "fuelEconomyWLTPExtraHighMPG": null,
  "fuelEconomyWLTPCombinedMPG": null,
  "lengthMM": 4888,
  "heightMM": 1506,
  "widthMM": 1822,
  "wheelbaseMM": 2854,
  "bootSpaceSeatsUpLitres": 695.0,
  "bootSpaceSeatsDownLitres": 1950.0,
  "insuranceGroup": "40",
  "insuranceSecurityCode": "E",
  "batteryRangeMiles": null,
  "batteryCapacityKWH": null,
  "batteryUsableCapacityKWH": null,
  "minimumKerbWeightKG": null,
  "grossVehicleWeightKG": null,
  "grossCombinedWeightKG": null,
  "grossTrainWeightKG": null,
  "boreMM": 83,
  "strokeMM": 92,
  "payloadLengthMM": null,
  "payloadWidthMM": null,
  "payloadHeightMM": null,
  "payloadWeightKG": null,
  "payloadVolumeCubicMetres": null,
  "rde2Compliant": null,
  "sector": "Premium Upper Medium Cars",
  "chargeTimes": [
    {
      "chargerType": "Fast Charge",
      "chargerDescription": "22 kW",
      "chargerSupplyType": "AC Three Phase",
      "connectorType": "Type 2",
      "startBatteryPercentage": 0,
      "endBatteryPercentage": 100,
      "durationMinutes": 210
    },
    {
      "chargerType": "Fast Charge",
      "chargerDescription": "7.4 kW",
      "chargerSupplyType": "AC Single Phase",
      "connectorType": "Type 2",
      "startBatteryPercentage": 0,
      "endBatteryPercentage": 100,
      "durationMinutes": 315
    }
  ],
  "oem": {
    "make": null,
    "model": null,
    "derivative": null,
    "bodyType": null,
    "transmissionType": "Auto",
    "drivetrain": null,
    "wheelbaseType": null,
    "roofHeightType": null,
    "engineType": "E350 CDI",
    "engineTechnology": null,
    "engineMarketing": null,
    "editionDescription": null,
    "colour": null
  }
}
```

Once you have selected the correct derivativeId, this resource is used to retrieve all of the vehicles technical data.

The derivativeId can be derived from the taxonomy resources, a vehicle lookup or using the value previously saved on stock.

In order to retrieve the full technical data call /taxonomy/derivatives/{derivativeId}.

## Features

```
GET /taxonomy/features?derivativeId=981d9cad76e54ba6a8cf790dfd569764&effectiveDate=2019-05-01&advertiserId=1234

```

A snippet of a successful response looks like this:

```
{
  "features": [
    {
      "name": "1 x SDXC Card Reader",
      "type": "Standard",
      "category": "Audio and Communications",
      "genericName": "Audio and Communications",
      "basicPrice": 0.0,
      "vatPrice": 0.0,
      "factoryCodes": [
        
      ],
      "rarityRating": null,
      "valueRating": null
    },
    {
      "name": "Apex Grey",
      "genericName": "Grey",
      "type": "Optional",
      "category": "Paint",
      "basicPrice": 3062.5,
      "vatPrice": 612.5,
      "factoryCodes": [
        "P7P7"
      ],
      "rarityRating": null,
      "valueRating": null,
      "genericFinish": "Special Solid Paint",
      "finish": "Racing Line"
    },
    {
      "name": "16in Alloy Wheels - 10-Spoke Design",
      "type": "Optional",
      "category": "Exterior",
      "genericName": "Wheels & Tyres",
      "basicPrice": 208.33,
      "vatPrice": 41.67,
      "factoryCodes": [
        "IW3"
      ],
      "rarityRating": null,
      "valueRating": "High Value"
    }
  ]
}
```

/taxonomy/features requires a derivativeId and an effectiveDate.

The derivativeId can be derived from the taxonomy resources, a vehicle lookup or using the value previous saved on stock.

Once you have selected the correct derivativeId, this resource is used to retrieve available standard and optional features.

Over time, minor changes in the specification of a vehicle can occur when a manufacturer changes the available options or what is included as standard. The features resource therefore requires an effectiveDate in order to get an accurate list. When the date of manufacture is known then this should be used but if not you can also use date of registration or, if the current specification is required (e.g. for a new car), then use today's date.

## Prices

```
GET /taxonomy/prices?derivativeId=cac61f27ca544137846785e35237604c&advertiserId=1234

```

A successful response looks like this:

```
{
  "prices": [
    {
      "effectiveFrom": "2020-06-01",
      "effectiveTo": "2020-10-01",
      "basicPrice": 23345.83,
      "vatPrice": 4669.17,
      "deliveryPrice": 550.0,
      "vatDeliveryPrice": 110.0
    },
    {
      "effectiveFrom": "2020-10-01",
      "effectiveTo": null,
      "basicPrice": 23345.83,
      "vatPrice": 4669.17,
      "deliveryPrice": 550.0,
      "vatDeliveryPrice": 110.0
    }
  ]
}
```

In order to retrieve the prices for a vehicle, you will need to call taxonomy/prices with a derivativeId.

The derivativeId can be derived from the taxonomy resources, a vehicle lookup or using the value previous saved on stock.

Once you have selected the correct derivativeId, this resource is used to retrieve available base and delivery prices for a given derivativeId and its associated effective dates.

You can optionally add an effectiveDate the service the then return a single price as of that date, when no effective date is included, the response will show all the recorded price values over time.

# Stock API

## Introduction

Sandbox environment:

```
https://api-sandbox.autotrader.co.uk/stock

```

Production environment:

```
https://api.autotrader.co.uk/stock

```

This API is used for managing stock records through the Autotrader platform.

With this API you can :-

- Create new stock record
- Update existing stock record
- List all stock for an advertiser
- Read an individual stock record

```
{
  "results": [
    {
      "vehicle": {
        "ownershipCondition": "Used",
        "registration": "FG71WMC",
        "vin": "WF0TR3SU1MMA39540",
        "engineNumber": "MA39540",
        "make": "Ford",
        "model": "Mustang Mach-E",
        "generation": "SUV (2020 - )",
        "derivative": "Extended Range 91kWh SUV 5dr Electric Automatic AWD (351 ps)",
        "derivativeId": "5b8a3547223b4edc819fb1603395f6ec",
        "vehicleType": "Car",
        "trim": null,
        "bodyType": "SUV",
        "fuelType": "Electric",
        "cabType": null,
        "transmissionType": "Automatic",
        "wheelbaseType": "STD",
        "roofHeightType": null,
        "drivetrain": "Four Wheel Drive",
        "seats": 5,
        "doors": 5,
        "cylinders": 0,
        "valves": 0,
        "engineTorqueNM": 580,
        "co2EmissionGPKM": 0,
        "topSpeedMPH": 111,
        "zeroToSixtyMPHSeconds": null,
        "zeroToOneHundredKMPHSeconds": 5.8,
        "badgeEngineSizeLitres": null,
        "badgeEngineSizeCC": null,
        "engineCapacityCC": null,
        "enginePowerBHP": 346,
        "enginePowerPS": null,
        "fuelCapacityLitres": null,
        "emissionClass": "Euro 6",
        "owners": 1,
        "fuelEconomyNEDCExtraUrbanMPG": null,
        "fuelEconomyNEDCUrbanMPG": null,
        "fuelEconomyNEDCCombinedMPG": null,
        "fuelEconomyWLTPLowMPG": null,
        "fuelEconomyWLTPMediumMPG": null,
        "fuelEconomyWLTPHighMPG": null,
        "fuelEconomyWLTPExtraHighMPG": null,
        "fuelEconomyWLTPCombinedMPG": null,
        "bootSpaceSeatsUpLitres": 402.0,
        "bootSpaceSeatsDownLitres": 1420.0,
        "insuranceGroup": "40",
        "insuranceSecurityCode": "E",
        "firstRegistrationDate": "2021-11-10",
        "colour": "Blue",
        "style": null,
        "subStyle": null,
        "lengthMM": 4713,
        "heightMM": 1625,
        "widthMM": 2094,
        "wheelbaseMM": 3678,
        "payloadLengthMM": null,
        "payloadWidthMM": null,
        "payloadHeightMM": null,
        "payloadWeightKG": null,
        "minimumKerbWeightKG": 2182,
        "grossVehicleWeightKG": 2690,
        "batteryRangeMiles": 335,
        "batteryCapacityKWH": 98.7,
        "batteryUsableCapacityKWH": 91.0,
        "odometerReadingMiles": null,
        "motExpiryDate": null,
        "warrantyMonthsOnPurchase": null,
        "serviceHistory": null,
        "hoursUsed": null,
        "plate": "71",
        "yearOfManufacture": "2021",
        "interiorCondition": null,
        "tyreCondition": null,
        "bodyCondition": null,
        "exDemo": null,
        "v5Certificate": null,
        "previousOwners": 1,
        "driverPosition": "Unlisted",
        "axleConfiguration": null,
        "trailerAxleNumber": null,
        "upholstery": null,
        "interiorColour": null,
        "exteriorFinish": null,
        "lastServiceOdometerReadingMiles": null,
        "lastServiceDate": null,
        "chassisMake": null,
        "chassisModel": null,
        "bedroomLayout": null,
        "endLayout": null,
        "bedrooms": null,
        "berths": null,
        "wheelchairAccessible": null,
        "vehicleExciseDutyWithoutSupplementGBP": 0,
        "keys": null,
        "origin": "UK",
        "standard": {
          "make": "Ford",
          "model": "Mustang Mach-E",
          "generation": "SUV (2020 - )",
          "derivative": "Extended Range 91kWh AWD 5dr",
          "trim": null,
          "bodyType": "SUV",
          "fuelType": "Electric",
          "transmissionType": "Automatic",
          "cabType": "Unlisted",
          "drivetrain": "Four Wheel Drive",
          "colour": "Blue",
          "style": null,
          "subStyle": null,
          "cargoVolumeVDALitres": null
        }
      },
      "advertiser": {
        "advertiserId": "77067",
        "name": "DR Call Enquiries",
        "segment": "Franchise",
        "website": "http://www.autotrader.co.uk",
        "phone": "(01704) 468014",
        "location": {
          "addressLineOne": "New Street",
          "town": "MANCHESTER",
          "county": null,
          "region": "NORTH WEST",
          "postCode": "M15 4FN",
          "latitude": 53.4721936,
          "longitude": -2.24703
        },
        "advertStrapline": "Strapline thing"
      },
      "adverts": {
        "forecourtPrice": {
          "amountGBP": null
        },
        "soldPrice": {
          "amountGBP": null
        },
        "forecourtPriceVatStatus": null,
        "vatScheme": null,
        "dueDate": null,
        "manufacturerApproved": false,
        "twelveMonthsMot": false,
        "motInsurance": null,
        "reservationStatus": null,
        "reservationDealId": null,
        "buyerPostcode": null,
        "retailAdverts": {
          "priceOnApplication": false,
          "suppliedPrice": {
            "amountGBP": null,
            "amountGBX": null
          },
          "totalPrice": {
            "amountGBP": null
          },
          "adminFee": {
            "amountGBP": 100
          },
          "adminFeeOverride": {
            "amountGBP": null
          },
          "manufacturerRRP": {
            "amountGBP": null
          },
          "vatStatus": null,
          "attentionGrabber": null,
          "description": null,
          "description2": null,
          "priceIndicatorRating": "LOW",
          "priceIndicatorRatingBands": {
            "LOW": {
              "from": 1500,
              "to": 21015
            },
            "GREAT": {
              "from": 21015,
              "to": 21679
            },
            "GOOD": {
              "from": 21679,
              "to": 22785
            },
            "FAIR": {
              "from": 22785,
              "to": 23891
            },
            "HIGH": {
              "from": 23891,
              "to": 70000
            }
          },
          "autotraderAdvert": {
            "status": "PUBLISHED",
            "eligibleContractAllowances": [
              {
                "type": "Standard"
              }
            ],
            "allocatedContractAllowance": {
              "type": "Standard"
            }
          },
          "advertiserAdvert": {
            "status": "NOT_PUBLISHED"
          },
          "locatorAdvert": {
            "status": "NOT_PUBLISHED"
          },
          "exportAdvert": {
            "status": "NOT_PUBLISHED"
          },
          "profileAdvert": {
            "status": "NOT_PUBLISHED"
          },
          "displayOptions": {
            "excludePreviousOwners": false,
            "excludeStrapline": false,
            "excludeMot": false,
            "excludeWarranty": false,
            "excludeInteriorDetails": false,
            "excludeTyreCondition": false,
            "excludeBodyCondition": false
          },
          "financeOffers": {
            "headlineOffer": {
              "product": "CS",
              "monthlyPayment": {
                "amountGBP": 129.1
              },
              "contractLengthMonths": 60,
              "termMonths": 60,
              "annualMileage": 10000,
              "lenderDeposit": {
                "amountGBP": 0.0
              },
              "advertiserDeposit": {
                "amountGBP": 0.0
              },
              "consumerDeposit": {
                "amountGBP": 1000.0
              },
              "minimumDepositPercentage": 20.1,
              "totalAmountOfCredit": {
                "amountGBP": 12900.0
              },
              "totalChargesPayable": {
                "amountGBP": 1000.0
              },
              "totalAmountPayable": {
                "amountGBP": 13900.0
              },
              "representativeAPR": 9.9,
              "fixedRateOfInterestPerAnnum": 10.1,
              "optionalFinalPayment": {
                "amountGBP": 3000.0
              },
              "optionToPurchaseFee": {
                "amountGBP": 500.0
              },
              "lender": "Lender Name",
              "excessCostPencePerMile": null,
              "orderedFrom": "2025-01-28",
              "orderedBy": "2025-03-28",
              "registeredBy": "2025-01-30",
              "startDate": "2025-01-28",
              "expiryDate": "2025-03-21"
            }
          }
        },
        "tradeAdverts": {
          "dealerAuctionAdvert": {
            "status": "NOT_PUBLISHED"
          }
        }
      },
      "metadata": {
        "stockId": "8a46931b95d82bde0195d834737500bc",
        "searchId": "202503279320840",
        "externalStockId": null,
        "externalStockReference": null,
        "lastUpdated": "2025-03-27T15:34:21Z",
        "lastUpdatedByAdvertiser": "2025-03-27T15:34:21Z",
        "versionNumber": 4,
        "lifecycleState": "FORECOURT",
        "dateOnForecourt": "2025-03-27"
      },
      "features": [
        
      ],
      "highlights": [
        {
          "name": "Number Owners One Previous"
        },
        {
          "name": "Acceleration High"
        }
      ],
      "media": {
        "images": [
          
        ],
        "video": {
          "href": null
        },
        "spin": {
          "href": null
        }
      },
      "history": {
        "scrapped": false,
        "stolen": false,
        "imported": false,
        "exported": false,
        "previousOwners": 1
      },
      "check": {
        "insuranceWriteoffCategory": null,
        "scrapped": false,
        "stolen": false,
        "imported": false,
        "exported": false,
        "privateFinance": null,
        "tradeFinance": null,
        "highRisk": null,
        "mileageDiscrepancy": null,
        "colourChanged": null,
        "registrationChanged": null,
        "previousOwners": 1
      }
    }
  ],
  "totalResults": 1
}
```

The json to the right shows the complete stock resource with realistically populated values. The table below describes each field.

The resource is split into the following sections: -

- vehicle - information on the vehicle, contains the standard block of Autotrader standardised values
- advertiser - contains the reference id of advertiser
- adverts - details of where the stock is advertised, pricing data and other advert options
- metadata - id's, key date and other associated fields for managing the stock
- features - list of standard and optional spec on the stock
- media - images, videos and spins of the stock
- history - information about owners and origin of the stock
- check - vehicle provenance information following a successful vehicle check

[Click here](https://developers.autotrader.co.uk/advertising-integration-guide) to view guidance on managing advertising on Autotrader.

<

Free text description, valid values are:-

- Full service history
- Full dealership history
- Part service history
- No service history

Rating of interior condition, valid values are:-

- Poor
- Average
- Good
- Clean
- Excellent
- New

Rating of tyre condition, valid values are:-

- Poor
- Average
- Good
- New Tyres Required
- Excellent
- New

Rating of body condition, valid values are:-

- Poor
- Average
- Good
- Clean
- Excellent
- New

Free text description of paintwork finish, recommended values are:-

- Metallic
- Pearlescent
- Solid

| Vehicle Section | Example | Notes |
| --- | --- | --- |
| ownershipCondition | Used | This field is not directly editable. The default ownership condition of stock is Used, to set New the vehicle.odometerReadingMiles must be supplied with a value from 0 to 100 and the dateOfRegistration and plate must be null |
| registration | YO12XXX | Also known as VRM or Vehicle Registration Mark, this is the DVLA registered number plate for the vehicle |
| vin | WAUZXXXXXXXXX12345 | Vehicle Identification Number used to identify a specific vehicle |
| engineNumber | CZDA098683 | OEM unique identifier for the engine |
| make | Audi | The OEM name, this is a mandatory field |
| model | A3 | The OEM model name, this is a mandatory field for Car, Bike, Van and Truck |
| generation | Saloon (2020 - ) | The body type and year range of this models marque |
| derivative | 2.0 TDI 35 Sport Saloon 4dr Diesel S Tronic Euro 6 (s/s) (150 ps) | Details of vehicle derivative, (150 chars) |
| derivativeId | c8be64b89ccb445391c1c3c6d5e57fe5 | Unique ID linked to the Autotrader derivative. derivativeId is essential when accessing Autotrader valuation data, vehicle metrics and exposing vehicle specification on the Autotrader product page when advertising. |
| vehicleType | Car | Valid values can be found using the /taxonomy/vehicleTypes resource. When calling vehicles via the /vehicle API, "vehicleType": "Crossover" indicates that Autotrader class this vehicle as being able to be advertised across both Car and Van channels. If this values is set via POST or PATCH the vehicle type will be saved as "Van". When published on Autotrader however, the advert will appear on both sections of the site. |
| trim | Black Edition | See /taxonomy/trims ** |
| bodyType | Saloon | See [taxonomy facets](https://developers.autotrader.co.uk/api#taxonomy-facets)/taxonomy/bodyTypes |
| fuelType | Diesel | See [taxonomy facets](https://developers.autotrader.co.uk/api#taxonomy-facets)/taxonomy/fuelTypes |
| cabType | Used for Van or Truck, see [taxonomy facets](https://developers.autotrader.co.uk/api#taxonomy-facets)/taxonomy/cabTypes resource |
| transmissionType | Automatic | See [taxonomy facets](https://developers.autotrader.co.uk/api#taxonomy-facets)/taxonomy/transmissionTypes ** |
| wheelbaseType | LWB | Used for Van and Truck, see [taxonomy facets](https://developers.autotrader.co.uk/api#taxonomy-facets)/taxonomy/wheelbaseTypes ** |
| roofHeightType | H2 |
| drivetrain | Four Wheel Drive | See [taxonomy facets](https://developers.autotrader.co.uk/api#taxonomy-facets)/taxonomy/drivetrains ** |
| wheelchairAccessible | Y | Vehicle has been adapted to accommodate wheelchair user |
| seats | 5 | Number of passenger seats |
| doors | 3 | Number of doors |
| valves | 16 | Number of engine valves |
| engineTorqueNM | 400 | Engine Torque in Newton Metres |
| co2EmissionGPKM | 102 | CO2 emissions in Grams per Kilometer |
| topSpeedMPH | 125 | Vehicles top speed in Miles per Hour |
| zeroToSixtyMPHSeconds | 8.7 | Time taken from 0 to 60 MPH in seconds |
| zeroToOneHundredKMPHSeconds | 8.9 | Time taken from 0 to 10 KPH in seconds |
| badgeEngineSizeLitres | 2.0 | The badge engine size which may not be the same as numerically rounded CC value e.g. 1449 is quoted as 1.5. You should only provide one of badgeEngineSizeLitres or badgeEngineSizeCC. If both are provided, only badgeEngineSizeCC will be persisted |
| badgeEngineSizeCC | 750 | The badge engine size value where it is marketed in CC e.g. for Bikes.You should only provide one of badgeEngineSizeLitres or badgeEngineSizeCC. If both are provided, only badgeEngineSizeCC will be persisted |
| engineCapacityCC | 1998 | Engine size in CC |
| enginePowerBHP | 129 | Engine power in Brake Horse Power |
| enginePowerPS | 129 | Engine power in Pferdstarke, NOTE: this field OR enginePowerBHP should be set not both |
| fuelCapacityLitres | 58 | Fuel capacity in Litres |
| batteryRangeMiles | 160 | Range at full change |
| batteryCapacityKWH | 160 | Quoted total battery power in Kilowatt Hours |
| batteryUsableCapacityKWH | 160 | Real world total battery power in Kilowatt Hours |
| emissionClass | EU5 | The EU emission classification (EU1 to EU7) |
| owners | 6 | The number of owners the vehicle has had |
| fuelEconomyNEDCExtraUrbanMPG | 28.9 | Fuel consumption for Extra Urban scenario tested using the New European Driving Cycle (NEDC) method in Miles per Gallon |
| fuelEconomyNEDCUrbanMPG | 31.2 | As above but for Urban |
| fuelEconomyNEDCCombinedMPG | 30.9 | As above but for Combined (this is the most often quote NEDC value |
| fuelEconomyWLTPLowMPG | 41.2 | Fuel consumption for Low scenario tested using the new Worldwide Harmonised Light Vehicle (WLTP) in Miles per Gallon |
| fuelEconomyWLTPMediumMPG | 40.2 | As above but for Medium |
| fuelEconomyWLTPHighMPG | 39.4 | As above but for High |
| fuelEconomyWLTPExtraHighMPG | 35.9 | As above but for Extra High |
| fuelEconomyWLTPCombinedMPG | 39.9 | As above but for Combined |
| bootSpaceSeatsUpLitres | 360 | Size of the boot luggage compartment when the rear seats are in normal position in Litres |
| bootSpaceSeatsDownLitres | 720 | Size of the boot luggage compartment when the rear seats are in lowered position in Litres |
| insuranceGroup | 26 | 1-50 rating system indicating the cost to insure |
| insuranceSecurityCode | P | Additional classification used by Insurers, values are A, D, E, U, P or G |
| firstRegistrationDate | 2019-07-10 | Date when the vehicle was first registered with the DVLA in the UK |
| colour | Black | Standardised exterior colour of the stock item |
| style | Sowing and Planting | Used for Truck, Plant, Farm, Caravan vehicle types, describes the top level type, see [taxonomy facets](https://developers.autotrader.co.uk/api#taxonomy-facets)/taxonomy/styles |
| subStyle | Combination Drills | For stock with a style this described the most granular level of grouping, see [taxonomy facets](https://developers.autotrader.co.uk/api#taxonomy-facets)/taxonomy/subStyles |
| lengthMM | 4495 | Vehicle length in Millimetres |
| heightMM | 1425 | Vehicle height in Millimetres |
| widthMM | 1984 | Vehicle width in Millimetres |
| wheelbaseMM | 3478 | Measurement between the wheels in Millimetres |
| payloadLengthMM | 827 | Used for Van or Truck, maximum length of payload in Millimetres |
| payloadHeightMM | 725 | Used for Van or Truck, maximum height of payload in Millimetres |
| payloadWidthMM | 925 | Used for Van or Truck, maximum width of payload in Millimetres |
| payloadWeightKG | 520 | Used for Van or Truck, maximum weight of payload in Kilograms |
| minimumKerbWeightKG | 1225 | Total weight of the vehicle with water, gas, fluids and oil included, but excluding fuel in Kilograms |
| grossVehicleWeightKG | 3275 | Maximum weight of the loaded vehicle Kilograms |
| cylinders | 4 | Number of engine cylinders |
| odometerReadingMiles | 42975 | Odometer reading a.k.a mileage in Miles |
| motExpiryDate | 2023-07-10 | Date of last MOT test expiry |
| warrantyMonthsOnPurchase | 4 | Number of months of warrant remaining for a new owner |
| serviceHistory | Full service history |
| plate | 71 | Vehicle plate or reg code |
| yearOfManufacture | 2019 | Year vehicle was manufactured |
| interiorCondition | Excellent |
| tyreCondition | Good |
| bodyCondition | Poor |
| exDemo | true or false | If this vehicle was previously used as a demonstration vehicle |
| keys | 2 | How many set of keys come with the vehicle |
| origin | UK | Identify the origin of the stock item. Accepted values are UK or Non UK. If Non UK will be listed as an imported vehicle |
| v5Certificate | true or false | Does this vehicle come with a V5 certificate |
| driverPosition | Left Hand Drive | Usually blank when vehicle is the normal UK right hand drive |
| axleConfiguration | 6x2 | Used for Truck, see [taxonomy facets](https://developers.autotrader.co.uk/api#taxonomy-facets)/taxonomy/axleConfigurations ** |
| trailerAxleNumber | 2 | Used for Touring Caravans, to list the number of Axles ** |
| upholstery | Full leather | Description of upholstery material. Accepted Values are; Part leather, Full leather, Part suede, Full suede, Velour, Vinyl, Cloth |
| interiorColour | Cream | Standardised upholstery colour |
| exteriorFinish | Metallic |
| lastServiceOdometerReadingMiles | 32000 | The odometer reading in Miles when the vehicle as last serviced |
| lastServiceDate | 2021-10-19 | Date of last service |
| chassisMake | Ford | For Motorhomes, this describes the OEM name of the chassis |
| chassisModel | Transit | For Motorhomes, this describes the OEM model name of the chassis |
| bedroomLayout | Drop-down bed | For Caravans, describes the bedroom layout, see [taxonomy facets](https://developers.autotrader.co.uk/api#taxonomy-facets)/taxonomy/bedroomLayouts ** |
| endLayout | For Caravans, describes the end room layout, see [taxonomy facets](https://developers.autotrader.co.uk/api#taxonomy-facets)/taxonomy/endLayouts ** |
| bedrooms | 2 | For Caravans, the number of bedrooms |
| berths | For Caravans, describes the number of people that it can sleep |
| wheelchairAccessible | true | Indicates whether this vehicle has adaptations to make it accessible for wheelchair a user |
| cargoVolumeVDALitres | 1000 | Load volume of the vehicle using the VDA volume method |
| vehicleExciseDutyWithoutSupplementGBP | 180 | The Vehicle Excise Duty for the vehicle. This excludes any additional supplement due if the initial vehicle cost is above 40k |
| standard | The standard group of fields is the standardised values Autotrader uses for searching on the website |
| Advertiser Section | Example | Notes |
| advertiserId | 100123455 | Unique Autotrader id for this advertiser |
| Adverts Section | Example | Notes |
| forecourtPrice.amountGBP | 9999 | Amount in GBP that is shown on the forecourt. Advertiser make want to set a slightly different price like 4999 whereas on classified sites a rounded figure of 5000 works better |
| forecourtPriceVatStatus | Inc VAT | Indicates if the forecourt price contains VAT, for vehicleType Car this field is usually blank as there is no VAT to consider on a Used vehicle. Permitted values are 'Inc VAT', 'No VAT' or 'Ex VAT' |
| vatScheme | Marginal | This field indicates whether the vehicle is VAT qualifying or marginal |
| purchasePrice.amountGBP | 8547 | Amount in GBP advertiser paid, this is for the advertisers reference / stock management purposes and is not shown anywhere to consumers |
| preparationCosts.amountGBP | 485 | Amount in GBP advertiser spend in preparing this vehicle for sale, this is for the advertisers reference / stock management purposes and is not shown anywhere to consumers |
| dueDate | 2023-12-01 | Predicted date the advertiser expects the vehicle to arrive. Setting for new vehicles advertised on Autotrader will create a flag indicating when the vehicle will be arriving |
| stockInDate | 2023-12-01 | Date the vehicle is physically with the advertiser and is considered 'in stock' |
| stockInValue.amountGBP | 5200 | Amount in GBP advertiser considers as the total expenditure allowing a profit to be calculated |
| soldDate | 2023-06-01 | Date the vehicle was sold |
| soldPrice.amountGBP | 6200 | Amount in GBP advertiser sold the vehicle for, this is for the advertisers reference / stock management purposes and is not shown anywhere to consumers |
| buyerPostcode | NE1 1XX | Postcode of purchaser, used to provide post sale analytics |
| manufacturerApproved | true or false | If the vehicle is on an OEM approved scheme |
| twelveMonthsMot | true or false | Indicates if the advertiser is offering a full MOT on purchase |
| motInsurance | true or false | Indicates if the advertiser is offering a MOT insurance |
| reservationStatus | Reserved | Indicates whether a reservation has been taken on this vehicle. Acceptable values are Reserved or null |
| reservationDealId | 4ae0fc61-f92f-4fa6-9cd5-a8f31a2616c7 | If the stock item is reserved by a deal, dealId returns the Id of the deal linked to the stock item. |
| retailAdverts |
| suppliedPrice.amountGBP | 7500 | The price the advertiser wishes to set for the stock. When supplying the supplied price you are not required to provide both values. For Car, Bike & Van, stock must have a value of £75 or greater in order to be advertised. |
| suppliedPrice.amountGBX | 750000 | The price the advertiser wishes to set for the stock in pence. When supplying the supplied price you are not required to provide both values. Please be aware that if `retailAdverts.suppliedPrice.amountGBX` has been supplied the `retailAdverts.suppliedPrice.amountGBP` will round the value to the nearest pound. For example, 1234567 will round to £12346. For Car, Bike & Van, stock must have a value of 7500p or greater in order to be advertised. |
| adminFee.amountGBP | 100 | If the advertiser charges a mandatory admin fee then it must be supplied. Stock specific values can be supplied in this field or the standard amount per vehicle type can be set at an advertiser level in AT Portal |
| totalPrice.amountGBP | 7600 | This field is not editable, it calculated as the total of the suppliedPrice and adminFee. Total Price will always be inclusive of VAT. As described above, adminFee can be configured at the advertiser level in Portal when not supplied on each individual stock item |
| priceOnApplication | For non Car, Bike or Van the advertiser may wish to set the advert to show POA rather than set a price |
| manufacturerRRP.amountGBP | For ownershipCondition : new stock supplying the manufacturerRRP will highlight the discount on the advert. Note: manufacturerRRP should be the 'on the road' price including fee's, tax and delivery charges. |
| vatStatus | Ex VAT | Indicates if the supplied price contains VAT, for vehicleType Car this field is usually blank as there is no VAT to consider on a Used vehicle. Permitted values are 'Inc VAT', 'No VAT' or 'Ex VAT' |
| attentionGrabber | Superb spec | Headline for advert, (30 chars) |
| description | Description for the vehicle including all the selling points.\n\nGood Car with low mileage.\n\nFull Service History | Longer text description of vehicle for sale, (4000 chars). Line breaks will be shown as text with \n or \n\n to indicate line breaks which will be available to see on the Autotrader platform. |
| description2 | 2nd paragraph to describe vehicle. This appears after the feature list on Autotrader adverts, (4000 chars). Line breaks will be shown as text with \n or \n\n to indicate line breaks which will be available to see on the Autotrader platform. |
| priceIndicatorRating | Autotrader Price Indicators are calculated when sufficient information has been provided. Possible values returned are High, Fair, Good, Great, Low, No Analysis. To show the Autotrader Price Indicators on your website you can use the following labels: Stacked Minimum size on desktop: 80 x 32px Minimum for that size for mobile: 60 x 24px Single line Minimum size on desktop: 184 x 32px Minimum for that size for mobile: 60 x 24px Mini (non-consumer facing only) Minimum size on desktop: 80 x 18px Minimum for that size for mobile: 68 x 16px The ALT text for the image should also be set e.g. "Autotrader fair price label" You must include a link to the explainer content whenever a price indicator label is shown. More information about the usage of Price Indicator labels, with examples please [Click here](https://partner.autotrader.co.uk/document/80#/-/welcome) |
| priceIndicatorRatingBands | priceIndicatorRatingBands will identify the from and to value a stock item can be priced to stay within a specific priceIndicatorRating . |
| autotraderAdvert.status | PUBLISHED | This advert controls whether the stock is published and searchable on autotrader.co.uk PUBLISHED – stock is published on this advert destination NOT_PUBLISHED – stock is not published on this advert destination This has some additional values that may be returned after attempting to update the stock: - CAPPED is return when this stock is attempted to be advertised but the number of vehicles already advertised has reached the contracted limit for the advertiser REJECTED where the stock record has contravened a rule, the reason will be detailed in the message field in the response. |
| eligibleContactAllowances.type | Standard | Identifier for which contract allowance the stock item is eligible for linked to certain criteria. i.e price, vehicle type |
| allocatedContactAllowance.type | Standard | Identifier for which contract allowance the stock item is eligible for linked to certain criteria. i.e price, vehicle type |
| advertiserAdvert.status | NOT_PUBLISHED | Controls the stock being advertised on advertisers own website |
| locatorAdvert.status | NOT_PUBLISHED | Controls the stock being advertised on Manufacturer Website / Used Vehicle Locators |
| exportAdvert.status | PUBLISHED | Controls the stock being exported from Autotrader to other 3rd parties |
| profileAdvert.status | PUBLISHED | Controls the stock being advertised on 'Retailer Stores' page on autotrader.co.uk |
| tradeAdverts |
| dealerAuctionAdvert.status | NOT_PUBLISHED | Controls the stock being advertised on the Dealer Auction site |
| displayOptions | Advertiser may wish record but no show on consumer facing adverts some fields |
| excludePreviousOwners | true or false |
| excludeStrapline | true or false |
| excludeMot | true or false |
| excludeWarranty | true or false |
| excludeInteriorDetails | true or false |
| excludeTyreCondition | true or false |
| excludeBodyCondition | true or false |
| financeOffers |
| product | HP | Type of finance product selected for the finance offer. Products can be HP, CS, PCP |
| monthlyPayment.amountGBP | 129.1 | The cost of the regular monthly payments. This monthly payment will differ from the first and optional final payment for the finance offer |
| contractLengthMonths | 36 | Number of regular payments plus an optional final payment |
| termMonths | 36 | Number of months selected for the finance offer |
| annualMileage | 10000 | Number of miles expected to be driven per years as part of the finance offer. Minimum mileage is 5,000pa and maximum is 20,000pa |
| lenderDeposit.amountGBP | 1000 | Amount of deposit the lender will be contributing to the finance offer |
| advertiserDeposit.amountGBP | 1000 | Amount of deposit the advertiser will be contributing to the finance offer |
| consumerDeposit.amountGBP | 1000 | Amount of deposit the consumer will be contributing to the finance offer |
| minimumDepositPercentage | 20.1 | Minimum deposit percentage required to finance the vehicle. This percentage is calculated from the total price of the vehicle taken into account how much has been placed as a deposit. The total deposit contributions must match or be above this value for this finance offer to be valid. |
| totalAmountOfCredit.amountGBP | 17590 | Total amount of credit required for the finance offer |
| totalChargesPayable.amountGBP | 500 | Total amount of charges payable for the finance offer |
| totalAmountPayable.amountGBP | 18090e | Total amount payable for the finance offer including the total amount of credit and the total charges payable. |
| representativeAPR | 9.9 | The Annual Percentage Rate (APR) is the total rate of interest against any funds borrowed. To calculate your APR, lenders combine the interest rate with any admin fees incurred through processing a loan. Some lenders will reduce APR if you borrow a higher amount |
| fixedRateOfInterestPerAnnum | 10.1 | The annual interest rate you will be charged just for the finance. It excludes all other chargers and fees, such as admin fees or any commission. Have a fixed interest rate means that you'll pay a set amount of interest on the amount you borrow |
| optionFinalPayment.amountGBP | 2500 | Option final payment which the consumer can pay to purchase the vehicle at the end of the finance agreement. This field is mandatory if the finance offer product is PCP |
| optionToPurchaseFee.amountGBP | 100 | Fee charged if the consumer purchases the vehicle at the end of the finance terms |
| lender | Lender Name | Name of the lender associated to the finance offer |
| excessCostPerMile | 30.1 | Cost in pence per mile if the mileage of the vehicles exceeds the annual mileage at the end of the finance term. This field is mandatory of the product is PCP |
| orderedFrom | 2025-03-18 | Date the vehicle has to be ordered from for the finance offer to be eligible |
| orderedBy | 2025-05-18 | Date the vehicle has to be ordered by for the finance offer to be eligible |
| registeredBy | 2025-06-18 | Date the vehicle has to be registered by for the finance offer to be eligible |
| startDate | 2025-03-11 | Date the finance offer is available from |
| expiryDate | 2025-05-11 | Date the finance offer expires |
| Metadata Section | Example | Notes |
| stockId | 2c9299d1744ec0a90174587a2fbb3524 | Autotrader unique ID for this stock item, used to fetch and perform updates |
| searchId | 202009043303511 | Autotrader unique ID for this advert, visible to consumers on the Autotrader website and app |
| externalStockId | ABC123 | Field to store a third party system unique stock id, (200 chars) |
| externalStockReference | YOUR_REF1 | Field to store a second third party system unique stock id, (25 chars) |
| lastUpdated | 2020-09-04T09:37:16.731Z | Time of the last update on this record, this includes changes like valuation updates, price indicator rating changes etc |
| lastUpdatedByAdvertiser | 2020-09-04T09:37:16.728Z | Time of the last update on this record from the advertiser, e.g. price changes, imagery etc |
| lifecycleState | FORECOURT | Vehicle lifecycle states have the following possible values DUE_IN – vehicle that is not yet physically at the retailer's location. Unadvertised DUE_IN stock will be moved to WASTEBIN if unedited for 28 days. FORECOURT – vehicle ready for sale. Unadvertised FORECOURT stock will be moved to WASTEBIN if unedited for 56 days. SALE_IN_PROGRESS - vehicle is in the process of being sold. Unadvertised SALE_IN_PROGRESS stock will be moved to SOLD if unedited for 28 days. The above three lifecycle states permit the stock to be published on any advert destination. SOLD - vehicle has been sold and cannot be advertised. SOLD stock will be moved to DELETED if unedited for 60 days. WASTEBIN - vehicle requires removal by a retailer however would like to keep in the stock system for a time, this status is also used by Datafeeds when a record is removed. WASTEBIN stock will be deleted if unedited for 28 days. DELETED - used to finally delete the stock record. SOLD, WASTEBIN and DELETED lifecycle states cannot be published on any advert destination. Before these lifecycle states can be set all advert destinations should be first updated to NOT_PUBLISHED Lifecycle state of a stock item cannot be changed to "DELETED" or "SOLD" if a dealId is attached . . |
| dateOnForecourt | 2020-09-04 |
| Highlights | Example | Notes |
| name | Low Emissions | Generated highlight for the stock item compared to other similar stock items |
| Features Section | Example | Notes |
| features | When updating the list of features (or any list type field) the complete list should be sent in the request, you cannot add or remove individual items from the list in isolation. |
| name | 18in Alloy Wheels | Description of the feature |
| type | Standard | Identifier to show if the feature was part of the standard vehicle or was ordered as an option. |
| standardName | 18in Alloy Wheels | Standardised Autotrader feature description |
| category | Exterior | Feature category |
| rarityRating | Rare | Identifier to show how rare the feature is compared to similar vehicles. Values shown will be Rare, Very Rare or null |
| valueRating | High Value | Identifier to understand the value impact the feature has on the vehicle.Value show will be High Value or null |
| Media Section | Example | Notes |
| images | When updating the list of images (or any list type field) the complete list should be sent in the request, you cannot add or remove individual items from the list in isolation. |
| imageId | 9d6c47c5e0f54c25884a5b6da86f5a25 | Unique Id for the specific image |
| href | https://m-qa.atcdn.co.uk/a/media/{resize}/9d6c47c5e0f54c25884a5b6da86f5a25.jpg | The URL for the image |
| classificationTags | Example | Notes |
| label | Front Right | Standardised label for the image. Example - Front Right |
| category | Exterior | Standardised category for the image. Example - Exterior |
| source | PORTAL | Indicates which system added this image : - Portal, AT Connect, Datafeeds or Other |
| video.href | URL of the video for the vehicle |
| spin.href | URL of the 360 spin for the vehicle |
| History Section | Example | Notes |
| scrapped | false | Has the vehicle been recorded as scrapped with the DVLA |
| stolen | false | Has the vehicle been recorded as stolen |
| imported | false | Has the vehicle been imported |
| exported | false | Has the vehicle been exported |
| previousOwners | 4 | Number of previous owners |
| Check Section | Example | Notes |
| insuranceWriteoffCategory | D | MIAFTR insurance writeoff values. A,B,C,D,N and S, vehicles without any MIAFTR records have a 'null' value |
| privateFinance | false | Has the vehicle got unsettled private i.e. consumer finance |
| tradeFinance | false | Has the vehicle got unsettled trade finance |
| highRisk | false | Has the vehicle has been marked high risk by an insurer |
| mileageDiscrepancy | false | Is there a discrepancy in the recorded odometer readings |
| colourChanged | false | Has the vehicle colour has changed |
| registrationChanged | false | Has the vehicle has had a registration plate change |

## Creating

```
POST /stock?advertiserId=123456

```

The complete stock model is returned in the response detailing what has been saved.

The simplest way to create a new stock record is to first look up the information from /vehicles, the response can be used as a basis for the stock record to which you can add addition information like pricing, attention grabber, imagery etc.

## Updating

Example to set the externalStockId, colour and media.

```
PATCH /stock/{stockId}?advertiserId=123456

```

```
{
  "metadata": {
    "externalStockId": "REF-0890124"
  },
  "vehicle": {
    "colour": "Midnight Blue"
  },
  "media": {
    "video": {
      "href": " https://www.youtube.com/watch?v=XYZ123"
    },
    "spin": {
      "href": "http://spin_url"
    },
    "images": [
      {
        "imageId": "imageref123456789"
      },
      {
        "imageId": "imageref12345678911"
      },
      {
        "imageId": "imageref12345678912"
      }
    ]
  }
}
```

To update a stock record send a PATCH using the metadata.stockId and a payload containing the relevant fields and values to be updated. A resubmission of all fields/values is not required.

## New Car Finance Offers

Example to add a finance offer to a stock record.

```
PATCH /stock/{stockId}?advertiserId=123456

```

```
{
  "adverts": {
    "retailAdverts": {
      "financeOffers": {
        "headlineOffer": {
          "product": "CS",
          "monthlyPayment": {
            "amountGBP": 129.1
          },
          "contractLengthMonths": 35,
          "termMonths": 12,
          "annualMileage": 10000,
          "lenderDeposit": {
            "amountGBP": 5000.0
          },
          "advertiserDeposit": {
            "amountGBP": 1000.0
          },
          "consumerDeposit": {
            "amountGBP": 1000.0
          },
          "minimumDepositPercentage": 50.1,
          "totalAmountOfCredit": {
            "amountGBP": 129.0
          },
          "totalChargesPayable": {
            "amountGBP": 130.0
          },
          "totalAmountPayable": {
            "amountGBP": 131.0
          },
          "representativeAPR": 9.9,
          "fixedRateOfInterestPerAnnum": 10.1,
          "optionalFinalPayment": {
            "amountGBP": 0.0
          },
          "optionToPurchaseFee": {
            "amountGBP": 0.0
          },
          "lender": "Lender Name",
          "excessCostPencePerMile": null,
          "orderedFrom": "2025-01-28",
          "orderedBy": "2025-03-28",
          "registeredBy": "2025-01-30",
          "startDate": "2025-01-28",
          "expiryDate": "2025-03-28"
        }
      }
    }
  }
}
```

Finance Offers can be added to any`ownershipCondition``New` stock record. As part of the creation of the`financeOffers.headlineOffer` object the API requires each field requires a value, with the exception of`excessCostPencePerMile`. If a field is not applicable to the finance offer a 0 should be added to any of the`amountGBP` fields.

If the product is`PCP` an`excessCostPencePerMile` value is required for the finance offer to be created.

`financeOffers.headlineOffer` will not be available in the Search API. Within the Search API, a new`financeOffers.calculatedOffer` object has been added alongside the existing`finance` object. For further information please see [Finance Search](https://developers.autotrader.co.uk/api#finance-search) section of the Search API

Please see the below list of lenders which are available to add as part of New Car Finance Offers.

- Abarth Financial Services
- Alfa Romeo Financial Services
- Alphera Financial Services
- Alpine Financial Services
- Aston Martin Financial Services
- Audi Financial Services
- Bentley Financial Services
- Black Horse Financial Services
- Blue Motor Finance Financial Services
- BMW Financial Services
- BNP Paribas
- BNP Paribas Financial Services
- BYD Financial Services
- Citroen Financial Services
- Close Brothers Financial Services
- Creation Consumer Finance
- Credit Agricole Financial Services
- Cupra Financial Services
- Dacia Financial Services
- Dodge Financial Services
- DS Financial Services
- Ferrari Financial Services
- Fiat Financial Services
- Fiat Pro Financial Services
- Ford Credit
- Geely Auto UK Financial Services
- Genesis Financial Services
- GWM Financial Services
- Honda Financial Services
- Hyundai Capital
- Hyundai Financial Services
- Ineos Financial Services
- Jaecoo Financial Services
- Jaguar Financial Services
- Jeep Financial Services
- JLR Financial Services
- KGM Financial Services
- Kia Financial Services
- Lamborghini Financial Services
- Land Rover Financial Services
- Leap Motor Financial Services
- LEVC Financial Services
- Lexus Financial Services
- Lotus Financial Services
- MAN Financial Services
- Maserati Financial Services
- Mazda Financial Services
- McLaren Financial Services
- Mercedes Financial Services
- MG Financial Services
- MINI Financial Services
- Mobilize Financial Services
- Morgan Financial Services
- MotoNovo Financial Services
- Nissan Financial Services
- Northridge Financial Services
- Omoda Financial Services
- Oodle Financial Services
- Peugeot Financial Services
- Polestar Financial Services
- Porsche Financial Services
- Red Line Financial Services
- Renault Financial Services
- Roll-Royce Financial Services
- Santander Consumer
- Seat Financial Services
- Skoda Financial Services
- Skywell Financial Services
- Smart Financial Services
- Stellantis Financial Services
- Subaru Financial Services
- Suzuki Financial Services
- Tesla Financial Services
- Toyota Financial Services
- Vauxhall Financial Services
- Volvo Car Finance Services
- VW CV Financial Services
- VW Financial Services
- VWFS Blue Label
- Xpeng Financial Services
- Zopa Financial Services

## List & Filter

Stock can be filtered by parameters show in the table below

| Parameter | Description |
| --- | --- |
| advertiserId | Filter stock to belong to a specific advertiser ID, e.g. https://.../stock?advertiserId=123456 |
| lifecycleState | Valid values are DUE_IN, FORECOURT, SALE_IN_PROGRESS, SOLD, WASTEBIN and DELETED |
| page | Request specific page of results, Pagination volume can be calculated by totalResults / pageSize |
| pageSize | Number of results returned per page. 20 is the default and recommended however you may request up to 200 |
| registration | The vehicle registration number, e.g. /stock?registration=ab12cdf |
| searchId | Searches for a specific advert by searchId, e.g. https://.../stock?searchId=2020000000077 |
| stockId | Searches for a specific advert by stockId, e.g. https://.../stock?stockId=2c96abcde1234e768b3 |
| vin | The VIN of the vehicle e.g. /stock?vin=FG464GH1234555 |

Response Refinement

If only specific parts of the response are required then the removing sections will reduce payload size.

For example requesting advertiser=false&metadata=false will not request the advertiser and metadata sections.

Below is the list of sections which can be excluded.

- vehicle
- advertiser
- adverts
- finance
- metadata
- features
- media
- check

## View a Stock Item

```
GET /stock?advertiserId=123456&stockId={stockId}

```

To view a specific stock record, it is possible to do this view a number of different optional parameters. This includes`stockId=8a46cd7e99719198019976239cb34xxx`,`registration=ABC123`,`vin=W0L0AHL4868043XXX`,`searchId=202509239493xx`. These parameters will return the payload of the specific stock item which will enable for the stock to be reviewed.

To source the specific stockId this can be sourced via the Stock Notifications webhook.

## View a Stock Item Summary

```
GET /stock/{stockId}/summary?advertiserId=123456

```

```
{
  "metadata": {
    "stockId": "8a4691259bc1500a019bc1a6a184034b",
    "searchId": "202101159602899",
    "externalStockId": null,
    "externalStockReference": null,
    "lastUpdated": "2026-01-15T13:12:05.495Z",
    "lastUpdatedByAdvertiser": "2026-01-15T13:12:05.495Z",
    "versionNumber": 3,
    "lifecycleState": "FORECOURT",
    "dateOnForecourt": null
  },
  "adverts": {
    "reservationStatus": null,
    "reservationDealId": null,
    "retailAdverts": {
      "autotraderAdvert": {
        "status": "PUBLISHED",
        "eligibleContractAllowances": [
          {
            "type": "Standard"
          }
        ],
        "allocatedContractAllowance": {
          "type": "Standard"
        }
      },
      "advertiserAdvert": {
        "status": "PUBLISHED"
      },
      "locatorAdvert": {
        "status": "NOT_PUBLISHED"
      },
      "exportAdvert": {
        "status": "NOT_PUBLISHED"
      },
      "profileAdvert": {
        "status": "NOT_PUBLISHED"
      }
    }
  }
}
```

Stock Summary provides a real time view of state related information for a given stockId.

## Response Metrics

```
GET /stock?advertiserId=1234&responseMetrics=true

```

A successful response looks like:

```
{
  "results": [
    {
      "vehicle": {
        ...
        "responseMetrics": {
          "performanceRating": {
            "score": 93,
            "rating": "EXCELLENT"
          },
          "advertViewRating": {
            "rating": "EXCELLENT"
          },
          "searchViewRating": {
            "rating": "EXCELLENT"
          },
          "leadCountRating": {
            "rating": "ABOVE_AVERAGE"
          },
          "yesterday": {
            "advertViews": 114,
            "searchViews": 10469
          },
          "lastWeek": {
            "advertViews": 749,
            "searchViews": 57322
          }
        }
      }
    }
  ]
}
```

When listing stock, adding responseMetrics=true will return advertising performance data for stock.

The responseMetrics section with the fields shown in the table below.

| Property | Description |
| --- | --- |
| performanceRating.rating | A category based on the performance rating score for the advert (“NONE”, “LOW”, “BELOW AVERAGE”, “ABOVE AVERAGE” or “EXCELLENT”) |
| yesterday.advertViews | Total advert views for the vehicle yesterday |
| yesterday.searchViews | Total search views for the vehicle yesterday |
| lastWeek.advertViews | Total advert view for the vehicle over the last 7 days |
| lastWeek.searchViews | Total search appearances for the vehicle over the last 7 days |
| searchViewRating | Total from that day is added together, and all sources of ad-views/search-views are included |
| advertViewRating | Total from that day are added together, and all sources of ad-views/search-views are included |
| leadCountRating | The past 14 days data is used, and hard and soft leads are all taken included |

## Highlights

When viewing a stock record, the highlights object will return Co-Driver derived Vehicle Highlights unique characteristics of a vehicle. A stock item can include up to a maximum of 3 highlights.

The vehicle Highlights are derived from multiple sources of information that will be available in the stock record itself, such as technical data or features.

Linking Vehicle Highlights to specific features

```
GET /stock?advertiserId=123456

```

A successful response looks like this:

```
{
  "highlights": [
    {
      "name": "Features Valuable"
    }
  ],
  "features": [
    {
      "name": "18in Alloy Wheels",
      "type": "Standard",
      "standardName": "18in Alloy Wheels",
      "category": "Exterior",
      "rarityRating": null,
      "valueRating": "High Value"
    }
  ]
}
```

Where a returned highlight corresponds to a specific vehicle feature, clients can view the`rarityRating` and/or`valueRating` fields to accurately link to vehicle highlights that are Features Rare and Features Valuable respectively.

More information about the using Vehicle Highlights in your application, with examples and downloadable assets, can be found here: [Vehicle Highlights](https://developers.autotrader.co.uk/images/resource/Vehicle%20Highlights%20Guide%20and%20Assets.zip)

## Valuations

```
GET /stock?valuations=true&advertiserId=123456

```

A successful response looks like this:

```
{
  "results": [
    {
      "vehicle": {
        ...
        "valuations": {
          "marketAverage": {
            "retail": {
              "amountGBP": 8568,
              "amountExcludingVatGBP": null,
              "amountNoVatGBP": null
            },
            "trade": {
              "amountGBP": 5628,
              "amountExcludingVatGBP": null,
              "amountNoVatGBP": null
            },
            "partExchange": {
              "amountGBP": 5470,
              "amountExcludingVatGBP": null,
              "amountNoVatGBP": null
            },
            "private": {
              "amountGBP": null
            }
          },
          "adjusted": {
            "retail": {
              "amountGBP": 8436
            },
            "trade": {
              "amountGBP": 5541
            },
            "partExchange": {
              "amountGBP": 5390
            },
            "private": {
              "amountGBP": null
            }
          }
        }
      }
    }
  ]
  "totalResults":1
}
```

When listing stock, adding valuations=true will return valuation data for stock.

## Trended Valuations

```
GET /stock?trendedValuations=true&advertiserId=123456

```

A successful response looks like this:

```
{
  "results": [
    {
      "trendedValuations": {
        "plus30Days": {
          "marketAverage": {
            "retail": {
              "amountGBP": 20173,
              "amountExcludingVatGBP": null
            }
          },
          "adjusted": {
            "retail": {
              "amountGBP": 19712,
              "amountExcludingVatGBP": null
            }
          }
        },
        "plus60Days": {
          "marketAverage": {
            "retail": {
              "amountGBP": 20020,
              "amountExcludingVatGBP": null
            }
          },
          "adjusted": {
            "retail": {
              "amountGBP": 19562,
              "amountExcludingVatGBP": null
            }
          }
        },
        "plus90Days": {
          "marketAverage": {
            "retail": {
              "amountGBP": 19911,
              "amountExcludingVatGBP": null
            }
          },
          "adjusted": {
            "retail": {
              "amountGBP": 19456,
              "amountExcludingVatGBP": null
            }
          }
        }
      }
    }
  ],
  "facets": {
    
  },
  "totalResults": 1
}
```

When listing stock, adding trendedValuations=true will return trended 30, 60, 90 days valuation data for stock.

## Vehicle Metrics

```
GET /stock?vehicleMetrics=true&advertiserId=123456

```

A successful response looks like this:

```
{
  "results": [
    {
      "vehicle": {
        ...
      },
      "vehicleMetrics": {
        "national": {
          "retail": {
            "supply": {
              "value": 0.1
            },
            "demand": {
              "value": -0.09
            },
            "marketCondition": {
              "value": -0.17
            },
            "rating": {
              "value": 86.82
            },
            "daysToSell": {
              "value": 33.4
            }
          }
        },
        "local": {
          "retail": {
            "rating": {
              "value": 87.27
            },
            "daysToSell": {
              "value": 33.2
            }
          }
        }
      }
    }
  ],
  "facets": {
    
  },
  "totalResults": 1
}
```

When listing stock, adding vehicleMetrics=true will return vehicle metric data for stock.

## Competitors

```
GET /stock?competitors=true&advertiserId=12345

```

A successful response looks like this:

```
{
  "vehicle": {
    ...
  },
  "links": {
    "competitors": {
      "href": "https://api.autotrader.co.uk/stock?searchType=competitor&valuations=true&advertiserId=12345&registration!=KN20FZG&minPlate=20&maxPlate=20&standardMake=Volkswagen&standardModel=Passat&standardTrim=SEL&minEnginePowerBHP=142&maxEnginePowerBHP=158&standardTransmissionType=Manual&standardFuelType=Diesel&standardBodyType=Estate&standardDrivetrain=Front%20Wheel%20Drive&doors=5&minBadgeEngineSizeLitres=2.0&maxBadgeEngineSizeLitres=2.0"
    }
  }
}
```

Retrieving Competitor Link

When listing stock, adding competitors=true will return a pre-constructed URL which can be used to find the market competition for the vehicle.

Searching Competitor Stock

```
GET /stock?searchType=competitor&valuations=true&advertiserId=12345&registration!=KN20FZG&minPlate=20&maxPlate=20&standardMake=Volkswagen&standardModel=Passat&standardTrim=SEL&minEnginePowerBHP=142&maxEnginePowerBHP=158&standardTransmissionType=Manual&standardFuelType=Diesel&standardBodyType=Estate&standardDrivetrain=Front%20Wheel%20Drive&doors=5&minBadgeEngineSizeLitres=2.0&maxBadgeEngineSizeLitres=2.0

```

By using the URL returned with the competitors=true parameter, you are able to cultivate a list of competitor vehicles to review.

The URL returned when competitors=true will automatically set the searchType=competitor parameter. When using this parameter you are only permitted to use a maximum page size of 20 and paginate up to 10 pages, giving you up to a total of 200 vehicles. You can adjust the filters and sort order according to your own specifications.

When using the searchType=Competitors parameter, additional search parameters are now permitted within this resource. The full list of filter parameters described in the Search API are available to find competitor stock.

## Taxonomy Features

```
GET /stock/{stockId}/features?advertiserId=1234

```

A successful response looks like this:

```
{
  "features": [
    {
      "name": "1.2L Storage Shelf Above Glovebox",
      "genericName": "Storage",
      "type": "Standard",
      "category": "Interior",
      "basicPrice": 0.0,
      "vatPrice": 0.0,
      "factoryCodes": [
        "B4B4"
      ],
      "rarityRating": null,
      "valueRating": null
    },
    {
      "name": "Urban Grey",
      "genericName": "Grey",
      "type": "Optional",
      "category": "Paint",
      "basicPrice": 458.33,
      "vatPrice": 91.67,
      "factoryCodes": [
        "P7P7"
      ],
      "rarityRating": null,
      "valueRating": null,
      "genericFinish": "Metallic",
      "finish": "Metallic"
    }
  ]
}
```

Alongside the features saved against a given stock record, it is possible to access the available features from our vehicle taxonomy. This requires the stock record to have a derivativeId set.

## Electric Vehicle Charge Times

```
GET /stock/{stockId}/charge-times?advertiserId=1234

```

A successful response looks like this:

```
{
  "vehicle": {
    ...
  },
  "chargeTimes": [
    {
      "chargerType": "Fast Charge",
      "chargerDescription": "22 kW",
      "chargerSupplyType": "AC Three Phase",
      "connectorType": "Type 2",
      "startBatteryPercentage": 0,
      "endBatteryPercentage": 100,
      "durationMinutes": 210
    },
    {
      ...
    }
  ]
}
```

If the vehicle is Electric then charge times can be returned by visiting the sub resource.

| Property | Description |
| --- | --- |
| chargerType | The classification of charger e.g. Home or Ultra |
| chargerDescription | Power rating of charger |
| chargerSupplyType | The connection type to mains grid of charger |
| connectorType | The connector type between charger and vehicle |
| startBatteryPercentage | Start charge percentage of battery |
| endBatteryPercentage | End charge percentage of battery |
| durationMinutes | Duration of the charge in minutes |

# Images API

Sandbox environment:

```
https://api-sandbox.autotrader.co.uk/images

```

Production environment:

```
https://api.autotrader.co.uk/images

```

Images must be uploaded before associating them with stock.

To upload an image

```
POST /images?advertiserId=123456

```

A multipart/form-data body using the parameter 'file' to send the binary image. Images must be in JPEG format and up to a maximum size of 20MB.

A successful upload return an HTTP status of 201 and a response.

Uploaded images that are not associated with a stock record will be removed after 24 hours.

A successful response looks like this:

```
{
  "imageId": "d16953b8aab84c8aa838a4cf54857d98"
}
```

The imageId should be stored against the advert and it can be created/updated with the image by appending the list of imageIds in the images field.

Resizing

Image URLs are returned with a {resize} placeholder parameter. e.g. https://m-qa.atcdn.co.uk/a/media/{resize}/xxxx.jpg

You can replace`/{resize}/` with your desired dimensions. Examples below (adjustments in pixels):

- https://m-qa.atcdn.co.uk/a/media/w260h195/xxxx.jpg
- https://m-qa.atcdn.co.uk/a/media/w800h600/xxxx.jpg

There are certain constraints when requesting image sizes, they are:

- If you do not require a resize, please omit the`/{resize}/` parameter. This will return the original image, which can be varied in size. It is best practice to always specify a resize.
- Providing a width only parameter will result in an image without padding. If you provide an incorrect width only measure, you will be redirected to the nearest acceptable width. If you provide a non-existing image ID with width only request, a 404 error will be generated. Acceptable widths can be referenced from the width-height list below, using only the width dimension.

There is a list of widely used width-height image sizes, they are as follows:

- w84h63
- w108h81
- w180h135
- w260h195
- w300h225
- w340h255
- w480h360
- w600h450
- w720h540
- w768h576
- w800h600
- w1024h768
- w1280h960
- w1536h1152
- w1792h1344
- w2048h1536

If you specify an unsupported image size, you will be redirected to the nearest permitted size.

## Image Classification

To upload an image

```
POST /images?advertiserId=123456&vehicleType=Car

```

A successful response looks like this:

```
{
  "imageId": "82ac5c8e1f8e4610a4bb3d74de62b2fa",
  "classificationTags": [
    {
      "label": "Front Right",
      "category": "Exterior"
    }
  ]
}
```

Image classification tags can be added for Car, Van, and Bikes when the vehicleType parameter needs to be provided. Once this is provided an image will be returned with a label and a category.

# Co Driver API

## Introduction

Sandbox environment:

```
https://api-sandbox.autotrader.co.uk/co-driver

```

Production environment:

```
https://api.autotrader.co.uk/co-driver

```

This API is used to retrieve the Co-Driver AI generated recommendations.

With this API you can :-

- Retrieve Co-Driver suggested image order and missing images
- Generated Co-Driver Vehicle Descriptions

## Smart Image Management

```
POST /co-driver/stock/{stockId}?images=true&advertiserId=12345

```

A successful response looks like:

```
{
  "images": [
    {
      "imageId": "265163135233431fa49ea8892d822c30",
      "href": "https://m-qa.atcdn.co.uk/a/media/{resize}/265163135233431fa49ea8892d822c30.jpg",
      "classificationTags": [
        {
          "label": "Front Right",
          "category": "Exterior"
        }
      ]
    },
    {
      "imageId": null,
      "href": null,
      "classificationTags": [
        {
          "label": "Rear Left",
          "category": "Exterior"
        }
      ]
    }
  ]
}
```

In order to retrieve recommended optimal image order for a specific stock item,add the images=true parameter.

The resource will also recommend which images are considered missing. Any missing image will be indicated by being included in the list of images where the imageId is 'null'.

To use the recommended image order, clients can simply use the returned json and add the image references in this order via the Stock API. This will update the images on this stock record to this specified order.

## Generated Vehicle Descriptions

```
POST /co-driver/stock/{stockId}?description=true&advertiserId=12345

```

A successful response looks like:

```
{
  "adverts": {
    "retailAdverts": {
      "description": "The Mazda2 is a stylish and practical supermini that's perfect for city driving. This 2017 model comes with a 1.5-litre petrol engine, offering a great balance of performance and fuel efficiency. With its manual transmission, you'll enjoy a responsive and engaging driving experience. The GT Sport trim level adds sporty styling and features, making it a real head-turner. 

This Mazda2 has only had one previous owner and boasts a very high fuel economy of 57 mpg, making it an economical choice for daily commutes.  The 0-62mph time of 8.7 seconds ensures that you'll have plenty of power on tap when you need it. With its compact size and five doors, the Mazda2 is a versatile car that's ideal for families or individuals looking for a reliable and stylish companion."
    }
  }
}
```

In order to retrieve the recommended AI generated description for a specific stock item, add the description=true parameter.

To generate a description the following fields have to be supplied on the stock item:

- `derivativeId`
- `firstRegistrationDate`
- `batteryRangeMiles`(Vehicles API)

In order to add or edit the description on the stock record itself, the retrieved copy should be added to the specific stock item using the stockId via the Stock API.

# Search API

## Introduction

Sandbox environment domain :

```
https://api-sandbox.autotrader.co.uk/search

```

Production environment domain :

```
https://api.autotrader.co.uk/search

```

This API is used support high volume requests for use in consumer facing applications, allowing :-

- Filtering stock records for your permitted advertisers
- Listing facets and stock counts
- Sorting
- Searching by finance/monthly payment

This API powers [www.autotrader.co.uk](https://www.autotrader.co.uk/)

The model / response for the Search API is the same as described in Stock API.

## List & Filter

```
GET /search?advertiserId=123456

```

A successful response looks like this:

```
{
  "results": [
    {
      "vehicle": {
        "ownershipCondition": "Used",
        "registration": "HK22VCV",
        "vin": "VF1AG000069421851",
        "engineNumber": null,
        "make": "Renault",
        "model": "Zoe",
        "generation": "Hatchback (2019 - )",
        "derivative": "R135 EV50 52kWh GT Line + Hatchback 5dr Electric Auto (Rapid Charge) (134 bhp)",
        "derivativeId": "9dddf74001944fab940b39d18a0a8792",
        "vehicleType": "Car",
        "trim": "GT Line +",
        "bodyType": "Hatchback",
        "fuelType": "Electric",
        "cabType": null,
        "transmissionType": "Automatic",
        "wheelbaseType": "STD",
        "roofHeightType": null,
        "drivetrain": "Front Wheel Drive",
        "seats": 5,
        "doors": 5,
        "cylinders": 0,
        "valves": 0,
        "engineTorqueNM": 245,
        "co2EmissionGPKM": 0,
        "topSpeedMPH": 87,
        "zeroToSixtyMPHSeconds": null,
        "zeroToOneHundredKMPHSeconds": 9.5,
        "badgeEngineSizeLitres": null,
        "badgeEngineSizeCC": null,
        "engineCapacityCC": 0,
        "enginePowerBHP": 134,
        "enginePowerPS": null,
        "fuelCapacityLitres": null,
        "emissionClass": "Euro 6",
        "owners": 2,
        "fuelEconomyNEDCExtraUrbanMPG": null,
        "fuelEconomyNEDCUrbanMPG": null,
        "fuelEconomyNEDCCombinedMPG": null,
        "fuelEconomyWLTPLowMPG": null,
        "fuelEconomyWLTPMediumMPG": null,
        "fuelEconomyWLTPHighMPG": null,
        "fuelEconomyWLTPExtraHighMPG": null,
        "fuelEconomyWLTPCombinedMPG": null,
        "bootSpaceSeatsUpLitres": 338.0,
        "bootSpaceSeatsDownLitres": 1225.0,
        "insuranceGroup": "19",
        "insuranceSecurityCode": "E",
        "firstRegistrationDate": "2022-06-05",
        "colour": "Blue",
        "style": null,
        "subStyle": null,
        "lengthMM": 4087,
        "heightMM": 1562,
        "widthMM": 1730,
        "wheelbaseMM": 3304,
        "payloadLengthMM": null,
        "payloadWidthMM": 1386,
        "payloadHeightMM": null,
        "payloadWeightKG": 474,
        "minimumKerbWeightKG": 1502,
        "grossVehicleWeightKG": 1988,
        "batteryRangeMiles": 238,
        "batteryCapacityKWH": 55.0,
        "batteryUsableCapacityKWH": 52.0,
        "odometerReadingMiles": 9159,
        "motExpiryDate": null,
        "warrantyMonthsOnPurchase": null,
        "serviceHistory": null,
        "hoursUsed": null,
        "plate": "22",
        "yearOfManufacture": "2022",
        "interiorCondition": null,
        "tyreCondition": null,
        "bodyCondition": null,
        "exDemo": null,
        "v5Certificate": null,
        "previousOwners": 2,
        "driverPosition": "Unlisted",
        "axleConfiguration": null,
        "trailerAxleNumber": null,
        "upholstery": null,
        "interiorColour": null,
        "exteriorFinish": null,
        "lastServiceOdometerReadingMiles": null,
        "lastServiceDate": null,
        "chassisMake": null,
        "chassisModel": null,
        "bedroomLayout": null,
        "endLayout": null,
        "bedrooms": null,
        "berths": null,
        "wheelchairAccessible": null,
        "vehicleExciseDutyWithoutSupplementGBP": 0,
        "keys": null,
        "origin": "UK",
        "standard": {
          "make": "Renault",
          "model": "Zoe",
          "generation": "Hatchback (2019 - )",
          "derivative": "R135 EV50 52kWh GT Line + Auto 5dr (Rapid Charge)",
          "trim": "GT Line +",
          "bodyType": "Hatchback",
          "fuelType": "Electric",
          "transmissionType": "Automatic",
          "cabType": "Unlisted",
          "drivetrain": "Front Wheel Drive",
          "colour": "Blue",
          "style": null,
          "subStyle": null,
          "cargoVolumeVDALitres": null
        }
      },
      "advertiser": {
        "advertiserId": "123456",
        "name": "Test Dealer",
        "segment": "Franchise",
        "website": "https://www.testDealer.autotrader.com/",
        "phone": "0333 33441144",
        "location": {
          "addressLineOne": "3 Test Dealer Road",
          "town": "Manchester",
          "county": "Lancashire",
          "region": "England",
          "postCode": "M1 7BL",
          "latitude": 55.8707995,
          "longitude": -4.3254541
        },
        "advertStrapline": null
      },
      "metadata": {
        "stockId": "8a42acca9391d1740193923906f15a29",
        "searchId": "202412046995691",
        "externalStockId": null,
        "externalStockReference": null,
        "lastUpdated": "2024-12-04T15:10:31Z",
        "lastUpdatedByAdvertiser": "2024-12-04T15:10:31Z",
        "versionNumber": 2,
        "lifecycleState": "FORECOURT",
        "dateOnForecourt": "2024-12-04"
      },
      "highlights": [
        {
          "name": "Mileage Low"
        }
      ],
      "features": [
        {
          "name": "10" TFT Driver information display",
          "type": "Standard",
          "standardName": "10in TFT Instrument Cluster - Drivers Display",
          "category": "Interior",
          "rarityRating": null,
          "valueRating": null
        }
      ],
      "media": {
        "images": [
          {
            "imageId": "c6da9d6e7ae6474b8eceb1e7ba962a93",
            "href": "https://m.atcdn.co.uk/a/media/{resize}/c6da9d6e7ae6474b8eceb1e7ba962a93.jpg",
            "source": "AT_CONNECT",
            "classificationTags": [
              {
                "label": "Front Right",
                "category": "Exterior"
              }
            ]
          }
        ],
        "video": {
          "href": null
        },
        "spin": {
          "href": null
        }
      },
      "responseMetrics": {
        "performanceRating": {
          "score": null,
          "rating": null
        },
        "advertViewRating": {
          "rating": null
        },
        "searchViewRating": {
          "rating": null
        },
        "leadCountRating": {
          "rating": null
        },
        "yesterday": {
          "advertViews": null,
          "searchViews": null
        },
        "lastWeek": {
          "advertViews": null,
          "searchViews": null
        }
      },
      "history": {
        "scrapped": false,
        "stolen": false,
        "imported": false,
        "exported": false,
        "previousOwners": 2
      }
    }
  ],
  "totalResults": 1
}
```

Adverts can be filtered by parameters shown in the table below. Parameters in bold can be requested as a facet to see the range of possible value.

AutoTrader website adverts are currently split between by vehicle type

- autotraderCars
- autotraderBikes
- autotraderVans
- autotraderTrucks
- autotraderPlant
- autotraderFarm
- autotraderMotorhomes

| Parameter | Description |
| --- | --- |
| advertiserId | Filter stock to belong to a specific advertiser ID &advertiserId=123456 |
| advertiserType | Type of advertiser &advertiserType=Trade or &advertiserType=Private |
| advertisingLocation | in addition to advertiserWebsite for vehicle on the advertisers own website and locatorWebsite for the vehicle advertised on a Used vehicle Locator or Manufacturer Search e.g. &advertisingLocation=autotraderCars |
| derivativeId | &derivativeId=c8255534d2614f1182032df75ba5fb8d |
| distance | Radius in miles to restrict results from the supplied postcode &distance=20 |
| doors | Number of door &doors=5 |
| facet | Specifies the field to return a facet for &facet=make |
| financeOption | See Finance Search |
| insuranceWriteoffCategory | &insuranceWriteoffCategory=D |
| !insuranceWriteoffCategory | (no parameter value), this returns vehicles with no value for the insurance writeoff category |
| keywords | Search for terms in the advert &keywords=Sunroof |
| lifecycleState | Valid values are DUE_IN, FORECOURT, SALE_IN_PROGRESS, SOLD, WASTEBIN and DELETED |
| ownershipCondition | &ownershipCondition=New or &ownershipCondition=Used |
| page | Request specific page of results, Pagination volume can be calculated by totalResults / pageSize &page=2 |
| pageSize | Number of results returned per page. 20 is the default and recommended however you may request up to 200 &pageSize=20 |
| postcode | Where to centre geolocation search &postcode=M154FN |
| priceIndicatorRating | Select a specific rating &priceIndicatorRating=Good |
| registration | The VRM &registration=AB761XX |
| searchId | Searches for a specific advert by searchId &searchId=2020000000077 |
| searchType | To perform a search on all adverts published to the Autotrader website (not just for configured advertisers) specify a &searchType=public this allow a maximum of 20 adverts to be returned. |
| segment | The segment or type of trade advertiser &segment=Franchise |
| sort | Specify how the matching results are sorted. See Sorting |
| standardMake | Make &standardMake=Ford |
| standardModel | Model &standardModel=Focus |
| standardBodyType | Body type &standardBodyType=SUV |
| standardColour | Colour &standardColour=Red |
| standardDrivetrain | Drivetrain &standardDrivetrain=Front Wheel Drive |
| standardFuelType | Fuel type &standardFuelType=Petrol |
| standardTransmissionType | Transmission type &standardTransmissionType=Manual |
| standardTrim | Trim &standardTrim=M Sport |
| stockId | For a specific stock by its ID &stockId=684820a0e135433eb448afb46b623049 |
| vehicleType | Vehicle type &vehicleType=Bike |
| vin | For a specific stock by VIN &vin=XX1234567890ABCDE |
| zeroToOneHundredKMPHSeconds | The up to value for 0 to 100 KPH (62 MPH) time &zeroToOneHundredKMPHSeconds=TO_5 |

The following parameters allow a ranged filter where a lower and/or upper value can be specified. Where indicated a facet can be requested by removing the preceding min and making the first letter lowercase.

| Parameter | Description |
| --- | --- |
| minAnnualVehicleTax | Minimum road tax &minAnnualVehicleTax=100 |
| maxAnnualVehicleTax | Maximum road tax &maxAnnualVehicleTax=250 |
| minBadgeEngineSizeLitres | Minimum badge engine size &minBadgeEngineSizeLitres=2 |
| maxBadgeEngineSizeLitres | Maximum badge engine size &maxBadgeEngineSizeLitres=4 |
| minCo2EmissionGPKM | Minimum co2 emissions &minCo2EmissionGPKM=100 |
| maxCo2EmissionGPKM | Maximum co2 emissions &maxCo2EmissionGPKM=150 |
| minDateOnForecourt | Minimum date on forecourt &minDateOnForecourt=2023-01-10 |
| maxDateOnForecourt | Maximum date on forecourt &maxDateOnForecourt=2023-01-10 |
| minEnginePowerBHP | Minimum engine power &minEnginePowerBHP=130 |
| maxEnginePowerBHP | Maximum engine power &maxEnginePowerBHP=130 |
| minFuelEconomyNEDCCombinedMPG | Minimum fuel economy &minFuelEconomyNEDCCombinedMPG=30 |
| maxFuelEconomyNEDCCombinedMPG | Maximum fuel economy &maxFuelEconomyNEDCCombinedMPG=40 |
| minInsuranceGroup | Minimum insurance group &minInsuranceGroup=30 |
| maxInsuranceGroup | Maximum insurance group &maxInsuranceGroup=30 |
| minLastUpdatedByAdvertiser | Minimum date of last change by advertiser &minLastUpdatedByAdvertiser=2023-01-10 |
| maxLastUpdatedByAdvertiser | Maximum date of last change by advertiser &maxLastUpdatedByAdvertiser=2023-01-10 |
| minManufacturedYear | Minimum year of manufacturer e.g. &minManufacturedYear=2018 |
| maxManufacturedYear | Maximum year of manufacturer e.g. &maxManufacturedYear=2020 |
| minMonthlyPrice | Minimum monthly finance amount e.g. &minMonthlyPrice=50000 |
| maxMonthlyPrice | Maximum monthly finance amount e.g. &maxMonthlyPrice=50000 |
| minOdometerReadingMiles | Minimum odometer reading e.g. &minOdometerReadingMiles=50000 |
| maxOdometerReadingMiles | Maximum odometer reading e.g. &maxOdometerReadingMiles=15000 |
| minPlate | Minimum plate year e.g. &minPlate=15 |
| maxPlate | Maximum plate year e.g. &minPlate=15 |
| minSeats | Minimum number of seats e.g. &minSeats=2 |
| maxSeats | Maximum number of seats e.g. &minSeats=2 |
| minSuppliedPrice | Minimum supplied price e.g. &minSuppliedPrice=7000 |
| maxSuppliedPrice | Maximum supplied price e.g. &minSuppliedPrice=10000 |
| minTotalPrice | Minimum total price e.g. &minTotalPrice=7000 |
| maxTotalPrice | Maximum total price e.g. &maxTotalPrice=10000 |

Response Refinement

If only specific parts of the response are required then the removing sections will reduce payload size.

| Method | Description |
| --- | --- |
| {object name}=false | This will omit that entire object from the response payload. Multiple objects can be excluded concurrently, e.g advertiser=false&metadata=false etc. |

Below is the list of objects which can be excluded.

- vehicle
- advertiser
- adverts
- finance
- metadata
- features
- media
- history
- check

Facets

```
GET /search?pageSize=0&facet=doors&advertiserId=123456

```

A successful response looks like this using the doors facet:

```
{
  "results": [
    ...
  ],
  "facets": {
    "doors": [
      {
        "value": "2",
        "count": 25
      },
      {
        "value": "3",
        "count": 79
      },
      {
        "value": "4",
        "count": 41
      },
      {
        "value": "5",
        "count": 281
      }
    ]
  },
  "totalResults": 0
}
```

To see the range of discrete values for a specific field (a.k.a facet) along with the counts of adverts, supply the facet parameter with the value being the field requested. Field which can be requested as facets are shown in table above of search parameters in bold.

## Sorting

Example total price descending call :

```
GET /search?&sort=totalPriceDesc&advertiserId=123456

```

The table below lists the supported sort options

| Value | Description |
| --- | --- |
| totalPriceAsc | Total price ascending |
| totalPriceDesc | Total price descending |
| suppliedPriceAsc | Supplied price ascending |
| suppliedPriceDesc | Supplied price descending |
| vehicleAgeAsc | Age ascending |
| vehicleAgeDesc | Age descending |
| odometerReadingMilesAsc | Mileage ascending |
| odometerReadingMilesDesc | Mileage descending |
| distance | Distance from specified postcode |

## Finance Search

```
GET /search?monthlyPriceOption=10000_1000_36&minMonthlyPrice=200&maxMonthlyPrice=500&advertiserId=1234

```

A successful response for included finance :

```
{
  ...
  "calculatedOffer": {
    "product": "HP",
    "monthlyPayment": {
      "amountGBP": 451.58
    },
    "contractLengthMonths": 36,
    "termMonths": 36,
    "annualMileage": 10000,
    "lenderDeposit": null,
    "advertiserDeposit": null,
    "consumerDeposit": {
      "amountGBP": 1000.0
    },
    "minimumDepositPercentage": null,
    "totalAmountOfCredit": {
      "amountGBP": 14498.0
    },
    "totalChargesPayable": {
      "amountGBP": 1768.88
    },
    "totalAmountPayable": {
      "amountGBP": 17266.88
    },
    "representativeAPR": 7.9,
    "fixedRateOfInterestPerAnnum": 7.59,
    "optionalFinalPayment": {
      "amountGBP": 461.58
    },
    "optionToPurchaseFee": {
      "amountGBP": 10.0
    },
    "lender": "Test Lender",
    "excessCostPencePerMile": 0.0,
    "orderedFrom": null,
    "orderedBy": null,
    "registeredBy": null,
    "startDate": null,
    "expiryDate": null
  }
}
```

To include monthly finance options alongside the search results a default value of finance terms need to be set via the "&monthlyPriceOption" parameter e.g. 10000_1000_36 (mileage_deposit_terms) "&monthlyPriceOption" will return a finance results which may not fit the search criteria as we return the best finance deal result for the criteria.

- Mileage can be greater or equal to the mileage provided.
- Deposit can be less than or equal to the deposit provided.
- Term can be +/- 1 month

Parameters

| Parameter | Example | Description |
| --- | --- | --- |
| monthlyPriceOption | &financeOption=10000_1000_36 | mileage_deposit_terms. See available tiers below |
| minMonthlyPrice | &minMonthlyPrice=200 | Optional filter parameter: minimum monthly payment |
| maxMonthlyPrice | &maxMonthlyPrice=300 | Optional filter parameter: maximum monthly payment |

"monthlyPriceOption" valid values

| Attribute | Sample | Valid values |
| --- | --- | --- |
| Mileage | &monthlyPriceOption=10000_1000_36 | 5000, 8000, 10000, 12000, 15000, 20000 |
| Deposit | &monthlyPriceOption=10000_1000_36 | 0, 1000, 2000, 3000, 4000, 5000, 10000, 20000, 30000 |
| Terms | &monthlyPriceOption=10000_1000_36 | 12, 24, 36, 48, 60 |

Responses

| Response node | Description |
| --- | --- |
| calculatedOffer.product | The finance type offered on the vehicle, this can switch between PCP,CS, HP depending on lowest value |
| calculatedOffer.monthlyPayment.amountGBP | The finance type offered on the vehicle, this can switch between PCP,CS, HP depending on lowest value |
| calculatedOffer.contractLengthMonths | The monthly terms for the vehicle |
| calculatedOffer.termMonths | The monthly terms for the vehicle |
| calculatedOffer.annualMileage | Annual Mileage for the finance offer |
| calculatedOffer.lenderDeposit | Deposit contribution from the lender |
| calculatedOffer.advertiserDeposit | Deposit contribution from the advertiser |
| calculatedOffer.consumerDeposit.amountGBP | Deposit contribution from the consumer |
| calculatedOffer.minimumDepositPercentage | Minimum deposit required for the finance |
| calculatedOffer.totalAmountOfCredit.amountGBP | Total amount of credit required |
| calculatedOffer.totalChargesPayable.amountGBP | Total amount of charges payable during finance period |
| calculatedOffer.totalAmountPayable.amountGBP | Total amount payable during finance period |
| calculatedOffer.representativeAPR | Value of APR |
| calculatedOffer.fixedRateOfInterestPerAnnum | Fixed rate of interest per year |
| calculatedOffer.optionalFinalPayment.amountGBP | Option Final Payment to own the vehicle |
| calculatedOffer.optionToPurchaseFee.amountGBP | Fee to purchase the vehicle at end of finance term |
| calculatedOffer.lender | Name of Lender |
| calculatedOffer.excessCostPencePerMile | Cost per mile if over annual mileage |
| calculatedOffer.orderedFrom | Order from date for the finance offer to be applicable |
| calculatedOffer.orderedBy | Order by date for the finance offer to be applicable |
| calculatedOffer.registeredBy | Registered by date for the finance offer to be applicable |
| calculatedOffer.startDate | Start date for the finance offer to be applicable |
| calculatedOffer.endDate | End date for the finance offer to be applicable |

## Highlights

```
GET /search&advertiserId=123456

```

A successful response looks like this:

```
{
  "highlights": [
    {
      "name": "Features Valuable"
    }
  ],
  "features": [
    {
      "name": "18in Alloy Wheels",
      "type": "Standard",
      "standardName": "18in Alloy Wheels",
      "category": "Exterior",
      "rarityRating": null,
      "valueRating": "High Value"
    }
  ]
}
```

When viewing a search list, the highlights object will return Co-Driver derived Vehicle Highlights unique characteristics of a vehicle. A stock item can include up to a maximum of 3 highlights.

The vehicle Highlights are derived from multiple sources of information that will be available in the stock record itself, such as technical data or features.

Linking Vehicle Highlights to specific features

Where a returned highlight corresponds to a specific vehicle feature, clients can view the`rarityRating` and/or`valueRating` fields to accurately link to vehicle highlights that are Features Rare and Features Valuable respectively.

More information about the using Vehicle Highlights in your application, with examples and downloadable assets, can be found here: [Vehicle Highlights](https://developers.autotrader.co.uk/images/resource/Vehicle%20Highlights%20Guide%20and%20Assets.zip)

## Taxonomy Features

```
GET /search/{searchId}/features?advertiserId=1234

```

A successful response looks like this: :

```
{
  "features": [
    {
      "name": "1.2L Storage Shelf Above Glovebox",
      "genericName": "Storage - Miscellaneous",
      "type": "Standard",
      "category": "Interior",
      "basicPrice": 0.0,
      "vatPrice": 0.0,
      "factoryCodes": [
        
      ],
      "rarityRating": null,
      "valueRating": null
    },
    {
      "name": "Urban Grey",
      "genericName": "Grey",
      "type": "Optional",
      "category": "Paint",
      "basicPrice": 458.33,
      "vatPrice": 91.67,
      "factoryCodes": [
        "KQA",
        "TEKQA"
      ],
      "rarityRating": null,
      "valueRating": null,
      "genericFinish": "Metallic",
      "finish": "Metallic"
    }
  ]
}
```

Alongside the features saved against a given stock record, it is possible to access the available features from our vehicle taxonomy. This requires the stock record to have a derivativeId set.

## Electric Vehicle Charge Times

```
GET /search/{searchId}/charge-times?advertiserId=1234

```

A successful response looks like this:

```
{
  "vehicle": {
    ...
  },
  "chargeTimes": [
    {
      "chargerType": "Fast Charge",
      "chargerDescription": "22 kW",
      "chargerSupplyType": "AC Three Phase",
      "connectorType": "Type 2",
      "startBatteryPercentage": 0,
      "endBatteryPercentage": 100,
      "durationMinutes": 210
    },
    {
      ...
    }
  ]
}
```

If the vehicle is Electric then charge times can be returned by visiting the sub resource.

| Property | Description |
| --- | --- |
| chargerType | The classification of charger e.g. Home or Ultra |
| chargerDescription | Power rating of charger |
| chargerSupplyType | The connection type to mains grid of charger |
| connectorType | The connector type between charger and vehicle |
| startBatteryPercentage | Start charge percentage of battery |
| endBatteryPercentage | End charge percentage of battery |
| durationMinutes | Duration of the charge in minutes |

## Competitors

By including the parameter competitor=true in the vehicles API you will get a pre-constructed URL in your response which will allow you to assess the market competition for the vehicle on Autotrader.

Searching Competitor Adverts

By using the URL returned with the competitors=true parameter, you are able to cultivate a list of competitor vehicles to review.

When using this parameter you are only permitted to use a maximum page size of 20 and paginate up to 10 pages, giving you up to a total of 200 vehicles. You can adjust the filters and sort order according to your own specifications.

```
"https://api.autotrader.co.uk/search?advertiserId=12345&&minPlate=67&maxPlate=67&standardMake=Volkswagen&standardModel=Passat&standardTrim=SE%20Business&minEnginePowerBHP=140&maxEnginePowerBHP=156&standardTransmissionType=Manual&standardFuelType=Diesel&standardBodyType=Estate&standardDrivetrain=Front%20Wheel%20Drive&doors=5&minBadgeEngineSizeLitres=2.0&maxBadgeEngineSizeLitres=2.0"

```

# Valuations API

Sandbox environment:

```
https://api-sandbox.autotrader.co.uk/valuations

```

Production environment:

```
https://api.autotrader.co.uk/valuations

```

A successful post request to get a valuation looks like this:

```
POST /valuations?advertiserId=123456

```

```
{
  "vehicle": {
    "derivativeId": "ABC1234DEF",
    "firstRegistrationDate": "2013-03-30",
    "odometerReadingMiles": 14122
  }
}
```

A successful response looks like this:

```
{
  "valuations": {
    "trade": {
      "amountGBP": 2217,
      "amountExcludingVatGBP": null,
      "amountNoVatGBP": null
    },
    "partExchange": {
      "amountGBP": 2120,
      "amountExcludingVatGBP": null
    },
    "retail": {
      "amountGBP": 4007,
      "amountExcludingVatGBP": null,
      "amountNoVatGBP": null
    },
    "private": {
      "amountGBP": 3100
    }
  }
}
```

This resource is used to produce vehicle valuations based on a valid VRM lookup response from the vehicles resource.

The response is in the same structure as described in Valuations in the Vehicle API.

In order to retrieve a valuation for a valid vehicle, a subsequent POST will need to be sent containing the below

| Parameter | Description | Example |
| --- | --- | --- |
| derivativeId | The derivative ID provided via our VRM lookup service on the "vehicles" endpoint | "01234564890ABCDEF1234" |
| firstRegistrationDate | firstRegistrationDate provided via our VRM lookup service on the "vehicles" endpoint | "2015-07-23" |
| odometerReadingMiles | odometerReadingMiles (Mileage) of the vehicle you are looking to value | 50000 |

More information about the usage of Valuations, with examples and downloadable assets can be found here: [Valuations Guide](https://developers.autotrader.co.uk/images/resource/Valuation%20Assets.zip)

## With Price Indicator Rating

```
{
  "vehicle": {
    "derivativeId": "9f46a95611bb42aa8e0750b6b673351a",
    "firstRegistrationDate": "2024-03-30",
    "odometerReadingMiles": 14122
  },
  "adverts": {
    "retailAdverts": {
      "price": {
        "amountGBP": 14817
      }
    }
  }
}
```

A successful response looks like this:

```
{
  "valuations": {
    "trade": {
      "amountGBP": 19204,
      "amountExcludingVatGBP": null,
      "amountNoVatGBP": null
    },
    "partExchange": {
      "amountGBP": 19105,
      "amountExcludingVatGBP": null,
      "amountNoVatGBP": null
    },
    "retail": {
      "amountGBP": 22121,
      "amountExcludingVatGBP": null,
      "amountNoVatGBP": null,
      "priceIndicatorRating": "LOW",
      "priceIndicatorRatingBands": {
        "LOW": {
          "from": 1500,
          "to": 21015
        },
        "GREAT": {
          "from": 21015,
          "to": 21679
        },
        "GOOD": {
          "from": 21679,
          "to": 22785
        },
        "FAIR": {
          "from": 22785,
          "to": 23891
        },
        "HIGH": {
          "from": 23891,
          "to": 70000
        }
      }
    },
    "private": {
      "amountGBP": 20020
    }
  }
}
```

The priceIndicatorRating can be requested by setting the total retail price in the payload it will then be returned in the retail section of the response.

## Adjusting with features

A successful post including features looks like this:

```
POST /valuations?advertiserId=123456 HTTP/1.1

```

```
{
  "vehicle": {
    "derivativeId": "c1ABC1231651635wxb",
    "firstRegistrationDate": "2014-09-08",
    "odometerReadingMiles": 8000
  },
  "features": [
    {
      "name": "60/40 Split Back and Fixed Cushion"
    },
    {
      "name": "Air Conditioning - Manual"
    },
    {
      "name": "DAB Radio/CD and Ford SYNC"
    },
    {
      "name": "16in 12 - Spoke Alloy Wheels"
    }
  ]
}
```

It is possible to adjust the Valuation data returned by supplying vehicle specific Features:

| Parameter | Description |
| --- | --- |
| features | Include an array of features for the vehicle you are attempting to value. This will need to be a list of all features for the vehicle. If the features list passed is an empty array, base valuation for the model will be returned. If the attribute 'features' is not passed, market value of the vehicle is returned |

The resulting response payload from this endpoint will contain the same data as the Valuations object within the Vehicle endpoint

## Adjusting with condition ratings

A successful post including features looks like this:

```
POST /valuations?advertiserId=123456 HTTP/1.1

```

```
{
  "vehicle": {
    "derivativeId": "c1ABC1231651635wxb",
    "firstRegistrationDate": "2014-09-08",
    "odometerReadingMiles": 8000
  },
  "conditionRating": "Good"
}
```

Vehicle valuations can be adjusted for condition by supplying a condition rating in the post request.

There are 5 condition ratings in total with acceptable values being in descending order of Excellent, Great, Good, Fair and Poor.

Please note that condition adjustment is only available for cars and that only Private, Trade and Part Exchange Valuations can be adjusted for condition. Retail valuations are always provided on the basis the vehicle is in retail standard condition.

Condition ratings are relative for the age of the vehicle as vehicles generally deteriorate over time.

The table below is a guide to the condition rating and how they apply over time.

| Rating | Up to 2 year old | 5 years old | 10 years old |
| --- | --- | --- | --- |
| Excellent | The exterior may require minor paintwork repair. A minor part replacement or general maintenance may also be required. The interior is clean with no damage and only a minor valet may be needed. | The exterior may require minor paintwork repairs. Minor parts may need replacing with some general maintenance required. The interior is clean and shows less than expected levels of wear and tear for the vehicles age. Minor cosmetic repairs and a valet may be needed. | The exterior may require a body shop repair. Part replacements and maintenance are also required. The interior is clean and shows less than expected levels of wear and tear for the vehicles age. Cosmetic repairs and a valet may be needed. |
| Great | The exterior may have minor damage such as a small dent or paint chip and may also need polishing. Minor parts may need replacing with some general maintenance required. The interior condition has been well maintained but may require a minor cosmetic repair and a minor valet. | The exterior may have minor damage that may need a body shop repair. Minor part replacements and general maintenance are expected. The interior condition has been well maintained and shows less than expected levels of wear and tear for the vehicles age with minor cosmetic repairs and a valet required. | The exterior may have minor damage that requires minor body shop repairs with replacement parts and general maintenance also needed. The interior condition has been well maintained and shows less than expected levels of wear and tear for the vehicles age with cosmetic repairs and a valet required. |
| Good | The exterior has some damage with minor dents or paint chips that require repair and may also need polishing. Minor parts need replacing, and general maintenance is required. The interior condition has been maintained but requires some cosmetic repairs and a valet. | The exterior has damage and requires body shop repairs. Parts need replacing, and general maintenance is required. The interior condition has been maintained and shows expected levels of wear and tear for the vehicles age with cosmetic repairs and a valet required. | The exterior has damage and requires multiple body shop repairs. Parts need replacing, and general maintenance is required. The interior condition has been maintained and shows expected levels of wear and tear for the vehicles age with cosmetic repairs and a valet required. |
| Fair | The exterior has damage and requires body shop repairs. Parts need replacing, and general maintenance is required. The interior condition is dirty, requires cosmetic repairs and a major valet. | The exterior has damage and requires multiple body shop repairs. Parts need replacing, and general maintenance is required. The interior condition is damaged or dirty, requires numerous cosmetic repairs and a major valet. | The exterior has damage and requires extensive body shop repairs. Numerous parts need replacing, and significant maintenance is required. The interior condition is damaged or dirty, requires numerous cosmetic repairs and a major valet. |
| Poor | The exterior has excessive damage for the vehicles age and requires multiple body shop repairs. Numerous parts need replacing, and significant maintenance is required. The interior condition is damaged or dirty, requires replacement parts, numerous cosmetic repairs and a major valet. | The exterior has excessive damage for the vehicles age and requires extensive body shop repairs. Numerous parts need replacing, and significant maintenance is required. The interior condition is damaged or dirty, requires replacement parts, numerous cosmetic repairs and a major valet. | The exterior has excessive damage for the vehicles age and requires extensive body shop repairs. Numerous parts need replacing, and significant restoration work is required. The interior condition is damaged or dirty, requires replacement parts, numerous cosmetic repairs and a major valet. |

The resulting response payload from this endpoint will contain the same data as the Valuations object within the Vehicle endpoint.

## Trended Valuations

Sandbox environment :

```
https://api-sandbox.autotrader.co.uk/valuations/trends

```

Production environment :

```
https://api.autotrader.co.uk/valuations/trends

```

A successful post looks like this:

```
POST /valuations/trends?advertiserId=123456 HTTP/1.1

```

```
{
  "vehicle": {
    "firstRegistrationDate": "2018-09-17",
    "derivativeId": "3ea2c0b008984d1ca5775fa252773d8b"
  },
  "conditionRating": "GOOD",
  "features": [
    {
      "name": "Convenience Pack"
    }
  ],
  "valuations": {
    "markets": [
      "retail",
      "private",
      "trade",
      "partExchange"
    ],
    "frequency": "month",
    "start": {
      "date": "2025-12-01",
      "odometerReadingMiles": 20000
    },
    "end": {
      "date": "2026-04-20",
      "odometerReadingMiles": 30000
    }
  }
}
```

A successful response looks like this:

```
{
  "valuations": [
    {
      "date": "2025-12-01",
      "odometerReadingMiles": 20000,
      "retail": {
        "amountGBP": null,
        "amountExcludingVatGBP": 31061,
        "amountNoVatGBP": 35082
      },
      "private": {
        "amountGBP": null,
        "amountExcludingVatGBP": null
      },
      "trade": {
        "amountGBP": null,
        "amountExcludingVatGBP": 26991,
        "amountNoVatGBP": 28989
      },
      "partExchange": {
        "amountGBP": null,
        "amountExcludingVatGBP": 26856,
        "amountNoVatGBP": 28844
      }
    },
    {
      "date": "2026-01-01",
      "odometerReadingMiles": 22214,
      "retail": {
        "amountGBP": null,
        "amountExcludingVatGBP": 30187,
        "amountNoVatGBP": 34442
      },
      "private": {
        "amountGBP": null,
        "amountExcludingVatGBP": null
      },
      "trade": {
        "amountGBP": null,
        "amountExcludingVatGBP": 26231,
        "amountNoVatGBP": 28173
      },
      "partExchange": {
        "amountGBP": null,
        "amountExcludingVatGBP": 26100,
        "amountNoVatGBP": 28032
      }
      ...]
    }
```

This resource is used to produce a trended series of vehicle valuations which can include historic, current and future valuations.

A historic valuation is the valuation of a vehicle on Autotrader on a particular date in the past.

A future valuation is a predicted value of a vehicle on a particular date in the future.

In order to retrieve the trend for a valid vehicle, a POST will need to be sent containing the below

| Parameter | Description | Example |
| --- | --- | --- |
| derivativeId | The derivative ID provided via our vehicle lookup or from navigating using taxonomy | 5fbf168eb62844ee9c0ce970a0e08acd |
| firstRegistrationDate | firstRegistrationDate found as described above | 2018-03-30 |
| conditionRating | The condition that the vehicle is in (no impact on RETAIL valuations). One of: ["EXCELLENT", "GREAT", "GOOD", "FAIR", "POOR"] | "GOOD" |
| features | Pass a list for features in an array for feature adjusted value. Passing an empty array of features will lead to the base valuation and not passing features will return back market value | `[{"name": "Convenience Pack"}, {"name": "Alloy Wheels"}]` |
| valuations | A block containing the various parameters describing the set of valuations you are requesting. | see below |

The valuations block describes the trend line you are requesting. By providing a`start` and`end` point, we will interpolate points in between assuming a linear mileage rate. If you want a constant mileage, simply supply equal values for both the start and end mileage.

| Parameter | Description | Example |
| --- | --- | --- |
| markets | A list of the markets for which you want valuations. At least one of: ["retail", "trade", "partExchange", "private"] | ["retail", "private"] |
| frequency | The rate at which you want us to produce points. One of: ["day", "week", "month", "quarter", "year"] | "month" |
| start | A block containing the date & mileage at the start of the range. Start date must be before end date, and within six months of today. | `{"date": "2023-09-01", "odometerReadingMiles": 20000}` |
| end | A block containing the date & mileage at the end of the range. End date must be after start date, and within six months of today. | `{"date": "2024-04-20", "odometerReadingMiles": 21000}` |

The range we return will always include the start and end points you have given. It will also include "today" providing that today is between those start and end dates. The difference between each point (except for "today") will be the frequency you have asked for, beginning from the start date. For example, with a start date of`2023-09-01` and a weekly frequency, you will get points for`2023-09-01`,`2023-09-08`,`2023-09-15` etc.

The response object will either have a list of points with the key`valuations`, or a list of error messages with the key`messages`. It is possible to get a 200 OK status code but still have error messages. The content of the messages will inform you as to why we could not process the request. See the Error Handling section for more.

If the valuations block is present, it will contain a list of all the points in the range you requested. Each point has the date and mileage we have used, and then further blocks for each requested valuation market. A valuation will either be provided including VAT for a Car or excluding VAT and No VAT for a Van, not both. If`amountGBP` is populated,`amountExcludingVatGBP` and`amountNoVatGBP` will be null, and vice versa. Every market you requested will have a block, even if we have been unable to calculate a valuation. In that case,`amountGBP`,`amountGBPExcludingVat` and`amountNoVatGBP` fields will be`null`.

## Valuation or Vehicle Metrics Unavailable

There are scenarios where we may be unable to return a valuation for a specific vehicle.

The cause for these can be:-

- The vehicle is a car and is over 15 years old
- The vehicle is a van and is over 10 years old
- The vehicle is imported into the UK
- The vehicle is Rare, Classic or an Unusual Model
- The vehicle is non car or van (e.g. caravans or trucks)
- The vehicle has only been registered recently or has a personalised number plate in transition

# Historic Valuations API

Sandbox environment:

```
https://api-sandbox.autotrader.co.uk/historic-valuations

```

Production environment:

```
https://api.autotrader.co.uk/historic-valuations

```

A successful post looks like this:

```
POST /historic-valuations?advertiserId=123456 HTTP/1.1

```

```
{
  "vehicle": {
    "derivativeId": "5fbf168eb62844ee9c0ce970a0e08acd",
    "firstRegistrationDate": "2018-03-30",
    "historicOdometerReadingMiles": 14122
  },
  "historicValuationDate": "2021-01-20"
}
```

A successful response when the vehicle's valuation includes VAT looks like this:

```
{
  "historicValuations": {
    "trade": {
      "amountGBP": 4293,
      "amountExcludingVatGBP": null,
      "amountNoVatGBP": null
    },
    "retail": {
      "amountGBP": 5536,
      "amountExcludingVatGBP": null,
      "amountNoVatGBP": null
    }
  }
}
```

A successful response when the vehicle's valuation does not include VAT looks like this:

```
{
  "historicValuations": {
    "trade": {
      "amountGBP": null,
      "amountExcludingVatGBP": 3578,
      "amountNoVatGBP": 3712
    },
    "retail": {
      "amountGBP": null,
      "amountExcludingVatGBP": 4613,
      "amountNoVatGBP": 4817
    }
  }
}
```

This resource is used to produce historic vehicle valuations based on a valid VRM lookup response from the vehicles resource.

A historic valuation is the value we determined for a vehicle on a particular date in the past.

In order to retrieve a historic valuation for a valid vehicle, a POST will need to be sent containing the below

| Parameter | Description | Example |
| --- | --- | --- |
| derivativeId | The derivative ID provided via our vehicle lookup or from navigating using taxonomy | 5fbf168eb62844ee9c0ce970a0e08acd |
| firstRegistrationDate | firstRegistrationDate found as described above | 2018-03-30 |
| historicValuationDate | The historic date for which you want to know the value of the vehicle. Must be before today, no more than 1460 days in the past, and no more than fifteen years after the plate end date | 2021-01-20 |
| historicOdometerReadingMiles | The mileage reading of the vehicle on historicValuationDate. Must be no greater than 200,000 | 14122 |

A valuation will either be provided including VAT or excluding VAT, not both. If amountGBP is populated, amountExcludingVatGBP will be null, and vice versa.

# Future Valuations API

Sandbox environment :

```
https://api-sandbox.autotrader.co.uk/future-valuations

```

Production environment :

```
https://api.autotrader.co.uk/future-valuations

```

A successful post looks like this:

```
POST /future-valuations?advertiserId=123456 HTTP/1.1

```

```
{
  "vehicle": {
    "derivativeId": "5fbf168eb62844ee9c0ce970a0e08acd",
    "firstRegistrationDate": "2018-03-30",
    "futureOdometerReadingMiles": 14122
  },
  "futureValuationDate": "2025-01-20"
}
```

A successful response when the vehicle's valuation includes VAT looks like this:

```
{
  "futureValuations": {
    "trade": {
      "amountGBP": 4293,
      "amountExcludingVatGBP": null
    },
    "retail": {
      "amountGBP": 5536,
      "amountExcludingVatGBP": null
    }
  }
}
```

A successful response when the vehicle's valuation does not include VAT looks like this:

```
{
  "futureValuations": {
    "trade": {
      "amountGBP": null,
      "amountExcludingVatGBP": 3976,
      "amountNoVatGBP": null
    },
    "retail": {
      "amountGBP": null,
      "amountExcludingVatGBP": 5536,
      "amountNoVatGBP": null
    }
  }
}
```

This resource is used to produce future vehicle valuations based on a valid VRM lookup response from the vehicles resource.

A future valuation is a predicted value of a vehicle on a particular date in the future.

In order to retrieve a future valuation for a valid vehicle, a POST will need to be sent containing the below

| Parameter | Description | Example |
| --- | --- | --- |
| derivativeId | The derivative ID provided via our vehicle lookup or from navigating using taxonomy | 5fbf168eb62844ee9c0ce970a0e08acd |
| firstRegistrationDate | firstRegistrationDate found as described above | 2018-03-30 |
| futureValuationDate | The future date for which you want to know the value of the vehicle. Must be after today, no more than six years in the future, and no more than fifteen years after the plate end date | 2025-01-20 |
| futureOdometerReadingMiles | Estimated mileage of the vehicle on futureValuationDate. Must be no greater than 200,000 | 14122 |

A valuation will either be provided including VAT for a Car or excluding VAT and No VAT for a Van, not both. If`amountGBP` is populated,`amountExcludingVatGBP` and`amountNoVatGBP` will be null, and vice versa.

# Vehicle Metrics API

Sandbox environment:

```
https://api-sandbox.autotrader.co.uk/vehicle-metrics

```

Production environment:

```
https://api.autotrader.co.uk/vehicle-metrics

```

A successful standard post looks like this:

```
POST /vehicle-metrics?advertiserId=123456

```

```
{
  "vehicle": {
    "derivativeId": "ABC1234DEF",
    "firstRegistrationDate": "2013-03-30",
    "odometerReadingMiles": 14122
  }
}
```

This resource is used to produce vehicle metrics based on a valid VRM lookup response from the vehicles resource.

In order to retrieve vehicle metrics for a valid vehicle, a subsequent POST will need to be sent containing the below

| Parameter | Description | Example |
| --- | --- | --- |
| derivativeId | The derivative ID provided via our VRM lookup service on the "vehicles" endpoint | "01234564890ABCDEF1234" |
| firstRegistrationDate | firstRegistrationDate provided via our VRM lookup service on the "vehicles" endpoint | "2015-07-23" |
| odometerReadingMiles | odometerReadingMiles (Mileage) of the vehicle you are looking to value | 50000 |

It is possible to adjust the metrics data returned by supplying vehicle specific price with optional feature adjustment, specific location or the location of an Advertiser:

| Parameter | Description |
| --- | --- |
| advertiserId | adding multiple ids will return adjusted vehicle metrics based on their locations. Example shown here. |
| locations | include the Locations field supplying the Latitude and Longitude for the desired Location. Example shown here. |
| price | include the advertised price to adjust the days to sell value. Example shown here. |
| vatStatus | include the vatStatus to adjust the days to sell value for commercial vehicles. Example shown here. |
| features | include an array of features for the vehicle you are attempting to retrieve a price adjusted days to sell metric. here |
| saleTarget | include a saleTarget object to obtain the confidence of sale on the various days you supply. here |

A successful post including multiple Advertiser Ids looks like this:

```
POST /vehicle-metrics?advertiserId=123456 HTTP/1.1

```

```
{
  "vehicle": {
    "derivativeId": "c1ABC1231651635wxb",
    "firstRegistrationDate": "2014-09-08",
    "odometerReadingMiles": 8000
  },
  "locations": [
    {
      "advertiserId": "10000056"
    },
    {
      "advertiserId": "10000057"
    }
    ...
  ]
}
```

A successful response looks like:

```
{
  ...
  "locations": [
    {
      "advertiserId": "2121404",
      "rating": {
        "value": 57.86
      },
      "daysToSell": {
        "value": 34.0
      }
    },
    {
      "advertiserId": "5066",
      "rating": {
        "value": 54.64
      },
      "daysToSell": {
        "value": 35.0
      }
    }
  ]
}
```

It’s possible to return locally adjusted vehicle metrics for multiple advertiser locations by including the relevant advertiserId:

| Parameter | Description |
| --- | --- |
| advertiserId | adding one or multiple ids in a list will return adjusted vehicle metrics based on each of their locations. |

The response contains the same metrics data points as on the vehicle metrics response with a location specific rating and days to sell value for each requested.

### Adjusting with multiple Locations

A successful post including multiple Locations looks like this:

```
POST /vehicle-metrics?advertiserId=123456 HTTP/1.1

```

```
{
  "vehicle": {
    "derivativeId": "c1ABC1231651635wxb",
    "firstRegistrationDate": "2014-09-08",
    "odometerReadingMiles": 8000
  },
  "locations": [
    {
      "latitude": "53.257999",
      "longitude": "-3.442000"
    },
    {
      "latitude": "55.540001",
      "longitude": "-4.660000"
    }
  ]
}
```

A successful response

```
{
  ...
  "locations": [
    {
      "latitude": 53.257999,
      "longitude": -3.442,
      "rating": {
        "value": 69.54
      },
      "daysToSell": {
        "value": 37.6
      }
    },
    {
      "latitude": "55.540001",
      "longitude": "-4.660000",
      "rating": {
        "value": 98.44
      },
      "daysToSell": {
        "value": 24.9
      }
    },
    {
      "latitude": "53.257999",
      "longitude": "-3.442000",
      "rating": {
        "value": 96.61
      },
      "daysToSell": {
        "value": 26.7
      }
    }
  ]
}
```

It’s possible to return locally adjusted vehicle metrics for multiple locations by including the relevant latitudes & longitudes:

| Parameter | Description |
| --- | --- |
| locations | Include the location field supplying the Latitude and Longitude in a list called "locations" for the desired location. We allow for up to 20 locations per request |

The resulting response from this endpoint contains the same metrics data points as on the vehicle metrics response with a location specific rating and days to sell value for each requested.

### Price adjusted days to sell

A successful post including a retail price looks like this:

```
POST /vehicle-metrics?advertiserId=123456

```

```
{
  "vehicle": {
    "derivativeId": "606fde50d86d4c538432deeada0e5f9d",
    "firstRegistrationDate": "2019-03-01",
    "odometerReadingMiles": 16700
  },
  "adverts": {
    "retailAdverts": {
      "price": {
        "amountGBP": 10498
      }
    }
  }
}
```

A successful post including a retail price and features to adjust for looks like this:

```
POST /vehicle-metrics?advertiserId=123456

```

```
{
  "vehicle": {
    "derivativeId": "606fde50d86d4c538432deeada0e5f9d",
    "firstRegistrationDate": "2019-03-01",
    "odometerReadingMiles": 16700
  },
  "features": [
    {
      "name": "60/40 Split Back and Fixed Cushion"
    },
    {
      "name": "Air Conditioning - Manual"
    },
    {
      "name": "DAB Radio/CD and Ford SYNC"
    },
    {
      "name": "16in 12 - Spoke Alloy Wheels"
    }
  ],
  "adverts": {
    "retailAdverts": {
      "price": {
        "amountGBP": 10498
      }
    }
  }
}
```

A successful response looks like:

```
{
  "vehicleMetrics": {
    "retail": {
      "supply": {
        "value": 0.26
      },
      "demand": {
        "value": 0.5
      },
      "marketCondition": {
        "value": 0.19
      },
      "rating": {
        "value": 76.1
      },
      "daysToSell": {
        "value": 41.3
      }
    }
  }
}
```

You can include a retail price to change the price position used in order to view a price adjusted days to sell.

Without the below parameter, your days to sell is worked out on the basis that the vehicle has a price that is the same as the retail valuation (at a 100% price position).

For commercial vehicles, vatStatus parameter can be included to calculate the days to sell. If this is not provided the price will assume to be excludingVAT. Accepted values will be`No VAT` or`Ex VAT`

It is possible to adjust the Valuation data returned by supplying vehicle specific features and/or Condition and also adjust the Vehicle Metrics returned by supplying a specific location :

| Parameter | Description |
| --- | --- |
| adverts.retailAdverts.price.amountGBP | Include a retail price in order to retrieve price adjusted days to sell data |
| features | include an array of features for the vehicle you are attempting to retrieve a price adjusted days to sell metric. The feature adjustment will adjust the vehicles 100% price position, which will influence the resultant price adjusted days to sell metric. This will need to be a list of all features for the vehicle. |

The resulting response from this endpoint contains the same metrics data points as on the vehicles metrics response with the daysToSell metric adjusted to reflect the supplied retail price.

### Confidence of Sale

A successful post including a sale target looks like this:

```
POST /vehicle-metrics?advertiserId=123456

```

```
{
  "vehicle": {
    "derivativeId": "c1ABC1231651635wxb",
    "firstRegistrationDate": "2014-09-08",
    "odometerReadingMiles": 8000
  },
  "saleTarget": {
    "daysInStock": 3,
    "targetDaysToSell": [
      {
        "days": 2
      },
      {
        "days": 5
      },
      {
        "days": 30
      },
      {
        "days": 40
      },
      {
        "days": 375
      }
    ]
  }
}
```

A successful response looks like:

```
{
  "vehicleMetrics": {
    "retail": {
      "supply": {
        "value": 0.26
      },
      "demand": {
        "value": 0.5
      },
      "marketCondition": {
        "value": 0.19
      },
      "rating": {
        "value": 76.1
      },
      "daysToSell": {
        "value": 41.3
      },
      "confidenceOfSale": [
        {
          "days": 2,
          "confidenceRating": "MISSED"
        },
        {
          "days": 5,
          "confidenceRating": "LOW"
        },
        {
          "days": 30,
          "confidenceRating": "MEDIUM"
        },
        {
          "days": 40,
          "confidenceRating": "HIGH"
        },
        {
          "days": 375,
          "confidenceRating": "NO_ANALYSIS"
        }
      ]
    }
  }
}
```

If you provide locations along with a sale target, you will get a confidence of sale result for each location you provide as follows:

```
{
  ...
  "locations": [
    {
      "latitude": 53.257999,
      "longitude": -3.442,
      "rating": {
        "value": 69.54
      },
      "daysToSell": {
        "value": 37.6
      },
      "confidenceOfSale": [
        {
          "days": 2,
          "confidenceRating": "MISSED"
        },
        {
          "days": 5,
          "confidenceRating": "LOW"
        },
        {
          "days": 30,
          "confidenceRating": "MEDIUM"
        },
        {
          "days": 40,
          "confidenceRating": "HIGH"
        },
        {
          "days": 375,
          "confidenceRating": "NO_ANALYSIS"
        }
      ]
    },
    {
      "latitude": "55.540001",
      "longitude": "-4.660000",
      "rating": {
        "value": 98.44
      },
      "daysToSell": {
        "value": 24.9
      },
      "confidenceOfSale": [
        {
          "days": 2,
          "confidenceRating": "MISSED"
        },
        {
          "days": 5,
          "confidenceRating": "LOW"
        },
        {
          "days": 30,
          "confidenceRating": "MEDIUM"
        },
        {
          "days": 40,
          "confidenceRating": "HIGH"
        },
        {
          "days": 375,
          "confidenceRating": "NO_ANALYSIS"
        }
      ]
    }
  ]
}
```

It’s possible to return forecast confidence of sale ratings for a target vehicle by including the target days to sell and the days in stock.

| Property | Description |
| --- | --- |
| confidenceRating | A prediction of how likely the vehicle is to sell by a target number of days, based on the current retail price (if provided) and days the vehicle has been in stock. |

Note: It may not be possible to return data for a vehicle for a variety of reasons, see [valuation/metrics unavailable] (#valuation-unavailable)

Possible values for the confidence of sale rating are as follows:

| Value | Description |
| --- | --- |
| LOW | Low probability of sale for the given target days to sell. |
| MEDIUM | Medium probability of sale for the given target days to sell. |
| HIGH | High probability of sale for the given target days to sell. |
| MISSED | When the`daysInStock` exceeds the`targetDaysToSell`. |
| NO_ANALYSIS | When a confidenceRating cannot be calculated. |

To obtain confidence of sale, you will need to provide a sale target object in the request as follows:

| Parameter | Description |
| --- | --- |
| saleTarget.daysInStock | How many days has the specific vehicle been in stock for. This is an optional field that defaults to 0. Must not be negative if provided. |
| saleTarget.targetDaysToSell | Include an array of objects that include the target days to sell the vehicle. This is number of days since vehicle was listed in stock. This array should contain a number of items between 1 and 10, if this rule is violated you will get an error with a bad request. |

Note: Just like in the price adjusted days to sell example, you can include a retail price to change the price position used in order to get a price adjusted confidence of sale.

# Deals API

## Introduction

Sandbox environment:

```
https://api-sandbox.autotrader.co.uk/deals

```

Production environment:

```
https://api.autotrader.co.uk/deals

```

```
GET /deals?advertiserId=123456&page=1&from=2023-05-05

```

```
{
  "results": [
    {
      "dealId": "4ae0fc61-f92f-4fa6-9cd5-a8f31a2616c7",
      "advertiserId": "123456",
      "created": "2023-05-05T15:44:20.216Z",
      "lastUpdated": "2023-05-05T15:44:56.71Z",
      "advertiserDealStatus": "In Progress",
      "advertiserCancellationReason": null,
      "advertiserCancellationNotes": null,
      "consumerDealStatus": "In Progress",
      "consumerReservationFeeStatus": "Held / DEPRECATED",
      "consumerCancellationReason": null,
      "consumerCancellationNotes": null,
      "consumer": {
        "firstName": "Test",
        "lastName": "User",
        "type": null,
        "tradingName": null,
        "vatRegistrationStatus": "Unknown",
        "email": "test.user@autotrader.co.uk",
        "phone": null
      },
      "stock": {
        "stockId": "8a468e9585de69e40185df91b5d87ef9",
        "searchId": "202201237828809",
        "reservationStatus": "Reserved  / DEPRECATED"
      },
      "reservation": {
        "status": "Reserved",
        "fee": {
          "amountGBP": 99,
          "status": "Held"
        }
      },
      "price": {
        "suppliedPrice": {
          "amountGBP": 17990
        },
        "adminFee": {
          "amountGBP": 100
        },
        "totalPrice": {
          "amountGBP": 18090
        }
      },
      "buyingSignals": {
        "dealIntentScore": 100,
        "intent": "High",
        "localConsumer": true,
        "advertSaved": true,
        "preferences": {
          "bodyTypes": [
            {
              "value": "SUV",
              "rating": "Very Strong"
            },
            {
              "value": "Saloon",
              "rating": "Strong"
            }
          ],
          "colours": [
            {
              "value": "Black",
              "rating": "Very Strong"
            },
            {
              "value": "Blue",
              "rating": "Strong"
            }
          ],
          "fuelTypes": [
            {
              "value": "Petrol Hybrid",
              "rating": "Very Strong"
            },
            {
              "value": "Diesel",
              "rating": "Very Strong"
            }
          ],
          "makeModels": [
            {
              "make": "Lexus",
              "model": "UX",
              "rating": "Very Strong"
            },
            {
              "make": "Honda",
              "model": "Accord",
              "rating": "Strong"
            }
          ],
          "mileages": {
            "from": 10000,
            "to": 16000
          },
          "years": {
            "from": 2016,
            "to": 2022
          }
        }
      },
      "financeApplication": {
        "id": "26dcfa9f-d80e-4bf7-ab29-c491766e4886",
        "lastUpdated": "2024-10-03T15:27:36Z"
      },
      "partExchange": {
        "id": "87fd5f48-56bc-47f3-b5ac-f722c271687c",
        "lastUpdated": "2024-09-01T15:27:36Z"
      },
      "messages": {
        "id": "4ae0fc61-f92f-4fa6-9cd5-a8f31a2616c7",
        "lastUpdated": "2024-10-03T15:27:36Z"
      },
      "calls": {
        "id": null,
        "lastUpdated": null
      },
      "delivery": {
        "id": "4ae0fc61-f92f-4fa6-9cd5-a8f31a2616c7",
        "lastUpdated": "2024-10-01T15:27:36Z"
      }
    }
  ],
  "totalResults": 24
}
```

This API is used for managing deals on the Autotrader platform.

With this API you can :-

- List all deals for an advertiser
- Get deal and deal components information
- Create a Deal
- Reserve a Deal
- Remove Components
- Complete or cancel deal

The json to the right shows the complete deals resource with realistically populated values. The table below describes each field.

In additions to the top level field there are the following sections: -

- consumer - name and contact details for the consumer
- stock - id's to allow the stock resource to be fetched from Stock API
- price - vehicle price information at the point of deal creation
- buyingSignals - consumer signals around their intent around completing the deal
- financeApplication - the id to allow fetching any finance application information
- partExchange - the id to allow fetching of full part exchange information
- messages - the id to allow fetching, acknowledgement and reply to messages
- calls - the id to allow fetching of the calls information
- delivery - the id to allow fetching the delivery preference of the consumer

| Field | Example | Notes |
| --- | --- | --- |
| dealId | 4ae0fc61-f92f-4fa6-9cd5-a8f31a2616c7 | unique ID for the consumer deal application |
| advertiserId | 33676055 | Advertisers unique id |
| created | 2023-05-05T15:44:20.216Z | Timestamp of when the deal was created |
| lastUpdated | 2023-05-05T15:44:56.71Z | Timestamp of when the deal was last edited |
| advertiserDealStatus | Cancelled | Fixed values: In progress/Cancelled/Completed. The advertiser deal status lets you know if the deal is in progress or cancelled or completed by the advertiser. If the deal is set to cancelled, a cancellationReason must be provided. |
| advertiserCancellationReason | Unaffordable | An advertiser can cancel a deal using the following mandatory reasons: Different Vehicle, Unaffordable, Not Interested, Went Elsewhere, Not Available, Condition, Poor Customer Service, Other./td> |
| advertiserCancellationNotes | Customer interested in another vehicle | Additional text provided with cancellation reason. |
| consumerDealStatus | Cancelled | Fixed values: In progress/Cancelled/Completed. The consumer deal status lets you know if the deal is in progress or cancelled or completed by the consumer. If the deal is set to cancelled, a cancellationReason must be provided. |
| consumerReservationFeeStatus | Refunded | Fixed values for reservation fee status for consumer. Values included will be Held, Not Held or Refunded. DEPRECATED |
| consumerCancellationReason | Went Elsewhere | A consumer can cancel a deal using the following mandatory reasons: Different Vehicle, Unaffordable, Not Interested, Went Elsewhere, Not Available, Condition, Poor Customer Service, Other |
| consumerCancellationNotes | Got a better deal with a friend | Additional text provided by the consumer with cancellation reason. |
| firstName | Test | First name of the consumer who has created the deal. Please note if the deal is via a Call this will be listed as null. |
| lastName | User | Last name of the consumer who has created the deal. Please note if the deal is via a Call this will be listed as null. |
| type | Private | The type of person who is purchasing a Van. The accepted values are: Private, Limited Company or Soletrader. Unknown will appear if the stock item linked to the deal is a car |
| tradingName | Test Builders | If the deal is for a Van and for business purposes the trading name of the business purchasing the stock item. null will appear if the stock item is a car or a van but is for private use |
| vatRegistrationStatus | null | If the deal is for a van for business purposes the applicant will need to confirm if they are VAT registered. Unknown will appear if the deal is for a car or van for private use. |
| email | test.user@autotrader.co.uk | Email address for the consumer which is linked to their Autotrader account. Please note if the deal is via a Call this will be listed as null. |
| phone | 07700123xxx | Phone number of the consumer. A consumer can decide whether this information is added to a deal. If the deal is linked to a Call this will be the number used to call the retailer. |
| stockId | 8a468e9585de69e40185df91b5d87xxx | stockId of the stock item linked to the Deal. Please note that if a Deal is via a Retailer Store this may not be linked to a stock item so this will be listed as null. |
| searchId | 202201237828809 | searchId of the stock item linked to the Deal. Please note that if a Deal is via a Retailer Store this may not be linked to a stock item so this will be listed as null. |
| reservationStatus | Reserved | reservation status depicts if the stock is reserved or not. DEPRECATED |
| reservation.status | Reserved | reservation status depicts if the stock is reserved or not. Value Values is Reserved, Requested, null |
| reservation.fee.amountGBP | 99 | Value which has been held as a reservation fee. Value will be 99 or null depending on if the Deal has reserved the stock item |
| reservation.fee.status | null | Fixed values for reservation fee status for consumer. Values included will be null, Held, or Refunded |
| suppliedPrice | 3000 | Cost of the vehicle |
| adminFee | 100 | Any administration fee for processing the deal |
| totalPrice | 3100 | Total price includes supplied price and admin fee |
| buyingSignals |
| dealIntentScore | 100 | Score to indicate using the buyingSignals metrics the likelihood of the consumer completing the deal |
| intent | High | Value to identify the intent of the consumer to purchase the vehicle |
| localConsumer | true | Value to identify if the consumer location is within 30 miles of the retailer |
| advertSaved | true | Value to identify if the consumer has saved the vehicle to their Autotrader account at time of deal submission. |
| preferences.bodyTypes.value | SUV | Body type preference of the consumer across all deals the consumer has previously submitted. |
| preferences.bodyTypes.rating | Strong | Rating provides a dimension of the intent towards a given body type. Example values include Very Strong, Strong, and Moderate |
| preferences.colours.value | Black | Colour preference of the consumer across all deals the consumer has previously submitted. |
| preferences.colours.rating | Strong | Rating provides a dimension of the intent towards a given colour. Example values include Very Strong, Strong, and Moderate |
| preferences.fuelTypes.value | Black | Colour preference of the consumer across all deals the consumer has previously submitted. |
| preferences.fuelTypes.rating | Strong | Rating provides a dimension of the intent towards a given colour. Example values include Very Strong, Strong, and Moderate |
| preferences.makeModels.make | Lexus | Make preference of the consumer across all deals the consumer has previously submitted. |
| preferences.makeModels.model | UX | Model preference of the consumer across all deals the consumer has previously submitted. |
| preferences.makeModels.rating | Very Strong | Rating provides a dimension of the intent towards a given Make and Model. Example values include Very Strong, Strong, and Moderate |
| preferences.mileages.from | 10000 | Mileage range of the vehicles the consumer has been enquiring about. |
| preferences.mileages.to | 40000 | Mileage range of the vehicles the consumer has been enquiring about. |
| preferences.years.from | 2016 | Production years of the vehicles the consumer has been enquiring about. |
| preferences.years.to | 2022 | Production years of the vehicles the consumer has been enquiring about. |
| financeApplication.id | 26dcfa9f-d80e-4bf7-ab29-c491766e4887 | Finance Application Id gives details of the finance attached to the deal |
| partExchange.id | 87fd5f48-56bc-47f3-b5ac-f722c271687c | Part exchange Id gives details of the part exchange attached to the deal |
| messages.id | 4ae0fc61-f92f-4fa6-9cd5-a8f31a2616c7 | Messages Id give details of the messages exchanged for the deal. MessagesId will match the DealId. |
| calls.id | 4ae0fc61-f92f-4fa6-9cd5-a8f31a2616c7 | Calls Id give details of the call which has iniated the deal. CallsId will match the DealId. |
| delivery.id | 4ae0fc61-f92f-4fa6-9cd5-a8f31a2616c7 | delivery Id gives details of thr delivery associated with the deal. DeliveryId will match the DealId |

## List & Filter

Deals can be filtered by parameters show in the table below

| Parameter | Description |
| --- | --- |
| advertiserId | Filter stock to belong to a specific advertiser ID, e.g. https://.../deals?advertiserId=123456 |
| page | Request specific page of results, maximum number results per page will be 50. e.g. https://.../deals?page=1 |
| from | Deals which have been updated? on or after a date e.g. https://.../deals?from=2023-05-05 |
| to | Deals which have been updated? before date e.g. https://.../deals?to=2023-05-07 |

## View a Deal

```
GET /deals/4ae0fc61-f92f-4fa6-9cd5-a8f31a2616c7?advertiserId=123456

```

To view a specific Deal, you can call /deals/{dealId} which will return the specific Deal. In this Deal you will see the specific deal information, including the consumer, stock, buyer insights, and deal component details.

The dealId can be sourced via the Deal Notification webhook.

To view each specific components the following API calls should be used. To understand more about the API please click the links which will direct you to the relevant API section in the documentation.

- /messages/{messagesId}
- /finance/application/{applicationId}
- /part-exchange/{partExchangeId}
- /delivery/deliveryId}
- /calls/{callsId}

## Buying Signals

```
GET /deals/4ae0fc61-f92f-4fa6-9cd5-a8f31a2616c7?advertiserId=123456

```

```
{
  "dealId": "4ae0fc61-f92f-4fa6-9cd5-a8f31a2616c7",
  "advertiserId": "123456",
  ....
  "buyingSignals": {
    "dealIntentScore": 100,
    "intent": "High",
    "localConsumer": true,
    "advertSaved": true,
    "preferences": {
      "bodyTypes": [
        {
          "value": "SUV",
          "rating": "Very Strong"
        },
        {
          "value": "Saloon",
          "rating": "Strong"
        }
      ],
      "colours": [
        {
          "value": "Black",
          "rating": "Very Strong"
        },
        {
          "value": "Blue",
          "rating": "Strong"
        }
      ],
      "fuelTypes": [
        {
          "value": "Petrol Hybrid",
          "rating": "Very Strong"
        },
        {
          "value": "Diesel",
          "rating": "Very Strong"
        }
      ],
      "wheelbaseTypes": [
        {
          "value": "MWB",
          "rating": "Strong"
        },
        {
          "value": "LWB",
          "rating": "Very Strong"
        }
      ],
      "makeModels": [
        {
          "make": "Lexus",
          "model": "UX",
          "rating": "Very Strong"
        },
        {
          "make": "Honda",
          "model": "Accord",
          "rating": "Strong"
        }
      ],
      "mileages": {
        "from": 10000,
        "to": 16000
      },
      "years": {
        "from": 2016,
        "to": 2022
      }
    }
  }
}
```

Buying Signals are data points derived from a consumers' shopping activity on Autotrader, including their vehicle preferences and indicators of their intent on a deal

Buying Signals object includes:

- dealIntentScore - This is a value which produces the likelihood of the consumer completing the deal using their last 7 days behaviour.
- intent - Indicator of a consumers intent based on an assessment of their activity on Autotrader in last 7 days.
- localConsumer - This indicates if the consumer location is within 30 miles of the retailer.
- advertSaved - This indicates if at time of submission of the deal if the consumer has saved the advert to their Autotrader account.
- preferences - Preferences - these are indicators of a consumers preference for`bodyTypes`,`colours`,`fuelTypes`,`wheelBaseTypes`,`makeModels`,`mileages`, and`years`. These factors can be used to identify if the stock item that the deal is linked to fits the consumers preferences. In order to calculate a preference with a rating we assess the last 7 days shopping activity on Autotrader.

## Create a Deal

To create a deal the following details must be provided as part of a POST call. Once the Deal is created the Deal can be updated with Part Exchange and/or Finance Application details.

- firstName
- lastName
- email
- stockId
- advertiserId

```
POST /deals?advertiserId=123456

```

```
{
  "consumer": {
    "firstName": "John",
    "lastName": "Smith",
    "email": "johnsmith@autotradertest.co.uk"
  },
  "stockId": "8a46875790daebfb0190deea767bxxx",
  "advertiserId": "123456"
}
```

A successful response looks like:

```
{
  "dealId": "4ae0fc61-f92f-4fa6-9cd5-w8f31a2616c9"
}
```

## Reserve a Deal

```
PATCH /deals/{dealId}?advertiserId=123456

```

```
{
  "reservation": {
    "status": "Reserved"
  }
}
```

A 200 OK response is returned on success

The`reservation.status` can be updated as part of a PATCH to the /deals/{dealId}. This will mark the stock as Reserved for the specified deal (and therefore consumer) and it will also update the stock item as`Reserved`& add the id for the deal to the`reservationDealId` field on the Stock record.

[View Stock API for more details](https://developers.autotrader.co.uk/api#stock-api)

## Complete Deal

```
PATCH /deals/{dealId}?advertiserId=123456

```

```
{
  "advertiserDealStatus": "Complete"
}
```

A 200 OK response is returned on success

A deal can be completed by updating the advertiserDealStatus to Complete

## Cancel Deal

```
PATCH /deals/{dealId}?advertiserId=123456

```

```
{
  "advertiserDealStatus": "Cancelled",
  "advertiserCancellationReason": "Other",
  "advertiserCancellationNotes": "Notes"
}
```

A 200 OK response is returned on success

A deal can be cancelled by updating the advertiserDealStatus to Cancelled and providing a advertiserCancellationReason. If the advertiserDealStatus is set to Cancelled, the one of the below options must be supplied. Additional free text can be recorded in advertiserCancellationNotes.

advertiserCancellationReason values can be one of :-

- `Different Vehicle`
- `Unaffordable`
- `Not Interested`
- `Went Elsewhere`
- `Not Available`
- `Condition`
- `Poor Customer Service`
- `Other`

## Removing Deal Components

```
PATCH /deals/{dealId}?advertiserId=123456

```

```
{
  "partExchange": null
}
```

Part Exchange and Finance Application can be removed from a deal by setting them to null

# Messages API

## Introduction

Sandbox environment:

```
https://api-sandbox.autotrader.co.uk/messages

```

Production environment:

```
https://api.autotrader.co.uk/messages

```

This API is used for managing messages on a Deal created the Autotrader platform. The maximum character limit for a message is 1500 characters. To retrieve the message ID, please refer to the [Deals API](https://developers.autotrader.co.uk/api#deals-api-beta)

With this API you can :-

- List all messages on a deal
- Mark messages as read
- Reply with a new message

## Getting Messages

```
GET /messages/{messagesId}?advertiserId=123456

```

```
{
  "messagesId": "4ae0fc61-f92f-4fa6-9cd5-a8f31a2616c7",
  "consumerLastRead": "2023-05-02T18:58:39.608Z",
  "consumerLastReadStatus": "Read",
  "advertiserLastRead": "2023-05-02T18:58:54.398Z",
  "advertiserLastReadStatus": "Unread",
  "messages": [
    {
      "from": "Consumer",
      "at": "2023-04-27T13:49:46.624Z",
      "message": "I'll decide later on delivery. Please could you contact me back?"
    },
    {
      "from": "Advertiser",
      "at": "2023-05-02T18:55:26.469Z",
      "message": "I've called and left a message. Will try again after lunch."
    },
    {
      "from": "Consumer",
      "at": "2023-05-02T19:00:49.194Z",
      "message": "What time do you close tonight?"
    }
  ]
}
```

The json to the right shows the complete messages resource with realistically populated values. The table below describes each field.

| consumerLastRead | 2023-05-02T18:58:39.608Z | When the consumer read the latest messages |
| --- | --- | --- |
| consumerLastReadStatus | Read | Indicates whether the consumer has read the latest messages |
| advertiserLastRead | 2023-05-03T20:58:39.608Z | When the advertiser read the latest messages |
| advertiserLastReadStatus | Unread | Indicates whether the advertiser has read the latest messages |
| messages.from | Consumer | Sender of the message |
| messages.at | 2023-05-02T19:00:49.194Z | Date and time the message was sent |
| messages.message | Hello | Content of the message |

## Marking messages as Read

```
PATCH /messages/{messagesId}?advertiserId=123456

```

```
{
  "advertiserLastReadStatus": "Read"
}
```

A 200 OK response is returned on success

The advertiser last read and status can be updated by sending

## Send a new message

```
POST /messages?advertiserId=123456

```

```
{
  "dealId": "1a0e00aa-459b-162d-a23a-adcbb1110f04",
  "message": "The new message to send"
}
```

```
{
  "messagesId": "e00a1a0a-162d-459b-a23a-0f04adcbb111",
  "message": "The new message to send"
}
```

A 200 OK response is returned on success

A new message can be added by sending a POST with either the dealId or messagesId.

If there are no existing messages then the POST should contain dealId in the body

Messages already exist then the messagesId from the deal response should be provided

# Finance API (BETA)

## Introduction

Sandbox environment:

```
https://api-sandbox.autotrader.co.uk/finance

```

Production environment:

```
https://api.autotrader.co.uk/finance

```

This API is used for managing finance applications as part of a deal on the Autotrader Platform.

With this API you can:-

- Add a Finance Application
- View an Application
- Edit a Finance Application
- Send Quotes
- Send Proposals
- View a Proposal
- Resend Proposals
- Setting Active Proposals
- Setting Proposals as Paid Out

```
{
  "applicationId": "22f47a7d-c46a-4a5e-9e62-230f05466865",
  "status": "Approved",
  "applicant": {
    "title": "MR",
    "firstName": "Cam",
    "lastName": "Smith,",
    "email": "cam@gmail.com",
    "mobile": "0759004xxx",
    "dateOfBirth": "1989-07-18",
    "gender": "Male",
    "nationalityCode": "LTU",
    "maritalStatus": "Single",
    "drivingLicenceType": "Full",
    "changeInCircumstances": false,
    "numberOfDependants": null,
    "monthlyChildcare": {
      "amountGBP": 0
    },
    "monthlyRentOrMortgage": {
      "amountGBP": 0
    },
    "bankAccountHolderName": "C J Smith",
    "bankAccountNumber": "****5678",
    "bankSortCode": "NOT EXPOSED YET",
    "monthsAtBank": 36,
    "replacingExistingLoan": false,
    "currentAddress": {
      "buildingNameOrNumber": "7",
      "street": "Church Street",
      "town": "CANNOCK",
      "county": "STAFFORDSHIRE",
      "postcode": "WS11 1DE",
      "months": 50,
      "status": "Private Tenant"
    },
    "previousAddresses": [
      
    ],
    "currentEmployment": {
      "employerName": "Test",
      "status": "Full Time",
      "jobTitle": "Middle manager",
      "monthlyIncome": {
        "amountGBP": 4800
      },
      "months": 42,
      "buildingNameOrNumber": "3",
      "street": "Church Street",
      "town": "CANNOCK",
      "county": "STAFFORDSHIRE",
      "postcode": "WS11 1DE"
    },
    "previousEmployments": [
      
    ]
  },
  "financeTerms": {
    "productType": "HP",
    "termMonths": 24,
    "estimatedAnnualMileage": 6000,
    "cashPrice": {
      "amountGBP": 20000.0
    },
    "deposit": {
      "amountGBP": 3000.0
    },
    "partExchange": {
      "amountGBP": 0.0
    },
    "outstandingFinance": {
      "amountGBP": 0.0
    }
  },
  "consent": {
    "softCheck": "2024-03-04T13:36:24.042Z"
  }
}
```

The json to the right shows the complete finance application resource with realistically populated values. The table below describes each field.

The resource will be split into two sections:-

- applicant - information about the applicant
- financeTerms - information about the finance that is being requested.

| Field | Example | Notes |
| --- | --- | --- |
| applicationId | 22f47a7d-c46a-4a5e-9e62-230f05466865 | unique ID for the consumer deal finance application |
| status | Approved | The current status of the application. Examples include: Not Proposed / Quoted / Pending / Declined / Approved / Paid Out / Unknown / Estimated / Conditionally Approved |
| applicant | Personal information regarding the application which is proceeding with a finance application |
| title | Ms | Title of the applicant. A set of values specific values will be accepted. Eg- Mr/Mrs/Miss/Ms/Doctor/Other |
| firstName | Joe | First name of the applicant. The field will allow up to 100 characters. This value could be different to the name linked to the deal but will need to match the bank details for the finance applicant. |
| lastName | Jonas | Last Name of the applicant. The field will allow up to 100 characters. This value could be different to the name linked to the deal but will need to match the bank details for the finance applicant. |
| email | Joe@yahoo.co.uk | Email address of the application linked to email provided as part of the initial login created for the deal builder journey. |
| mobile | 07700123456 | 11 digit mobile number of the applicant starting with a 0 |
| dateOfBirth | 2000-08-22 | Date of birth of the applicant. Must follow the YYYY-MM-DD |
| gender | Male | Gender of the applicant, currently accepted values are Male or Female |
| nationalityCode | BHR | Nationality description which will then map to a specific 3 character code within the API structure. Please see the link for all the accepted [Nationality Codes](https://developers.autotrader.co.uk/images/resource/Nationality%20Codes.zip) |
| maritalStatus | Married | Set of pre-defined values indicating marital status of the applicant. These include: Single/Married/Cohabiting/Widowed/Separated/Civil Partnership/Dissolved Civil Partnership/Divorced |
| drivingLicenceType | Full | Set of predefined string values indicating the driving license the applicant holds. Values include: Full/Provisional/European/International/None/A/A2/CBT |
| changeInCircumstances | FALSE | Boolean value indicating if the applicant expects their circumstances to change over the term of the finance application. |
| numberOfDependants | 2 | Number of financial dependents of the applicant |
| monthlyChildCare | 150 | Amount that is required to cover any potential child care costs per month. |
| monthlyRentOrMortgage | 750 | Numeric value of monthly rent or mortgage payments of the applicant |
| bankAccountHolderName | J Smith | Name of applicant against their bank account |
| bankAccountNumber | ****1234 | Account number for the finance application which will be used for the payment of the vehicle. |
| bankSortCode | NOT EXPOSED IN API | Sort code for the bank account used as part of the finance application |
| monthsAtBank | 48 | Number of months with the bank with the account used for finance is being held. This value is the total number of months including years so 4 years would equal 48 months. |
| replacingExistingLoan | TRUE | Boolean value asked by specific lenders about replacing existing loan |
| buildingNameOrNumber | 7 | String value for the name or number of the building |
| street | Church street | String value for the name of the street |
| town | CANNOCK | String value for the name of the town of the applicant |
| county | STAFFORDSHIRE | String value for the name of the county of the applicant |
| postcode | WS11 1DE | Postcode of the applicant |
| months | 36 | Number of months living at current residence.This value is the total number of months including years so 4 years would equal 48 months.If the months are under 36 months additional residence details will need to be provided |
| status | Living with Family | Applicant residential status at the property where the applicant resides. Values accepted: Living With Family/Homeowner/Private Tenant/Housing Association Tenant/Council Tenant/Military Accommodation/Work Accommodation/Student Accommodation/Other |
| previousAddresses | Previous address information will only be required if the applicant has not been at current address for over 36 months |
| currentEmployment | Current employment information is required for a minimum of 3 years. |
| employerName | 0 | Name of the current employer of the applicant. If the applicants status is Retired, Homemaker, Benefits, Education, Carer the employer details are not required. |
| status | Retired | Employment status of the applicant. Values allowed are: Full Time/Part Time/Temporary Contract/Self Employed/Benefits/Education/Retired/Homemaker/Other/Carer/Armed Services |
| jobTitle | Banker | Job Title of the Applicant. Free Type field up to 100 characters |
| monthlyIncome | 3000 | Numeric value depicting monthly income of the applicant |
| months | 36 | Number of months at the current employer. This value is the total number of months including years so 4 years would equal 48 months.If the months are under 36 months additional employment details will need to be provided. |
| productType | PCP | Type of finance product selected for finance agreement. Example: HP or PCP |
| termMonths | 36 | Number of months selected for finance agreement ranging from 12 to 60 months |
| estimatedAnnualMileage | 10000 | Number of miles expected to be driven per year, ranging from 6000 to 46,000 |
| cashPrice.amountGBP | 20000 | Total amount payable for the given vehicle up to two decimal points |
| deposit.amountGBP | 0 | Amount of cash deposit to be deducted from total amount payable up to two decimal points |
| partExchange.amountGBP | 2000 | Part Exchange Offer to be deducted from the total amount payable |
| outstandingFinance.amountGBP | 1000 | Amount to be deducted from part exchange offer to settle outstanding finance agreement.Decimal values accepted till two decimal points |
| consent.softCheck | 2023-12-11T11:26:10.561Z | Value to indicate that the soft credit check has been completed. This information is recorded when the map and phone number has been captured within the finance journey. |

## Adding a Finance Application

A successful post looks like this:

```
POST /finance/applications?advertiserId=123456

```

```
{
  "dealId": "21f9f643-2251-49da-8b0a-5ee578882a30",
  "applicant": {
    "title": "MR",
    "firstName": "James",
    "lastName": "Smith",
    "email": "Jamessmith@aol.co.uk"
  },
  "financeTerms": {
    "productType": "HP",
    "termMonths": 24,
    "estimatedAnnualMileage": 6000,
    "cashPrice": {
      "amountGBP": 20000
    },
    "deposit": {
      "amountGBP": 3000
    }
  }
}
```

A successful response looks like this:

```
{
  "applicationId": "4c21a14d-e7eb-436c-bcaf-39d07c324b64",
  "status": "Not Proposed",
  "applicant": {
    "title": "MR",
    "firstName": "James",
    "lastName": "Smith",
    "email": "Jamessmith@aol.co.uk",
    "mobile": null,
    "dateOfBirth": null,
    "gender": null,
    "nationalityCode": null,
    "maritalStatus": null,
    "drivingLicenceType": null,
    "changeInCircumstances": null,
    "numberOfDependants": null,
    "monthlyChildcare": {
      "amountGBP": null
    },
    "monthlyRentOrMortgage": {
      "amountGBP": null
    },
    "bankAccountHolderName": null,
    "bankAccountNumber": null,
    "bankSortCode": "NOT EXPOSED YET",
    "monthsAtBank": null,
    "replacingExistingLoan": false,
    "currentAddress": null,
    "previousAddresses": [
      
    ],
    "currentEmployment": null,
    "previousEmployments": [
      
    ]
  },
  "financeTerms": {
    "productType": "HP",
    "termMonths": 24,
    "estimatedAnnualMileage": 6000,
    "cashPrice": {
      "amountGBP": 20000.0
    },
    "deposit": {
      "amountGBP": 3000.0
    },
    "partExchange": {
      "amountGBP": 0.0
    },
    "outstandingFinance": {
      "amountGBP": 0.0
    }
  },
  "consent": {
    "softCheck": null
  }
}
```

In order to add a finance application to a deal, send a POST request to the /applications endpoint, including at a minimum the below fields. Any additional fields can also be included as part of the initial POST request. For all available fields available to edit please see the table in View a Finance Applications.

- DealId
- Title
- First Name
- Last Name
- Email
- Product Type
- Term Months
- Estimated Annual Mileage
- Cash Price
- Deposit

Once the finance application has been added to deal the status of the finance application will be listed as Not Proposed.

## Getting Finance Application

```
GET /finance/applications/{applicationId}?advertiserId=123456

```

```
{
  "applicationId": "22f47a7d-c46a-4a5e-9e62-230f05466865",
  "status": "Approved",
  "applicant": {
    "title": "MR",
    "firstName": "Cam",
    "lastName": "Smith",
    "email": "cam@gmail.com",
    "mobile": "0759004xxx",
    "dateOfBirth": "1989-07-18",
    "gender": "Male",
    "nationalityCode": "LTU",
    "maritalStatus": "Single",
    "drivingLicenceType": "Full",
    "changeInCircumstances": false,
    "numberOfDependants": null,
    "monthlyChildcare": {
      "amountGBP": 0
    },
    "monthlyRentOrMortgage": {
      "amountGBP": 0
    },
    "bankAccountHolderName": "C J Smith",
    "bankAccountNumber": "****5678",
    "bankSortCode": "NOT EXPOSED YET",
    "monthsAtBank": 60,
    "replacingExistingLoan": false,
    "currentAddress": {
      "buildingNameOrNumber": "7",
      "street": "Church Street",
      "town": "CANNOCK",
      "county": "STAFFORDSHIRE",
      "postcode": "WS11 1DE",
      "months": 50,
      "status": "Private Tenant"
    },
    "previousAddresses": [
      
    ],
    "currentEmployment": {
      "employerName": "Test",
      "status": "Full Time",
      "jobTitle": "Middle manager",
      "monthlyIncome": {
        "amountGBP": 4800
      },
      "months": 36,
      "buildingNameOrNumber": "3",
      "street": "Church Street",
      "town": "CANNOCK",
      "county": "STAFFORDSHIRE",
      "postcode": "WS11 1DE"
    },
    "previousEmployments": [
      
    ]
  },
  "financeTerms": {
    "productType": "HP",
    "termMonths": 24,
    "estimatedAnnualMileage": 6000,
    "cashPrice": {
      "amountGBP": 20000.0
    },
    "deposit": {
      "amountGBP": 3000.0
    },
    "partExchange": {
      "amountGBP": 0.0
    },
    "outstandingFinance": {
      "amountGBP": 0.0
    }
  },
  "consent": {
    "softCheck": "2024-03-04T13:36:24.042Z"
  }
}
```

## Edit a Finance Application

A successful patch looks like this:

```
PATCH /finance/applications/{applicationId}?advertiserId=123456

```

```
{
  "dealId": "21f9f643-2251-49da-8b0a-5ee578882a30",
  "applicant": {
    "mobile": "07712652325",
    "dateOfBirth": "2000-01-01",
    "gender": "Male",
    "nationalityCode": "GBR",
    "maritalStatus": "Single"
  }
}
```

A successful response looks like this:

```
{
  "applicationId": "4c21a14d-e7eb-436c-bcaf-39d07c324b64",
  "status": "Not Proposed",
  "applicant": {
    "title": "MR",
    "firstName": "James",
    "lastName": "Smith",
    "email": "Jamessmith@aol.co.uk",
    "mobile": "07712652325",
    "dateOfBirth": "2000-01-01",
    "gender": "Male",
    "nationalityCode": "GBR",
    "maritalStatus": "Single",
    "drivingLicenceType": null,
    "changeInCircumstances": null,
    "numberOfDependants": null,
    "monthlyChildcare": {
      "amountGBP": null
    },
    "monthlyRentOrMortgage": {
      "amountGBP": null
    },
    "bankAccountHolderName": null,
    "bankAccountNumber": null,
    "bankSortCode": "NOT EXPOSED YET",
    "monthsAtBank": null,
    "replacingExistingLoan": false,
    "currentAddress": null,
    "previousAddresses": [
      
    ],
    "currentEmployment": null,
    "previousEmployments": [
      
    ]
  },
  "financeTerms": {
    "productType": "HP",
    "termMonths": 24,
    "estimatedAnnualMileage": 6000,
    "cashPrice": {
      "amountGBP": 20000.0
    },
    "deposit": {
      "amountGBP": 3000.0
    },
    "partExchange": {
      "amountGBP": 0.0
    },
    "outstandingFinance": {
      "amountGBP": 0.0
    }
  },
  "consent": {
    "softCheck": null
  }
}
```

To edit a finance application, send a PATCH request to`/applications/{applicationId}`, including dealId and the relevant application fields to be updated. It is possible to add/edit each field independently, therefore a resubmission of all fields/values is not required. Please refer to the table available in View Finance Application section to see all editable fields.

It’s also important to note that prior to moving to retrieve quotes, to minimise quotes not being returned for eligibility reasons, we advise ensuring the finance application includes the below fields:

- applicant.bankAccountHolderName
- applicant.bankAccountNumber
- applicant.bankAccountSortCode
- applicant.monthsAtBank
- applicant.employment
- applicant.currentAddress
- consent.softCheck

## Getting Quotes

A successful response looks like this:

```
POST /finance/applications/{applicationId}/quotes?advertiserId=123456

```

```
{
  "quoteId": "5f6a4ce0-8755-46a6-86d0-8b1e97cceee9_d16fefc3-5639-41ca-8027-593df5542ea8_f2b60d44-f278-4efe-8cc1-579597f0047e",
  "lender": "Lender Name",
  "lenderLogoUrl": "https://m.atcdn.co.uk/static/media/logos/eb284c3b-d996-40ab-8086-8d115ea2be07-lenderName.png",
  "lenderTerms": [
    "Credit is provided by Lender Ltd. 1 London Road, London. Lender Name is authorised and regulated by the Financial Conduct Authority in respect of agreements regulated by the Consumer Credit Act 1974. Its Authorised Firm Reference Number is 660010. Finance is subject to status, application, credit and affordability checks and is only available to UK residents aged 18 and over.",
    "Please ensure you can afford repayments for the duration of the loan before entering a credit agreement.",
    "The agreement only provides credit for the finance of the car, and cannot be used for any other purposes.",
    "You only become the owner of the vehicle when all payments under the agreement (including the ‘option to purchase fee’) have been made. You must not sell or part with possession of the vehicle until this point.",
    "This quote may change at application stage. This quote is valid today and may be withdrawn or varied at any time in the future without notice.",
    "The seller will not charge you a fee for an introduction, but will typically receive a commission from the lender (based on your credit rating). The commission received does not influence the interest rate you will pay. For questions about commission, please speak to the seller.",
    "The finance is secured against the car, if you do not keep up your repayment, steps may be taken to recover the money owed, which may include repossessions of the car. Only when all payments under the agreement have been made do you become the owner of the vehicle."
  ],
  "productType": "HP",
  "productName": "HP Tier 1 24-36",
  "eligible": true,
  "proposalRequirements": [
    {
      "message": "/application/financeTerms/termMonths - must have value in range 12 - 24"
    },
    {
      "message": "soft check results conflict with lender criteria"
    }
  ],
  "quoteRequirements": [
    
  ],
  "termMonths": 24,
  "contractLengthMonths": 24,
  "deposit": {
    "amountGBP": 4500.0
  },
  "totalPayments": {
    "amountGBP": 17566.56
  },
  "totalAmountPayable": {
    "amountGBP": 22066.56
  },
  "totalChargesPayable": {
    "amountGBP": 1908.56
  },
  "totalInterest": {
    "amountGBP": 1908.56
  },
  "monthlyRepayment": {
    "amountGBP": 731.94
  },
  "firstPayment": {
    "amountGBP": 731.94
  },
  "finalPayment": {
    "amountGBP": 731.94
  },
  "fees": [
    
  ],
  "apr": 10.0
}
```

Once a finance application has been completed, in order to retrieve personalised quotes from an advertisers’ lender panel. send a POST request to the quotes endpoint. Once quotes have been received, the finance application status will be updated to Quoted. Any eligible Lender quotes will return a quoteId.

The quote response will include up to 3 lenders that are configured within an advertisers lender panel and the details of the personalised quote, with an associated quoteId, if the applicant meets the lenders eligibility criteria. The quoteId can then be used to send a proposal.

Please Note if the quote response includes`quoteRequirements` or`proposalRequirements` this indicates that the lender requires additional applicant information in order to successfully send a new proposal to the given lender. The q`uoteRequirements` or`proposalRequirements` may be something which cannot be updated in the finance application which means the`quote` or`proposal` cannot be progressed with that lender via the API.

| Field | Example | Notes |
| --- | --- | --- |
| quoteId | 5f6a4ce0-8755-46a6-86d0-8b1e97cceee9_d16fefc3-5639-41ca-8027-593df5542ea8_f2b60d44-f278-4efe-8cc1-579597f0047e | Unique ID for the lender quote |
| lender | LenderName | Name of lender providing the quote |
| lenderLogoUrl | https://m.atcdn.co.uk/static/media/logos/eb284c3b-d996-40ab-8086-8d115ea2be07-lenderName.png | Lender image URL |
| lenderTerms | Lender specific terms and conditions. |
| productType | HP | Type of finance product selected for finance agreement. Example: HP or PCP. Please note the lender may provide a different product name to what is in the application. |
| productName | HP Tier 1 24-36 | Lender name for the product that is being quoted on. |
| proposalRequirements | /application/financeTerms/termMonths - must have value in range 12 - 24 | Additional details which are required to progress the finance application to produce a proposal |
| quotesRequirements | Additional applicant data required to produce a lender quote |
| termsMonths | 24 | Term of the finance application. |
| contractLengthMonths | 24 | Term of the finance application. |
| deposit.amountGBP | 4500 | Amount of cash deposit to be deducted from total amount payable accepted to two decimal points |
| totalPayments.amountGBP | 17566.77 | The ‘total payments’ – this is the combined total of the balance to finance and total charges payable. Whole number or decimal value till two decimal points. |
| totalAmountPayable.amountGBP | 22066.56 | The ‘total amount payable’ – this is how much you will pay overall, including the deposit and any interest and fees charged. Whole number or decimal value till two decimal points |
| totalChargesPayable.amountGBP | 1908.56 | The ‘total charges payable’ – this is the total amount of interest and fees payable to the lender during the finance agreement. Whole number or decimal value till two decimal points |
| totalInterest.amountGBP | 1908.56 | The amount of interest payable to the lender during the finance agreement. Whole number or decimal value till two decimal points |
| monthlyRepayment.amountGBP | 731.94 | The regular monthly payments you will make and how much you will pay per month to finance this vehicle. This does not include your first and final payments. Whole number or decimal value till two decimal points accepted |
| firstPayment.amountGBP | 731.94 | This is how much you will pay in your first monthly payment. Whole number or decimal value till two decimal points |
| finalPayment.amountGBP | 731.94 | This is how much you will pay in your final monthly payment. Whole number or decimal value till two decimal points |
| fees | Does the quote/proposal include any additional fees which need to be paid as part of the agreement. |
| apr | 10.0 | Yearly interest rate paid on the loan. |

## Getting Finance Proposals

```
GET /finance/applications/{applicationId}/proposals?advertiserId=123456

```

```
{
  "results": [
    {
      "proposalId": "35d969a4-a435-4673-b1de-5c798c782e4c",
      "status": "Approved",
      "lastUpdated": "2023-06-23T14:00:03Z",
      "created": "2023-06-13T11:00:43Z",
      "lender": "Lender Name",
      "productType": "HP",
      "termMonths": 60,
      "contractLengthMonths": 62,
      "estimatedAnnualMileage": 45000,
      "cashPrice": {
        "amountGBP": 19000.0
      },
      "deposit": {
        "amountGBP": 0.0
      },
      "partExchange": {
        "amountGBP": 0.0
      },
      "outstandingFinance": {
        "amountGBP": 0.0
      },
      "balanceToFinance": {
        "amountGBP": 0.0
      },
      "monthlyRepayment": {
        "amountGBP": 1000.0
      },
      "totalPayments": {
        "amountGBP": 516.0
      },
      "totalAmountPayable": {
        "amountGBP": 2750.0
      },
      "totalChargesPayable": {
        "amountGBP": 0.0
      },
      "firstPayment": {
        "amountGBP": 29758.0
      },
      "finalPayment": {
        "amountGBP": 19000.0
      },
      "residualValue": {
        "amountGBP": 5896.0
      },
      "commission": {
        "amountGBP": 5896.0
      },
      "totalInterest": {
        "amountGBP": 5896.0
      },
      "apr": 0,
      "flatRate": 0,
      "fixedRateOfInterest": 0,
      "paidOutDate": "2023-07-13",
      "active": true,
      "fees": [
        {
          "name": "Completion Fee",
          "cost": {
            "amountGBP": 50.0
          },
          "frequency": "In Final Payment",
          "type": "Document"
        }
      ],
      "conditions": [
        {
          "condition": "A stipulation"
        }
      ],
      "allowsResend": false
    }
  ]
}
```

| Field | Example | Notes |
| --- | --- | --- |
| proposalId | 35d969a4-a435-4673-b1de-5c798c782e4c | unique ID for the consumer deal proposal |
| status | Approved | The status of the specific proposal. Valid values include In progress / Declined / Approved / Broker Approved / Paid Out / Error |
| lastUpdated | 2022-11-08T13:18:40.455Z | datetime when the proposal was last updated |
| created | 2022-11-08T13:18:40.455Z | created datetime for the proposal |
| lender | Bobs Finance | Name of the lender |
| productType | PCP | Type of finance product selected for finance agreement, values include: HP or PCP |
| termMonths | 36 | Number of months selected for finance agreement, ranging from 12 to 60 |
| contractLengthMonths | 38 | Number of regular payments plus an optional final payment if applicable, ranging from 12 to 60 |
| estimatedAnnualMileage | 10000 | Number of miles expected to be driven per year ranging from 6,000 to 46,000 a year |
| cashPrice.amountGBP | 20000.0 | Total amount payable for the given vehicle. Two decimal points accepted |
| deposit.amountGBP | 500.0 | Amount of cash deposit to be deducted from total amount payable accepted till two decimal points |
| partExchange.amountGBP | 2000.0 | Amount provided for any part exchange to be deducted from the total amount payable. Whole number or upto two decimal points accepted. |
| outstandingFinance.amountGBP | 1000.0 | Amount to be deducted from part exchange offer to settle outstanding finance agreement. Whole number or two decimal points accepted |
| balanceToFinance.amountGBP | 1000.0 | Amount to be financed with the deposit and/or part exchange offer have been removed from the total price. Whole number or two decimal points accepted |
| monthlyRepayment.amountGBP | 300.0 | The regular monthly payments you will make and how much you will pay per month to finance this vehicle. This does not include your first and final payments. Whole number or decimal value till two decimal points accepted |
| totalPayments.amountGBP | 500.0 | The ‘total payments’ – this is the combined total of the balance to finance and total charges payable. Whole number or decimal value till two decimal points |
| totalAmountPayable.amountGBP | 24000.0 | The 'total amount payable' – this is how much you will pay overall, including the deposit and any interest and fees charged. Whole number or decimal value till two decimal points |
| totalChargesPayable.amountGBP | 4000.0 | The 'total charges payable' – this is the total amount of interest and fees payable to the lender during the finance agreement. Whole number or decimal value till two decimal points |
| firstPayment.amountGBP | 1000.0 | This is how much you will pay in your first monthly payment. Whole number or decimal value till two decimal points |
| residualValue.amountGBP | 10000.0 | Value of the vehicle at the financial agreement contract end date. Whole number or decimal value till two decimal points |
| commission.amountGBP | 400.0 | The commission the retailer will receive from the application. Whole number or decimal value till two decimal points |
| totalInterest.amountGBP | 2000.0 | The amount of interest payable to the lender during the finance agreement. Whole number or decimal value till two decimal points |
| apr | 5.6 | The Annual Percentage Rate (APR) is the total rate of interest charged against any funds borrowed. To calculate your APR, lenders combine the interest rate with any admin fees incurred through processing a loan. Some lenders will reduce APR if you borrow a higher amount |
| flatRate | 5.6 | The Annual Flat Rate is the fixed rate of interest charged against any funds borrowed. To calculate your Flat Rate, lenders combine the interest rate with any admin fees incurred through processing a loan |
| fixedRateOfInterest | 9.1 | The annual interest rate you will be charged just for the finance. It excludes all other charges and fees, such as admin fees or any commission. Having a fixed interest rate means that you'll pay a set amount of interest on the amount you borrow |
| paidOutDate | 2022-11-08 | Date the funds have been paid out by the lender to secure the vehicle sale |
| active | true | The proposal that has been selected to be active by the seller. An 'active proposal' status is used to identify which proposal the consumer wants to go ahead with. When the retailers mark a proposal as active, they then can progress it to a 'paid out' status. Retailers can only mark a proposal as 'active' if it has been approved by the lender. By default, the most recently-approved proposal will automatically become the 'active proposal' |
| fees.name | DOCUMENT_FEE | Valid values include;DOCUMENT_FEE / OPTION_TO_PURCHASE_FEEAt the end of the agreement the consumer have the option to purchase the vehicle from the finance company for a nominal sum, called the 'option to purchase' fee. This legally transfers ownership from the finance company to youADMIN_FEE / DOCUMENT_FEEA fee charged by the seller/lender for processing and setting up the finance agreement for the consumer. Acceptable values include: Document Fee/Admin Fee/Option to Purchase Fee/etc |
| fees.amountGBP | 100.0 | The amount charged for a given fee. Whole number or decimal value till two decimal points |
| fees.frequency | When the fee is applied to the agreement. Acceptable values include: In Final Payment/ In First Payment/ Spread/ Spread No Interest |
| fees.type | Document | At the end of the agreement the consumer have the option to purchase the vehicle from the finance company for a nominal sum, called the 'option to purchase' fee. This legally transfers ownership from the finance company to you. Acceptable strings include: DOCUMENT_FEE/OPTION_TO_PURCHASE_FEE. |
| conditions | Settlement has changed from 400.00 to 500.00 | A list of conditions, supplied by the lender, under which they are willing to fund the provided finance proposal. When these conditions are present, the proposal/application status will be Conditionally Approved |
| allowResend | false | Indicates if a lender allows for a proposal to be resent without a new proposal and hard check. |

## Send New Proposals

A successful post looks like this:

```
POST /finance/applications/{applicationId}/proposals?advertiserId=123456

```

```
{
  "quoteId": "5f6a4ce0-8755-46a6-86d0-8b1e97cceee9_c42a71ca-2a09-4dba-9415-b21df5f81a44_c6167e81-81ec-47b7-b5cc-747a3c2f6a79"
}
```

A successful response looks like this:

```
{
  "proposalId": "f4c4409e-e5dc-48a4-8afb-40e935060766",
  "lastUpdated": "2024-10-17T10:33:08Z",
  "created": "2024-10-17T10:33:08Z",
  "status": "In progress",
  "lender": "Lender",
  "productType": "HP",
  "termMonths": 24,
  "contractLengthMonths": null,
  "estimatedAnnualMileage": 8000,
  "cashPrice": {
    "amountGBP": 20000.0
  },
  "deposit": {
    "amountGBP": 3000.0
  },
  "partExchange": {
    "amountGBP": 1500.0
  },
  "outstandingFinance": {
    "amountGBP": 158.0
  },
  "balanceToFinance": {
    "amountGBP": 15658.0
  },
  "monthlyRepayment": {
    "amountGBP": null
  },
  "totalPayments": {
    "amountGBP": null
  },
  "totalAmountPayable": {
    "amountGBP": null
  },
  "totalChargesPayable": {
    "amountGBP": null
  },
  "firstPayment": {
    "amountGBP": null
  },
  "finalPayment": {
    "amountGBP": null
  },
  "residualValue": {
    "amountGBP": null
  },
  "commission": {
    "amountGBP": null
  },
  "totalInterest": {
    "amountGBP": null
  },
  "apr": 11.9,
  "flatRate": null,
  "fixedRateOfInterest": null,
  "paidOutDate": null,
  "active": false,
  "fees": [
    
  ],
  "conditions": [
    
  ],
  "allowsResend": true
}
```

In order to send a new proposal, clients would require a quoteId, and to have ensured the required application information captured, to send a POST request to the proposals endpoint.

## Updating a Proposal

A successful post looks like this:

```
POST /finance/applications/{applicationId}/proposals/{proposalId}?advertiserId=123456

```

Once a proposal has been created, it's possible to update the existing proposal by editing the application and sending a POST request to the`proposals/{proposalId}` endpoint include the quoteId in the request body.

Certain lenders allow for proposals to be resent without the need for a full new proposal being created. To identify if a lender allows to resend proposals, please use the`allowsResend` field.

## Setting Active Proposals

```
PATCH /finance/applications/{applicationId}/proposals/{proposalId}?advertiserId=123456

```

```
{
  "active": true
}
```

When more than one approved proposal exists the active proposal can be set by updating the active field.

## Setting Proposals as Paid Out

```
PATCH /finance/applications/{applicationId}/proposals/{proposalId}?advertiserId=123456

```

```
{
  "paidOutDate": "2023-07-13"
}
```

Once an approved finance proposal has been paid out by the finance lender it can be recorded by setting the paidOutDate field.

# Part Exchange API

## Introduction

Sandbox environment:

```
https://api-sandbox.autotrader.co.uk/part-exchange

```

Production environment:

```
https://api.autotrader.co.uk/part-exchange

```

This API is used for managing the part exchange as part of a deal on the Autotrader platform. To retrieve the part exchange ID, please refer to the [Deals API](https://developers.autotrader.co.uk/api#deals-api-beta)

With this API you can :-

- View details of the part exchange
- Add part exchange to a deal
- View applicable lenders to any outstanding finance
- Updating part exchange details

## Getting Part Exchange

```
GET /part-exchange/{partExchangeId}?advertiserId=123456

```

```
{
  "partExchangeId": "87fd5f48-56bc-47f3-b5ac-f722c271687c",
  "updated": "2023-04-27T13:49:46.624Z",
  "vehicle": {
    "registration": "YY12RRR",
    "make": "Ford",
    "model": "Mondeo",
    "derivative": "130 TDCI Zetec",
    "derivativeId": "7af67f955cbf4f14b8adfa3c5c1c4f9f",
    "firstRegistrationDate": "2018-04-30",
    "odometerReadingMiles": 12000,
    "colour": "White",
    "features": [
      {
        "name": "Adaptive LED Headlights with High-Beam Assistant"
      },
      {
        "name": "Drive Performance Control with ECO PRO - Comfort and Sport Modes"
      }
    ],
    "outstandingFinance": {
      "lender": "Advantage",
      "amountGBP": 5555
    },
    "modifications": "null"
  },
  "consumer": {
    "conditionRating": "Good",
    "partExchangeValuation": {
      "amountGBP": 25625,
      "expires": "2023-05-27T11:48:46.624Z"
    }
  },
  "advertiser": {
    "conditionRating": "Poor",
    "offer": {
      "amountGBP": 24900
    }
  }
}
```

The json to the right shows the complete part exchange resource with realistically populated values. The table below describes each field.

| Field | Example | Notes |
| --- | --- | --- |
| partExchangeId | f2d529b3bf8124ea8244347ffb42 | Unique id of part exchange |
| updated | 2023-04-27T13:49:46.624Z | Date and time of the last update |
| vehicle |
| registration | YY12RRR | Registration number of part exchange vehicle |
| make | Ford | Make of part exchange vehicle |
| model | Mondeo | Model of part exchange vehicle |
| derivative | 130 TDCI Zetec | Derivation of part exchange vehicle |
| derivativeId | 7af67f955cbf4f14b8adfa3c5c1c4f9f | The Autotrader derivativeId |
| firstRegistrationDate | 2018-04-30 | The date vehicle was registered in the UK at DVLA |
| odometerReadingMiles | 12000 | The current odometer reading in miles of part exchange vehicle |
| colour | 12000 | The part exchange vehicle colour |
| modifications | Full ply lining | The after market modifications identified on the part exchange vehicle.This field is valid only for commercial vehicles. |
| features | 12000 | The optional extra features identified on the part exchange vehicle |
| outstandingFinance | 2000 | The amount of outstanding finance on the part exchange vehicle |
| consumer.conditionRating | Good | The condition rating of the part exchange vehicle |
| consumer.partExchangeValuation.amountGBP | 5000 | Autotrader part exchange valuation that the consumer received |
| consumer.partExchangeValuation.expires | 2023-05-27T11:48:46.624Z | The expiry date and time of the valuation which was provided to the consumer |
| advertiser.conditionRating | Good | The condition rating of the part exchange vehicle |
| advertiser.offer.amountGBP | 4200 | The advertisers offer amount |

## Adding Part Exchange

```
POST /part-exchange?advertiserId=1234

```

```
{
  "dealId": "07fd5f48-56bc-47f3-b5ac-f722c271687b",
  "vehicle": {
    "registration": "AX23FHD",
    "odometerReadingMiles": 12000,
    "outstandingFinance": {
      "lender": "Advantage",
      "amountGBP": 5555
    }
  },
  "advertiser": {
    "conditionRating": "Poor",
    "offer": {
      "amountGBP": 24900
    }
  }
}
```

A part exchange can be added to an existing deal by providing the dealId and vehicle data in the request body. Vehicle data provided needs to support valuation, so a valid registration and an odometer reading is required.

The JSON on the right shows an example of a request body.

The response returns [part exchange data](https://developers.autotrader.co.uk/deals#getting-part-exchange)

## Settlement Lenders

```
GET /part-exchange/settlement-lenders?advertiserId=123456

```

```
{
  "settlementLenders": [
    {
      "name": "1st Stop"
    },
    {
      "name": "Motonovo"
    }
  ]
}
```

A part exchange may have outstanding finance, to update a part exchange record the list of configured settlement lenders can be fetched by

## Updating Part Exchange

```
PATCH /part-exchange/{partExchangeId}?advertiserId=123456

```

```
{
  "dealId": "07fd5f48-56bc-47f3-b5ac-f722c271687c",
  "vehicle": {
    "outstandingFinance": {
      "lender": "1st Stop",
      "amountGBP": 10
    }
  },
  "advertiser": {
    "conditionRating": "Poor",
    "offer": {
      "amountGBP": 23000
    }
  }
}
```

The part exchange can be updated setting the vehicles outstanding finance, advertiser conditionRating and/or the offer amount.

Valid values for condition rating are`Poor`,`Fair`,`Good`,`Great` and`Excellent`. See [Adjusting With Condition Ratings](https://developers.autotrader.co.uk/api#adjusting-with-condition-ratings) for more details on condition ratings.

# Delivery API

## Introduction

Sandbox environment:

```
https://api-sandbox.autotrader.co.uk/delivery

```

Production environment:

```
https://api.autotrader.co.uk/delivery

```

This API is used for managing the delivery details on a deal on the Autotrader platform.

With this API you can :-

- View details of the delivery

## Getting Delivery

```
GET /delivery/{deliveryId}?advertiserId=123456

```

```
{
  "deliveryId": "ad07cfda-4d02-4068-b7a4-9af6132311a1",
  "method": "Home Delivery",
  "postcode": "M154FN"
}
```

The json to the right shows the complete delivery resource with realistically populated values. The table below describes each field.

| Field | Example | Notes |
| --- | --- | --- |
| deliveryId | ad07cfda-4d02-4068-b7a4-9af6132311a1 | Unique Id associated with the delivery details of an item |
| method | Home delivery | Method of delivering the stock item. The following methods are supported: Home Delivery, Click and Collect, and Decide Later. |
| postcode | M154FN | Postcode of delivery/pickup |

# Calls API

## Introduction

Sandbox environment:

```
https://api-sandbox.autotrader.co.uk/calls

```

Production environment:

```
https://api.autotrader.co.uk/calls

```

This API is used for managing the call details on a deal on the Autotrader platform.

With this API you can :-

- View details of a call

## Getting a Call

```
GET /calls/{callId}?advertiserId=123456

```

```
{
  "callsId": "ad07cfda-4d02-4068-b7a4-9af6132311a0",
  "calls": [
    {
      "at": "2025-01-13T12:54:27Z",
      "status": "ANSWERED",
      "hasRecording": true,
      "durationSeconds": 14
    }
  ]
}
```

The json to the right shows the complete calls resource with realistically populated values. The table below describes each field.

| Field | Example | Notes |
| --- | --- | --- |
| callsId | ad07cfda-4d02-4068-b7a4-9af6132311a0 | Unique Id associated with the calls details/td> |
| at | 2025-01-13T12:54:27Z | The date time of the call. |
| status | ANSWERED | Status of the call. This field will have default fields of ANSWERED or NOT ANSWERED |
| hasRecording | true | Has the call be recorded which can be reviewed after the call has been completed |
| durationSeconds | 14 | Duration of the call. |

Sandbox environment:

```
https://api-sandbox.autotrader.co.uk/advertisers

```

Production environment:

```
https://api.autotrader.co.uk/advertisers

```

```
GET /advertisers?page=1&pageSize=50

```

```
{
  "results": [
    {
      "advertiserId": "11926154",
      "name": " MCR Bobs Car Sales",
      "description": "MCR Bobs Car Sales established since 2000 serving the people of Manchester",
      "status": "Good",
      "segment": "Independent",
      "website": "https://www.mcrbobscarsales.co.uk",
      "phone": "(0999) 9801317",
      "location": {
        "addressLineOne": "New Street",
        "town": "Manchester",
        "county": null,
        "region": "North West",
        "postCode": "M15 4FN",
        "latitude": 53.4721936,
        "longitude": -2.24703
      },
      "usedVehicleStrapline": "Free vehicle health check for all vehicles",
      "newVehicleStrapline": "Free test drive for 24hrs for all New vehicles",
      "capabilities": {
        "atConnect": [
          {
            "name": "Search Leasing",
            "eligible": false
          },
          {
            "name": "Stock Updates",
            "eligible": true
          },
          {
            "name": "Media Updates",
            "eligible": true
          },
          {
            "name": "Vehicle Equipment",
            "eligible": true
          },
          {
            "name": "Retail Rating",
            "eligible": true
          },
          {
            "name": "Stock List Competitor",
            "eligible": true
          },
          {
            "name": "Current Valuations",
            "eligible": true
          },
          {
            "name": "Codriver Images",
            "eligible": true
          },
          {
            "name": "Vehicle Taxonomy",
            "eligible": true
          },
          {
            "name": "Future Valuations",
            "eligible": false
          }
        ]
      }
    },
    {
      "advertiserId": "33676055",
      "name": "Freds Cars",
      "description": "Freds cars open seven days a week. First opened in 1990.",
      "status": "Good",
      "segment": "Franchise",
      "website": "https://www.fredscars.co.uk",
      "phone": "(0999) 1234567",
      "location": {
        "addressLineOne": "New Street",
        "town": "Manchester",
        "county": null,
        "region": "North West",
        "postCode": "M15 4FN",
        "latitude": 53.4721936,
        "longitude": -2.24703
      },
      "usedVehicleStrapline": "Open 9 till 5 7 days a week",
      "newVehicleStrapline": null,
      "capabilities": {
        "atConnect": [
          {
            "name": "Historic Valuations",
            "eligible": false
          },
          {
            "name": "Deal Sync",
            "eligible": true
          }
        ]
      },
      ]
      "totalResults": 2
    }
```

This API is used for getting details for advertisers.

With this API you can :-

- List all advertisers to your integration
- Get the Autotader advert allowances

The json to the right shows the complete resource with realistically populated values. The table below describes each field.

| advertiserId | 33676055 | Advertisers unique id |
| --- | --- | --- |
| name | Retailer Name | Name of advertiser |
| description | Established since 2000. | Details about the retailer |
| status | Good |
| segment | Franchise | Whether the advertiser is class as Franchise or Independent |
| website | https://www.fredscars.co.uk | Main website url |
| phone | (0999) 1234567 | Main advertising phone number |
| location | Complete address details |
| usedVehicleStrapline | Free vehicle health check for all vehicles | String appended to each of the retailers used vehicle advert descriptions |
| newVehicleStrapline | Free test drive for 24hrs for all New vehicles | String appended to each of the retailers new vehicle advert descriptions |
| capabilities |
| atConnect.name | Stock Updates | Name of the capability which provides access to certain functions with different APIs |
| atConnect.eligible | true | Identifier to see if the retailer has access to the AT Connect capability |
| pageSize | 40 | Passed as a parameter to increase/decrease the default number of entries returned which is 20. |

Specific advertisers can be filtered for providing the with parameter advertiserId=33676055

```
{
  "results": [
    {
      "advertiserId": "11926154",
      ...
      "autotraderAdvertAllowances": [
        {
          "vehicleTypes": [
            "Car",
            "Van"
          ],
          "type": "Standard",
          "capacity": 154,
          "unlimited": false
        },
        {
          "vehicleTypes": [
            "Car",
            "Van"
          ],
          "type": "Bargain",
          "capacity": 5,
          "unlimited": false
        },
        {
          "vehicleTypes": [
            "Car",
            "Van"
          ],
          "type": "New",
          "capacity": 5,
          "unlimited": false
        },
        {
          "vehicleTypes": [
            "Bike",
            "Cycle"
          ],
          "type": "Standard",
          "capacity": 2,
          "unlimited": false
        },
        {
          "vehicleTypes": [
            "Truck"
          ],
          "type": "Standard",
          "capacity": 2,
          "unlimited": false
        },
        {
          "vehicleTypes": [
            "Motorhome",
            "Caravan"
          ],
          "type": "Standard",
          "capacity": 2,
          "unlimited": false
        },
        {
          "vehicleTypes": [
            "Plant",
            "Farm"
          ],
          "type": "Standard",
          "capacity": 2,
          "unlimited": false
        }
      ]
    }
  ]
}
```

Allowances can be requested using the parameter autotraderAdvertAllowances=true.

[Click here](https://developers.autotrader.co.uk/advertising-integration-guide) to view guidance on managing advertising on Autotrader.

An individual allowance applies to specific vehicle types and a type of either Standard, Bargain or New. Stock must meet certain criteria to be considered as Bargain (see table below).

| Vehicle Types | Criteria |
| --- | --- |
| Car & Van | Price <= 2500 |
| Bike & Cycle | Price <= 1000 |
| Motorhome & Caravan | Price <= 7500 |
| Truck | Style = Trailers |
| Plant & Farm | Style = Attachments |

# Integrations API (BETA)

## Introduction

Sandbox environment:

```
https://api-sandbox.autotrader.co.uk/integrations

```

Production environment:

```
https://api.autotrader.co.uk/integrations

```

```
GET /integrations

```

This API is used for getting details of a partners integrations and their association capabilitiles.

With this API you can :-

- List all integrations available to a Partner
- Filter by integration type

```
{
  "results": [
    {
      "integrationId": "E32ACB32-0819-4FC1-9C0F-C5CA7E2xxxxx",
      "name": "API Test",
      "type": "API",
      "capabilities": [
        {
          "name": "Stock Sync"
        },
        {
          "name": "Availability Updates"
        }
      ]
    },
    {
      "integrationId": "4701ce43a7b94db8a74d52924c0aaxxx",
      "name": "Data Feed Test",
      "type": "Datafeed",
      "datafeedType": "Advert"
    },
    {
      "integrationId": "4745ce43a7b94db8a74d52924c0xxx",
      "name": "Stock Export Test",
      "type": "Stock Export",
      "stockExportType": null
    }
  ]
}
```

The json to the right shows the complete resource with realistically populated values. The table below describes each field.

| integrationId | D2577395-6F3A-47F6-9F50-CF30738xxxxx | Integrations unique ID |
| --- | --- | --- |
| name | Integration Name | Name associated to the integration |
| type | API | Specific Type of integration. |
| datafeedType | Advert | Type of datafeed. Can be Advert, Stock, New Car |
| stockExportType | Type of stock export. |
| capabilities.name | Stock Sync | API capabilities available to the integration |

### Filter by Integration Type

Specific integrations Types can be filtered by using the parameter types=api. To filter to more than one integration type you can pass in multiple types as a list for example types=api,datafeed

# Notifications Webhook

The notification webhook enables realtime events from the Auto Trader platform to be provided to a third party.

JSON formatted messages are delivered to an internet-accessible HTTPS endpoint via a PUT method.

It is the integrator responsibility to ensure that relevant authentication processes and consumption methods are in place to accept these events.

Notifications are currently available for the stock, deals and advertisers resources and the format of the message is the same as described in those API's only wrapped in some metadata described below.

## Retries

Any non 2** series response code from the endpoint is considered a retryable error. We will try several times to resend each message after the initial failure

- 10 seconds after the initial failure
- 30 seconds after the first retry
- 30 minutes after the second retry

Delivery is tracked on a per message basis, if two messages for the same key are scheduled to be sent, first one fails and the second succeeds, the first message will still be retried regardless. For use cases only interested in the latest state, implementations should store and use the time field in the message to decide if it's relevant or has been superseded. The time value stays the same between retries

## Authentication / Validation

Sample header:

```
 autotrader-signature: t=1623882082,v1=6bbf5a26a9fd72076ccd2039652707d90bc29f091ec0736bdc61e1f3c6d82c3f

```

With events being delivered to an external endpoint from Auto Trader we provide a method to validate the payload is authentic. This is expressed by utilising an encrypted V1 token key enclosed in a header. To verify authenticity of the message verify this key matches the HMA256 hash built as described below.

Secret Key

During configuration a secret key will be provided. This is a 40 character string.

in test/ sandbox environment prefixed with sk_test

Sample `sk_test_sampleGuid46546456` (example only — not a real key)

live with sk_live

Sample `sk_live_sampleGuid46546456` (example only — not a real key)

Validation

All events sent to the endpoint will contain a header "AutoTrader-Signature" this provides the below

| Parameter sample | Description |
| --- | --- |
| t=12345689 | time of message send in seconds since epoch. |
| v1=6bbf5.. | A one way hashed value to be matched as part of the validation process |

## v1 hash pairing

Sample string generation ( JAVA / GUAVA ) :

```
The provided example is built using Java and Guava’s hmac256 function. 
Similar HMAC functions are available in other languages.

```

```
import com.google.common.hash.Hashing;

import java.nio.charset.StandardCharsets;

public class Signature {

    public static void main(String[] args) {
        String result = new Signature().hmac256("sk_test_sampleGuid46546456", "1623882082", "{"id": "123"}");
        System.out.println(result);
    }

    String hmac256(String secretKey, String times, String body) {
        String value = String.format("%s.%s", time, body);
        return Hashing.hmacSha256(secretKey.getBytes(StandardCharsets.UTF_8)).hashBytes(value.getBytes(StandardCharsets.UTF_8)).toString();
    }
}

```

To confirm the event data submitted is authentic, a one way hash is built using SHA256 HMAC

The hash is built by concatenating the below, along with the secret key provided.

- the value of t in the header
- a`.` character
- the full JSON content of the body

Abstract hashing example

`sample secret = sk_test_sampleGuid46546456`

`sample v1 value hash = 6bbf5a26a9fd72076ccd2039652707d90bc29f091ec0736bdc61e1f3c6d82c3f`

`t= 1623882082`

`body payload = {"id": "123"}`

String value = 1623882082+"."+"{"id": "123"}"

A SHA256 HMAC is then calculated using the shared secret key along with the concatenated string.

hashedValue = Hashing in hmacSha256 (sk_test_sampleGuid46546456+value)

hashedValue = 6bbf5a26a9fd72076ccd2039652707d90bc29f091ec0736bdc61e1f3c6d82c3f

Because SHA256 is a one-way hash, only parties with knowledge of the secret are able to calculate and match the signature.

If firewall rules are required to be implemented then please allow request from the domain autotrader.co.uk

## Message Structure

```
{
  "id": "d0181ba15793600078a469d6a81ba0fd",
  "time": "2022-07-01T14:06:18.422Z",
  "type": "ADVERTISER",
  "data": {
    ...
  }
}
```

All notification have a common 'envelope' and then the specific content within the 'data' field.

The id field matches the`stockId`,`dealId`, or`advertiserId` which is being updated as part of the notification. The time field is the date/time when the notification was created and the type field indicates whether the notification is for a STOCK, DEAL or ADVERTISER change.

Sample Advertiser notification:

```
{
  "id": "100000123",
  "time": "2025-11-11T11:41:33.582Z",
  "type": "ADVERTISER_UPDATE",
  "data": {
    "advertiserId": "100000123",
    "name": "Dealer Name",
    "description": "Test Dealer established 2000.",
    "segment": "Independent",
    "status": "Good",
    "website": "http://www.autotrader.co.uk/testdealer",
    "phone": "(0161) 4960000",
    "location": {
      "addressLineOne": "New Street",
      "town": "Manchester",
      "region": "NORTH WEST",
      "postcode": "M15 4FN",
      "latitude": 53.4721936,
      "longitude": -2.24703
    },
    "usedVehicleStrapline": "Open between 9am and 5pm everyday",
    "newVehicleStrapline": "Open between 9am and 5pm everyday",
    "capabilities": {
      "atConnect": [
        {
          "name": "Vehicle Lookup Competitor Link",
          "eligible": true
        },
        {
          "name": "Search",
          "eligible": true
        },
        {
          "name": "Part Exchange Updates",
          "eligible": true
        },
        {
          "name": "Stock Sync",
          "eligible": true
        }
      ]
    }
  }
```

The advertiser notification returns advertiser’s data.

An event is triggered when the advertiser information is changed, such as, name, segment, website URL, phone number, address, town, county, region, postcode, latitude, longitude or advert capacity.

## Stock Notification

Sample Stock notification:

```
{
  "id": "2c9299d27a61e792017a639242503727",
  "time": "2021-04-05T14:30:12.000Z",
  "type": "STOCK_UPDATE",
  "integrationId": "D2577395-6F3A-47F7-9F51-CF90738977Z1",
  "stockEventSource": "AT_CONNECT",
  "data": {
    "advertiser": {
      "advertiserId": "1281231"
    },
    "metadata": {
      "stockId": "2c9299d27a61e792017a639242503727",
      "searchId": "202107014512921",
      "versionNumber": 2,
      "lifecycleState": "FORECOURT",
      "externalStockId": "1234",
      "externalStockReference": "RTEEW",
      "lastUpdated": "2021-04-05T14:30:12.000Z",
      "lastUpdatedByAdvertiser": "2021-04-05T12:15:12.435Z",
      "dateOnForecourt": "2021-02-09"
    },
    "vehicle": {
      "vehicleType": "Car",
      "trim": "TDI S line Special Edition",
      "bodyType": "SUV"
      ...
    },
    "changedFields": [
      {
        "path": "/time"
      },
      {
        "path": "/data/metadata/versionNumber"
      },
      {
        "path": "/data/metadata/lastUpdated"
      },
      {
        "path": "/data/metadata/lifecycleState"
      }
    ]
  }
}
```

For full details of all the fields that are available in the Stock Notifications please see stock

A stock notification is generated when a change is made to an advertisers stock item.

Stock deletion is indicated by a notification where the lifecycleState is DELETED.

With bidirectional updates care must be taken to ensure data is synchronised correctly.

- Due to the nature of event publishing, notifications can be duplicated or received in an incorrect order, you should ignore any updates made prior to the latest notification successfully processed using the time field (which is UTC) in the notification value in the current stock record.
- The stockEventSource field is an indication of which client system triggered the update to our stock repository and can have values FEED, PORTAL, AT_CONNECT, OTHER.
- Filter out notifications which are as a result of your own change. This can be done by ignoring notifications from your own integrationId.
- To view the exact fields that have been added/updated as part of the stock notification please see the changedFields object. This will enable clients to view the specific list of field(s) that have been modified as part of this update event, enabling determining which specific changedFields are relevant to an integrator's system and should be processed, or ignored.

## Deal Notification

```
{
  "id": "cade64c1-64b7-4566-aff8-8ad1ccaf6704",
  "time": "2024-03-19T11:07:37.028Z",
  "type": "DEAL_CREATE",
  "data": {
    "dealId": "cade64c1-64b7-4566-aff8-8ad1ccaf6704",
    "advertiserId": "12345",
    "created": "2024-03-19T11:03:13.57Z",
    "lastUpdated": "2024-03-19T11:07:35.909Z",
    "advertiserDealStatus": "In Progress",
    "consumerDealStatus": "In Progress",
    "consumerReservationFeeStatus": "Held",
    "consumer": {
      "firstName": "Test",
      "lastName": "User",
      "email": "test.user@autotrader.co.uk"
    },
    "stock": {
      "stockId": "8a46978a8d1ea302018d305dbbb92430",
      "searchId": "202401228774733",
      "reservationStatus": "Reserved"
    },
    "reservation": {
      "status": "Reserved",
      "fee": {
        "amountGBP": 99,
        "status": "Held"
      }
    },
    "price": {
      "suppliedPrice": {
        "amountGBP": 14750
      },
      "adminFee": {
        "amountGBP": 120
      },
      "totalPrice": {
        "amountGBP": 14870
      }
    },
    "buyingSignals": {
      "dealIntentScore": 100,
      "intent": "High",
      "localConsumer": true,
      "advertSaved": true,
      "preferences": {
        "bodyTypes": [
          {
            "value": "SUV",
            "rating": "Very Strong"
          },
          {
            "value": "Saloon",
            "rating": "Strong"
          }
        ],
        "colours": [
          {
            "value": "Black",
            "rating": "Very Strong"
          },
          {
            "value": "Blue",
            "rating": "Strong"
          }
        ],
        "fuelTypes": [
          {
            "value": "Petrol Hybrid",
            "rating": "Very Strong"
          },
          {
            "value": "Diesel",
            "rating": "Very Strong"
          }
        ],
        "wheelbaseTypes": [
          {
            "value": "MWB",
            "rating": "Strong"
          },
          {
            "value": "LWB",
            "rating": "Very Strong"
          }
        ],
        "makeModels": [
          {
            "make": "Lexus",
            "model": "UX",
            "rating": "Very Strong"
          },
          {
            "make": "Honda",
            "model": "Accord",
            "rating": "Strong"
          }
        ],
        "mileages": {
          "from": 10000,
          "to": 16000
        },
        "years": {
          "from": 2016,
          "to": 2022
        }
      }
    },
    "financeApplication": {
      "id": "26dcfa9f-d80e-4bf7-ab29-c491766e4886",
      "lastUpdated": "2024-10-03T15:27:36Z"
    },
    "partExchange": {
      "id": "87fd5f48-56bc-47f3-b5ac-f722c271687c",
      "lastUpdated": "2024-09-01T15:27:36Z"
    },
    "messages": {
      "id": "cade64c1-64b7-4566-aff8-8ad1ccaf6704",
      "lastUpdated": "2024-10-03T15:27:36Z"
    },
    "calls": {
      
    },
    "delivery": {
      "id": "cade64c1-64b7-4566-aff8-8ad1ccaf6704",
      "lastUpdated": "2024-10-01T15:27:36Z"
    }
  }
}
```

The deals model generates a notification when:

- A new deal is submitted.`type``DEAL_CREATE`
- If any component of the deal is modified.`type``DEAL_UPDATE`
- Any messages are exchanged between the potential consumer and the seller.`type``DEAL_UPDATE`

# Error Handling

The below contains response Status Codes, what they mean and when they would be returned.

## API Error Handling

200 / 201 - OK / Accepted

A sample message :

```
{
  ...
  "warnings": [
    {
      "type": "ERROR",
      "feature": "stock",
      "message": "Rejected due to price of null not meeting minimum price of 75"
    }
  ],
  "vehicle": {
    ...
  }
  ...
}
```

| API | Case | Status Code | Message | Description |
| --- | --- | --- | --- | --- |
| /vehicles | Trying to retreive a valuation without an odometer reading | 200 | "odometerReadingMiles must be provided" | Vehicle data returned, but no vehicle metrics (valuations & metrics) due to missing odometer reading parameter. |
| /vehicles | Trying to perform a vehicle lookup | 200 | "No derivativeId found" | Limited vehicle data returned, but no vehicle metrics (valuations & metrics) due to derivativeId not being able to be assigned. Typical reasons are due to misregistration or other data source issues. |
| /vehicles | Requesting Full Vehicle Check | 200 | "Unable to provide information" | While we can return vehicle data, there is an issue with the provenance data and we’re unable to return a response. Please contact technical support |
| /search | Trying to access Search | 200 | None | You may see scenarios where the status is a 200 but no data has returned. This is due to bad parameters being passed through. |
| /stock | Attempting to PATCH / POST a stock item | 200 / 201 | "Rejected due to price of null not meeting minimum price of 75" | The vehicle is being placed to advertiserAdvert without a supplied price. |
| /stock | Attempting to PATCH / POST a stock item | 201 | "This vehicle has been classified as a category A/B vehicle by the DVLA. These are not permitted for sale on Autotrader." | Sale of category A/B vehicle classified by the DVLA is not permitted on Autotrader. |
| /stock | Attempting to PATCH / POST a stock item | 201 | "VAT status required for Light Commercial Vehicles" | For van adverts, the vatStatus is required in order for the advert to be published on any advertising channel. |
| /stock | Attempting to PATCH / POST a stock item | 201 | "Rejected due to invalid make: Ford" | Occurs when a vehicle type is not supported by the given make. |
| /stock | Attempting to PATCH a stock item | 202 | None | returned if no new change has been made to a stock record |
| /images | Trying to load an imageId which is invalid | 200 | "Media with checksum: c20c0760e82b435997807034bcc83818 does not exist" | ImageId being used against a stock item does not exist within Autotraders image service. Image requires to be uploaded to the images API to create new Id. |

400 - Bad Request

| API | Case | Status Code | Message | Description |
| --- | --- | --- | --- | --- |
| /stock | Trying to add a vehicle into a advertisers stock | 400 | "VehicleType field is missing. Please supply a valid value" | A value Car, Van etc has not been supplied in the body of the POST. |
| /stock | Managing a locked field maintained by an external feed | 400 | "xxx/xxx/node is locked by UVL datafeed" | The node / parameter requested cannot be updated through the Stock Management API |
| /stock | Creating or updating a stock record | 400 | “/vehicle/derivative size must be between 1 and 150” | Character limit exceeded or zero length provided e.g."". |
| /vehicles | Trying to get vehicle data | 400 | "registration must be provided and be 2 to 7 characters" | A valid request must include a VRM. |

401 - Unauthorized

| API | Case | Status Code | Message | Description |
| --- | --- | --- | --- | --- |
| Any | When trying to access any endpoint | 401 | "Token for Application: [xxxx] expired on: [Wed Nov 08 11:06:09 UTC 2023]" | Using an expired authentication token to access a resource |

403 - Forbidden

| API | Case | Status Code | Message | Description |
| --- | --- | --- | --- | --- |
| Any | When trying to access any endpoint | 403 | "IntegrationId {xxxx} incorrect products configured to access this resource" | advertiserId is not permitted to access this resource or data. |
| Any | Trying to access an advertisers stock | 403 | "IntegrationId {xxxx} is not permitted to access advertiserId {xxxx}" | API user is not permitted to perform this request on behalf of the state advertiser. |

404 - Not Found

| API | Case | Status Code | Message | Description |
| --- | --- | --- | --- | --- |
| Any | When trying to access any endpoint | 404 | NA | Data for the request can not be found |
| /stock | Trying to access a advertisers stock | 404 | "No stock found with the id {xxxx}" | Stock item with the corresponding id could not be found. |

409 - Conflict

| API | Case | Status Code | Message | Description |
| --- | --- | --- | --- | --- |
| /stock | Trying to update a stock item | 409 | "Duplicate stock found, stockId=2cXXXX12345" | A stock record already exists for this advertiserId and can only be updated. The stockId for the existing record will be supplied in the error response. |

422 - Unprocessable Entity

| API | Case | Status Code | Message | Description |
| --- | --- | --- | --- | --- |
| /finance | Trying to create a finance proposal | 422 | "Failed to create proposal - xxx" | Cannot create a finance proposal due a proposalRequirement which cannot be rectified in the finance application so lender cannot process the request. |

429 - Too Many Requests

| API | Case | Status Code | Message | Description |
| --- | --- | --- | --- | --- |
| /Any | Too many request | 429 | "Too many requests" | Occurs when clients are sending too many requests within a given period. |

503 - Service Unavailable

| API | Case | Status Code | Message | Description |
| --- | --- | --- | --- | --- |
| Any | Trying to access the service | 503 | None | This is when the service is unavailable, but could be due to an outage or services temporarily receiving too many concurrent requests. |

504 - Server Timeout

| API | Case | Status Code | Message | Description |
| --- | --- | --- | --- | --- |
| Any | Trying to access the service | 504 | None | Likely an outage with one of our servers, refer to status.autotrader.co.uk for updates. |

## Notification Error Handling

Expected Response Code

Below is a table of expected response codes which should be returned when processing notifications.

A 400 response code should be provided when either:

- A datapoint in the webhook that you require is missing from the payload.
- A datapoint that you expect to one of a discrete set of values is not one of those values.

| Response Code | When to provide this response |
| --- | --- |
| 200 | Webhook is successfully received and the contents of the message are processed, then a 200 response code should be provided. |
| 202 | Webhook is successfully received but the contents of the message will not be processed, then a 202 response code should be provided. For example, a deals notification only contains a calls component, but your system does not process call deals. |
| 400 |
| 401 | A 401 response code should be provided when a webhooks autotrader-signature fails hash authentication. |
| 422 | A 422 response code should be provided when the advertiser ID in the webhook is not an advertiser ID you are expecting. |

Optional Response Code

| Response Code | When to provide this response |
| --- | --- |
| 429 | If you wish, you can provide a 429 response code to webhooks if you want to adhere to a client-side rate limit. Autotrader does have the ability to set a server-side rate limit on these services. Contact partner.support@autotrader.co.uk if you would like us to implement a server-side rate limit upstream. |

# Branding Guidelines/Assets

In order to help Partners ensure they are displaying Autotrader data correctly, we have provided a collection of guides and access to the relevant assets including

- Valuations Guide
- Price Indicator Guide
- Data Point and Metrics Guide
- Vehicle Highlights

# Contact Us

## New Customers

If you are a new customer interested in our API's and would like further information on how to qualify for our services, please fill in the following form [here](https://www.autotrader.co.uk/partners/retailer/platform/autotrader-connect). Someone from our Alliances Team will contact you in due course.

Please note that there is a charge for some of our APIs which will be discussed with you as part of the onboarding process.

## Existing Customers

### Partner Support

Available Monday – Friday 09:00 – 17:00

### Integration Management

Available Monday – Friday

Examples