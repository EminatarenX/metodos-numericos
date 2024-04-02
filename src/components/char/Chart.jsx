"use client"
import { ColorType, createChart } from "lightweight-charts"
import { useEffect, useRef } from "react"

export default function LineChart({ initialDataChart }) {
  const chartContainerRef = useRef(null)

  useEffect(() => {
    if (!chartContainerRef.current) return
    const initialData = initialDataChart

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 350,
      layout: {
        background: { type: 'solid', color: "transparent" },
        textColor: '#d1d4dc',

      },

      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      timeScale: {
        timeVisible: false,
        secondsVisible: false,
        tickMarkFormatter: (time) => {
          //const integer = Math.floor(Number(time));
          const integer = Number(time).toFixed(1)
          return integer.toString()
        }
      }



    }, [initialDataChart])
    const newSeries = chart.addAreaSeries({
      // red pallete
      //lineColor: 'rgb(245, 118, 133)',
      //topColor: 'rgba(245, 118, 133, 0.4)',

      lineColor: 'rgb(2, 136, 240)',
      topColor: 'rgba(2, 136, 240, 0.6)',
      bottomColor: 'rgba(2, 136, 240, 0)',
      crosshairMarkerVisible: false,
      lastValueVisible: false,

    })
    newSeries.setData(initialData)

    chart.timeScale().fitContent()
    chart.timeScale().setVisibleRange({ from: -10, to: 10 })

    const handleResize = () => {
      if (chart && chartContainerRef.current) {
        chart.resize(
          chartContainerRef.current.clientWidth,
          chartContainerRef.current.clientHeight

        )
      }
    }
    window.addEventListener("resize", handleResize)


    return () => {
      chart.remove()
    }



  }, [initialDataChart])

  return (
    <>
      {
        initialDataChart.length === 0 ? <div>
          <p className="text-gray-500">No data to display</p>
        </div> : <div ref={chartContainerRef} className="w-full h-full" style={{ border: 'none !important' }}></div>
      }


    </>
  )
}
