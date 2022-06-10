export const isValidXrplRAddress = (value) => value.startsWith("r") && value.length >= 25 && value.length <= 35;
