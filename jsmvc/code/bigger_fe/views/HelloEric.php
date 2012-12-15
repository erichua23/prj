initialize: function () {
    this.XModel.bind('reset', this.render);
},
event: {
    'click button': 'updateX'
},
updateX: function () {
    XModel.fetch();
}
render: function () {
    $(this.el).html(this.template(this.XModel.toJSON()));
}

