
/**
 * Module dependencies.
 */

var drop = require('drop');
var events = require('events');
var classes = require('classes');

/**
 * Expose `DropAnywhere`.
 */

module.exports = DropAnywhere;

/**
 * Make the document droppable and invoke `fn(err, upload)`.
 *
 * @param {Function} fn
 * @api public
 */

function DropAnywhere(fn, el) {
  if (!(this instanceof DropAnywhere)) return new DropAnywhere(fn, el);
  this.callback = fn;
  this.el = el;
  this.events = events(this.el, this);
  this.classes = classes(this.el);
  this.winEvents = events(window, this);
  this.events.bind('click', 'hide');
  this.events.bind('drop', 'hide');
  this.events.bind('dragleave', 'hide');
  this.winEvents.bind('dragenter', 'show');
  this.drop = drop(this.el, this.callback);
  this.add();
}

/**
 * Add the element.
 */

DropAnywhere.prototype.add = function(){
  document.body.appendChild(this.el);
};

/**
 * Remove the element.
 */

DropAnywhere.prototype.remove = function(){
  document.body.removeChild(this.el);
};

/**
 * Show the dropzone.
 */

DropAnywhere.prototype.show = function(e){
	var dt = e.dataTransfer;
	
	//this condtition makes drop-anywhere work
	//for desktop files exclusively
	if(dt.types != null && (dt.types.indexOf ? dt.types.indexOf('Files') != -1 : dt.types.contains('application/x-moz-file'))) {
		this.classes.add('show');
	}
};

/**
 * Hide the dropzone.
 */

DropAnywhere.prototype.hide = function(){
  this.classes.remove('show');
};

/**
 * Unbind.
 *
 * @api public
 */

DropAnywhere.prototype.unbind = function(){
  this.remove();
  this.winEvents.unbind();
  this.events.unbind();
  this.drop.unbind();
};
