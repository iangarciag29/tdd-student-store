import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../../api";
import {Card} from "flowbite-react";

const Products = () => {

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
                console.error(err);
            });
        })();
    }, []);

    if (isLoading) return <div className="text-center">
        <svg role="status" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin fill-blue-900"
             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"/>
            <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"/>
        </svg>
    </div>

    return <div>
        <div className="text-center mt-10 mb-20 uppercase font-semibold text-xl">
            <h3>Top Products</h3>
        </div>
        <div className="grid grid-cols-3 px-20 mb-20 space-x-5">
            {products?.map(product =>
                    <div className="max-w-sm" key={product.id}>
                        <Card
                            imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
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
                                <a
                                    href="#"
                                    className="rounded-lg bg-blue-900 px-5 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                >
                                    Add to cart
                                </a>
                            </div>
                        </Card>
                    </div>
            )}
        </div>
    </div>
}

export default Products;