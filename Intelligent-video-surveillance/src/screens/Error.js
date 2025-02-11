import { Link } from "react-router-dom"


const Error = () =>
{
    return (
        <section classname='section'>
            <h2>404</h2>
            <p>PAGE NOT FOUND</p>
            <Link to='/'>
                Back Home
            </Link>
        </section>
    )
}
export default Error