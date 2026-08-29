
import './OrderCounter.css';

import { useState } from "react";

const OrderCounter = () => {

     const [count, setCount] = useState(0);

     return (

          <section className='counter'>
               <button className='order-counter' onClick={() => setCount(count + 1)}>Add Order:
               </button>
               <span className='count'>{count}</span>
          </section>
     )
}

export default OrderCounter