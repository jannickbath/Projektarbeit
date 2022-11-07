import styles from "../styles/Navbar.module.css";
import Image from 'next/image';
import imgOverview from "../assets/overview.png";
import imgPlace from "../assets/place.png";
import imgWave from "../assets/wave.png";

export default function Navbar(props)
{
   const modifyData = props.modifyData;

   function handleNavigationSearch()
   {
      // Clear data, so the search shows up
      modifyData((data) =>
      {
         return null;
      });
   }

   function handleNavigationMap()
   {
      modifyData((data) =>
      {
         console.log(data);
         data.hotels.forEach(hotel =>
         {
            hotel.images = [];
         });

         return data;
      });
   }

   return (
      <nav className={styles.navbar}>
         <button onClick={handleNavigationSearch}>
            <Image src={imgOverview} width="35" height="35"></Image>
         </button>
         <button>
            <Image src={imgWave} width="35" height="35"></Image>
         </button>
         <button onClick={handleNavigationMap}>
            <Image src={imgPlace} width="35" height="35"></Image>
         </button>
      </nav>
   );
}