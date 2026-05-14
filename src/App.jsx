import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home';
import { ProductDetails } from './components/ProductDetails/ProductDetails';
import { Cart } from './components/Cart/Cart';

const App = () => {
  return(
    <>
      <Router>
        <Routes>
          {/* home */}
          <Route path='/' element={<Home />} />
          {/* product detail */}
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          
        </Routes>
      </Router>
    </>
  );


}

export default App;
