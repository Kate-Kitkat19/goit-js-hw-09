import Notiflix from 'notiflix';

const refs = {
  formRef: document.querySelector('.form'),
  delayRef: document.querySelector('input[name="delay"]'),
  stepRef: document.querySelector('input[name="step"]'),
  amountRef: document.querySelector('input[name="amount"]'),
};

refs.formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const amount = refs.amountRef.value;
  const delay = refs.delayRef.value;
  const step = refs.stepRef.value;
  for (let i = 1; i <= amount; i += 1) {
    const position = [i];
    const currentDelay = Number(delay) + step * [i];
    console.log('currentDelay', currentDelay);
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

//
