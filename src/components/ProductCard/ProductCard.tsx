import './ProductCard.css';
import { Form, Link } from 'react-router-dom';

interface ProductProps {
    product: Product;
}

function ProductCard({ product }: ProductProps) {

    return (
        <div className="card">
            <img src={product.pictureUrl} alt={product.name} />
            <section>
                <h1>({product.id}) {product.name}</h1>
                <p>{product.category}</p>
                <p>{product.price}</p>
                <div className="card-button-div">
                    <Link to={`/products/${product.id}/edit`}>
                        <button>Editar</button>
                    </Link>
                    <Form method="post" action="/products">
                        <input type="hidden" name="id" value={product.id} />
                        <input type="hidden" name="_action" value="delete" />
                        <button type="submit">Excluir</button>
                    </Form>
                </div>
            </section>
        </div>
    );
}

export default ProductCard;