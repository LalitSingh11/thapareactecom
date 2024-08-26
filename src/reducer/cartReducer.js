const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let { id, color, amount, product } = action.payload;

      let existingProduct = state.cart.find(
        (curItem) => curItem.id === id + color
      );

      if (existingProduct) {
        let updatedProduct = state.cart.map((curElem) => {
          if (curElem.id === id + color) {
            let newAmount = curElem.amount + amount;

            newAmount = newAmount >= curElem.max ? curElem.max : newAmount;
            return {
              ...curElem,
              amount: newAmount,
            };
          } else {
            return curElem;
          }
        });
        return {
          ...state,
          cart: updatedProduct,
        };
      } else {
        let cartProduct = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.image[0].url,
          price: product.price,
          max: product.stock,
        };

        return {
          ...state,
          cart: [...state.cart, cartProduct],
        };
      }

    case "REMOVE_ITEM":
      let updatedCart = state.cart.filter((ele) => ele.id !== action.payload);

      return {
        ...state,
        cart: updatedCart,
      };

    case "INCREASE":
      let updateCart = state.cart.map((curElem) => {
        if (curElem.id === action.payload && curElem.amount < curElem.max) {
          let incAmount = curElem.amount + 1;

          return {
            ...curElem,
            amount: incAmount ?? amount,
          };
        } else {
          return curElem;
        }
      });
      return { ...state, cart: updateCart };

    case "DECREASE":
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem.id === action.payload && curElem.amount > 1) {
          let decAmount = curElem.amount - 1;

          return {
            ...curElem,
            amount: decAmount,
          };
        } else {
          return curElem;
        }
      });
      return { ...state, cart: updatedProduct };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    case "CART_TOTAL_ITEM_PRICE":
      let { totalItem, totalPrice } = state.cart.reduce(
        (accum, curElem) => {
          let { price, amount } = curElem;

          accum.totalItem += amount;
          accum.totalPrice += price * amount;

          return accum;
        },
        {
          totalItem: 0,
          totalPrice: 0,
        }
      );
      return {
        ...state,
        totalItem,
        totalPrice,
      };

    default:
      return state;
  }
};

export default cartReducer;
