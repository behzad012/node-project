exports.notfound = (req,res)=>{
    // res.status(404).render('404', { locals: { pageTitle: 'صفحه  پیدا نشد!', flag: true, notfound: true, styleproto: true} });
    res.status(404).render('pages/404', {
        pageTitle: 'صفحه  پیدا نشد!',
    });
}

