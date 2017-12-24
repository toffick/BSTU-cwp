'use strict';

module.exports = {
    up: (queryInterface, Sequelize) =>{
        return queryInterface.addColumn('actors', 'gender',
            {type: Sequelize.STRING})
    },

    down: (queryInterface, Sequelize) =>{
        return queryInterface.removeColumn('actors', 'gender');

    }
};
