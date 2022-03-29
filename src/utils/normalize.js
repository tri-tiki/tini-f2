const CAPITALIZED_ATTRS_MAP = {
  fillStyle: 'FillStyle',
  fontSize: 'FontSize',
  globalAlpha: 'GlobalAlpha',
  opacity: 'GlobalAlpha',
  lineCap: 'LineCap',
  lineJoin: 'LineJoin',
  lineWidth: 'LineWidth',
  miterLimit: 'MiterLimit',
  strokeStyle: 'StrokeStyle',
  textAlign: 'TextAlign',
  textBaseline: 'TextBaseline',
  shadow: 'Shadow',
  font: 'Font',
};

const strLen = (str) => {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
      len++;
    } else {
      len += 2;
    }
  }
  return len;
};

export const normalizeContext = (ctx) => {
  Object.keys(CAPITALIZED_ATTRS_MAP).map((key) => {
    Object.defineProperty(ctx, key, {
      set: (value) => {
        ctx['__' + key] = value;
        if (key === 'shadow' && ctx.setShadow && Array.isArray(value)) {
          ctx.setShadow(value[0], value[1], value[2], value[3]);
          return;
        }
        const name = 'set' + CAPITALIZED_ATTRS_MAP[key];
        if (!ctx[name]) {
          return;
        }
        ctx[name](value);
      },
    });
    return key;
  });

  if (!ctx.measureText) {
    ctx.measureText = (text) => {
      let fontSize = 12;
      const font = ctx.__font;
      if (font) {
        fontSize = parseInt(font.split(' ')[3], 10);
      }
      fontSize /= 2;
      return {
        width: strLen(text) * fontSize,
      };
    };
  }
  return ctx;
};

export const normalizeEvent = (event) => {
  if (!event) return;
  if (!event.preventDefault) {
    event.preventDefault = function () {};
  }
  return {
    ...event,
    touches: event.touches.map((touch) => ({
      ...touch,
      x: touch.clientX,
      y: touch.clientY,
    })),
  };
};
