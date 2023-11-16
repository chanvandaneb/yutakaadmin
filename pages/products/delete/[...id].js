import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
    const router = useRouter();
    const [productInfo,setProductInfo] = useState();
    const {id} = router.query;
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/products?id='+id).then(response => {
            setProductInfo(response.data);
        });
    }, [id]);
    function goBack() {
        router.push('/products'); 
    }
     async function deleteProduct(){
        await axios.delete('/api/products?id='+id);
        goBack();
    }
    return (
        <Layout>
            <div className="  max-w-lg mt-[20%] p-5 mx-auto my-auto rounded-xl shadow-xl inset-0 z-0 bg-white border border-2 border-red-300">
            <div className="text-center p-5 flex-auto justify-center">
            
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <h1 className="text-xl font-bold py-4">Do you want to delete &nbsp;"{productInfo?.title}?"</h1>
            <div className="p-3  mt-2 text-center space-x-4 md:block">
            <button className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100" onClick={goBack}>NO</button>
                <button 
                    onClick={deleteProduct}
                    className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">Delete</button>
            </div>
            
            </div>
            
            
            </div>

        </Layout>
    );
}