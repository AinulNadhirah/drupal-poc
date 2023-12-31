/*
 List of plugins:
 	- Trace 1.0
	- Placeholder
	- Get ducument size
	- Easing 1.3
	- imagesLoaded PACKAGED v3.0.4 : a jquery plugin for preloading images
	- fullscreen background

	- ColorBox v1.3.20.1
	- Tiny Scrollbar 1.81
	- jAlert 1.1
	- Custom Combobox
	- CUSTOM FORM ELEMENTS (Radio button & Checkbox)

	- Inview
*/



/*
 * Trace Debug
 */
var traceId=0;
function trace(s){
	var logExist = $('#log').html();
	if (logExist==null || logExist=="undefined"){ $('body').append('<div id="log"></div>'); $("#log").draggable(); }
	$('#log').prepend('<p>'+traceId+'. '+s+'</p>');
	traceId++
}





/*
* Placeholder plugin for jQuery
* ---
* Copyright 2010, Daniel Stocks (http://webcloud.se)
* Released under the MIT, BSD, and GPL Licenses.
*/
(function(b){function d(a){this.input=a;a.attr("type")=="password"&&this.handlePassword();b(a[0].form).submit(function(){if(a.hasClass("placeholder")&&a[0].value==a.attr("placeholder"))a[0].value=""})}d.prototype={show:function(a){if(this.input[0].value===""||a&&this.valueIsPlaceholder()){if(this.isPassword)try{this.input[0].setAttribute("type","text")}catch(b){this.input.before(this.fakePassword.show()).hide()}this.input.addClass("placeholder");this.input[0].value=this.input.attr("placeholder")}},
hide:function(){if(this.valueIsPlaceholder()&&this.input.hasClass("placeholder")&&(this.input.removeClass("placeholder"),this.input[0].value="",this.isPassword)){try{this.input[0].setAttribute("type","password")}catch(a){}this.input.show();this.input[0].focus()}},valueIsPlaceholder:function(){return this.input[0].value==this.input.attr("placeholder")},handlePassword:function(){var a=this.input;a.attr("realType","password");this.isPassword=!0;if(b.browser.msie&&a[0].outerHTML){var c=b(a[0].outerHTML.replace(/type=(['"])?password\1/gi,
"type=$1text$1"));this.fakePassword=c.val(a.attr("placeholder")).addClass("placeholder").focus(function(){a.trigger("focus");b(this).hide()});b(a[0].form).submit(function(){c.remove();a.show()})}}};var e=!!("placeholder"in document.createElement("input"));b.fn.placeholder=function(){return e?this:this.each(function(){var a=b(this),c=new d(a);c.show(!0);a.focus(function(){c.hide()});a.blur(function(){c.show(!1)});b.browser.msie&&(b(window).load(function(){a.val()&&a.removeClass("placeholder");c.show(!0)}),
a.focus(function(){if(this.value==""){var a=this.createTextRange();a.collapse(!0);a.moveStart("character",0);a.select()}}))})}})(jQuery);








/*
 * Get ducument size
 * @param int 0 ~ 3
 * @return array [width of current page] [height of current page] [width of window] [height of window]
 *
 */
function getDocumentSize(val){
	var xScroll,yScroll,value;

	if(window.innerHeight&&window.scrollMaxY){	xScroll=window.innerWidth+window.scrollMaxX;  yScroll=window.innerHeight+window.scrollMaxY;	}
	else if(document.body.scrollHeight>document.body.offsetHeight){	xScroll=document.body.scrollWidth;  yScroll=document.body.scrollHeight; }
		else{ xScroll=document.body.offsetWidth;  yScroll=document.body.offsetHeight;	}

	var windowWidth,windowHeight;
	if(self.innerHeight){
			if(document.documentElement.clientWidth){ windowWidth=document.documentElement.clientWidth; 	}
			else{ windowWidth=self.innerWidth; }
				windowHeight=self.innerHeight;
	}
	else if(document.documentElement&&document.documentElement.clientHeight){
			windowWidth=document.documentElement.clientWidth;  windowHeight=document.documentElement.clientHeight; }
		else if(document.body){
			windowWidth=document.body.clientWidth;  windowHeight=document.body.clientHeight;	}

	if(yScroll<windowHeight){	pageHeight=windowHeight;	}
	else{	pageHeight=yScroll	}

	if(xScroll<windowWidth){	pageWidth=xScroll	}
	else{	pageWidth=windowWidth }

	arrayPageSize=new Array(pageWidth, pageHeight, windowWidth, windowHeight);
	return arrayPageSize[val];
};






/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
*/
// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);	},
	easeInQuad: function (x, t, b, c, d) {	return c*(t/=d)*t + b;	},
	easeOutQuad: function (x, t, b, c, d) {	return -c *(t/=d)*(t-2) + b;	},
	easeInOutQuad: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t + b;
											return -c/2 * ((--t)*(t-2) - 1) + b;	},
	easeInCubic: function (x, t, b, c, d) {	return c*(t/=d)*t*t + b;	},
	easeOutCubic: function (x, t, b, c, d) {return c*((t=t/d-1)*t*t + 1) + b;	},
	easeInOutCubic: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t*t + b;
											return c/2*((t-=2)*t*t + 2) + b;	},
	easeInQuart: function (x, t, b, c, d) {	return c*(t/=d)*t*t*t + b;	},
	easeOutQuart: function (x, t, b, c, d) {return -c * ((t=t/d-1)*t*t*t - 1) + b;	},
	easeInOutQuart: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
											return -c/2 * ((t-=2)*t*t*t - 2) + b;	},
	easeInQuint: function (x, t, b, c, d) {	return c*(t/=d)*t*t*t*t + b;	},
	easeOutQuint: function (x, t, b, c, d) {return c*((t=t/d-1)*t*t*t*t + 1) + b;	},
	easeInOutQuint: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
											return c/2*((t-=2)*t*t*t*t + 2) + b;	},
	easeInSine: function (x, t, b, c, d) {	return -c * Math.cos(t/d * (Math.PI/2)) + c + b;	},
	easeOutSine: function (x, t, b, c, d) {	return c * Math.sin(t/d * (Math.PI/2)) + b;	},
	easeInOutSine: function (x, t, b, c, d) {return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;	},
	easeInExpo: function (x, t, b, c, d) {	return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;	},
	easeOutExpo: function (x, t, b, c, d) {	return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;	},
	easeInOutExpo: function (x, t, b, c, d) {if (t==0) return b; if (t==d) return b+c; if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
											return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;	},
	easeInCirc: function (x, t, b, c, d) {	return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;	},
	easeOutCirc: function (x, t, b, c, d) {	return c * Math.sqrt(1 - (t=t/d-1)*t) + b;	},
	easeInOutCirc: function (x, t, b, c, d) {if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
											return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;	},
	easeInElastic: function (x, t, b, c, d) {	var s=1.70158;var p=0;var a=c;
											if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
											if (a < Math.abs(c)) { a=c; var s=p/4; }
											else var s = p/(2*Math.PI) * Math.asin (c/a);
											return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;	},
	easeOutElastic: function (x, t, b, c, d) {	var s=1.70158;var p=0;var a=c;
											if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
											if (a < Math.abs(c)) { a=c; var s=p/4; }
											else var s = p/(2*Math.PI) * Math.asin (c/a);
											return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;	},
	easeInOutElastic: function (x, t, b, c, d) { var s=1.70158;var p=0;var a=c;
											if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
											if (a < Math.abs(c)) { a=c; var s=p/4; }
											else var s = p/(2*Math.PI) * Math.asin (c/a);
											if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
											return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;	},
	easeInBack: function (x, t, b, c, d, s) { if (s == undefined) s = 1.70158;
											return c*(t/=d)*t*((s+1)*t - s) + b;	},
	easeOutBack: function (x, t, b, c, d, s) {if (s == undefined) s = 1.70158;
											return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;	},
	easeInOutBack: function (x, t, b, c, d, s) { if (s == undefined) s = 1.70158;
											if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
											return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;	},
	easeInBounce: function (x, t, b, c, d) {return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;	},
	easeOutBounce: function (x, t, b, c, d) {if ((t/=d) < (1/2.75)) {
												return c*(7.5625*t*t) + b;
											} else if (t < (2/2.75)) {
												return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
											} else if (t < (2.5/2.75)) {
												return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
											} else {
												return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
											}
										},
	easeInOutBounce: function (x, t, b, c, d) {
											if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
											return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;	}
});



