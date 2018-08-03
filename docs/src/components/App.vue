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
          style="width: 100%; height: 500px;"
          :center="center"
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

  data: () => ({
    center: {
      lat: 47.8488075,
      lng: 12.0768717,
    },
  }),
};
</script>
