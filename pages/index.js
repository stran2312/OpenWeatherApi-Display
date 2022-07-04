import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import Weather from '../components/Weather';
import Spinner from '../components/Spinner';

export default function Home() {

  const [city, setCity] = useState('')
  const [weather, setWeather] = useState({})
  const [loading, setLoading] = useState(false)

  const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchWeather = e => {
    e.preventDefault()
    setLoading(true)
    axios.get(url).then((response) => {
      setWeather(response.data) 
    })
    setCity('')
    setLoading(false)
  }

  if(loading) {
    return <Spinner/>
  } else {
    return (
      <div >
        <Head>
          <title>Weather - Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
          {/*Overlay*/}
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1' />
        <img src='https://images.unsplash.com/photo-1578185926358-7e064647af0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=449&q=80' layout='fill'
        className='object-cover'
        />
        {/* Search */}
        <div className='relative flex justify-between items center max-w-[500px] w-full m-auto pt-4 text-white z-10'>
          <form onSubmit={fetchWeather} className='flext justify-between items center w-full m-auto p-3 bg-trasparent border border-gray-300 text-white rounded-2xl'>
            <div>
              onChange={(e) => setCity(e.target.value)}
              <input className='bg-transparent border-non text-white focus:outline-non text-2xl' type="text" placeholder='Search City'/>
            </div>
            <button  onClick={fetchWeather}>
              <BsSearch size={20}/>
              </button>
          </form>
        </div>
  
        {/* Weather Display*/}
        {weather.main && <Weather data={weather}/>}
  
      </div>
    )
  }

  
}
