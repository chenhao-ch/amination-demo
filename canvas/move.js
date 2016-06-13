const move = {
  init(ctx, w, h, time) {
    this.ctx = ctx;
    this.width = w;
    this.height = h;
    this.time = time || 1000;
    this.startTime = new Date().getTime();
    this.tween = 'easeInQuad';
    this.moveState = 'DOING';

    const el = document.getElementById('moveTween');
    const fragment = document.createDocumentFragment();
    for(let m in tween) {
      const ops = document.createElement('option');
      ops.value = m;
      ops.textContent = m;
      fragment.appendChild(ops);
    }
    el.appendChild(fragment);
    el.addEventListener('change', (e) => {
      const val = e.target.value;
      if(this.tween === val) {
        return;
      }

      this.tween = val;
      this.moveState = 'DOING';
      this.startTime = new Date().getTime();
    });
  },
  draw() {
    if(this.moveState === 'DONE') {
      return;
    }

    let x = 0;
    let y = 0;
    const ctx = this.ctx;

    const now = new Date().getTime();
    const runTime = (now - this.startTime) / this.time;
    if(runTime >= 1) {
      // 动画结束
      this.moveState = 'DONE';
    }

    x = tween[this.tween].call(null, runTime) * (this.width - 20);

    ctx.beginPath();
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.fillStyle = '#aa0000';
    ctx.fillRect(x, y, 20, 20);
  }
};

