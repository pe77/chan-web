var userLang = navigator.language || navigator.userLanguage; 

if(userLang =='pt-BR')
{
	Apply();
}else{
	if(!window.i18n)
		window.i18n = {};
	//
}
//


function Apply()
{
	window.i18n = {
		// layout itens 
	    'Refresh': 'Recarregar',
	    'replies': 'respostas',
	    'Recording...': 'Gravando...',
	    'Load more': 'Carregar mais',
	    'REC': 'Gravar',
	    'Image/Video(mp4)': 'Imagem/Video(mp4)',
	    'Send': 'Enviar',
	    'Notifications': 'Notificações',
	    'Logout': 'Sair',
	    'Close': 'Enviar',
	    'Message': 'Mensagem',
	    'Last Messages': 'Últimas mensagens',
	    'Find us on': 'Encontre-nos no ',
	    'To create a new topic, sign in': 'Para criar um novo tópico é necessario estar logado',
	    'This page will update itself when there is a new reply': 'Essa página irá se carregar sozinho quando houver uma nova resposta',

	    // menus
	    'About': 'Como funciona',
	    'Rules': 'Regras',
	    'Reports': 'Reports',
	    'Boards': 'Boards',

	    // controllers/api responses
	    'There are no more posts to this board / selection': 'Não existem mais posts para essa board / seleção',
	    'Report post':'Denunciar post',
	    'Admin post':'Administrar post',
	    'An Unexpected Error Has Occurred. Check your connection and try again.':'Ocorreu um erro inesperado, por favor, tente novamente em alguns minutos',

	    'Hello {name}!': function (data) {
	        return 'Hallo ' + data.name + '!';
	    }
	};
}

