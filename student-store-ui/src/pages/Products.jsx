import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../api";
import {ListGroup, Toast} from "flowbite-react";
import useAppError from "../hooks/useAppError";
import {Loader} from "../utils/Loader";
import useShoppingCart from "../hooks/useShoppingCart";
import ProductCard from "../components/cards/ProductCard";
import {CheckIcon} from "../icons/CheckIcon";

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
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        (async () => {
            await axios.get(API_URL + "/store").then(res => {
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
        <div className="w-full pb-10 text-center relative">
            <h1 className="font-bold text-2xl">Browse all of our products</h1>
            <div className={`${showToast ? "block" : "hidden"} absolute right-10 top-0`}>
                <Toast>
                    <div
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                        <CheckIcon className="h-5 w-5"/>
                    </div>
                    <div className="ml-3 text-sm font-normal">
                        Added item to shopping cart.
                    </div>
                    <Toast.Toggle/>
                </Toast>
            </div>
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
                    <ProductCard product={product} setShowToast={setShowToast} key={product.id}/>)}
            </div>
        </div>
    </div>
}

export default Products;