(function (blink) {
	'use strict';

	var faquxdemoStyle = function () {
			blink.theme.styles.basic.apply(this, arguments);
		},
		page = blink.currentPage;

	faquxdemoStyle.prototype = {
		//BK-15873 añadimos el estilo basic como parent para la herencia de los estilos del CKEditor
		parent: blink.theme.styles.basic.prototype,
		bodyClassName: 'content_type_clase_faquxdemo',

		ckEditorStyles: {
			name: 'faquxdemo',
			styles: [
				{ name: 'Título 01', element: 'h4', attributes: { 'class': 'bck-titulo1' } },
				{ name: 'Título 02', element: 'h4', attributes: { 'class': 'bck-titulo2' } },
				{ name: 'Título 03', element: 'p', attributes: { 'class': 'bck-titulo3' } },

				{ name: 'Enfasis rosa', element: 'span', attributes: { 'class': 'bck-enfasis-rosa' } },
				{ name: 'Enfasis azul', element: 'span', attributes: { 'class': 'bck-enfasis-azul' } },
				{ name: 'Enfasis verde', element: 'span', attributes: { 'class': 'bck-enfasis-verde' } },
				{ name: 'Enfasis naranja', element: 'span', attributes: { 'class': 'bck-enfasis-naranja' } },
				{ name: 'Enfasis morado', element: 'span', attributes: { 'class': 'bck-enfasis-morado' } },
				{ name: 'Enfasis naranja-borde', element: 'span', attributes: { 'class': 'bck-enfasis-naranja-borde' } },
				{ name: 'Enfasis + verde', element: 'span', attributes: { 'class': 'bck-enfasis-masverde' } },
				{ name: 'Enfasis verde negrita', element: 'span', attributes: { 'class': 'bck-enfasis-verdenegrita' } },

				{ name: 'Caja 01', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box-1' } },

				{ name: 'Icono +', element: 'span', attributes: { 'class': 'icon icon-mas' } },
				{ name: 'Icono logo blink', element: 'span', attributes: { 'class': 'icon icon-logoblink' } },

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

		configEditor: function (editor) {
			editor.dtd.$removeEmpty['span'] = false;
		},


		addActivityTitle: function () {
			if (!blink.courseInfo || !blink.courseInfo.unit) return;
			$('.libro-left').find('.title').html(function () {
				return $(this).html() + ' > ' + blink.courseInfo.unit;
			})
		},


		//BK-15873 Quitamos la funcion getEditorStyles para que la herede de basic
	};

	faquxdemoStyle.prototype = _.extend({}, new blink.theme.styles.basic(), faquxdemoStyle.prototype);

	blink.theme.styles.faquxdemo = faquxdemoStyle;

})( blink );

$(function () {
	if (blink.activity) {
		blink.activity.getContainerWidth = function () {
			return $('.swipeview-active').find('.item-container').find('.layout').width();
		};
	}
});
