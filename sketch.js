let img;
let v1 = [];
let v2 = [];
function preload() {
  img = loadImage('square.jpg');
}

function setup() {
  // put setup code here
  canvas = createCanvas(400, 400);

  image(img, 0, 0);
  let c = get();
  console.log(c);
}

function print_data1()
{
  for (var i = 0;i < 400;i ++) {
    for (var j = 0;j < 400;j ++) {
      let c = get(i, j);
      let x = 0;
      if (c[0] < 255) {
        x = 1;
      }
      v1[400 * i + j] = x;
    }
  }
  console.log(v1);
}

function print_data2()
{
  for (var i = 0;i < 400;i ++) {
    for (var j = 0;j < 400;j ++) {
      let c = get(i, j);
      let x = 0;
      if (c[0] < 255) {
        x = 1;
      }
      v2[400 * i + j] = x;
    }
  }
  console.log(v2);
}

function clearCanvas() {
  background(255)
}

function save_img()
{
  saveCanvas(canvas, 'myCanvas', 'jpg');
}

function draw() {
  // put drawing code here
  strokeWeight(16);
  stroke(0);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function cosine_similar(vectorA = [], vectorB = []) {
  const dimensionality = Math.min(vectorA.length, vectorB.length);
  let dotAB = 0;
  let dotA = 0;
  let dotB = 0;
  let dimension = 0;
  while (dimension < dimensionality) {
    const componentA = vectorA[dimension];
    const componentB = vectorB[dimension];
    dotAB += componentA * componentB;
    dotA += componentA * componentA;
    dotB += componentB * componentB;
    dimension += 1;
  }

  const magnitude = Math.sqrt(dotA * dotB);
  return magnitude === 0 ? 0 : dotAB / magnitude;
}

function compute() {
  let si = cosine_similar(v1, v2);
  console.log(si);
}