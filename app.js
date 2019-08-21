const Express=require('express');
const Mongoose=require('mongoose');
var request =require('request');
var bodyParser=require('body-parser');


var app = new Express();

app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(Express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));

Mongoose.connect("mongodb://localhost:27017/bookdb");

const bookModel = Mongoose.model("bookdetails",{
        title:String,
        picture:String,
        genre:String,
        author:String



})




nav=[{link:'/books',title:"books"},{link:'/authors',title:"authors"},{link:'/books',title:"viewbooks"},{link:'/addbook',title:"Addbook"}];
var book123 =[
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

app.get('/addbook',(rq,rs)=>{
    rs.render('addbook')
});


app.post('/read',(req,res)=>{
    var book =bookModel(req.body)
    var result=book.save((error,data)=>{
       if (error)
       {
            throw error;
            res.send(error);
        }
        else
        {
            res.send("<script>alert('books successfully added')</script><script> window.location.href='/addbook'</script>");
        }
    });

});




app.get('/bookall',(req,res)=>{

    var result = bookModel.find((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);                                            //api recieve data from database
        }
        else
        {
            res.send(data);
        }
    });
});

const APIurl="http://localhost:3005/bookall"

app.get('/books',(req,res)=>{

    request(APIurl,(error,response,body)=>{
        var book147 = JSON.parse(body);
        console.log(book147);
        res.render('books',{book:book147,title:"Books",h1:"Books"});
    });
});


app.listen(3005,()=>{
    console.log("server running on 3005")
}
);