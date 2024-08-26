const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      let priceArr = action.payload.map((prod) => prod.price);
      let maxPrice = Math.max(...priceArr);
      return {
        ...state,
        filterProducts: [...action.payload],
        allProducts: [...action.payload],
        filters: {
          ...state.filters,
          maxPrice: maxPrice,
          price: maxPrice,
        },
      };

    case "SET_GRIDVIEW":
      return {
        ...state,
        gridView: true,
      };

    case "SET_LISTVIEW":
      return {
        ...state,
        gridView: false,
      };

    case "GET_SORT_VALUES":
      return {
        ...state,
        sortingValue: action.payload,
      };

    case "SORTING_PRODUCTS":
      let newSortData;
      let tempSortProduct = state.filterProducts;

      const sortingProducts = (a, b) => {
        if (state.sortingValue === "lowest") return a.price - b.price;
        if (state.sortingValue === "highest") return b.price - a.price;
        if (state.sortingValue === "a-z") return a.name.localeCompare(b.name);
        if (state.sortingValue === "z-a") return b.name.localeCompare(a.name);
      };

      newSortData = tempSortProduct.sort(sortingProducts);

      return {
        ...state,
        filterProducts: newSortData ?? tempSortProduct,
      };

    case "UPDATE_FILTERS_VALUE":
      const { name, value } = action.payload;
      // console.log(name, value);
      return { ...state, filters: { ...state.filters, [name]: value } };

    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          category: "all",
          company: "all",
          color: "all",
          maxPrice: state.filters.maxPrice,
          price: state.filters.maxPrice,
          minPrice: 0,
        },
      };

    case "FILTERING_PRODUCTS":
      let { allProducts } = state;
      let tempFilterProduct = [...allProducts];
      const { text, category, company, color, price } = state.filters;

      if (category !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (prod) => prod.category === category
        );
      }

      if (company !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (prod) => prod.company === company
        );
      }

      if (text) {
        tempFilterProduct = tempFilterProduct.filter((prod) =>
          prod.name.toLowerCase().includes(text)
        );
      }

      if (color !== "all") {
        tempFilterProduct = tempFilterProduct.filter((prod) =>
          prod?.colors.includes(color)
        );
      }

      if (price) {
        tempFilterProduct = tempFilterProduct.filter(
          (ele) => ele.price <= price
        );
      }

      return {
        ...state,
        filterProducts: tempFilterProduct,
      };

    default:
      return state;
  }
};

export default filterReducer;
