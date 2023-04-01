import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Modal, InputGroup, Form } from "react-bootstrap";

function ProductCard({ product, onDelete }) {
  const handleDelete = () => {
    onDelete(product.id);
  };
  const [show, setShow] = React.useState(false);
  const [price, setPrice] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [images, setImages] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const pro = { price: price, description:description, images:images};
    if(price === "") pro.price = product.price;
    if(description === "") pro.description = product.description;
    if(images === "") pro.images = product.images;
    console.log(pro);
    updateProduct(pro);
  }

  const updateProduct = (pro) => {
    fetch('/products/'+ product.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pro)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data) 
        window.location.reload(true);
      })
      .catch(error => console.error(error));
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Producto: {product.name}</Card.Title>
          <Card.Img variant="top" src={product.images[0]} />
          <p>ID: {product.id}</p>
          <Card.Text>
            {product.description}
          </Card.Text>
          <p> {product.price} </p>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
          <Button variant="primary" onClick={handleShow}>Editar</Button>
        </Card.Body>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar {product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit}>
      <br />
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Precio
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default" placeholder={product.price} value={price} onChange={e => setPrice(e.target.value)}
        />
      </InputGroup>
      <br />
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Descipción
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default" placeholder={product.description} value={description} onChange={e => setDescription(e.target.value)}
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
      <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
            Save Changes
          </Button>
        </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
      </Card><br />
    </div>
  );
}

function Formulario() {
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    fetch('/products')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleDelete = (productId) => {
    fetch(`/products/${productId}`, { method: 'DELETE' })
      .then((response) => {
        if (response.ok) {
          setProducts(products.filter((product) => product.id !== productId));
        } else {
          console.log(`Failed to delete product with ID ${productId}`);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <h1>Listado de los Productos</h1>
      <div>
        <div className="row">
          <div className="cards">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}


export default Formulario;