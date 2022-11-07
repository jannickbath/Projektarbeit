import styles from "../styles/Search.module.css";

import { useState } from 'react';

export default function Search(props)
{
    const modifyData = props.modifyData;

    const [search, setSearch] = useState("");

    function handleSubmit(e)
    {
        // Prevents page refresh
        e.preventDefault();

        // Fetch hotel data from local api
        fetch(`/api/location?location=${search}`)
            .then(data => data.json())
            .then(data => modifyData(() => { return data; }));
    }

    return (
        <div className={styles.search}>
            <form onSubmit={(e) => handleSubmit(e)} method="POST">
                <input type="text" onChange={(e) => setSearch(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}