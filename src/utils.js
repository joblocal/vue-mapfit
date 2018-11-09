const styleUrl = 'https://cdn.mapfit.com/v2-4/assets/css/mapfit.css';
const scriptUrl = 'https://cdn.mapfit.com/v2-4/assets/js/mapfit.js';
const hasScript = () => Boolean(document.querySelector(`script[src="${scriptUrl}"]`));

const createNode = (tagName, options) => {
  const el = document.createElement(tagName);
  Object.entries(options).forEach(
    ([key, value]) => el.setAttribute(key, value),
  );

  return el;
};

export default function createTags() {
  if (hasScript()) {
    return Promise.resolve(window.mapfit);
  }

  const script = createNode('script', {
    type: 'text/javascript',
    defer: '',
    src: scriptUrl,
  });

  const style = createNode('link', {
    rel: 'stylesheet',
    href: styleUrl,
  });

  document.head.appendChild(style);
  document.body.appendChild(script);

  return new Promise((resolve) => {
    script.addEventListener('load', () => resolve(window.mapfit));
  });
}
