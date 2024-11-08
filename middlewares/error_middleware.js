const error_handler = (err, req, res, next) => {
    // so express will treat this as default error handler at the end of middleware execution and trigger if next(err) or throw new Error triggered. so doesnt need call next
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
