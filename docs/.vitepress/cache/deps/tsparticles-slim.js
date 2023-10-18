import {
  Circle,
  ExternalInteractorBase,
  OptionsColor,
  ParticlesInteractorBase,
  Rectangle,
  ValueWithRandom,
  Vector,
  addEasing,
  calculateBounds,
  circleBounce,
  circleBounceDataFromParticle,
  clamp,
  colorMix,
  divMode,
  divModeExecute,
  drawLine,
  drawTriangle,
  errorPrefix,
  executeOnSingleOrMultiple,
  getDistance,
  getDistances,
  getEasing,
  getHslAnimationFromHsl,
  getLinkColor,
  getLinkRandomColor,
  getLogger,
  getRandom,
  getRangeMax,
  getRangeValue,
  getStyleFromHsl,
  getStyleFromRgb,
  getValue,
  initParticleNumericAnimationValue,
  isArray,
  isDivModeEnabled,
  isInArray,
  isObject,
  isPointInside,
  isSsr,
  itemFromArray,
  itemFromSingleOrMultiple,
  loadFont,
  mouseLeaveEvent,
  mouseMoveEvent,
  randomInRange,
  rangeColorToHsl,
  rangeColorToRgb,
  rectBounce,
  rgbToHsl,
  setRangeValue,
  tsParticles
} from "./chunk-RXYKNIVE.js";
import "./chunk-5WWUZCGV.js";

// node_modules/tsparticles-particles.js/esm/marcbruederlin/Particles.js
var Particles = class _Particles {
  static init(options) {
    var _a;
    const particles = new _Particles(), selector = options.selector;
    if (!selector) {
      throw new Error("No selector provided");
    }
    const el = document.querySelector(selector);
    if (!el) {
      throw new Error("No element found for selector");
    }
    tsParticles.set(selector.replace(".", "").replace("!", ""), el, {
      fullScreen: {
        enable: false
      },
      particles: {
        color: {
          value: options.color ?? "!000000"
        },
        links: {
          color: "random",
          distance: options.minDistance ?? 120,
          enable: options.connectParticles ?? false
        },
        move: {
          enable: true,
          speed: options.speed ?? 0.5
        },
        number: {
          value: options.maxParticles ?? 100
        },
        size: {
          value: { min: 1, max: options.sizeVariations ?? 3 }
        }
      },
      responsive: (_a = options.responsive) == null ? void 0 : _a.map((responsive) => {
        var _a2, _b, _c, _d, _e;
        return {
          maxWidth: responsive.breakpoint,
          options: {
            particles: {
              color: {
                value: (_a2 = responsive.options) == null ? void 0 : _a2.color
              },
              links: {
                distance: (_b = responsive.options) == null ? void 0 : _b.minDistance,
                enable: (_c = responsive.options) == null ? void 0 : _c.connectParticles
              },
              number: {
                value: options.maxParticles
              },
              move: {
                enable: true,
                speed: (_d = responsive.options) == null ? void 0 : _d.speed
              },
              size: {
                value: (_e = responsive.options) == null ? void 0 : _e.sizeVariations
              }
            }
          }
        };
      })
    }).then((container) => {
      particles._container = container;
    });
    return particles;
  }
  destroy() {
    const container = this._container;
    container && container.destroy();
  }
  pauseAnimation() {
    const container = this._container;
    container && container.pause();
  }
  resumeAnimation() {
    const container = this._container;
    container && container.play();
  }
};

// node_modules/tsparticles-particles.js/esm/VincentGarreau/particles.js
var initParticlesJS = (engine) => {
  const particlesJS = (tagId, options) => {
    return engine.load(tagId, options);
  };
  particlesJS.load = (tagId, pathConfigJson, callback) => {
    engine.loadJSON(tagId, pathConfigJson).then((container) => {
      if (container) {
        callback(container);
      }
    }).catch(() => {
      callback(void 0);
    });
  };
  particlesJS.setOnClickHandler = (callback) => {
    engine.setOnClickHandler(callback);
  };
  const pJSDom = engine.dom();
  return { particlesJS, pJSDom };
};

// node_modules/tsparticles-particles.js/esm/index.js
var initPjs = (engine) => {
  const { particlesJS, pJSDom } = initParticlesJS(engine);
  window.particlesJS = particlesJS;
  window.pJSDom = pJSDom;
  window.Particles = Particles;
  return { particlesJS, pJSDom, Particles };
};

// node_modules/tsparticles-move-base/esm/Utils.js
function applyDistance(particle) {
  const initialPosition = particle.initialPosition, { dx, dy } = getDistances(initialPosition, particle.position), dxFixed = Math.abs(dx), dyFixed = Math.abs(dy), { maxDistance } = particle.retina, hDistance = maxDistance.horizontal, vDistance = maxDistance.vertical;
  if (!hDistance && !vDistance) {
    return;
  }
  if ((hDistance && dxFixed >= hDistance || vDistance && dyFixed >= vDistance) && !particle.misplaced) {
    particle.misplaced = !!hDistance && dxFixed > hDistance || !!vDistance && dyFixed > vDistance;
    if (hDistance) {
      particle.velocity.x = particle.velocity.y / 2 - particle.velocity.x;
    }
    if (vDistance) {
      particle.velocity.y = particle.velocity.x / 2 - particle.velocity.y;
    }
  } else if ((!hDistance || dxFixed < hDistance) && (!vDistance || dyFixed < vDistance) && particle.misplaced) {
    particle.misplaced = false;
  } else if (particle.misplaced) {
    const pos = particle.position, vel = particle.velocity;
    if (hDistance && (pos.x < initialPosition.x && vel.x < 0 || pos.x > initialPosition.x && vel.x > 0)) {
      vel.x *= -getRandom();
    }
    if (vDistance && (pos.y < initialPosition.y && vel.y < 0 || pos.y > initialPosition.y && vel.y > 0)) {
      vel.y *= -getRandom();
    }
  }
}
function move(particle, moveOptions, moveSpeed, maxSpeed, moveDrift, delta) {
  applyPath(particle, delta);
  const gravityOptions = particle.gravity, gravityFactor = (gravityOptions == null ? void 0 : gravityOptions.enable) && gravityOptions.inverse ? -1 : 1;
  if (moveDrift && moveSpeed) {
    particle.velocity.x += moveDrift * delta.factor / (60 * moveSpeed);
  }
  if ((gravityOptions == null ? void 0 : gravityOptions.enable) && moveSpeed) {
    particle.velocity.y += gravityFactor * (gravityOptions.acceleration * delta.factor) / (60 * moveSpeed);
  }
  const decay = particle.moveDecay;
  particle.velocity.multTo(decay);
  const velocity = particle.velocity.mult(moveSpeed);
  if ((gravityOptions == null ? void 0 : gravityOptions.enable) && maxSpeed > 0 && (!gravityOptions.inverse && velocity.y >= 0 && velocity.y >= maxSpeed || gravityOptions.inverse && velocity.y <= 0 && velocity.y <= -maxSpeed)) {
    velocity.y = gravityFactor * maxSpeed;
    if (moveSpeed) {
      particle.velocity.y = velocity.y / moveSpeed;
    }
  }
  const zIndexOptions = particle.options.zIndex, zVelocityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.velocityRate;
  velocity.multTo(zVelocityFactor);
  const { position } = particle;
  position.addTo(velocity);
  if (moveOptions.vibrate) {
    position.x += Math.sin(position.x * Math.cos(position.y));
    position.y += Math.cos(position.y * Math.sin(position.x));
  }
}
function spin(particle, moveSpeed) {
  const container = particle.container;
  if (!particle.spin) {
    return;
  }
  const updateFunc = {
    x: particle.spin.direction === "clockwise" ? Math.cos : Math.sin,
    y: particle.spin.direction === "clockwise" ? Math.sin : Math.cos
  };
  particle.position.x = particle.spin.center.x + particle.spin.radius * updateFunc.x(particle.spin.angle);
  particle.position.y = particle.spin.center.y + particle.spin.radius * updateFunc.y(particle.spin.angle);
  particle.spin.radius += particle.spin.acceleration;
  const maxCanvasSize = Math.max(container.canvas.size.width, container.canvas.size.height);
  if (particle.spin.radius > maxCanvasSize / 2) {
    particle.spin.radius = maxCanvasSize / 2;
    particle.spin.acceleration *= -1;
  } else if (particle.spin.radius < 0) {
    particle.spin.radius = 0;
    particle.spin.acceleration *= -1;
  }
  particle.spin.angle += moveSpeed / 100 * (1 - particle.spin.radius / maxCanvasSize);
}
function applyPath(particle, delta) {
  var _a;
  const particlesOptions = particle.options, pathOptions = particlesOptions.move.path, pathEnabled = pathOptions.enable;
  if (!pathEnabled) {
    return;
  }
  if (particle.lastPathTime <= particle.pathDelay) {
    particle.lastPathTime += delta.value;
    return;
  }
  const path = (_a = particle.pathGenerator) == null ? void 0 : _a.generate(particle, delta);
  if (path) {
    particle.velocity.addTo(path);
  }
  if (pathOptions.clamp) {
    particle.velocity.x = clamp(particle.velocity.x, -1, 1);
    particle.velocity.y = clamp(particle.velocity.y, -1, 1);
  }
  particle.lastPathTime -= particle.pathDelay;
}
function getProximitySpeedFactor(particle) {
  return particle.slow.inRange ? particle.slow.factor : 1;
}

// node_modules/tsparticles-move-base/esm/BaseMover.js
var diffFactor = 2;
var BaseMover = class {
  constructor() {
    this._initSpin = (particle) => {
      const container = particle.container, options = particle.options, spinOptions = options.move.spin;
      if (!spinOptions.enable) {
        return;
      }
      const spinPos = spinOptions.position ?? { x: 50, y: 50 }, spinCenter = {
        x: spinPos.x / 100 * container.canvas.size.width,
        y: spinPos.y / 100 * container.canvas.size.height
      }, pos = particle.getPosition(), distance = getDistance(pos, spinCenter), spinAcceleration = getRangeValue(spinOptions.acceleration);
      particle.retina.spinAcceleration = spinAcceleration * container.retina.pixelRatio;
      particle.spin = {
        center: spinCenter,
        direction: particle.velocity.x >= 0 ? "clockwise" : "counter-clockwise",
        angle: particle.velocity.angle,
        radius: distance,
        acceleration: particle.retina.spinAcceleration
      };
    };
  }
  init(particle) {
    const options = particle.options, gravityOptions = options.move.gravity;
    particle.gravity = {
      enable: gravityOptions.enable,
      acceleration: getRangeValue(gravityOptions.acceleration),
      inverse: gravityOptions.inverse
    };
    this._initSpin(particle);
  }
  isEnabled(particle) {
    return !particle.destroyed && particle.options.move.enable;
  }
  move(particle, delta) {
    var _a, _b;
    const particleOptions = particle.options, moveOptions = particleOptions.move;
    if (!moveOptions.enable) {
      return;
    }
    const container = particle.container, pxRatio = container.retina.pixelRatio, slowFactor = getProximitySpeedFactor(particle), baseSpeed = ((_a = particle.retina).moveSpeed ?? (_a.moveSpeed = getRangeValue(moveOptions.speed) * pxRatio)) * container.retina.reduceFactor, moveDrift = (_b = particle.retina).moveDrift ?? (_b.moveDrift = getRangeValue(particle.options.move.drift) * pxRatio), maxSize = getRangeMax(particleOptions.size.value) * pxRatio, sizeFactor = moveOptions.size ? particle.getRadius() / maxSize : 1, moveSpeed = baseSpeed * sizeFactor * slowFactor * (delta.factor || 1) / diffFactor, maxSpeed = particle.retina.maxSpeed ?? container.retina.maxSpeed;
    if (moveOptions.spin.enable) {
      spin(particle, moveSpeed);
    } else {
      move(particle, moveOptions, moveSpeed, maxSpeed, moveDrift, delta);
    }
    applyDistance(particle);
  }
};

// node_modules/tsparticles-move-base/esm/index.js
async function loadBaseMover(engine, refresh = true) {
  await engine.addMover("base", () => new BaseMover(), refresh);
}

// node_modules/tsparticles-shape-circle/esm/CircleDrawer.js
var CircleDrawer = class {
  draw(context, particle, radius) {
    if (!particle.circleRange) {
      particle.circleRange = { min: 0, max: Math.PI * 2 };
    }
    const circleRange = particle.circleRange;
    context.arc(0, 0, radius, circleRange.min, circleRange.max, false);
  }
  getSidesCount() {
    return 12;
  }
  particleInit(container, particle) {
    const shapeData = particle.shapeData, angle = (shapeData == null ? void 0 : shapeData.angle) ?? {
      max: 360,
      min: 0
    };
    particle.circleRange = !isObject(angle) ? {
      min: 0,
      max: angle * Math.PI / 180
    } : { min: angle.min * Math.PI / 180, max: angle.max * Math.PI / 180 };
  }
};

// node_modules/tsparticles-shape-circle/esm/index.js
async function loadCircleShape(engine, refresh = true) {
  await engine.addShape("circle", new CircleDrawer(), refresh);
}

// node_modules/tsparticles-updater-color/esm/Utils.js
function updateColorValue(delta, colorValue, valueAnimation, max, decrease) {
  if (!colorValue || !valueAnimation.enable || (colorValue.maxLoops ?? 0) > 0 && (colorValue.loops ?? 0) > (colorValue.maxLoops ?? 0)) {
    return;
  }
  if (!colorValue.time) {
    colorValue.time = 0;
  }
  if ((colorValue.delayTime ?? 0) > 0 && colorValue.time < (colorValue.delayTime ?? 0)) {
    colorValue.time += delta.value;
  }
  if ((colorValue.delayTime ?? 0) > 0 && colorValue.time < (colorValue.delayTime ?? 0)) {
    return;
  }
  const offset = randomInRange(valueAnimation.offset), velocity = (colorValue.velocity ?? 0) * delta.factor + offset * 3.6, decay = colorValue.decay ?? 1;
  if (!decrease || colorValue.status === "increasing") {
    colorValue.value += velocity;
    if (colorValue.value > max) {
      if (!colorValue.loops) {
        colorValue.loops = 0;
      }
      colorValue.loops++;
      if (decrease) {
        colorValue.status = "decreasing";
        colorValue.value -= colorValue.value % max;
      }
    }
  } else {
    colorValue.value -= velocity;
    if (colorValue.value < 0) {
      if (!colorValue.loops) {
        colorValue.loops = 0;
      }
      colorValue.loops++;
      colorValue.status = "increasing";
      colorValue.value += colorValue.value;
    }
  }
  if (colorValue.velocity && decay !== 1) {
    colorValue.velocity *= decay;
  }
  if (colorValue.value > max) {
    colorValue.value %= max;
  }
}
function updateColor(particle, delta) {
  const { h: hAnimation, s: sAnimation, l: lAnimation } = particle.options.color.animation, { color } = particle;
  if (!color) {
    return;
  }
  const { h, s, l } = color;
  if (h) {
    updateColorValue(delta, h, hAnimation, 360, false);
  }
  if (s) {
    updateColorValue(delta, s, sAnimation, 100, true);
  }
  if (l) {
    updateColorValue(delta, l, lAnimation, 100, true);
  }
}

// node_modules/tsparticles-updater-color/esm/ColorUpdater.js
var ColorUpdater = class {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const hslColor = rangeColorToHsl(particle.options.color, particle.id, particle.options.reduceDuplicates);
    if (hslColor) {
      particle.color = getHslAnimationFromHsl(hslColor, particle.options.color.animation, this.container.retina.reduceFactor);
    }
  }
  isEnabled(particle) {
    const { h: hAnimation, s: sAnimation, l: lAnimation } = particle.options.color.animation, { color } = particle;
    return !particle.destroyed && !particle.spawning && ((color == null ? void 0 : color.h.value) !== void 0 && hAnimation.enable || (color == null ? void 0 : color.s.value) !== void 0 && sAnimation.enable || (color == null ? void 0 : color.l.value) !== void 0 && lAnimation.enable);
  }
  update(particle, delta) {
    updateColor(particle, delta);
  }
};

// node_modules/tsparticles-updater-color/esm/index.js
async function loadColorUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("color", (container) => new ColorUpdater(container), refresh);
}

// node_modules/tsparticles-updater-opacity/esm/Utils.js
function checkDestroy(particle, value, minValue, maxValue) {
  switch (particle.options.opacity.animation.destroy) {
    case "max":
      if (value >= maxValue) {
        particle.destroy();
      }
      break;
    case "min":
      if (value <= minValue) {
        particle.destroy();
      }
      break;
  }
}
function updateOpacity(particle, delta) {
  const data = particle.opacity;
  if (particle.destroyed || !(data == null ? void 0 : data.enable) || (data.maxLoops ?? 0) > 0 && (data.loops ?? 0) > (data.maxLoops ?? 0)) {
    return;
  }
  const minValue = data.min, maxValue = data.max, decay = data.decay ?? 1;
  if (!data.time) {
    data.time = 0;
  }
  if ((data.delayTime ?? 0) > 0 && data.time < (data.delayTime ?? 0)) {
    data.time += delta.value;
  }
  if ((data.delayTime ?? 0) > 0 && data.time < (data.delayTime ?? 0)) {
    return;
  }
  switch (data.status) {
    case "increasing":
      if (data.value >= maxValue) {
        data.status = "decreasing";
        if (!data.loops) {
          data.loops = 0;
        }
        data.loops++;
      } else {
        data.value += (data.velocity ?? 0) * delta.factor;
      }
      break;
    case "decreasing":
      if (data.value <= minValue) {
        data.status = "increasing";
        if (!data.loops) {
          data.loops = 0;
        }
        data.loops++;
      } else {
        data.value -= (data.velocity ?? 0) * delta.factor;
      }
      break;
  }
  if (data.velocity && data.decay !== 1) {
    data.velocity *= decay;
  }
  checkDestroy(particle, data.value, minValue, maxValue);
  if (!particle.destroyed) {
    data.value = clamp(data.value, minValue, maxValue);
  }
}

