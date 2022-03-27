import axios from 'axios';
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ImageUpload from '../../components/ImageUpload';
import Wraper from '../../components/Wraper';

const ProductEdit = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`products/${id}`);
      setTitle(data.title);
      setDescription(data.description);
      setImage(data.image);
      setPrice(data.price);
    })();
  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.put(`products/${id}`, {
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

  const updateImage = (url: string) => {
    if (ref.current) {
      ref.current.value = url;
      setImage(url);
    }
  };
  return (
    <Wraper>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            value={title}
            type="text"
            className="form-control"
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            value={description}
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
              ref={ref}
              className="form-control"
              onChange={e => setImage(e.target.value)}
            />
            <ImageUpload uploaded={updateImage} />
          </div>
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input
            value={price}
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

export default ProductEdit;