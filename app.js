const Express=require('express');
var app = new Express();
app.set('view engine','ejs');
app.use(Express.static(__dirname+"/public"));

nav=[{link:'/books',title:"books"},{link:'/authors',title:"authors"}];
var book =[
    {
      title:"war and peace",
      picture:"/images/war.jpg",
      genre:"history",
      author:"author"
},

{
    title:"harry potter",
    picture:"/images/harry.jpg",
    genre:"fiction",
    author:"author"
},

{
    title:"wings of fire",
    picture:"/images/wings.jpg",
    genre:"autobiography",
    author:"author"
},

];


authors =[
    {
      title:"Leo Tolstoy",
      picture:"/images/tol.jpg",
      genre:"Russian",
      author:"1847"
},

{
    title:"JK rowling",
    picture:"/images/jk.jpg",
    genre:"Britian",
    author:"1965"
},

{
    title:"APJ abdul kalam",
    picture:"/images/wings.jpg",
    genre:"India",
    author:"1931"
},

];

















app.get('/',(req,res)=>{
    res.render("index",{nav,title:'library'});
});
app.get('/books',(req,res)=>{
    res.render("books",{title:"Books",book,h1:"Books"});
});

app.get('/authors',(req,res)=>{
    res.render("authors",{authors,title:"authors",h1:"Authors"})
});


app.get('/booksingle/:id',(req,res)=>{

    const x= req.params.id;
    res.render('booksingle',{books:book[x],title:"bookdetails"});
});

app.get('/authorsingle/:id',(req,res)=>{
    const x=req.params.id;
    res.render('authorsingle',{authors:authors[x],title:"authordetails"});
});


app.listen(3005,()=>{
    console.log("server running")
}
);