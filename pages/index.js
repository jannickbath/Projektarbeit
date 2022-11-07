import { useState } from 'react';

// Components
import Navbar from '../components/Navbar';
import Selection from '../components/Selection';
import Map from "../components/Map";
import Search from "../components/Search";

export default function Home()
{
    const [data, setData] = useState();

    const [rating, setRating] = useState({
        "0": 1,
        "1": 1
    });

    const [hotelId, setHotelId] = useState(0);

    function changeRating(amount)
    {
        const animationDuration = 500; //ms

        setTimeout(() =>
        {
            const randInt = randomIntFromInterval(0, data.hotels.length - 1);
            setRating({
                ...rating,
                [hotelId]: rating[hotelId] + amount
            });

            data.hotels[hotelId].images.splice(0, 1); // remove image after review
            setHotelId(randInt);// set to some random id
        }, animationDuration);

    }

    function randomIntFromInterval(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function modifyData(cb)
    {
        // spread operator for react to rerender on property change
        setData(cb({ ...data }));
    }

    return (
        <>
            {
                data ?
                    <>
                        <Navbar modifyData={modifyData} />
                        {
                            data.hotels[hotelId].images.length > 1 ?
                                <Selection data={data.hotels[hotelId]} changeRating={changeRating} />
                                :
                                <Map />
                        }
                    </>
                    :
                    <Search modifyData={modifyData} />
            }
        </>
    );
}