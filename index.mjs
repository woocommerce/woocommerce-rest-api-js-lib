"use strict";

import axios from 'axios';
import createHmac from 'create-hmac';
import OAuth from 'oauth-1.0a';
import _url from 'url';

/**
 * WooCommerce REST API wrapper
 *
 * @param {Object} opt
 */
export default class WooCommerceAPI {

    /**
     * Class constructor.
     *
     * @param {Object} opt
     */
    constructor(opt) {
        if (!(this instanceof WooCommerceAPI)) {
            return new WooCommerceAPI(opt);
        }

        opt = opt || {};

        if (!(opt.url)) {
            throw new Error('url is required');
        }

        if (!(opt.consumerKey)) {
            throw new Error('consumerKey is required');
        }

        if (!(opt.consumerSecret)) {
            throw new Error('consumerSecret is required');
        }

        this.classVersion = '0.0.1';
        this._setDefaultsOptions(opt);
    }

    /**
     * Set default options
     *
     * @param {Object} opt
     */
    _setDefaultsOptions(opt) {
        this.url             = opt.url;
        this.wpAPI           = opt.wpAPI || false;
        this.wpAPIPrefix     = opt.wpAPIPrefix || 'wp-json';
        this.version         = opt.version || 'v3';
        this.isSsl           = /^https/i.test(this.url);
        this.consumerKey     = opt.consumerKey;
        this.consumerSecret  = opt.consumerSecret;
        this.verifySsl       = opt.verifySsl || true;
        this.encoding        = opt.encoding || 'utf8';
        this.queryStringAuth = opt.queryStringAuth || false;
        this.port            = opt.port || '';
        this.timeout         = opt.timeout;
    }

    /**
     * Normalize query string for oAuth
     *
     * @param  {string} url
     * @return {string}
     */
    _normalizeQueryString(url) {
        // Exit if don't find query string.
        if (url.indexOf('?') === -1) {
            return url;
        }

        const query  = _url.URL(url, true).query;
        const params = [];

        let queryString = '';

        for (const p in query) {
            params.push(p);
        }
        params.sort();

        for (const i in params) {
            if (queryString.length) {
                queryString += '&';
            }

            queryString += encodeURIComponent(params[i]).replace('%5B', '[').replace('%5D', ']');
            queryString += '=';
            queryString += encodeURIComponent(query[params[i]]);
        }

        return url.split('?')[0] + '?' + queryString;
    }

    /**
     * Get URL
     *
     * @param  {String} endpoint
     *
     * @return {String}
     */
    _getUrl(endpoint) {
        const api = this.wpAPI ? this.wpAPIPrefix + '/' : 'wc-api/';

        let url = this.url.slice(-1) === '/' ? this.url : this.url + '/';

        url = url + api + this.version + '/' + endpoint;

        // Include port.
        if (this.port !== '') {
            const hostname = _url.URL(url, true).hostname;

            url = url.replace(hostname, hostname + ':' + this.port);
        }

        if (!this.isSsl) {
            return this._normalizeQueryString(url);
        }

        return url;
    }

    /**
     * Get OAuth
     *
     * @return {Object}
     */
    _getOAuth() {
        const data = {
            consumer: {
                key: this.consumerKey,
                secret: this.consumerSecret
            },
            signature_method: 'HMAC-SHA256',
            hash_function: function(base, key) {
                return createHmac('sha256', key).update(base).digest('base64');
            }
        };

        if ([ 'v1', 'v2' ].indexOf(this.version) > -1) {
            data.last_ampersand = false;
        }

        return new OAuth(data);
    }

    /**
     * Do requests
     *
     * @param  {String} method
     * @param  {String} endpoint
     * @param  {Object} data
     *
     * @return {Object}
     */
    _request(method, endpoint, data) {
        const url = this._getUrl(endpoint);

        const options = {
            url: url,
            method: method,
            responseEncoding: this.encoding,
            timeout: this.timeout,
            responseType: 'json',
            headers: {
                'User-Agent': 'WooCommerce REST API - JS Client/' + this.classVersion,
                'Accept': 'application/json'
            }
        };

        if (this.isSsl) {
            if (this.queryStringAuth) {
                options.params = {
                    consumer_key: this.consumerKey,
                    consumer_secret: this.consumerSecret
                };
            } else {
                options.auth = {
                    username: this.consumerKey,
                    password: this.consumerSecret
                };
            }

            if (!this.verifySsl) {
                options.strictSSL = false;
            }
        } else {
            options.params = this._getOAuth().authorize({
                url: url,
                method: method
            });
        }

        if (data) {
            options.headers['Content-Type'] = 'application/json;charset=utf-8';
            options.data = JSON.stringify(data);
        }

        return axios(options);
    }

    /**
     * GET requests
     *
     * @param  {String} endpoint
     *
     * @return {Object}
     */
    get(endpoint) {
        return this._request('get', endpoint, null);
    }

    /**
     * POST requests
     *
     * @param  {String} endpoint
     * @param  {Object} data
     *
     * @return {Object}
     */
    post(endpoint, data) {
        return this._request('post', endpoint, data);
    }

    /**
     * PUT requests
     *
     * @param  {String} endpoint
     * @param  {Object} data
     *
     * @return {Object}
     */
    put(endpoint, data) {
        return this._request('put', endpoint, data);
    }

    /**
     * DELETE requests
     *
     * @param  {String} endpoint
     *
     * @return {Object}
     */
    delete(endpoint) {
        return this._request('delete', endpoint, null);
    }

    /**
     * OPTIONS requests
     *
     * @param  {String} endpoint
     *
     * @return {Object}
     */
    options(endpoint) {
        return this._request('options', endpoint, null);
    }
}
