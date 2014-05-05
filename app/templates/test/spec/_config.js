<%= fileHeader %>
'use strict';

require.config({
    baseUrl: '../../app/scripts',
    deps: ['runner'],
    paths: {
        spec: '../../test/spec',
        runner: '../../test/spec/main',
        appConfig: 'config'
    },
    shim: {
        runner: ['appConfig']
    }
});
