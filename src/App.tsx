import { useEffect, useState } from 'react'
import './App.css'

const products: Array<Product> = [
  {
    title: "Divina Comedia",
    author: "Dante Alighieri",
    price: 13,
    soldout: false
  },
  {
    title: "Cien años de soledad",
    author: "Gabriel García Marquez",
    price: 15,
    soldout: false
  },
  {
    title: "The picture of Dorian Gray",
    author: "Oscar Wilde",
    price: 14,
    soldout: false
  },
  {
    title: "Lord of the flies",
    author: "William Golding",
    price: 16,
    soldout: true
  }
]

interface Product {
  title: string,
  author: string,
  price: number,
  soldout: boolean
}

interface Cart extends Product {
  quantity: number
}

function App() {
  const [cart, setCart] = useState<Array<Cart>>([])
  const [total, setTotal] = useState<number>(0)

  const add = (prod: Product) => {
    setCart(() => {
      if (cart.find(item => item.title === prod.title)) {
        return cart.map(item =>
          item.title === prod.title? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...cart, { ...prod, quantity: 1 }];
      }
    })
  }

  useEffect(() => {
    setTotal(cart.reduce((tot, item) => tot + item.price * item.quantity, 0))
  }, [cart])

  return (
    <div className='container'>
      <h2 className='mobile'>Website not available on mobile</h2>
      <div className='prod-list'>
        <h2>Products List</h2>
        <ul >
          {products.map(prod => {
            return (
              <li key={prod.title}>
                <div>
                  <h3>{prod.title}, 
                    <span className='author-font'> {prod.author}</span>
                  </h3>
                  <h4>USD {prod.price}</h4>
                </div>
                <div>
                  {prod.soldout ? <h4 className='bt'>Sold Out</h4> : <button onClick={() => add(prod)}>Add</button>}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      <div className='prod-cart'>
        <h2>Cart</h2>
        <ul>
          {cart.map(p => {
            return (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <h4>{p.quantity}  x  USD {p.quantity * p.price}</h4>
              </li>
            )
          })}
        </ul>
        <div className='total'>
          <h3>Total</h3>
          <h3>USD {total}</h3>
        </div>
      </div>
    </div>
  )
}

export default App
