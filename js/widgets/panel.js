//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Responsive presentation and behavior for HTML data panels
//>>label: Panel
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.panel.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../jquery.mobile.widget", "./page", "./page.sections" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.panel", $.mobile.widget, {
	options: {
		classes: {
			panel: "ui-panel"
		},
		theme: null,
		position: "left",
		dismissible: true,
		display: "push",
		initSelector: ":jqmData(role='panel')"
	},

	_handleLink: function( roleType , callback ){
		$( document ).bind( "pagebeforechange", function( e, data ) {
			if ( data.options.role === roleType ) {
				e.preventDefault();
				callback( data.options.link );
				return false;
			}
		});
	},
	_create: function() {
		var o = this.options,
			klass = o.classes.panel,
			$el = this.element,
			$closeLink = $el.find( "[data-rel=close]" );
			console.log( $closeLink );
		$el.addClass( klass + "-hide" )
			.addClass( klass );
		if( o.theme ){
			$el.addClass( "ui-body-" + o.theme );
		}
		this._handleLink( "panel" , function( $link ){
			$el.panel( "toggle" , {
				position: $link.jqmData( "position" ),//left right top
				dismissible: $link.jqmData( "dismissible" ),//true or false
				display: $link.jqmData( "display" )// overlay or push
			});
		});
		$closeLink.on( "click" , function( e ){
			e.preventDefault();
			$el.panel( "close" );
			return false;
		});
	},
	_destroy: function(){},
	open: function( options ){
		var o = this.options,
			klass = o.classes.panel,
			$el = this.element;
		options = options || {};
		options.position = options.position || o.position;
		options.dismissible = options.dismissible || o.dismissible;
		options.display = options.display || o.display;

		$el.addClass( klass + "-position-" + options.position )
			.addClass( klass + "-dismissible-" + options.dismissible )
			.addClass( klass + "-display-" + options.display )
			.removeClass( klass + "-hide" )
			.jqmData( "position" , options.position )
			.jqmData( "display" , options.display );
		if( options.display === "push" ){
			$( ".ui-content, .ui-header, .ui-footer" ).addClass( "panel-shift-" + options.position );
		} else {
			$( ".ui-content, .ui-header, .ui-footer" ).removeClass( "panel-shift-" + options.position );
		}
		$el.removeClass( klass + "-hidden" );
		$.mobile.panel.active = true;
	},
	close: function( options ){
		var klass = this.options.classes.panel,
			$el = this.element,
			position = $el.jqmData( "position" ),
			display = $el.jqmData( "display" );
		$( ".ui-content, .ui-header, .ui-footer" ).removeClass( "panel-shift-" + position );
		$el.removeClass( klass + "-position-" + position )
			.removeClass( klass + "-display-" + display )
			.addClass( klass + "-hidden" );
		$.mobile.panel.active = false;
	},
	toggle: function( options ){
		if( $.mobile.panel.active ){
			this.close( options );
		} else {
			this.open( options );
		}
	},
	refresh: function(){
	}
});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ) {
	$.mobile.panel.prototype.enhanceWithin( e.target );
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");

