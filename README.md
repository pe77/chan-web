77chan :: Webapp
===================

Aplicação web do chan. Só o exibidor do conteudo. A publicação de conteudo vai ficar a cargo da API que só vou publicar depois do beta.

----------


Instalação
-------------

- Instala o GIT 
- Clona (https://github.com/pe77/chan-web.git)
- Copia o arquivo em ``` app/config.sample.js ``` para ``` app/config.js ```
- Dentro desse aquivo substitua **[api_url]** pela url absoluta da API. Ainda dentro do arquivo tem outras variaveis de configuração geral. Mas o que não pode faltar são [api_url] e [file_path]
- As APIs do facebook e google deixo por sua conta. Não adianta usar as do chan porque esta fechada por dominio.

**Sim, eu sei que a API eu não dispobilizei ainda. Mas depois de testes mais concisos vou publicar. *


Considerações
-----------------

Lembrando que essa é a penas a interface web. Só listei acima como vai funcionar inicialmente o modelo de conexão. Vou soltar o codigo da API(que já esta bem mais adiantada) depois do beta.