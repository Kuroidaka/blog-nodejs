// dùng res.locals để tạo ra local riêng lẽ cho từng hành vi để không bị gọi trung hoặc là phải gọi lại hàm nhiều lần trong view
module.exports = function sortMiddleWare(req, res, next) {
    res.locals._sort = {
        enabled: false,
        type: 'default'
    };

    if(req.query.hasOwnProperty('_sort')){
        res.locals._sort.enabled = true,
        res.locals._sort.type = req.query.type,
        res.locals._sort.column = req.query.column
    }


    next()
}