/* function convertColor(r, g, b) {
  const color = {};

  color.r = r;
  color.g = g;
  color.b = b;

  color.rgb = function () {
    const { r, g, b } = this;
    return `rgb(${r}, ${g}, ${b})`;
  };

  color.hex = function () {
    const { r, g, b } = this;
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  return color;
} */

/* function Color(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
}

Color.prototype.rgb = function () {
  const { r, g, b } = this;
  return `rgb(${r}, ${g}, ${b})`;
};

Color.prototype.hex = function () {
  const { r, g, b } = this;
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

Color.prototype.rgba = function (a = 1.0) {
  const { r, g, b } = this;
  return `rgbba(${r}, ${g}, ${b}, ${a})`;
}; */

class Color {
  // constructor -> fungsi yang akan pertama kali dijalankan saat instansiasi object
  // instansiasi -> saat dimana kita menggunakan new
  constructor(r, g, b, name) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.name = name;
    this.calcHSL();
  }

  // method
  innerRGB() {
    const { r, g, b } = this;
    return `${r}, ${g}, ${b}`;
  }

  colorName() {
    console.log(`The color name is ${this.name}`);
  }

  rgb() {
    return `rgb(${this.innerRGB()})`;
  }

  rgba(a = 1.0) {
    return `rgba(${this.innerRGB()}, ${a})`;
  }

  hex() {
    const { r, g, b } = this;
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  hsl() {
    const { h, s, l } = this;
    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  fullySaturated() {
    const { h, l } = this;
    return `hsl(${h}, 100%, ${l}%)`;
  }

  opposite() {
    const { h, s, l } = this;
    const newHue = (h + 180) % 360;
    return `hsl(${newHue}, ${s}%, ${l}%)`;
  }

  calcHSL() {
    let { r, g, b } = this;
    // make r, g, b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // finid greates and smallest channel values
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;
    if (delta == 0) h = 0;
    else if (cmax == r)
      //red is max
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      // green is max
      h = (b - r) / delta + 2;
    // blue is max
    else h = (r - g) / delta + 4;

    // make negative hues positive behind 360 derajat
    h = Math.round(h * 360);
    // calculate lightness
    l = (cmax + cmin) / 2;

    // calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    this.h = h;
    this.s = s;
    this.l = l;
  }
}

const skyColor = new Color(185, 243, 252, 'Sky');
