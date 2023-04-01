import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './Form.css';

function Sizes() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState('');
  const [id, setId] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const product = { name: name, price: price, description:description, images:images, id:id};
    console.log(product);
    saveProduct(product);
  }

  const saveProduct = (product) => {
    fetch('/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  return (
    
    <div className='form'>
      <div className="parent">
      <div className="div3"><div className='juan form'>
          <form onSubmit={handleSubmit}>
          <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">Id</InputGroup.Text>
        <Form.Control
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm" value={id} onChange={e => setId(e.target.value)}
        />
      </InputGroup>

      <br />
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Nombre
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default" value={name} onChange={e => setName(e.target.value)}
        />
      </InputGroup>
      <br />
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Precio
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default" value={price} onChange={e => setPrice(e.target.value)}
        />
      </InputGroup>
      <br />
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Descipción
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default" value={description} onChange={e => setDescription(e.target.value)}
        />
      </InputGroup>
      <br />
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Imagénes
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default" value={images} onChange={e => setImages(e.target.value)}
        />
      </InputGroup>
      <br />
      <div className='contenedor'>
      <Button variant="primary" size="lg" active type='submit'>
        Add
      </Button>{' '}
      
    </div>
          </form>
        </div>
      </div>
      </div>
    </div>
    
    
  );
}

export default Sizes;