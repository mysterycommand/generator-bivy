<%= fileHeader %>
/* jshint expr: true */

'use strict';

define(function(require) {
    var <%= name.split('/').pop() %> = require('<%= name %>');

    describe('<%= name.split('/').pop() %>', function() {
        it('should exist', function() {
            expect(<%= name.split('/').pop() %>).to.exist;
        });
    });
});
