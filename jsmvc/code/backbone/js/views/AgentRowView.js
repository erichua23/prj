(function(){
    window.AgentRowView = Backbone.View.extend({
        tagName: 'tr',
        events: {
            'click .delete': 'deleteAgent',
            'click .update-time': 'updateTime'
        },
        template: _.template($('#agent-row-tpl').html()),
        initialize: function () {
            _.bindAll(this, 'render', 'remove');

            this.model.on('destroy', this.remove);
            this.model.on('change', this.render);
        },
        deleteAgent: function () {
            this.model.destroy({
                wait: true
            });
        },
        updateTime: function () {
            this.model.set('up_time', new Date());
            this.model.save();
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
