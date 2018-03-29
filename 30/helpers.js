module.exports.setTestData = async(db)=>{
	await db.User.bulkCreate([
		{email: "email1@com.com", colories: 1000},
		{email: "email1@com.com", colories: 1400},
		{email: "email1@com.com", colories: 2200},
	]);
}