// node_modules/tsparticles-updater-opacity/esm/OpacityUpdater.js
var OpacityUpdater = class {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const opacityOptions = particle.options.opacity;
    particle.opacity = initParticleNumericAnimationValue(opacityOptions, 1);
    const opacityAnimation = opacityOptions.animation;
    if (opacityAnimation.enable) {
      particle.opacity.velocity = getRangeValue(opacityAnimation.speed) / 100 * this.container.retina.reduceFactor;
      if (!opacityAnimation.sync) {
        particle.opacity.velocity *= getRandom();
      }
    }
  }
  isEnabled(particle) {
    return !particle.destroyed && !particle.spawning && !!particle.opacity && particle.opacity.enable && ((particle.opacity.maxLoops ?? 0) <= 0 || (particle.opacity.maxLoops ?? 0) > 0 && (particle.opacity.loops ?? 0) < (particle.opacity.maxLoops ?? 0));
  }
  reset(particle) {
    if (particle.opacity) {
      particle.opacity.time = 0;
      particle.opacity.loops = 0;
    }
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateOpacity(particle, delta);
  }
};

// node_modules/tsparticles-updater-opacity/esm/index.js
async function loadOpacityUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("opacity", (container) => new OpacityUpdater(container), refresh);
}

// node_modules/tsparticles-updater-out-modes/esm/Utils.js
function bounceHorizontal(data) {
  if (data.outMode !== "bounce" && data.outMode !== "bounce-horizontal" && data.outMode !== "bounceHorizontal" && data.outMode !== "split" || data.direction !== "left" && data.direction !== "right") {
    return;
  }
  if (data.bounds.right < 0 && data.direction === "left") {
    data.particle.position.x = data.size + data.offset.x;
  } else if (data.bounds.left > data.canvasSize.width && data.direction === "right") {
    data.particle.position.x = data.canvasSize.width - data.size - data.offset.x;
  }
  const velocity = data.particle.velocity.x;
  let bounced = false;
  if (data.direction === "right" && data.bounds.right >= data.canvasSize.width && velocity > 0 || data.direction === "left" && data.bounds.left <= 0 && velocity < 0) {
    const newVelocity = getValue(data.particle.options.bounce.horizontal);
    data.particle.velocity.x *= -newVelocity;
    bounced = true;
  }
  if (!bounced) {
    return;
  }
  const minPos = data.offset.x + data.size;
  if (data.bounds.right >= data.canvasSize.width && data.direction === "right") {
    data.particle.position.x = data.canvasSize.width - minPos;
  } else if (data.bounds.left <= 0 && data.direction === "left") {
    data.particle.position.x = minPos;
  }
  if (data.outMode === "split") {
    data.particle.destroy();
  }
}
function bounceVertical(data) {
  if (data.outMode !== "bounce" && data.outMode !== "bounce-vertical" && data.outMode !== "bounceVertical" && data.outMode !== "split" || data.direction !== "bottom" && data.direction !== "top") {
    return;
  }
  if (data.bounds.bottom < 0 && data.direction === "top") {
    data.particle.position.y = data.size + data.offset.y;
  } else if (data.bounds.top > data.canvasSize.height && data.direction === "bottom") {
    data.particle.position.y = data.canvasSize.height - data.size - data.offset.y;
  }
  const velocity = data.particle.velocity.y;
  let bounced = false;
  if (data.direction === "bottom" && data.bounds.bottom >= data.canvasSize.height && velocity > 0 || data.direction === "top" && data.bounds.top <= 0 && velocity < 0) {
    const newVelocity = getValue(data.particle.options.bounce.vertical);
    data.particle.velocity.y *= -newVelocity;
    bounced = true;
  }
  if (!bounced) {
    return;
  }
  const minPos = data.offset.y + data.size;
  if (data.bounds.bottom >= data.canvasSize.height && data.direction === "bottom") {
    data.particle.position.y = data.canvasSize.height - minPos;
  } else if (data.bounds.top <= 0 && data.direction === "top") {
    data.particle.position.y = minPos;
  }
  if (data.outMode === "split") {
    data.particle.destroy();
  }
}

// node_modules/tsparticles-updater-out-modes/esm/BounceOutMode.js
var BounceOutMode = class {
  constructor(container) {
    this.container = container;
    this.modes = [
      "bounce",
      "bounce-vertical",
      "bounce-horizontal",
      "bounceVertical",
      "bounceHorizontal",
      "split"
    ];
  }
  update(particle, direction, delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }
    const container = this.container;
    let handled = false;
    for (const [, plugin] of container.plugins) {
      if (plugin.particleBounce !== void 0) {
        handled = plugin.particleBounce(particle, delta, direction);
      }
      if (handled) {
        break;
      }
    }
    if (handled) {
      return;
    }
    const pos = particle.getPosition(), offset = particle.offset, size = particle.getRadius(), bounds = calculateBounds(pos, size), canvasSize = container.canvas.size;
    bounceHorizontal({ particle, outMode, direction, bounds, canvasSize, offset, size });
    bounceVertical({ particle, outMode, direction, bounds, canvasSize, offset, size });
  }
};

// node_modules/tsparticles-updater-out-modes/esm/DestroyOutMode.js
var DestroyOutMode = class {
  constructor(container) {
    this.container = container;
    this.modes = ["destroy"];
  }
  update(particle, direction, _delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }
    const container = this.container;
    switch (particle.outType) {
      case "normal":
      case "outside":
        if (isPointInside(particle.position, container.canvas.size, Vector.origin, particle.getRadius(), direction)) {
          return;
        }
        break;
      case "inside": {
        const { dx, dy } = getDistances(particle.position, particle.moveCenter);
        const { x: vx, y: vy } = particle.velocity;
        if (vx < 0 && dx > particle.moveCenter.radius || vy < 0 && dy > particle.moveCenter.radius || vx >= 0 && dx < -particle.moveCenter.radius || vy >= 0 && dy < -particle.moveCenter.radius) {
          return;
        }
        break;
      }
    }
    container.particles.remove(particle, void 0, true);
  }
};

// node_modules/tsparticles-updater-out-modes/esm/NoneOutMode.js
var NoneOutMode = class {
  constructor(container) {
    this.container = container;
    this.modes = ["none"];
  }
  update(particle, direction, delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }
    if (particle.options.move.distance.horizontal && (direction === "left" || direction === "right") || particle.options.move.distance.vertical && (direction === "top" || direction === "bottom")) {
      return;
    }
    const gravityOptions = particle.options.move.gravity, container = this.container;
    const canvasSize = container.canvas.size;
    const pRadius = particle.getRadius();
    if (!gravityOptions.enable) {
      if (particle.velocity.y > 0 && particle.position.y <= canvasSize.height + pRadius || particle.velocity.y < 0 && particle.position.y >= -pRadius || particle.velocity.x > 0 && particle.position.x <= canvasSize.width + pRadius || particle.velocity.x < 0 && particle.position.x >= -pRadius) {
        return;
      }
      if (!isPointInside(particle.position, container.canvas.size, Vector.origin, pRadius, direction)) {
        container.particles.remove(particle);
      }
    } else {
      const position = particle.position;
      if (!gravityOptions.inverse && position.y > canvasSize.height + pRadius && direction === "bottom" || gravityOptions.inverse && position.y < -pRadius && direction === "top") {
        container.particles.remove(particle);
      }
    }
  }
};

// node_modules/tsparticles-updater-out-modes/esm/OutOutMode.js
var OutOutMode = class {
  constructor(container) {
    this.container = container;
    this.modes = ["out"];
  }
  update(particle, direction, delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }
    const container = this.container;
    switch (particle.outType) {
      case "inside": {
        const { x: vx, y: vy } = particle.velocity;
        const circVec = Vector.origin;
        circVec.length = particle.moveCenter.radius;
        circVec.angle = particle.velocity.angle + Math.PI;
        circVec.addTo(Vector.create(particle.moveCenter));
        const { dx, dy } = getDistances(particle.position, circVec);
        if (vx <= 0 && dx >= 0 || vy <= 0 && dy >= 0 || vx >= 0 && dx <= 0 || vy >= 0 && dy <= 0) {
          return;
        }
        particle.position.x = Math.floor(randomInRange({
          min: 0,
          max: container.canvas.size.width
        }));
        particle.position.y = Math.floor(randomInRange({
          min: 0,
          max: container.canvas.size.height
        }));
        const { dx: newDx, dy: newDy } = getDistances(particle.position, particle.moveCenter);
        particle.direction = Math.atan2(-newDy, -newDx);
        particle.velocity.angle = particle.direction;
        break;
      }
      default: {
        if (isPointInside(particle.position, container.canvas.size, Vector.origin, particle.getRadius(), direction)) {
          return;
        }
        switch (particle.outType) {
          case "outside": {
            particle.position.x = Math.floor(randomInRange({
              min: -particle.moveCenter.radius,
              max: particle.moveCenter.radius
            })) + particle.moveCenter.x;
            particle.position.y = Math.floor(randomInRange({
              min: -particle.moveCenter.radius,
              max: particle.moveCenter.radius
            })) + particle.moveCenter.y;
            const { dx, dy } = getDistances(particle.position, particle.moveCenter);
            if (particle.moveCenter.radius) {
              particle.direction = Math.atan2(dy, dx);
              particle.velocity.angle = particle.direction;
            }
            break;
          }
          case "normal": {
            const wrap = particle.options.move.warp, canvasSize = container.canvas.size, newPos = {
              bottom: canvasSize.height + particle.getRadius() + particle.offset.y,
              left: -particle.getRadius() - particle.offset.x,
              right: canvasSize.width + particle.getRadius() + particle.offset.x,
              top: -particle.getRadius() - particle.offset.y
            }, sizeValue = particle.getRadius(), nextBounds = calculateBounds(particle.position, sizeValue);
            if (direction === "right" && nextBounds.left > canvasSize.width + particle.offset.x) {
              particle.position.x = newPos.left;
              particle.initialPosition.x = particle.position.x;
              if (!wrap) {
                particle.position.y = getRandom() * canvasSize.height;
                particle.initialPosition.y = particle.position.y;
              }
            } else if (direction === "left" && nextBounds.right < -particle.offset.x) {
              particle.position.x = newPos.right;
              particle.initialPosition.x = particle.position.x;
              if (!wrap) {
                particle.position.y = getRandom() * canvasSize.height;
                particle.initialPosition.y = particle.position.y;
              }
            }
            if (direction === "bottom" && nextBounds.top > canvasSize.height + particle.offset.y) {
              if (!wrap) {
                particle.position.x = getRandom() * canvasSize.width;
                particle.initialPosition.x = particle.position.x;
              }
              particle.position.y = newPos.top;
              particle.initialPosition.y = particle.position.y;
            } else if (direction === "top" && nextBounds.bottom < -particle.offset.y) {
              if (!wrap) {
                particle.position.x = getRandom() * canvasSize.width;
                particle.initialPosition.x = particle.position.x;
              }
              particle.position.y = newPos.bottom;
              particle.initialPosition.y = particle.position.y;
            }
            break;
          }
        }
        break;
      }
    }
  }
};

// node_modules/tsparticles-updater-out-modes/esm/OutOfCanvasUpdater.js
var OutOfCanvasUpdater = class {
  constructor(container) {
    this.container = container;
    this._updateOutMode = (particle, delta, outMode, direction) => {
      for (const updater of this.updaters) {
        updater.update(particle, direction, delta, outMode);
      }
    };
    this.updaters = [
      new BounceOutMode(container),
      new DestroyOutMode(container),
      new OutOutMode(container),
      new NoneOutMode(container)
    ];
  }
  init() {
  }
  isEnabled(particle) {
    return !particle.destroyed && !particle.spawning;
  }
  update(particle, delta) {
    const outModes = particle.options.move.outModes;
    this._updateOutMode(particle, delta, outModes.bottom ?? outModes.default, "bottom");
    this._updateOutMode(particle, delta, outModes.left ?? outModes.default, "left");
    this._updateOutMode(particle, delta, outModes.right ?? outModes.default, "right");
    this._updateOutMode(particle, delta, outModes.top ?? outModes.default, "top");
  }
};

// node_modules/tsparticles-updater-out-modes/esm/index.js
async function loadOutModesUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("outModes", (container) => new OutOfCanvasUpdater(container), refresh);
}

// node_modules/tsparticles-updater-size/esm/Utils.js
function checkDestroy2(particle, value, minValue, maxValue) {
  switch (particle.options.size.animation.destroy) {
    case "max":
      if (value >= maxValue) {
        particle.destroy();
      }
      break;
    case "min":
      if (value <= minValue) {
        particle.destroy();
      }
      break;
  }
}
function updateSize(particle, delta) {
  const data = particle.size;
  if (particle.destroyed || !data || !data.enable || (data.maxLoops ?? 0) > 0 && (data.loops ?? 0) > (data.maxLoops ?? 0)) {
    return;
  }
  const sizeVelocity = (data.velocity ?? 0) * delta.factor, minValue = data.min, maxValue = data.max, decay = data.decay ?? 1;
  if (!data.time) {
    data.time = 0;
  }
  if ((data.delayTime ?? 0) > 0 && data.time < (data.delayTime ?? 0)) {
    data.time += delta.value;
  }
  if ((data.delayTime ?? 0) > 0 && data.time < (data.delayTime ?? 0)) {
    return;
  }
  switch (data.status) {
    case "increasing":
      if (data.value >= maxValue) {
        data.status = "decreasing";
        if (!data.loops) {
          data.loops = 0;
        }
        data.loops++;
      } else {
        data.value += sizeVelocity;
      }
      break;
    case "decreasing":
      if (data.value <= minValue) {
        data.status = "increasing";
        if (!data.loops) {
          data.loops = 0;
        }
        data.loops++;
      } else {
        data.value -= sizeVelocity;
      }
  }
  if (data.velocity && decay !== 1) {
    data.velocity *= decay;
  }
  checkDestroy2(particle, data.value, minValue, maxValue);
  if (!particle.destroyed) {
    data.value = clamp(data.value, minValue, maxValue);
  }
}

// node_modules/tsparticles-updater-size/esm/SizeUpdater.js
var SizeUpdater = class {
  init(particle) {
    const container = particle.container, sizeOptions = particle.options.size, sizeAnimation = sizeOptions.animation;
    if (sizeAnimation.enable) {
      particle.size.velocity = (particle.retina.sizeAnimationSpeed ?? container.retina.sizeAnimationSpeed) / 100 * container.retina.reduceFactor;
      if (!sizeAnimation.sync) {
        particle.size.velocity *= getRandom();
      }
    }
  }
  isEnabled(particle) {
    return !particle.destroyed && !particle.spawning && particle.size.enable && ((particle.size.maxLoops ?? 0) <= 0 || (particle.size.maxLoops ?? 0) > 0 && (particle.size.loops ?? 0) < (particle.size.maxLoops ?? 0));
  }
  reset(particle) {
    particle.size.loops = 0;
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateSize(particle, delta);
  }
};

// node_modules/tsparticles-updater-size/esm/index.js
async function loadSizeUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("size", () => new SizeUpdater(), refresh);
}

// node_modules/tsparticles-basic/esm/index.js
async function loadBasic(engine, refresh = true) {
  await loadBaseMover(engine, false);
  await loadCircleShape(engine, false);
  await loadColorUpdater(engine, false);
  await loadOpacityUpdater(engine, false);
  await loadOutModesUpdater(engine, false);
  await loadSizeUpdater(engine, false);
  await engine.refresh(refresh);
}

// node_modules/tsparticles-plugin-easing-quad/esm/index.js
async function loadEasingQuadPlugin() {
  addEasing("ease-in-quad", (value) => value ** 2);
  addEasing("ease-out-quad", (value) => 1 - (1 - value) ** 2);
  addEasing("ease-in-out-quad", (value) => value < 0.5 ? 2 * value ** 2 : 1 - (-2 * value + 2) ** 2 / 2);
}

// node_modules/tsparticles-interaction-external-attract/esm/Options/Classes/Attract.js
var Attract = class {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.easing = "ease-out-quad";
    this.factor = 1;
    this.maxSpeed = 50;
    this.speed = 1;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    if (data.duration !== void 0) {
      this.duration = data.duration;
    }
    if (data.easing !== void 0) {
      this.easing = data.easing;
    }
    if (data.factor !== void 0) {
      this.factor = data.factor;
    }
    if (data.maxSpeed !== void 0) {
      this.maxSpeed = data.maxSpeed;
    }
    if (data.speed !== void 0) {
      this.speed = data.speed;
    }
  }
};

