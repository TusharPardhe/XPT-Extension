import { AES, enc } from "crypto-js";

export const redirectToUrl = (url, newTab = false) => {
    newTab ? window.open(url, "_blank") : window.open(url);
};

export const encryptJSON = (data) => {
    const encrypt = AES.encrypt(JSON.stringify(data), process.env.ENCRYPTION_KEY).toString();
    return encrypt;
};

export const decryptJSON = (data) => {
    const decrypt = AES.decrypt(data, process.env.ENCRYPTION_KEY);
    return JSON.parse(decrypt.toString(enc.Utf8));
};

export const executeScrollToRef = (ref) => ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
