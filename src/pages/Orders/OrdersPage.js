import React from 'react';
import { useOrder } from '../../context/OrderContext';
import './OrdersPage.css';

const OrdersPage = () => {
  const { orders } = useOrder();

  if (orders.length === 0) {
    return (
      <div className="orders-empty">
        <h2>No orders Found</h2>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orders.map((order, index) => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <h3>Order #{orders.length - index}</h3>
            <span>Ordered On: {order.date.split('T')[0]}</span>
          </div>
          <table className="order-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map(item => (
                <tr key={item.id}>
                  <td title={item.title}>{item.title.length > 30 ? item.title.substring(0, 30) + '...' : item.title}</td>
                  <td>₹ {item.price}</td>
                  <td>{item.quantity}</td>
                  <td>₹ {item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" style={{ textAlign: 'right', fontWeight: 'bold' }}>Grand Total:</td>
                <td style={{ fontWeight: 'bold' }}>₹ {order.totalPrice}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
