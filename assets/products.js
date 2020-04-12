const products = [
  {
    id: 1,
    name: "Botella de Bacardí",
    price: 20200,
    volume: "750 mL",
    alcohol: 38.5,
    image: require('./images/bacardi.jpeg'),
  },
  {
    id: 2,
    name: "Botella de Ron",
    price: 20200,
    volume: "1 lt",
    alcohol: 26,
    image: require('./images/ron.jpeg')
  },
  {
    id: 3,
    name: "Six pack de Cerveza Poker",
    price: 13000,
    volume: "360 mL",
    alcohol: 4.3,
    image: require('./images/poker.jpg')
  },
  {
    id: 4,
    name: "Six pack de Cerveza Corona",
    price: 2000,
    volume: "360 mL",
    alcohol: 4.3,
    image: require('./images/poker.jpg')
  },
  {
    id: 5,
    name: "Six pack de Cerveza budweiser",
    price: 2000,
    volume: "360 mL",
    alcohol: 4.3,
    image: require('./images/poker.jpg')
  },
  {
    id: 6,
    name: "Botella de Bacardí",
    price: 20200,
    volume: "750 mL",
    alcohol: 38.5,
    image: require('./images/bacardi.jpeg'),
  },
  {
    id: 7,
    name: "Botella de Ron",
    price: 20200,
    volume: "1 lt",
    alcohol: 26,
    image: require('./images/ron.jpeg')
  },
  {
    id: 8,
    name: "Six pack de Cerveza Poker",
    price: 13000,
    volume: "360 mL",
    alcohol: 4.3,
    image: require('./images/poker.jpg')
  }
];
export default function getProducts(){
  return products; 
}