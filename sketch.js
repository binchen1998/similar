let img;
let v1 = [];
let v2 = [];
let model;
let model_ready = false;
let model_res;
let img4;
function preload() {
  img = loadImage('square.jpg');
}

function setup() {
  // put setup code here
  canvas = createCanvas(400, 400);

  //image(img, 0, 0);
  //let c = get();
  //console.log(c);

  const MODEL_URL = 'model.json';

  model = tf.loadGraphModel(MODEL_URL);
  //const inCtx = canvas.getContext('2d');
  // var element = document.getElementById("img1");
  // let img1 = tf.browser.fromPixels(element, 3);
  // img4 = tf.image.resizeBilinear(img1, [224, 224]).toFloat().div(tf.scalar(255));
  // print(img4)
  // let canvas2 = document.getElementById("canvas2");
  // tf.browser.toPixels(img4,canvas2)
  //img4 = img4.expand_dims(1);
  //img4 = tf.reshape(img4, [1,224,224,3]);

  model.then(function (res) {   
    model_ready = true;
    model_res = res;  
  }, function (err) {
      console.log(err);
  });
}

function cmp()
{
  var element = document.getElementById("img1");
  let img_pixels = tf.browser.fromPixels(element, 3);
  let img1 = tf.image.resizeBilinear(img_pixels, [224, 224]).toFloat().div(tf.scalar(255));
  img1 = tf.reshape(img1, [1,224,224,3]);

  element = document.getElementById("img2");
  img_pixels = tf.browser.fromPixels(element, 3);
  let img2 = tf.image.resizeBilinear(img_pixels, [224, 224]).toFloat().div(tf.scalar(255));
  img2 = tf.reshape(img2, [1,224,224,3]);

  if (model_ready) {
    const features1 =  Array.from(model_res.execute(img1).squeeze().dataSync());
    console.log(features1);

    const features2 = Array.from(model_res.execute(img2).squeeze().dataSync());
    console.log(features2);

    let si = cosine_similar(features1, features2);
    console.log("result: ", si);
  }

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
  console.log("vectorA: ", vectorA);
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