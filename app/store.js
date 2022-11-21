import { configureStore } from "@reduxjs/toolkit";
import reducerCart from "../features/reducerCart";
import reducerShowCart from "../features/reducerShowCart";
import reducerNotification from "../features/reducerNotification";

export const store = configureStore({
    reducer:{
        cart: reducerCart,
        showCart: reducerShowCart,
        notification: reducerNotification,
    }
})