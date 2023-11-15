import React, {
  useEffect, useState
} from 'react'
import axios from 'axios';

export default function TestPage() {

  const [ products, setProducts ] = useState(null)

  useEffect(() => {
    axios.get('/api/products').then(response => {
      setProducts(response.data);
    });
  }, []);

  console.log(products)


  console.log()
  return (

    <div>
    hello
    </div>
  )
}