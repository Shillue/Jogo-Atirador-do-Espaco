var foguete = document.getElementById("foguete");
var tabuleiro = document.getElementById("tabuleiro")

//nave ou foguete 
window.addEventListener("keydown", (e)=>{
    var left = parseInt(window.getComputedStyle(foguete).getPropertyValue("left"));
    if(e.key == "ArrowLeft" && left > 0){//movimento para esquerda
        foguete.style.left = left - 10 + "px";         
    } else if(e.key == "ArrowRight" && left < 460){//movimento para direita. 
        foguete.style.left = left + 10 + "px";          
    }

 //balas
 if(e.key == "ArrowUp" || e.keyCode == 32){//32 tecla de espaço
    var bala = document.createElement("div");
    bala.classList.add("balas");
    tabuleiro.appendChild(bala);
    
    //mover bala
    var moverBala = setInterval(() => {

        //condições para destrui os aliens
        var aliens = document.getElementsByClassName("aliens");

        for(var i = 0; i < aliens.length; i++){
            var alien = aliens[i];

            var alienLimite= alien.getBoundingClientRect();//position limite dos aliens
            var balaLimite = bala.getBoundingClientRect();//position limite das balas
        
        //condição para verifica se o alien e a bala estão no mesma posição. Em caso afirmativo, destruir esse alien
        if(balaLimite.left >= alienLimite.left && balaLimite.right <= alienLimite.right &&balaLimite.top <= alienLimite.top && balaLimite.bottom <= alienLimite.bottom){
            alien.parentElement.removeChild(alien);
            
            //pontos
            document.getElementById("pontos").innerHTML = parseInt(document.getElementById("pontos").innerHTML) + 1;

            //apagar a bala depois que acerta o alien
            bala.parentElement.removeChild(bala)
        }
    }
        //mover balas
        var balaBottom = parseInt(window.getComputedStyle(bala).getPropertyValue("bottom")); 

        //bala sair do top da nave
        bala.style.left = left + 30 + "px";
        bala.style.bottom = balaBottom + 3 + "px";
    });
 }

});

//aliens
var gerarAliens = setInterval(() => {

    var alien = document.createElement("div");
    alien.classList.add("aliens");
    //pegando a esquerda do alien e colocando em uma posição aleatória
    var alienLeft = parseInt(window.getComputedStyle(alien).getPropertyValue("left"));
    alien.style.left = Math.floor(Math.random() * 450) + "px";

    tabuleiro.appendChild(alien);
}, 1000);

//Movimento dos aliens
var moverAliens = setInterval(() => {
    var aliens = document.getElementsByClassName("aliens");

    if( aliens != undefined){
        for(var i = 0; i < aliens.length; i++){//mover para baixo
            var alien = aliens[i];//cada alien
            var alienTop = parseInt(window.getComputedStyle(alien).getPropertyValue("top"));

            //game over
            if(alienTop >= 475){
                alert("Game Over");
                clearInterval(moverAliens);
                window.location.reload();
            }

            alien.style.top = alienTop + 20 + "px";
        }     
    }

}, 450);