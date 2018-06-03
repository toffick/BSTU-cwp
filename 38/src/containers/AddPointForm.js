import { connect } from 'react-redux';
import AddPointForm from '../components/AddPointForm';
import PointsActions from '../actions/PointsActions';

export default connect((state) => ({}), dispatch => ({
	addPoint: (point) => dispatch(PointsActions.add(point))
}))(AddPointForm);
