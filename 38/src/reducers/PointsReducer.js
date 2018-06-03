import { createModule } from 'redux-modules';
import { Map } from 'immutable';

const initialState = Map({
	points: [],
});

export default createModule({
	name: 'points',
	initialState,
	transformations: {
		setPoints: {
			reducer: (state, { payload }) => {

				let { points } = payload;

				return state.set('points', points);
			}
		},
		addPoint: {
			reducer: (state, { payload }) => {
				let { point } = payload;

				const newPoints = state.get('points').concat(point);

				return state.set('points', newPoints);
			}
		},
		changePoint: {
			reducer: (state, { payload }) => {
				let { point } = payload;

				const newPoints = state.get('points').map(item => item.id === point.id ? point : item);

				return state.set('points', newPoints);
			}
		},
		deletePoint: {
			reducer: (state, { payload }) => {
				let { id } = payload;

				const newPoints = state.get('points').filter(item => item.id !== id);

				return state.set('points', newPoints);
			}
		}
	}
})
