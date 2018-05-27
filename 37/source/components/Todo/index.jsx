import React from 'react';
import axios from 'axios';
import ToDoModel from "../Models/ToDoModel";
import Nav from "../Nav/index";
import ToDoSummary from "./Summary";
import ToDoList from "./List";
import ToDoForm from "./Form";
import ToDoClear from "./Clear";
import Notifications from "../Notifications/index";
import NotificationsModel from "../Models/NotificationsModel";
import NavModel from "../Models/NavModel";
import { List } from "immutable";

export default class ToDo extends React.Component {
	constructor(props) {
		super(props);

		this._rerender = this._rerender.bind(this);
		this._toggleItem = this._toggleItem.bind(this);
		this._toogleAll = this._toogleAll.bind(this);
		this._removeItem = this._removeItem.bind(this);
		this._addItem = this._addItem.bind(this);
		this._updateItem = this._updateItem.bind(this);
		this._removeCompleted = this._removeCompleted.bind(this);
		this._navigate = this._navigate.bind(this);

		this.todoModel = new ToDoModel();
		this.navModel = new NavModel();
		this.notificationModel = new NotificationsModel();


		this.state = {
			activeLink: { title: "All" },
			areAllCompleted: true,
			completed: 0,
			links: [],
			remains: 0,
			tasks: [],
			notifications: []
		};
	};


	componentWillMount() {
		axios.get('/tasks')
			.then(({ data }) => {
				this.todoModel.list = List(data);
				this._rerender();
			})
	}

	render() {
		return (
			<div className="global">
				<div className="todo">
					<div className="todo__title">React ToDo</div>
					<Nav links={this.state.links} activeLink={this.state.activeLink}
						 navigate={this._navigate}/>
					<ToDoSummary remains={this.state.remains} completed={this.state.completed}/>
					<ToDoList tasks={this.state.tasks} areAllComplete={this.state.areAllCompleted}
							  toggleItem={this._toggleItem} toggleAll={this._toogleAll}
							  removeItem={this._removeItem} updateItem={this._updateItem}
					/>
					<ToDoForm addItem={this._addItem}/>
					<ToDoClear removeCompleted={this._removeCompleted}/>
				</div>
				<div className="notifications">
					<Notifications notifications={this.state.notifications}/>
				</div>
			</div>

		);
	}

	_getState() {
		const state = {
			remains: this.todoModel.getActiveCount(),
			completed: this.todoModel.getCompletedCount(),

			links: this.navModel.getLinks(),
			activeLink: this.navModel.getActive()
		};

		state.areAllCompleted = state.remains === 0;

		if (state.activeLink.title === 'All') {
			state.tasks = this.todoModel.getItems();
		} else if (state.activeLink.title === 'Completed') {
			state.tasks = this.todoModel.getCompletedItems();
		} else {
			state.tasks = this.todoModel.getActiveItems();
		}

		state.notifications = this.notificationModel.getNotifications();

		return state;
	}

	_rerender() {
		this.setState(this._getState());
	}

	_toggleItem(id) {
		axios.post('/toggle-item', { id }).then(() => {
			this.todoModel.toggleItem(id);
			this._rerender();
		});
	}

	_toogleAll() {
		axios.post('/toggle-all', { areAllCompleted: !this.state.areAllCompleted }).then(() => {
			this.todoModel.switchAllTo(!this.state.areAllCompleted);
			this._rerender();
		});
	}

	_removeItem(id) {
		axios.delete(`/tasks/${id}`).then(() => {
			this.todoModel.removeItem(id);
			this._rerender();
		});
	}

	_addItem(text) {
		//  optimistic UI updates
		const task = this.todoModel.addItem(text);
		this._rerender();

		axios.post('/tasks', { task }).then(({ data }) => {
			if (data.error) {
				this.todoModel.removeItem(data.id);
			}

			this.notificationModel.push(task, data.error, () => {
				this._rerender();
			});
			this._rerender();
		});
	}

	_updateItem(id, text) {
		axios.put(`/tasks/${id}`, { text }).then(() => {
			this.todoModel.updateItem(id, text);
			this._rerender();
		});
	}

	_removeCompleted() {
		axios.post('/clear', {}).then(() => {
			this.todoModel.removeCompleted();
			this._rerender();
		});
	}

	_navigate(link) {
		this.navModel.setActive(link);
		this._rerender();
	}
}
