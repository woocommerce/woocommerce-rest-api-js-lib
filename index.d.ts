import * as OAuth from 'oauth-1.0a'

export declare type WooCommerceRestApiVersion =
  | 'wc/v3'
  | 'wc/v2'
  | 'wc/v1'
  | 'wc-api/v3'
  | 'wc-api/v2'
  | 'wc-api/v1'
export declare type WooCommerceRestApiEncoding = 'utf-8' | 'ascii'
export declare type WooCommerceRestApiMethod =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'options'

export interface IWooCommerceRestApiOptions {
  /* Your Store URL, example: http://woo.dev/ */
  url: string
  /* Your API consumer key */
  consumerKey: string
  /* 	Your API consumer secret */
  consumerSecret: string
  /* Custom WP REST API URL prefix, used to support custom prefixes created with the `rest_url_prefix filter` */
  wpAPIPrefix?: string
  /* API version, default is `v3` */
  version?: WooCommerceRestApiVersion
  /* Encoding, default is 'utf-8' */
  encoding?: WooCommerceRestApiEncoding
  /* When `true` and using under HTTPS force Basic Authentication as query string, default is `false` */
  queryStringAuth?: boolean
  /* Provide support for URLs with ports, eg: `8080` */
  port?: number
  /* Define the request timeout */
  timeout?: number
  /* Define the custom Axios config, also override this library options */
  axiosConfig?: any
}

export interface IWooCommerceRestApiQuery {
  [key: string]: string
}

/**
 * WooCommerce REST API wrapper
 *
 * @param {Object} opt
 */
export default class WooCommerceRestApi {
  protected classVersion: string
  protected url: string
  protected consumerKey: string
  protected consumerSecret: string
  protected wpAPIPrefix: string
  protected version: WooCommerceRestApiVersion
  protected encoding: WooCommerceRestApiEncoding
  protected queryStringAuth: boolean
  protected port: number
  protected timeout: number
  protected axiosConfig: any

  /**
   * Class constructor.
   *
   * @param {Object} opt
   */
  constructor(opt: IWooCommerceRestApiOptions | WooCommerceRestApi)

  /**
   * Set default options
   *
   * @param {Object} opt
   */
  private _setDefaultsOptions(opt: IWooCommerceRestApiOptions): void

  /**
   * Parse params object.
   *
   * @param {Object} params
   * @param {Object} query
   */
  private _parseParamsObject(params: any, query: any): IWooCommerceRestApiQuery

  /**
   * Normalize query string for oAuth
   *
   * @param  {String} url
   * @param  {Object} params
   *
   * @return {String}
   */
  private _normalizeQueryString(url: string, params: any): string

  /**
   * Get URL
   *
   * @param  {String} endpoint
   * @param  {Object} params
   *
   * @return {String}
   */
  private _getUrl(endpoint: string, params: any): string

  /**
   * Get OAuth
   *
   * @return {Object}
   */
  private _getOAuth(): OAuth

  /**
   * Do requests
   *
   * @param  {String} method
   * @param  {String} endpoint
   * @param  {Object} data
   * @param  {Object} params
   *
   * @return {Object}
   */
  private _request(
    method: WooCommerceRestApiMethod,
    endpoint: string,
    data: any,
    params: any
  ): Promise<any>

  /**
   * GET requests
   *
   * @param  {String} endpoint
   * @param  {Object} params
   *
   * @return {Object}
   */
  public get(endpoint: string): Promise<any>
  public get(endpoint: string, params: any): Promise<any>

  /**
   * POST requests
   *
   * @param  {String} endpoint
   * @param  {Object} data
   * @param  {Object} params
   *
   * @return {Object}
   */
  public post(endpoint: string, data: any): Promise<any>
  public post(endpoint: string, data: any, params: any): Promise<any>

  /**
   * PUT requests
   *
   * @param  {String} endpoint
   * @param  {Object} data
   * @param  {Object} params
   *
   * @return {Object}
   */
  public put(endpoint: string, data: any): Promise<any>
  public put(endpoint: string, data: any, params: any): Promise<any>

  /**
   * DELETE requests
   *
   * @param  {String} endpoint
   * @param  {Object} params
   * @param  {Object} params
   *
   * @return {Object}
   */
  public delete(endpoint: string): Promise<any>
  public delete(endpoint: string, params: any): Promise<any>

  /**
   * OPTIONS requests
   *
   * @param  {String} endpoint
   * @param  {Object} params
   *
   * @return {Object}
   */
  public options(endpoint: string): Promise<any>
  public options(endpoint: string, params: any): Promise<any>
}

/**
 * Options Exception.
 */
export class OptionsException {
  public name: 'Options Error'
  public message: string

  /**
   * Constructor.
   *
   * @param {String} message
   */
  constructor(message: string)
}
