import '../styles/globals.css';
import "../styles/dynamic.css";

import React from 'react';

export default function MyApp({ Component, pageProps })
{
    return (
        <React.StrictMode>
            <div className="container">
                <Component {...pageProps} />
            </div>
        </React.StrictMode>
    );
}