// node_modules/tsparticles-interaction-external-attract/esm/Attractor.js
var Attractor = class extends ExternalInteractorBase {
  constructor(engine, container) {
    super(container);
    this._clickAttract = () => {
      const container2 = this.container;
      if (!container2.attract) {
        container2.attract = { particles: [] };
      }
      const { attract } = container2;
      if (!attract.finish) {
        if (!attract.count) {
          attract.count = 0;
        }
        attract.count++;
        if (attract.count === container2.particles.count) {
          attract.finish = true;
        }
      }
      if (attract.clicking) {
        const mousePos = container2.interactivity.mouse.clickPosition, attractRadius = container2.retina.attractModeDistance;
        if (!attractRadius || attractRadius < 0 || !mousePos) {
          return;
        }
        this._processAttract(mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius));
      } else if (attract.clicking === false) {
        attract.particles = [];
      }
      return;
    };
    this._hoverAttract = () => {
      const container2 = this.container, mousePos = container2.interactivity.mouse.position, attractRadius = container2.retina.attractModeDistance;
      if (!attractRadius || attractRadius < 0 || !mousePos) {
        return;
      }
      this._processAttract(mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius));
    };
    this._processAttract = (position, attractRadius, area) => {
      const container2 = this.container, attractOptions = container2.actualOptions.interactivity.modes.attract;
      if (!attractOptions) {
        return;
      }
      const query = container2.particles.quadTree.query(area, (p) => this.isEnabled(p));
      for (const particle of query) {
        const { dx, dy, distance } = getDistances(particle.position, position);
        const velocity = attractOptions.speed * attractOptions.factor;
        const attractFactor = clamp(getEasing(attractOptions.easing)(1 - distance / attractRadius) * velocity, 0, attractOptions.maxSpeed);
        const normVec = Vector.create(distance === 0 ? velocity : dx / distance * attractFactor, distance === 0 ? velocity : dy / distance * attractFactor);
        particle.position.subFrom(normVec);
      }
    };
    this._engine = engine;
    if (!container.attract) {
      container.attract = { particles: [] };
    }
    this.handleClickMode = (mode) => {
      const options = this.container.actualOptions, attract = options.interactivity.modes.attract;
      if (!attract || mode !== "attract") {
        return;
      }
      if (!container.attract) {
        container.attract = { particles: [] };
      }
      container.attract.clicking = true;
      container.attract.count = 0;
      for (const particle of container.attract.particles) {
        if (!this.isEnabled(particle)) {
          continue;
        }
        particle.velocity.setTo(particle.initialVelocity);
      }
      container.attract.particles = [];
      container.attract.finish = false;
      setTimeout(() => {
        if (container.destroyed) {
          return;
        }
        if (!container.attract) {
          container.attract = { particles: [] };
        }
        container.attract.clicking = false;
      }, attract.duration * 1e3);
    };
  }
  clear() {
  }
  init() {
    const container = this.container, attract = container.actualOptions.interactivity.modes.attract;
    if (!attract) {
      return;
    }
    container.retina.attractModeDistance = attract.distance * container.retina.pixelRatio;
  }
  async interact() {
    const container = this.container, options = container.actualOptions, mouseMoveStatus = container.interactivity.status === mouseMoveEvent, events = options.interactivity.events, hoverEnabled = events.onHover.enable, hoverMode = events.onHover.mode, clickEnabled = events.onClick.enable, clickMode = events.onClick.mode;
    if (mouseMoveStatus && hoverEnabled && isInArray("attract", hoverMode)) {
      this._hoverAttract();
    } else if (clickEnabled && isInArray("attract", clickMode)) {
      this._clickAttract();
    }
  }
  isEnabled(particle) {
    const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = ((particle == null ? void 0 : particle.interactivity) ?? options.interactivity).events;
    if ((!mouse.position || !events.onHover.enable) && (!mouse.clickPosition || !events.onClick.enable)) {
      return false;
    }
    const hoverMode = events.onHover.mode, clickMode = events.onClick.mode;
    return isInArray("attract", hoverMode) || isInArray("attract", clickMode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.attract) {
      options.attract = new Attract();
    }
    for (const source of sources) {
      options.attract.load(source == null ? void 0 : source.attract);
    }
  }
  reset() {
  }
};

// node_modules/tsparticles-interaction-external-attract/esm/index.js
async function loadExternalAttractInteraction(engine, refresh = true) {
  await engine.addInteractor("externalAttract", (container) => new Attractor(engine, container), refresh);
}

// node_modules/tsparticles-interaction-external-bounce/esm/Options/Classes/Bounce.js
var Bounce = class {
  constructor() {
    this.distance = 200;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
  }
};

// node_modules/tsparticles-interaction-external-bounce/esm/Bouncer.js
var Bouncer = class extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this._processBounce = (position, radius, area) => {
      const query = this.container.particles.quadTree.query(area, (p) => this.isEnabled(p));
      for (const particle of query) {
        if (area instanceof Circle) {
          circleBounce(circleBounceDataFromParticle(particle), {
            position,
            radius,
            mass: radius ** 2 * Math.PI / 2,
            velocity: Vector.origin,
            factor: Vector.origin
          });
        } else if (area instanceof Rectangle) {
          rectBounce(particle, calculateBounds(position, radius));
        }
      }
    };
    this._processMouseBounce = () => {
      const container2 = this.container, pxRatio = container2.retina.pixelRatio, tolerance = 10 * pxRatio, mousePos = container2.interactivity.mouse.position, radius = container2.retina.bounceModeDistance;
      if (!radius || radius < 0 || !mousePos) {
        return;
      }
      this._processBounce(mousePos, radius, new Circle(mousePos.x, mousePos.y, radius + tolerance));
    };
    this._singleSelectorBounce = (selector, div) => {
      const container2 = this.container, query = document.querySelectorAll(selector);
      if (!query.length) {
        return;
      }
      query.forEach((item) => {
        const elem = item, pxRatio = container2.retina.pixelRatio, pos = {
          x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
          y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio
        }, radius = elem.offsetWidth / 2 * pxRatio, tolerance = 10 * pxRatio, area = div.type === "circle" ? new Circle(pos.x, pos.y, radius + tolerance) : new Rectangle(elem.offsetLeft * pxRatio - tolerance, elem.offsetTop * pxRatio - tolerance, elem.offsetWidth * pxRatio + tolerance * 2, elem.offsetHeight * pxRatio + tolerance * 2);
        this._processBounce(pos, radius, area);
      });
    };
  }
  clear() {
  }
  init() {
    const container = this.container, bounce2 = container.actualOptions.interactivity.modes.bounce;
    if (!bounce2) {
      return;
    }
    container.retina.bounceModeDistance = bounce2.distance * container.retina.pixelRatio;
  }
  async interact() {
    const container = this.container, options = container.actualOptions, events = options.interactivity.events, mouseMoveStatus = container.interactivity.status === mouseMoveEvent, hoverEnabled = events.onHover.enable, hoverMode = events.onHover.mode, divs = events.onDiv;
    if (mouseMoveStatus && hoverEnabled && isInArray("bounce", hoverMode)) {
      this._processMouseBounce();
    } else {
      divModeExecute("bounce", divs, (selector, div) => this._singleSelectorBounce(selector, div));
    }
  }
  isEnabled(particle) {
    const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = ((particle == null ? void 0 : particle.interactivity) ?? options.interactivity).events, divs = events.onDiv;
    return mouse.position && events.onHover.enable && isInArray("bounce", events.onHover.mode) || isDivModeEnabled("bounce", divs);
  }
  loadModeOptions(options, ...sources) {
    if (!options.bounce) {
      options.bounce = new Bounce();
    }
    for (const source of sources) {
      options.bounce.load(source == null ? void 0 : source.bounce);
    }
  }
  reset() {
  }
};

// node_modules/tsparticles-interaction-external-bounce/esm/index.js
async function loadExternalBounceInteraction(engine, refresh = true) {
  await engine.addInteractor("externalBounce", (container) => new Bouncer(container), refresh);
}

// node_modules/tsparticles-interaction-external-bubble/esm/Options/Classes/BubbleBase.js
var BubbleBase = class {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.mix = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    if (data.duration !== void 0) {
      this.duration = data.duration;
    }
    if (data.mix !== void 0) {
      this.mix = data.mix;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
    if (data.color !== void 0) {
      const sourceColor = isArray(this.color) ? void 0 : this.color;
      this.color = executeOnSingleOrMultiple(data.color, (color) => {
        return OptionsColor.create(sourceColor, color);
      });
    }
    if (data.size !== void 0) {
      this.size = data.size;
    }
  }
};

// node_modules/tsparticles-interaction-external-bubble/esm/Options/Classes/BubbleDiv.js
var BubbleDiv = class extends BubbleBase {
  constructor() {
    super();
    this.selectors = [];
  }
  get ids() {
    return executeOnSingleOrMultiple(this.selectors, (t) => t.replace("#", ""));
  }
  set ids(value) {
    this.selectors = executeOnSingleOrMultiple(value, (t) => `#${t}`);
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    if (data.ids !== void 0) {
      this.ids = data.ids;
    }
    if (data.selectors !== void 0) {
      this.selectors = data.selectors;
    }
  }
};

// node_modules/tsparticles-interaction-external-bubble/esm/Options/Classes/Bubble.js
var Bubble = class extends BubbleBase {
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    this.divs = executeOnSingleOrMultiple(data.divs, (div) => {
      const tmp = new BubbleDiv();
      tmp.load(div);
      return tmp;
    });
  }
};

// node_modules/tsparticles-interaction-external-bubble/esm/Utils.js
function calculateBubbleValue(particleValue, modeValue, optionsValue, ratio) {
  if (modeValue >= optionsValue) {
    const value = particleValue + (modeValue - optionsValue) * ratio;
    return clamp(value, particleValue, modeValue);
  } else if (modeValue < optionsValue) {
    const value = particleValue - (optionsValue - modeValue) * ratio;
    return clamp(value, modeValue, particleValue);
  }
}

// node_modules/tsparticles-interaction-external-bubble/esm/Bubbler.js
var Bubbler = class extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this._clickBubble = () => {
      var _a;
      const container2 = this.container, options = container2.actualOptions, mouseClickPos = container2.interactivity.mouse.clickPosition, bubbleOptions = options.interactivity.modes.bubble;
      if (!bubbleOptions || !mouseClickPos) {
        return;
      }
      if (!container2.bubble) {
        container2.bubble = {};
      }
      const distance = container2.retina.bubbleModeDistance;
      if (!distance || distance < 0) {
        return;
      }
      const query = container2.particles.quadTree.queryCircle(mouseClickPos, distance, (p) => this.isEnabled(p)), { bubble } = container2;
      for (const particle of query) {
        if (!bubble.clicking) {
          continue;
        }
        particle.bubble.inRange = !bubble.durationEnd;
        const pos = particle.getPosition(), distMouse = getDistance(pos, mouseClickPos), timeSpent = ((/* @__PURE__ */ new Date()).getTime() - (container2.interactivity.mouse.clickTime || 0)) / 1e3;
        if (timeSpent > bubbleOptions.duration) {
          bubble.durationEnd = true;
        }
        if (timeSpent > bubbleOptions.duration * 2) {
          bubble.clicking = false;
          bubble.durationEnd = false;
        }
        const sizeData = {
          bubbleObj: {
            optValue: container2.retina.bubbleModeSize,
            value: particle.bubble.radius
          },
          particlesObj: {
            optValue: getRangeMax(particle.options.size.value) * container2.retina.pixelRatio,
            value: particle.size.value
          },
          type: "size"
        };
        this._process(particle, distMouse, timeSpent, sizeData);
        const opacityData = {
          bubbleObj: {
            optValue: bubbleOptions.opacity,
            value: particle.bubble.opacity
          },
          particlesObj: {
            optValue: getRangeMax(particle.options.opacity.value),
            value: ((_a = particle.opacity) == null ? void 0 : _a.value) ?? 1
          },
          type: "opacity"
        };
        this._process(particle, distMouse, timeSpent, opacityData);
        if (!bubble.durationEnd && distMouse <= distance) {
          this._hoverBubbleColor(particle, distMouse);
        } else {
          delete particle.bubble.color;
        }
      }
    };
    this._hoverBubble = () => {
      const container2 = this.container, mousePos = container2.interactivity.mouse.position, distance = container2.retina.bubbleModeDistance;
      if (!distance || distance < 0 || mousePos === void 0) {
        return;
      }
      const query = container2.particles.quadTree.queryCircle(mousePos, distance, (p) => this.isEnabled(p));
      for (const particle of query) {
        particle.bubble.inRange = true;
        const pos = particle.getPosition(), pointDistance = getDistance(pos, mousePos), ratio = 1 - pointDistance / distance;
        if (pointDistance <= distance) {
          if (ratio >= 0 && container2.interactivity.status === mouseMoveEvent) {
            this._hoverBubbleSize(particle, ratio);
            this._hoverBubbleOpacity(particle, ratio);
            this._hoverBubbleColor(particle, ratio);
          }
        } else {
          this.reset(particle);
        }
        if (container2.interactivity.status === mouseLeaveEvent) {
          this.reset(particle);
        }
      }
    };
    this._hoverBubbleColor = (particle, ratio, divBubble) => {
      const options = this.container.actualOptions, bubbleOptions = divBubble ?? options.interactivity.modes.bubble;
      if (!bubbleOptions) {
        return;
      }
      if (!particle.bubble.finalColor) {
        const modeColor = bubbleOptions.color;
        if (!modeColor) {
          return;
        }
        const bubbleColor = itemFromSingleOrMultiple(modeColor);
        particle.bubble.finalColor = rangeColorToHsl(bubbleColor);
      }
      if (!particle.bubble.finalColor) {
        return;
      }
      if (bubbleOptions.mix) {
        particle.bubble.color = void 0;
        const pColor = particle.getFillColor();
        particle.bubble.color = pColor ? rgbToHsl(colorMix(pColor, particle.bubble.finalColor, 1 - ratio, ratio)) : particle.bubble.finalColor;
      } else {
        particle.bubble.color = particle.bubble.finalColor;
      }
    };
    this._hoverBubbleOpacity = (particle, ratio, divBubble) => {
      var _a, _b;
      const container2 = this.container, options = container2.actualOptions, modeOpacity = (divBubble == null ? void 0 : divBubble.opacity) ?? ((_a = options.interactivity.modes.bubble) == null ? void 0 : _a.opacity);
      if (!modeOpacity) {
        return;
      }
      const optOpacity = particle.options.opacity.value, pOpacity = ((_b = particle.opacity) == null ? void 0 : _b.value) ?? 1, opacity = calculateBubbleValue(pOpacity, modeOpacity, getRangeMax(optOpacity), ratio);
      if (opacity !== void 0) {
        particle.bubble.opacity = opacity;
      }
    };
    this._hoverBubbleSize = (particle, ratio, divBubble) => {
      const container2 = this.container, modeSize = (divBubble == null ? void 0 : divBubble.size) ? divBubble.size * container2.retina.pixelRatio : container2.retina.bubbleModeSize;
      if (modeSize === void 0) {
        return;
      }
      const optSize = getRangeMax(particle.options.size.value) * container2.retina.pixelRatio, pSize = particle.size.value, size = calculateBubbleValue(pSize, modeSize, optSize, ratio);
      if (size !== void 0) {
        particle.bubble.radius = size;
      }
    };
    this._process = (particle, distMouse, timeSpent, data) => {
      const container2 = this.container, bubbleParam = data.bubbleObj.optValue, options = container2.actualOptions, bubbleOptions = options.interactivity.modes.bubble;
      if (!bubbleOptions || bubbleParam === void 0) {
        return;
      }
      const bubbleDuration = bubbleOptions.duration, bubbleDistance = container2.retina.bubbleModeDistance, particlesParam = data.particlesObj.optValue, pObjBubble = data.bubbleObj.value, pObj = data.particlesObj.value || 0, type = data.type;
      if (!bubbleDistance || bubbleDistance < 0 || bubbleParam === particlesParam) {
        return;
      }
      if (!container2.bubble) {
        container2.bubble = {};
      }
      if (container2.bubble.durationEnd) {
        if (pObjBubble) {
          if (type === "size") {
            delete particle.bubble.radius;
          }
          if (type === "opacity") {
            delete particle.bubble.opacity;
          }
        }
      } else {
        if (distMouse <= bubbleDistance) {
          const obj = pObjBubble ?? pObj;
          if (obj !== bubbleParam) {
            const value = pObj - timeSpent * (pObj - bubbleParam) / bubbleDuration;
            if (type === "size") {
              particle.bubble.radius = value;
            }
            if (type === "opacity") {
              particle.bubble.opacity = value;
            }
          }
        } else {
          if (type === "size") {
            delete particle.bubble.radius;
          }
          if (type === "opacity") {
            delete particle.bubble.opacity;
          }
        }
      }
    };
    this._singleSelectorHover = (delta, selector, div) => {
      const container2 = this.container, selectors = document.querySelectorAll(selector), bubble = container2.actualOptions.interactivity.modes.bubble;
      if (!bubble || !selectors.length) {
        return;
      }
      selectors.forEach((item) => {
        const elem = item, pxRatio = container2.retina.pixelRatio, pos = {
          x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
          y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio
        }, repulseRadius = elem.offsetWidth / 2 * pxRatio, area = div.type === "circle" ? new Circle(pos.x, pos.y, repulseRadius) : new Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio), query = container2.particles.quadTree.query(area, (p) => this.isEnabled(p));
        for (const particle of query) {
          if (!area.contains(particle.getPosition())) {
            continue;
          }
          particle.bubble.inRange = true;
          const divs = bubble.divs, divBubble = divMode(divs, elem);
          if (!particle.bubble.div || particle.bubble.div !== elem) {
            this.clear(particle, delta, true);
            particle.bubble.div = elem;
          }
          this._hoverBubbleSize(particle, 1, divBubble);
          this._hoverBubbleOpacity(particle, 1, divBubble);
          this._hoverBubbleColor(particle, 1, divBubble);
        }
      });
    };
    if (!container.bubble) {
      container.bubble = {};
    }
    this.handleClickMode = (mode) => {
      if (mode !== "bubble") {
        return;
      }
      if (!container.bubble) {
        container.bubble = {};
      }
      container.bubble.clicking = true;
    };
  }
  clear(particle, delta, force) {
    if (particle.bubble.inRange && !force) {
      return;
    }
    delete particle.bubble.div;
    delete particle.bubble.opacity;
    delete particle.bubble.radius;
    delete particle.bubble.color;
  }
  init() {
    const container = this.container, bubble = container.actualOptions.interactivity.modes.bubble;
    if (!bubble) {
      return;
    }
    container.retina.bubbleModeDistance = bubble.distance * container.retina.pixelRatio;
    if (bubble.size !== void 0) {
      container.retina.bubbleModeSize = bubble.size * container.retina.pixelRatio;
    }
  }
  async interact(delta) {
    const options = this.container.actualOptions, events = options.interactivity.events, onHover = events.onHover, onClick = events.onClick, hoverEnabled = onHover.enable, hoverMode = onHover.mode, clickEnabled = onClick.enable, clickMode = onClick.mode, divs = events.onDiv;
    if (hoverEnabled && isInArray("bubble", hoverMode)) {
      this._hoverBubble();
    } else if (clickEnabled && isInArray("bubble", clickMode)) {
      this._clickBubble();
    } else {
      divModeExecute("bubble", divs, (selector, div) => this._singleSelectorHover(delta, selector, div));
    }
  }
  isEnabled(particle) {
    const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = ((particle == null ? void 0 : particle.interactivity) ?? options.interactivity).events, { onClick, onDiv, onHover } = events, divBubble = isDivModeEnabled("bubble", onDiv);
    if (!(divBubble || onHover.enable && mouse.position || onClick.enable && mouse.clickPosition)) {
      return false;
    }
    return isInArray("bubble", onHover.mode) || isInArray("bubble", onClick.mode) || divBubble;
  }
  loadModeOptions(options, ...sources) {
    if (!options.bubble) {
      options.bubble = new Bubble();
    }
    for (const source of sources) {
      options.bubble.load(source == null ? void 0 : source.bubble);
    }
  }
  reset(particle) {
    particle.bubble.inRange = false;
  }
};

