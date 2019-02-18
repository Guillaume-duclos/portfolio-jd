import React from 'react';
import * as PIXI from 'pixi.js';

// load assets
PIXI.loader
  .add("../../assets/img/text.png")
  .add("../../assets/img/map.png")
  .load(this.setup);

const stage = new PIXI.Container();
const renderer = PIXI.autoDetectRenderer(512, 512, {transparent: true});
document.body.appendChild(renderer.view);

const Canvas = (props) => {

  let ripples = [];

  const setup = () => {
    // background
    const bg = new PIXI.Sprite(PIXI.loader.resources["../../assets/img/text.png"].texture);
    bg.anchor.set(0.5);
    bg.scale.set(0.6);
    bg.position.set(renderer.view.width / 2, renderer.view.height / 2);
    stage.addChild(bg);

    let positionX = 0;
    let positionY = 0;

    renderer.view.addEventListener('mouseenter', function(event) {
      positionX = event.clientX;
      positionY = event.clientY;
    }, false);

    //console.log(positionX, positionY);

    let delta = 0;

    renderer.view.addEventListener('mousemove', updateDelta, false);

    function updateDelta(event) {
      delta++;
      if (delta % 30 === 0) {
        console.log('10');
        ripples.push(new Ripple(event.clientX, event.clientY));
        stage.filters = ripples.map(function(f) {
          return f.filter;
        });
      }
    }

    gameLoop();
  };

  const gameLoop = () => {
    requestAnimationFrame(gameLoop);

    // update ripples
    for (let i = 0; i < ripples.length; i++) {
      ripples[i].update();
    }

    renderer.render(stage);
  };

  const Ripple = (x, y) => {
    // sprite
    this.sprite = new PIXI.Sprite(PIXI.loader.resources["../../assets/img/map.png"].texture);
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(x, y);
    this.sprite.scale.set(0.1);
    stage.addChild(this.sprite);
    // filter
    this.filter = new PIXI.filters.DisplacementFilter(this.sprite);
  };

  Ripple.prototype.update = function() {
    this.sprite.scale.x += 0.015;
    this.sprite.scale.y += 0.015;
  };

  return (
    <div className="canvas">

    </div>
  )
};

export default Canvas;