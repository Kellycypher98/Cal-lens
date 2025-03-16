import React from 'react';
import { FoodItem } from '../types';

interface ProductScreenProps {
  foodItem: FoodItem | null;
}

const ProductScreen: React.FC<ProductScreenProps> = ({ foodItem }) => {
  if (!foodItem) {
    return <div>No food item scanned.</div>;
  }

  return (
    <div>
      <h1>{foodItem.name}</h1>
      <p>{foodItem.description}</p>
      <h2>Nutritional Information</h2>
      <ul>
        <li>Calories: {foodItem.nutrition.calories}</li>
        <li>Protein: {foodItem.nutrition.protein}g</li>
        <li>Carbohydrates: {foodItem.nutrition.carbohydrates}g</li>
        <li>Fat: {foodItem.nutrition.fat}g</li>
      </ul>
    </div>
  );
};

export default ProductScreen;