// node_modules/tsparticles-interaction-external-bubble/esm/index.js
async function loadExternalBubbleInteraction(engine, refresh = true) {
  await engine.addInteractor("externalBubble", (container) => new Bubbler(container), refresh);
}

// node_modules/tsparticles-interaction-external-connect/esm/Options/Classes/ConnectLinks.js
var ConnectLinks = class {
  constructor() {
    this.opacity = 0.5;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
  }
};

// node_modules/tsparticles-interaction-external-connect/esm/Options/Classes/Connect.js
var Connect = class {
  constructor() {
    this.distance = 80;
    this.links = new ConnectLinks();
    this.radius = 60;
  }
  get lineLinked() {
    return this.links;
  }
  set lineLinked(value) {
    this.links = value;
  }
  get line_linked() {
    return this.links;
  }
  set line_linked(value) {
    this.links = value;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    this.links.load(data.links ?? data.lineLinked ?? data.line_linked);
    if (data.radius !== void 0) {
      this.radius = data.radius;
    }
  }
};

// node_modules/tsparticles-interaction-external-connect/esm/Utils.js
function gradient(context, p1, p2, opacity) {
  const gradStop = Math.floor(p2.getRadius() / p1.getRadius()), color1 = p1.getFillColor(), color2 = p2.getFillColor();
  if (!color1 || !color2) {
    return;
  }
  const sourcePos = p1.getPosition(), destPos = p2.getPosition(), midRgb = colorMix(color1, color2, p1.getRadius(), p2.getRadius()), grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);
  grad.addColorStop(0, getStyleFromHsl(color1, opacity));
  grad.addColorStop(gradStop > 1 ? 1 : gradStop, getStyleFromRgb(midRgb, opacity));
  grad.addColorStop(1, getStyleFromHsl(color2, opacity));
  return grad;
}
function drawConnectLine(context, width, lineStyle2, begin, end) {
  drawLine(context, begin, end);
  context.lineWidth = width;
  context.strokeStyle = lineStyle2;
  context.stroke();
}
function lineStyle(container, ctx, p1, p2) {
  const options = container.actualOptions, connectOptions = options.interactivity.modes.connect;
  if (!connectOptions) {
    return;
  }
  return gradient(ctx, p1, p2, connectOptions.links.opacity);
}
function drawConnection(container, p1, p2) {
  container.canvas.draw((ctx) => {
    const ls = lineStyle(container, ctx, p1, p2);
    if (!ls) {
      return;
    }
    const pos1 = p1.getPosition(), pos2 = p2.getPosition();
    drawConnectLine(ctx, p1.retina.linksWidth ?? 0, ls, pos1, pos2);
  });
}

// node_modules/tsparticles-interaction-external-connect/esm/Connector.js
var Connector = class extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {
  }
  init() {
    const container = this.container, connect = container.actualOptions.interactivity.modes.connect;
    if (!connect) {
      return;
    }
    container.retina.connectModeDistance = connect.distance * container.retina.pixelRatio;
    container.retina.connectModeRadius = connect.radius * container.retina.pixelRatio;
  }
  async interact() {
    const container = this.container, options = container.actualOptions;
    if (options.interactivity.events.onHover.enable && container.interactivity.status === "pointermove") {
      const mousePos = container.interactivity.mouse.position;
      if (!container.retina.connectModeDistance || container.retina.connectModeDistance < 0 || !container.retina.connectModeRadius || container.retina.connectModeRadius < 0 || !mousePos) {
        return;
      }
      const distance = Math.abs(container.retina.connectModeRadius), query = container.particles.quadTree.queryCircle(mousePos, distance, (p) => this.isEnabled(p));
      let i = 0;
      for (const p1 of query) {
        const pos1 = p1.getPosition();
        for (const p2 of query.slice(i + 1)) {
          const pos2 = p2.getPosition(), distMax = Math.abs(container.retina.connectModeDistance), xDiff = Math.abs(pos1.x - pos2.x), yDiff = Math.abs(pos1.y - pos2.y);
          if (xDiff < distMax && yDiff < distMax) {
            drawConnection(container, p1, p2);
          }
        }
        ++i;
      }
    }
  }
  isEnabled(particle) {
    const container = this.container, mouse = container.interactivity.mouse, events = ((particle == null ? void 0 : particle.interactivity) ?? container.actualOptions.interactivity).events;
    if (!(events.onHover.enable && mouse.position)) {
      return false;
    }
    return isInArray("connect", events.onHover.mode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.connect) {
      options.connect = new Connect();
    }
    for (const source of sources) {
      options.connect.load(source == null ? void 0 : source.connect);
    }
  }
  reset() {
  }
};

// node_modules/tsparticles-interaction-external-connect/esm/index.js
async function loadExternalConnectInteraction(engine, refresh = true) {
  await engine.addInteractor("externalConnect", (container) => new Connector(container), refresh);
}

// node_modules/tsparticles-interaction-external-grab/esm/Options/Classes/GrabLinks.js
var GrabLinks = class {
  constructor() {
    this.blink = false;
    this.consent = false;
    this.opacity = 1;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.blink !== void 0) {
      this.blink = data.blink;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.consent !== void 0) {
      this.consent = data.consent;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
  }
};

// node_modules/tsparticles-interaction-external-grab/esm/Options/Classes/Grab.js
var Grab = class {
  constructor() {
    this.distance = 100;
    this.links = new GrabLinks();
  }
  get lineLinked() {
    return this.links;
  }
  set lineLinked(value) {
    this.links = value;
  }
  get line_linked() {
    return this.links;
  }
  set line_linked(value) {
    this.links = value;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    this.links.load(data.links ?? data.lineLinked ?? data.line_linked);
  }
};

// node_modules/tsparticles-interaction-external-grab/esm/Utils.js
function drawGrabLine(context, width, begin, end, colorLine, opacity) {
  drawLine(context, begin, end);
  context.strokeStyle = getStyleFromRgb(colorLine, opacity);
  context.lineWidth = width;
  context.stroke();
}
function drawGrab(container, particle, lineColor, opacity, mousePos) {
  container.canvas.draw((ctx) => {
    const beginPos = particle.getPosition();
    drawGrabLine(ctx, particle.retina.linksWidth ?? 0, beginPos, mousePos, lineColor, opacity);
  });
}

// node_modules/tsparticles-interaction-external-grab/esm/Grabber.js
var Grabber = class extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {
  }
  init() {
    const container = this.container, grab = container.actualOptions.interactivity.modes.grab;
    if (!grab) {
      return;
    }
    container.retina.grabModeDistance = grab.distance * container.retina.pixelRatio;
  }
  async interact() {
    var _a;
    const container = this.container, options = container.actualOptions, interactivity = options.interactivity;
    if (!interactivity.modes.grab || !interactivity.events.onHover.enable || container.interactivity.status !== mouseMoveEvent) {
      return;
    }
    const mousePos = container.interactivity.mouse.position;
    if (!mousePos) {
      return;
    }
    const distance = container.retina.grabModeDistance;
    if (!distance || distance < 0) {
      return;
    }
    const query = container.particles.quadTree.queryCircle(mousePos, distance, (p) => this.isEnabled(p));
    for (const particle of query) {
      const pos = particle.getPosition(), pointDistance = getDistance(pos, mousePos);
      if (pointDistance > distance) {
        continue;
      }
      const grabLineOptions = interactivity.modes.grab.links, lineOpacity = grabLineOptions.opacity, opacityLine = lineOpacity - pointDistance * lineOpacity / distance;
      if (opacityLine <= 0) {
        continue;
      }
      const optColor = grabLineOptions.color ?? ((_a = particle.options.links) == null ? void 0 : _a.color);
      if (!container.particles.grabLineColor && optColor) {
        const linksOptions = interactivity.modes.grab.links;
        container.particles.grabLineColor = getLinkRandomColor(optColor, linksOptions.blink, linksOptions.consent);
      }
      const colorLine = getLinkColor(particle, void 0, container.particles.grabLineColor);
      if (!colorLine) {
        continue;
      }
      drawGrab(container, particle, colorLine, opacityLine, mousePos);
    }
  }
  isEnabled(particle) {
    const container = this.container, mouse = container.interactivity.mouse, events = ((particle == null ? void 0 : particle.interactivity) ?? container.actualOptions.interactivity).events;
    return events.onHover.enable && !!mouse.position && isInArray("grab", events.onHover.mode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.grab) {
      options.grab = new Grab();
    }
    for (const source of sources) {
      options.grab.load(source == null ? void 0 : source.grab);
    }
  }
  reset() {
  }
};

// node_modules/tsparticles-interaction-external-grab/esm/index.js
async function loadExternalGrabInteraction(engine, refresh = true) {
  await engine.addInteractor("externalGrab", (container) => new Grabber(container), refresh);
}

// node_modules/tsparticles-interaction-external-pause/esm/Pauser.js
var Pauser = class extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this.handleClickMode = (mode) => {
      if (mode !== "pause") {
        return;
      }
      const container2 = this.container;
      if (container2.getAnimationStatus()) {
        container2.pause();
      } else {
        container2.play();
      }
    };
  }
  clear() {
  }
  init() {
  }
  async interact() {
  }
  isEnabled() {
    return true;
  }
  reset() {
  }
};

// node_modules/tsparticles-interaction-external-pause/esm/index.js
async function loadExternalPauseInteraction(engine, refresh = true) {
  await engine.addInteractor("externalPause", (container) => new Pauser(container), refresh);
}

// node_modules/tsparticles-interaction-external-push/esm/Options/Classes/Push.js
var Push = class {
  constructor() {
    this.default = true;
    this.groups = [];
    this.quantity = 4;
  }
  get particles_nb() {
    return this.quantity;
  }
  set particles_nb(value) {
    this.quantity = setRangeValue(value);
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.default !== void 0) {
      this.default = data.default;
    }
    if (data.groups !== void 0) {
      this.groups = data.groups.map((t) => t);
    }
    if (!this.groups.length) {
      this.default = true;
    }
    const quantity = data.quantity ?? data.particles_nb;
    if (quantity !== void 0) {
      this.quantity = setRangeValue(quantity);
    }
  }
};

// node_modules/tsparticles-interaction-external-push/esm/Pusher.js
var Pusher = class extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this.handleClickMode = (mode) => {
      if (mode !== "push") {
        return;
      }
      const container2 = this.container, options = container2.actualOptions, pushOptions = options.interactivity.modes.push;
      if (!pushOptions) {
        return;
      }
      const quantity = getRangeValue(pushOptions.quantity);
      if (quantity <= 0) {
        return;
      }
      const group = itemFromArray([void 0, ...pushOptions.groups]), groupOptions = group !== void 0 ? container2.actualOptions.particles.groups[group] : void 0;
      container2.particles.push(quantity, container2.interactivity.mouse, groupOptions, group);
    };
  }
  clear() {
  }
  init() {
  }
  async interact() {
  }
  isEnabled() {
    return true;
  }
  loadModeOptions(options, ...sources) {
    if (!options.push) {
      options.push = new Push();
    }
    for (const source of sources) {
      options.push.load(source == null ? void 0 : source.push);
    }
  }
  reset() {
  }
};

// node_modules/tsparticles-interaction-external-push/esm/index.js
async function loadExternalPushInteraction(engine, refresh = true) {
  await engine.addInteractor("externalPush", (container) => new Pusher(container), refresh);
}

// node_modules/tsparticles-interaction-external-remove/esm/Options/Classes/Remove.js
var Remove = class {
  constructor() {
    this.quantity = 2;
  }
  get particles_nb() {
    return this.quantity;
  }
  set particles_nb(value) {
    this.quantity = setRangeValue(value);
  }
  load(data) {
    if (!data) {
      return;
    }
    const quantity = data.quantity ?? data.particles_nb;
    if (quantity !== void 0) {
      this.quantity = setRangeValue(quantity);
    }
  }
};

// node_modules/tsparticles-interaction-external-remove/esm/Remover.js
var Remover = class extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this.handleClickMode = (mode) => {
      const container2 = this.container, options = container2.actualOptions;
      if (!options.interactivity.modes.remove || mode !== "remove") {
        return;
      }
      const removeNb = getRangeValue(options.interactivity.modes.remove.quantity);
      container2.particles.removeQuantity(removeNb);
    };
  }
  clear() {
  }
  init() {
  }
  async interact() {
  }
  isEnabled() {
    return true;
  }
  loadModeOptions(options, ...sources) {
    if (!options.remove) {
      options.remove = new Remove();
    }
    for (const source of sources) {
      options.remove.load(source == null ? void 0 : source.remove);
    }
  }
  reset() {
  }
};

// node_modules/tsparticles-interaction-external-remove/esm/index.js
async function loadExternalRemoveInteraction(engine, refresh = true) {
  await engine.addInteractor("externalRemove", (container) => new Remover(container), refresh);
}

// node_modules/tsparticles-interaction-external-repulse/esm/Options/Classes/RepulseBase.js
var RepulseBase = class {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.factor = 100;
    this.speed = 1;
    this.maxSpeed = 50;
    this.easing = "ease-out-quad";
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    if (data.duration !== void 0) {
      this.duration = data.duration;
    }
    if (data.easing !== void 0) {
      this.easing = data.easing;
    }
    if (data.factor !== void 0) {
      this.factor = data.factor;
    }
    if (data.speed !== void 0) {
      this.speed = data.speed;
    }
    if (data.maxSpeed !== void 0) {
      this.maxSpeed = data.maxSpeed;
    }
  }
};

// node_modules/tsparticles-interaction-external-repulse/esm/Options/Classes/RepulseDiv.js
var RepulseDiv = class extends RepulseBase {
  constructor() {
    super();
    this.selectors = [];
  }
  get ids() {
    return executeOnSingleOrMultiple(this.selectors, (t) => t.replace("#", ""));
  }
  set ids(value) {
    this.selectors = executeOnSingleOrMultiple(value, (t) => `#${t}`);
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    if (data.ids !== void 0) {
      this.ids = data.ids;
    }
    if (data.selectors !== void 0) {
      this.selectors = data.selectors;
    }
  }
};

// node_modules/tsparticles-interaction-external-repulse/esm/Options/Classes/Repulse.js
var Repulse = class extends RepulseBase {
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    this.divs = executeOnSingleOrMultiple(data.divs, (div) => {
      const tmp = new RepulseDiv();
      tmp.load(div);
      return tmp;
    });
  }
};

// node_modules/tsparticles-interaction-external-repulse/esm/Repulser.js
var Repulser = class extends ExternalInteractorBase {
  constructor(engine, container) {
    super(container);
    this._clickRepulse = () => {
      const container2 = this.container, repulseOptions = container2.actualOptions.interactivity.modes.repulse;
      if (!repulseOptions) {
        return;
      }
      const repulse = container2.repulse || { particles: [] };
      if (!repulse.finish) {
        if (!repulse.count) {
          repulse.count = 0;
        }
        repulse.count++;
        if (repulse.count === container2.particles.count) {
          repulse.finish = true;
        }
      }
      if (repulse.clicking) {
        const repulseDistance = container2.retina.repulseModeDistance;
        if (!repulseDistance || repulseDistance < 0) {
          return;
        }
        const repulseRadius = Math.pow(repulseDistance / 6, 3), mouseClickPos = container2.interactivity.mouse.clickPosition;
        if (mouseClickPos === void 0) {
          return;
        }
        const range = new Circle(mouseClickPos.x, mouseClickPos.y, repulseRadius), query = container2.particles.quadTree.query(range, (p) => this.isEnabled(p));
        for (const particle of query) {
          const { dx, dy, distance } = getDistances(mouseClickPos, particle.position), d = distance ** 2, velocity = repulseOptions.speed, force = -repulseRadius * velocity / d;
          if (d <= repulseRadius) {
            repulse.particles.push(particle);
            const vect = Vector.create(dx, dy);
            vect.length = force;
            particle.velocity.setTo(vect);
          }
        }
      } else if (repulse.clicking === false) {
        for (const particle of repulse.particles) {
          particle.velocity.setTo(particle.initialVelocity);
        }
        repulse.particles = [];
      }
    };
    this._hoverRepulse = () => {
      const container2 = this.container, mousePos = container2.interactivity.mouse.position, repulseRadius = container2.retina.repulseModeDistance;
      if (!repulseRadius || repulseRadius < 0 || !mousePos) {
        return;
      }
      this._processRepulse(mousePos, repulseRadius, new Circle(mousePos.x, mousePos.y, repulseRadius));
    };
    this._processRepulse = (position, repulseRadius, area, divRepulse) => {
      const container2 = this.container, query = container2.particles.quadTree.query(area, (p) => this.isEnabled(p)), repulseOptions = container2.actualOptions.interactivity.modes.repulse;
      if (!repulseOptions) {
        return;
      }
      for (const particle of query) {
        const { dx, dy, distance } = getDistances(particle.position, position), velocity = ((divRepulse == null ? void 0 : divRepulse.speed) ?? repulseOptions.speed) * repulseOptions.factor, repulseFactor = clamp(getEasing(repulseOptions.easing)(1 - distance / repulseRadius) * velocity, 0, repulseOptions.maxSpeed), normVec = Vector.create(distance === 0 ? velocity : dx / distance * repulseFactor, distance === 0 ? velocity : dy / distance * repulseFactor);
        particle.position.addTo(normVec);
      }
    };
    this._singleSelectorRepulse = (selector, div) => {
      const container2 = this.container, repulse = container2.actualOptions.interactivity.modes.repulse;
      if (!repulse) {
        return;
      }
      const query = document.querySelectorAll(selector);
      if (!query.length) {
        return;
      }
      query.forEach((item) => {
        const elem = item, pxRatio = container2.retina.pixelRatio, pos = {
          x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
          y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio
        }, repulseRadius = elem.offsetWidth / 2 * pxRatio, area = div.type === "circle" ? new Circle(pos.x, pos.y, repulseRadius) : new Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio), divs = repulse.divs, divRepulse = divMode(divs, elem);
        this._processRepulse(pos, repulseRadius, area, divRepulse);
      });
    };
    this._engine = engine;
    if (!container.repulse) {
      container.repulse = { particles: [] };
    }
    this.handleClickMode = (mode) => {
      const options = this.container.actualOptions, repulseOpts = options.interactivity.modes.repulse;
      if (!repulseOpts || mode !== "repulse") {
        return;
      }
      if (!container.repulse) {
        container.repulse = { particles: [] };
      }
      const repulse = container.repulse;
      repulse.clicking = true;
      repulse.count = 0;
      for (const particle of container.repulse.particles) {
        if (!this.isEnabled(particle)) {
          continue;
        }
        particle.velocity.setTo(particle.initialVelocity);
      }
      repulse.particles = [];
      repulse.finish = false;
      setTimeout(() => {
        if (container.destroyed) {
          return;
        }
        repulse.clicking = false;
      }, repulseOpts.duration * 1e3);
    };
  }
  clear() {
  }
  init() {
    const container = this.container, repulse = container.actualOptions.interactivity.modes.repulse;
    if (!repulse) {
      return;
    }
    container.retina.repulseModeDistance = repulse.distance * container.retina.pixelRatio;
  }
  async interact() {
    const container = this.container, options = container.actualOptions, mouseMoveStatus = container.interactivity.status === mouseMoveEvent, events = options.interactivity.events, hover = events.onHover, hoverEnabled = hover.enable, hoverMode = hover.mode, click = events.onClick, clickEnabled = click.enable, clickMode = click.mode, divs = events.onDiv;
    if (mouseMoveStatus && hoverEnabled && isInArray("repulse", hoverMode)) {
      this._hoverRepulse();
    } else if (clickEnabled && isInArray("repulse", clickMode)) {
      this._clickRepulse();
    } else {
      divModeExecute("repulse", divs, (selector, div) => this._singleSelectorRepulse(selector, div));
    }
  }
  isEnabled(particle) {
    const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = ((particle == null ? void 0 : particle.interactivity) ?? options.interactivity).events, divs = events.onDiv, hover = events.onHover, click = events.onClick, divRepulse = isDivModeEnabled("repulse", divs);
    if (!(divRepulse || hover.enable && mouse.position || click.enable && mouse.clickPosition)) {
      return false;
    }
    const hoverMode = hover.mode, clickMode = click.mode;
    return isInArray("repulse", hoverMode) || isInArray("repulse", clickMode) || divRepulse;
  }
  loadModeOptions(options, ...sources) {
    if (!options.repulse) {
      options.repulse = new Repulse();
    }
    for (const source of sources) {
      options.repulse.load(source == null ? void 0 : source.repulse);
    }
  }
  reset() {
  }
};

// node_modules/tsparticles-interaction-external-repulse/esm/index.js
async function loadExternalRepulseInteraction(engine, refresh = true) {
  await engine.addInteractor("externalRepulse", (container) => new Repulser(engine, container), refresh);
}

// node_modules/tsparticles-interaction-external-slow/esm/Options/Classes/Slow.js
var Slow = class {
  constructor() {
    this.factor = 3;
    this.radius = 200;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.factor !== void 0) {
      this.factor = data.factor;
    }
    if (data.radius !== void 0) {
      this.radius = data.radius;
    }
  }
};

// node_modules/tsparticles-interaction-external-slow/esm/Slower.js
var Slower = class extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }
  clear(particle, delta, force) {
    if (particle.slow.inRange && !force) {
      return;
    }
    particle.slow.factor = 1;
  }
  init() {
    const container = this.container, slow = container.actualOptions.interactivity.modes.slow;
    if (!slow) {
      return;
    }
    container.retina.slowModeRadius = slow.radius * container.retina.pixelRatio;
  }
  async interact() {
  }
  isEnabled(particle) {
    const container = this.container, mouse = container.interactivity.mouse, events = ((particle == null ? void 0 : particle.interactivity) ?? container.actualOptions.interactivity).events;
    return events.onHover.enable && !!mouse.position && isInArray("slow", events.onHover.mode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.slow) {
      options.slow = new Slow();
    }
    for (const source of sources) {
      options.slow.load(source == null ? void 0 : source.slow);
    }
  }
  reset(particle) {
    particle.slow.inRange = false;
    const container = this.container, options = container.actualOptions, mousePos = container.interactivity.mouse.position, radius = container.retina.slowModeRadius, slowOptions = options.interactivity.modes.slow;
    if (!slowOptions || !radius || radius < 0 || !mousePos) {
      return;
    }
    const particlePos = particle.getPosition(), dist = getDistance(mousePos, particlePos), proximityFactor = dist / radius, slowFactor = slowOptions.factor, { slow } = particle;
    if (dist > radius) {
      return;
    }
    slow.inRange = true;
    slow.factor = proximityFactor / slowFactor;
  }
};

// node_modules/tsparticles-interaction-external-slow/esm/index.js
async function loadExternalSlowInteraction(engine, refresh = true) {
  await engine.addInteractor("externalSlow", (container) => new Slower(container), refresh);
}

// node_modules/tsparticles-shape-image/esm/GifUtils/Constants.js
var InterlaceOffsets = [0, 4, 2, 1];
var InterlaceSteps = [8, 8, 4, 2];

// node_modules/tsparticles-shape-image/esm/GifUtils/ByteStream.js
var ByteStream = class {
  constructor(bytes) {
    this.pos = 0;
    this.data = new Uint8ClampedArray(bytes);
  }
  getString(count) {
    const slice = this.data.slice(this.pos, this.pos + count);
    this.pos += slice.length;
    return slice.reduce((acc, curr) => acc + String.fromCharCode(curr), "");
  }
  nextByte() {
    return this.data[this.pos++];
  }
  nextTwoBytes() {
    this.pos += 2;
    return this.data[this.pos - 2] + (this.data[this.pos - 1] << 8);
  }
  readSubBlocks() {
    let blockString = "", size = 0;
    do {
      size = this.data[this.pos++];
      for (let count = size; --count >= 0; blockString += String.fromCharCode(this.data[this.pos++])) {
      }
    } while (size !== 0);
    return blockString;
  }
  readSubBlocksBin() {
    let size = 0, len = 0;
    for (let offset = 0; (size = this.data[this.pos + offset]) !== 0; offset += size + 1) {
      len += size;
    }
    const blockData = new Uint8Array(len);
    for (let i = 0; (size = this.data[this.pos++]) !== 0; ) {
      for (let count = size; --count >= 0; blockData[i++] = this.data[this.pos++]) {
      }
    }
    return blockData;
  }
  skipSubBlocks() {
    for (; this.data[this.pos] !== 0; this.pos += this.data[this.pos] + 1) {
    }
    this.pos++;
  }
};

// node_modules/tsparticles-shape-image/esm/GifUtils/Utils.js
function parseColorTable(byteStream, count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push({
      r: byteStream.data[byteStream.pos],
      g: byteStream.data[byteStream.pos + 1],
      b: byteStream.data[byteStream.pos + 2]
    });
    byteStream.pos += 3;
  }
  return colors;
}
async function parseExtensionBlock(byteStream, gif, getFrameIndex, getTransparencyIndex) {
  switch (byteStream.nextByte()) {
    case 249: {
      const frame = gif.frames[getFrameIndex(false)];
      byteStream.pos++;
      const packedByte = byteStream.nextByte();
      frame.GCreserved = (packedByte & 224) >>> 5;
      frame.disposalMethod = (packedByte & 28) >>> 2;
      frame.userInputDelayFlag = (packedByte & 2) === 2;
      const transparencyFlag = (packedByte & 1) === 1;
      frame.delayTime = byteStream.nextTwoBytes() * 10;
      const transparencyIndex = byteStream.nextByte();
      if (transparencyFlag) {
        getTransparencyIndex(transparencyIndex);
      }
      byteStream.pos++;
      break;
    }
    case 255: {
      byteStream.pos++;
      const applicationExtension = {
        identifier: byteStream.getString(8),
        authenticationCode: byteStream.getString(3),
        data: byteStream.readSubBlocksBin()
      };
      gif.applicationExtensions.push(applicationExtension);
      break;
    }
    case 254: {
      gif.comments.push([getFrameIndex(false), byteStream.readSubBlocks()]);
      break;
    }
    case 1: {
      if (gif.globalColorTable.length === 0) {
        throw new EvalError("plain text extension without global color table");
      }
      byteStream.pos++;
      gif.frames[getFrameIndex(false)].plainTextData = {
        left: byteStream.nextTwoBytes(),
        top: byteStream.nextTwoBytes(),
        width: byteStream.nextTwoBytes(),
        height: byteStream.nextTwoBytes(),
        charSize: {
          width: byteStream.nextTwoBytes(),
          height: byteStream.nextTwoBytes()
        },
        foregroundColor: byteStream.nextByte(),
        backgroundColor: byteStream.nextByte(),
        text: byteStream.readSubBlocks()
      };
      break;
    }
    default:
      byteStream.skipSubBlocks();
      break;
  }
}
async function parseImageBlock(byteStream, gif, avgAlpha, getFrameIndex, getTransparencyIndex, progressCallback) {
  const frame = gif.frames[getFrameIndex(true)];
  frame.left = byteStream.nextTwoBytes();
  frame.top = byteStream.nextTwoBytes();
  frame.width = byteStream.nextTwoBytes();
  frame.height = byteStream.nextTwoBytes();
  const packedByte = byteStream.nextByte(), localColorTableFlag = (packedByte & 128) === 128, interlacedFlag = (packedByte & 64) === 64;
  frame.sortFlag = (packedByte & 32) === 32;
  frame.reserved = (packedByte & 24) >>> 3;
  const localColorCount = 1 << (packedByte & 7) + 1;
  if (localColorTableFlag) {
    frame.localColorTable = parseColorTable(byteStream, localColorCount);
  }
  const getColor = (index) => {
    const { r, g, b } = (localColorTableFlag ? frame.localColorTable : gif.globalColorTable)[index];
    return { r, g, b, a: index === getTransparencyIndex(null) ? avgAlpha ? ~~((r + g + b) / 3) : 0 : 255 };
  };
  const image = (() => {
    try {
      return new ImageData(frame.width, frame.height, { colorSpace: "srgb" });
    } catch (error) {
      if (error instanceof DOMException && error.name === "IndexSizeError") {
        return null;
      }
      throw error;
    }
  })();
  if (image == null) {
    throw new EvalError("GIF frame size is to large");
  }
  const minCodeSize = byteStream.nextByte(), imageData = byteStream.readSubBlocksBin(), clearCode = 1 << minCodeSize;
  const readBits = (pos, len) => {
    const bytePos = pos >>> 3, bitPos = pos & 7;
    return (imageData[bytePos] + (imageData[bytePos + 1] << 8) + (imageData[bytePos + 2] << 16) & (1 << len) - 1 << bitPos) >>> bitPos;
  };
  if (interlacedFlag) {
    for (let code = 0, size = minCodeSize + 1, pos = 0, dic = [[0]], pass = 0; pass < 4; pass++) {
      if (InterlaceOffsets[pass] < frame.height) {
        for (let pixelPos = 0, lineIndex = 0; ; ) {
          const last = code;
          code = readBits(pos, size);
          pos += size + 1;
          if (code === clearCode) {
            size = minCodeSize + 1;
            dic.length = clearCode + 2;
            for (let i = 0; i < dic.length; i++) {
              dic[i] = i < clearCode ? [i] : [];
            }
          } else {
            if (code >= dic.length) {
              dic.push(dic[last].concat(dic[last][0]));
            } else if (last !== clearCode) {
              dic.push(dic[last].concat(dic[code][0]));
            }
            for (let i = 0; i < dic[code].length; i++) {
              const { r, g, b, a } = getColor(dic[code][i]);
              image.data.set([r, g, b, a], InterlaceOffsets[pass] * frame.width + InterlaceSteps[pass] * lineIndex + pixelPos % (frame.width * 4));
              pixelPos += 4;
            }
            if (dic.length === 1 << size && size < 12) {
              size++;
            }
          }
          if (pixelPos === frame.width * 4 * (lineIndex + 1)) {
            lineIndex++;
            if (InterlaceOffsets[pass] + InterlaceSteps[pass] * lineIndex >= frame.height) {
              break;
            }
          }
        }
      }
      progressCallback == null ? void 0 : progressCallback(byteStream.pos / (byteStream.data.length - 1), getFrameIndex(false) + 1, image, { x: frame.left, y: frame.top }, { width: gif.width, height: gif.height });
    }
    frame.image = image;
    frame.bitmap = await createImageBitmap(image);
  } else {
    for (let code = 0, size = minCodeSize + 1, pos = 0, dic = [[0]], pixelPos = -4; ; ) {
      const last = code;
      code = readBits(pos, size);
      pos += size;
      if (code === clearCode) {
        size = minCodeSize + 1;
        dic.length = clearCode + 2;
        for (let i = 0; i < dic.length; i++) {
          dic[i] = i < clearCode ? [i] : [];
        }
      } else {
        if (code === clearCode + 1) {
          break;
        }
        if (code >= dic.length) {
          dic.push(dic[last].concat(dic[last][0]));
        } else if (last !== clearCode) {
          dic.push(dic[last].concat(dic[code][0]));
        }
        for (let i = 0; i < dic[code].length; i++) {
          const { r, g, b, a } = getColor(dic[code][i]);
          image.data.set([r, g, b, a], pixelPos += 4);
        }
        if (dic.length >= 1 << size && size < 12) {
          size++;
        }
      }
    }
    frame.image = image;
    frame.bitmap = await createImageBitmap(image);
    progressCallback == null ? void 0 : progressCallback((byteStream.pos + 1) / byteStream.data.length, getFrameIndex(false) + 1, frame.image, { x: frame.left, y: frame.top }, { width: gif.width, height: gif.height });
  }
}
async function parseBlock(byteStream, gif, avgAlpha, getFrameIndex, getTransparencyIndex, progressCallback) {
  switch (byteStream.nextByte()) {
    case 59:
      return true;
    case 44:
      await parseImageBlock(byteStream, gif, avgAlpha, getFrameIndex, getTransparencyIndex, progressCallback);
      break;
    case 33:
      await parseExtensionBlock(byteStream, gif, getFrameIndex, getTransparencyIndex);
      break;
    default:
      throw new EvalError("undefined block found");
  }
  return false;
}
function getGIFLoopAmount(gif) {
  for (const extension of gif.applicationExtensions) {
    if (extension.identifier + extension.authenticationCode !== "NETSCAPE2.0") {
      continue;
    }
    return extension.data[1] + (extension.data[2] << 8);
  }
  return NaN;
}
async function decodeGIF(gifURL, progressCallback, avgAlpha) {
  if (!avgAlpha)
    avgAlpha = false;
  const res = await fetch(gifURL);
  if (!res.ok && res.status === 404) {
    throw new EvalError("file not found");
  }
  const buffer = await res.arrayBuffer();
  const gif = {
    width: 0,
    height: 0,
    totalTime: 0,
    colorRes: 0,
    pixelAspectRatio: 0,
    frames: [],
    sortFlag: false,
    globalColorTable: [],
    backgroundImage: new ImageData(1, 1, { colorSpace: "srgb" }),
    comments: [],
    applicationExtensions: []
  }, byteStream = new ByteStream(new Uint8ClampedArray(buffer));
  if (byteStream.getString(6) !== "GIF89a") {
    throw new Error("not a supported GIF file");
  }
  gif.width = byteStream.nextTwoBytes();
  gif.height = byteStream.nextTwoBytes();
  const packedByte = byteStream.nextByte(), globalColorTableFlag = (packedByte & 128) === 128;
  gif.colorRes = (packedByte & 112) >>> 4;
  gif.sortFlag = (packedByte & 8) === 8;
  const globalColorCount = 1 << (packedByte & 7) + 1, backgroundColorIndex = byteStream.nextByte();
  gif.pixelAspectRatio = byteStream.nextByte();
  if (gif.pixelAspectRatio !== 0) {
    gif.pixelAspectRatio = (gif.pixelAspectRatio + 15) / 64;
  }
  if (globalColorTableFlag) {
    gif.globalColorTable = parseColorTable(byteStream, globalColorCount);
  }
  const backgroundImage = (() => {
    try {
      return new ImageData(gif.width, gif.height, { colorSpace: "srgb" });
    } catch (error) {
      if (error instanceof DOMException && error.name === "IndexSizeError") {
        return null;
      }
      throw error;
    }
  })();
  if (backgroundImage == null) {
    throw new Error("GIF frame size is to large");
  }
  const { r, g, b } = gif.globalColorTable[backgroundColorIndex];
  backgroundImage.data.set(globalColorTableFlag ? [r, g, b, 255] : [0, 0, 0, 0]);
  for (let i = 4; i < backgroundImage.data.length; i *= 2) {
    backgroundImage.data.copyWithin(i, 0, i);
  }
  gif.backgroundImage = backgroundImage;
  let frameIndex = -1, incrementFrameIndex = true, transparencyIndex = -1;
  const getframeIndex = (increment) => {
    if (increment) {
      incrementFrameIndex = true;
    }
    return frameIndex;
  };
  const getTransparencyIndex = (newValue) => {
    if (newValue != null) {
      transparencyIndex = newValue;
    }
    return transparencyIndex;
  };
  try {
    do {
      if (incrementFrameIndex) {
        gif.frames.push({
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          disposalMethod: 0,
          image: new ImageData(1, 1, { colorSpace: "srgb" }),
          plainTextData: null,
          userInputDelayFlag: false,
          delayTime: 0,
          sortFlag: false,
          localColorTable: [],
          reserved: 0,
          GCreserved: 0
        });
        frameIndex++;
        transparencyIndex = -1;
        incrementFrameIndex = false;
      }
    } while (!await parseBlock(byteStream, gif, avgAlpha, getframeIndex, getTransparencyIndex, progressCallback));
    gif.frames.length--;
    for (const frame of gif.frames) {
      if (frame.userInputDelayFlag && frame.delayTime === 0) {
        gif.totalTime = Infinity;
        break;
      }
      gif.totalTime += frame.delayTime;
    }
    return gif;
  } catch (error) {
    if (error instanceof EvalError) {
      throw new Error(`error while parsing frame ${frameIndex} "${error.message}"`);
    }
    throw error;
  }
}

