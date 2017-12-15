export const createArrFromObj = obj => {
  let arr = [];
  for (let key in obj) {
    arr.push({ [key]: String(obj[key]).toLowerCase() });
  }
  return arr;
};

export const createArrFromObjPure = obj => {
  let arr = [];
  for (let key in obj) {
    arr.push({ [key]: obj[key] });
  }
  return arr;
};

export const getCorrectPeriod = str => {
  const year = 2016;
  let res;
  const numStr = str.toString();
  res = numStr.length > 1 ? year + numStr : year + "0" + numStr;
  return res;
};

export const getArrayFrom = ele => {
  if (Array.isArray(ele)) {
    return [...ele];
  } else if (typeof ele === "string" || typeof ele === "number") {
    return [ele];
  } else {
    console.log("getArrayFrom -> incorrect argument type");
    return false;
  }
};

export const createArrOfKeysFromObj = obj => {
  let arr = [];
  for (let key in obj) {
    arr.push(key);
  }
  return arr;
};
