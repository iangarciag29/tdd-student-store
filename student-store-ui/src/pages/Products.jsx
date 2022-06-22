import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../api";
import {ListGroup} from "flowbite-react";

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

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            await axios.get(API_URL).then(res => {
                setProducts(res.data.products);
            }).catch(err => {
                console.error(err);
            });
        })();
    }, []);

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
            <div className="w-5/6 p-10 grid grid-cols-3">
                {products?.filter(product => (selectedCategory === "all" ? 1 : product.category === selectedCategory)).map((product, idx) =>
                    <div key={idx}>
                        {product.name}
                    </div>
                )}
            </div>
        </div>
    </div>
}

export default Products;