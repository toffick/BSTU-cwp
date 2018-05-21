class ToDoModel {
	constructor() {
		this.list = [];
	}

	getItems() {
		return this.list;
	}

	getActiveItems() {
		return this.list.filter(x => !x.completed);
	}

	getCompletedItems() {
		return this.list.filter(x => x.completed);
	}

	getActiveCount() {
		return this.list.filter(x => !x.completed).length;
	}

	getCompletedCount() {
		return this.list.filter(x => x.completed).length;
	}

	addItem(text) {
		let item = {
			id: Date.now() + this.list.length,
			text: text,
			completed: false
		};

		this.list.push(item);

		return item;
	}

	removeItem(id) {
		let index = this.list.findIndex(x => x.id === id);
		this.list.splice(index, 1);
	}

	removeCompleted() {
		this.list = this.getActiveItems();
	}

	updateItem(id, text) {
		let index = this.list.findIndex(x => x.id === id);
		this.list[index].text = text;
	}

	toggleItem(id) {
		let index = this.list.findIndex(x => x.id === id);
		this.list[index].completed = !this.list[index].completed;
	}

	switchAllTo(completed) {
		this.list.forEach(x => x.completed = completed);
	}
}

class NavModel {
	constructor() {
		this.links = [
			{ title: 'All' },
			{ title: 'Active' },
			{ title: 'Completed' }
		];

		this.active = this.links[0];
	}

	getLinks() {
		return this.links;
	}

	getActive() {
		return this.active;
	}

	setActive(link) {
		this.active = link;
	}
}

class NotificationsModel {
	constructor() {
		this.closeTimeout = 5000;
		this.notifications = [];
	}

	getNotifications() {
		return this.notifications;
	}

	push(task, error, cb) {
		const timerId = setTimeout(() => {
			this.notifications = this.notifications.filter(item => item.task.id !== task.id);
			cb()
		}, this.closeTimeout);

		this.notifications.push({ task, timerId, error });
	}
}

const todoModel = new ToDoModel();
const navModel = new NavModel();
const notificationModel = new NotificationsModel();

class Notifications extends React.Component {
	render() {
		return (
			<div className='notifications_container'>
				{this.props.notifications.map(item => (
					<Notification notification={item}/>))}
			</div>
		);
	}
}

class Notification extends React.PureComponent {
	render() {
		const { task, error } = this.props.notification;
		return error ?
			(<div className='notification_item reject_add'>
				The task {task.id}({task.text.slice(0,10)}...) was not added to the task list
			</div>)
			:
			(<div className='notification_item success_add'>
					The task {task.id}({task.text.slice(0,10)}...) was successfully added to the list
				</div>
			);
	}
}

class Popup extends React.PureComponent {
	render() {
		return (
			<div className='popup'>
				<div className='popup_inner'>
					<h1>{this.props.text}</h1>
					<button onClick={this.props.complete}>Yes</button>
					<button onClick={this.props.closePopup}>No</button>
				</div>
			</div>
		);
	}
}

class ToDoSummary extends React.PureComponent {
	render() {
		return (
			<div className="todo-info">
			<span className="todo-info__remains">
			{this.props.remains} remains
		</span>
				{' '}
				<span className="todo-info__completed">
			/ {this.props.completed} completed
		</span>
			</div>
		);
	}
}

class ToDoTextInput extends React.PureComponent {
	constructor(props) {
		super(props);

		this._save = this._save.bind(this);
		this._onChange = this._onChange.bind(this);
		this._onKeyDown = this._onKeyDown.bind(this);

		this.state = {
			text: this.props.text ? this.props.text : ''
		};
	}

	render() {
		return (
			<input className={this.props.className}
				   placeholder={this.props.placeholder}
				   value={this.state.text}
				   onChange={this._onChange}
				   onKeyDown={this._onKeyDown}/>
		);
	}

	_save() {
		this.props.onSave(this.state.text);
		this.setState({ text: '' });
	}

	_onChange(event) {
		this.setState({
			text: event.target.value
		});
	}

	_onKeyDown(event) {
		if (event.keyCode !== 13) return;

		this._save();
	}
}

class ToDoItem extends React.Component {
	constructor(props) {
		super(props);

		this._edit = this._edit.bind(this);
		this._save = this._save.bind(this);
		this._toggleItem = this._toggleItem.bind(this);
		this._removeItem = this._removeItem.bind(this);
		this._togglePopup = this._togglePopup.bind(this);

		this.state = {
			isEditing: false,
			popup: false,
		};

	}

