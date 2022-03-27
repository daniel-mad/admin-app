import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Paginator from '../../components/Paginator';
import Wraper from '../../components/Wraper';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';

const hide = {
  maxHeight: 0,
  transition: '0.8s ease-in',
};

const show = {
  maxHeight: '200px',
  transition: '0.8s ease-out',
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`orders?page=${page}`);
      setOrders(data.data);
      setLastPage(data.meta.last_page);
    })();
  }, [page]);

  const select = (id: number) => {
    setSelected(selected === id ? 0 : id);
  };

  const handleExport = async () => {
    const { data } = await axios.post(
      'export',
      {},
      {
        responseType: 'blob',
      }
    );
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'orders.csv';
    link.click();
  };

  return (
    <Wraper>
      <div className="btn-group my-2 border-bottom py-3">
        <Link
          to={'.'}
          className="btn btn-sm btn-outline-secondary"
          onClick={handleExport}
        >
          Export
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Total</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => {
              return (
                <React.Fragment key={order.id}>
                  <tr>
                    <td>{order.id}</td>
                    <td>{order.name}</td>
                    <td>{order.email}</td>
                    <td>{order.total}</td>
                    <td>
                      <div className="btn-group mr-2">
                        <a
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => select(order.id)}
                        >
                          View
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5}>
                      <div
                        className="overflow-hidden"
                        style={selected === order.id ? show : hide}
                      >
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Product Title</th>
                              <th>Quantity</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.order_items.map((i: OrderItem) => {
                              return (
                                <tr key={i.id}>
                                  <td>{i.id}</td>
                                  <td>{i.product_title}</td>
                                  <td>{i.quantity}</td>
                                  <td>{i.price}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <Paginator page={page} lastPage={lastPage} pageChanged={setPage} />
    </Wraper>
  );
};

export default Orders;
