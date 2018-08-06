<template>
  <div id="vue-mapfit"></div>
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
    zoom: {
      type: Number,
      default: 16,
    },
  },

  methods: {
    initMapfit() {
      const { mapfit } = window;

      if (this.apikey) mapfit.apikey = this.apikey;

      // draw map
      const map = mapfit.MapView('vue-mapfit', { theme: 'day' });

      const position = mapfit.LatLng(this.center);
      const marker = mapfit.Marker(position);

      // set the map center on marker position
      map.setCenter(position);

      // add marker to map
      map.addMarker(marker);

      // set map zoom
      map.setZoom(this.zoom);
    },

    createScriptTag() {
      const mfScript = document.createElement('script');
      mfScript.setAttribute('type', 'text/javascript');
      mfScript.setAttribute('defer', '');
      mfScript.setAttribute('src', 'http://cdn.mapfit.com/v2-4/assets/js/mapfit.js');

      return mfScript;
    },

    createStyleTag() {
      const mfStyle = document.createElement('link');
      mfStyle.setAttribute('rel', 'stylesheet');
      mfStyle.setAttribute('href', 'http://cdn.mapfit.com/v2-4/assets/css/mapfit.css');

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
