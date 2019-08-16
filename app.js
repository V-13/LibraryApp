const Express=require('express');
var app = new Express();
app.set('view engine','ejs');
app.use(Express.static(__dirname+"/public"));

nav=[{link:'/books',title:"books"},{link:'/authors',title:"authors"}];
var book =[
    {
      title:"war and peace",
      genre:"history",
      author:"author"
},

{
    title:"harry potter",
    genre:"fiction",
    author:"author"
},

{
    title:"wings of fire",
    genre:"autobiograohy",
    author:"author"
},

];


app.get('/',(req,res)=>{
    res.render("index",{nav,title:'library'});
});
app.get('/books',(req,res)=>{
    res.render("books",{title:"Books",book,h1:"Books"});
});
app.listen(3005,()=>{
    console.log("server running")
}
);