	render() {
		const text = this.state.isEditing
			? (
				<ToDoTextInput className="todo__text todo__text_editing"
							   text={this.props.task.text}
							   onSave={this._save}/>
			)
			: (
				<span className={'todo__text' + (this.props.task.completed ? ' todo__text_completed' : '')}
					  onDoubleClick={this._edit}>{this.props.task.text}</span>
			);

		return (
			<div className="todo__item">
				<input type="checkbox" className="todo__checkbox"
					   checked={this.props.task.completed}
					   onChange={this._toggleItem}/>
				<span className="todo__destroy"
					  onClick={this._togglePopup}>-</span>
				{' '}
				{text}
				{this.state.popup ?
					<Popup
						text="Do you sure?"
						complete={this._removeItem}
						closePopup={this._togglePopup}
					/>
					: null
				}
			</div>
		);
	}

	_edit() {
		this.setState({ isEditing: true });
	}

	_save(text) {
		this.setState({ isEditing: false });
		this.props.updateItem(this.props.task.id, text);
	}

	_toggleItem() {
		this.props.toggleItem(this.props.task.id);
	}

	_removeItem() {
		this.props.removeItem(this.props.task.id);
	}

	_togglePopup() {

		this.setState({ popup: !this.state.popup })
	}
}

class ToDoList extends React.Component {
	render() {
		const items = this.props.tasks.map((task) => {
			return (
				<ToDoItem key={task.id} task={task}
						  toggleItem={this.props.toggleItem}
						  removeItem={this.props.removeItem}
						  updateItem={this.props.updateItem}
				/>
			);
		});


		return (
			<div className="todo__list">
				<div className="todo__toggle-all">
					<input type="checkbox"
						   className="todo__checkbox"
						   checked={this.props.areAllComplete}
						   onChange={this.props.toggleAll}/>
					{' '}
					Complete all
				</div>

				{items}
			</div>
		);
	}
}

class ToDoForm extends React.PureComponent {
	constructor(props) {
		super(props);

		this._save = this._save.bind(this);
	}

	render() {
		return (
			<div className="todo__form">
				<ToDoTextInput
					className="todo__text-input"
					placeholder="I need to do..."
					onSave={this._save}/>
			</div>
		);
	}

	_save(text) {
		this.props.addItem(text);
	}
}

class ToDoClear extends React.PureComponent {
	render() {
		return (
			<div className="todo__clear"
				 onClick={this.props.removeCompleted}>
				Clear
			</div>
		);
	}
}

class NavItem extends React.PureComponent {
	constructor(props) {
		super(props);

		this._navigate = this._navigate.bind(this);
	}

	render() {
		return (
			<div className={'nav__item' + (this.props.isActive ? ' nav__item_active' : '')} onClick={this._navigate}>
				{this.props.link.title}
			</div>
		);
	}

	_navigate() {
		this.props.navigate(this.props.link)
	}
}

class Nav extends React.PureComponent {
	render() {
		const items = this.props.links.map((link) => {
			return (
				<NavItem key={link.title} link={link}
						 navigate={this.props.navigate}
						 isActive={link.title === this.props.activeLink.title}/>
			)
		});

		return (
			<div className="nav">
				{items}
			</div>
		);
	}
}

class ToDo extends React.Component {
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
				todoModel.list = data;
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
			remains: todoModel.getActiveCount(),
			completed: todoModel.getCompletedCount(),

			links: navModel.getLinks(),
			activeLink: navModel.getActive()
		};

		state.areAllCompleted = state.remains === 0;

		if (state.activeLink.title === 'All') {
			state.tasks = todoModel.getItems();
		} else if (state.activeLink.title === 'Completed') {
			state.tasks = todoModel.getCompletedItems();
		} else {
			state.tasks = todoModel.getActiveItems();
		}

		state.notifications = notificationModel.getNotifications();

		return state;
	}

	_rerender() {
		this.setState(this._getState());
	}

	_toggleItem(id) {
		axios.post('/toggle-item', { id }).then(() => {
			todoModel.toggleItem(id);
			this._rerender();
		});
	}

	_toogleAll() {
		axios.post('/toggle-all', { areAllCompleted: !this.state.areAllCompleted }).then(() => {
			todoModel.switchAllTo(!this.state.areAllCompleted);
			this._rerender();
		});
	}

	_removeItem(id) {
		axios.delete(`/tasks/${id}`).then(() => {
			todoModel.removeItem(id);
			this._rerender();
		});
	}

	_addItem(text) {
		//  optimistic UI updates
		const task = todoModel.addItem(text);
		this._rerender();

		axios.post('/tasks', { task }).then(({ data }) => {
			if (data.error) {
				todoModel.removeItem(data.id);
			}

			notificationModel.push(task, data.error, () => {
				this._rerender();
			});
			this._rerender();
		});
	}

	_updateItem(id, text) {
		axios.put(`/tasks/${id}`, { text }).then(() => {
			todoModel.updateItem(id, text);
			this._rerender();
		});
	}

	_removeCompleted() {
		axios.post('/clear', {}).then(() => {
			todoModel.removeCompleted();
			this._rerender();
		});
	}

	_navigate(link) {
		navModel.setActive(link);
		this._rerender();
	}
}

ReactDOM.render(<ToDo/>, document.getElementById('app'));
