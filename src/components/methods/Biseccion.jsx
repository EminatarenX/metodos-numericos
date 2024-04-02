"use client";
import React, { useState } from "react"
import { biseccionTabla } from "@/math/mathfunctions";
import Swal from 'sweetalert2'
const Biseccion = ({ func }) => {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [errorValue, setErrorValue] = useState(0)
  const [tabla, setTabla] = useState([])
  const [error, setError] = useState('')
  const handleSubmit = (e) => {
    setTabla([])
    e.preventDefault()
    try {

      if (a === '' || b === '') return Swal.fire({ text: 'Por favor llene todos los campos', title: 'Error', icon: 'error' })
      if (a === b) return Swal.fire({ text: 'Los valores de a y b no pueden ser iguales', title: 'Error', icon: 'error' })
      const aValue = parseFloat(a)
      const bValue = parseFloat(b)
      const err = parseFloat(errorValue)
      console.log({ aValue, bValue, err })
      const t = biseccionTabla(func, aValue, bValue, err)
      setTabla(t)
    } catch (error) {
      console.log(error)
      setError(error.message)

    }
  }
  return (

    <div className="w-full flex flex-col">
      <h2 className='text-center text-sky-950 text-4xl '>Biseccion</h2>
      <form onSubmit={handleSubmit} className={'flex flex-col gap-2 mt-5'}>
        <div className="flex gap-5">
          <input onChange={e => setA(e.target.value)} className="w-full p-2 mb-4 border border-gray-300 rounded outline-none" type="text" placeholder="Limite inferior" />
          <input onChange={e => setB(e.target.value)} className="w-full p-2 mb-4 border border-gray-300 rounded outline-none" type="text" placeholder="Limite superior" />
          <input onChange={e => setErrorValue(e.target.value)} className="w-full p-2 mb-4 border border-gray-300 rounded outline-none" type="text" placeholder="Error" />
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
                <th>a</th>
                <th>b</th>
                <th>c</th>
                <th>f(c)</th>
                <th>error</th>
              </tr>
            </thead>
            <tbody>
              {
                tabla.map((t, i) => (
                  <tr key={i}>
                    <td>{t.i}</td>
                    <td>{t.a}</td>
                    <td>{t.b}</td>
                    <td>{t.c}</td>
                    <td>{t.fc}</td>
                    <td>{t.errorCalculado}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        }
        {
          error && <p className="text-red-500">{error}</p>
        }
      </div>
    </div>
  )
}

export default Biseccion
