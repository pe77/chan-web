var parameters = {
	api_url : "[API_URL]",
	google_api_key : "[API_KEY]",
	facebook_api_key : "[API_KEY]",
	file_path : "[IMAGE_PATH]",
	messages_update_interval : 60000, // 1 minuto
	page_limit : 15, // 15 posts por pagina
	auto_update_time: 1000*15, // 10 segundos
	cache_time: 60 * 1000 * 5, // 5 minutos (milissegundo)
	cache_mode: 'memory' // localStorage (guarda mesmo se refrescar a pagina) | memory (quando der F5 limpa)
};