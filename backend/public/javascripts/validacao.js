var validacao = function (){
    //  debugger
    var nome      = $("#nome").val();
    var cpf       = $("#cpf").val();
  
    // primerio tipo de validacao 
    if(nome==""){
       alert("Por favor digite o seu nome")
       $("nome").focus();
       return false;
    }
    
    if(cpf==""){
       alert("Por favor digite o seu cpf")
       $("cpf").focus();
       return false;
    }
  return true
}

//
 var excluirDados = function(cpf) {
      // debugger
     if(confirm("Deseja realmente excluir ? ")) {

        console.log('de modo algum!'); 
        
        
        window.location.href="/excluir?cpf="+ cpf;
        //debugger
        console.log('deveria pegar a roda /excluir ... ????!');
   
    }
 }






