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