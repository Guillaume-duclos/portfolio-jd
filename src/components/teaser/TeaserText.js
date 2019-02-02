import React, { Component } from 'react';
//import * as PIXI from "../../utils/Pixi.js";
import * as PIXI from "pixi.js";
import Teaser from "./Teaser";

const stage = new PIXI.Container();
const renderer = PIXI.autoDetectRenderer(512, 512, {transparent: true});
document.body.appendChild(renderer.view);

class TeaserText extends Component {

  componentDidUpdate() {
    // load assets
   /* PIXI.loader
      .add("../assets/img/text.png")
      .add("../assets/img/map.png")
      .load(this.setup);

    let ripples = [];*/
  }

  /*setup = () => {
    // background
    const bg = new PIXI.Sprite(PIXI.loader.resources["../assets/img/text.png"].texture);
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

    let delta = 0;

    renderer.view.addEventListener('mousemove', updateDelta, false);

    function updateDelta(event) {
      delta++;
      if (delta % 30 === 0) {
        console.log('10');
        this.ripples.push(new this.Ripple(event.clientX, event.clientY));
        stage.filters = this.ripples.map(function(f) {
          return f.filter;
        });
      }
    }

    this.gameLoop();
  };

  gameLoop = () => {
    requestAnimationFrame(this.gameLoop);

    // update ripples
    for (let i = 0; i < this.ripples.length; i++) {
      this.ripples[i].update();
    }

    renderer.render(stage);
  };

  Ripple = (x, y) => {
    // sprite
    this.sprite = new PIXI.Sprite(PIXI.loader.resources["../assets/img/map.png"].texture);
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(x, y);
    this.sprite.scale.set(0.1);
    stage.addChild(this.sprite);
    // filter
    this.filter = new PIXI.filters.DisplacementFilter(this.sprite);
  };*/

  render() {

    /*this.Ripple.prototype.update = function() {
      this.sprite.scale.x += 0.015;
      this.sprite.scale.y += 0.015;
    };*/

    return (
      <div className="teaser-text-container flex">
        <img className="teaser-text" src={this.props.teaserText} draggable="false" alt=""/>
      </div>
    );
  }
}

export default TeaserText;