const Express=require('express');
const Mongoose=require('mongoose');
var request =require('request');
var bodyParser=require('body-parser');


var app = new Express();

app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(Express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));
Mongoose.connect("mongodb+srv://V-13:vivek@cluster0-bgs7t.mongodb.net/casestudy?retryWrites=true&w=majority")
// Mongoose.connect("mongodb://localhost:27017/bookdb");


// For CORS,Pgm Line no 12 to 29
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200' );

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});































// { useNewUrlParser: true });
//  module.exports = function(req, res, next) {
//       if (!mongoose.Types.ObjectId.isValid(req.params.id))
//       return res.status(404).send('Invalid ID.');
    
    
//      next();
//     }

const bookModel = Mongoose.model("bookdetails",{
        title:String,
        picture:String,
        genre:String,
        author:String



})


const authorModel = Mongoose.model("authordetails",{
    title:String,
    picture:String,
    genre:String,
    author:String
})




const UserModel= Mongoose.model("users",{
    ename:String,
    eaddress:String,
    egender:String,
    edob:String,
    eemail:String,
    euname:String,
    epass:String,
    ecpass:String
});



const MovieModel= Mongoose.model("moviedetails",{
    movie:String,
    actor:String,
    actress:String,
    director:String
})


nav=[{link:'/',title:"Home"},{link:'/books',title:"books"},{link:'/authors',title:"authors"},{link:'/books',title:"viewbooks"},{link:'/addbook',title:"Addbook"},
{link:'/addauthors',title:"Addauthor"},{link:'/updatebooks',title:"updatebooks"},
{link:'/deletebook',title:"DeleteBooks"},{link:'/register',title:"Registration"}];
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



app.get('/index',(req,res)=>{
    res.render("index",{nav,title:'library'});
});


app.get('/addauthors',(req,res)=>{
    res.render('addauthor')
});


app.post('/read1',(req,res)=>{
    var writer =authorModel(req.body)
    var result=writer.save((error,data)=>{
        if (error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send("<script>alert('Author added successfully')</script><script>window.location.href='/addauthors'</script>");
        }
    });
});

app.get('/authorall',(req,res)=>{
    var result=authorModel.find((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});



 const APIurl3="http://casestudylibrary.herokuapp.com/authorall";




app.get('/authors',(req,res)=>{
        request(APIurl3,(error,response,body)=>{
            var writers =JSON.parse(body);
            console.log(writers);
            res.render('authors',{authors:writers});

    

    // res.render("authors",{authors,title:"authors",h1:"Authors"})
});
});

app.get('/authorone',(req,res)=>{
    var item= req.query.q;
    var result=authorModel.findOne({_id:item},(error,data)=>{
        if(error)
        {
            throw error;
            res.send('error');
        }
        else
        {
           res.send(data);

        }
    });
});


const APIurl4="http://casestudylibrary.herokuapp.com/authorone";


app.get('/authorsingle/:id',(req,res)=>{
    const x=req.params.id;
    request(APIurl4+"/?q="+x,(error,reponse,body)=>{
        var writer=JSON.parse(body);
        console.log(writer);
        res.render('authorsingle',{authors:writer});
    });


    // const x=req.params.id;
    // res.render('authorsingle',{authors:authors[x],title:"authordetails"});
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

const APIurl="http://casestudylibrary.herokuapp.com/bookall";

app.get('/books',(req,res)=>{

    request(APIurl,(error,response,body)=>{
        var book147 = JSON.parse(body);
        console.log(book147);
        res.render('books',{book:book147,title:"Books",h1:"Books"});
    });
});

app.get('/bookone',(req,res)=>{
    var item=req.query.q;

    var result = bookModel.findOne({_id:item},(error,data)=>{
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

const APIurl2 = "http://casestudylibrary.herokuapp.com/bookone";

app.get('/booksingle/:id',(req,res)=>{
    const x=req.params.id;
    request(APIurl2+"/?q="+x,(error,response,body)=>{
        var book=JSON.parse(body);
        console.log(book);
        res.render('booksingle',{books:book});
    
// const x= req.params.id;
 //res.render('booksingle',{books:book[x],title:"bookdetails"});
  
  });

});

app.get('/updatebooks',(req,res)=>{
    res.render('updatebooks')
})





app.get('/updateAPI',(req,res)=>{
    var item1 = req.query.title;
    var result = bookModel.updateOne({title:item1},{$set:{author:req.query.author}},(error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    })
})

const APIurl8 = "http://casestudylibrary.herokuapp.com/updateAPI";

app.post('/bookupdate',(req,res)=>{
    var item1 = req.body.title;
    var item2 = req.body.author;
    request(APIurl8+"/?title="+item1+"&&author="+item2,(error,response,body)=>{

        res.send("<script>alert('Book author Updated')</script><script>window.location.href='/updatebooks'</script>");

    })
});





app.get('/deletebook',(req,res)=>{
    res.render('deletebook');
});

//An API to delete book

app.get('/deleteAPI',(req,res)=>{
    var item= req.query.title;

    var result = bookModel.deleteOne({title:item},(error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    })
})

const APIurl6 = "http://casestudylibrary.herokuapp.com/deleteAPI"

app.post('/bookdelete',(req,res)=>{
    var item = req.body.title;

    request(APIurl6+"/?title="+item,(error,response,body)=>{

        res.send("<script>alert('Book Deleted')</script><script>window.location.href='/deletebooks'</script>");

    })
});




app.get('/register',(req,res)=>{
    res.render('register');
});

app.post('/employeeregister',(req,res)=>{
    //var items=req.body;
    //res.render('read',{item:items});

    var user = new UserModel(req.body);
    var result = user.save((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send("<script>alert('User Successfully Inserted')</script><script>window.location.href='/register'</script>");
        }
    });

});



app.get('/',(req,res)=>{
    res.render('login');
});

app.get('/loginAPI',(req,res)=>{
    var item1 = req.query.euname;
    var item2 = req.query.epass;
    var result = UserModel.find({$and:[{euname:item1},{epass:item2}]},(error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
        
    })
})

const APIurl5 = "http://casestudylibrary.herokuapp.com/loginAPI"

app.post('/employeelogin',(req,res)=>{
    var item1 = req.body.euname;
    var item2 = req.body.epass;

    request(APIurl5+"/?euname="+item1+"&&epass="+item2,(error,response,body)=>{
        var data = JSON.parse(body);


        console.log(data);
        if(data.length>0){

            if(item1==data[0].euname && item2==data[0].epass)
            {
                //res.send(data.euname);
                res.send("<script>alert('Login Successfull')</script><script>window.location.href='/index'</script>");
            }


        }
        else{
            res.send("<script>alert('Login unSuccessfull')</script><script>window.location.href='/'</script>");
            
        }


    });
});




app.post('/movieadd',(req,res)=>{
    var movie =MovieModel(req.body)
    var result=movie.save((error,data)=>{
        if (error)
        {                                                                   //movie angular question api for add
            throw error;
            res.send(error);
        }
        else
        {
            res.send("<script>alert('Movie added successfully')</script>");
        }
    });
});


app.get('/movieall',(req,res)=>{
    var result=MovieModel.find((error,data)=>{
        if(error)
        {
            throw error;                                //movie angular question viewing
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});


app.post('/moviesearch',(req,res)=>{
    var item=req.body.movie;
    var result=MovieModel.find({movie:item},(error,data)=>{
        if(error)                                                 //movie angular question
        {
            throw error;
            res.send(error)
        }
        else
        {
            res.send(data)
        }
    });
});
 




    







app.listen(process.env.PORT||3005,()=>{
    console.log("server running on 3005")
}
);