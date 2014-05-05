<%= fileHeader %>
/* jshint expr: true */

'use strict';

define(function(require) {
    var <%= name %> = require('<%= name %>');

    describe('<%= name %>', function() {
        it('should exist', function() {
            expect(<%= name %>).to.exist;
        });
    });
});
