# WooCommerce REST API - JavaScript Library

New JavaScript library for WooCommerce REST API, supports CommonJS (CJS) and Embedded System Module (ESM).

Requests are made with [Axios library](https://github.com/axios/axios) with [support to promises](https://github.com/axios/axios#promises).

[![build status](https://secure.travis-ci.org/woocommerce/woocommerce-rest-api-js-lib.svg)](http://travis-ci.org/woocommerce/woocommerce-rest-api-js-lib)
[![dependency status](https://david-dm.org/woocommerce/woocommerce-rest-api-js-lib.svg)](https://david-dm.org/woocommerce/woocommerce-rest-api-js-lib)
[![npm version](https://img.shields.io/npm/v/@woocommerce/woocommerce-rest-api.svg)](https://www.npmjs.com/package/@woocommerce/woocommerce-rest-api)

## Installation

```
npm install --save @woocommerce/woocommerce-rest-api
```

## Getting started

Generate API credentials (Consumer Key & Consumer Secret) following this instructions <http://docs.woocommerce.com/document/woocommerce-rest-api/>
.

Check out the WooCommerce API endpoints and data that can be manipulated in <http://woocommerce.github.io/woocommerce-rest-api-docs/>.

## Setup

### ESM example:

```js
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: "http://example.com",
  consumerKey: "ck_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  consumerSecret: "cs_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  version: "wc/v3"
});
```

### CJS example:

```js
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: "http://example.com",
  consumerKey: "ck_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  consumerSecret: "cs_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  version: "wc/v3"
});
```

### Options

| Option            | Type      | Required | Description                                                                                                         |
|-------------------|-----------|----------|---------------------------------------------------------------------------------------------------------------------|
| `url`             | `String`  | yes      | Your Store URL, example: http://woo.dev/                                                                            |
| `consumerKey`     | `String`  | yes      | Your API consumer key                                                                                               |
| `consumerSecret`  | `String`  | yes      | Your API consumer secret                                                                                            |
| `wpAPIPrefix`     | `String`  | no       | Custom WP REST API URL prefix, used to support custom prefixes created with the `rest_url_prefix` filter            |
| `version`         | `String`  | no       | API version, default is `v3`                                                                                        |
| `encoding`        | `String`  | no       | Encoding, default is 'utf-8'                                                                                        |
| `queryStringAuth` | `Bool`    | no       | When `true` and using under HTTPS force Basic Authentication as query string, default is `false`                    |
| `port`            | `string`  | no       | Provide support for URLs with ports, eg: `8080`                                                                     |
| `timeout`         | `Integer` | no       | Define the request timeout                                                                                          |
| `axiosConfig`     | `Object`  | no       | Define the custom [Axios config](https://github.com/axios/axios#request-config), also override this library options |

## Methods

### GET

- `.get(endpoint)`
- `.get(endpoint, params)`

| Params     | Type     | Description                                                   |
|------------|----------|---------------------------------------------------------------|
| `endpoint` | `String` | WooCommerce API endpoint, example: `customers` or `orders/12` |
| `params`   | `Object` | Query strings params, example: `{ per_page: 20 }`             |

### POST

- `.post(endpoint, data)`
- `.post(endpoint, data, params)`

| Params     | Type     | Description                                                 |
|------------|----------|-------------------------------------------------------------|
| `endpoint` | `String` | WooCommerce API endpoint, example: `customers` or `orders`  |
| `data`     | `Object` | JS object to be converted into JSON and sent in the request |
| `params`   | `Object` | Query strings params                                        |

### PUT

- `.put(endpoint, data)`
- `.put(endpoint, data, params)`

| Params     | Type     | Description                                                       |
|------------|----------|-------------------------------------------------------------------|
| `endpoint` | `String` | WooCommerce API endpoint, example: `customers/1` or `orders/1234` |
| `data`     | `Object` | JS object to be converted into JSON and sent in the request       |
| `params`   | `Object` | Query strings params                                              |

### DELETE

- `.delete(endpoint)`
- `.delete(endpoint, params)`

| Params     | Type     | Description                                                     |
|------------|----------|-----------------------------------------------------------------|
| `endpoint` | `String` | WooCommerce API endpoint, example: `customers/2` or `orders/12` |
| `params`   | `Object` | Query strings params, example: `{ force: true }`                |

### OPTIONS

- `.options(endpoint)`
- `.options(endpoint, params)`

| Params     | Type     | Description                                                     |
|------------|----------|-----------------------------------------------------------------|
| `endpoint` | `String` | WooCommerce API endpoint, example: `customers/2` or `orders/12` |
| `params`   | `Object` | Query strings params                                            |

## Example of use

```js
// import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: "http://example.com",
  consumerKey: "ck_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  consumerSecret: "cs_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  version: "wc/v3"
});

// List products
api.get("products", {
  per_page: 20, // 20 products per page
})
  .then((response) => {
    // Successful request
    console.log("Response Status:", response.status);
    console.log("Response Headers:", response.headers);
    console.log("Response Data:", response.data);
    console.log("Total of pages:", response.headers['x-wp-totalpages']);
    console.log("Total of items:", response.headers['x-wp-total']);
  })
  .catch((error) => {
    // Invalid request, for 4xx and 5xx statuses
    console.log("Response Status:", error.response.status);
    console.log("Response Headers:", error.response.headers);
    console.log("Response Data:", error.response.data);
  })
  .finally(() => {
    // Always executed.
  });

// Create a product
api.post("products", {
  name: "Premium Quality", // See more in https://woocommerce.github.io/woocommerce-rest-api-docs/#product-properties
  type: "simple",
  regular_price: "21.99",
})
  .then((response) => {
    // Successful request
    console.log("Response Status:", response.status);
    console.log("Response Headers:", response.headers);
    console.log("Response Data:", response.data);
  })
  .catch((error) => {
    // Invalid request, for 4xx and 5xx statuses
    console.log("Response Status:", error.response.status);
    console.log("Response Headers:", error.response.headers);
    console.log("Response Data:", error.response.data);
  })
  .finally(() => {
    // Always executed.
  });

// Edit a product
api.put("products/1", {
  sale_price: "11.99", // See more in https://woocommerce.github.io/woocommerce-rest-api-docs/#product-properties
})
  .then((response) => {
    // Successful request
    console.log("Response Status:", response.status);
    console.log("Response Headers:", response.headers);
    console.log("Response Data:", response.data);
  })
  .catch((error) => {
    // Invalid request, for 4xx and 5xx statuses
    console.log("Response Status:", error.response.status);
    console.log("Response Headers:", error.response.headers);
    console.log("Response Data:", error.response.data);
  })
  .finally(() => {
    // Always executed.
  });

// Delete a product
api.delete("products/1", {
  force: true, // Forces to delete instead of move to the Trash
})
  .then((response) => {
    // Successful request
    console.log("Response Status:", response.status);
    console.log("Response Headers:", response.headers);
    console.log("Response Data:", response.data);
  })
  .catch((error) => {
    // Invalid request, for 4xx and 5xx statuses
    console.log("Response Status:", error.response.status);
    console.log("Response Headers:", error.response.headers);
    console.log("Response Data:", error.response.data);
  })
  .finally(() => {
    // Always executed.
  });
```

## Changelog

[See changelog for details](https://github.com/woocommerce/woocommerce-rest-api-js-lib/blob/master/CHANGELOG.md)
