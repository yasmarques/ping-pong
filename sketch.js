
//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 2;
let velocidadeYBolinha = 2;

//variavel da raquete

let xRaquete = 5;
let yRaquete = 150;
let comprimento = 10;
let altura = 90;

//variavel para colisao

let colidiu = false;

//variavel de raquete do oponente

let xop_Raquete = 585;
let yop_Raquete = 150;
let velocidadeYOponente;

// variaveis do placar

let meus_pontos = 0;
let pontos_op = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//op_errar
let erro = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound ("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostra_bolinha();
  movimenta_bolinha();
  verifica_borda();
  mostra_raquete(xRaquete, yRaquete);
  movimenta_raquete();
  raquete_bolinha();
  verif_colisao_lib(xRaquete, yRaquete);
  mostra_opRaquete(xop_Raquete, yop_Raquete);
  movimentaRaqueteOponente();
  verif_colisao_lib(xop_Raquete, yop_Raquete);
  incluiPlacar();
  marca_ponto();
  }

  function mostra_bolinha(){
    circle(xBolinha, yBolinha, diametro);
  }
  
  function movimenta_bolinha(){
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
  }
  
  function verifica_borda(){
    
    if (xBolinha + raio > width || xBolinha - raio < 0){
      velocidadeXBolinha *= -1
      }
  
    if (yBolinha + raio > height || yBolinha - raio < 0){
      velocidadeYBolinha *= -1
      }
    }
  
  function mostra_raquete(x,y){
    rect(x, y, comprimento, altura);
  }
  
  function movimenta_raquete() {
   if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }
   if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }
    
        // limitar a movimentação da raquete para não ultrapassar as bordas:
    yRaquete = constrain(yRaquete, 10, 300);
  }

  function raquete_bolinha(){
    if (xBolinha - raio < xRaquete + comprimento && yBolinha - raio < yRaquete + altura && yBolinha + raio > yRaquete) {
        velocidadeXBolinha *= -1;
        raquetada.play();
       }  
    }
  
  function verif_colisao_lib(x, y) {
  colidiu = collideRectCircle(x, y, comprimento, altura, xBolinha, yBolinha, raio);
    if (colidiu) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
  }

  function mostra_opRaquete(){
    rect(xop_Raquete, yop_Raquete, comprimento, altura);
  }
  
  function movimentaRaqueteOponente() {
    velocidadeYOponente = yBolinha - yop_Raquete - comprimento / 2 - 30;
    yop_Raquete += velocidadeYOponente + erro
    calcularErro()
    
    yop_Raquete = constrain(yop_Raquete, 10, 300);
  }
  
  //MULTIPLAYER - COMANDO REQUETE_OP
  //function movimentaRaqueteOponente(){
  //  if (keyIsDown(87)){
  //      yRaqueteOponente -= 10;
  //  }
  //  if (keyIsDown(83)){
  //      yRaqueteOponente += 10;
  //  }

  //}

  function incluiPlacar(){
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255,140,0));
    rect(150, 10, 40, 20);
    fill (255);
    text(meus_pontos, 170 , 26);
    fill(color(255,140,0));
    rect(450, 10, 40, 20);
    fill (255);
    text(pontos_op, 470, 26);
  }
  
  function marca_ponto(){
    if (xBolinha > 593){
      meus_pontos += 1;
      ponto.play();
    }
    
    if (xBolinha < 7){
      pontos_op += 1;
      ponto.play();
    }
  }

function calcularErro() {
  if (pontos_op >= meus_pontos) {
    erro += 1
    if (erro >= 39){
    erro = 40
    }
  } else {
    erro -= 1
    if (erro <= 35){
    erro = 35
    }
  }
}


 
  
  
