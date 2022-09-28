// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }
const delay = Math.round(Math.random() * 1000);
const promise = new Promise((resolve, reject) => {
  const number = Math.random();
  setTimeout(() => {
    if (number > 0.5) {
      resolve(`It's resolved with the delay of ${delay}!`);
    } else {
      reject(`It's rejected with the delay of ${delay}!`);
    }
  }, delay);
});

promise.then(data => console.log(data)).catch(error => console.log(error));
