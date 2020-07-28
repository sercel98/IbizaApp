const orders = [
  {
    id: "sadsdssds",
    address: "Manza 12 Casa 26 La campiña",
    email: "sergiocelemin1998@gmail.com",
    names: "Sergio Andrés Celemín Ramirez",
    phone: "3213735529",
    products: [
      {
        product: {
          id: 2,
          name: "Botella de Ron",
          price: 20200,
          volume: "1 lt",
          alcohol: 26,
          image: 'ron.jpeg',
          categoryId: 4
        },
        quantity: 12
      }
    ],
  },
  {
    id: "sdsadxcdsad23ds",
    address: "Calle 12 Carrera 90 #2-32",
    email: "juanrios@gmail.com",
    names: "Juan Esteban Ramirez",
    phone: "3213735528",
    products: [
      {
        product: {
          id: 2,
          name: "Botella de Ron",
          price: 20200,
          volume: "1 lt",
          alcohol: 26,
          image: 'ron.jpeg',
          categoryId: 4
        },
        quantity: 12
      }
    ],
  },
];
export default function getOrders() {
  return orders;
}