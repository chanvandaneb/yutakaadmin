import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import SpinnerLogo from "@/components/SpinnerLogo";
import {withSwal} from "react-sweetalert2";

function SettingsPage({swal}) {
    const [products,setProducts] = useState([]);
    const [featuredProductId, setFeaturedProductId] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [shippingFee,setShippingFee] = useState('');
    const [vatFee,SetVatFee] = useState('');

    useEffect(() => {
        setIsLoading(true);
        fetchAll().then(() => {
            setIsLoading(false);
        });
    }, []);
async function fetchAll(){
    await axios.get('/api/products').then(res => {
        setProducts(res.data);
    });
    await axios.get('/api/settings?name=featuredProductId').then(res => {
        setFeaturedProductId(res.data);
    });
    await axios.get('/api/settings?name=shippingFee').then(res => {
        setShippingFee(res.data);
    });
    await axios.get('/api/settings?name=vatFee').then(res => {
        SetVatFee(res.data);
    });
}
    async function saveSettings() {
        setIsLoading(true);
        await axios.put('/api/settings', {
            name: 'featuredProductId',
            value: featuredProductId,
        });
        await axios.put('/api/settings', {
            name: 'shippingFee',
            value: shippingFee,
        });
        await axios.put('/api/settings', {
            name: 'vatFee',
            value: vatFee,
        });
        setIsLoading(false);
        await swal.fire({
            title: 'Setting Save!',
            icon: 'success',
        });

    }
    return (
        <Layout>
            <h1>Setting</h1>
            {isLoading && (
                <SpinnerLogo/>
            )}
            {!isLoading && (
                <>
                    <label>Featured Product</label>
                    <select value={featuredProductId} onChange={ev => setFeaturedProductId(ev.target.value)} >
                        {products.length > 0 && products.map(product => (
                            // eslint-disable-next-line react/jsx-key
                            <option value={product._id}>{product.title}</option>
                        ))}
                    </select>
                    <label>Shipping Price</label>
                    <input type="number"
                           value={shippingFee}
                           onChange={ev => setShippingFee(ev.target.value)}/>
                
                    <label>VAT Fee</label>
                    <input type="number"
                           value={vatFee}
                           onChange={ev => SetVatFee(ev.target.value)}/>
                    <div>
                        <button onClick={saveSettings} className="btn-primary">Save Setting</button>
                    </div>
                </>
            )}
        </Layout>
    );
}

export default withSwal(({swal}) => (
    <SettingsPage swal={swal}/>
));