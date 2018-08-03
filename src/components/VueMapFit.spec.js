import { mount } from '@vue/test-utils';
import VueMapfit from 'src/components/VueMapfit';

let wrapper;

const center = {
  lat: 47.850361,
  lng: 12.057812,
};

describe('VueMapfit display', () => {
  beforeEach(() => {
    wrapper = mount(VueMapfit, {
      propsData: {
        center,
      },
    });
  });

  test('matches snapshot using defaults', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('VueMapfit methods generate correct scripts', () => {
  beforeEach(() => {
    wrapper = mount(VueMapfit, {
      propsData: {
        center,
      },
    });
  });

  test('creates correct script tag', () => {
    const mfScript = wrapper.vm.createScriptTag(); // returns HTMLScriptElement

    expect(mfScript.type).toBe('text/javascript');
    expect(mfScript.defer).toBe(true);
    expect(mfScript.src).toBe('http://cdn.mapfit.com/v2-4/assets/js/mapfit.js');
  });

  test('creates correct script tag', () => {
    const mfStyle = wrapper.vm.createStyleTag(); // returns HTMLLinkElement

    expect(mfStyle.rel).toBe('stylesheet');
    expect(mfStyle.href).toBe('http://cdn.mapfit.com/v2-4/assets/css/mapfit.css');
  });
});

describe('VueMapfit initialization', () => {
  global.document.head.appendChild = jest.fn();
  global.document.body.appendChild = jest.fn();

  beforeEach(() => {
    wrapper = mount(VueMapfit, {
      propsData: {
        center,
      },
    });
  });

  test('required scripts and styles are already available in browser', () => {
    const styleTag = document.createElement('link');
    styleTag.setAttribute('rel', 'stylesheet');
    styleTag.setAttribute('href', 'http://cdn.mapfit.com/v2-4/assets/css/mapfit.css');

    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('type', 'text/javascript');
    scriptTag.setAttribute('defer', '');
    scriptTag.setAttribute('src', 'http://cdn.mapfit.com/v2-4/assets/js/mapfit.js');

    expect(global.document.head.appendChild).toHaveBeenCalledWith(styleTag);
    expect(global.document.body.appendChild).toHaveBeenCalledWith(scriptTag);
  });
});
