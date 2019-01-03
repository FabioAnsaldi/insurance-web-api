'use strict';

requirejs.config({
    //baseUrl: 'src/js/lib',
    paths: {
        app: '/app',
        bootstrap: '../../assets/bootstrap/dist/js/bootstrap.bundle.min',
        jquery: '../../assets/jquery/dist/jquery.min',
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        }
    }
});