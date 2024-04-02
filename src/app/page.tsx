"use client"
import { FormEvent, useState } from 'react';
import FuncionAndDerivate from "@/components/FuncionAndDerivate";
import * as math from 'mathjs';

import Biseccion from "@/components/methods/Biseccion";
import FalsaPosicion from "@/components/methods/FalsaPosicion";
import NewtonRaphson from "@/components/methods/NewtonRaphson";
import Secante from "@/components/methods/Secante";
import LineChart from "@/components/char/Chart";
type variable = {
  time: number,
  value: number
}


export default function Home() {
  const [funcX, setFuncX] = useState("");
  const [data, setData] = useState<Array<variable>>([]);
  const [choosenMethod, setChoosenMethod] = useState<number>(0);
  const [derivate, setDerivate] = useState<string>("");
  const handleFunction = (e: FormEvent): number => {
    e.preventDefault();
    try {
      const derivate = math.derivative(funcX, 'x').toString()

      setDerivate(derivate)
      let datatable = []

      for (let i = -100; i < 100; i += 0.1) {
        const expresion = math.compile(funcX);
        const xValue = { x: i }
        const result = expresion.evaluate(xValue);

        const iteration = { time: i, value: Number(result.toFixed(2)) }
        datatable.push(iteration)


      }
      setData(datatable)
    } catch (error) {
      console.log(error)
    }
    return 0;
  }

  return (
    <main>


      <form onSubmit={handleFunction} className="p-5 bg-white shadow-lg rounded ">
        <input onChange={e => setFuncX(e.target.value)} className="w-full p-2 mb-4 border border-gray-300 rounded" type="text" placeholder="Escriba una F(x)" />
        <FuncionAndDerivate func={funcX} derivate={derivate} />



        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Calcular</button>
      </form>
      <section className="flex justify-center m-10">
        <LineChart initialDataChart={data} />
      </section>
      <section className="mx-10 flex flex-col gap-5 text-center outline-none focus:outline-none border-none">
        {
          data.length !== 0 && (

            <div>
              <h2 className='text-center text-sky-950 text-4xl '>Escoje tu metodo fav :0</h2>
              <select onChange={e => setChoosenMethod(Number(e.target.value))} className="mt-5 p-2 rounded w-full text-xl">
                <option value="0">Selecciona un metodo</option>
                <option value="1">Biseccion</option>
                <option value="2">Falsa Posicion</option>
                <option value="3">Newton Raphson</option>
                <option value="4">Secante</option>
              </select>
            </div>
          )
        }

        <article className="flex flex-col gap-5">
          {
            choosenMethod === 1 ? <Biseccion func={funcX} /> :
              choosenMethod === 2 ? <FalsaPosicion func={funcX} /> :
                choosenMethod === 3 ? <NewtonRaphson func={funcX} derivada={derivate} /> :
                  choosenMethod === 4 ? <Secante func={funcX} /> : null
          }
        </article>

      </section >
      <footer className="p-20 bg-white shadow-lg rounded mt-60">
        <p className="text-center">Made with ❤️ by <a href="eminataren2002@gmail.com">Equipo Basectomia</a></p>
      </footer>
    </main >
  );
}
