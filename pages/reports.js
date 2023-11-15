import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import SpinnerLogo from "@/components/SpinnerLogo";
import Pagination from "../components/Pagination";
import { paginate } from "@/components/PaginationUnit";
import Link from "next/link";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { CSVLink} from 'react-csv';
import {AiOutlineCaretDown, AiOutlineCaretUp}  from 'react-icons/Ai';

export default function OrdersPage() {
    const [orders,setOrders] = useState([]);
    const [allOrders,setAllOrders] = useState([]);
    const [records,setRecords] = useState([]);
    const [exportData, setExportData]= useState([]); 
    const [isLoading,setIsLoading] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);

    const pageSize = 6;

    ///
    const [searchInput,setSearchInput] = useState("");

    useEffect(() => {
        setIsLoading(true);
        axios.get('/api/orders').then(response => {
            setOrders(response.data);
            setAllOrders(response.data);
            setRecords(response.data);




            var listOrderData = response?.data;
            var newListOrder = [];

            console.log("listOrderData",listOrderData);


            if(listOrderData?.length > 0){

                for (let i=0; i < listOrderData?.length; i++){

                    let currIndexData = listOrderData?.[i];

                    if(!currIndexData?._id) continue;

                    let newObj = {
                        Id : currIndexData?._id,                     
                        Name: currIndexData?.name 
                    }

                    newListOrder.push(newObj);
                    
                }

            }
            

            console.log("newListOrder",newListOrder);



            setExportData(newListOrder);









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



    const handleSelect = (data) => {

        let filtered = allOrders.filter((order) => { 
            let orderDate = new Date(order["createdAt"]);
            return(
                orderDate >= data.selection.startDate && 
                orderDate <= data.selection.endDate
            );
         });
        setStartDate(data.selection.startDate);
        setEndDate(data.selection.endDate);
        setOrders(filtered);
    };

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
      }
    


    return(
        <Layout>
        <div>
            
        </div>


        



    <div>

        <div className="flex justify-between items-center">


                <div className="flex justify-between items-center gap-5">
                    <h1> Reports </h1>


                    <Link className=" px-5 py-2 mb-4 border border-2 border-indigo-600 rounded-lg text-black hover:bg-gray-200"  href={'/reports/detail-reports'}>Details</Link>
                    <CSVLink className=" px-5 py-2 mb-4 border border-2 border-indigo-600 rounded-lg text-black hover:bg-gray-200"  data={exportData} filename="Yutaka Excel Report Data" >Export</CSVLink>




        <div className='relative'>
            <button onClick={() => setIsOpen((prev) => !prev )} className='px-5 py-2 mb-4 flex items-center justify-between border border-2 border-indigo-600 rounded-lg text-black hover:bg-gray-200'>
            
            Filter
            {!isOpen ? (
                <AiOutlineCaretDown className="text-gray-600 ml-2" />
            ) : (
                <AiOutlineCaretUp className="text-gray-600 ml-2" />
            )}
            </button>

            {isOpen && (
                <div className='bg-blue-400 absolute top-12 z-10'>
                    <DateRangePicker className=" shadow-2xl p-1 bg-gray-300 " ranges={[selectionRange]} onChange={handleSelect}/>
                </div>
            )}
        </div>



                </div>

        <input type="text" className="form-control w-3/12" onChange={onChangeInputSearch} placeholder="Search..." />

    </div>

    <table className="basic text-left">
        <thead>
                <tr>
                        <td>NO</td>
                        <td>Customer Name</td>
                        <td>Date</td>
                        <td>Paid</td>
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
                        <td>{i+1}</td>
                        <td>{order.name}</td>
                        <td>{(new Date(order.createdAt))
                            .toLocaleString()}
                        </td>
                        <td className={order.paid ? 'text-red-400 font-bold' : 'text-green-400 font-bold'} >
                            {order.paid ? 'NO' : 'YES'}
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
    
    </div>
        </Layout>
    );
}