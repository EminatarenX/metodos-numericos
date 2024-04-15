"use client";
import { useState } from "react"
import { secanteTabla } from "@/math/mathfunctions"
const Secante = ({ func }) => {
  const [x0, setX0] = useState(0)
  const [x1, setX1] = useState(0)
  const [error, setError] = useState(0)
  const [tabla, setTabla] = useState([])
  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const xcero = parseFloat(x0)
      const xuno = parseFloat(x1)
      const t = secanteTabla(func, xcero, xuno, error)
      setTabla(t)
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
  }
  return (
    <div className="w-full flex flex-col">
      <h2 className='text-center text-sky-950 text-4xl '>Secante</h2>
      <form 
        className="flex flex-col gap-2 mt-5"
        onSubmit={handleSubmit}>
        <div className="flex gap-5">
          <input 
            className="w-full p-2 mb-4 border border-gray-300 rounded outline-none" 
            type="text" 
            placeholder="Valor de Xo" 
            onChange={e => setX0(e.target.value)} />
          <input 
            className="w-full p-2 mb-4 border border-gray-300 rounded outline-none" 
            type="text" 
            placeholder="Valor de X1" 
            onChange={e => setX1(e.target.value)} />

        </div>
        <button type="submit" className="w-full p-2 mb-4 border border-gray-300 rounded outline-none bg-blue-500 text-white cursor-pointer">
          Calcular
        </button>

      </form>

      <div>
        {
          tabla.length > 0 &&
          <table className="w-full">
            <thead>
              <tr>
                <th>i</th>
                <th>Xi - 1</th>
                <th>f(xi)</th>
                <th>f(xi-1) </th>
                <th>xi+1</th>
                <th>Error</th>
              </tr>
            </thead>
            <tbody>
              {
                tabla.map((t, i) => (
                  <tr key={i}>
                    <td>{t.i}</td>
                    <td>{t.x1.toFixed(4)}</td>
                    <td>{t.x0.toFixed(4)}</td>
                    <td>{t.fxi.toFixed(4)}</td>
                    <td>{t.fxiuno.toFixed(4)}</td>
                    <td>{t.x2.toFixed(4)}</td>
                    <td>{t.errorCalculado.toFixed(4)}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        }
        {
          // error && <p className="text-red-500">{error}</p>
        }
      </div>
    </div>
  )
}

export default Secante
