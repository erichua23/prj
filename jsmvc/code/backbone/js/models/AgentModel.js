(function(){
    window.AgentModel = Backbone.Model.extend({
        urlRoot: 'index.php/api/agents',
        idAttribute: 'agent_id',
        defaults: {
            up_time: new Date(),
        },
        initialize: function() {
            this.on('change', function () {
            });
        }
    });
}());
