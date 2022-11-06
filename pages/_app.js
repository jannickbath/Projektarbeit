import '../styles/globals.css';

export default function MyApp({ Component, pageProps })
{
    return (
        <div className="container">
            <Component {...pageProps} />
        </div>
    );
}