/*!
 * imagesLoaded PACKAGED v3.0.4
 * JavaScript is all like "You images are done yet or what?"
 *	https://github.com/desandro/imagesloaded
 *
 *	Usage:
 *      - With Jquery
    $('#container').imagesLoaded()
 	.always( function( instance ) {
	    // all loaded (broken + success)
 		console.log('all images loaded');
 	})
 	.done( function( instance ) {
	    // all loaded, all success, no broken
 		console.log('all images successfully loaded');
 	})
 	.fail( function() {
 		console.log('all images loaded, at least one is broken');
 	})
 	.progress( function( instance, image ) {
 		var result = image.isLoaded ? 'loaded' : 'broken';
 		console.log( 'image is ' + result + ' for ' + image.img.src );
 	});
 *
 *      - Without Jquery
 	var imgLoad = imagesLoaded('#container');
 	imgLoad.on( 'always', function() {
 	    console.log( imgLoad.images.length + ' images loaded' );
 	    // detect which image is broken
 	    for ( var i = 0, len = imgLoad.images.length; i < len; i++ ) {
 		    var image = imgLoad.images[i];
 		    var result = image.isLoaded ? 'loaded' : 'broken';
 		    console.log( 'image is ' + result + ' for ' + image.img.src );
 	    }
 	});
 */

(function(){"use strict";function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}var n=e.prototype;n.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},n.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},n.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},n.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},n.on=n.addListener,n.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},n.once=n.addOnceListener,n.defineEvent=function(e){return this.getListeners(e),this},n.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},n.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},n.off=n.removeListener,n.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},n.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},n.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},n.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},n.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],o=n.listener.apply(this,t||[]),(o===this._getOnceReturnValue()||n.once===!0)&&this.removeListener(e,s[r][i].listener);return this},n.trigger=n.emitEvent,n.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},n.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},n._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},n._getEvents=function(){return this._events||(this._events={})},"function"==typeof define&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){"use strict";var t=document.documentElement,n=function(){};t.addEventListener?n=function(e,t,n){e.addEventListener(t,n,!1)}:t.attachEvent&&(n=function(t,n,i){t[n+i]=i.handleEvent?function(){var t=e.event;t.target=t.target||t.srcElement,i.handleEvent.call(i,t)}:function(){var n=e.event;n.target=n.target||n.srcElement,i.call(t,n)},t.attachEvent("on"+n,t[n+i])});var i=function(){};t.removeEventListener?i=function(e,t,n){e.removeEventListener(t,n,!1)}:t.detachEvent&&(i=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var r={bind:n,unbind:i};"function"==typeof define&&define.amd?define(r):e.eventie=r}(this),function(e){"use strict";function t(e,t){for(var n in t)e[n]=t[n];return e}function n(e){return"[object Array]"===c.call(e)}function i(e){var t=[];if(n(e))t=e;else if("number"==typeof e.length)for(var i=0,r=e.length;r>i;i++)t.push(e[i]);else t.push(e);return t}function r(e,n){function r(e,n,s){if(!(this instanceof r))return new r(e,n);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=i(e),this.options=t({},this.options),"function"==typeof n?s=n:t(this.options,n),s&&this.on("always",s),this.getImages(),o&&(this.jqDeferred=new o.Deferred);var a=this;setTimeout(function(){a.check()})}function c(e){this.img=e}r.prototype=new e,r.prototype.options={},r.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);for(var i=n.querySelectorAll("img"),r=0,o=i.length;o>r;r++){var s=i[r];this.addImage(s)}}},r.prototype.addImage=function(e){var t=new c(e);this.images.push(t)},r.prototype.check=function(){function e(e,r){return t.options.debug&&a&&s.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},r.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify(t,e)})},r.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},o&&(o.fn.imagesLoaded=function(e,t){var n=new r(this,e,t);return n.jqDeferred.promise(o(this))});var f={};return c.prototype=new e,c.prototype.check=function(){var e=f[this.img.src];if(e)return this.useCached(e),void 0;if(f[this.img.src]=this,this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this.proxyImage=new Image;n.bind(t,"load",this),n.bind(t,"error",this),t.src=this.img.src},c.prototype.useCached=function(e){if(e.isConfirmed)this.confirm(e.isLoaded,"cached was confirmed");else{var t=this;e.on("confirm",function(e){return t.confirm(e.isLoaded,"cache emitted confirmed"),!0})}},c.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},c.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},c.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindProxyEvents()},c.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindProxyEvents()},c.prototype.unbindProxyEvents=function(){n.unbind(this.proxyImage,"load",this),n.unbind(this.proxyImage,"error",this)},r}var o=e.jQuery,s=e.console,a=s!==void 0,c=Object.prototype.toString;"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],r):e.imagesLoaded=r(e.EventEmitter,e.eventie)}(window);


