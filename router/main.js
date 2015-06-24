module.exports=function(app)
{
    app.get('/',function(req,res){
        res.render('index.html')
    });

    app.get('/:countrycode/categories',function(req,res){
        res.render('categories.html')
    });

    app.get('/:countrycode/category/:categoryuniquename/',function(req,res){
        var cuniquename = req.param('categoryuniquename');
        res.render('categorydetails.html',catuname=cuniquename);
    });

    app.get('/:countrycode/groups',function(req,res){
        res.render('salesforcegroups.html')
    });

    app.get('/:countrycode/sf-group/:groupuniquename/',function(req,res){
        var groupuniquename = req.param('groupuniquename');
        res.render('salesforcegroupdetails.html',sfgdname=groupuniquename);
    });

    app.get('/:countrycode/group/:group_url/',function(req,res){
        var groupuniquename = req.param('group_url');
        res.render('groupdetails.html',gid=groupuniquename);
    });

    app.get('/:countrycode/questions',function(req,res){
        res.render('questions.html')
    });

    app.get('/:countrycode/question/:question_id/',function(req,res){
        var questionid = req.param('question_id');
        res.render('questiondetails.html',questid=questionid);
    });

    app.get('/:countrycode/product-categories/',function(req,res){
        res.render('productcategorylist.html')
    });

    app.get('/:countrycode/market-categories/',function(req,res){
        res.render('marketproductcategories.html')
    });

    app.get('/:countrycode/websites/',function(req,res){
        res.render('websites.html')
    });

    app.get('/:countrycode/videos/',function(req,res){
        res.render('videos.html')
    });

    app.get('/:countrycode/places/',function(req,res){
        res.render('places.html')
    });

    app.get('/:countrycode/celebrities/',function(req,res){
        res.render('celebritylist.html')
    });

    app.get('/:countrycode/professions/',function(req,res){
        res.render('professionlist.html')
    });

    app.get('/:countrycode/bar-charts/',function(req,res){
        res.render('groupcharts.html')
    });

    app.get('/:countrycode/product-category/:pcuniquename/',function(req,res){
        var pcuniquename = req.param('pcuniquename');
        res.render('productcategorybrands.html',pcuname=pcuniquename);
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