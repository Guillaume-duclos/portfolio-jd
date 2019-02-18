import React from 'react';
import * as PIXI from "pixi.js";

const Ripple = (x, y) => {
  // sprite
  this.sprite = new PIXI.Sprite(PIXI.loader.resources["../assets/img/map.png"].texture);
  this.sprite.anchor.set(0.5);
  this.sprite.position.set(x, y);
  this.sprite.scale.set(0.1);
  stage.addChild(this.sprite);
  // filter
  this.filter = new PIXI.filters.DisplacementFilter(this.sprite);
};

export default Ripple;