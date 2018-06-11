function createStore (reducer) {
	let state=null;
 	const getState = () => state;
	const listeners = [];
	const subscribe = (listener) => listeners.push(listener);
	const dispatch = (action) => {
		state = reducer(state, action);
		listeners.forEach((listener)=>listener());
	};
	dispatch({});
	return { getState, dispatch, subscribe};
}

export default createStore;