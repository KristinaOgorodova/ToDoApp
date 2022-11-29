

export const setStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getStorage = (key) => {
    return JSON.parse(localStorage.getItem(key)) || [];
};