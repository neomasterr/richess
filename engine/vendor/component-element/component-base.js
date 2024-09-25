function ComponentBase(options = {}) {
    this.setOptions(options);
}

ComponentBase.prototype.setOptions = function(options) {
    this.options = Object.assign({}, options);
}

ComponentBase.prototype.destroy = function() {

}

export default ComponentBase;
