module.exports=function(app)
{
    app.get('/',function(req,res){
        res.render('index.html')
    });

    app.get('/new/product-categories/newabc/xyz',function(req,res){
        res.render('productcategorylist.html',{})
    });

    app.get('/:countrycode/product-category/:pcuniquename/',function(req,res){
        var pcuniquename = req.param('pcuniquename');
        res.render('productcategorybrands.html',pcuname=pcuniquename);
    });

    app.get('/:countrycode/group/:group_url/',function(req,res){
        var groupuniquename = req.param('group_url');
        res.render('groupdetails.html',gid=groupuniquename);
    });
}