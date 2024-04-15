import * as math from 'mathjs';


export const biseccionTabla = (yFunc, a, b, error) => {
  let tabla = [];
  let i = 1;
  const y = math.compile(yFunc);
  //primero se evalua si la multiplicación de las funciones es menor a 0
  if (y.evaluate({ x: a }) * y.evaluate({ x: b }) < 0) {
    let c = (a + b) / 2;
    let fc = y.evaluate({ x: c });
    let errorCalculado = Math.abs(b - a);
    tabla.push({
      i,
      a,
      b,
      c,
      fc,
      errorCalculado
    });
    while (errorCalculado > error) {
      i++;
      let fc = y.evaluate({ x: c });
      if (y.evaluate({ x: a }) * fc < 0) {
        b = c;
      } else {
        a = c;
      }
      c = (a + b) / 2;
      errorCalculado = Math.abs(c - a);
      fc = y.evaluate({ x: c });
      tabla.push({
        i,
        a,
        b,
        c,
        fc,
        errorCalculado
      });
    }
  } else {
    throw new Error('No se puede aplicar el método de la bisección');
  }
  return tabla;
};


export const falsaPosicionTabla = (y, a, b, error) => {
  let tabla = [];
  y = math.compile(y);
  let i = 1;
  let fa = y.evaluate({ x: a });
  let fb = y.evaluate({ x: b });
  if (fa * fb < 0) {
    let c = (a * y.evaluate({ x: b }) - b * y.evaluate({ x: a })) / (y.evaluate({ x: b }) - y.evaluate({ x: a }));
    let fc = y.evaluate({ x: c });
    let errorCalculado = Math.abs(b - a);
    tabla.push({
      i,
      a,
      b,
      fa,
      fb,
      c,
      fc,
      errorCalculado
    });
    while (errorCalculado > error) {
      i++;
      let fc = y.evaluate({ x: c });
      if (y.evaluate({ x: a }) * fc < 0) {
        b = c;
      } else {
        a = c;
      }
      c = (a * y.evaluate({ x: b }) - b * y.evaluate({ x: a })) / (y.evaluate({ x: b }) - y.evaluate({ x: a }));
      errorCalculado = Math.abs(c - a);
      fa = y.evaluate({ x: a });
      fb = y.evaluate({ x: b });
      fc = y.evaluate({ x: c });
      tabla.push({
        i,
        a,
        b,
        fa,
        fb,
        c,
        fc,
        errorCalculado
      });
    }
  } else {
    throw new Error('No se puede aplicar el método de la falsa posición');
  }
  return tabla;
};


export const newtonRaphson = (y, derivada, x0, error) => {
  y = math.compile(y);
  derivada = math.compile(derivada);
  let tabla = [];
  let i = 1;
  let fx0 = y.evaluate({ x: x0 });
  let fx0Derivada = derivada.evaluate({ x: x0 });
  let x1 = x0 - fx0 / fx0Derivada;
  let fx1 = y.evaluate({ x: x1 });
  let errorCalculado = Math.abs(x1 - x0);
  tabla.push({
    i,
    x0,
    fx0,
    fx0Derivada,
    x1,
    fx1,
    errorCalculado
  });
  while (errorCalculado > error && i < 10) {
    i++;
    x0 = x1;
    fx0 = y.evaluate({ x: x0 });
    fx0Derivada = derivada.evaluate({ x: x0 });
    x1 = x0 - fx0 / fx0Derivada;
    fx1 = y.evaluate({ x: x1 });
    errorCalculado = Math.abs(x1 - x0);
    tabla.push({
      i,
      x0,
      fx0,
      fx0Derivada,
      x1,
      fx1,
      errorCalculado
    });
  }
  return tabla;
}


export const secanteTabla = (y, x0, x1) => {
  y = math.compile(y)
  let tabla = [];
  let i = 0;
  let fxi = y.evaluate({x: x1});
  let fxiuno = y.evaluate({x: x0});
  let x2 = x1 - (fxi * (x0 - x1)) / (fxiuno - fxi);
  let errorCalculado = (x2 - x1)/x2*100;
  tabla.push({
    i,
    x0,
    x1,
    fxi,
    fxiuno,
    x2,
    errorCalculado
  });
  while (errorCalculado < -0.01 ) {
    i++;
    let aux = x1;
    x1 = x2;
    x0 = aux;
    fxi = y.evaluate({x: x1});
    fxiuno = y.evaluate({x: x0});
    x2 = x1 - (fxi * (x0 - x1)) / (fxiuno - fxi);
    errorCalculado = (x2 - x1)/x2*100;
    tabla.push({
      i,
      x0,
      x1,
      fxi,
      fxiuno,
      x2,
      errorCalculado
    });
  }
  return tabla;
}
