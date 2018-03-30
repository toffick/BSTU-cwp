module.exports.setTestData = async (db) => {
	await db.User.create({email: "email1@com.com", password: '111', codes: ['123', '234', '345', '456', '567']},);
	await db.User.create({email: "email2@com.com", password: '222', codes: ['123', '234', '345', '456', '567']},);
	const ko = await db.User.create({email: "email3@com.com", password: '333', codes: ['123', '234', '345', '456', '567']},);
};
