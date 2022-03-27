import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Paginator from '../../components/Paginator';
import Wraper from '../../components/Wraper';
import { Product } from '../../models/product';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`products?page=${page}`);
      setProducts(data.data);
      setLastPage(data.meta.last_page);
    })();
  }, [page]);

  const del = async (id: number) => {
    try {
      if (window.confirm('Are you sure you want to delete this record?')) {
        await axios.delete(`products/${id}`);
        setProducts(products.filter((p: Product) => p.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wraper>
      <div className="btn-group my-2 border-bottom py-3">
        <Link
          to={'/products/create'}
          className="btn btn-sm btn-outline-secondary"
        >
          Add
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: Product) => {
              return (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    <img src={p.image} width="50" />
                  </td>
                  <td>{p.title}</td>
                  <td>{p.description}</td>
                  <td>{p.price}</td>
                  <td>
                    <div className="btn-group mr-2">
                      <Link
                        to={`/products/${p.id}/edit`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Edit
                      </Link>
                      <a
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => del(p.id)}
                      >
                        Delete
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Paginator page={page} lastPage={lastPage} pageChanged={setPage} />
    </Wraper>
  );
};

export default Products;
