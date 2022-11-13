export default function handler(req, res)
{
    const { query } = req;

    // Demo Data
    const description = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus.";
    const distance = 5;
    const imagesFirst = [
        "https://cdn.prod.www.spiegel.de/images/a2ef0a48-0001-0004-0000-000001360189_w1600_r1.5_fpx65.99_fpy52.99.jpg",
        "https://www.fotoblog-bayern.de/wp-content/uploads/2021/06/A_R07559-2-2200x1467.jpg",
        "https://www.22places.de/images/2016/01/spiegelung-landschaftsfotografie.jpg",
        "https://businessblog.trivago.com/wp-content/uploads/2016/04/864x519_06.jpg",
        "https://de.escapio.com/blog/wp-content/uploads/8148_hotel_amabilis_0408505-700x460.jpg"
    ];

    const imagesSecond = [
        "https://www.stefan-hefele.de/wp-content/uploads/2020/12/Heidemagie-768x512.jpg",
        "https://srose-fotografie.de/wp-content/uploads/2021/01/sachsen-saechsische-schweiz-sonnenuntergang-sandstein-srose-fotografie.jpg",
        "https://cdn.duden.de/_media_/full/L/Landschaftsbild-201020572812.jpg"
    ];

    const name = "Hotel Sommerausblick";

    if (query.location == "rostock") {
        res.status(200).json({
            location: {
                name: "rostock",
                coordinates: [12.078792942930813, 54.101337831632584]
            },
            hotels: [
                {
                    id: 1,
                    name: name,
                    description: description,
                    distance: distance,
                    coordinates: [12.093020020168026, 24.0971237795784],
                    images: imagesFirst
                },
                {
                    id: 2,
                    name: name + "2",
                    description: description + "2",
                    distance: distance,
                    coordinates: [24.093020020168026, 12.0971237795784],
                    images: imagesSecond
                },
                {
                    id: 3,
                    name: name + "3",
                    description: description + "3",
                    distance: distance,
                    coordinates: [28.0930234020168026, 69.0271237795784],
                    images: [...imagesFirst, ...imagesSecond]
                }
            ],
            success: true
        });
    }

    res.status(400).json({
        success: false
    });
}