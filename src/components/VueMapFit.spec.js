import { shallowMount } from '@vue/test-utils';

//  module under test
import VueMapfit from 'src/components/VueMapfit';

let wrapper;

const center = {
  lat: 47.850361,
  lng: 12.057812,
};

const propsData = { center };
const setCenter = jest.fn();
const setZoom = jest.fn();
const addMarker = jest.fn();
const mounted = jest.spyOn(VueMapfit, 'mounted');
const initMapfit = jest.spyOn(VueMapfit.methods, 'initMapfit');
const createStyleTag = jest.spyOn(VueMapfit.methods, 'createStyleTag');
const createScriptTag = jest.spyOn(VueMapfit.methods, 'createScriptTag');
const mapfit = {
  MapView: jest.fn(() => ({
    addMarker,
    setZoom,
    setCenter,
  })),
  LatLng: jest.fn(() => 'marker'),
  Marker: jest.fn(() => 'marker'),
};

describe('to call mapfitinit', () => {
  beforeEach(() => {
    global.window.mapfit = mapfit;
    wrapper = shallowMount(VueMapfit, { propsData });
  });

  test('to call initMapfit when mapfit is attached to the window object', () => {
    expect(initMapfit).toHaveBeenCalled();
  });
});
describe('to initialize mapfit', () => {
  beforeEach(() => {
    global.window.mapfit = undefined;
    wrapper = shallowMount(VueMapfit, {
      propsData: { center, apikey: 'apiKey' },
    });
  });

  test('to call mounted', () => {
    expect(mounted).toHaveBeenCalled();
  });

  test('to call createStyleTag method', () => {
    expect(createStyleTag).toHaveBeenCalled();
  });

  test('to call createScriptTag method', () => {
    expect(createScriptTag).toHaveBeenCalled();
  });

  test('to init mapfit', () => {
    global.window.mapfit = mapfit;
    wrapper.vm.initMapfit();

    expect(mapfit.MapView).toHaveBeenCalledWith('vue-mapfit', { theme: 'day' });
    expect(mapfit.LatLng).toHaveBeenCalledWith(center);
    expect(mapfit.Marker).toHaveBeenCalledWith('marker');
    expect(mapfit.apikey).toEqual('apiKey');
    expect(setCenter).toHaveBeenCalledWith('marker');
    expect(setZoom).toHaveBeenCalledWith(16);
    expect(addMarker).toHaveBeenCalledWith('marker');
  });

  test('to pass a theme', () => {
    wrapper.setProps({ theme: 'night' });

    expect(wrapper.props().theme).toEqual('night');
  });
});

describe('VueMapfit display', () => {
  beforeEach(() => {
    wrapper = shallowMount(VueMapfit, {
      propsData,
    });
  });

  test('matches snapshot using defaults', async () => {
    await wrapper.vm.$nextTick();

    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('VueMapfit methods generate correct scripts', () => {
  beforeEach(() => {
    wrapper = shallowMount(VueMapfit, {
      propsData,
    });
  });

  test('creates correct script tag', () => {
    const mfScript = wrapper.vm.createScriptTag(); // returns HTMLScriptElement

    expect(mfScript.type).toBe('text/javascript');
    expect(mfScript.defer).toBe(true);
    expect(mfScript.src).toBe(
      'https://cdn.mapfit.com/v2-4/assets/js/mapfit.js',
    );
  });

  test('creates correct script tag', () => {
    const mfStyle = wrapper.vm.createStyleTag(); // returns HTMLLinkElement

    expect(mfStyle.rel).toBe('stylesheet');
    expect(mfStyle.href).toBe(
      'https://cdn.mapfit.com/v2-4/assets/css/mapfit.css',
    );
  });
});

describe('VueMapfit mounts correctly', () => {
  global.document.head.appendChild = jest.fn();
  global.document.body.appendChild = jest.fn();

  beforeEach(() => {
    global.window.mapfit = undefined;
    wrapper = shallowMount(VueMapfit, {
      propsData,
    });
  });

  test('required scripts and styles are already available in browser', () => {
    const styleTag = document.createElement('link');
    styleTag.setAttribute('rel', 'stylesheet');
    styleTag.setAttribute(
      'href',
      'https://cdn.mapfit.com/v2-4/assets/css/mapfit.css',
    );

    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('type', 'text/javascript');
    scriptTag.setAttribute('defer', '');
    scriptTag.setAttribute(
      'src',
      'https://cdn.mapfit.com/v2-4/assets/js/mapfit.js',
    );

    expect(global.document.head.appendChild).toHaveBeenCalledWith(styleTag);
    expect(global.document.body.appendChild).toHaveBeenCalledWith(scriptTag);
  });
});
