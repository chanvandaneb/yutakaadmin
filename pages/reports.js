import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import SpinnerLogo from "@/components/SpinnerLogo";
import Pagination from "../components/Pagination";
import { paginate } from "@/components/PaginationUnit";
import Link from "next/link";

export default function OrdersPage() {
    const [orders,setOrders] = useState([]);
    const [records,setRecords] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const pageSize = 6;

    ///
    const [searchInput,setSearchInput] = useState("");

    useEffect(() => {
        setIsLoading(true);
        axios.get('/api/orders').then(response => {
            setOrders(response.data);
            console.log("response.data",response.data)
            // setRecords(response.data);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {

        const FilterFunction = (rec, word) => {
            var result = rec.filter(f => f.name.toLowerCase().includes(word))
            return result;
        }

        var resultFiltered = FilterFunction(orders , searchInput)

        const paginatePost = paginate(resultFiltered, currentPage, pageSize);


        console.log("searchInput",searchInput)
        console.log("resultFiltered",resultFiltered)
        console.log("paginatePost",paginatePost)

        setRecords(paginatePost);
    }, [searchInput, orders, currentPage, pageSize]);

    // const FilterFunction = (event) => {
    //     setRecords(orders.filter(f => f.name.toLowerCase().includes(event.target.value)))
    // }

    const handlePageChange = page => {
        setCurrentPage(page);
    }

    const onChangeInputSearch = (event) => {
        setSearchInput(event.target.value)
    }

    


    return(
        <Layout>
            <div className="flex justify-between items-center">


            <div className="flex justify-between items-center gap-5">
                <h1> Reports </h1>

                <Link className="px-10 py-2 mb-4 border border-2 border-indigo-600 rounded-lg text-black hover:bg-gray-200"  href={'/reports/summary-reports'}>Summary</Link>
                <Link className=" px-10 py-2 mb-4 border border-2 border-indigo-600 rounded-lg text-black hover:bg-gray-200"  href={'/reports/detail-reports'}>Details</Link>

            </div>

            <input type="text" className="form-control w-3/12" onChange={onChangeInputSearch} placeholder="Search..." />
    
            </div>

            <table className="basic text-left">
                <thead>
                        <tr>
                        <td>Date</td>
                        <td>Paid</td>
                        <td>Recipient</td>
                        <td>Products</td>
                    </tr>
                </thead>
                <tbody>
                {isLoading && (
                    <tr>
                        <td colSpan={4}>
                            <div className="py-4">
                                <SpinnerLogo fullWith={true}/>
                            </div>
                        </td>
                    </tr>
                )}
                {  records.map((order, i) => (
                    // eslint-disable-next-line react/jsx-key
                    <tr key={i} className="hover:bg-gray-200">
                    <td>{(new Date(order.createdAt))
                        .toLocaleString()}
                    </td>
                    <td className={order.paid ? 'text-red-400 font-bold' : 'text-green-400 font-bold'} >
                        {order.paid ? 'NO' : 'YES'}
                    </td>
                    <td>
                        {order.name}, {order.email}<br />
                        {order.streetAddress}, {order.city}, <br/>
                        {order.postalCode}, {order.province}<br />
                        
                    </td>
                    <td>
                        {order.line_items.map(l => (
                            <>
                                {l.price_data?.product_data?.name} x
                                {l.quantity}<br />
                            </>
                        ))}
                    </td>
                </tr>
                ))}
                </tbody>
            </table>
            <Pagination items={orders.length} currentPage={currentPage} pageSize={pageSize} onPageChange={handlePageChange} />
        </Layout>
    );
}