import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../../components/ImageUpload';
import Wraper from '../../components/Wraper';

const ProductCreate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post('products', {
      title,
      description,
      image,
      price,
    });

    setRedirect(true);
  };
  useEffect(() => {
    if (redirect) {
      navigate('/products');
    }
  }, [redirect]);
  return (
    <Wraper>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            rows={5}
            className="form-control"
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Image</label>
          <div className="input-group">
            <input
              type="text"
              value={image}
              className="form-control"
              onChange={e => setImage(e.target.value)}
            />
            <ImageUpload uploaded={setImage} />
          </div>
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            onChange={e => setPrice(+e.target.value)}
          />
        </div>
        <button className="btn btn-outline-primary">Save</button>
      </form>
    </Wraper>
  );
};

export default ProductCreate;
