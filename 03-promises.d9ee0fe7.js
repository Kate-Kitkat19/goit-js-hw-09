const e=Math.round(1e3*Math.random());new Promise(((o,t)=>{const h=Math.random();setTimeout((()=>{h>.5?o(`It's resolved with the delay of ${e}!`):t(`It's rejected with the delay of ${e}!`)}),e)})).then((e=>console.log(e))).catch((e=>console.log(e)));
//# sourceMappingURL=03-promises.d9ee0fe7.js.map
