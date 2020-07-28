const getElementIndex = (date, holiday, isStart) => {
  console.log(date, holiday, isStart);
  let l = 0,
    h = holiday.length - 1;
  while (l < h) {
    let mid = Math.floor((l + h) / 2);
    console.log(l, h, mid);
    if (holiday[mid] === date) {
      return [mid, true];
    } else if (holiday[mid] > date) {
      h = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  return [l, false];
};

const getWorkingDays = (start, end, holidays) => {
  console.log('started execution');
  const [startIndex, startFound] = getElementIndex(start, holidays, true),
    [endIndex, endFound] = getElementIndex(end, holidays);
  // not date
  console.log('Start', startIndex, endIndex);
  const totalDays = end - start - 1;
  let holidaysBetween = 0;
  if (startFound || endFound) {
    holidaysBetween = endIndex - startIndex - 1;
  } else {
    holidaysBetween = endIndex - startIndex;
  }
  console.log('Total days', totalDays, ' Holidays between ', holidaysBetween);
  return totalDays - holidaysBetween;
};
const holidays = [2, 4, 78, 90, 923, 970, 1000];
const start = 6,
  end = 91;
console.log('main function called');
console.log(getWorkingDays(start, end, holidays));
