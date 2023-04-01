import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ProductCard({ product, onDelete }) {
  const handleDelete = () => {
    onDelete(product.id);
  };

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
        </Card.Body>
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