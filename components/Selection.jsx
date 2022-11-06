import styles from "../styles/Selection.module.css";
import Image from 'next/image';

// Icons
import imgLike from "../assets/like.png";
import imgDismiss from "../assets/dismiss.png";
import imgFavorite from "../assets/favorite.png";
import { useState } from 'react';

export default function Selection(props)
{
    const data = props.data;
    const changeRating = props.changeRating;

    const [animation, setAnimation] = useState("");

    function changeAnimation(type)
    {
        const animationDuration = 500; //ms
        setAnimation(type);

        // Remove animation class after it's finished
        setTimeout(() =>
        {
            setAnimation("");
        }, animationDuration);
    }

    return (
        <div className={styles.selection}>
            <div className={styles.main_image_container}>
                <Image src={data.images[0]} width="800" height="800" className={styles.main_image}></Image>
                <div className={styles.floating_info}>
                    <div className={styles.data}>
                        <h4 className={styles.name}>{data.name}</h4>
                        <p className={styles.description}>{data.description}</p>
                        <p className={styles.distance}>{data.distance}km von deinem ausgewähltem Ort entfernt</p>
                    </div>
                    <div className={styles.overlay}></div>
                </div>
                <div className={styles.background_icon}>
                    <Image src={imgLike} className={animation === "like" && "anim_popout"}></Image>
                    <Image src={imgDismiss} className={animation === "dislike" && "anim_popout"}></Image>
                    <Image src={imgFavorite} className={animation === "favorite" && "anim_popout"}></Image>
                </div>
            </div>
            <div className={styles.button_section}>
                <button className={styles.dismiss} onClick={() => { changeAnimation("dislike"); changeRating(-0.1); }}>
                    <Image src={imgDismiss}></Image>
                </button>
                <button className={styles.favorite} onClick={() => { changeAnimation("favorite"); changeRating(+0.3); }}>
                    <Image src={imgFavorite}></Image>
                </button>
                <button className={styles.like} onClick={() => { changeAnimation("like"); changeRating(+0.1); }}>
                    <Image src={imgLike}></Image>
                </button>
            </div>
        </div >
    );
}