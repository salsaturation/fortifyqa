import { Link, useLocation } from 'react-router-dom';
import { Section } from '@/components/site/Primitives';

export default function PageNotFound() {
    const location = useLocation();

    return (
        <Section>
            <p className="mono-label text-primary">404</p>
            <h1 className="mt-5 text-3xl font-semibold md:text-5xl">Page not found</h1>
            <p className="mt-5 text-muted-foreground">
                Nothing lives at <span className="font-mono text-foreground">{location.pathname}</span>.
            </p>
            <Link to="/" className="mono-label mt-8 inline-block text-primary">Back to home →</Link>
        </Section>
    )
}
