module.exports = (res, status, data) =>{
    let success = status === 200;
    res.status(status).json({success, data});
};