import React from "react";
import {useState,useEffect} from 'react'
import apiClient from "../Utils/api-client";


const useData = (endPoint,customConfig,deps) => {
const [data, setData] = useState(null);
const [error, setErrors] = useState("");
const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    apiClient.get(endPoint,customConfig)
    .then((res) => {
        if(endPoint === "/products" && data && data.products && customConfig.params.page==1){
            setData(prev => ({
                ...prev,products:[...prev.products, ...res.data.products]
            }))
        }else{
            setData(null)
            setData(res.data)
        }
        setIsLoading(false)
    }).catch(err=>
        setErrors(err.message))
        setIsLoading(false)
  },deps ? deps: [])

  return {data, error, isloading}
}

export default useData;