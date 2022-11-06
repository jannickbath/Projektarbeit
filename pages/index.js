import { useState } from 'react';
import styles from "../styles/Search.module.css";

// Components
import Navbar from '../components/Navbar';
import Selection from '../components/Selection';
import Map from "../components/Map";

export default function Home()
{
    const [data, setData] = useState();

    // const placeholders = {
    //     hotels: [
    //         {
    //             id: 1,
    //             name: "placeholder",
    //             description: "placeholder description",
    //             distance: 5,
    //             images: []
    //         },
    //         {
    //             id: 2,
    //             name: "placeholder" + "2",
    //             description: "placeholder description" + "2",
    //             distance: 5,
    //             images: []
    //         },
    //     ]
    // };

    const [rating, setRating] = useState({
        "0": 1,
        "1": 1
    });

    const [hotelId, setHotelId] = useState(0);

    const [search, setSearch] = useState("");

    function changeRating(amount)
    {
        const randInt = randomIntFromInterval(0, data.hotels.length - 1);
        setRating({
            ...rating,
            [hotelId]: rating[hotelId] + amount
        });

        data.hotels[hotelId].images.splice(0, 1); // remove image after review
        setHotelId(randInt);// set to some random id
    }

    function randomIntFromInterval(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function handleSubmit(e)
    {
        // Prevents page refresh
        e.preventDefault();

        // Fetch hotel data from local api
        fetch(`/api/location?location=${search}`)
            .then(data => data.json())
            .then(data => setData(data));
    }

    return (
        <>
            {
                data ?
                    <>
                        <Navbar />
                        {
                            data.hotels[hotelId].images.length > 1 ?
                                <Selection data={data.hotels[hotelId]} changeRating={changeRating} />
                                :
                                <Map />
                        }
                    </>
                    :
                    <div className={styles.search}>
                        <form onSubmit={(e) => handleSubmit(e)} method="POST">
                            <input type="text" onChange={(e) => setSearch(e.target.value)} />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
            }
        </>
    );
}