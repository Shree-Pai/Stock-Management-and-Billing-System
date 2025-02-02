import { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
// import Navbar from './components/Navbar';
import ItemState from './context/itemState';
import InvoiceState from './context/invoiceState';
import BillingMain from './components/billingMain';
import AddItemState from './context/addItemState';

function App() {
  return (
    <ItemState>
      <InvoiceState>
        <AddItemState>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<BillingMain />} />
                {/* Add more routes here if needed */}
              </Routes>
            </Suspense>
          </Router>
        </AddItemState>
      </InvoiceState>
    </ItemState>
  );
}

export default App;
