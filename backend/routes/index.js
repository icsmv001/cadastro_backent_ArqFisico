var express = require('express');
var router = express.Router();
var pessoas=[];
var BANCO_ARQUIVO = "D:\\cursos\\PRJ_PROGRAMADOR\\backend\\dados\\bancoArquivo.js"


/* GET home page. */
router.get('/', function(request, response, next) {
	dados= { title: 'frameWorks Express' };
   // lendo arquivo texto de banco de dados.JS
   carregarBase(function read(err, data) {
  	if (err) {
  	  console.log(err);	
  	  dados['pessoas'] = [];
  	}
  	else {
  	  dados['pessoas'] = JSON.parse(data);
  	}
    response.render('index', dados);
   });
});



/* criando a rota alterar */
/* GET home page. */
router.get('/alterar', function(request, response, next) {
   // lendo arquivo texto de banco de dados.JS
   carregarBase(function read(err, data) {
    if (err) {
      console.log(err); 
      dados['pessoas'] = [];
    }
    else {
       var usuario = null;
       var bancoDados = JSON.parse(data);
       for( i = 0;  i <bancoDados.length; i++) {
          if(bancoDados[i].cpf == request.query.cpf) {
            usuario = bancoDados[i];
            break;
          }
        }
        //  debugger
        // console.log('dentro da router alterar.. entrando na renderizacao #### '); 
       
        response.render('alterar',{'usuario':usuario})   
    }
   });
});

/* criando a rota alterar-pessoa */
/* GET home page. */

router.post('/alterar-pessoa', function(request, response, next) {
    carregarBase(function read(err, data) {
    if (err) {
      console.log(err); 
      dados['pessoas'] = [];
      /* redireciona para pagina home*/
      response.redirect("/");
    }
    else {
      var bancoDados = JSON.parse(data);
      for( i = 0;  i <bancoDados.length; i++) {
         // var reg = new RegExp(request.query.nome,"i");
          if(bancoDados[i].cpf == request.query.cpfAlterar) {
            // rota alteracao-pessoa, usou metodo POST, assim para recuperar dados usar objeto body, no luga de query
            bancoDados[i].nome     = request.body.nome;
            bancoDados[i].sobrenome= request.body.sobrenome;

             bancoDados[i].cpf      = request.body.cpf;
            // bancoDados[i].cpf      = request.query.cpfAlterar;
            bancoDados[i].telefone = request.body.telefone;
            bancoDados[i].endereco = request.body.endereco;

            salvarTodosBase(bancoDados);
            break;
          }
        }
        response.redirect("/");
      }
  });
});

/* criando a rota excluir */
/* GET home page. */

router.get('/excluir', function(request, response, next) {
  // debugger
  dados= { title: 'frameWorks Express' };
   // lendo arquivo texto de banco de dados.JS
   carregarBase(function read(err, data) {
    if (err) {
      console.log(err); 
      dados['pessoas'] = [];
    }
    else {
      var bancoDados = JSON.parse(data);
      var novosDados = [];
       for( i = 0;  i <bancoDados.length; i++) {
         // var reg = new RegExp(request.query.nome,"i");
          if(bancoDados[i].cpf != request.query.cpf) {
             novosDados.push(bancoDados[i]);
          }
        }
                salvarTodosBase(novosDados);
                dados['pessoas'] = novosDados;
    }
    response.render('index', dados);
   });
});





/* criando a rota pesquisar*/
/* GET home page. */
router.get('/pesquisar', function(request, response, next) {
  dados= { title: 'pesquisando em arquivos' };
   // lendo arquivo texto de banco de dados.JS
   carregarBase(function read(err, data) {
    if (err) {
      console.log(err); 
      dados['pessoas'] = [];
    }

    else {
            var dadosPesquisados = [];
            if (request.query.nome == "") {
               dadosPesquisados = JSON.parse(data);         
            }
            else {

               var bancoDados = JSON.parse(data);
               /*
               // sem utilizar o regular expression
                for( i = 0;  i <bancoDados.length; i++) {
                 var nomeMinusculo = request.query.nome.toUpperCase();
                 var nomeBancoMinusculo = bancoDados[i].nome.toUpperCase();
                  if(nomeBancoMinusculo.indexOf(nomeMinusculo) != -1) {
                     dadosPesquisados.push(bancoDados[i]);
                  }
                }
                */
             
               // utilizando o regular expression, sem sencitive case
               for( i = 0;  i <bancoDados.length; i++) {
                 var reg = new RegExp(request.query.nome,"i");
                  if(bancoDados[i].nome.match(reg) != null) {
                     dadosPesquisados.push(bancoDados[i]);
                  }
                }
               




            }
      dados['pessoas'] = dadosPesquisados;
    }
    
  response.render('index', dados);
   });
});







/* POST home page. */
router.post('/cadastrar-pessoas', function(request, response, next) {
  // carregar dados
  carregarBase(function read(err, data) {
  	if (err) {
  	  console.log(err);	
  	  return;
   	}
  
    pessoas = JSON.parse(data);

    hash = {
    nome: request.body.nome,
    sobrenome: request.body.sobrenome,
    cpf: request.body.cpf,
    telefone: request.body.telefone,
    endereco: request.body.endereco
  }

  
  salvarBase(hash)
  response.render('index', { title: 'Cadastro de Pessoas - Retorno do hash', pessoas:pessoas });
  });
});







// inicio de funções auxiliares para arquivos
var carregarBase = function(callback){
    var fs = require('fs');
    fs.readFile(BANCO_ARQUIVO, callback);
}

var salvarTodosBase = function(array){
   var fs = require('fs');
   fs.writeFile(BANCO_ARQUIVO, JSON.stringify(array), function(erro) {
   if(erro) {
   	 console.log(erro);
   }
}); 
}


var salvarBase = function(hash){
   pessoas.push(hash);
   salvarTodosBase(pessoas);
}








module.exports = router;
