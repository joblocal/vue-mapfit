import td from 'testdouble';
import { shallowMount } from '@vue/test-utils';

import * as utils from '../utils';

// module under test
import VueMapfit from 'src/components/VueMapfit';

const theme = 'day';
const center = {
  lat: 47.850361,
  lng: 12.057812,
};

const propsData = {
  center,
  theme,
};

afterEach(() => {
  td.reset();
});

describe('mounted for mapfit', () => {
  const map = td.object(['addMarker', 'setZoom', 'setCenter']);
  const mapfit = {
    MapView: td.function(),
    LatLng: td.function(),
    Marker: td.function(),
  };

  let wrapper;
  beforeEach(() => {
    const createTags = td.replace(utils, 'createTags');
    td.when(createTags()).thenResolve(mapfit);
  });

  test('to initialize a MapView', async () => {
    const MapView = td.replace(mapfit, 'MapView');
    td.when(MapView(td.matchers.isA(String), { theme })).thenReturn(map);

    wrapper = shallowMount(VueMapfit, { propsData });
    await wrapper.vm.$nextTick();

    td.verify(map.setCenter(td.matchers.anything()));
    td.verify(map.addMarker(td.matchers.anything()));
  });

  test('to set the Mapfit center correctly', async () => {
    td.when(mapfit.MapView(), { ignoreExtraArgs: true }).thenReturn(map);

    const latLng = 'latlng';
    td.when(mapfit.LatLng(center)).thenReturn(latLng);

    wrapper = shallowMount(VueMapfit, { propsData });
    await wrapper.vm.$nextTick();

    td.verify(map.setCenter(latLng));
  });

  test('to set the Mapfit marker correctly', async () => {
    td.when(mapfit.MapView(), { ignoreExtraArgs: true }).thenReturn(map);

    const marker = 'the marker';
    td.when(mapfit.Marker(td.matchers.anything())).thenReturn(marker);

    wrapper = shallowMount(VueMapfit, { propsData });
    await wrapper.vm.$nextTick();

    td.verify(map.addMarker(marker));
  });
});

describe('mounted for mapid', () => {
  const map = td.object(['addMarker', 'setZoom', 'setCenter']);
  const mapfit = {
    MapView: () => map,
    LatLng: td.function(),
    Marker: td.function(),
  };

  let wrapper;
  beforeEach(() => {
    mapfit.apikey = null;

    const createTags = td.replace(utils, 'createTags');
    td.when(createTags()).thenResolve(mapfit);
  });

  test('to set container id signature correctly', async () => {
    wrapper = shallowMount(VueMapfit, { propsData });
    await wrapper.vm.$nextTick();

    const regex = /^map-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}$/i;
    const valid = regex.test(wrapper.attributes().id);
    expect(valid).toBeTruthy();
  });
})

describe('mounted for apiKey', () => {
  const map = td.object(['addMarker', 'setZoom', 'setCenter']);
  const mapfit = {
    MapView: () => map,
    LatLng: td.function(),
    Marker: td.function(),
  };

  let wrapper;
  beforeEach(() => {
    mapfit.apikey = null;

    const createTags = td.replace(utils, 'createTags');
    td.when(createTags()).thenResolve(mapfit);
  });

  test('not to set the mapfit.apiKey when not provided', async () => {
    wrapper = shallowMount(VueMapfit, { propsData });
    await wrapper.vm.$nextTick();

    expect(mapfit.apikey).toBe(null);
  });

  test('to set the mapfit.apiKey when provided', async () => {
    const apikey = '123';
    wrapper = shallowMount(VueMapfit, {
      propsData: { ...propsData, apikey },
    });
    await wrapper.vm.$nextTick();

    expect(mapfit.apikey).toBe(apikey);
  });
});
