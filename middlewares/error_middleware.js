const error_handler = (err, req, res, next) => {
    console.log('error handler1', res.headersSent)
    if (res.headersSent) {
        console.log('error handler2')
      return next(err)
    }

    console.log('error handler3')
    res.status(500)
    res.json({
        data : {
            message : err?.message,
            error : err?.errors || err
        }
    })
}

module.exports = error_handler
