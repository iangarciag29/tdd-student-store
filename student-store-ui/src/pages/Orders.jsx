import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../api";
import useAppError from "../hooks/useAppError";
import {Spinner, Table} from "flowbite-react";
import {Link} from "react-router-dom";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {addError} = useAppError();

    useEffect(() => {
        (async () => {
            await axios.get(API_URL + "/orders").then(res => {
                setTimeout(() => {
                    console.log(res.data.orders);
                    setOrders(res.data.orders);
                    setIsLoading(false);
                }, 500);
            }).catch(err => {
                addError(err.code, err.response.status, err.response.statusText);
            });
        })();
    }, []);

    return <div className="flex flex-col">
        <div className="text-center">
            <h1 className="font-semibold text-2xl">Orders</h1>
        </div>
        <div className="mt-10">
            {isLoading && <div className="text-center mt-24">
                <Spinner/>
            </div>}
            {!isLoading && orders.length === 0 && <div className="mt-24 text-center">
                <h4 className="text-xl text-blue-900">Right now there are no orders.</h4>
            </div>}
            {!isLoading && orders.length !== 0 && <Table striped={true}>
                <Table.Head>
                    <Table.HeadCell>
                        Name
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Email
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Items
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Total
                    </Table.HeadCell>
                    <Table.HeadCell>
                      <span className="sr-only">
                        Actions
                      </span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {orders?.map(order => <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                                     key={order.id}>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {order.name}
                            </Table.Cell>
                            <Table.Cell>
                                <a href={`mailto:${order.email}`}>{order.email}</a>
                            </Table.Cell>
                            <Table.Cell>
                                {order.order.length}
                            </Table.Cell>
                            <Table.Cell>
                                ${parseFloat(order.total).toFixed(2)}
                            </Table.Cell>
                            <Table.Cell>
                                <Link
                                    to={`/order/${order.id}`}
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                >
                                    More
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>}
        </div>
    </div>
}

export default Orders;