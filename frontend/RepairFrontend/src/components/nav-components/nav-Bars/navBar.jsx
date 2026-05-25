import {Link } from 'react-router-dom';

export default function ApplicationNavBar(source) {
    return(
        <nav>
            <Link to={source}>Linked</Link>
        </nav>
    )
}