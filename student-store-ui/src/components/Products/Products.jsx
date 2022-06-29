import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../../api";
import {Loader} from "../../utils/Loader";
import useAppError from "../../hooks/useAppError";
import useShoppingCart from "../../hooks/useShoppingCart";
import ProductCard from "../cards/ProductCard";

const Products = () => {
    const {addError} = useAppError();
    const {addItem} = useShoppingCart();
    const [isLoading, setIsLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            await axios.get(API_URL).then(res => {
                setTimeout(() => {
                    setProducts(res.data.products.slice(0, 3));
                    setIsLoading(false);
                }, 500);
            }).catch(err => {
                addError(err.code, err.response.status, err.response.statusText);
            });
        })();
    }, []);

    if (isLoading) return <div className="text-center"><Loader/></div>

    return <div>
        <div className="text-center mt-10 mb-20 uppercase font-semibold text-xl">
            <h3>Top Products</h3>
        </div>
        <div className="grid grid-cols-3 px-20 mb-20 space-x-5">
            {products?.map(product =>
                <ProductCard product={product} setShowToast={setShowToast} key={product.id}/>
            )}
        </div>
    </div>
}

export default Products;