const tween = {
    easeInQuad: function(pos) {
        return Math.pow(pos, 2);
    },
    easeOutQuad: function(pos) {
        return - (Math.pow((pos - 1), 2) - 1);
    },
    easeInOutQuad: function(pos) {
        if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 2);
        return - 0.5 * ((pos -= 2) * pos - 2);
    },
    easeInCubic: function(pos) {
        return Math.pow(pos, 3);
    },
    easeOutCubic: function(pos) {
        return (Math.pow((pos - 1), 3) + 1);
    },
    easeInOutCubic: function(pos) {
        if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3);
        return 0.5 * (Math.pow((pos - 2), 3) + 2);
    },
    easeInQuart: function(pos) {
        return Math.pow(pos, 4);
    },
    easeOutQuart: function(pos) {
        return - (Math.pow((pos - 1), 4) - 1)
    },
    easeInOutQuart: function(pos) {
        if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 4);
        return - 0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
    },
    easeInQuint: function(pos) {
        return Math.pow(pos, 5);
    },
    easeOutQuint: function(pos) {
        return (Math.pow((pos - 1), 5) + 1);
    },
    easeInOutQuint: function(pos) {
        if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 5);
        return 0.5 * (Math.pow((pos - 2), 5) + 2);
    },
    easeInSine: function(pos) {
        return - Math.cos(pos * (Math.PI / 2)) + 1;
    },
    easeOutSine: function(pos) {
        return Math.sin(pos * (Math.PI / 2));
    },
    easeInOutSine: function(pos) {
        return ( - .5 * (Math.cos(Math.PI * pos) - 1));
    },
    easeInExpo: function(pos) {
        return (pos == 0) ? 0 : Math.pow(2, 10 * (pos - 1));
    },
    easeOutExpo: function(pos) {
        return (pos == 1) ? 1 : -Math.pow(2, -10 * pos) + 1;
    },
    easeInOutExpo: function(pos) {
        if (pos == 0) return 0;
        if (pos == 1) return 1;
        if ((pos /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (pos - 1));
        return 0.5 * ( - Math.pow(2, -10 * --pos) + 2);
    },
    easeInCirc: function(pos) {
        return - (Math.sqrt(1 - (pos * pos)) - 1);
    },
    easeOutCirc: function(pos) {
        return Math.sqrt(1 - Math.pow((pos - 1), 2))
    },
    easeInOutCirc: function(pos) {
        if ((pos /= 0.5) < 1) return - 0.5 * (Math.sqrt(1 - pos * pos) - 1);
        return 0.5 * (Math.sqrt(1 - (pos -= 2) * pos) + 1);
    },
    easeOutBounce: function(pos) {
        if ((pos) < (1 / 2.75)) {
            return (7.5625 * pos * pos);
        } else if (pos < (2 / 2.75)) {
            return (7.5625 * (pos -= (1.5 / 2.75)) * pos + .75);
        } else if (pos < (2.5 / 2.75)) {
            return (7.5625 * (pos -= (2.25 / 2.75)) * pos + .9375);
        } else {
            return (7.5625 * (pos -= (2.625 / 2.75)) * pos + .984375);
        }
    },
    easeInBack: function(pos) {
        var s = 1.70158;
        return (pos) * pos * ((s + 1) * pos - s);
    },
    easeOutBack: function(pos) {
        var s = 1.70158;
        return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1;
    },
    easeInOutBack: function(pos) {
        var s = 1.70158;
        if ((pos /= 0.5) < 1) return 0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s));
        return 0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
    },
    elastic: function(pos) {
        return - 1 * Math.pow(4, -8 * pos) * Math.sin((pos * 6 - 1) * (2 * Math.PI) / 2) + 1;
    },
    swingFromTo: function(pos) {
        var s = 1.70158;
        return ((pos /= 0.5) < 1) ? 0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s)) : 0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
    },
    swingFrom: function(pos) {
        var s = 1.70158;
        return pos * pos * ((s + 1) * pos - s);
    },
    swingTo: function(pos) {
        var s = 1.70158;
        return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
    },
    bounce: function(pos) {
        if (pos < (1 / 2.75)) {
            return (7.5625 * pos * pos);
        } else if (pos < (2 / 2.75)) {
            return (7.5625 * (pos -= (1.5 / 2.75)) * pos + .75);
        } else if (pos < (2.5 / 2.75)) {
            return (7.5625 * (pos -= (2.25 / 2.75)) * pos + .9375);
        } else {
            return (7.5625 * (pos -= (2.625 / 2.75)) * pos + .984375);
        }
    },
    bouncePast: function(pos) {
        if (pos < (1 / 2.75)) {
            return (7.5625 * pos * pos);
        } else if (pos < (2 / 2.75)) {
            return 2 - (7.5625 * (pos -= (1.5 / 2.75)) * pos + .75);
        } else if (pos < (2.5 / 2.75)) {
            return 2 - (7.5625 * (pos -= (2.25 / 2.75)) * pos + .9375);
        } else {
            return 2 - (7.5625 * (pos -= (2.625 / 2.75)) * pos + .984375);
        }
    },
    easeFromTo: function(pos) {
        if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 4);
        return - 0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
    },
    easeFrom: function(pos) {
        return Math.pow(pos, 4);
    },
    easeTo: function(pos) {
        return Math.pow(pos, 0.25);
    },
    linear: function(pos) {
        return pos
    },
    sinusoidal: function(pos) {
        return ( - Math.cos(pos * Math.PI) / 2) + 0.5;
    },
    reverse: function(pos) {
        return 1 - pos;
    },
    mirror: function(pos, transition) {
        transition = transition || tween.sinusoidal;
        if (pos < 0.5) return transition(pos * 2);
        else return transition(1 - (pos - 0.5) * 2);
    },
    flicker: function(pos) {
        var pos = pos + (Math.random() - 0.5) / 5;
        return tween.sinusoidal(pos < 0 ? 0 : pos > 1 ? 1 : pos);
    },
    wobble: function(pos) {
        return ( - Math.cos(pos * Math.PI * (9 * pos)) / 2) + 0.5;
    },
    pulse: function(pos, pulses) {
        return ( - Math.cos((pos * ((pulses || 5) - .5) * 2) * Math.PI) / 2) + .5;
    },
    blink: function(pos, blinks) {
        return Math.round(pos * (blinks || 5)) % 2;
    },
    spring: function(pos) {
        return 1 - (Math.cos(pos * 4.5 * Math.PI) * Math.exp( - pos * 6));
    },
    none: function(pos) {
        return 0
    },
    full: function(pos) {
        return 1
    }
}
