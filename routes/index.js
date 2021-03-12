var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',function(req,res){
global.db.findAll((e,docs) => {
if (e) {
  return console.log(e);
}
res.render('index',{docs});
})
});

/* GET New Page. */
router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Cadastro de Cliente',doc: {},action : "/new" });
  // res.render('new', { title: 'Cadastro de Cliente', action : "/new" });
});

/* POST New Page. */
router.post('/new', function(req, res, next) {
  const nome = req.body.nome
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf
  global.db.insert({nome,idade,uf},(err,result) => { if (err) {
    return console.log(err)}
    res.redirect('/?new=true')  
  })  
});

/* GET Edit Page. */
router.get('/edit/:id', function(req, res) {
  var id = req.params.id
  global.db.findOne(id,(e,doc) => { if (e) {
    return console.log(e)    
  }
  console.log(doc.nome)
  res.render('new', { title:'Edição de Cliente',doc: doc, action : '/edit/' + doc._id });
})  
});

/* POST edit Page. */
router.post('/edit/:id', function(req, res) {  
  var id = req.params.id
  // var id = "604a280e274c1805b0e9add6"
  const nome = req.body.nome
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf
  global.db.update(id,{nome,idade,uf},(err,result) => { if (err) {
    return console.log(err)}
    res.redirect('/?edit=true')  
  })  
});


/* GET delete cliente Page. */
router.get('/delete/:id', function(req, res) {  
  var id = req.params.id  
  global.db.deleteOne(id,(err,result) => { if (err) {
    return console.log(err)}
    res.redirect('/?delete=true')  
  })  
});

module.exports = router;
