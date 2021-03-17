import React from 'react';
import css from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(typeKey => {
         return [...Array(Math.round(+props.ingredients[typeKey]))].map((_, i) => {
             return <BurgerIngredient key={typeKey + i} type={typeKey} />
         })
    })
    .reduce((arr, el) => {
        return arr.concat(el)
     }, []);

    //Transformed ingredients will be an array of arrays.
    //Reduce() is used to essentially remove all empty arrays so that
    //it's easy to detect when no ingredients have been selected
    //.filter(x => x.length > 0); would do a similar job

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    
    return (
        <div className={css.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default Burger