/*
    Fullscreen background is a small jQuery plugin that allows you to create fullscreen background.

    Author:     Gaya Kessler
    Date:       04-25-2012
    URL:        http://www.gayadesign.com

	$(selector).fullscreenBackground();
*/

(function ($) {
    var parentElement = "";
    var optionsArr = {
        selector: "img",
        fillOnResize: true,
        defaultCss: true
    };

    $.fn.fullscreenBackground = function (options) {
        if(options) {
            $.extend(optionsArr, options );
        }

        this.each(function () {
            parentElement = this;

            if (optionsArr.defaultCss == true) {
                $("html,body").css({
                    width: "100%",
                    height: "100%"
                });

                $(parentElement).css({
                    //height: "100%",
                    width: "100%",
                    overflow: "hidden",
                    position: "absolute",
                    top: $('nav').height(),
                    left: "0px",
                    zIndex: 1
                });
            }

			var windowWidth = $(window).width();
            if (optionsArr.fillOnResize == true) {
                $(window).resize(function () {
                	windowWidth = $(window).width();
            		$(parentElement).css({
	                    top: $('nav').height()
	                });

                    fillBg(optionsArr.selector, parentElement);
                });
            }

            fillBg(optionsArr.selector, parentElement);
        });
    };

    function fillBg(selector, parentobj) {
        var windowHeight = $(window).height();
        var windowWidth = $(document).width();
		//windowHeight = windowHeight - $('nav').height() - $('footer').height();
		windowHeight = windowHeight - $('nav').height();

        $(selector, parentobj).each(function () {
            var imgHeight = $(this).attr("height");
            var imgWidth = $(this).attr("width");

            var newWidth = windowWidth;
            var newHeight = (windowWidth / imgWidth) * imgHeight;
            var topMargin = ((newHeight - windowHeight) / 2) * -1;
            var leftMargin = 0;

            if (newHeight < windowHeight) {
                var newWidth = (windowHeight / imgHeight) * imgWidth;
                var newHeight = windowHeight;
                var topMargin = 0;
                var leftMargin = ((newWidth - windowWidth) / 2) * -1;
            }

            $(this).css({
				visibility: "visible",
                height: newHeight + "px",
                width: newWidth + "px",
                marginLeft: leftMargin + "px",
                marginTop: topMargin + "px",
                display: "block"
            });
        });
    }
})(jQuery);

/*
 * ColorBox v1.3.20.1 - jQuery lightbox plugin
 * (c) 2012 Jack Moore - jacklmoore.com
 * License: http://www.opensource.org/licenses/mit-license.php
 * http://www.jacklmoore.com/colorbox

 	$('.popup').colorbox();

 */
