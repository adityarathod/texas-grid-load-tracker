import Link from 'next/link'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'

const IndexPage = () => {
  const [data, setData] = useState<any[]>([])
  useEffect(() => {
    fetch('/texas-grid-load-tracker/points.json')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => setData([{ error: err }]))
  }, [])
  return (
    <Layout>
      <div className='mt-8'>
        <h1 className='text-3xl font-bold'>Texas Grid Load History</h1>
        {data.map((val, idx) => (
          <div key={idx}>
            {val.demand} - {val.capacity}
            <p>{(val.demand / val.capacity) * 100}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage
