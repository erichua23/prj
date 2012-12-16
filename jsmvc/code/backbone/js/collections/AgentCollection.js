(function(){
    window.AgentCollection = Backbone.Collection.extend({
        model: AgentModel,
        url: 'index.php/api/agents'
    });
    window.agents = new AgentCollection();
}());
