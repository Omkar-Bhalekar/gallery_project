import { useState } from 'react'
import axios, { Axios } from "axios";
import { useEffect } from 'react';

function App() {
  const [userData, setUserData] = useState([]);
  const [index , setIndex] = useState(2);

  const getData = async  ()=>{
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=10`);
    setUserData(response.data);
  }


  let printUserData = <h3 className='text-xl  absolute text-white -translate-x-1/2 -translate-y-1/2  top-1/2 left-1/2'>Loading...</h3>

  if(userData.length > 0){
    printUserData = userData.map((e,index)=>{
      return (

        <div className='mx-4' key={index}>
          <a href={e.url} target='_blank'>
          <img className='h-64 w-60 rounded-b-none rounded' src={e.download_url}></img>
          <h2 className='text-center text-white text-sm  rounded-t-none rounded'>{e.author}</h2>
          </a>
        </div>
  
      )
    })
  }


  useEffect(()=>{
    getData();
  },[index])

  return (
   <>
      <div className='bg-gray-950  min-h-screen'>

        <h1 className='p-4 text-white font-bold text-center text-3xl'>Gallery Project</h1>

        <div className='flex flex-wrap gap-4 m-10 items-center'>
          {printUserData}
        </div>


        <div className='flex flex-row justify-center gap-6 py-10'>
          <button 
          onClick={()=>{
            if(index > 1){
              setIndex(prev => prev - 1)
              setUserData([])
            }
          }}
          className='bg-amber-500 rounded text-black font-medium text-sm h-10 w-20'>
            Prev  
          </button>
          <h1 className='text-white font-semibold mt-2'>Page {index}</h1>
          <button
          onClick={()=>{
            setIndex(prev => prev + 1);
            setUserData([]);
          }}
          className='bg-amber-500 rounded text-black font-medium text-sm h-10 w-20'>
            Next
          </button>
        </div>
      </div>
   
   </>
  )
}

export default App
