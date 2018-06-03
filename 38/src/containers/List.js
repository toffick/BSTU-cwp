import { connect } from 'react-redux';
import List from '../components/List/List';
import PointsActions from '../actions/PointsActions';

export default connect((state) => ({
	points: state.points.present.get('points'),
}), dispatch => ({
	getAllPoints: () => dispatch(PointsActions.getAll()),
	addPoint: (point) => dispatch(PointsActions.add(point)),
	changePoint: (id, changedData) => dispatch(PointsActions.change(id, changedData)),
	deletePoint: (id) => dispatch(PointsActions.delete(id))
}))(List);
