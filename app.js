const Express=require('express');
var app = new Express();
app.set('view engine','ejs');
app.use(Express.static(__dirname+"/public"));

nav=[{link:'/books',title:"books"},{link:'/authors',title:"authors"}];

app.get('/',(req,res)=>{
    res.render("index",nav);
});
app.listen(3005);