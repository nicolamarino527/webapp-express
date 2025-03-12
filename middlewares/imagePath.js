function setImagePath(req, res, next) {
    // creaimo il path assoluto della img
    req.imagePath = `${req.protocol}://${req.get('host')}/img//`;
    next()
}

module.exports = setImagePath;