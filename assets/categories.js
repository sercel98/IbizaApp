const categories = [
    {
        id: 1,
        name: "Cervezas",
        image: './assets/images/cervezaIcon.jpeg'
    },
    {
        id: 2,
        name: "Vinos",
        image: './assets/images/vinosIcon.jpeg'
    },
    {
        id: 3,
        name: "Gaseosas",
        image: './assets/images/gaseosasIcon.jpg'
    },
    {
        id: 4,
        name: "Otros",
        image: './assets/images/otrosIcon.jpg'
    }
];
export default function getCategories() {
    return categories;
}