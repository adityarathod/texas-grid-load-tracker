import React, { useEffect, useMemo, useState } from 'react'
import Layout from '../components/Layout'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import round from '../util/round'

const IndexPage = () => {
  const [data, setData] = useState<any[]>([])
  useEffect(() => {
    fetch('/texas-grid-load-tracker/points.json')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => setData([{ error: err }]))
    setTimeout(() => location.reload(), 15 * 60 * 1000)
  }, [])
  const series = useMemo(() => {
    return data.map(val => {
      const dateMS = Date.parse(`${val.lastup} GMT-0600`)
      console.log(dateMS)
      const date = new Date(dateMS)
      const dc = {
        mm: new String(date.getMonth() + 1),
        dd: new String(date.getDate()).padStart(2, '0'),
        yyyy: new String(date.getFullYear()),
        hh: new String(date.getHours()).padStart(2, '0'),
        min: new String(date.getMinutes()).padStart(2, '0'),
      }
      return {
        date: dateMS,
        dateStr: `${dc.mm}/${dc.dd}/${dc.yyyy} ${dc.hh}:${dc.min}`,
        capacity: val.capacity,
        demand: val.demand,
        ratio: round((val.demand / val.capacity) * 100, 2),
      }
    })
  }, [data])
  return (
    <Layout>
      <div className='mt-8'>
        <h1 className='text-3xl text-center font-bold mb-1'>Texas Grid Load History</h1>
        <h3 className='text-lg text-center text-gray-500 mb-8'>Updates every 15-20 minutes.</h3>
        <ResponsiveContainer width='100%' height={500}>
          <LineChart data={series} syncId='usage'>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='dateStr' />
            <YAxis domain={['dataMin', 'dataMax']} unit='MW' />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='demand' name='Power Demand' stroke='#ff0000' unit='MW' />
            <Line
              type='monotone'
              dataKey='capacity'
              name='System Capacity'
              stroke='#7F00FF'
              unit='MW'
            />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width='100%' height={500}>
          <LineChart data={series} syncId='usage'>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='dateStr' />
            <YAxis domain={['dataMin', 'dataMax']} unit='%' />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='ratio' stroke='#0000ff' name='Capacity Usage' unit='%' />
          </LineChart>
        </ResponsiveContainer>
        <div className='mt-10 text-sm text-center text-gray-500'>
          <p>☕️ Stay safe and stay warm!</p>A small{' '}
          <a href='//github.com/adityarathod/texas-grid-load-tracker' className='text-purple-500'>
            open-source
          </a>{' '}
          project by{' '}
          <a href='//adityarathod.github.io' className='text-blue-500'>
            Aditya Rathod
          </a>
          .
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
