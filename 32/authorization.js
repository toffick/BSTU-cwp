const {AbilityBuilder, Ability} = require('casl');

module.exports.ability = () =>
		((req, res, next) => {
			const {rules, can, cannot} = AbilityBuilder.extract();

			const {name, role} = req.query || 'anon';
			//херота
			const {repoId} = req.params;

			if (role === 'anon') {
				can('read', 'commit');
				can('read', 'repo');
			}

			if (role === 'member') {
				can('read', ['repo', 'commit']);
				can('create', 'repo');
				can('update', 'repo', {author: name});
				can('create', 'commit', {repoId});
				// can('create', 'commit', {author: name}); // TODO commit should associate with parent repo for creating and updating
			}

			if (role === 'moderator') {
				can('manage', ['repo', 'commit']);
				cannot('create', ['repo', 'commit']);
			}

			req.ability = new Ability(rules);

			next();
		});

module.exports.checkAuth = (ability, action, obj) => {
	if (obj && ability && ability.cannot(action, obj)) {
		return {
			access: false,
			error:
					{
						message: `Unauthorized access for. Action ${action} on item ${obj._modelOptions.name.singular}`,
						status: 403
					}
		};
	}
	return {access: true};
};

