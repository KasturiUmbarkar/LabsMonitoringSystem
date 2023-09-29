export const storeData = (obj) => {
  for (const key in obj) {
    const value = JSON.stringify(obj[key]);
    localStorage.setItem(key, value);
  }
};

export const getStoredData = (key) => {
  const data = localStorage.getItem(key);
  const formattedData = JSON.parse(data);
  return formattedData;
};
