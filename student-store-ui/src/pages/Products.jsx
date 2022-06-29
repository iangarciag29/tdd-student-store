import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../api";
import {ListGroup} from "flowbite-react";
import useAppError from "../hooks/useAppError";
import {Loader} from "../utils/Loader";
import useShoppingCart from "../hooks/useShoppingCart";
import {Link} from "react-router-dom";

const categories = [
    {
        display: "All",
        code: "all"
    },
    {
        display: "Clothing",
        code: "clothing",
    },
    {
        display: "Food",
        code: "food",
    },
    {
        display: "Accessories",
        code: "accessories",
    },
    {
        display: "Tech",
        code: "tech",
    },
]

const Products = () => {

    const {addError} = useAppError();
    const {addItem} = useShoppingCart();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await axios.get(API_URL).then(res => {
                setTimeout(() => {
                    setProducts(res.data.products);
                    setIsLoading(false);
                }, 500);
            }).catch(err => {
                addError(err.code, err.response.status, err.response.statusText);
            });
        })();
    }, []);

    if (isLoading) return <div className="text-center mt-24">
        <Loader/>
    </div>

    return <div className="container">
        <div className="w-full pb-10 text-center">
            <h1 className="font-bold text-2xl">Browse all of our products</h1>
        </div>
        <div className="flex flex-row">
            <div className="w-1/6 p-5">
                <h3 className="text-xs uppercase mb-5">Filter by category</h3>
                <ListGroup>
                    {categories.map((category, idx) =>
                        <ListGroup.Item
                            key={idx}
                            active={category.code === selectedCategory}
                            onClick={() => setSelectedCategory(category.code)}
                        >
                            {category.display}
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </div>
            <div className="w-5/6 p-10 grid grid-cols-3 gap-5">
                {products?.filter(product => (selectedCategory === "all" ? 1 : product.category === selectedCategory)).map(product =>
                    <Link to={`/product/${product.id}`} key={product.id}>
                        <div className="max-w-sm bg-white rounded-lg shadow-md">
                            <img className="p-8 rounded-t-lg" src={product.image}
                                 alt={product.name}/>
                            <div className="px-5 pb-5">
                                <a href="#">
                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                                </a>
                                <div className="flex items-center mt-2.5 mb-5">
                                    <p>{product.description}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                <span
                                    className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                                    <button
                                        onClick={() => addItem(product)}
                                        className="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add
                                        to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    </div>
}

export default Products;