(function(e,t,n){function G(n,r,i){var o=t.createElement(n);return r&&(o.id=s+r),i&&(o.style.cssText=i),e(o)}function Y(e){var t=T.length,n=(U+e)%t;return n<0?t+n:n}function Z(e,t){return Math.round((/%/.test(e)?(t==="x"?tt():nt())/100:1)*parseInt(e,10))}function et(e){return B.photo||/\.(gif|png|jp(e|g|eg)|bmp|ico)((#|\?).*)?$/i.test(e)}function tt(){return n.innerWidth||N.width()}function nt(){return n.innerHeight||N.height()}function rt(){var t,n=e.data(R,i);n==null?(B=e.extend({},r),console&&console.log&&console.log("Error: cboxElement missing settings object")):B=e.extend({},n);for(t in B)e.isFunction(B[t])&&t.slice(0,2)!=="on"&&(B[t]=B[t].call(R));B.rel=B.rel||R.rel||"nofollow",B.href=B.href||e(R).attr("href"),B.title=B.title||R.title,typeof B.href=="string"&&(B.href=e.trim(B.href))}function it(t,n){e.event.trigger(t),n&&n.call(R)}function st(){var e,t=s+"Slideshow_",n="click."+s,r,i,o;B.slideshow&&T[1]?(r=function(){M.text(B.slideshowStop).unbind(n).bind(f,function(){if(B.loop||T[U+1])e=setTimeout(J.next,B.slideshowSpeed)}).bind(a,function(){clearTimeout(e)}).one(n+" "+l,i),g.removeClass(t+"off").addClass(t+"on"),e=setTimeout(J.next,B.slideshowSpeed)},i=function(){clearTimeout(e),M.text(B.slideshowStart).unbind([f,a,l,n].join(" ")).one(n,function(){J.next(),r()}),g.removeClass(t+"on").addClass(t+"off")},B.slideshowAuto?r():i()):g.removeClass(t+"off "+t+"on")}function ot(t){V||(R=t,rt(),T=e(R),U=0,B.rel!=="nofollow"&&(T=e("."+o).filter(function(){var t=e.data(this,i),n;return t&&(n=t.rel||this.rel),n===B.rel}),U=T.index(R),U===-1&&(T=T.add(R),U=T.length-1)),W||(W=X=!0,g.show(),B.returnFocus&&e(R).blur().one(c,function(){e(this).focus()}),m.css({opacity:+B.opacity,cursor:B.overlayClose?"pointer":"auto"}).show(),B.w=Z(B.initialWidth,"x"),B.h=Z(B.initialHeight,"y"),J.position(),d&&N.bind("resize."+v+" scroll."+v,function(){m.css({width:tt(),height:nt(),top:N.scrollTop(),left:N.scrollLeft()})}).trigger("resize."+v),it(u,B.onOpen),H.add(A).hide(),P.html(B.close).show()),J.load(!0))}function ut(){!g&&t.body&&(Q=!1,N=e(n),g=G(K).attr({id:i,"class":p?s+(d?"IE6":"IE"):""}).hide(),m=G(K,"Overlay",d?"position:absolute":"").hide(),L=G(K,"LoadingOverlay").add(G(K,"LoadingGraphic")),y=G(K,"Wrapper"),b=G(K,"Content").append(C=G(K,"LoadedContent","width:0; height:0; overflow:hidden"),A=G(K,"Title"),O=G(K,"Current"),_=G(K,"Next"),D=G(K,"Previous"),M=G(K,"Slideshow").bind(u,st),P=G(K,"Close")),y.append(G(K).append(G(K,"TopLeft"),w=G(K,"TopCenter"),G(K,"TopRight")),G(K,!1,"clear:left").append(E=G(K,"MiddleLeft"),b,S=G(K,"MiddleRight")),G(K,!1,"clear:left").append(G(K,"BottomLeft"),x=G(K,"BottomCenter"),G(K,"BottomRight"))).find("div div").css({"float":"left"}),k=G(K,!1,"position:absolute; width:9999px; visibility:hidden; display:none"),H=_.add(D).add(O).add(M),e(t.body).append(m,g.append(y,k)))}function at(){return g?(Q||(Q=!0,j=w.height()+x.height()+b.outerHeight(!0)-b.height(),F=E.width()+S.width()+b.outerWidth(!0)-b.width(),I=C.outerHeight(!0),q=C.outerWidth(!0),g.css({"padding-bottom":j,"padding-right":F}),_.click(function(){J.next()}),D.click(function(){J.prev()}),P.click(function(){J.close()}),m.click(function(){B.overlayClose&&J.close()}),e(t).bind("keydown."+s,function(e){var t=e.keyCode;W&&B.escKey&&t===27&&(e.preventDefault(),J.close()),W&&B.arrowKey&&T[1]&&(t===37?(e.preventDefault(),D.click()):t===39&&(e.preventDefault(),_.click()))}),e("."+o,t).live("click",function(e){e.which>1||e.shiftKey||e.altKey||e.metaKey||(e.preventDefault(),ot(this))})),!0):!1}var r={transition:"elastic",speed:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,inline:!1,html:!1,iframe:!1,fastIframe:!0,photo:!1,href:!1,title:!1,rel:!1,opacity:.9,preloading:!0,current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",open:!1,returnFocus:!0,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:undefined},i="colorbox",s="cbox",o=s+"Element",u=s+"_open",a=s+"_load",f=s+"_complete",l=s+"_cleanup",c=s+"_closed",h=s+"_purge",p=!e.support.opacity&&!e.support.style,d=p&&!n.XMLHttpRequest,v=s+"_IE6",m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D,P,H,B,j,F,I,q,R,U,z,W,X,V,$,J,K="div",Q;if(e.colorbox)return;e(ut),J=e.fn[i]=e[i]=function(t,n){var s=this;t=t||{},ut();if(at()){if(!s[0]){if(s.selector)return s;s=e("<a/>"),t.open=!0}n&&(t.onComplete=n),s.each(function(){e.data(this,i,e.extend({},e.data(this,i)||r,t))}).addClass(o),(e.isFunction(t.open)&&t.open.call(s)||t.open)&&ot(s[0])}return s},J.position=function(e,t){function f(e){w[0].style.width=x[0].style.width=b[0].style.width=e.style.width,b[0].style.height=E[0].style.height=S[0].style.height=e.style.height}var n,r=0,i=0,o=g.offset(),u,a;N.unbind("resize."+s),g.css({top:-9e4,left:-9e4}),u=N.scrollTop(),a=N.scrollLeft(),B.fixed&&!d?(o.top-=u,o.left-=a,g.css({position:"fixed"})):(r=u,i=a,g.css({position:"absolute"})),B.right!==!1?i+=Math.max(tt()-B.w-q-F-Z(B.right,"x"),0):B.left!==!1?i+=Z(B.left,"x"):i+=Math.round(Math.max(tt()-B.w-q-F,0)/2),B.bottom!==!1?r+=Math.max(nt()-B.h-I-j-Z(B.bottom,"y"),0):B.top!==!1?r+=Z(B.top,"y"):r+=Math.round(Math.max(nt()-B.h-I-j,0)/2),g.css({top:o.top,left:o.left}),e=g.width()===B.w+q&&g.height()===B.h+I?0:e||0,y[0].style.width=y[0].style.height="9999px",n={width:B.w+q,height:B.h+I,top:r,left:i},e===0&&g.css(n),g.dequeue().animate(n,{duration:e,complete:function(){f(this),X=!1,y[0].style.width=B.w+q+F+"px",y[0].style.height=B.h+I+j+"px",B.reposition&&setTimeout(function(){N.bind("resize."+s,J.position)},1),t&&t()},step:function(){f(this)}})},J.resize=function(e){W&&(e=e||{},e.width&&(B.w=Z(e.width,"x")-q-F),e.innerWidth&&(B.w=Z(e.innerWidth,"x")),C.css({width:B.w}),e.height&&(B.h=Z(e.height,"y")-I-j),e.innerHeight&&(B.h=Z(e.innerHeight,"y")),!e.innerHeight&&!e.height&&(C.css({height:"auto"}),B.h=C.height()),C.css({height:B.h}),J.position(B.transition==="none"?0:B.speed))},J.prep=function(t){function o(){return B.w=B.w||C.width(),B.w=B.mw&&B.mw<B.w?B.mw:B.w,B.w}function u(){return B.h=B.h||C.height(),B.h=B.mh&&B.mh<B.h?B.mh:B.h,B.h}if(!W)return;var n,r=B.transition==="none"?0:B.speed;C.remove(),C=G(K,"LoadedContent").append(t),C.hide().appendTo(k.show()).css({width:o(),overflow:B.scrolling?"auto":"hidden"}).css({height:u()}).prependTo(b),k.hide(),e(z).css({"float":"none"}),d&&e("select").not(g.find("select")).filter(function(){return this.style.visibility!=="hidden"}).css({visibility:"hidden"}).one(l,function(){this.style.visibility="inherit"}),n=function(){function y(){p&&g[0].style.removeAttribute("filter")}var t,n,o=T.length,u,a="frameBorder",l="allowTransparency",c,d,v,m;if(!W)return;c=function(){clearTimeout($),L.detach().hide(),it(f,B.onComplete)},p&&z&&C.fadeIn(100),A.html(B.title).add(C).show();if(o>1){typeof B.current=="string"&&O.html(B.current.replace("{current}",U+1).replace("{total}",o)).show(),_[B.loop||U<o-1?"show":"hide"]().html(B.next),D[B.loop||U?"show":"hide"]().html(B.previous),B.slideshow&&M.show();if(B.preloading){t=[Y(-1),Y(1)];while(n=T[t.pop()])m=e.data(n,i),m&&m.href?(d=m.href,e.isFunction(d)&&(d=d.call(n))):d=n.href,et(d)&&(v=new Image,v.src=d)}}else H.hide();B.iframe?(u=G("iframe")[0],a in u&&(u[a]=0),l in u&&(u[l]="true"),u.name=s+ +(new Date),B.fastIframe?c():e(u).one("load",c),u.src=B.href,B.scrolling||(u.scrolling="no"),e(u).addClass(s+"Iframe").appendTo(C).one(h,function(){u.src="//about:blank"})):c(),B.transition==="fade"?g.fadeTo(r,1,y):y()},B.transition==="fade"?g.fadeTo(r,0,function(){J.position(0,n)}):J.position(r,n)},J.load=function(t){var n,r,i=J.prep;X=!0,z=!1,R=T[U],t||rt(),it(h),it(a,B.onLoad),B.h=B.height?Z(B.height,"y")-I-j:B.innerHeight&&Z(B.innerHeight,"y"),B.w=B.width?Z(B.width,"x")-q-F:B.innerWidth&&Z(B.innerWidth,"x"),B.mw=B.w,B.mh=B.h,B.maxWidth&&(B.mw=Z(B.maxWidth,"x")-q-F,B.mw=B.w&&B.w<B.mw?B.w:B.mw),B.maxHeight&&(B.mh=Z(B.maxHeight,"y")-I-j,B.mh=B.h&&B.h<B.mh?B.h:B.mh),n=B.href,$=setTimeout(function(){L.show().appendTo(b)},100),B.inline?(G(K).hide().insertBefore(e(n)[0]).one(h,function(){e(this).replaceWith(C.children())}),i(e(n))):B.iframe?i(" "):B.html?i(B.html):et(n)?(e(z=new Image).addClass(s+"Photo").error(function(){B.title=!1,i(G(K,"Error").html(B.imgError))}).load(function(){var e;z.onload=null,B.scalePhotos&&(r=function(){z.height-=z.height*e,z.width-=z.width*e},B.mw&&z.width>B.mw&&(e=(z.width-B.mw)/z.width,r()),B.mh&&z.height>B.mh&&(e=(z.height-B.mh)/z.height,r())),B.h&&(z.style.marginTop=Math.max(B.h-z.height,0)/2+"px"),T[1]&&(B.loop||T[U+1])&&(z.style.cursor="pointer",z.onclick=function(){J.next()}),p&&(z.style.msInterpolationMode="bicubic"),setTimeout(function(){i(z)},1)}),setTimeout(function(){z.src=n},1)):n&&k.load(n,B.data,function(t,n,r){i(n==="error"?G(K,"Error").html(B.xhrError):e(this).contents())})},J.next=function(){!X&&T[1]&&(B.loop||T[U+1])&&(U=Y(1),J.load())},J.prev=function(){!X&&T[1]&&(B.loop||U)&&(U=Y(-1),J.load())},J.close=function(){W&&!V&&(V=!0,W=!1,it(l,B.onCleanup),N.unbind("."+s+" ."+v),m.fadeTo(200,0),g.stop().fadeTo(300,0,function(){g.add(m).css({opacity:1,cursor:"auto"}).hide(),it(h),C.remove(),setTimeout(function(){V=!1,it(c,B.onClosed)},1)}))},J.remove=function(){e([]).add(g).add(m).remove(),g=null,e("."+o).removeData(i).removeClass(o).die()},J.element=function(){return e(R)},J.settings=r})(jQuery,document,this);












/*
 * Tiny Scrollbar 1.81
 * http://www.baijs.nl/tinyscrollbar/
 *
	axis: 'x' -- Vertical or horizontal scroller? 'x' or 'y'.
	wheel: 40 -- How many pixels must the mouswheel scrolls at a time.
	scroll: true -- Enable or disable the mousewheel.
	lockscroll: true -- Return scrollwheel event to browser if there is no more content.
	size: 'auto' -- Set the size of the scrollbar to auto or a fixed number.
	sizethumb: 'auto' -- Set the size of the thumb to auto or a fixed number.
	invertscroll: false -- Enable mobile invert style scrolling.

 *

	var g-scroll = $('.scroll').tinyscrollbar();

	$('.scroll-anchor').click(function(){
		g-scroll.tinyscrollbar_update(50);
		return false;
	});
 *
 */
 (function (a) {
    a.tiny = a.tiny || {};
    a.tiny.scrollbar = {
        options: {
            axis: "y",
            wheel: 40,
            scroll: true,
            lockscroll: true,
            size: "auto",
            sizethumb: "auto",
            invertscroll: false
        }
    };
    a.fn.tinyscrollbar = function (d) {
        var c = a.extend({}, a.tiny.scrollbar.options, d);
        this.each(function () {
            a(this).data("tsb", new b(a(this), c))
        });
        return this
    };
    a.fn.tinyscrollbar_update = function (c) {
        return a(this).data("tsb").update(c)
    };

    function b(q, g) {
		q.each(function(){
			$(this).removeClass('scroll').addClass('scrolled').wrapInner('<div class="g-viewport"><div class="g-overview"></div></div>').prepend('<div class="g-scrollbar"><div class="g-track"><div class="g-thumb"><div class="g-end"></div></div></div></div>');
		});

        var k = this,
            t = q,
            j = {
                obj: a(".g-viewport", q)
            }, h = {
                obj: a(".g-overview", q)
            }, d = {
                obj: a(".g-scrollbar", q)
            }, m = {
                obj: a(".g-track", d.obj)
            }, p = {
                obj: a(".g-thumb", d.obj)
            }, l = g.axis === "x",
            n = l ? "left" : "top",
            v = l ? "Width" : "Height",
            r = 0,
            y = {
                start: 0,
                now: 0
            }, o = {}, e = "ontouchstart" in document.documentElement;

        function c() {
            k.update();
            s();
            return k
        }
        this.update = function (z) {
            j[g.axis] = j.obj[0]["offset" + v];
            h[g.axis] = h.obj[0]["scroll" + v];
            h.ratio = j[g.axis] / h[g.axis];
            d.obj.toggleClass("g-disable", h.ratio >= 1);
            m[g.axis] = g.size === "auto" ? j[g.axis] : g.size;
            p[g.axis] = Math.min(m[g.axis], Math.max(0, (g.sizethumb === "auto" ? (m[g.axis] * h.ratio) : g.sizethumb)));
            d.ratio = g.sizethumb === "auto" ? (h[g.axis] / m[g.axis]) : (h[g.axis] - j[g.axis]) / (m[g.axis] - p[g.axis]);
            r = (z === "relative" && h.ratio <= 1) ? Math.min((h[g.axis] - j[g.axis]), Math.max(0, r)) : 0;
            r = (z === "bottom" && h.ratio <= 1) ? (h[g.axis] - j[g.axis]) : isNaN(parseInt(z, 10)) ? r : parseInt(z, 10);
            w()
        };

        function w() {
            var z = v.toLowerCase();
            p.obj.css(n, r / d.ratio);
			h.obj.css(n, - r);
            o.start = p.obj.offset()[n];
            d.obj.css(z, m[g.axis]);
            m.obj.css(z, m[g.axis]);
            p.obj.css(z, p[g.axis])
        }
        function s() {
            if (!e) {
                p.obj.bind("mousedown", i);
                m.obj.bind("mouseup", u)
            } else {
                j.obj[0].ontouchstart = function (z) {
                    if (1 === z.touches.length) {
                        i(z.touches[0]);
                        z.stopPropagation()
                    }
                }
            }
            if (g.scroll && window.addEventListener) {
                t[0].addEventListener("DOMMouseScroll", x, false);
                t[0].addEventListener("mousewheel", x, false)
            } else {
                if (g.scroll) {
                    t[0].onmousewheel = x
                }
            }
        }
        function i(A) {
            a("body").addClass("g-noSelect");
            var z = parseInt(p.obj.css(n), 10);
            o.start = l ? A.pageX : A.pageY;
            y.start = z == "auto" ? 0 : z;
            if (!e) {
                a(document).bind("mousemove", u);
                a(document).bind("mouseup", f);
                p.obj.bind("mouseup", f)
            } else {
                document.ontouchmove = function (B) {
                    B.preventDefault();
                    u(B.touches[0])
                };
                document.ontouchend = f
            }
        }
        function x(B) {
            if (h.ratio < 1) {
                var A = B || window.event,
                    z = A.wheelDelta ? A.wheelDelta / 120 : -A.detail / 3;
                r -= z * g.wheel;
                r = Math.min((h[g.axis] - j[g.axis]), Math.max(0, r));
                p.obj.css(n, r / d.ratio);

				//h.obj.css(n, - r);
				h.obj.stop().animate({top: -r}, 750, 'easeOutQuart');

                if (g.lockscroll || (r !== (h[g.axis] - j[g.axis]) && r !== 0)) {
                    A = a.event.fix(A);
                    A.preventDefault()
                }
            }
        }
        function u(z) {
            if (h.ratio < 1) {
                if (g.invertscroll && e) {
                    y.now = Math.min((m[g.axis] - p[g.axis]), Math.max(0, (y.start + (o.start - (l ? z.pageX : z.pageY)))))
                } else {
                    y.now = Math.min((m[g.axis] - p[g.axis]), Math.max(0, (y.start + ((l ? z.pageX : z.pageY) - o.start))))
                }
                r = y.now * d.ratio;

				h.obj.css(n, - r);
				//h.obj.stop().animate({top: -r}, 750, 'easeOutQuart');

                p.obj.css(n, y.now)
            }
        }
        function f() {
            a("body").removeClass("g-noSelect");
            a(document).unbind("mousemove", u);
            a(document).unbind("mouseup", f);
            p.obj.unbind("mouseup", f);
            document.ontouchmove = document.ontouchend = null
        }
        return c()
    }
}(jQuery));















// jQuery Alert Dialogs Plugin 1.1
//
// Visit http://abeautifulsite.net/notebook/87 for more information
//
// Usage:
//		jAlert( message, [title, callback] )
//		jConfirm( message, [title, callback] )
//		jPrompt( message, [value, title, callback] )
//
// License:
//
// This plugin is dual-licensed under the GNU General Public License and the MIT License and
// is copyright 2008 A Beautiful Site, LLC.
//
(function($) {

	$.alerts = {

		// These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time

		verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
		horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
		repositionOnResize: true,           // re-centers the dialog on window resize
		draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
		okButton: '&nbsp;OK&nbsp;',         // text for the OK button
		cancelButton: '&nbsp;Cancel&nbsp;', // text for the Cancel button
		dialogClass: null,                  // if specified, this class will be applied to all dialogs

		alert: function(message, title, callback) {
			if( title == null ) title = 'Alert';
			$.alerts._show(title, message, null, 'alert', function(result) {	if( callback ) callback(result);	});
		},
		confirm: function(message, title, callback) {
			if( title == null ) title = 'Confirm';
			$.alerts._show(title, message, null, 'confirm', function(result) {	if( callback ) callback(result);	});
		},
		prompt: function(message, value, title, callback) {
			if( title == null ) title = 'Prompt';
			$.alerts._show(title, message, value, 'prompt', function(result) {	if( callback ) callback(result);	});
		},

		_show: function(title, msg, value, type, callback) {
			$.alerts._hide();
			$.alerts._overlay('show');
			$("BODY").append(
			  '<div id="popup_container">' +
			    '<h1 id="popup_title"></h1>' +
			    '<div id="popup_content">' +
			      '<div id="popup_message"></div>' +
				'</div>' +
			  '</div>');

			if( $.alerts.dialogClass ) $("#popup_container").addClass($.alerts.dialogClass);

			// IE6 Fix
			var pos = ($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed';

			$("#popup_container").css({	position: pos,	zIndex: 99999,	padding: 0,	margin: 0	});
			$("#popup_title").text(title);
			$("#popup_content").addClass(type);
			$("#popup_message").text(msg);
			$("#popup_message").html( $("#popup_message").text().replace(/\n/g, '<br />') );
			$("#popup_container").css({	minWidth: $("#popup_container").outerWidth(), maxWidth: $("#popup_container").outerWidth()});

			$.alerts._reposition();
			$.alerts._maintainPosition(true);

			switch( type ) {
				case 'alert':
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'confirm':
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'prompt':
					$("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
					$("#popup_prompt").width( $("#popup_message").width() );
					$("#popup_ok").click( function() {
						var val = $("#popup_prompt").val();
						$.alerts._hide();
						if( callback ) callback( val );
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback( null );
					});
					$("#popup_prompt, #popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
					if( value ) $("#popup_prompt").val(value);
					$("#popup_prompt").focus().select();
				break;
			}

			// Make draggable
			if( $.alerts.draggable ) {
				try {
					$("#popup_container").draggable({ handle: $("#popup_title") });
					$("#popup_title").css({ cursor: 'move' });
				} catch(e) { /* requires jQuery UI draggables */ }
			}
		},
		_hide: function() {
			$("#popup_container").remove();
			$.alerts._overlay('hide');
			$.alerts._maintainPosition(false);
		},
		_overlay: function(status) {
			switch( status ) {
				case 'show':
					$.alerts._overlay('hide');
					$("BODY").append('<div id="popup_overlay"></div>');
					$("#popup_overlay").css({
						position: 'absolute',
						zIndex: 99998,
						top: '0px',
						left: '0px',
						width: '100%',
						height: $(document).height(),
						background: $.alerts.overlayColor,
						opacity: $.alerts.overlayOpacity
					});
				break;
				case 'hide':
					$("#popup_overlay").remove();
				break;
			}
		},
		_reposition: function() {
			var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;

			// IE6 fix
			if( $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();

			$("#popup_container").css({	top: top + 'px', left: left + 'px'	});
			$("#popup_overlay").height( $(document).height() );
		},
		_maintainPosition: function(status) {
			if( $.alerts.repositionOnResize ) {
				switch(status) {
					case true:
						$(window).bind('resize', $.alerts._reposition);
					break;
					case false:
						$(window).unbind('resize', $.alerts._reposition);
					break;
				}
			}
		}
	}

	jAlert = function(message, title, callback) {		$.alerts.alert(message, title, callback);	}
	jConfirm = function(message, title, callback) {		$.alerts.confirm(message, title, callback);	};
	jPrompt = function(message, value, title, callback){$.alerts.prompt(message, value, title, callback);	};
})(jQuery);


/*
 * Custom Combobox
 *
 * Call like this after document.ready to init all combo box
 *
 * rUtils.initComboBox();
 *
 */
rUtils = {};

rUtils.initComboBox = function() {
	$('.custom-select').each(function(index) {
		var hiddenField = $(this).find('.cs-value');
		var displayText = $(this).find('a.text span');
		$(hiddenField).attr('rel', $(displayText).html());
	});
	$('.custom-option').show();
	$('.custom-option').each(function(index) {
		if ($(this).find('ul').height() > $(this).height()) {
			$(this).tinyscrollbar({sizethumb: 20});
			var dropdownContentWidth = $(this).width() - $(this).find('.g-scrollbar').width();
			$(this).find('.g-overview').width(dropdownContentWidth);
		}
	});
	$('.custom-option').hide();
	$('.custom-select').live('click', showHideOptions);
	$('.custom-option li').live('click', onSelectOptionHandler);
	$('body').bind('click', onHideSelectOptionHandler);

	$('.custom-option li[selected="selected"]').click();
};

rUtils.resetComboBox = function() {
	$('.cs-value').attr('value', '');
	$('.custom-select').each(function(index) {
		var hiddenField = $(this).find('.cs-value');
		var displayText = $(this).find('a.text span');
		$(displayText).html($(hiddenField).attr('rel'));
	});
}

function onHideSelectOptionHandler(evt) {
	var targetClick = evt.target;
	if (!$(targetClick).hasClass('g-thumb') && !$(targetClick).hasClass('g-track')) {
		$('.custom-option').each(function() {
			if (!$(this).is(':hidden')) {
				hideComboBox(this);
			}
		});
	}
}

function showHideOptions(evt) {
	evt.stopPropagation();

	var targetClick = evt.target;
	if (!$(targetClick).hasClass('g-thumb') && !$(targetClick).hasClass('g-track')) {
		var optEle = $(this).find('.custom-option');
		if($(optEle).css('display') == 'none') {
			showComboBox(optEle);
			$('.custom-option').each(function() {
				if (!$(this).is(optEle) && !$(this).is(':hidden')) {
					hideComboBox(this);
				}
			});
		} else {
			hideComboBox(optEle);
		}
	}
}

function hideComboBox(ele) {
	$(ele).stop(true, true).animate({
		opacity: 0
	}, 'fast', function() {
		$(ele).css({
			display: 'none'
		});
	});
}

function showComboBox(ele) {
	$(ele).css({
		display: 'block',
		opacity: 0
	});
	$(ele).stop(true, true).animate({
		opacity: 1
	}, 'fast');
}

function onSelectOptionHandler(evt) {
	evt.stopPropagation();

	var cbEle = $(this).parents('.custom-option');
	hideComboBox(cbEle);

	var cbWrapperEle = $(cbEle).parents('.custom-select');
	var text = $(this).html();
	if ($(this).find('p').length) {
		text = $(this).find('p').html();
	}
	var value = $(this).attr('id');

	$(cbWrapperEle).find('.cs-value').attr('value', value);
	$(cbWrapperEle).find('a.text span').html(text);
	var callbackFunc = $(cbWrapperEle).find('.cs-callback').attr('value');
	if (callbackFunc) {
		var data = {
			text: text,
			value: value
		};
		window[callbackFunc](data);
	}
}

/*

CUSTOM FORM ELEMENTS

Radio button and Checkbox

Created by Ryan Fait
www.ryanfait.com

The only things you may need to change in this file are the following
variables: checkboxHeight, radioHeight and selectWidth (lines 24, 25, 26)

The numbers you set for checkboxHeight and radioHeight should be one quarter
of the total height of the image want to use for checkboxes and radio
buttons. Both images should contain the four stages of both inputs stacked
on top of each other in this order: unchecked, unchecked-clicked, checked,
checked-clicked.

You may need to adjust your images a bit if there is a slight vertical
movement during the different stages of the button activation.

The value of selectWidth should be the width of your select list image.

Visit http://ryanfait.com/ for more information.

Custom radio button:
To add check function: only need to add js function as following, obj is the input element

function radioChange(obj) {
}

Custom checkbox:
To add check function: only need to add js function as following, obj is the input element

function checkboxChange(obj) {
}
*/

var checkboxHeight = "20";
var radioHeight = "17";
var selectWidth = "190";


/* No need to change anything after this */


document.write('<style type="text/css">input.styled { display: none; } select.styled { position: relative; width: ' + selectWidth + 'px; opacity: 0; filter: alpha(opacity=0); z-index: 5; } .disabled { opacity: 0.5; filter: alpha(opacity=50); }</style>');

var Custom = {
	init: function() {
		var inputs = document.getElementsByTagName("input"), span = Array(), textnode, option, active;
		for(a = 0; a < inputs.length; a++) {
			if((inputs[a].type == "checkbox" || inputs[a].type == "radio") && inputs[a].className == "styled" && $(inputs[a]).attr('data-styled') != 'styled') {
				span[a] = document.createElement("span");
				span[a].className = inputs[a].type;
				
				if(inputs[a].checked == true) {
					if(inputs[a].type == "checkbox") {
						position = "0 -" + (checkboxHeight*2) + "px";
						span[a].style.backgroundPosition = position;
					} else {
						position = "0 -" + (radioHeight*2) + "px";
						span[a].style.backgroundPosition = position;
					}
				}
				inputs[a].parentNode.insertBefore(span[a], inputs[a]);
				inputs[a].onchange = Custom.clear;
				if(!inputs[a].getAttribute("disabled")) {
					span[a].onmousedown = Custom.pushed;
					span[a].onmouseup = Custom.check;
				} else {
					span[a].className = span[a].className += " disabled";
				}
				
				$(inputs[a]).attr('data-styled', 'styled');
			}
		}
		inputs = document.getElementsByTagName("select");
		for(a = 0; a < inputs.length; a++) {
			if(inputs[a].className == "styled" && $(inputs[a]).attr('data-styled') != 'styled') {
				option = inputs[a].getElementsByTagName("option");
				active = option[0].childNodes[0].nodeValue;
				textnode = document.createTextNode(active);
				for(b = 0; b < option.length; b++) {
					if(option[b].selected == true) {
						textnode = document.createTextNode(option[b].childNodes[0].nodeValue);
					}
				}
				span[a] = document.createElement("span");
				span[a].className = "select";
				span[a].id = "select" + inputs[a].name;
				span[a].appendChild(textnode);
				inputs[a].parentNode.insertBefore(span[a], inputs[a]);
				if(!inputs[a].getAttribute("disabled")) {
					inputs[a].onchange = Custom.choose;
				} else {
					inputs[a].previousSibling.className = inputs[a].previousSibling.className += " disabled";
				}
				
				$(inputs[a]).attr('data-styled', 'styled');
			}
		}
		document.onmouseup = Custom.clear;
	},
	pushed: function() {
		element = this.nextSibling;
		if(element.checked == true && element.type == "checkbox") {
			this.style.backgroundPosition = "0 -" + checkboxHeight*3 + "px";
		} else if(element.checked == true && element.type == "radio") {
			this.style.backgroundPosition = "0 -" + radioHeight*3 + "px";
		} else if(element.checked != true && element.type == "checkbox") {
			this.style.backgroundPosition = "0 -" + checkboxHeight + "px";
		} else {
			this.style.backgroundPosition = "0 -" + radioHeight + "px";
		}
	},
	check: function() {
		element = this.nextSibling;
		if(element.checked == true && element.type == "checkbox") {
			this.style.backgroundPosition = "0 0";
			element.checked = false;
		} else {
			if(element.type == "checkbox") {
				this.style.backgroundPosition = "0 -" + checkboxHeight*2 + "px";
				if (typeof(checkboxChange) === "function") {
					checkboxChange(this.nextSibling);
				}
			} else {
				if (typeof(checkValue) === "function") {
					radioChange(this.nextSibling);
				}
				this.style.backgroundPosition = "0 -" + radioHeight*2 + "px";
				group = this.nextSibling.name;
				inputs = document.getElementsByTagName("input");
				for(a = 0; a < inputs.length; a++) {
					if(inputs[a].name == group && inputs[a] != this.nextSibling) {
						inputs[a].previousSibling.style.backgroundPosition = "0 0";
					}
				}
			}
			element.checked = true;
		}
	},
	clear: function() {
		inputs = document.getElementsByTagName("input");
		for(var b = 0; b < inputs.length; b++) {
			if (inputs[b].previousSibling) {
				if (inputs[b].previousSibling.style) {
					if(inputs[b].type == "checkbox" && inputs[b].checked == true && inputs[b].className == "styled") {
						inputs[b].previousSibling.style.backgroundPosition = "0 -" + checkboxHeight*2 + "px";
					} else if(inputs[b].type == "checkbox" && inputs[b].className == "styled") {
						inputs[b].previousSibling.style.backgroundPosition = "0 0";
					} else if(inputs[b].type == "radio" && inputs[b].checked == true && inputs[b].className == "styled") {
						inputs[b].previousSibling.style.backgroundPosition = "0 -" + radioHeight*2 + "px";
					} else if(inputs[b].type == "radio" && inputs[b].className == "styled") {
						inputs[b].previousSibling.style.backgroundPosition = "0 0";
					}
				}
			}
		}
	},
	choose: function() {
		option = this.getElementsByTagName("option");
		for(d = 0; d < option.length; d++) {
			if(option[d].selected == true) {
				document.getElementById("select" + this.name).childNodes[0].nodeValue = option[d].childNodes[0].nodeValue;
			}
		}
	}
}
window.onload = Custom.init;












/**
 * author Remy Sharp
 * url http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 */
(function(a){function b(){var b=window.innerHeight;var c=document.compatMode;if(c||!a.support.boxModel){b=c=="CSS1Compat"?document.documentElement.clientHeight:document.body.clientHeight}return b}a(window).scroll(function(){var c=b(),d=document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop,e=[];a.each(a.cache,function(){if(this.events&&this.events.inview){e.push(this.handle.elem)}});if(e.length){a(e).each(function(){var b=a(this),e=b.offset().top,f=b.height(),g=b.data("inview")||false;if(d>e+f||d+c<e){if(g){b.data("inview",false);b.trigger("inview",[false])}}else if(d<e+f){if(!g){b.data("inview",true);b.trigger("inview",[true])}}})}});a(function(){a(window).scroll()})})(jQuery);
