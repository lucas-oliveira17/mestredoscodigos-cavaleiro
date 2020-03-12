const hasError = param => param instanceof Error

const convertToSeconds = (hours, minutes, seconds) => `${hours}:${minutes}:${seconds}`.split(':').reduce((acc, time) => (60 * acc) + +time);

const raffle = array => array.sort(() => Math.random() - 0.5)

function isEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        return false;
      }
    }
  
    return JSON.stringify(obj) === JSON.stringify({});
}

export { hasError, convertToSeconds, raffle, isEmpty }