// node_modules/tsparticles-shape-image/esm/Utils.js
var currentColorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))|currentcolor/gi;
function replaceColorSvg(imageShape, color, opacity) {
  const { svgData } = imageShape;
  if (!svgData) {
    return "";
  }
  const colorStyle = getStyleFromHsl(color, opacity);
  if (svgData.includes("fill")) {
    return svgData.replace(currentColorRegex, () => colorStyle);
  }
  const preFillIndex = svgData.indexOf(">");
  return `${svgData.substring(0, preFillIndex)} fill="${colorStyle}"${svgData.substring(preFillIndex)}`;
}
async function loadImage(image) {
  return new Promise((resolve) => {
    image.loading = true;
    const img = new Image();
    image.element = img;
    img.addEventListener("load", () => {
      image.loading = false;
      resolve();
    });
    img.addEventListener("error", () => {
      image.element = void 0;
      image.error = true;
      image.loading = false;
      getLogger().error(`${errorPrefix} loading image: ${image.source}`);
      resolve();
    });
    img.src = image.source;
  });
}
async function loadGifImage(image) {
  if (image.type !== "gif") {
    await loadImage(image);
    return;
  }
  image.loading = true;
  try {
    image.gifData = await decodeGIF(image.source);
    image.gifLoopCount = getGIFLoopAmount(image.gifData) ?? 0;
    if (image.gifLoopCount === 0) {
      image.gifLoopCount = Infinity;
    }
  } catch {
    image.error = true;
  }
  image.loading = false;
}
async function downloadSvgImage(image) {
  if (image.type !== "svg") {
    await loadImage(image);
    return;
  }
  image.loading = true;
  const response = await fetch(image.source);
  if (!response.ok) {
    getLogger().error(`${errorPrefix} Image not found`);
    image.error = true;
  } else {
    image.svgData = await response.text();
  }
  image.loading = false;
}
function replaceImageColor(image, imageData, color, particle) {
  var _a;
  const svgColoredData = replaceColorSvg(image, color, ((_a = particle.opacity) == null ? void 0 : _a.value) ?? 1), imageRes = {
    color,
    gif: imageData.gif,
    data: {
      ...image,
      svgData: svgColoredData
    },
    loaded: false,
    ratio: imageData.width / imageData.height,
    replaceColor: imageData.replaceColor ?? imageData.replace_color,
    source: imageData.src
  };
  return new Promise((resolve) => {
    const svg = new Blob([svgColoredData], { type: "image/svg+xml" }), domUrl = URL || window.URL || window.webkitURL || window, url = domUrl.createObjectURL(svg), img = new Image();
    img.addEventListener("load", () => {
      imageRes.loaded = true;
      imageRes.element = img;
      resolve(imageRes);
      domUrl.revokeObjectURL(url);
    });
    img.addEventListener("error", async () => {
      domUrl.revokeObjectURL(url);
      const img2 = {
        ...image,
        error: false,
        loading: true
      };
      await loadImage(img2);
      imageRes.loaded = true;
      imageRes.element = img2.element;
      resolve(imageRes);
    });
    img.src = url;
  });
}

// node_modules/tsparticles-shape-image/esm/ImageDrawer.js
var ImageDrawer = class {
  constructor(engine) {
    this.loadImageShape = async (imageShape) => {
      if (!this._engine.loadImage) {
        throw new Error(`${errorPrefix} image shape not initialized`);
      }
      await this._engine.loadImage({
        gif: imageShape.gif,
        name: imageShape.name,
        replaceColor: imageShape.replaceColor ?? imageShape.replace_color ?? false,
        src: imageShape.src
      });
    };
    this._engine = engine;
  }
  addImage(image) {
    if (!this._engine.images) {
      this._engine.images = [];
    }
    this._engine.images.push(image);
  }
  draw(context, particle, radius, opacity, delta) {
    const image = particle.image, element = image == null ? void 0 : image.element;
    if (!image) {
      return;
    }
    context.globalAlpha = opacity;
    if (image.gif && image.gifData) {
      const offscreenCanvas = new OffscreenCanvas(image.gifData.width, image.gifData.height), offscreenContext = offscreenCanvas.getContext("2d");
      if (!offscreenContext) {
        throw new Error("could not create offscreen canvas context");
      }
      offscreenContext.imageSmoothingQuality = "low";
      offscreenContext.imageSmoothingEnabled = false;
      offscreenContext.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
      if (particle.gifLoopCount === void 0) {
        particle.gifLoopCount = image.gifLoopCount ?? 0;
      }
      let frameIndex = particle.gifFrame ?? 0;
      const pos = { x: -image.gifData.width * 0.5, y: -image.gifData.height * 0.5 }, frame = image.gifData.frames[frameIndex];
      if (particle.gifTime === void 0) {
        particle.gifTime = 0;
      }
      if (!frame.bitmap) {
        return;
      }
      context.scale(radius / image.gifData.width, radius / image.gifData.height);
      switch (frame.disposalMethod) {
        case 4:
        case 5:
        case 6:
        case 7:
        case 0:
          offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
          context.drawImage(offscreenCanvas, pos.x, pos.y);
          offscreenContext.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
          break;
        case 1:
          offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
          context.drawImage(offscreenCanvas, pos.x, pos.y);
          break;
        case 2:
          offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
          context.drawImage(offscreenCanvas, pos.x, pos.y);
          offscreenContext.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
          if (image.gifData.globalColorTable.length === 0) {
            offscreenContext.putImageData(image.gifData.frames[0].image, pos.x + frame.left, pos.y + frame.top);
          } else {
            offscreenContext.putImageData(image.gifData.backgroundImage, pos.x, pos.y);
          }
          break;
        case 3:
          {
            const previousImageData = offscreenContext.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
            offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
            context.drawImage(offscreenCanvas, pos.x, pos.y);
            offscreenContext.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
            offscreenContext.putImageData(previousImageData, 0, 0);
          }
          break;
      }
      particle.gifTime += delta.value;
      if (particle.gifTime > frame.delayTime) {
        particle.gifTime -= frame.delayTime;
        if (++frameIndex >= image.gifData.frames.length) {
          if (--particle.gifLoopCount <= 0) {
            return;
          }
          frameIndex = 0;
          offscreenContext.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
        }
        particle.gifFrame = frameIndex;
      }
      context.scale(image.gifData.width / radius, image.gifData.height / radius);
    } else if (element) {
      const ratio = image.ratio, pos = {
        x: -radius,
        y: -radius
      };
      context.drawImage(element, pos.x, pos.y, radius * 2, radius * 2 / ratio);
    }
    context.globalAlpha = 1;
  }
  getSidesCount() {
    return 12;
  }
  async init(container) {
    const options = container.actualOptions;
    if (!options.preload || !this._engine.loadImage) {
      return;
    }
    for (const imageData of options.preload) {
      await this._engine.loadImage(imageData);
    }
  }
  loadShape(particle) {
    if (particle.shape !== "image" && particle.shape !== "images") {
      return;
    }
    if (!this._engine.images) {
      this._engine.images = [];
    }
    const imageData = particle.shapeData, image = this._engine.images.find((t) => t.name === imageData.name || t.source === imageData.src);
    if (!image) {
      this.loadImageShape(imageData).then(() => {
        this.loadShape(particle);
      });
    }
  }
  particleInit(container, particle) {
    if (particle.shape !== "image" && particle.shape !== "images") {
      return;
    }
    if (!this._engine.images) {
      this._engine.images = [];
    }
    const images = this._engine.images, imageData = particle.shapeData, color = particle.getFillColor(), image = images.find((t) => t.name === imageData.name || t.source === imageData.src);
    if (!image) {
      return;
    }
    const replaceColor = imageData.replaceColor ?? imageData.replace_color ?? image.replaceColor;
    if (image.loading) {
      setTimeout(() => {
        this.particleInit(container, particle);
      });
      return;
    }
    (async () => {
      let imageRes;
      if (image.svgData && color) {
        imageRes = await replaceImageColor(image, imageData, color, particle);
      } else {
        imageRes = {
          color,
          data: image,
          element: image.element,
          gif: image.gif,
          gifData: image.gifData,
          gifLoopCount: image.gifLoopCount,
          loaded: true,
          ratio: imageData.width && imageData.height ? imageData.width / imageData.height : image.ratio ?? 1,
          replaceColor,
          source: imageData.src
        };
      }
      if (!imageRes.ratio) {
        imageRes.ratio = 1;
      }
      const fill = imageData.fill ?? particle.fill, close = imageData.close ?? particle.close, imageShape = {
        image: imageRes,
        fill,
        close
      };
      particle.image = imageShape.image;
      particle.fill = imageShape.fill;
      particle.close = imageShape.close;
    })();
  }
};

// node_modules/tsparticles-shape-image/esm/Options/Classes/Preload.js
var Preload = class {
  constructor() {
    this.src = "";
    this.gif = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.gif !== void 0) {
      this.gif = data.gif;
    }
    if (data.height !== void 0) {
      this.height = data.height;
    }
    if (data.name !== void 0) {
      this.name = data.name;
    }
    if (data.replaceColor !== void 0) {
      this.replaceColor = data.replaceColor;
    }
    if (data.src !== void 0) {
      this.src = data.src;
    }
    if (data.width !== void 0) {
      this.width = data.width;
    }
  }
};

// node_modules/tsparticles-shape-image/esm/ImagePreloader.js
var ImagePreloaderPlugin = class {
  constructor(engine) {
    this.id = "imagePreloader";
    this._engine = engine;
  }
  getPlugin() {
    return {};
  }
  loadOptions(options, source) {
    if (!source || !source.preload) {
      return;
    }
    if (!options.preload) {
      options.preload = [];
    }
    const preloadOptions = options.preload;
    for (const item of source.preload) {
      const existing = preloadOptions.find((t) => t.name === item.name || t.src === item.src);
      if (existing) {
        existing.load(item);
      } else {
        const preload = new Preload();
        preload.load(item);
        preloadOptions.push(preload);
      }
    }
  }
  needsPlugin() {
    return true;
  }
};

// node_modules/tsparticles-shape-image/esm/index.js
function addLoadImageToEngine(engine) {
  if (engine.loadImage) {
    return;
  }
  engine.loadImage = async (data) => {
    if (!data.name && !data.src) {
      throw new Error(`${errorPrefix} no image source provided`);
    }
    if (!engine.images) {
      engine.images = [];
    }
    if (engine.images.find((t) => t.name === data.name || t.source === data.src)) {
      return;
    }
    try {
      const image = {
        gif: data.gif ?? false,
        name: data.name ?? data.src,
        source: data.src,
        type: data.src.substring(data.src.length - 3),
        error: false,
        loading: true,
        replaceColor: data.replaceColor,
        ratio: data.width && data.height ? data.width / data.height : void 0
      };
      engine.images.push(image);
      const imageFunc = data.gif ? loadGifImage : data.replaceColor ? downloadSvgImage : loadImage;
      await imageFunc(image);
    } catch {
      throw new Error(`${errorPrefix} ${data.name ?? data.src} not found`);
    }
  };
}
async function loadImageShape(engine, refresh = true) {
  addLoadImageToEngine(engine);
  const preloader = new ImagePreloaderPlugin(engine);
  await engine.addPlugin(preloader, refresh);
  await engine.addShape(["image", "images"], new ImageDrawer(engine), refresh);
}

// node_modules/tsparticles-updater-life/esm/Options/Classes/LifeDelay.js
var LifeDelay = class extends ValueWithRandom {
  constructor() {
    super();
    this.sync = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    super.load(data);
    if (data.sync !== void 0) {
      this.sync = data.sync;
    }
  }
};

// node_modules/tsparticles-updater-life/esm/Options/Classes/LifeDuration.js
var LifeDuration = class extends ValueWithRandom {
  constructor() {
    super();
    this.random.minimumValue = 1e-4;
    this.sync = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    super.load(data);
    if (data.sync !== void 0) {
      this.sync = data.sync;
    }
  }
};

// node_modules/tsparticles-updater-life/esm/Options/Classes/Life.js
var Life = class {
  constructor() {
    this.count = 0;
    this.delay = new LifeDelay();
    this.duration = new LifeDuration();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.count !== void 0) {
      this.count = data.count;
    }
    this.delay.load(data.delay);
    this.duration.load(data.duration);
  }
};

// node_modules/tsparticles-updater-life/esm/LifeUpdater.js
var LifeUpdater = class {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const container = this.container, particlesOptions = particle.options, lifeOptions = particlesOptions.life;
    if (!lifeOptions) {
      return;
    }
    particle.life = {
      delay: container.retina.reduceFactor ? getRangeValue(lifeOptions.delay.value) * (lifeOptions.delay.sync ? 1 : getRandom()) / container.retina.reduceFactor * 1e3 : 0,
      delayTime: 0,
      duration: container.retina.reduceFactor ? getRangeValue(lifeOptions.duration.value) * (lifeOptions.duration.sync ? 1 : getRandom()) / container.retina.reduceFactor * 1e3 : 0,
      time: 0,
      count: lifeOptions.count
    };
    if (particle.life.duration <= 0) {
      particle.life.duration = -1;
    }
    if (particle.life.count <= 0) {
      particle.life.count = -1;
    }
    if (particle.life) {
      particle.spawning = particle.life.delay > 0;
    }
  }
  isEnabled(particle) {
    return !particle.destroyed;
  }
  loadOptions(options, ...sources) {
    if (!options.life) {
      options.life = new Life();
    }
    for (const source of sources) {
      options.life.load(source == null ? void 0 : source.life);
    }
  }
  update(particle, delta) {
    if (!this.isEnabled(particle) || !particle.life) {
      return;
    }
    const life = particle.life;
    let justSpawned = false;
    if (particle.spawning) {
      life.delayTime += delta.value;
      if (life.delayTime >= particle.life.delay) {
        justSpawned = true;
        particle.spawning = false;
        life.delayTime = 0;
        life.time = 0;
      } else {
        return;
      }
    }
    if (life.duration === -1) {
      return;
    }
    if (particle.spawning) {
      return;
    }
    if (justSpawned) {
      life.time = 0;
    } else {
      life.time += delta.value;
    }
    if (life.time < life.duration) {
      return;
    }
    life.time = 0;
    if (particle.life.count > 0) {
      particle.life.count--;
    }
    if (particle.life.count === 0) {
      particle.destroy();
      return;
    }
    const canvasSize = this.container.canvas.size, widthRange = setRangeValue(0, canvasSize.width), heightRange = setRangeValue(0, canvasSize.width);
    particle.position.x = randomInRange(widthRange);
    particle.position.y = randomInRange(heightRange);
    particle.spawning = true;
    life.delayTime = 0;
    life.time = 0;
    particle.reset();
    const lifeOptions = particle.options.life;
    if (lifeOptions) {
      life.delay = getRangeValue(lifeOptions.delay.value) * 1e3;
      life.duration = getRangeValue(lifeOptions.duration.value) * 1e3;
    }
  }
};

// node_modules/tsparticles-updater-life/esm/index.js
async function loadLifeUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("life", (container) => new LifeUpdater(container), refresh);
}

// node_modules/tsparticles-shape-line/esm/LineDrawer.js
var LineDrawer = class {
  draw(context, particle, radius) {
    const shapeData = particle.shapeData;
    context.moveTo(-radius / 2, 0);
    context.lineTo(radius / 2, 0);
    context.lineCap = (shapeData == null ? void 0 : shapeData.cap) ?? "butt";
  }
  getSidesCount() {
    return 1;
  }
};

// node_modules/tsparticles-shape-line/esm/index.js
async function loadLineShape(engine, refresh = true) {
  await engine.addShape("line", new LineDrawer(), refresh);
}

// node_modules/tsparticles-move-parallax/esm/ParallaxMover.js
var ParallaxMover = class {
  init() {
  }
  isEnabled(particle) {
    return !isSsr() && !particle.destroyed && particle.container.actualOptions.interactivity.events.onHover.parallax.enable;
  }
  move(particle) {
    const container = particle.container, options = container.actualOptions, parallaxOptions = options.interactivity.events.onHover.parallax;
    if (isSsr() || !parallaxOptions.enable) {
      return;
    }
    const parallaxForce = parallaxOptions.force, mousePos = container.interactivity.mouse.position;
    if (!mousePos) {
      return;
    }
    const canvasSize = container.canvas.size, canvasCenter = {
      x: canvasSize.width / 2,
      y: canvasSize.height / 2
    }, parallaxSmooth = parallaxOptions.smooth, factor = particle.getRadius() / parallaxForce, centerDistance = {
      x: (mousePos.x - canvasCenter.x) * factor,
      y: (mousePos.y - canvasCenter.y) * factor
    }, { offset } = particle;
    offset.x += (centerDistance.x - offset.x) / parallaxSmooth;
    offset.y += (centerDistance.y - offset.y) / parallaxSmooth;
  }
};

// node_modules/tsparticles-move-parallax/esm/index.js
async function loadParallaxMover(engine, refresh = true) {
  await engine.addMover("parallax", () => new ParallaxMover(), refresh);
}

