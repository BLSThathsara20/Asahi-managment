---
title: Auto Trader Connect — Deprecated APIs (local copy)
source: https://developers.autotrader.co.uk/deprecated
last_synced: 2026-05-21
warning: Do not build new integrations on these APIs.
---

# Search1 API (Deprecated)

## Introduction

The Search REST API exposes adverts and retailers in [JSON](http://www.json.org/) format.

The live environment is available here:

`https://api.autotrader.co.uk/service/search1`

The test environment is available here:

`https://api-sandbox.autotrader.co.uk/service/search1`

```
$ curl 'https://api.autotrader.co.uk/service/search1/advert?size=1' -i

```

```
GET /service/search1/advert?size=1 HTTP/1.1

```

A successful response looks like this:

```
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

```

```
{
  "_embedded": {
    "results": [
      {
        "advertId": "20180101",
        "stockItemId": "2c9299d262f70400016dba4777c3",
        "advertiser": {
          "retailerId": "1",
          "sellerName": "Cars Stockport",
          "type": "Trade",
          "segment": "Franchise",
          "contact": {
            "email": "enquiries@cars.co.uk",
            "website": {
              "href": "http://www.cars.co.uk/used-cars/"
            },
            "phoneNumberOne": "(0161) 111 2222"
          },
          "location": {
            "postcode": "M4 1JJ",
            "region": "NORTH WEST",
            "county": "GREATER MANCHESTER",
            "town": "MANCHESTER",
            "addressOne": "First Street",
            "addressTwo": "AutoTrader Way",
            "latLong": "53.40579,-2.18497"
          },
          "products": [
            "PROD1",
            "PROD2"
          ],
          "sellerLogo": "searchlogo.gif",
          "review": {
            "overallReviewRating": "5.0",
            "numberOfReviews": "1"
          },
          "profile": "The Cars Group is brilliant",
          "services": [
            "Used Vehicle Sales",
            "New Vehicle Sales",
            "Parts",
            "MOT",
            "Servicing"
          ],
          "uvlProviderId": "403687c9e53945bcbf173037896d",
          "uvlExternalDealerReference": "2",
          "partnerSites": [
            "bmw"
          ],
          "legalName": "Cars Stockport",
          "fcaNumber": "1",
          "_links": {
            "retailer": {
              "href": "https://api.autotrader.co.uk/service/search1/retailer/1"
            }
          }
        },
        "sale": {
          "title": "BMW 3 Series x35d Saloon 3.0 4dr",
          "attentionGrabber": "Genuine Mileage BMW Show Car",
          "placementDate": {
            "epochTime": 1524843264,
            "utc": "2018-04-27T15:34:24Z"
          },
          "expiryDate": {
            "epochTime": 1540508400,
            "utc": "2018-10-25T23:00:00Z"
          },
          "pricing": {
            "price": 99450,
            "tradePrice": 0,
            "suppliedPrice": 99450,
            "priceOnApplication": false,
            "hasFinanceInformation": true,
            "unit": "£"
          },
          "description": "This vehicle is great",
          "advertText": "This vehicle is great",
          "combinedFeatures": [
            "17" light alloy wheels Star-spoke style",
            "Sport automatic transmission",
            "Servotronic Steering",
            "Steering wheel heating",
            "Multi-function controls for s'wheel",
            "Sport Steering Wheel",
            "Run-flat tyres"
          ],
          "advertTextAndFeatures": "This vehicle is great. Alarm system (Thatcham 1), Auto headlights with rain sensor, Automatic Air Conditioning, DAB digital radio",
          "tradeLifecycleStatus": "FORECOURT",
          "tradeDescription": "This vehicle is great. Alarm system (Thatcham 1), Auto headlights with rain sensor, Automatic Air Conditioning, DAB digital radio. WBA3J72070F889700",
          "advertisedLocations": [
            "uvl",
            "retailer_websites"
          ],
          "wouldSwap": "N",
          "deliveryPossible": "N",
          "uvlFlags": [
            "STD_RETAIL",
            "VAT_QUAL",
            "AUC_STD",
            "FSH"
          ],
          "uvlSearchFeatures": [
            "BLUETOOTH",
            "AIRCON",
            "PDC",
            "ELEC_FOLD_MIRRORS",
            "USB",
            "DAB",
            "LEATHER"
          ]
        },
        "vehicle": {
          "registration": "AT11NPG",
          "vin": "AUTO3J72070F889700",
          "registrationDate": {
            "epochTime": 1509494400,
            "utc": "2017-11-01T00:00:00Z"
          },
          "plate": "67",
          "colour": "Silver",
          "manufacturerColour": "Orion Silver metallic",
          "mileage": {
            "mileage": 157,
            "unit": "M"
          },
          "franchiseApproved": true,
          "manufacturerApproved": true,
          "manufacturedYear": 2017,
          "condition": "Nearly New",
          "basicVehicleCheck": {
            "imported": true,
            "exported": false,
            "stolen": false,
            "scrapped": false
          },
          "vehicleAge": 1,
          "colourFinish": "Metallic"
        },
        "specification": {
          "make": "BMW",
          "model": "3 SERIES",
          "suppliedModel": "3 Series",
          "subModel": "335",
          "trim": "Standard",
          "vehicleCategory": "Car",
          "derivative": "x35d Saloon",
          "bodyType": "Saloon",
          "rawBodyType": "Saloon",
          "suppliedBodyType": "Saloon",
          "suppliedFuelType": "Diesel",
          "transmission": "Automatic",
          "fuel": "Diesel",
          "engine": {
            "power": {
              
            },
            "sizeCC": 2993,
            "sizeLitres": "3.0",
            "manufacturerEngineSize": 3
          },
          "acceleration": {
            
          },
          "exteriorLength": {
            
          },
          "exteriorHeight": {
            
          },
          "exteriorWidth": {
            
          },
          "annualTax": {
            "standardRate": 140,
            "unit": "£"
          },
          "driverPosition": "Right Hand Drive",
          "endLayout": "Unlisted",
          "bedroomLayout": "Unlisted",
          "axleConfig": "Unlisted",
          "capacityHeight": {
            
          },
          "capacityLength": {
            
          },
          "capacityWidth": {
            
          },
          "capacityVolume": {
            
          },
          "capacityWeight": {
            
          },
          "grossVehicleWeight": {
            
          },
          "grossTowingWeight": {
            
          },
          "maxHeight": {
            
          },
          "maxReach": {
            
          },
          "operatingWidth": {
            
          },
          "wheelbaseMeasurement": {
            
          },
          "liftingCapacity": {
            
          },
          "topSpeed": {
            
          },
          "uvlDriveTrain": "Four Wheel Drive"
        },
        "media": {
          "images": [
            
          ],
          "videoProvider": "Portal",
          "contractedImageCount": 100
        },
        "meta": {
          "versionNumber": "4",
          "indexVersion": 1599231754178134016
        },
        "_links": {
          "self": {
            "href": "https://api.autotrader.co.uk/service/search1/advert/20180101?partner_site=bmw&retailer_id=1&advertising_location=uvl"
          }
        }
      }
    ]
  },
  "_links": {
    "self": {
      "href": "https://api.autotrader.co.uk/service/search1/advert?size=1&partner_site=bmw&retailer_id=1&advertising_location=uvl"
    },
    "next": {
      "href": "https://api.autotrader.co.uk/service/search1/advert?size=1&partner_site=bmw&retailer_id=1&advertising_location=uvl&page=2"
    },
    "cursor": {
      "href": "https://api.autotrader.co.uk/service/search1/advert?size=1&partner_site=bmw&retailer_id=1&advertising_location=uvl&cursor_offset=AoEvMjAxODA0Mjc1OTc3NDE5"
    },
    "help": {
      "href": "https://api.autotrader.co.uk/service/search1/advert?partner_site=bmw&retailer_id=1&advertising_location=uvl"
    }
  },
  "facets": {
    
  },
  "cursorOffset": "AoEvMjAxODA0Mjc1OTc3NDE5",
  "page": {
    "size": 1,
    "totalElements": 150,
    "totalPages": 150,
    "number": 1
  }
}
```

Request

`GET /advert`

URL Parameters

This request can accept the following optional parameters:

| Parameter | Description |
| --- | --- |
| `retailer_id` | Id of the retailer |
| `make` | The Make of the vehicle. |
| `model` | The Model of the vehicle. |
| `page` | Number of pages. Default page is 1. |
| `size` | Size of the page. You have to set size to return adverts or facets. It can be zero or more. |

A full list of parameters can be found in the facetHelp object. (This can be accessed by authenticating and making a GET request to`https://api.autotrader.co.uk/service/search1/advert`).

```
$ curl 'https://api.autotrader.co.uk/service/search1/advert/20180101' -i \
    -H 'Content-Type: application/json' -H 'Authorization: Bearer {access_token}' \

```

```
GET /advert/20180101 HTTP/1.1
Content-Type: application/json
Authorization: Bearer {access_token}

```

A successful response for a text message looks like this:

```
HTTP/1.1 200 Ok
Location: /advert/20180101
Content-Type: application/json;charset=UTF-8

```

```
{
  "_embedded": {
    "results": [
      {
        "advertId": "20180101",
        "stockItemId": "2c9299d262f70400016dba4777c3",
        "advertiser": {
          "retailerId": "1",
          "sellerName": "Cars Stockport",
          "type": "Trade",
          "segment": "Franchise",
          "contact": {
            "email": "enquiries@cars.co.uk",
            "website": {
              "href": "http://www.cars.co.uk/used-cars/"
            },
            "phoneNumberOne": "(0161) 111 2222"
          },
          "location": {
            "postcode": "M4 1JJ",
            "region": "NORTH WEST",
            "county": "GREATER MANCHESTER",
            "town": "MANCHESTER",
            "addressOne": "First Street",
            "addressTwo": "AutoTrader Way",
            "latLong": "53.40579,-2.18497"
          },
          "products": [
            "PROD1",
            "PROD2"
          ],
          "sellerLogo": "searchlogo.gif",
          "review": {
            "overallReviewRating": "5.0",
            "numberOfReviews": "1"
          },
          "profile": "The Cars Group is brilliant",
          "services": [
            "Used Vehicle Sales",
            "New Vehicle Sales",
            "Parts",
            "MOT",
            "Servicing"
          ],
          "uvlProviderId": "403687c9e53945bcbf173037896d",
          "uvlExternalDealerReference": "2",
          "partnerSites": [
            "bmw"
          ],
          "legalName": "Cars Stockport",
          "fcaNumber": "1",
          "_links": {
            "retailer": {
              "href": "https://api.autotrader.co.uk/service/search1/retailer/1"
            }
          }
        },
        "sale": {
          "title": "BMW 3 Series x35d Saloon 3.0 4dr",
          "attentionGrabber": "Genuine Mileage BMW Show Car",
          "placementDate": {
            "epochTime": 1524843264,
            "utc": "2018-04-27T15:34:24Z"
          },
          "expiryDate": {
            "epochTime": 1540508400,
            "utc": "2018-10-25T23:00:00Z"
          },
          "pricing": {
            "price": 99450,
            "tradePrice": 0,
            "suppliedPrice": 99450,
            "priceOnApplication": false,
            "hasFinanceInformation": true,
            "unit": "£"
          },
          "description": "This vehicle is great",
          "advertText": "This vehicle is great",
          "combinedFeatures": [
            "17" light alloy wheels Star-spoke style",
            "Sport automatic transmission",
            "Servotronic Steering",
            "Steering wheel heating",
            "Multi-function controls for s'wheel",
            "Sport Steering Wheel",
            "Run-flat tyres"
          ],
          "advertTextAndFeatures": "This vehicle is great. Alarm system (Thatcham 1), Auto headlights with rain sensor, Automatic Air Conditioning, DAB digital radio",
          "tradeLifecycleStatus": "FORECOURT",
          "tradeDescription": "This vehicle is great. Alarm system (Thatcham 1), Auto headlights with rain sensor, Automatic Air Conditioning, DAB digital radio. WBA3J72070F889700",
          "advertisedLocations": [
            "uvl",
            "retailer_websites"
          ],
          "wouldSwap": "N",
          "deliveryPossible": "N",
          "uvlFlags": [
            "STD_RETAIL",
            "VAT_QUAL",
            "AUC_STD",
            "FSH"
          ],
          "uvlSearchFeatures": [
            "BLUETOOTH",
            "AIRCON",
            "PDC",
            "ELEC_FOLD_MIRRORS",
            "USB",
            "DAB",
            "LEATHER"
          ]
        },
        "vehicle": {
          "registration": "AT11NPG",
          "vin": "AUTO3J72070F889700",
          "registrationDate": {
            "epochTime": 1509494400,
            "utc": "2017-11-01T00:00:00Z"
          },
          "plate": "67",
          "colour": "Silver",
          "manufacturerColour": "Orion Silver metallic",
          "mileage": {
            "mileage": 157,
            "unit": "M"
          },
          "franchiseApproved": true,
          "manufacturerApproved": true,
          "manufacturedYear": 2017,
          "condition": "Nearly New",
          "basicVehicleCheck": {
            "imported": true,
            "exported": false,
            "stolen": false,
            "scrapped": false
          },
          "vehicleAge": 1,
          "colourFinish": "Metallic"
        },
        "specification": {
          "make": "BMW",
          "model": "3 SERIES",
          "suppliedModel": "3 Series",
          "subModel": "335",
          "trim": "Standard",
          "vehicleCategory": "Car",
          "derivative": "x35d Saloon",
          "bodyType": "Saloon",
          "rawBodyType": "Saloon",
          "suppliedBodyType": "Saloon",
          "suppliedFuelType": "Diesel",
          "transmission": "Automatic",
          "fuel": "Diesel",
          "engine": {
            "power": {
              
            },
            "sizeCC": 2993,
            "sizeLitres": "3.0",
            "manufacturerEngineSize": 3
          },
          "acceleration": {
            
          },
          "exteriorLength": {
            
          },
          "exteriorHeight": {
            
          },
          "exteriorWidth": {
            
          },
          "annualTax": {
            "standardRate": 140,
            "unit": "£"
          },
          "driverPosition": "Right Hand Drive",
          "endLayout": "Unlisted",
          "bedroomLayout": "Unlisted",
          "axleConfig": "Unlisted",
          "capacityHeight": {
            
          },
          "capacityLength": {
            
          },
          "capacityWidth": {
            
          },
          "capacityVolume": {
            
          },
          "capacityWeight": {
            
          },
          "grossVehicleWeight": {
            
          },
          "grossTowingWeight": {
            
          },
          "maxHeight": {
            
          },
          "maxReach": {
            
          },
          "operatingWidth": {
            
          },
          "wheelbaseMeasurement": {
            
          },
          "liftingCapacity": {
            
          },
          "topSpeed": {
            
          },
          "uvlDriveTrain": "Four Wheel Drive",
          "_links": {
            "techdata": {
              "href": "https://api.autotrader.co.uk/service/search1/tech-data?derivative_id=123456789ABCD&year_manufactured=2016"
            }
          }
        },
        "media": {
          "images": [
            
          ],
          "videoProvider": "Portal",
          "contractedImageCount": 100
        },
        "meta": {
          "versionNumber": "4",
          "indexVersion": 1599231754178134016
        },
        "_links": {
          "self": {
            "href": "https://api.autotrader.co.uk/service/search1/advert/20180101?partner_site=bmw&retailer_id=1&advertising_location=uvl"
          }
        }
      }
    ]
  },
  "_links": {
    "self": {
      "href": "https://api.autotrader.co.uk/service/search1/advert?size=1&partner_site=bmw&retailer_id=1&advertising_location=uvl"
    },
    "next": {
      "href": "https://api.autotrader.co.uk/service/search1/advert?size=1&partner_site=bmw&retailer_id=1&advertising_location=uvl&page=2"
    },
    "cursor": {
      "href": "https://api.autotrader.co.uk/service/search1/advert?size=1&partner_site=bmw&retailer_id=1&advertising_location=uvl&cursor_offset=AoEvMjAxODA0Mjc1OTc3NDE5"
    },
    "help": {
      "href": "https://api.autotrader.co.uk/service/search1/advert?partner_site=bmw&retailer_id=1&advertising_location=uvl"
    }
  },
  "facets": {
    
  },
  "cursorOffset": "AoEvMjAxODA0Mjc1OTc3NDE5",
  "page": {
    "size": 1,
    "totalElements": 150,
    "totalPages": 150,
    "number": 1
  }
}
```

Request

`GET /advert/20180101`

This shows information for a single advert.

Fields of interest in advert response

advertId - used to reference advert directly

advertiser - section to hold retailer information

- dealer name
- dealer location

sale - information about the advert

- price
- features

vehicle - information about the vehicle:

- registration number
- vin
- registrationDate
- manufacturerApproved
- franchiseApproved
- basicVehicleCheck stolen,scrapped,etc.

Specification - technical information about the vehicle

- make
- model
- trim
- fuel
- transmission

## Vehicle Technical Specifications

```
$ curl 'https://api.autotrader.co.uk/service/search1/tech-data?derivative_id=123456789ABCD&year_manufactured=2016' -i \
    -H 'Content-Type: application/json' -H 'Authorization: Bearer {access_token}' \

```

```
GET /tech-data?derivative_id=123456789ABCD&year_manufactured=2016 HTTP/1.1
Content-Type: application/json
Authorization: Bearer {access_token}

```

A successful response for a text message looks like this:

```
HTTP/1.1 200 Ok
Location: /tech-data?derivative_id=123456789ABCD&year_manufactured=2016 
Content-Type: application/json;charset=UTF-8

```

```
{
  "_embedded": {
    "results": [
      {
        "derivativeId": "123456789ABCD",
        "make": "DUMMY-MAKE",
        "model": "DUMMY-MODEL",
        "startDate": {
          "epochTime": 1430438400,
          "utc": "2015-05-01T00:00:00Z"
        },
        "engineSize": "998 cc",
        "badgeEngineSize": "1.0 litres",
        "numberOfSeats": "4",
        "transmission": "Manual",
        "co2Emissions": "95 g/km",
        "warrantyYears": "3 years",
        "corrosionGuarantee": "12 years",
        "paintWorkGuarantee": "3 years",
        "insuranceGroup": "06E",
        "fuelConsumptionUrban": "56.5 mpg",
        "fuelConsumptionExtraUrban": "78.5 mpg",
        "fuelConsumptionCombined": "68.9 mpg",
        "zeroToSixtyMph": "14.3 seconds",
        "topSpeed": "99 mph",
        "cylinders": "3",
        "valves": "12",
        "enginePower": "68 bhp",
        "engineTorque": "70.07 lbs/ft",
        "vehicleHeight": "1460 mm",
        "vehicleLength": "3466 mm",
        "wheelbase": "2340 mm",
        "vehicleWidth": "1884 mm",
        "fuelTankCapacity": "35 litres",
        "bootspaceSeatsUp": "196 litres",
        "minimumKerbWeight": "855 kg",
        "standardFeatures": [
          {
            "description": "12 Volt Socket",
            "category": "Interior"
          },
          {
            "description": "15in Comet Wheel Covers",
            "category": "Exterior"
          },
          {
            "description": "4 Speakers",
            "category": "Comfort"
          },
          {
            "description": "7in Touch Drive Interface",
            "category": "Comfort"
          },
          {
            "description": "ABS with Emergency Braking Assistance",
            "category": "Safety and Security"
          },
          {
            "description": "Air Conditioning",
            "category": "Comfort"
          },
          {
            "description": "Bluetooth Handsfree",
            "category": "Comfort"
          },
          {
            "description": "Cup Holders",
            "category": "Comfort"
          },
          {
            "description": "DAB Digital Radio",
            "category": "Comfort"
          },
          {
            "description": "Deadlocks",
            "category": "Safety and Security"
          },
          {
            "description": "Drivers Airbag",
            "category": "Safety and Security"
          },
          {
            "description": "Drivers and Passengers Sunvisor with Courtesy Mirror",
            "category": "Comfort"
          },
          {
            "description": "Electronic Brakeforce Distribution",
            "category": "Safety and Security"
          },
          {
            "description": "Electronic Stability Control, Cornering Stability Control",
            "category": "Safety and Security"
          },
          {
            "description": "Folding Rear Bench Seat",
            "category": "Interior"
          },
          {
            "description": "Front Electric Windows",
            "category": "Comfort"
          },
          {
            "description": "Front Lateral and Curtain Airbags",
            "category": "Safety and Security"
          },
          {
            "description": "Front Passengers Airbag with Cut-Off Device",
            "category": "Safety and Security"
          },
          {
            "description": "Front Seat Belt Pre-Tensioners with Force-Limiters",
            "category": "Safety and Security"
          },
          {
            "description": "Front and Rear Head Restraints",
            "category": "Safety and Security"
          },
          {
            "description": "Height Adjustable Drivers Seat",
            "category": "Comfort"
          },
          {
            "description": "Height-Adjustable Steering Wheel",
            "category": "Comfort"
          },
          {
            "description": "Hill Start Assist",
            "category": "Safety and Security"
          },
          {
            "description": "LED Daytime Running Lights (DRLs)",
            "category": "Safety and Security"
          },
          {
            "description": "Puncture Repair Kit",
            "category": "Safety and Security"
          },
          {
            "description": "RDS Radio/MP3 Audio System",
            "category": "Comfort"
          },
          {
            "description": "Rear 50/50 Split/Folding Seats",
            "category": "Comfort"
          },
          {
            "description": "Rear ISOFIX Mounting Points",
            "category": "Safety and Security"
          },
          {
            "description": "Rear Spoiler",
            "category": "Exterior"
          },
          {
            "description": "Remote Central Locking",
            "category": "Safety and Security"
          },
          {
            "description": "Steering Mounted Controls",
            "category": "Comfort"
          },
          {
            "description": "Third Brake Light",
            "category": "Safety and Security"
          },
          {
            "description": "Transponder Immobiliser",
            "category": "Safety and Security"
          },
          {
            "description": "Trip Computer",
            "category": "Comfort"
          },
          {
            "description": "Tyre Pressure Monitor",
            "category": "Safety and Security"
          },
          {
            "description": "USB Socket",
            "category": "Comfort"
          },
          {
            "description": "Upholstery - Sunrise Red Zebra Cloth",
            "category": "Comfort"
          },
          {
            "description": "Variable Power Assisted Steering",
            "category": "Safety and Security"
          }
        ]
      }
    ]
  },
  "_links": {
    "self": {
      "href": "https://api.autotrader.co.uk/service/search1/tech-data?derivative_id=123456789ABCD&year_manufactured=2016"
    },
    "help": {
      "href": "https://api.autotrader.co.uk/service/search1/tech-data?derivative_id=123456789ABCD&year_manufactured=2016"
    }
  },
  "facets": {
    
  },
  "stats": {
    
  },
  "page": {
    "size": 50,
    "totalElements": 1,
    "totalPages": 1,
    "number": 1
  }
}
```

Request

`GET tech-data?derivative_id=123456789ABCD&year_manufactured=2016`

Technical specification based on model data, call information can be found under the retrieve advert details sample below.

`"techdata": { "href": "https://api.autotrader.co.uk/service/search1/tech-data?derivative_id=123456789ABCD&year_manufactured=2016" }`

Fields of interest in advert response

- Vehicle Technical Data
- Interior
- Comfort
- Safety & Security
- Exterior

This is the [graphQL schema](https://graphql.org/learn/schema/) for an advert

```

type Advert {
    advertId:      String!
    stockItemId:   String
    advertiser:    Advertiser
    sale:          Sale
    vehicle:       Vehicle
    specification: Specification
    media:         Media
    meta:          Meta
    _links:        AdvertLinks
}

type Self {
    href: String
    templated:  Boolean
}

type AdvertLinks {
    self: Self
}

type Advertiser {
    retailerId:                 String
    sellerName:                 String
    type:                       String
    segment:                    String
    contact:                    Contact
    location:                   Location
    products:                   [String]
    sellerLogo:                 String
    review:                     Review
    profile:                    String
    services:                   [String]
    uvlProviderId:              String
    uvlExternalDealerReference: String
    partnerSites:               [String]
    legalName:                  String
    fcaNumber:                  String
    _links:                     AdvertiserLinks
}

type AdvertiserLinks {
    retailer: Self
}

type Contact {
    email:          String
    website:        Self
    phoneNumberOne: String
}

type Location { 
    postcode:   String
    region:     String
    county:     String
    country:    String
    town:       String
    addressOne: String
    addressTwo: String
    latLong:    String
}

type Review {
    overallReviewRating: String
    numberOfReviews:     String
}

type ImageAddress {
    href:       String
}

type Image {
    secure: ImageAddress
    nonSecure: ImageAddress
    _links: Self
}

type Media {
    images:               [Image]
    videoProvider:        String
    contractedImageCount: Int
}

type EpochUTCDate{
    epochTime:  Int
    utc:        String
}

type Meta {
    versionNumber:          String
    versionDate:            EpochUTCDate
    indexVersion:           Int
    lastUpdatedByRetailer:  EpochUTCDate
    valueRatingTimestamp:   EpochUTCDate
    valueRatingVersion:     String
    updateSource:           String
}

type Sale {
    title:                 String
    attentionGrabber:      String
    placementDate:         Date
    expiryDate:            Date
    pricing:               Pricing
    description:           String
    advertText:            String
    combinedFeatures:      [String]
    advertTextAndFeatures: String
    tradeLifecycleStatus:  String
    tradeDescription:      String
    advertisedLocations:   [String]
    wouldSwap:             String
    deliveryPossible:      String
    uvlFlags:              [String]
    uvlSearchFeatures:     [String]
}

type Date {
    epochTime: Int
    utc:       String
}

type Pricing {
    price:                 Int
    tradePrice:            Int
    suppliedPrice:         Int
    priceOnApplication:    Boolean
    hasFinanceInformation: Boolean
    unit:                  String
}

type Specification {
    make:                 String
    model:                String
    suppliedModel:        String
    subModel:             String
    trim:                 String
    vehicleCategory:      String
    driveTrain:           String
    derivative:           String
    derivativeId:         String
    bodyType:             String
    rawBodyType:          String
    suppliedBodyType:     String
    suppliedFuelType:     String
    transmission:         String
    fuel:                 String
    engine:               Engine
    acceleration:         Acceleration
    exteriorLength:       Length
    exteriorHeight:       Height
    exteriorWidth:        Width
    annualTax:            AnnualTax
    driverPosition:       String
    endLayout:            String
    bedroomLayout:        String
    axleConfig:           String
    capacityHeight:       Height
    capacityLength:       Length
    capacityWidth:        Width
    capacityVolume:       Volume
    capacityWeight:       Weight
    grossVehicleWeight:   Weight
    grossTowingWeight:    Weight
    maxHeight:            Height
    maxReach:             Length
    operatingWidth:       Width
    wheelbaseMeasurement: Length
    liftingCapacity:      Weight
    topSpeed:             Speed
    uvlDriveTrain:        String
}

type Acceleration {
    zeroToSixty: Float
    zeroToSixtyTwo: Float
    unit: String
}

type Speed {
    topSpeed: Int
    unit: String
}

type Volume {
    volume: Float
    unit: String
}

type Width {
    width: Float
    unit: String
}

type Height {
    height: Float
    unit: String
}

type Length {
    length: Float
    unit: String
}

type Weight {
    weight: Float
    unit: String
}

type AnnualTax {
    standardRate: Int
    unit:         String
}

type Engine {
    power:                  Power
    sizeCC:                 Int
    sizeLitres:             String
    manufacturerEngineSize: Float
}

type Power {
    enginePower: Float
    unit: String
}

type Vehicle {
    registration:         String
    vin:                  String
    registrationDate:     Date
    plate:                String
    colour:               String
    manufacturerColour:   String
    mileage:              Mileage
    franchiseApproved:    Boolean
    manufacturerApproved: Boolean
    manufacturedYear:     Int
    condition:            String
    basicVehicleCheck:    BasicVehicleCheck
    vehicleAge:           Int
    colourFinish:         String
}

type BasicVehicleCheck {
    imported: Boolean
    exported: Boolean
    stolen:   Boolean
    scrapped: Boolean
}

type Mileage {
    mileage: Int
    unit:    String
}

```

## Price Indicator

The AutoTrader Price Indicator will show if a vehicle is priced low, good or great.

The value is showed in the field: advert.sale.valueRating

It can be LOW, GOOD, FAIR, GREAT or HIGH.

Guidelines for use

To show the AutoTrader Price Indicator on your website you should use the following badges downloaded to your respective environments:

Minimum size on desktop: 80 x 32px

Minimum for that size for mobile: 60 x 24px

## Getting Finance Information

```
$ curl -X GET \
  'https://api-sandbox.autotrader.co.uk/service/search1/advert?facet=finance_options&finance_option=12000_4000_24&size=1' \
  -H 'Authorization: Bearer OWVlYWRjN2JiZWMyYzdjMWE3NDVjNDc5MTdhODg0Yg==:jRlwu0N9ZRaB2i+MpeopOGJV6e2Huqj+YAGC9ptnlLE=' \
  -H 'Postman-Token: fa5bd5fb-2488-4d08-b561-d121f5930e2c' \
  -H 'cache-control: no-cache'

```

```
HTTP/1.1 200 Ok
Location: /advert?finance_option
Content-Type: application/json;charset=UTF-8

```

```
{
  "_embedded": {
    "results": [
      {
        "advertId": "PVfeb7f07241f4451083bc42204302fbb6",
        "advertiser": {
          "type": "Trade",
          "contact": {
            
          },
          "location": {
            
          },
          "review": {
            
          }
        },
        "sale": {
          "title": "Renault Grand Scenic 1.3 TCe Signature (s/s) 5dr",
          "pricing": {
            "price": 26415,
            "basicPrice": 21258.33,
            "vatPrice": 4251.67,
            "deliveryPrice": 537.5,
            "vatDeliveryPrice": 107.5,
            "firstYearTaxRate": 205,
            "priceOnApplication": false,
            "hasFinanceInformation": true,
            "priceConversion": "NoConversion",
            "unit": "£"
          },
          "finance": {
            "monthlyPayment": 414.85,
            "monthlyPaymentValue": 414.85,
            "quoteType": "HP",
            "duration": 60,
            "onRoadPrice": 26415,
            "customerDeposit": 3000,
            "totalCredit": 23165,
            "totalAmountPayable": 28141,
            "representativeApr": 2.9,
            "totalInterestPayable": 1726,
            "fixedRateInterest": 2.9,
            "finalPayment": 414.85,
            "depositContributionList": [
              {
                "name": "Manufacturer Contribution",
                "value": 250
              }
            ],
            "contractLength": 60
          },
          "auction": {
            
          },
          "advertisedLocations": [
            "at_new_cars_migration"
          ],
          "valueRating": "UPDATING",
          "onlineAuction": {
            
          },
          "consumerWebsiteAdvert": {
            
          },
          "dealerWebsiteAdvert": {
            
          },
          "uvlAdvert": {
            
          },
          "dealerPartnerAdvert": {
            
          },
          "dealerProfileAdvert": {
            
          },
          "tradeAdvert": {
            
          },
          "carzoneAdvert": {
            
          },
          "autotraderIEAdvert": {
            
          }
        },
        "vehicle": {
          "colour": "Choice of colours",
          "colours": [
            "Purple",
            "White",
            "Red",
            "Blue",
            "Black",
            "Brown",
            "White",
            "Silver",
            "Brown",
            "Grey",
            "Blue"
          ],
          "manufacturerColours": [
            "Amethyst - Special Metallic",
            "Arctic White - Special Metallic",
            "Carmin Red - Metallic",
            "Cosmos Blue - Metallic",
            "Diamond Black - Metallic",
            "Dune - Metallic",
            "Glacier White - Solid",
            "Mercury - Metallic",
            "Mink - Metallic",
            "Oyster Grey - Metallic",
            "Sky Blue - Metallic"
          ],
          "owners": 0,
          "mileage": {
            "mileage": 0
          },
          "condition": "New",
          "basicVehicleCheck": {
            
          },
          "vehicleAge": 0,
          "warrantyInformation": {
            
          }
        },
        "specification": {
          "make": "Renault",
          "model": "Grand Scenic",
          "trim": "Signature",
          "vehicleCategory": "Car",
          "generation": "MPV (2016 - )",
          "generationId": "625b3cb50fe848158354e8d16f6eea32",
          "derivativeId": "feb7f07241f4451083bc42204302fbb6",
          "derivative": "1.3 TCe Signature (s/s) 5dr",
          "generationIntroducedYear": "2016",
          "bodyType": "MPV",
          "rawBodyType": "MPV",
          "transmission": "Manual",
          "fuel": "Petrol",
          "engine": {
            "power": {
              "enginePower": 138,
              "unit": "bhp"
            },
            "sizeCC": 1332,
            "sizeLitres": "1.3",
            "manufacturerEngineSize": 1.3
          },
          "acceleration": {
            "zeroToSixtyTwo": 10.3
          },
          "fuelConsumption": {
            "combined": 45.6,
            "unit": "mpg"
          },
          "doors": 5,
          "seats": 7,
          "bootSpace": {
            "seatsUp": 233,
            "unit": "l"
          },
          "exteriorLength": {
            
          },
          "exteriorHeight": {
            
          },
          "exteriorWidth": {
            
          },
          "insuranceGroup": "17E",
          "annualTax": {
            "standardRate": 140,
            "unit": "£"
          },
          "co2Emissions": {
            "co2Emission": 141,
            "unit": "g/km"
          },
          "dateDerivativeIntroduced": {
            "epochTime": 1527811200,
            "utc": "2018-06-01T00:00:00Z"
          },
          "inProduction": true,
          "driverPosition": "Unlisted",
          "oemEngineType": "TCe",
          "endLayout": "Unlisted",
          "bedroomLayout": "Unlisted",
          "driveTrain": "Front Wheel Drive",
          "capacityHeight": {
            
          },
          "capacityLength": {
            
          },
          "capacityWidth": {
            
          },
          "capacityVolume": {
            
          },
          "capacityWeight": {
            
          },
          "grossVehicleWeight": {
            
          },
          "grossTowingWeight": {
            
          },
          "maxHeight": {
            
          },
          "maxReach": {
            
          },
          "operatingWidth": {
            
          },
          "wheelbaseMeasurement": {
            
          },
          "liftingCapacity": {
            
          },
          "topSpeed": {
            "topSpeed": 119
          },
          "isCrossover": false
        },
        "media": {
          "images": [
            {
              "secure": {
                "href": "https://vms-qa.atcdn.co.uk/media/44c8b6cf75a9449bb8cc635e25373bdd?vs=true"
              },
              "nonSecure": {
                "href": "http://vms-qa.atcdn.co.uk/media/44c8b6cf75a9449bb8cc635e25373bdd?vs=true"
              },
              "_links": {
                "self": {
                  "href": "https://m-qa.atcdn.co.uk/vms/media/{resize}/44c8b6cf75a9449bb8cc635e25373bdd.jpg",
                  "templated": true
                }
              }
            }
          ]
        },
        "meta": {
          "indexVersion": 1628717420364431360
        },
        "_links": {
          "self": {
            "href": "https://api.autotrader.co.uk/api/v1/advert/PVfeb7f07241f4451083bc42204302fbb6?finance_option=15000_3000_60"
          }
        }
      }
    ]
  },
  "_links": {
    "self": {
      "href": "https://api.autotrader.co.uk/api/v1/advert?size=1&finance_option=15000_3000_60"
    },
    "next": {
      "href": "https://api.autotrader.co.uk/api/v1/advert?size=1&finance_option=15000_3000_60&page=2"
    },
    "cursor": {
      "href": "https://api.autotrader.co.uk/api/v1/advert?size=1&finance_option=15000_3000_60&cursor_offset=AoE/A1BWZmViN2YwNzI0MWY0NDUxMDgzYmM0MjIwNDMwMmZiYjY%3D"
    },
    "help": {
      "href": "https://api.autotrader.co.uk/api/v1/advert?finance_option=15000_3000_60"
    }
  },
  "facets": {
    
  },
  "stats": {
    
  },
  "cursorOffset": "AoE/A1BWZmViN2YwNzI0MWY0NDUxMDgzYmM0MjIwNDMwMmZiYjY=",
  "page": {
    "size": 1,
    "totalElements": 26398,
    "totalPages": 26398,
    "number": 1
  }
}
```

using this as a sample call: https://api-sandbox.autotrader.co.uk/service/search1/advert?facet=finance_option will bring back all the finance options plus total number of elements available in our API. Example on the right hand side.

Using this information you would be able to populate the search criteria for finance terms. To bring back results using these terms, you will firstly need to set a default set of terms e.g. 10000_5000_36 (mileage_deposit_terms)

Example call: https://api-sandbox.autotrader.co.uk/service/search1/advert?finance_option=10000_5000_36&size=10

The "finance_option" will bring back advert content and finance information. As you have set a default value you can begin to further expand these results. Our site utilises this, if you go to www.autotrader.co.uk and press search you'll see vehicles that show the monthly figure even if you haven't selected it. This is because we have a default value assigned to allow the functionality for users to filter the results based on finance terms. You'll have found which terms available to use when exploring the facet=finance_option

Parameters

| Parameter | Example | Description |
| --- | --- | --- |
| finance_Option | &finance_Option=10000_1000_36 | mileage_deposit_terms. See available tiers below |
| minMonthlyPrice | &minMonthlyPrice=200 | Optional filter parameter: minimum monthly payment |
| maxMonthlyPrice | &maxMonthlyPrice=300 | Optional filter parameter: maximum monthly payment |

"financeOption" valid values

| Attribute | Sample | Valid values |
| --- | --- | --- |
| Mileage | &finance_Option=10000_1000_36 | 6000, 10000, 12000, 15000, 20000 |
| Deposit | &finance_Option=10000_1000_36 | 0, 500, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 10000 |
| Terms | &finance_Option=10000_1000_36 | 24, 36, 48, 60 |

## Errors

### 400 Bad Request

In case you receive HTTP status code 400, make sure you filter by correct fields.

https://api.autotrader.co.uk/service/search1/advert?day=two

```
HTTP/1.1 400 Bad Request

```

```
{
  "status": "BAD_REQUEST",
  "errors": [
    "day is not a valid filter parameter"
  ],
  "parametersInError": [
    "day"
  ],
  "links": [
    {
      "rel": "self",
      "href": "http://searchone.autotrader.co.uk/api/v1/advert?retailer_id=1&partner_site=bmw&advertising_location=uvl&day=two"
    }
  ]
}
```

The request was malformed.

### 403 Forbidden

In case you receive HTTP status code 403, you are not authorized to access this resource. If a response body exists, it will include an error providing further information.

```
HTTP/1.1 403 Forbidden

```

```
{
  "errorCode": "Unauthorized",
  "errorMessage": "You are not authorized to access this resource"
}
```

If you receive the following response, make sure you are passing the Bearer token as an Authorization header.

```
HTTP/1.1 403 Forbidden

```

```
{
  "code": 403,
  "message": "Forbidden"
}
```

If you receive the following response, then you are passing an invalid or expired`{access_token}`. You should catch this error response and regenerate another`{access_token}`.

```
HTTP/1.1 403 Forbidden

```

```
{
  "code": 403,
  "message": "Token is not valid"
}
```

The requested resource was unauthorised - please see authentication section above.

### 404 Not Found

In case you receive the following response, make sure you provide an correct advertId.

```
HTTP/1.1 404 Not Found

```

```
{
  "message": "20180427597741",
  "status": "NOT_FOUND",
  "links": [
    {
      "rel": "self",
      "href": "http://searchone.autotrader.co.uk/api/v1/advert/20180427597741"
    }
  ]
}
```

We are unable to find a advert with advertId provided.

## FAQs

A full list of parameters can be found in the facetHelp object. (This can be accessed by authenticating and making a GET request to`https://api.autotrader.co.uk/service/search1/advert`).

List facet information for advert searches

```
GET /service/search1/advert HTTP/1.1
Content-Type: application/json
Authorization: Bearer {access_token}

```

### Why does searching by Model not work?

To search by model you have to provide a Make.

List adverts for a make and model

```
GET /service/search1/advert?make=BMW&model=1%20Series&size=10 HTTP/1.1
Content-Type: application/json
Authorization: Bearer {access_token}

```

### Image resize handling ?

Sample Image URL

```
{
  "autotraderAllocated": false,
  "_links": {
    "self": {
      "href": "https://m.atcdn.co.uk/a/media/{resize}/12345abc125848454.jpg",
      "templated": true
    }
  }
}
```

By default image URLs will be provided with a {resize} parameter. When this called via your application it will resolve to the Autotrader default sizing, you can however supply width and height parameter in this area also to dictate the image sizing pulled back.

Examples below ( adjustments in pixels)

https://m.atcdn.co.uk/a/media/w260h195/12345abc125848454.jpg

https://m.atcdn.co.uk/a/media/w520h390/12345abc125848454.jpg

### How do I see the possible values for a certain field?

You can list the values available for a search facet.

List models for a make

```
GET /service/search1/advert?make=BMW&facet=model&size=0 HTTP/1.1
Content-Type: application/json
Authorization: Bearer {access_token}

```

### How do I search for vehicles of multiple makes?

You can add the query parameter multiple times.

Multi make search

```
GET /service/search1/advert?make=BMW&make=FORD&size=0 HTTP/1.1
Content-Type: application/json
Authorization: Bearer {access_token}

```

### What are the vehicle price fields?

Price fields include:

- suppliedPrice - The price supplied by the dealer - either entered in portal or provided in a datafeed.
- price - The price including VAT.
- tradePrice - The price for a B2B vehicle.

### What is the difference between Manufacturer Approved and Franchised Approved?

- Franchised Approved (vehicle.franchisedApproved) - This is marked by the dealer to show a vehicle meets their used approved program.
- Manufacturer Approved (vehicle.manufacturerApproved) - This is a flag to show the car meets the manufacturer used approved program for a particular dealer franchise e.g. Ford franchise dealer and a used approved Ford Focus.

### ULEZ flagging

Within the Autotrader environment we infer a ULEZ vehicle when the below nodes are displayed in the payload as part of the vehicle response

| specification.fuelType | specification.emissionClass |
| --- | --- |
| PETROL | EURO 4,5&6 |
| DIESEL | EURO6 Only |

# Leads API (Deprecated)

## Introduction

Sandbox environment domain :

```
https://api-sandbox.autotrader.co.uk/service/leads-v1/...

```

Production environment domain :

```
https://api.autotrader.co.uk/service/leads-v1/...

```

This API exposes leads and corresponding messages coming from consumers. The state of leads is defined by the diagram below:

Qualified leads available by this service are sources from either Autotrader lead generation or call data where the retailer is utilising the Autotrader call services.

Autotrader marketplace enquires will be supported by the Deals API from FY25 Q3.

The following lead types will be supported:

- Email
- Call
- Deal Builder
- Allocated Stock
- Click and Collect

The link below provides a guide of how partners can migrate from the existing Leads API to the Deals API.

Learn more about the Deals API by following this link to the section within the documentation

As displayed above, when the consumer submits an enquiry, a lead is created with an initial state of 'NEW_LEAD'. Once you have viewed the consumer's lead/message you can update the lead's state to 'ACKNOWLEDGED'. If the consumer creates or replies with a message, then the lead's state will automatically be set back to 'NEW_MESSAGE'.

## Index Leads ( Summary )

Sample request:

```
GET service/leads-v1/leads/summary?status=NEW_LEAD&page=1&pageSize=25&fromDate=2020-11-01&toDate=2020-11-20

```

Request

`GET /leads/summary`

URL Filter Parameters

This request can accept the following optional parameters:

| Parameter | Description |
| --- | --- |
| `retailerId` | Id of the retailer |
| `status` | Status of a lead. Multiple statuses can be accepted. |
| `fromDate` | Start date of search. With format YYYY-MM-DD. |
| `toDate` | End date of search. With format YYYY-MM-DD. |
| `page` | Number of pages. Default page is 0. |
| `pageSize` | Size of the page. Default size is 10. |

Lead Types

All leads will be available by the service, your integration will need to be able manage / filter relevant lead types contained in the messages collection

| Lead Type | Description |
| --- | --- |
| text | Textual content from an email / form submitted through the Autotrader |
| voice | This indicator contains voice call actions stored via the Autotrader Calls product |

### Response

Sample request:

```
GET service/leads-v1/leads/summary?retailerId=20380&status=NEW_LEAD&page=1&pageSize=25&fromDate=2020-11-01&toDate=2020-11-20

```

A successful response looks like this:

```
{
  "results": [
    {
      "id": "5fa931eb674134a0d6e1a38d7",
      "retailerId": "20380",
      "source": "autotrader",
      "status": "NEW_LEAD",
      "contact": {
        "firstName": "John",
        "surname": "Smith",
        "telephone": "07555527000"
      },
      "advert": {
        "stockReference": "20171010153045",
        "vehicle": {
          "make": "Ford",
          "model": "Fiesta",
          "derivative": "1.0 ST-Line 3dr",
          "vrm": "TY5 8ESY"
        }
      },
      "journey": {
        "type": "deal-builder",
        "subTypes": [
          "part-exchange-guide",
          "email"
        ]
      },
      "createdDate": "2022-03-26T11:38:13Z",
      "updatedDate": "2022-03-26T13:12:45Z"
    },
    {
      "id": "623f105a54b3a232da7a1047",
      "retailerId": "20380",
      "source": "autotrader",
      "status": "ACKNOWLEDGED",
      "contact": {
        "firstName": "Mary",
        "surname": "Dealer",
        "telephone": "07755522211"
      },
      "advert": {
        "stockReference": "202202172677361",
        "vehicle": {
          "make": "Nissan",
          "model": "Micra",
          "derivative": "1.0 IG-T N-Sport (s/s) 5dr",
          "vrm": "HT21MJU"
        }
      },
      "journey": {
        "type": "guaranteed-part-exchange",
        "subTypes": [
          
        ]
      },
      "createdDate": "2022-03-26T13:08:42Z",
      "updatedDate": "2022-03-26T13:42:14Z"
    },
    {
      "id": "5fa931eb76134a0d6e1a38c7",
      "retailerId": "20381",
      "source": "autotrader",
      "status": "NEW_LEAD",
      "contact": {
        "telephone": "44123456789"
      },
      "journey": {
        "type": "call",
        "subTypes": [
          
        ]
      },
      "createdDate": "2022-03-26T12:11:23Z",
      "updatedDate": "2022-03-26T12:12:14Z"
    }
  ],
  "pager": {
    "size": 10,
    "totalElements": 186,
    "totalPages": 19,
    "number": 2
  }
}
```

Results Array

| Parameter | Type | Description |
| --- | --- | --- |
| id | String | unique GUID associated to the specific lead |
| retailerId | String | Autotrader retailer ID associated to the lead |
| source | String | The source of the lead by currently always`"autotrader"` |
| status | String | Status of the Lead in the Autotrader Platform`"NEW_LEAD, NEW_MESSAGE, ACKNOWLEDGED"` |
| contact | Array | Simplified array of contact details see response collecton for more details |
| advert | Object | Simplified Object of Advert details see response collecton for more details |
| journey | Array | Simplified array of lead source data details see response collecton for more details |
| createdDate | TimeStamp | Creation of the lead in UTC |
| updatedDate | TimeStamp | Timestamp of when the lead was last updated in UTC |

Pager Array

| Parameter | Type | Description |
| --- | --- | --- |
| size | Integer | Number of items set to be loaded per page ( Default is 10 ) |
| totalElements | Integer | Total of total leads available |
| number | Integer | Current page number being read starting at 0 |

Journey Array

This data block contains information about the origin of the lead. Can be null.

| Parameter | Type | Description |
| --- | --- | --- |
| type | String | Describes the format of the lead, eg. type: guaranteed-part-exchange. |
| subtype | Array | An array of types for leads which are made up of other types, eg. type: deal-builder can have subtypes: [email, finance, part-exchange-guide]. Subtypes are empty if not applicable. |

These values can be both type and subtype, unless stated otherwise. Possible values are:

| Type | Description |
| --- | --- |
| finance | A lead from a finance quote being generated and submitted to a retailer. |
| part-exchange-guide | A lead from a part exchange valuation being generated and submitted to a retailer. |
| email | A lead from a general enquiry from either an advert or the retailer stores page. |
| deal-builder | A lead made up of one or more other lead types. |
| guaranteed-part-exchange | A lead from an Autotrader guaranteed part exchange being generated and submitted to a retailer. |
| reservation | A lead from a reservation being placed for a vehicle advertised on Autotrader. |
| call | A lead from a call to a retailer’s advert contact number. |
| new-car | A lead from the new car configurator journey on Autotrader. |
| finance-application | A lead from a customer creating a finance application. |
| home-delivery | A lead from a customer requesting home delivery for a vehicle advertised on Autotrader. |
| click-and-collect | A lead from a customer requesting to click and collect for a vehicle advertised on Autotrader. |
| allocated-stock | A lead from a general enquiry for a physical new car or van advert which is allocated to a specific retailer. |
| network-stock | A lead from a general enquiry for a physical new car or van advert which may not be allocated to the retailer advertising the vehicle. |
| lease-contract | A lead generated from a customer requesting a personalised leasing quote. |

deal-builder subtypes

| Subtype | Description |
| --- | --- |
| finance | Represents that the deal-builder lead had a finance quote generated. |
| part-exchange-guide | Represents that the deal-builder lead had a part exchange valuation generated. |
| email | Represents that the deal-builder lead contains a general enquiry. |
| guaranteed-part-exchange | Represents that the deal-builder lead had a guaranteed part exchange generated. |
| allocated-stock | Represents that the deal-builder lead was for a physical new car or van advert which is allocated to a specific retailer. |
| network-stock | Represents that the deal-builder lead was for a physical new car or van advert which may not be allocated to the retailer advertising the vehicle. |

call subtypes

| Subtype | Description |
| --- | --- |
| allocated-stock | Represents that the call referenced in the lead was for a physical new car or van advert which is to be allocated to a specific retailer. |

## Retrieve a lead

Sample request:

```
GET service/leads-v1/leads/5f921b61da9b416a5548f665

```

Request

`GET /leads/{leadId}`

Path Variables

This request requires the following path parameters:

| Path Parameters | Description |
| --- | --- |
| leadId | The id of the lead |

###Response

All data contained within this collection are structural information relating to the lead with direct textual / consumer submitted request information including lead type ( text / call ) are contained in the messages collection

A successful reservation response looks like this:

```
{
  "retailerId": "4400",
  "source": "autotrader",
  "consent": true,
  "contact": {
    "firstName": "John",
    "surname": "Doe",
    "email": "john.doe@gmail.com",
    "preferredContactMethod": "email"
  },
  "advert": {
    "description": "SEAT Leon 1.0 SE TECHNOLOGY TSI DSG ECOMOTIVE 5d AUTO 114 BHP SAT NAV & HILL HOLD",
    "stockReference": "202205247208168",
    "imageUrl": "https://m.atcdn.co.uk/a/media/{resize}/8f02ba69e7e743308e49eb1923c41523.jpg",
    "vehicle": {
      "make": "SEAT",
      "model": "LEON",
      "derivative": "1.0 SE TECHNOLOGY TSI DSG ECOMOTIVE 5d AUTO 114 BHP SAT NAV & HILL HOLD",
      "vrm": "KJ17YBS",
      "vin": "VSSZZZ5FZHR068452",
      "mileage": 65750,
      "type": "Car",
      "colour": "White",
      "doors": 5,
      "yearOfManufacture": 2017,
      "bodyType": "Hatchback",
      "transmission": "Automatic",
      "engineCapacity": "1.0L",
      "fuelType": "Petrol"
    },
    "price": 11000,
    "priceMinusVAT": 11000,
    "externalClientReference": "4375658"
  },
  "addOns": [
    
  ],
  "journey": {
    "type": "reservation",
    "subTypes": [
      
    ]
  },
  "status": "NEW_LEAD",
  "createdDate": "2022-05-27T15:33:07Z",
  "updatedDate": "2022-05-27T15:38:05Z",
  "_links": {
    "self": {
      "href": "/leads/6290ef33bb6d781439cc0244"
    },
    "messages": {
      "href": "/leads/6290ef33bb6d781439cc0244/messages"
    }
  },
  "id": "6290ef33bb6d781439cc0244"
}
```

A successful deal-builder response looks like this:

```
{
  "retailerId": "4400",
  "source": "autotrader",
  "consent": true,
  "contact": {
    "firstName": "John",
    "surname": "Doe",
    "telephone": "01234567891",
    "email": "john.doe@gmail.com",
    "preferredContactMethod": "telephone"
  },
  "advert": {
    "description": "KIA Picanto 1.0 1 Euro 6 5dr",
    "stockReference": "202203223823246",
    "imageUrl": "https://m.atcdn.co.uk/a/media/{resize}/3a1d4bcd82424292b5ed6e4a2bc8e5b0.jpg",
    "vehicle": {
      "make": "Kia",
      "model": "Picanto",
      "derivative": "1.0 1 Euro 6 5dr",
      "vrm": "YB68EGV",
      "vin": "KNAB2511LKT385731",
      "mileage": 12426,
      "type": "Car",
      "colour": "Blue",
      "doors": 5,
      "yearOfManufacture": 2018,
      "bodyType": "Hatchback",
      "transmission": "Manual",
      "engineCapacity": "1.0L",
      "fuelType": "Petrol"
    },
    "price": 8058,
    "priceMinusVAT": 8058
  },
  "addOns": [
    {
      "valuation": 470,
      "consumerVehicle": {
        "make": "Suzuki",
        "model": "Splash",
        "derivative": "1.0 12V GLS 5dr",
        "vrm": "KJ17YBS",
        "mileage": 90000,
        "type": "cars",
        "colour": "Grey",
        "yearOfManufacture": 2009,
        "transmission": "Manual",
        "fuelType": "Petrol"
      },
      "type": "partExchange"
    },
    {
      "finance": {
        "priceToPay": 8058,
        "annualMileage": 10000,
        "monthlyFinancePrice": 115.39,
        "type": "PCP",
        "monthlyPayment": 115.39,
        "term": 48,
        "deposit": 1470,
        "totalCredit": 6588,
        "totalPayable": 9826.83,
        "representativeApr": 9.5,
        "totalInterestPayable": 1768.83,
        "fixedInterestRate": 4.68,
        "finalPayment": 2933.5,
        "optionToPurchaseFee": 1,
        "onRoadPrice": 8058,
        "lender": "MotoNovo Finance"
      },
      "type": "finance"
    }
  ],
  "journey": {
    "type": "deal-builder",
    "subTypes": [
      "part-exchange-guide",
      "email",
      "finance"
    ]
  },
  "status": "NEW_LEAD",
  "createdDate": "2022-05-30T08:08:17Z",
  "updatedDate": "2022-05-30T08:08:17Z",
  "_links": {
    "self": {
      "href": "/leads/62947b71483a611e6f6816f6"
    },
    "messages": {
      "href": "/leads/62947b71483a611e6f6816f6/messages"
    }
  },
  "id": "62947b71483a611e6f6816f6"
}
```

Lead Object

| Parameter | Type | Description |
| --- | --- | --- |
| retailerId | String | Autotrader retailer ID associated to the lead |
| source | String | The source of the lead by currently always`"autotrader"` |
| consent | Boolean | A confirmation the consumer has agreed that Autotrader can transfer data for the lead |
| contact | Array | Array of collected contact information |
| advert | Object | Vehicle data linked from the lead, data available can vary dependant on the addon / journey type |
| addOns | Array | Array of selected / configured details associated to the lead can be multiple types |
| journey | Array | Array of the entry point of the lead into the platform |
| status | String | Status of the Lead in the Autotrader Platform`"NEW_LEAD, NEW_MESSAGE, ACKNOWLEDGED"` |
| createdDate | TimeStamp | Creation of the lead in UTC |
| updatedDate | TimeStamp | Timestamp of when the lead was last updated in UTC |
| _links | Array | Contains relational and messages links for template consumption |
| id | String | GUID for the lead requested |

addOns Array

The Addons payload is optional and is only returned where appropriate

| Parameter | Type | Description |
| --- | --- | --- |
| newCar | Array | Contains configuration details related to a vehicle selected through the Autotrader new car configuration journey |
| allocatedNewCarStock | String | A signifier that the lead is related to physical new cars/vans on the Autotrader |
| networkNewCarStock | String | A signifier that the physical new car lead was generated via a Group stock facility on Autotrader and may not be allocated to the retailer directly |
| finance | Array | Financial payment structures submitted at time of lead submission |
| partExchange | Array | Details associated to a part exchange request submitted with the lead |

## Lead Messages

The contents of the messages collection contains an array of all interactions with the generating consumer.

Where utilising the facility to interact via the Autotrader email service this can be replied to via the reply to a lead process. Otherwise, this collection can be used to append / consume into your integration as lead content.

### Retrieve lead messages

Sample request:

```
GET /leads/12345/messages

```

A successful text response looks like this:

```
[
  {
    "payload": {
      "content": "Does the car have Sat Nav",
      "type": "text"
    },
    "sender": "consumer",
    "createdDate": "2020-11-16T10:56:28Z"
  }
]
```

A successful voice response looks like this:

```
[
  {
    "payload": {
      "callReference": "87605273482402",
      "callResult": "ANSWERED",
      "hasRecording": false,
      "callDurationSeconds": 20,
      "type": "voice"
    },
    "sender": "consumer",
    "createdDate": "2020-11-13T13:18:22Z"
  }
]
```

Request

`GET /leads/{leadId}/messages`

Path Variables

This request requires the following path parameters:

| Path Parameter | Description |
| --- | --- |
| leadId | The id of the lead |

Response

Repeatable array containing the below parameters

| Parameter | Type | Description |
| --- | --- | --- |
| payload | Array | Contains the textual content / call information relating to the included Type |
| sender | String | flag identifying the payload generator this is either Retailer or Consumer |
| createdDate | Timestamp | Date / time of the payload instance created |
| readDate | Timestamp | The timestamp of when the text lead was viewed in the Autotrader consumer interface |

Call Result

| Description |
| --- |
| ANSWERED | The call was answered |
| HANGUP | The caller hung up the call during the flow (if it was an IVR) or while the phone was ringing |
| HANGUP-RECORD-ALERT | The caller hung up the call in the middle of recording alert message 'This call may be recorded…' |
| HANGUP-WHISPER-CALLED | The dealer hung up during the whisper to called |
| HANGUP-WHISPER-CALLER | The caller hung up during the whisper to caller |
| NO ANSWER | The call timed out on ringing and was disconnected by the carrier |
| BUSY | The destination was engaged or couldn't answer |
| REJECTED | Rejected |
| CANCEL | Cancelled |
| FAILED | Failed |
| NO MATCHING LINK | Call to a voxnumber which wasn't attached to a link |
| NO RULES SET | No rules attached to the voxnumber. Normally only occurs by human error during setup or if someone removes rules from a link |
| RULES BROKEN | Rules variables are not set correctly e.g. the contact has not been assigned |

### Reply to lead's message

Sample POST ( 201 Created ):

```
POST /leads/12345/messages

```

```
{
  "sender": "retailer",
  "payload": {
    "type": "text",
    "content": "Yes the vehicle has sat nav"
  }
}
```

A successful recall in messages endpoint:

```
GET /leads/12345/messages

```

```
[
  {
    "payload": {
      "content": "Does the car have Sat Nav",
      "type": "text"
    },
    "sender": "consumer",
    "createdDate": "2020-11-16T10:56:28Z"
  },
  {
    "payload": {
      "content": "Yes thee vehicle has sat nav",
      "type": "text"
    },
    "sender": "retailer",
    "createdDate": "2020-11-17T08:27:13Z"
  }
]
```

Where a reply post is submitted for the lead the consumer will receive an email advising of a response and will be advised to view this in an online portal.

Request

`POST /leads/{leadId}/messages`

Path Variables

This request requires the following path parameters:

| Path Parameter | Description |
| --- | --- |
| leadId | The id of the lead |

## Update status of a lead

Sample PUT ( 204 No Content ):

```
PUT /leads/12345/status

```

```
Content-Type: text/plain
ACKNOWLEDGED

```

The lead status is an interactive node used across the Autotrader leads portal and active API interactions. When the content is read by either platform the lead status is /should be altered to its reflective its new state.

Request

`PUT /leads/{leadId}/status`

Path Variables

This request requires the following path parameters:

| Path Parameters | Description |
| --- | --- |
| leadId | The id of the lead |

## Lead Notification

Sample Lead event notification:

```
{
  "id": "d0181ba15793600078a469d6a81ba0fd",
  "time": "2022-07-01T14:06:18.422Z",
  "type": "LEAD",
  "data": {
    "status": "Created",
    "advertiser": {
      "advertiserId": "12423"
    },
    "metadata": {
      "stockId": "8a469d6a81ba0fdd0181ba1579360007",
      "searchId": "20220104567834"
    },
    "consumer": {
      "firstName": "Joe",
      "surname": "Bloggs",
      "postcode": "NE2 4LQ",
      "telephone": "01231 234567",
      "email": "joebloggs@mail.com",
      "preferredContactMethod": "Email",
      "type": "Email"
    }
  }
}
```

A lead notification is generated when a new enquiry is received or updated for enabled advertisers.

This event is intended as a signal to ingest data via our Leads API.

Lead Status Mapping

| Node | Leads API Mapping |
| --- | --- |
| Created | A lead has been generated ( NEW_LEAD in the Leads API) |
| Advertiser Response | The advertiser has used the messaging platform to email the customer (NEW_MESSAGE in Leads API ) |
| Consumer Response | The Consumer has replied to the messaging platform (NEW_MESSAGE in Leads API ) |

## Errors

### 400 Bad Request

In case you receive HTTP status code 400, make sure you provide all required parameters properly.

```
{
  "errorCode": "Bad Request",
  "errorCode": "Bad Request",
  "errorMessage": "retailerId is not valid"
}
```

The request was malformed.

### 403 Forbidden

In case you receive HTTP status code 403, you are not authorized to access this resource. If a response body exists, it will include an error providing further information.

```
{
  "errorCode": "Unauthorized",
  "errorMessage": "You are not authorized to access this resource"
}
```

If you receive the following response, make sure you are passing the Bearer token as an Authorization header.

```
{
  "code": 403,
  "message": "Forbidden"
}
```

If you receive the following response, then you are passing an invalid or expired`{access_token}`. You should catch this error response and regenerate another`{access_token}`.

```
{
  "code": 403,
  "message": "Token is not valid"
}
```

The requested resource was unauthorised - please see authentication section above.

### 404 Not Found

In case you receive the following response, make sure you provide an existing leadId.

```
{
  "errorCode": "Not found",
  "errorMessage": "No lead with id '987654' exists"
}
```

We are unable to find a lead with leadId provided.

## FAQs

### Does the field RetailerID correspond to the existing DealerID?

Retailer ID is equivalent to Dealer ID.

### Can you describe what the “consent” field represents?

The consent field is the consent the consumer has agreed to when submitting their enquiry. This is the text they consent to (might change before the release):

"I consent to my details being sent to the seller and any third parties they use so that they can contact me."

### Is it possible to have more than one add-on per lead?

The API supports zero to many add-on per lead.

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