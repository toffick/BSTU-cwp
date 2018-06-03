import ApiInstance from '../repository/ApiInstance';
import PointsReducer from '../reducers/PointsReducer';

export default class PointsActions {

	static getAll() {
		return async (dispatch) => {
			try {
				const { data } = await ApiInstance.getAllPoints();

				return dispatch(PointsReducer.actions.setPoints({ points: data }));
			}
			catch (e) {
				console.error(e);
			}
		};
	}

	static add(point) {
		return async (dispatch) => {
			try {
				const { data } = await  ApiInstance.createPoint(point);

				return dispatch(PointsReducer.actions.addPoint({ point: data }));
			}
			catch (e) {
				console.error(e);
			}
		};
	}

	static change(id, changedData) {
		return async (dispatch) => {
			try {
				const { data } = await  ApiInstance.updatePoint(id, changedData);

				return dispatch(PointsReducer.actions.changePoint({ point: data }));
			}
			catch (e) {
				console.error(e);
			}
		};
	}

	static delete(id) {
		return async (dispatch) => {
			try {
				const { data } = await  ApiInstance.deletePoint(id);

				return dispatch(PointsReducer.actions.deletePoint({ id }));
			}
			catch (e) {
				console.error(e);
			}
		};
	}

}
