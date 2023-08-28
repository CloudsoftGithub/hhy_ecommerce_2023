import Layout from "@/components/Layout";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";



export default function OrderPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders').then((response) => {
      setOrders(response.data);
    })

  }, []);

  return (
    <Layout>
      <h1> Orders</h1>

      <table className="basic">
      <thead>
        <tr>
          <th>ID</th>
          <th>Recipient</th>
          <th>Date</th>
          <th>Products</th>
          <th>Paid</th>
        </tr>
      </thead>

      <tbody>
        {orders.length > 0 && orders.map(order => (
          <tr>
            <td>{order._id}</td>
            <td>
              {order.name} <br />
              {order.phoneno} <br />
              {order.email} <br />
              {order.city} {order.streetAddress}  <br />
              {order.state_of_develivery} {order.country} <br />
              {order.order_status} {order.paid} <br />
              </td>
              <td> {new Date(order.createdAt).toUTCString()}</td>
              <td>{order.line_items.map(items =>(
                <>
                {items.price_data?.product_data.name} x
                 {items.quantity} <br />
                 
                </>
              ))} </td>
              <td className={order.paid ? 'text-green-600' : 'text-red-600'}>{order.paid ? 'YES' : `NO \n(to paid when delivered)`}</td>
          </tr>
        ))}
      </tbody>
      </table>
    </Layout>
  );
}
