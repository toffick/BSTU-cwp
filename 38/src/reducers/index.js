import { combineReducers } from 'redux';
import PointsReducer from './PointsReducer';
import undoable from 'redux-undo';

export default combineReducers({
	points: undoable(PointsReducer.reducer)
});
