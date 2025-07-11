import { applyMiddleware, combineReducers, compose, createStore as reduxCreateStore } from 'redux';
import { thunk } from 'redux-thunk';

import { CartsReducer } from '../cart/reducers';
import { CategoriesReducer } from '../category/reducers';
// import { OrdersReducer } from '../order/reducers';
import { ProductsReducer } from '../product/reducers';
import { UserReducer } from '../users/reducers';


export default function createStore() {
	return reduxCreateStore(
		combineReducers({
			// router: connectRouter(history),
			user: UserReducer,
			categories: CategoriesReducer,
			products: ProductsReducer,
			carts: CartsReducer,
			// orders: OrdersReducer,
		}),
		
			 compose(applyMiddleware(thunk))
			// DEBUG MODE
			// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		);
	
}

// export default function createStore() {
//     return reduxCreateStore(
//         combineReducers({
//             user: UserReducer,
//             categories: CategoriesReducer,
//              products: productsReducer,
//             carts: cartsReducer,
//             // order: ordersReducer
//         }),
//         compose(applyMiddleware(thunk))
//     );
// }
