
let canvas = document.querySelector("canvas")
let ctx = canvas.getContext('2d')

//variaveis bolinha
let xBolinha = 400
let yBolinha = 200
let diametroBolinha = 12
let raioBolinha = diametroBolinha / 2
let velocidadeXBolinha = 6
let velocidadeYBolinha = 6

//variavel da raquete
let xRaquete = 10
let yRaquete = 160
let raqueteComprimento = 10
let raqueteAltura = 70

//Variavel oponente
let xOponente = 780
let yOponente = 160
let velocidadeYOponente;
let velocidadeXOponente;

//placar jogo
let placarJogador = 0
let placarOponente = 0


function drawCanvas () {
    clearCanvas()
    incluiPlacar()
    drawBolinha()
    moveBolinha()
    colisaoBolinha()
    drawRaquete(xRaquete,yRaquete)
    drawRaquete(xOponente, yOponente)
    moveRaquete()
    moveOponente()
    marcaPonto()
}


function clearCanvas () {
    ctx.fillStyle = "black"
    ctx.fillRect(10,10,800,400)
    ctx.fillStyle = "white"
}


function drawBolinha(){
    
    ctx.beginPath()
    ctx.arc(xBolinha,yBolinha,diametroBolinha,0, 2*Math.PI)
    ctx.fill()
}

function moveBolinha(){
    xBolinha += velocidadeXBolinha
    yBolinha += velocidadeYBolinha
}

function colisaoBolinha(){
    if(xBolinha > canvas.width - raioBolinha || xBolinha < raioBolinha){
        velocidadeXBolinha *= -1
    }
    if(yBolinha > canvas.height - raioBolinha || yBolinha < raioBolinha){
        velocidadeYBolinha *= -1
    }
    if(xBolinha - raioBolinha < xRaquete + raqueteComprimento  && yBolinha - raioBolinha < yRaquete + raqueteAltura && yBolinha - raioBolinha > yRaquete  ){
        velocidadeXBolinha*=-1
    }
    if(xBolinha + raioBolinha > xOponente && yBolinha - raioBolinha < yOponente + raqueteAltura && yBolinha - raioBolinha > yOponente){
        velocidadeXBolinha*=-1
    }
}

function drawRaquete(x,y) {
    ctx.fillStyle = "white"
    ctx.fillRect(x,y,raqueteComprimento,raqueteAltura)
}

function moveRaquete(){
    onkeydown = (e) => {
        // console.log(e.code)
        let key = e.code
        if(key == "ArrowUp"){
            yRaquete -= 10
        }
        if(key == "ArrowDown"){
            yRaquete += 10
        }
    } 
}


function moveOponente(){
    velocidadeYOponente = yBolinha - yOponente - raqueteComprimento /2 - 60
    yOponente += velocidadeYOponente
}

function incluiPlacar(){
    ctx.font = "30px Arial"
    ctx.textAlign = "center"
    ctx.fillStyle = "orange"
    ctx.fillRect(170,20,60,40)
    ctx.fillRect(570,20,60,40)
    ctx.fillStyle = "white"
    ctx.fillText(placarJogador, 200, 50)
    ctx.fillText(placarOponente, 600,50)

}

function marcaPonto(){
    if(xBolinha < raioBolinha){
        placarOponente+=1
    }
    if(xBolinha > canvas.width - raioBolinha){
        placarJogador+=1
    }
}

let interval = setInterval(drawCanvas,25)


