(function(){
    window.AgentsView = Backbone.View.extend({
        el: '#agent-ctn',
        initialize: function () {
            _.bindAll(this, 'addAllAgent', 'addOneAgent');
            console.log('AgentsView initialize');
            this.agents = window.agents;
            this.agents.bind('add', this.addOneAgent);
            this.agents.bind('reset', this.addAllAgent);

            this.agents.fetch();
        },
        addOneAgent: function (agent) {
            var view = new AgentItemView({model: agent});
            this.$el.append(view.render().el);
        },
        addAllAgent: function () {
            this.agents.each(this.addOneAgent);
        }
    });
}());
