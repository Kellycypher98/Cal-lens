import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductScreen from './components/ProductScreen';
import { FoodItem } from './types';

const App: React.FC = () => {
  const [scannedItem, setScannedItem] = useState<FoodItem | null>(null);

  const handleScan = (item: FoodItem) => {
    setScannedItem(item);
  };

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div>
            <h1>Welcome to the Food Scanner App</h1>
            {/* Add a component or button to trigger the scan and call handleScan */}
          </div>
        </Route>
        <Route path="/product">
          <ProductScreen item={scannedItem} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;