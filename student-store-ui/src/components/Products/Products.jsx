import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../../api";
import {Card} from "flowbite-react";
import {Loader} from "../../utils/Loader";
import useAppError from "../../hooks/useAppError";
import useShoppingCart from "../../hooks/useShoppingCart";

const Products = () => {
    const {addError} = useAppError();
    const {addItem} = useShoppingCart();
    const [isLoading, setIsLoading] = useState(true);
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
                <div className="max-w-sm" key={product.id}>
                    <Card
                        imgAlt={product.name}
                        imgSrc={product.image}
                    >
                        <a href="#">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                {product.name}
                            </h5>
                        </a>
                        <div className="mt-2.5 mb-5 flex items-center text-justify">
                            <p>{product.description}</p>
                        </div>
                        <div className="flex items-center justify-between">
                                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                    ${product.price}
                                  </span>
                            <button
                                onClick={() => addItem(product)}
                                className="rounded-lg bg-blue-900 px-5 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                            >
                                Add to cart
                            </button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    </div>
}

export default Products;