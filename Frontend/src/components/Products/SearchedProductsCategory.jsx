


import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router'

export const SearchedProductsCategory = () => {

    const params = useParams()
    const searchTerm = params.search

    axios.get(`http://localhost:8000/shop/api/search?search=${searchTerm}`)
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })
    



  return (
    <div>SearchedProductsCategory</div>
  )
}
