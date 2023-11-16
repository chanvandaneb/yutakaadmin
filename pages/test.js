import React, {
  useEffect, useState
} from 'react'
import axios from 'axios';
import SignIn from '../components/signin/SignIn';

export default function TestPage() {

  const [ products, setProducts ] = useState(null)

  useEffect(() => {
    axios.get('/api/categories').then(response => {
      setProducts(response.data);
    });
  }, []);

  console.log(products)


  console.log()
  return (

    <div>
    <SignIn/>
    </div>
  )
}