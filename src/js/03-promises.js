import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const amount = refs.amount.value;
  const delay = refs.delay.value;
  const step = refs.step.value;
  for (let i = 0; i < amount; i += 1) {
    const position = Number(i) + 1;
    const currentDelay = Number(delay) + step * [i];
    createPromise(position, currentDelay)
      .then(({ position, delay }) => {
        notifySuccess({ position, delay });
      })
      .catch(({ position, delay }) => {
        notifyError({ position, delay });
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function notifyError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

function notifySuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}
