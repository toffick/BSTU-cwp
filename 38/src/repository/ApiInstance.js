import axios from 'axios'

class ServerApiInstance {

	constructor() {
		this.default = {
			baseURL: SERVER_HOST,
		}
	}

	/**
	 *
	 * @return {AxiosPromise}
	 */
	getAllPoints() {
		return axios(
			'/points',
			{
				...this.default,
				method: 'GET',
			});
	}

	/**
	 *
	 * @param id
	 * @param data
	 * @return {AxiosPromise}
	 */
	updatePoint(id, data) {
		return axios(
			`/points/${id}`,
			{
				...this.default,
				method: 'PUT',
				data,
			});
	}

	/**
	 *
	 * @param data
	 * @return {AxiosPromise}
	 */
	createPoint(data) {
		return axios(
			'/points',
			{
				...this.default,
				method: 'POST',
				data
			});
	}

	/**
	 *
	 * @param id
	 * @return {AxiosPromise}
	 */
	deletePoint(id) {
		return axios(
			`/points/${id}`,
			{
				...this.default,
				method: 'DELETE',
			});
	}


}

export default new ServerApiInstance();
