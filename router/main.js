module.exports=function(app)
{
    app.get('/',function(req,res){
        res.render('index.html')
    });

    app.get('/:countrycode/categories',function(req,res){
        res.render('categories.html')
    });

    app.get('/:countrycode/product-categories/',function(req,res){
        res.render('productcategorylist.html')
    });

    app.get('/:countrycode/celebrities/',function(req,res){
        res.render('celebritylist.html')
    });

    app.get('/:countrycode/professions/',function(req,res){
        res.render('professionlist.html')
    });

    app.get('/:countrycode/product-category/:pcuniquename/',function(req,res){
        var pcuniquename = req.param('pcuniquename');
        res.render('productcategorybrands.html',pcuname=pcuniquename);
    });

    app.get('/:countrycode/group/:group_url/',function(req,res){
        var groupuniquename = req.param('group_url');
        res.render('groupdetails.html',gid=groupuniquename);
    });

    app.get('/:countrycode/brand/:branduniquename/',function(req,res){
        var groupbranduniquename = req.param('branduniquename');
        res.render('branddetails.html',bruname=groupbranduniquename );
    });

    app.get('/header',function(req,res){
        res.render('partials/headerpartial.html');
    });

    app.get('/footer',function(req,res){
        res.render('partials/footerpartial.html');
    });
}