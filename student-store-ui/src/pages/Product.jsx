import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../api";
import useAppError from "../hooks/useAppError";
import {Badge, Breadcrumb, Spinner, Toast} from "flowbite-react";
import {HomeIcon} from "../icons/Home";
import useShoppingCart from "../hooks/useShoppingCart";
import {PlusIcon} from "../icons/PlusIcon";
import {CheckIcon} from "../icons/CheckIcon";

const Product = () => {

    const {id} = useParams();
    const {addError} = useAppError();
    const {addItem} = useShoppingCart();
    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        (async () => {
            await axios.get(API_URL + "/store/" + id).then(res => {
                setTimeout(() => {
                    setProduct(res.data.product);
                    setIsLoading(false);
                }, 500);
            }).catch(err => {
                addError(err.code, err.response.status, err.response.statusText);
            })
        })();
    }, [id]);

    if (isLoading) return <div className="text-center my-20"><Spinner/></div>

    return <div className="text-center">
        <div className="flex flex-row justify-between mx-20">
            <div>
                <Breadcrumb aria-label="Shopping path">
                    <Breadcrumb.Item icon={HomeIcon}>
                        <Link to="/">
                            Home
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/products">Products</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {product.name}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className={showToast ? "block" : "hidden"}>
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
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="flex items-center justify-center mt-5" title="Category">
            <Badge color="info" size="sm">
                <p className="capitalize">{product.category}</p>
            </Badge>
        </div>
        <hr className="my-10 mx-[10%]"/>
        <div className="flex flex-row py-10 mx-20">
            <div className="w-2/3 flex flex-col text-justify space-y-5">
                <h4 className="uppercase text-sm text-gray-600">Description</h4>
                <p className="text-base font-medium tracking-wide">{product.description}</p>
                <span className="text-gray-600 font-light uppercase text-xs">More information about the product.</span>
                <iframe src={product.source} frameBorder="0" title={product.name} height={500} width="90%"
                        className="mt-10"/>
            </div>
            <div className="w-1/3 flex flex-col">
                <img src={product.image} alt={product.name} className="rounded-lg mx-auto shadow-md"/>
                <div className="flex flex-row mt-20 justify-between">
                    <h4 className="text-2xl">Price</h4>
                    <p className="text-3xl">${product.price}</p>
                </div>
                <div className="mt-10">
                    <button onClick={() => {
                        addItem(product);
                        setShowToast(true);
                        setTimeout(() => {
                            setShowToast(false);
                        }, 5000);
                    }}
                            className="bg-blue-900 hover:bg-blue-800 px-8 py-2 text-gray-50 rounded-md shadow inline-flex">
                        <PlusIcon className="mt-1 mr-2"/><span>Add to cart</span></button>
                </div>
            </div>
        </div>
    </div>
}

export default Product;