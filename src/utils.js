function createNode(tagName, options) {
  const el = document.createElement(tagName);
  Object.entries(options).forEach(
    ([key, value]) => el.setAttribute(key, value),
  );

  return el;
}

export function createTags() {
  const script = createNode('script', {
    type: 'text/javascript',
    defer: '',
    src: 'https://cdn.mapfit.com/v2-4/assets/js/mapfit.js',
  });

  const style = createNode('link', {
    rel: 'stylesheet',
    href: 'https://cdn.mapfit.com/v2-4/assets/css/mapfit.css',
  });

  document.head.appendChild(style);
  document.body.appendChild(script);

  return new Promise((resolve) => {
    script.addEventListener('load', () => resolve(window.mapfit));
  });
}
