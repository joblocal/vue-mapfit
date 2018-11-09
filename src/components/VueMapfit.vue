<template>
  <div :id="mapId"></div>
</template>

<script>
import createTags from '../utils';

console.warn('Deprecation warning: Unfortunately Mapfit decided to sunset their mapping platform until October 29, 2018. You will have to use another mapping vendor.');

function createMapId() {
  const uid = () => Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

  return ['map', uid(), uid(), uid(), uid()].join('-');
}
export default {
  props: {
    apikey: {
      type: String,
    },
    center: {
      type: [Array, Object],
      required: true,
    },
    theme: {
      type: String,
      default: 'day',
    },
    mapSettings: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    mapId: 'map',
    mapfitObject: {
      Marker: null,
      MapView: null,
    },
  }),

  methods: {
    initMapfit(mapfit) {
      /* eslint no-param-reassign: ["error", { "props": false }] */
      if (this.apikey) mapfit.apikey = this.apikey;

      const map = mapfit.MapView(this.mapId, { theme: this.theme });
      Object.entries(this.mapSettings).forEach(([key, value]) => map[key](value));

      const position = mapfit.LatLng(this.center);
      const marker = mapfit.Marker(position);

      map.setCenter(position);
      map.addMarker(marker);

      this.$emit('vueMapfit', { map, marker });
    },
  },

  mounted() {
    if (typeof window === 'undefined') return;

    this.mapId = createMapId();
    createTags().then(mapfit => this.initMapfit(mapfit));
  },
};
</script>
