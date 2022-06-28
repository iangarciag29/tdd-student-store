import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../api";
import useAppError from "../Hooks/useAppError";
import {Badge, Breadcrumb, Spinner} from "flowbite-react";
import {HomeIcon} from "../icons/Home";

const Product = () => {

    const {id} = useParams();
    const {addError} = useAppError();
    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await axios.get(API_URL + "/" + id).then(res => {
                console.log(res.data.product)
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
        <Breadcrumb aria-label="Shopping path">
            <Breadcrumb.Item
                icon={HomeIcon}
            >
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
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="flex items-center justify-center mt-5" title="Category">
            <Badge
                color="info"
                size="sm"
            >
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
                <img src={product.image} alt={product.name} className="rounded-lg mx-auto"/>
                <div className="flex flex-row mt-20 justify-between">
                    <h4 className="text-2xl">Price</h4>
                    <p className="text-3xl">${product.price}</p>
                </div>
            </div>
        </div>
    </div>
}

export default Product;