export interface FoodItem {
    id: string;
    name: string;
    description: string;
    nutritionalInfo: {
        calories: number;
        protein: number;
        fat: number;
        carbohydrates: number;
    };
}