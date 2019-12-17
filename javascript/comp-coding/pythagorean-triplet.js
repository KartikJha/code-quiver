export default arr => {
  for (let i = 0; i < arr.length; i++) {
    const a = arr[i];
    for (let j = 0; j < arr.length; j++) {
      if (i !== j) {
        const b = arr[j];
        for (let k = 0; k < arr.length; k++) {
          if (i !== k && j !== k) {
            const c = arr[k];
            if (a ** 2 + b ** 2 === c ** 2) {
              return true;
            }
          }
        }
      }
    }
  }
  return false;
};
