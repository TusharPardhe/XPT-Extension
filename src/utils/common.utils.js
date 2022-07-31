import { AES, enc } from "crypto-js";
import { convertHexToString } from "xrpl";
import { VALIDATION_REGEX } from "../constants/common.constants";

export const redirectToUrl = (url, newTab = false) => {
    newTab ? window.open(url, "_blank") : window.open(url);
};

export const encryptJSON = (data) => {
    const encrypt = AES.encrypt(JSON.stringify(data), process.env.ENCRYPTION_KEY).toString();
    return encrypt;
};

export const decryptJSON = (data) => {
    const decrypt = AES.decrypt(data, process.env.ENCRYPTION_KEY);
    const str = decrypt.toString(enc.Utf8);
    return JSON.parse(str);
};

export const saveInLocalStrg = (key, data, encrypted = true) => {
    if (encrypted) {
        data = encryptJSON(data)
    };
    localStorage.setItem(key, data);
};

export const getDataFromLocalStrg = (key, encrypted = true) => {
    let data = localStorage.getItem(key);
    if (!data) { return null; }

    if (encrypted) {
        data = decryptJSON(data);
    };

    return data;
}

export const scrollToRef = (ref) => ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

export const getTokenName = (value) => value.length === 40 ? convertHexToString(value).replaceAll("\u0000", "") : value;

export const stringToLocale = (value, decimal = 4) => parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: decimal, maximumFractionDigits: decimal });

export const linkify = (inputText) => {
    let replacedText = inputText;
    replacedText = inputText.replace(VALIDATION_REGEX.URL_PATTERN_1, `<a href="$1" target="_blank">$1</a>`);
    replacedText = replacedText.replace(VALIDATION_REGEX.URL_PATTERN_2, `$1<a href="http://$2" target="_blank">$2</a>`)
    replacedText = replacedText.replace(VALIDATION_REGEX.URL_PATTERN_3, `<a href="mailto:$1">$1</a>`)
    return replacedText;
}