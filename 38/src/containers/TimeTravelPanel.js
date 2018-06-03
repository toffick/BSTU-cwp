import { connect } from 'react-redux';
import TimeTravelPanel from '../components/TimeTravelPanel';
import { ActionCreators } from 'redux-undo';

const canUndo = (model) => model.past && model.past.length !== 0;
const canRedo = (model) => model.future && model.future.length !== 0;

export default connect((state) => ({
	canUndo: canUndo(state.points),
	canRedo: canRedo(state.points)
}), dispatch => ({
	undo: () => dispatch(ActionCreators.undo()),
	redo: () => dispatch(ActionCreators.redo())
}))(TimeTravelPanel);
