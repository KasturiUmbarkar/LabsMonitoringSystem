/**
 * stores the data in localstorage
 * @param {object} obj - object which needs to store
 */
export const storeData = (obj) => {
  for (const key in obj) {
    const value = JSON.stringify(obj[key]);
    localStorage.setItem(key, value);
  }
};

/**
 * get the data from localstorage
 * @param {string} key - key whose value needs to retrieve from localstorage
 */
export const getStoredData = (key) => {
  const data = localStorage.getItem(key);
  const formattedData = JSON.parse(data);
  return formattedData;
};
