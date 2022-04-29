const { Link, NavLink } = ReactRouterDOM

export function MainHeader() {
    return <section className="main-header">

        <Link to="/"><h1>Appsus</h1></Link>
        <nav>
            <NavLink to="/" exact>Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/email">Email</NavLink>
            <NavLink to="/keep">Keep</NavLink>
        </nav>
    </section>
}