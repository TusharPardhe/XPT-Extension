import { encryptJSON, getDataFromLocalStrg } from './common.utils';

import { ENV } from '../constants/common.constants';
import axios from 'axios';
import { toast } from 'react-toastify';

export const API_CONFIG = {
    PRODUCTION: {
        default: 'http://xpt.suitcoin.ai/',
    },
    DEVELOPMENT: {
        default: 'http://18.171.184.98/',
    },
}[ENV];

export const ApiCall = (payload) => {
    const _axios = axios.create();

    if (payload.auth) {
        const jwToken = getDataFromLocalStrg('token');
        delete payload.jwt;
        payload.data.token = jwToken;
    }

    if (payload.baseURLKey) {
        const baseurl = API_CONFIG[payload.baseURLKey];
        payload.baseURL = baseurl ? baseurl : payload.baseURL;
        delete payload.baseURLKey;
    }

    if (!payload.baseURL) {
        const baseurl = API_CONFIG['default'];
        payload.baseURL = baseurl;
    }

    let axiosPayload = {
        url: payload.url || '',
        method: payload.method || 'get',
        baseURL: payload.baseURL || '',
        headers: payload.headers || {},
        params: payload.params || {},
        data: payload.data || {},
        config: payload.config || {},
        responseType: payload.responseType,
    };

    if (payload.encrypt) {
        const dataToEncrypt = axiosPayload.data;
        axiosPayload.data = {
            encryptedRequest: encryptJSON(dataToEncrypt, process.env.ENCRYPTION_KEY),
        };
    }

    console.log(
        `[${axiosPayload.method.toUpperCase()}] Request for API:`,
        ' ',
        axiosPayload.baseURL + axiosPayload.url,
        ' ',
        payload
    );

    return new Promise(function (resolve, reject) {
        _axios(axiosPayload)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                let errorResponse = error.response?.data || error.message;

                if (typeof errorResponse === 'object' && errorResponse.error) {
                    errorResponse = errorResponse.error;
                }
                errorResponse = errorResponse ?? 'Some error occurred';
                toast.error(errorResponse);

                if (errorResponse === 'Invalid Token') {
                    localStorage.clear();
                    window.location.href = window.location.origin;
                }

                reject(error);
            });
    });
};
