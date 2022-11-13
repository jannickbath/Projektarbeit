import { useState } from 'react';

// Components
import Navbar from '../components/Navbar';
import Selection from '../components/Selection';
import Map from "../components/OlMap";
import Search from "../components/Search";

export default function Home()
{
    const [data, setData] = useState();

    const [rating, setRating] = useState({
        "0": 1,
        "1": 1
    });

    const [hotelId, setHotelId] = useState(0);

    // Recursive function to get a hotel-id with existing images, while still beeing random order
    function getRandomHotelId()
    {
        const randInt = randomIntFromInterval(0, data.hotels.length - 1);

        // // Make sure there are still images to show
        const imagesAvailable = data.hotels.some(hotel =>
        {
            return hotel.images.length > 0;
        });

        if (imagesAvailable) {
            // If newly generated hotel has images to show
            if (data.hotels[randInt].images.length > 0) {
                return randInt;
            }
            getRandomHotelId();
        }

        // If there are no images left, just use the first hotel --> map gets rendered
        return 0;
    }

    function changeRating(amount)
    {
        const animationDuration = 500; //ms

        setTimeout(() =>
        {
            setRating({
                ...rating,
                [hotelId]: rating[hotelId] + amount
            });

            data.hotels[hotelId].images.splice(0, 1); // remove first image after review
            setHotelId(getRandomHotelId());
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

    const currentImages = data ? data.hotels[hotelId].images.length > 0 : false;

    return (
        <>
            {
                data ?
                    <>
                        <Navbar modifyData={modifyData} />
                        {
                            // Any images on the current hotel?
                            currentImages ?
                                <Selection data={data.hotels[hotelId]} changeRating={changeRating} />
                                :
                                <Map data={data} />
                        }
                    </>
                    :
                    <Search modifyData={modifyData} />
            }
        </>
    );
}