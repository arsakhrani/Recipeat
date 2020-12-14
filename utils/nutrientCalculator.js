
module.exports.nutrientCalculator = (ingredientPack, recipe) => {
    let totalCalories = 0;  
    let totalProtein = 0; 
    let totalCarb = 0;   
    let totalFat = 0;  
    for (let item of ingredientPack) { 
        if (item.calories.per === '100gram' || item.calories.per === '100ml' ) { 
            item.calories.value = item.calories.value / 100;  
            item.protein = item.protein / 100; 
            item.carb = item.carb / 100; 
            item.fat = item.fat / 100; 
    }  
    for (let ingredient of recipe.ingredients) { 
        if (item.ingredient === ingredient.name) { 
            item.calories.value = item.calories.value * ingredient.amount; 
            item.protein = item.protein * ingredient.amount; 
            item.carb = item.carb * ingredient.amount; 
            item.fat = item.fat * ingredient.amount;  
    }   
    } 
    totalCalories += item.calories.value;  
    totalProtein += item.protein; 
    totalCarb += item.carb; 
    totalFat += item.fat;  
    }  
}