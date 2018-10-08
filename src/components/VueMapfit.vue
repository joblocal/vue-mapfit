<template>
  <div :id="mapId"></div>
</template>

<script>

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
    mapfitObject: {
      Marker: null,
      MapView: null,
    },
  }),

  computed: {
    hasMapSettings() {
      return Object.keys(this.mapSettings).length > 0;
    },

    mapId() {
      const uid = () => Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);

      return ['map', uid(), uid(), uid(), uid()].join('-');
    },
  },

  methods: {
    setMapSettings(map) {
      Object.keys(this.mapSettings).map(setting => map[setting](this.mapSettings[setting]));
    },

    exposeInstances(instances) {
      this.$emit('vueMapfit', instances);
    },

    initMapfit() {
      const { mapfit } = window;
      // draw map
      const map = mapfit.MapView(this.mapId, { theme: this.theme });

      const position = mapfit.LatLng(this.center);
      const marker = mapfit.Marker(position);

      if (this.apikey) mapfit.apikey = this.apikey;

      // set the map center on marker position
      map.setCenter(position);

      // add marker to map
      map.addMarker(marker);

      this.exposeInstances({ map, marker });

      if (this.hasMapSettings) this.setMapSettings(map);
    },

    createScriptTag() {
      const mfScript = document.createElement('script');
      mfScript.setAttribute('type', 'text/javascript');
      mfScript.setAttribute('defer', '');
      mfScript.setAttribute('src', 'https://cdn.mapfit.com/v2-4/assets/js/mapfit.js');

      return mfScript;
    },

    createStyleTag() {
      const mfStyle = document.createElement('link');
      mfStyle.setAttribute('rel', 'stylesheet');
      mfStyle.setAttribute('href', 'https://cdn.mapfit.com/v2-4/assets/css/mapfit.css');

      return mfStyle;
    },
  },

  mounted() {
    if (typeof window === 'undefined') return;

    if (typeof window.mapfit === 'undefined') {
      const style = this.createStyleTag();
      const script = this.createScriptTag();

      script.addEventListener('load', () => this.initMapfit());

      document.head.appendChild(style);
      document.body.appendChild(script);
    } else {
      this.initMapfit();
    }
  },
};
</script>
