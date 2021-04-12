(function (blink) {
	'use strict';

	var faqux_demoStyle = function () {
			blink.theme.styles.basic.apply(this, arguments);
		},
		page = blink.currentPage;

	faqux_demoStyle.prototype = {
		//BK-15873 añadimos el estilo basic como parent para la herencia de los estilos del CKEditor
		parent: blink.theme.styles.basic.prototype,
		bodyClassName: 'content_type_clase_faqux_demo',

		toolbar: { name: 'editorial', items: ['Blink_faqux_demo_link'] },

		extraPlugins: ['image2', 'blink_faqux_demo_link'],

		ckEditorStyles: {
			name: 'faqux_demo',
			styles: [
				{ name: 'Encabezado', element: 'h4', attributes: { 'class': 'bck-encabezado' } },
				{ name: 'Sub-Encabezado', element: 'p', attributes: { 'class': 'bck-sub-encabezado' } },

				{ name: 'Tabla centrada', element: 'table', type: 'bck-stack-class', attributes: { 'class': 'bck-table-center'} }
			]
		},

		init: function () {
			//BK-15873 Utilizamos this.parent declarada al inicio de la clase
			this.parent.init.call(this);
			this.addActivityTitle();
			this.suscribeToBlinkEvents();
		},

		suscribeToBlinkEvents: function () {
			blink.events.on('initSlides:after', function () {
				if (!checkModoCorreccion()) {
					$('.revision-budget').add('.modo_revision')
						.hideBlink();
				}
			});
		},

		addActivityTitle: function () {
			if (!blink.courseInfo || !blink.courseInfo.unit) return;
			$('.libro-left').find('.title').html(function () {
				return $(this).html() + ' > ' + blink.courseInfo.unit;
			})
		},

		configEditor: function (editor) {
			editor.dtd.$editable['span'] = 1;
		},

		//BK-15873 Quitamos la funcion getEditorStyles para que la herede de basic
	};

	faqux_demoStyle.prototype = _.extend({}, new blink.theme.styles.basic(), faqux_demoStyle.prototype);

	blink.theme.styles.faqux_demo = faqux_demoStyle;

})( blink );

$(function () {
	if (blink.activity) {
		blink.activity.getContainerWidth = function () {
			return $('.swipeview-active').find('.item-container').find('.layout').width();
		};
	}
});

