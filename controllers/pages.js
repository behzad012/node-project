
exports.register = (req,res)=>{
    // res.status(404).render('404', { locals: { pageTitle: 'صفحه  پیدا نشد!', flag: true, notfound: true, styleproto: true} });
    res.render('pages/register', {
        pageTitle: 'ثبت نام'
    });
}
exports.infinite_scroll = (req,res)=>{
    res.render('pages/infinite-scroll', {
        pageTitle: 'photo api'
    });
}



