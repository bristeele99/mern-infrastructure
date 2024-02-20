import { Link } from 'react-router-dom';

export default function Nav ({user}) {
    return (
        <nav>
            
            <Link to="/orders">Order History
            </Link>
            &nbsp; | &nbsp;
            <Link to="/orders/new">New Order
            </Link>
            <h1> Welcome, {user.name}</h1>
        </nav>
    )
}