// node_modules/tsparticles-interaction-particles-attract/esm/Attractor.js
var Attractor2 = class extends ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {
  }
  init() {
  }
  async interact(p1) {
    const container = this.container, distance = p1.retina.attractDistance ?? container.retina.attractDistance, pos1 = p1.getPosition(), query = container.particles.quadTree.queryCircle(pos1, distance);
    for (const p2 of query) {
      if (p1 === p2 || !p2.options.move.attract.enable || p2.destroyed || p2.spawning) {
        continue;
      }
      const pos2 = p2.getPosition(), { dx, dy } = getDistances(pos1, pos2), rotate = p1.options.move.attract.rotate, ax = dx / (rotate.x * 1e3), ay = dy / (rotate.y * 1e3), p1Factor = p2.size.value / p1.size.value, p2Factor = 1 / p1Factor;
      p1.velocity.x -= ax * p1Factor;
      p1.velocity.y -= ay * p1Factor;
      p2.velocity.x += ax * p2Factor;
      p2.velocity.y += ay * p2Factor;
    }
  }
  isEnabled(particle) {
    return particle.options.move.attract.enable;
  }
  reset() {
  }
};

// node_modules/tsparticles-interaction-particles-attract/esm/index.js
async function loadParticlesAttractInteraction(engine, refresh = true) {
  await engine.addInteractor("particlesAttract", (container) => new Attractor2(container), refresh);
}

// node_modules/tsparticles-interaction-particles-collisions/esm/Absorb.js
function updateAbsorb(p1, r1, p2, r2, delta, pixelRatio) {
  const factor = clamp(p1.options.collisions.absorb.speed * delta.factor / 10, 0, r2);
  p1.size.value += factor / 2;
  p2.size.value -= factor;
  if (r2 <= pixelRatio) {
    p2.size.value = 0;
    p2.destroy();
  }
}
function absorb(p1, p2, delta, pixelRatio) {
  const r1 = p1.getRadius(), r2 = p2.getRadius();
  if (r1 === void 0 && r2 !== void 0) {
    p1.destroy();
  } else if (r1 !== void 0 && r2 === void 0) {
    p2.destroy();
  } else if (r1 !== void 0 && r2 !== void 0) {
    if (r1 >= r2) {
      updateAbsorb(p1, r1, p2, r2, delta, pixelRatio);
    } else {
      updateAbsorb(p2, r2, p1, r1, delta, pixelRatio);
    }
  }
}

// node_modules/tsparticles-interaction-particles-collisions/esm/Bounce.js
var fixBounceSpeed = (p) => {
  if (p.collisionMaxSpeed === void 0) {
    p.collisionMaxSpeed = getRangeValue(p.options.collisions.maxSpeed);
  }
  if (p.velocity.length > p.collisionMaxSpeed) {
    p.velocity.length = p.collisionMaxSpeed;
  }
};
function bounce(p1, p2) {
  circleBounce(circleBounceDataFromParticle(p1), circleBounceDataFromParticle(p2));
  fixBounceSpeed(p1);
  fixBounceSpeed(p2);
}

// node_modules/tsparticles-interaction-particles-collisions/esm/Destroy.js
function destroy(p1, p2) {
  if (!p1.unbreakable && !p2.unbreakable) {
    bounce(p1, p2);
  }
  if (p1.getRadius() === void 0 && p2.getRadius() !== void 0) {
    p1.destroy();
  } else if (p1.getRadius() !== void 0 && p2.getRadius() === void 0) {
    p2.destroy();
  } else if (p1.getRadius() !== void 0 && p2.getRadius() !== void 0) {
    const deleteP = p1.getRadius() >= p2.getRadius() ? p2 : p1;
    deleteP.destroy();
  }
}

// node_modules/tsparticles-interaction-particles-collisions/esm/ResolveCollision.js
function resolveCollision(p1, p2, delta, pixelRatio) {
  switch (p1.options.collisions.mode) {
    case "absorb": {
      absorb(p1, p2, delta, pixelRatio);
      break;
    }
    case "bounce": {
      bounce(p1, p2);
      break;
    }
    case "destroy": {
      destroy(p1, p2);
      break;
    }
  }
}

// node_modules/tsparticles-interaction-particles-collisions/esm/Collider.js
var Collider = class extends ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {
  }
  init() {
  }
  async interact(p1, delta) {
    if (p1.destroyed || p1.spawning) {
      return;
    }
    const container = this.container, pos1 = p1.getPosition(), radius1 = p1.getRadius(), query = container.particles.quadTree.queryCircle(pos1, radius1 * 2);
    for (const p2 of query) {
      if (p1 === p2 || !p2.options.collisions.enable || p1.options.collisions.mode !== p2.options.collisions.mode || p2.destroyed || p2.spawning) {
        continue;
      }
      const pos2 = p2.getPosition(), radius2 = p2.getRadius();
      if (Math.abs(Math.round(pos1.z) - Math.round(pos2.z)) > radius1 + radius2) {
        continue;
      }
      const dist = getDistance(pos1, pos2), distP = radius1 + radius2;
      if (dist > distP) {
        continue;
      }
      resolveCollision(p1, p2, delta, container.retina.pixelRatio);
    }
  }
  isEnabled(particle) {
    return particle.options.collisions.enable;
  }
  reset() {
  }
};

// node_modules/tsparticles-interaction-particles-collisions/esm/index.js
async function loadParticlesCollisionsInteraction(engine, refresh = true) {
  await engine.addInteractor("particlesCollisions", (container) => new Collider(container), refresh);
}

// node_modules/tsparticles-interaction-particles-links/esm/CircleWarp.js
var CircleWarp = class extends Circle {
  constructor(x, y, radius, canvasSize) {
    super(x, y, radius);
    this.canvasSize = canvasSize;
    this.canvasSize = { ...canvasSize };
  }
  contains(point) {
    const { width, height } = this.canvasSize;
    const { x, y } = point;
    return super.contains(point) || super.contains({ x: x - width, y }) || super.contains({ x: x - width, y: y - height }) || super.contains({ x, y: y - height });
  }
  intersects(range) {
    if (super.intersects(range)) {
      return true;
    }
    const rect = range, circle = range, newPos = {
      x: range.position.x - this.canvasSize.width,
      y: range.position.y - this.canvasSize.height
    };
    if (circle.radius !== void 0) {
      const biggerCircle = new Circle(newPos.x, newPos.y, circle.radius * 2);
      return super.intersects(biggerCircle);
    } else if (rect.size !== void 0) {
      const rectSW = new Rectangle(newPos.x, newPos.y, rect.size.width * 2, rect.size.height * 2);
      return super.intersects(rectSW);
    }
    return false;
  }
};

// node_modules/tsparticles-interaction-particles-links/esm/Options/Classes/LinksShadow.js
var LinksShadow = class {
  constructor() {
    this.blur = 5;
    this.color = new OptionsColor();
    this.color.value = "#000";
    this.enable = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.blur !== void 0) {
      this.blur = data.blur;
    }
    this.color = OptionsColor.create(this.color, data.color);
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
  }
};

// node_modules/tsparticles-interaction-particles-links/esm/Options/Classes/LinksTriangle.js
var LinksTriangle = class {
  constructor() {
    this.enable = false;
    this.frequency = 1;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.frequency !== void 0) {
      this.frequency = data.frequency;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
  }
};

// node_modules/tsparticles-interaction-particles-links/esm/Options/Classes/Links.js
var Links = class {
  constructor() {
    this.blink = false;
    this.color = new OptionsColor();
    this.color.value = "#fff";
    this.consent = false;
    this.distance = 100;
    this.enable = false;
    this.frequency = 1;
    this.opacity = 1;
    this.shadow = new LinksShadow();
    this.triangles = new LinksTriangle();
    this.width = 1;
    this.warp = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.id !== void 0) {
      this.id = data.id;
    }
    if (data.blink !== void 0) {
      this.blink = data.blink;
    }
    this.color = OptionsColor.create(this.color, data.color);
    if (data.consent !== void 0) {
      this.consent = data.consent;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.frequency !== void 0) {
      this.frequency = data.frequency;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
    this.shadow.load(data.shadow);
    this.triangles.load(data.triangles);
    if (data.width !== void 0) {
      this.width = data.width;
    }
    if (data.warp !== void 0) {
      this.warp = data.warp;
    }
  }
};

// node_modules/tsparticles-interaction-particles-links/esm/Linker.js
function getLinkDistance(pos1, pos2, optDistance, canvasSize, warp) {
  const { dx, dy, distance } = getDistances(pos1, pos2);
  if (!warp || distance <= optDistance) {
    return distance;
  }
  const absDiffs = {
    x: Math.abs(dx),
    y: Math.abs(dy)
  }, warpDistances = {
    x: Math.min(absDiffs.x, canvasSize.width - absDiffs.x),
    y: Math.min(absDiffs.y, canvasSize.height - absDiffs.y)
  };
  return Math.sqrt(warpDistances.x ** 2 + warpDistances.y ** 2);
}
var Linker = class extends ParticlesInteractorBase {
  constructor(container) {
    super(container);
    this._setColor = (p1) => {
      if (!p1.options.links) {
        return;
      }
      const container2 = this.linkContainer, linksOptions = p1.options.links;
      let linkColor = linksOptions.id === void 0 ? container2.particles.linksColor : container2.particles.linksColors.get(linksOptions.id);
      if (linkColor) {
        return;
      }
      const optColor = linksOptions.color;
      linkColor = getLinkRandomColor(optColor, linksOptions.blink, linksOptions.consent);
      if (linksOptions.id === void 0) {
        container2.particles.linksColor = linkColor;
      } else {
        container2.particles.linksColors.set(linksOptions.id, linkColor);
      }
    };
    this.linkContainer = container;
  }
  clear() {
  }
  init() {
    this.linkContainer.particles.linksColor = void 0;
    this.linkContainer.particles.linksColors = /* @__PURE__ */ new Map();
  }
  async interact(p1) {
    if (!p1.options.links) {
      return;
    }
    p1.links = [];
    const pos1 = p1.getPosition(), container = this.container, canvasSize = container.canvas.size;
    if (pos1.x < 0 || pos1.y < 0 || pos1.x > canvasSize.width || pos1.y > canvasSize.height) {
      return;
    }
    const linkOpt1 = p1.options.links, optOpacity = linkOpt1.opacity, optDistance = p1.retina.linksDistance ?? 0, warp = linkOpt1.warp, range = warp ? new CircleWarp(pos1.x, pos1.y, optDistance, canvasSize) : new Circle(pos1.x, pos1.y, optDistance), query = container.particles.quadTree.query(range);
    for (const p2 of query) {
      const linkOpt2 = p2.options.links;
      if (p1 === p2 || !(linkOpt2 == null ? void 0 : linkOpt2.enable) || linkOpt1.id !== linkOpt2.id || p2.spawning || p2.destroyed || !p2.links || p1.links.some((t) => t.destination === p2) || p2.links.some((t) => t.destination === p1)) {
        continue;
      }
      const pos2 = p2.getPosition();
      if (pos2.x < 0 || pos2.y < 0 || pos2.x > canvasSize.width || pos2.y > canvasSize.height) {
        continue;
      }
      const distance = getLinkDistance(pos1, pos2, optDistance, canvasSize, warp && linkOpt2.warp);
      if (distance > optDistance) {
        continue;
      }
      const opacityLine = (1 - distance / optDistance) * optOpacity;
      this._setColor(p1);
      p1.links.push({
        destination: p2,
        opacity: opacityLine
      });
    }
  }
  isEnabled(particle) {
    var _a;
    return !!((_a = particle.options.links) == null ? void 0 : _a.enable);
  }
  loadParticlesOptions(options, ...sources) {
    if (!options.links) {
      options.links = new Links();
    }
    for (const source of sources) {
      options.links.load((source == null ? void 0 : source.links) ?? (source == null ? void 0 : source.lineLinked) ?? (source == null ? void 0 : source.line_linked));
    }
  }
  reset() {
  }
};

// node_modules/tsparticles-interaction-particles-links/esm/interaction.js
async function loadLinksInteraction(engine, refresh = true) {
  await engine.addInteractor("particlesLinks", (container) => new Linker(container), refresh);
}

// node_modules/tsparticles-interaction-particles-links/esm/Utils.js
function drawLinkLine(params) {
  let drawn = false;
  const { begin, end, maxDistance, context, canvasSize, width, backgroundMask, colorLine, opacity, links } = params;
  if (getDistance(begin, end) <= maxDistance) {
    drawLine(context, begin, end);
    drawn = true;
  } else if (links.warp) {
    let pi1;
    let pi2;
    const endNE = {
      x: end.x - canvasSize.width,
      y: end.y
    };
    const d1 = getDistances(begin, endNE);
    if (d1.distance <= maxDistance) {
      const yi = begin.y - d1.dy / d1.dx * begin.x;
      pi1 = { x: 0, y: yi };
      pi2 = { x: canvasSize.width, y: yi };
    } else {
      const endSW = {
        x: end.x,
        y: end.y - canvasSize.height
      };
      const d2 = getDistances(begin, endSW);
      if (d2.distance <= maxDistance) {
        const yi = begin.y - d2.dy / d2.dx * begin.x;
        const xi = -yi / (d2.dy / d2.dx);
        pi1 = { x: xi, y: 0 };
        pi2 = { x: xi, y: canvasSize.height };
      } else {
        const endSE = {
          x: end.x - canvasSize.width,
          y: end.y - canvasSize.height
        };
        const d3 = getDistances(begin, endSE);
        if (d3.distance <= maxDistance) {
          const yi = begin.y - d3.dy / d3.dx * begin.x;
          const xi = -yi / (d3.dy / d3.dx);
          pi1 = { x: xi, y: yi };
          pi2 = { x: pi1.x + canvasSize.width, y: pi1.y + canvasSize.height };
        }
      }
    }
    if (pi1 && pi2) {
      drawLine(context, begin, pi1);
      drawLine(context, end, pi2);
      drawn = true;
    }
  }
  if (!drawn) {
    return;
  }
  context.lineWidth = width;
  if (backgroundMask.enable) {
    context.globalCompositeOperation = backgroundMask.composite;
  }
  context.strokeStyle = getStyleFromRgb(colorLine, opacity);
  const { shadow } = links;
  if (shadow.enable) {
    const shadowColor = rangeColorToRgb(shadow.color);
    if (shadowColor) {
      context.shadowBlur = shadow.blur;
      context.shadowColor = getStyleFromRgb(shadowColor);
    }
  }
  context.stroke();
}
function drawLinkTriangle(params) {
  const { context, pos1, pos2, pos3, backgroundMask, colorTriangle, opacityTriangle } = params;
  drawTriangle(context, pos1, pos2, pos3);
  if (backgroundMask.enable) {
    context.globalCompositeOperation = backgroundMask.composite;
  }
  context.fillStyle = getStyleFromRgb(colorTriangle, opacityTriangle);
  context.fill();
}
function getLinkKey(ids) {
  ids.sort((a, b) => a - b);
  return ids.join("_");
}
function setLinkFrequency(particles, dictionary) {
  const key = getLinkKey(particles.map((t) => t.id));
  let res = dictionary.get(key);
  if (res === void 0) {
    res = getRandom();
    dictionary.set(key, res);
  }
  return res;
}

// node_modules/tsparticles-interaction-particles-links/esm/LinkInstance.js
var LinkInstance = class {
  constructor(container) {
    this.container = container;
    this._drawLinkLine = (p1, link) => {
      const p1LinksOptions = p1.options.links;
      if (!(p1LinksOptions == null ? void 0 : p1LinksOptions.enable)) {
        return;
      }
      const container2 = this.container, options = container2.actualOptions, p2 = link.destination, pos1 = p1.getPosition(), pos2 = p2.getPosition();
      let opacity = link.opacity;
      container2.canvas.draw((ctx) => {
        var _a;
        let colorLine;
        const twinkle = (_a = p1.options.twinkle) == null ? void 0 : _a.lines;
        if (twinkle == null ? void 0 : twinkle.enable) {
          const twinkleFreq = twinkle.frequency, twinkleRgb = rangeColorToRgb(twinkle.color), twinkling = getRandom() < twinkleFreq;
          if (twinkling && twinkleRgb) {
            colorLine = twinkleRgb;
            opacity = getRangeValue(twinkle.opacity);
          }
        }
        if (!colorLine) {
          const linkColor = p1LinksOptions.id !== void 0 ? container2.particles.linksColors.get(p1LinksOptions.id) : container2.particles.linksColor;
          colorLine = getLinkColor(p1, p2, linkColor);
        }
        if (!colorLine) {
          return;
        }
        const width = p1.retina.linksWidth ?? 0, maxDistance = p1.retina.linksDistance ?? 0, { backgroundMask } = options;
        drawLinkLine({
          context: ctx,
          width,
          begin: pos1,
          end: pos2,
          maxDistance,
          canvasSize: container2.canvas.size,
          links: p1LinksOptions,
          backgroundMask,
          colorLine,
          opacity
        });
      });
    };
    this._drawLinkTriangle = (p1, link1, link2) => {
      const linksOptions = p1.options.links;
      if (!(linksOptions == null ? void 0 : linksOptions.enable)) {
        return;
      }
      const triangleOptions = linksOptions.triangles;
      if (!triangleOptions.enable) {
        return;
      }
      const container2 = this.container, options = container2.actualOptions, p2 = link1.destination, p3 = link2.destination, opacityTriangle = triangleOptions.opacity ?? (link1.opacity + link2.opacity) / 2;
      if (opacityTriangle <= 0) {
        return;
      }
      container2.canvas.draw((ctx) => {
        const pos1 = p1.getPosition(), pos2 = p2.getPosition(), pos3 = p3.getPosition(), linksDistance = p1.retina.linksDistance ?? 0;
        if (getDistance(pos1, pos2) > linksDistance || getDistance(pos3, pos2) > linksDistance || getDistance(pos3, pos1) > linksDistance) {
          return;
        }
        let colorTriangle = rangeColorToRgb(triangleOptions.color);
        if (!colorTriangle) {
          const linkColor = linksOptions.id !== void 0 ? container2.particles.linksColors.get(linksOptions.id) : container2.particles.linksColor;
          colorTriangle = getLinkColor(p1, p2, linkColor);
        }
        if (!colorTriangle) {
          return;
        }
        drawLinkTriangle({
          context: ctx,
          pos1,
          pos2,
          pos3,
          backgroundMask: options.backgroundMask,
          colorTriangle,
          opacityTriangle
        });
      });
    };
    this._drawTriangles = (options, p1, link, p1Links) => {
      var _a, _b, _c;
      const p2 = link.destination;
      if (!(((_a = options.links) == null ? void 0 : _a.triangles.enable) && ((_b = p2.options.links) == null ? void 0 : _b.triangles.enable))) {
        return;
      }
      const vertices = (_c = p2.links) == null ? void 0 : _c.filter((t) => {
        const linkFreq = this._getLinkFrequency(p2, t.destination);
        return p2.options.links && linkFreq <= p2.options.links.frequency && p1Links.findIndex((l) => l.destination === t.destination) >= 0;
      });
      if (!(vertices == null ? void 0 : vertices.length)) {
        return;
      }
      for (const vertex of vertices) {
        const p3 = vertex.destination, triangleFreq = this._getTriangleFrequency(p1, p2, p3);
        if (triangleFreq > options.links.triangles.frequency) {
          continue;
        }
        this._drawLinkTriangle(p1, link, vertex);
      }
    };
    this._getLinkFrequency = (p1, p2) => {
      return setLinkFrequency([p1, p2], this._freqs.links);
    };
    this._getTriangleFrequency = (p1, p2, p3) => {
      return setLinkFrequency([p1, p2, p3], this._freqs.triangles);
    };
    this._freqs = {
      links: /* @__PURE__ */ new Map(),
      triangles: /* @__PURE__ */ new Map()
    };
  }
  drawParticle(context, particle) {
    const { links, options } = particle;
    if (!links || links.length <= 0) {
      return;
    }
    const p1Links = links.filter((l) => options.links && this._getLinkFrequency(particle, l.destination) <= options.links.frequency);
    for (const link of p1Links) {
      this._drawTriangles(options, particle, link, p1Links);
      if (link.opacity > 0 && (particle.retina.linksWidth ?? 0) > 0) {
        this._drawLinkLine(particle, link);
      }
    }
  }
  async init() {
    this._freqs.links = /* @__PURE__ */ new Map();
    this._freqs.triangles = /* @__PURE__ */ new Map();
  }
  particleCreated(particle) {
    particle.links = [];
    if (!particle.options.links) {
      return;
    }
    const ratio = this.container.retina.pixelRatio, { retina } = particle, { distance, width } = particle.options.links;
    retina.linksDistance = distance * ratio;
    retina.linksWidth = width * ratio;
  }
  particleDestroyed(particle) {
    particle.links = [];
  }
};

