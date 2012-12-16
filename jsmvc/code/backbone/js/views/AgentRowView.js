(function(){
    window.AgentRowView = Backbone.View.extend({
        tagName: 'tr',
        events: {
            'click .delete': 'deleteAgent'
        },
        template: _.template($('#agent-row-tpl').html()),
        initialize: function () {
            _.bindAll(this, 'render', 'remove');

            this.model.on('destroy', this.remove);
        },
        deleteAgent: function () {
            this.model.destroy({
                success: function(model, response) {
                    alert('success');
                },
                wait: true
            });
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()))
            return this;
        },
        remove: function () {
            this.$el.remove();
        }
    });
}());
