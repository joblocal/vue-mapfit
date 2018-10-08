import { shallowMount } from '@vue/test-utils';

//  module under test
import VueMapfit from 'src/components/VueMapfit';

jest.spyOn(global.document.head, 'appendChild');
jest.spyOn(global.document.body, 'appendChild');

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
const setMapSettings = jest.spyOn(VueMapfit.methods, 'setMapSettings');
const hasMapSettings = jest.spyOn(VueMapfit.computed, 'hasMapSettings');
const exposeInstances = jest.spyOn(VueMapfit.methods, 'exposeInstances');
const mapfit = {
  MapView: jest.fn(() => ({
    addMarker,
    setZoom,
    setCenter,
  })),
  LatLng: jest.fn(() => 'marker'),
  Marker: jest.fn(() => 'marker'),
};

describe('to mount component without mapfit attached to window object', () => {
  beforeEach(() => {
    global.window.mapfit = undefined;
    wrapper = shallowMount(VueMapfit, { propsData });
  });

  test('to call mounted hook', () => {
    expect(mounted).toHaveBeenCalled();
  });

  test('to not have mapfit attached to the window object', () => {
    expect(global.window.mapfit).toBeUndefined();
  });

  test('to call createStyleTag method', () => {
    expect(createStyleTag).toHaveBeenCalled();
  });

  test('to call createScriptTag method', () => {
    expect(createScriptTag).toHaveBeenCalled();
  });

  test('to call appenChild method', () => {
    expect(global.document.head.appendChild).toHaveBeenCalled();
  });

  test('to call body appenChild method', () => {
    expect(global.document.body.appendChild).toHaveBeenCalled();
  });

  test('to call initMapfit', () => {
    jest.spyOn(wrapper.vm, 'initMapfit');
    global.window.mapfit = mapfit;
    wrapper.vm.initMapfit();

    expect(setMapSettings).not.toHaveBeenCalled();
    expect(wrapper.vm.initMapfit).toHaveBeenCalled();
    expect(mapfit.apikey).toBeUndefined();
  });
});

describe('to mount component with mapfit attached to window object', () => {
  beforeEach(() => {
    global.window.mapfit = mapfit;
    wrapper = shallowMount(VueMapfit, {
      propsData: {
        center,
        apikey: 'apikey',
        theme: 'night',
        mapSettings: {
          setZoom: 16,
        },
      },
    });
  });

  test('to call initMapfit on mounted', () => {
    expect(initMapfit).toHaveBeenCalled();
  });

  test('to initialize mapfit', () => {
    expect(mapfit.MapView).toHaveBeenCalledWith('vue-mapfit', { theme: 'night' });
    expect(mapfit.LatLng).toHaveBeenCalledWith(center);
    expect(mapfit.Marker).toHaveBeenCalledWith('marker');
    expect(mapfit.apikey).toEqual('apikey');
    expect(setCenter).toHaveBeenCalledWith('marker');
    expect(setZoom).toHaveBeenCalledWith(16);
    expect(addMarker).toHaveBeenCalledWith('marker');
    expect(hasMapSettings).toHaveBeenCalled();
    expect(setMapSettings).toHaveBeenCalled();
    expect(exposeInstances).toHaveBeenCalled();
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
