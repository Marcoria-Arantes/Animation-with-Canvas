//obtendo o elemento canvas e seu contexto 2D
const canvas = document
 .getElementById('myCanvas');
const ctx = canvas.getContext('2d');

//definir largura e altura
canvas.width = 500;
canvas.height = 500;

//array com as cores do círculo
const cores = ['red', 'orange',
 'yellow', 'green', 'lightblue',
 'blue', 'purple'
]

//indice inicial
let indiceCor = 0

// Função para desenhar círculo com gradiente
function desenharCirculo(x, y, raio,
 cor) {
 // Criando gradiente radial
 const gradiente = ctx
  .createRadialGradient(x, y, raio /
   2, x, y, raio);
 gradiente.addColorStop(0, cor);
 gradiente.addColorStop(1, 'white');
 // Desenhando o círculo
 ctx.beginPath();
 ctx.arc(x, y, raio, 0, Math.PI * 2);
 ctx.fillStyle = gradiente;
 ctx.shadowColor =
  'rgba(0, 0, 0, 0.5)';
 ctx.shadowBlur = 15;
 ctx.fill();
 ctx.closePath();
}

//posição inicial
let x = 50;
let y = 100;
let raio = 50;
let dx = 2; //velocidade de movimento

//animação
function animar() {
 //limpa o canvas frame a frame
 ctx.clearRect(0, 0, canvas.width,
  canvas.height);

 //atualiza a posição do círculo
 desenharCirculo(x, y, raio, cores[
  indiceCor]);

 //atualiza a posição horizontal
 x += dx;

 //verifica se o círculo chegou ao limite do canvas
 if (x + raio > canvas.width || x -
  raio < 0) {
  dx = -dx; //inverte a direção
 }

 //chama a animação novamente
 requestAnimationFrame(animar);
}

//iniciar animação
animar();

//interatividade
canvas.addEventListener('click',
 function(event) {

  const mouseX = event.clientX -
   canvas.offsetLeft;

  const mouseY = event.clientY -
   canvas.offsetTop;

  //verifica se o cliente está dentro do círculo

  const dist = Math.sqrt((mouseX -
   x) ** 2 + (mouseY - 100) ** 2);

  if (dist < raio) {

   //muda a cor do círculo ao clicar no círculo
   for (let i = 0; i < cores
    .length; i++) {

    indiceCor = (indiceCor + 1) %
     cores.length;

    break;
   }
  }
 });