import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="glass-panel simple-center">
      <h1>Page not found</h1>
      <p className="muted-text">The page you requested does not exist.</p>
      <Link className="button button-primary" to="/">
        Back home
      </Link>
    </section>
  )
}

export default NotFoundPage
