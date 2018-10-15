import td from 'testdouble';

// module under test
import { createTags } from './utils';

afterEach(() => {
  // remove generated DOMNodes
  document.querySelectorAll('script')
    .forEach(node => node.parentNode.removeChild(node));
  document.querySelectorAll('link')
    .forEach(node => node.parentNode.removeChild(node));
});

describe('createTags', () => {
  let wrapper;

  beforeEach(() => {
    expect(document.body.querySelector('script')).toBeNull();
    expect(document.head.querySelector('link')).toBeNull();
  });

  test('to return a Promise', () => {
    const promise = createTags();

    expect(typeof promise.then).toBe('function');
    expect(typeof promise.catch).toBe('function');
  });

  test('to add <script> tag to document.body', () => {
    createTags();

    const script = document.body.querySelector('script');
    expect(script).not.toBeNull();

    expect(script).toHaveProperty('type', 'text/javascript');
    expect(script).toHaveProperty('defer', true);
    expect(script).toHaveProperty('src', 'https://cdn.mapfit.com/v2-4/assets/js/mapfit.js');
  });

  test('to add <link rel="stylesheet"> tag', () => {
    createTags();

    const link = document.head.querySelector('link');
    expect(link).not.toBeNull();

    expect(link).toHaveProperty('rel', 'stylesheet');
    expect(link).toHaveProperty('href', 'https://cdn.mapfit.com/v2-4/assets/css/mapfit.css');
  });
});
