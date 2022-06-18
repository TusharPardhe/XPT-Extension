import { AES, enc } from "crypto-js";
import { ENCRYPTION_KEY } from "../constants/common.constants";

export const redirectToUrl = (url, newTab = false) => {
    newTab ? window.open(url, "_blank") : window.open(url);
};

export const encryptJSON = (data) => {
    const encrypt = AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
    return encrypt;
};

export const decryptJSON = (data) => {
    const decrypt = AES.decrypt(data, ENCRYPTION_KEY);
    return JSON.parse(decrypt.toString(enc.Utf8));
};
