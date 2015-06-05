module.exports=function(app)
{
    app.get('/',function(req,res){
        res.render('index.html')
    });

    app.get('/au/product-categories/',function(req,res){
        res.render('productcategorylist.html')
    });

    app.get('/:countrycode/group/:group_url/',function(req,res){
        var groupuniquename = req.param('group_url');
        res.render('groupdetails.html',gid=groupuniquename);
    });
}