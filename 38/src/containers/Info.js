import { connect } from 'react-redux';
import Info from '../components/Info';

export default connect((state) => ({
	points: state.points.present.get('points'),
}), dispatch => ({
}))(Info);
