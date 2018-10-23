# Vue Mapfit

This Project provides a SSR compatible vue component which shows a simple Map Vue generated by Mapfit.

## Requirements

- Yarn or npm
- Vue 2.X.X

## Installation

Using yarn:

```sh
$ yarn add @joblocal/vue-mapfit
```

Using npm:

```sh
$ npm install @joblocal/vue-mapfit
```

### Usage

After installing the package you can use it as followed.

```javascript
<template>
  <VueMapfit
    :apikey="your-api-key"
    :center="[65.43, -34.56]"
  />
</template>

<script>
  import VueMapfit from '@joblocal/vue-mapfit';

  export default {
    components: {
      VueMapfit,
    },
  };
</script>
```

If you want more control over the mapfit,
you can bind to @vueMapfit which exposes the Marker and MapView instances and allows you to use all mapfit methods.
Also, please note that you can use all available Mapfit methods through window.mapfit. We expose the used Marker and MapView instances that are used by the component for more control.

```Javascript
<template>
  <VueMapfit
    :apikey="your-api-key"
    :center="[65.43, -34.56]"
    @vueMapfit="getInstances($event)"
  />
</template>
<script>
  import VueMapfit from '@joblocal/vue-mapfit';

  export default {
    components: {
      VueMapfit,
    },
    methods: {
      getInstances(data) {
        data.map.setZoom(8);
        console.log(data.map.getScrollWheelEnabled());
      },
    },
  };
</script>
```

### Properties

| Property    | Required | Type           | Description                                                                                                                                                                                   |
| ----------- | -------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey      | false    | String         | Apikey is not required. Anyways it could be useful to generate one. You can generate them [here](https://mapfit.com).                                                                         |
| center      | true     | Object / Array | Provide an Center Point to your map                                                                                                                                                           |
| theme       | false    | String         | Provide a yaml file with the expected settings. Defaults to day theme. You can pass, "day," "night," "grayscale," or the location of the yaml file to use custom theme or different language. Default: "day" |
| mapSettings | false    | Object         | Pass an object with any setMethod in the MapOptions methods. ex: :mapSettings="{ setZoom: 16, setScrollWheelEnabled: true }

### Development

#### Installing dependencies

Run this command.

```sh
$ yarn install
```

#### Test

To make sure that the installation went fine. Run this command.

```sh
$ yarn test
```

#### Dev Server

To start the development server use

```sh
$ yarn start:development
```

## Built with

- [Mapfit](https://mapfit.com/) - Maps API
- [Vue js](http://www.vuejs.org) - Javascript Framework
- [Yarn](https://yarnpkg.com/lang/en/) - Dependency Management
- [Webpack](https://webpack.js.org/) - Application Bundler
- [Jest](https://facebook.github.io/jest/) - Test Runner

### Also see

- [Vue-Test-Utils Api](https://vue-test-utils.vuejs.org/en/api/)
- [Jest Api](https://facebook.github.io/jest/docs/en/api.html)

## Contributing

Please read through our [contributing guidelines](https://github.com/joblocal/vue-mapfit/blob/master/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and feature requests.

## Authors

- **Joblocal GmbH** - _Initial work_ - [Joblocal](https://github.com/joblocal)

See also the list of [contributors](https://github.com/joblocal/vue-mapfit/contributors) who participated in this project.
