var rlottieHandler;

function setup() {
  var head = document.head;
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "rlottie-wasm.js";
  head.appendChild(script);

  script.onload = _ => {
    Module.onRuntimeInitialized = _ => {
      rlottieHandler = new RLottieHandler(1);
      window.requestAnimationFrame(updater);
    }
  }
}

setup();

function updater() {
  rlottieHandler.rafId = window.requestAnimationFrame(updater);
  rlottieHandler.render();
}

function play() {
  document.getElementById("playButton").innerHTML = "<em class='fas fa-pause'></em>";
  rlottieHandler.play();
}

function pause() {
  document.getElementById("playButton").innerHTML = "<em class='fas fa-play'></em>";
  rlottieHandler.pause();
}