export default function handler(req, res)
{
    const { query } = req;
    const id = query.id;

    res.status(200).json({
        id: id,
        description: "lorem ipsum sit dolor amet.",
        coords: [25, 25]
    });
}