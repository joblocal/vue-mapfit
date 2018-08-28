<template>
  <div class="container-fluid">
    <div class="jumbotron mt-3">
      <h1>VueMapfit</h1>
      <p>A simple vue component to a Map view via Mapfit</p>
    </div>

    <div class="card mb-5">
      <div class="card-body">
        <h2 class="card-title">Basic implementation</h2>
        <VueMapfit
          :theme="theme"
          style="width: 100%; height: 500px;"
          :center="center"
          @vueMapfit="getInstances($event)"
          :mapSettings="{ setScrollWheelEnabled: true }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VueMapfit from '../../../src/components/VueMapfit';

export default {
  components: {
    VueMapfit,
  },

  methods: {
    getInstances(data) {
      data.map.setZoom(8);
    },
  },

  data: () => ({
    center: {
      lat: 48.137154,
      lng: 11.576124,
    },
    theme: '../../mapfit.yaml',
  }),
};
</script>
