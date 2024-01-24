import { AES, enc } from 'crypto-js';
import { SUIT_COIN_HEX, SUIT_COIN_ISSUER, VALIDATION_REGEX } from '../constants/common.constants';

import { convertHexToString } from 'xrpl';
import parse from 'html-react-parser';
import { toast } from 'react-toastify';

export const redirectToUrl = (url, newTab = false) => {
    newTab ? window.open(url, '_blank') : window.open(url);
};

export const encryptJSON = (data, encryptionKey) => {
    const encrypt = AES.encrypt(JSON.stringify(data), encryptionKey).toString();
    return encrypt;
};

export const decryptJSON = (data, encryptionKey) => {
    const decrypt = AES.decrypt(data, encryptionKey);
    const str = decrypt.toString(enc.Utf8);
    return JSON.parse(str);
};

export const saveInLocalStrg = (key, data, encryptionKey) => {
    if (encryptionKey) {
        data = encryptJSON(data, encryptionKey);
    }

    localStorage.setItem(key, data);
};

export const getDataFromLocalStrg = (key, encryptionKey) => {
    let data = localStorage.getItem(key);
    if (!data) {
        return null;
    }

    if (encryptionKey) {
        data = decryptJSON(data, encryptionKey);
    }

    return data;
};

export const scrollToRef = (ref) => ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

export const getTokenName = (value) =>
    value.length === 40 ? convertHexToString(value).replaceAll('\u0000', '') : value;

export const valueToLocaleString = (value, decimal = 4) =>
    value
        ? parseFloat(value).toLocaleString(undefined, {
              minimumFractionDigits: decimal,
              maximumFractionDigits: decimal,
          })
        : '-';

export const linkify = (inputText) => {
    let replacedText = inputText;
    replacedText = inputText.replace(VALIDATION_REGEX.URL_PATTERN_1, `<a href="$1" target="_blank">$1</a>`);
    replacedText = replacedText.replace(VALIDATION_REGEX.URL_PATTERN_2, `$1<a href="http://$2" target="_blank">$2</a>`);
    replacedText = replacedText.replace(VALIDATION_REGEX.URL_PATTERN_3, `<a href="mailto:$1">$1</a>`);
    return replacedText === inputText ? replacedText : parse(replacedText);
};

export const sendMessageToBgScript = (data) => {
    chrome.runtime.sendMessage(data);
};

export const copyToClipBoard = (value) => {
    navigator.clipboard.writeText(value);
    toast.success('Copied to clipboard!', {
        autoClose: 100,
        hideProgressBar: true,
    });
};

export const numberWithCommas = (x) => {
    if (x === undefined || x === null) return;

    let parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    if (parts.length > 1) {
        parts[1] = parts[1].slice(0, 4);
    }

    return parts.join('.');
};

export const transferSuitCoin = async ({ destination, amount, wallet }) => {
    const transaction = {
        TransactionType: 'Payment',
        Account: wallet.address,
        Destination: destination,
        Amount: {
            currency: SUIT_COIN_HEX,
            value: amount.toString(),
            issuer: SUIT_COIN_ISSUER,
        },
        Fee: '24',
    };

    return transaction;
};

export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
};

export const timer = (endDate) => {
    const start = new Date();
    const end = new Date(endDate);
    if (end < start) return 0;

    const diffInMilliseconds = end - start;
    const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    return days;
};