// node_modules/tsparticles-interaction-particles-links/esm/plugin.js
var LinksPlugin = class {
  constructor() {
    this.id = "links";
  }
  getPlugin(container) {
    return new LinkInstance(container);
  }
  loadOptions() {
  }
  needsPlugin() {
    return true;
  }
};
async function loadLinksPlugin(engine, refresh = true) {
  const plugin = new LinksPlugin();
  await engine.addPlugin(plugin, refresh);
}

// node_modules/tsparticles-interaction-particles-links/esm/index.js
async function loadParticlesLinksInteraction(engine, refresh = true) {
  await loadLinksInteraction(engine, refresh);
  await loadLinksPlugin(engine, refresh);
}

// node_modules/tsparticles-shape-polygon/esm/PolygonDrawerBase.js
var PolygonDrawerBase = class {
  draw(context, particle, radius) {
    const start = this.getCenter(particle, radius), side = this.getSidesData(particle, radius), sideCount = side.count.numerator * side.count.denominator, decimalSides = side.count.numerator / side.count.denominator, interiorAngleDegrees = 180 * (decimalSides - 2) / decimalSides, interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180;
    if (!context) {
      return;
    }
    context.beginPath();
    context.translate(start.x, start.y);
    context.moveTo(0, 0);
    for (let i = 0; i < sideCount; i++) {
      context.lineTo(side.length, 0);
      context.translate(side.length, 0);
      context.rotate(interiorAngle);
    }
  }
  getSidesCount(particle) {
    const polygon = particle.shapeData;
    return Math.round(getRangeValue((polygon == null ? void 0 : polygon.sides) ?? (polygon == null ? void 0 : polygon.nb_sides) ?? 5));
  }
};

// node_modules/tsparticles-shape-polygon/esm/PolygonDrawer.js
var PolygonDrawer = class extends PolygonDrawerBase {
  getCenter(particle, radius) {
    return {
      x: -radius / (particle.sides / 3.5),
      y: -radius / (2.66 / 3.5)
    };
  }
  getSidesData(particle, radius) {
    const sides = particle.sides;
    return {
      count: {
        denominator: 1,
        numerator: sides
      },
      length: radius * 2.66 / (sides / 3)
    };
  }
};

// node_modules/tsparticles-shape-polygon/esm/TriangleDrawer.js
var TriangleDrawer = class extends PolygonDrawerBase {
  getCenter(particle, radius) {
    return {
      x: -radius,
      y: radius / 1.66
    };
  }
  getSidesCount() {
    return 3;
  }
  getSidesData(particle, radius) {
    return {
      count: {
        denominator: 2,
        numerator: 3
      },
      length: radius * 2
    };
  }
};

// node_modules/tsparticles-shape-polygon/esm/index.js
async function loadGenericPolygonShape(engine, refresh = true) {
  await engine.addShape("polygon", new PolygonDrawer(), refresh);
}
async function loadTriangleShape(engine, refresh = true) {
  await engine.addShape("triangle", new TriangleDrawer(), refresh);
}
async function loadPolygonShape(engine, refresh = true) {
  await loadGenericPolygonShape(engine, refresh);
  await loadTriangleShape(engine, refresh);
}

// node_modules/tsparticles-updater-rotate/esm/Options/Classes/RotateAnimation.js
var RotateAnimation = class {
  constructor() {
    this.enable = false;
    this.speed = 0;
    this.decay = 0;
    this.sync = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.speed !== void 0) {
      this.speed = setRangeValue(data.speed);
    }
    if (data.decay !== void 0) {
      this.decay = setRangeValue(data.decay);
    }
    if (data.sync !== void 0) {
      this.sync = data.sync;
    }
  }
};

// node_modules/tsparticles-updater-rotate/esm/Options/Classes/Rotate.js
var Rotate = class extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new RotateAnimation();
    this.direction = "clockwise";
    this.path = false;
    this.value = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    super.load(data);
    if (data.direction !== void 0) {
      this.direction = data.direction;
    }
    this.animation.load(data.animation);
    if (data.path !== void 0) {
      this.path = data.path;
    }
  }
};

// node_modules/tsparticles-updater-rotate/esm/RotateUpdater.js
function updateRotate(particle, delta) {
  const rotate = particle.rotate, rotateOptions = particle.options.rotate;
  if (!rotate || !rotateOptions) {
    return;
  }
  const rotateAnimation = rotateOptions.animation, speed = (rotate.velocity ?? 0) * delta.factor, max = 2 * Math.PI, decay = rotate.decay ?? 1;
  if (!rotateAnimation.enable) {
    return;
  }
  switch (rotate.status) {
    case "increasing":
      rotate.value += speed;
      if (rotate.value > max) {
        rotate.value -= max;
      }
      break;
    case "decreasing":
    default:
      rotate.value -= speed;
      if (rotate.value < 0) {
        rotate.value += max;
      }
      break;
  }
  if (rotate.velocity && decay !== 1) {
    rotate.velocity *= decay;
  }
}
var RotateUpdater = class {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const rotateOptions = particle.options.rotate;
    if (!rotateOptions) {
      return;
    }
    particle.rotate = {
      enable: rotateOptions.animation.enable,
      value: getRangeValue(rotateOptions.value) * Math.PI / 180
    };
    particle.pathRotation = rotateOptions.path;
    let rotateDirection = rotateOptions.direction;
    if (rotateDirection === "random") {
      const index = Math.floor(getRandom() * 2);
      rotateDirection = index > 0 ? "counter-clockwise" : "clockwise";
    }
    switch (rotateDirection) {
      case "counter-clockwise":
      case "counterClockwise":
        particle.rotate.status = "decreasing";
        break;
      case "clockwise":
        particle.rotate.status = "increasing";
        break;
    }
    const rotateAnimation = rotateOptions.animation;
    if (rotateAnimation.enable) {
      particle.rotate.decay = 1 - getRangeValue(rotateAnimation.decay);
      particle.rotate.velocity = getRangeValue(rotateAnimation.speed) / 360 * this.container.retina.reduceFactor;
      if (!rotateAnimation.sync) {
        particle.rotate.velocity *= getRandom();
      }
    }
    particle.rotation = particle.rotate.value;
  }
  isEnabled(particle) {
    const rotate = particle.options.rotate;
    if (!rotate) {
      return false;
    }
    return !particle.destroyed && !particle.spawning && rotate.animation.enable && !rotate.path;
  }
  loadOptions(options, ...sources) {
    if (!options.rotate) {
      options.rotate = new Rotate();
    }
    for (const source of sources) {
      options.rotate.load(source == null ? void 0 : source.rotate);
    }
  }
  update(particle, delta) {
    var _a;
    if (!this.isEnabled(particle)) {
      return;
    }
    updateRotate(particle, delta);
    particle.rotation = ((_a = particle.rotate) == null ? void 0 : _a.value) ?? 0;
  }
};

// node_modules/tsparticles-updater-rotate/esm/index.js
async function loadRotateUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("rotate", (container) => new RotateUpdater(container), refresh);
}

// node_modules/tsparticles-shape-square/esm/SquareDrawer.js
var fixFactor = Math.sqrt(2);
var SquareDrawer = class {
  draw(context, particle, radius) {
    const fixedRadius = radius / fixFactor, fixedDiameter = fixedRadius * 2;
    context.rect(-fixedRadius, -fixedRadius, fixedDiameter, fixedDiameter);
  }
  getSidesCount() {
    return 4;
  }
};

// node_modules/tsparticles-shape-square/esm/index.js
async function loadSquareShape(engine, refresh = true) {
  await engine.addShape(["edge", "square"], new SquareDrawer(), refresh);
}

// node_modules/tsparticles-shape-star/esm/StarDrawer.js
var StarDrawer = class {
  draw(context, particle, radius) {
    const sides = particle.sides, inset = particle.starInset ?? 2;
    context.moveTo(0, 0 - radius);
    for (let i = 0; i < sides; i++) {
      context.rotate(Math.PI / sides);
      context.lineTo(0, 0 - radius * inset);
      context.rotate(Math.PI / sides);
      context.lineTo(0, 0 - radius);
    }
  }
  getSidesCount(particle) {
    const star = particle.shapeData;
    return Math.round(getRangeValue((star == null ? void 0 : star.sides) ?? (star == null ? void 0 : star.nb_sides) ?? 5));
  }
  particleInit(container, particle) {
    const star = particle.shapeData, inset = getRangeValue((star == null ? void 0 : star.inset) ?? 2);
    particle.starInset = inset;
  }
};

// node_modules/tsparticles-shape-star/esm/index.js
async function loadStarShape(engine, refresh = true) {
  await engine.addShape("star", new StarDrawer(), refresh);
}

// node_modules/tsparticles-updater-stroke-color/esm/Utils.js
function updateColorValue2(delta, colorValue, valueAnimation, max, decrease) {
  if (!colorValue || !valueAnimation.enable || (colorValue.maxLoops ?? 0) > 0 && (colorValue.loops ?? 0) > (colorValue.maxLoops ?? 0)) {
    return;
  }
  if (!colorValue.time) {
    colorValue.time = 0;
  }
  if ((colorValue.delayTime ?? 0) > 0 && colorValue.time < (colorValue.delayTime ?? 0)) {
    colorValue.time += delta.value;
  }
  if ((colorValue.delayTime ?? 0) > 0 && colorValue.time < (colorValue.delayTime ?? 0)) {
    return;
  }
  const offset = randomInRange(valueAnimation.offset), velocity = (colorValue.velocity ?? 0) * delta.factor + offset * 3.6, decay = colorValue.decay ?? 1;
  if (!decrease || colorValue.status === "increasing") {
    colorValue.value += velocity;
    if (colorValue.value > max) {
      if (!colorValue.loops) {
        colorValue.loops = 0;
      }
      colorValue.loops++;
      if (decrease) {
        colorValue.status = "decreasing";
        colorValue.value -= colorValue.value % max;
      }
    }
  } else {
    colorValue.value -= velocity;
    if (colorValue.value < 0) {
      if (!colorValue.loops) {
        colorValue.loops = 0;
      }
      colorValue.loops++;
      colorValue.status = "increasing";
      colorValue.value += colorValue.value;
    }
  }
  if (colorValue.velocity && decay !== 1) {
    colorValue.velocity *= decay;
  }
  if (colorValue.value > max) {
    colorValue.value %= max;
  }
}
function updateStrokeColor(particle, delta) {
  if (!particle.strokeColor || !particle.strokeAnimation) {
    return;
  }
  const { h, s, l } = particle.strokeColor, { h: hAnimation, s: sAnimation, l: lAnimation } = particle.strokeAnimation;
  if (h) {
    updateColorValue2(delta, h, hAnimation, 360, false);
  }
  if (s) {
    updateColorValue2(delta, s, sAnimation, 100, true);
  }
  if (l) {
    updateColorValue2(delta, l, lAnimation, 100, true);
  }
}

// node_modules/tsparticles-updater-stroke-color/esm/StrokeColorUpdater.js
var StrokeColorUpdater = class {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    var _a;
    const container = this.container, options = particle.options;
    const stroke = itemFromSingleOrMultiple(options.stroke, particle.id, options.reduceDuplicates);
    particle.strokeWidth = getRangeValue(stroke.width) * container.retina.pixelRatio;
    particle.strokeOpacity = getRangeValue(stroke.opacity ?? 1);
    particle.strokeAnimation = (_a = stroke.color) == null ? void 0 : _a.animation;
    const strokeHslColor = rangeColorToHsl(stroke.color) ?? particle.getFillColor();
    if (strokeHslColor) {
      particle.strokeColor = getHslAnimationFromHsl(strokeHslColor, particle.strokeAnimation, container.retina.reduceFactor);
    }
  }
  isEnabled(particle) {
    const color = particle.strokeAnimation, { strokeColor } = particle;
    return !particle.destroyed && !particle.spawning && !!color && ((strokeColor == null ? void 0 : strokeColor.h.value) !== void 0 && strokeColor.h.enable || (strokeColor == null ? void 0 : strokeColor.s.value) !== void 0 && strokeColor.s.enable || (strokeColor == null ? void 0 : strokeColor.l.value) !== void 0 && strokeColor.l.enable);
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateStrokeColor(particle, delta);
  }
};

// node_modules/tsparticles-updater-stroke-color/esm/index.js
async function loadStrokeColorUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("strokeColor", (container) => new StrokeColorUpdater(container), refresh);
}

// node_modules/tsparticles-shape-text/esm/TextDrawer.js
var validTypes = ["text", "character", "char"];
var TextDrawer = class {
  draw(context, particle, radius, opacity) {
    const character = particle.shapeData;
    if (character === void 0) {
      return;
    }
    const textData = character.value;
    if (textData === void 0) {
      return;
    }
    if (particle.text === void 0) {
      particle.text = itemFromSingleOrMultiple(textData, particle.randomIndexData);
    }
    const text = particle.text, style = character.style ?? "", weight = character.weight ?? "400", size = Math.round(radius) * 2, font = character.font ?? "Verdana", fill = particle.fill, offsetX = text.length * radius / 2;
    context.font = `${style} ${weight} ${size}px "${font}"`;
    const pos = {
      x: -offsetX,
      y: radius / 2
    };
    context.globalAlpha = opacity;
    if (fill) {
      context.fillText(text, pos.x, pos.y);
    } else {
      context.strokeText(text, pos.x, pos.y);
    }
    context.globalAlpha = 1;
  }
  getSidesCount() {
    return 12;
  }
  async init(container) {
    const options = container.actualOptions;
    if (validTypes.find((t) => isInArray(t, options.particles.shape.type))) {
      const shapeOptions = validTypes.map((t) => options.particles.shape.options[t]).find((t) => !!t), promises = [];
      executeOnSingleOrMultiple(shapeOptions, (shape) => {
        promises.push(loadFont(shape.font, shape.weight));
      });
      await Promise.all(promises);
    }
  }
  particleInit(container, particle) {
    if (!particle.shape || !validTypes.includes(particle.shape)) {
      return;
    }
    const character = particle.shapeData;
    if (character === void 0) {
      return;
    }
    const textData = character.value;
    if (textData === void 0) {
      return;
    }
    particle.text = itemFromSingleOrMultiple(textData, particle.randomIndexData);
  }
};

// node_modules/tsparticles-shape-text/esm/index.js
async function loadTextShape(engine, refresh = true) {
  await engine.addShape(validTypes, new TextDrawer(), refresh);
}

// node_modules/tsparticles-slim/esm/index.js
async function loadSlim(engine, refresh = true) {
  initPjs(engine);
  await loadParallaxMover(engine, false);
  await loadExternalAttractInteraction(engine, false);
  await loadExternalBounceInteraction(engine, false);
  await loadExternalBubbleInteraction(engine, false);
  await loadExternalConnectInteraction(engine, false);
  await loadExternalGrabInteraction(engine, false);
  await loadExternalPauseInteraction(engine, false);
  await loadExternalPushInteraction(engine, false);
  await loadExternalRemoveInteraction(engine, false);
  await loadExternalRepulseInteraction(engine, false);
  await loadExternalSlowInteraction(engine, false);
  await loadParticlesAttractInteraction(engine, false);
  await loadParticlesCollisionsInteraction(engine, false);
  await loadParticlesLinksInteraction(engine, false);
  await loadEasingQuadPlugin();
  await loadImageShape(engine, false);
  await loadLineShape(engine, false);
  await loadPolygonShape(engine, false);
  await loadSquareShape(engine, false);
  await loadStarShape(engine, false);
  await loadTextShape(engine, false);
  await loadLifeUpdater(engine, false);
  await loadRotateUpdater(engine, false);
  await loadStrokeColorUpdater(engine, false);
  await loadBasic(engine, refresh);
}
export {
  loadSlim
};
//# sourceMappingURL=tsparticles-slim.js.map
