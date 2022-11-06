import styles from "../styles/Navbar.module.css";
import Image from 'next/image';
import imgOverview from "../assets/overview.png";
import imgPlace from "../assets/place.png";
import imgWave from "../assets/wave.png";

export default function Navbar() {
   return (
         <nav className={styles.navbar}>
            <button>
               <Image src={imgOverview} width="35" height="35"></Image>
            </button>
            <button>
               <Image src={imgWave} width="35" height="35"></Image>
            </button>
            <button>
               <Image src={imgPlace} width="35" height="35"></Image>
            </button>
         </nav>
   ) 
}