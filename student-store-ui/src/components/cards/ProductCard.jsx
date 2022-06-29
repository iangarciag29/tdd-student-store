import useShoppingCart from "../../hooks/useShoppingCart";
import {Link} from "react-router-dom";
import {PlusIcon} from "../../icons/PlusIcon";

const ProductCard = ({product, setShowToast}) => {

    const {addItem} = useShoppingCart();

    return <div className="max-w-sm bg-white rounded-lg shadow-md relative">
        <div className="w-full h-56 object-cover rounded-t mb-5"
             style={{background: `url(${product.image}) center center no-repeat`, backgroundSize: "cover"}}/>
        <div className="px-5 pb-16">
            <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
            </a>
            <div className="flex items-center mt-2.5 mb-5 text-justify">
                <p>{product.description}</p>
            </div>
            <div className="flex justify-between items-center">
                                <span
                                    className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                <button
                    onClick={() => {
                        addItem(product);
                        setShowToast(true);
                        setTimeout(() => {
                            setShowToast(false);
                        }, 2000);
                    }}
                    className="text-white bg-blue-900 inline-flex hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    <PlusIcon className="mt-0.5 mr-2"/><span>Add
                    to cart</span>
                </button>
            </div>
        </div>
        <div className="text-center my-5 text-gray-400 text-base absolute bottom-0 left-0 right-0">
            <Link to={`/product/${product.id}`} className="text-sm hover:underline" key={product.id}>View more</Link>
        </div>
    </div>
}

export default ProductCard;