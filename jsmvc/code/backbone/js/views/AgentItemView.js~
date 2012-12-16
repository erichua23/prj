(function(){
    window.AgentItemView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#agent-item-tpl').html()),
        initialize: function () {
            _.bindAll(this, 'render', 'remove');
            this.model.on('change', this.render);
            this.model.on('destroy', this.remove);
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
