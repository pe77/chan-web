77chan :: Webapp
===================

Aplicação web do chan. Só o exibidor do conteudo. A publicação de conteudo vai ficar a cargo da API que só vou publicar depois do beta.

----------


Instalação
-------------

- Instala o GIT 
- Clona (https://github.com/pe77/chan-web.git)
- Copia o arquivo em ``` app/config.sample.js ``` para ``` app/config.js ```
- Dentro desse aquivo substitua **[URL_ABSOLUTA_DA_API]** pela url absoluta da API

**Sim, eu sei que a API eu não dispobilizei ainda. Mas da pra ir adiantando a estrutura e arte enquanto a integração não esta terminada*

Modelo de resposta da API
-------------------

#### Post 

**Get:** 

- **url**: *[URL]/api/post/get/[token]/[id]*
- **retorno**:  O objeto do post em json. ```{"status":1,"message":"","data":[OBJETO]}```
    - **status**: **1** se foi e **0** se não conseguiu por algum motivo
    - **mensagem**: Feedback. Caso não tenha ido, lá vai estar falando o porque.
    - **data**: o objeto do post serializado em json

*Segue o formato de uma forma que de pra entender*:

```
Array
(
    [r_to] => Array
        (
            [0] => Array
                (
                    [id] => 785
                    [type] => 1
                )

        )

    [r_from] => Array
        (
            [0] => Array
                (
                    [id] => 785
                    [type] => 1
                )

            [1] => Array
                (
                    [id] => 786
                    [type] => 1
                )

            [2] => Array
                (
                    [id] => 787
                    [type] => 1
                )

        )

    [id] => 784
    [content] => Conteudo bla blab bla bla bla
    [status] => 1
    [date] => 17/07/2015 22:04:18
    [board] => Array
        (
            [id] => 54
            [title] => Random
            [shortcut_name] => b
            [description] => Off Topic
            [status] => 1
            [posts] => Array
                (
                )

        )

    [files] => Array
        (
            [0] => Array
                (
                    [path] => f721a9c40d95cb8ab01f5bb3f4dbcb0f8dd30172.jpeg
                    [original_name] => Image1
                    [is_image] => 1
                    [status] => 1
                )

        )

)
```


----------


**Get List** 
- **url**: *[URL]/api/post/all/[token]/[page]/[pageItensLimit] *
- **retorno**:  O objeto do post em json. ```{"status":1,"message":"","data":[ARRAY DE OBJETOS]}```
    - **status**: **1** se foi e **0** se não conseguiu por algum motivo
    - **mensagem**: Feedback. Caso não tenha ido, lá vai estar falando o porque.
    - **data**: o array de objetos com os posts

**A mesma coisa do exemplo acima, só que um array com varios posts.*
***O pageLimit tem um maximo, não vá achando que vai colocar 999999 e vai foder com o server*


----------


**Create** 
- **url**: *[URL]/api/post/save/[token] *
- **retorno**:  ``` {"status":1,"message":"Post criado","data":null} ```
    - **status**: **1** se foi e **0** se não conseguiu por algum motivo
    - **mensagem**: Feedback. Caso não tenha ido, lá vai estar falando o porque.
    - **data**: Caso tenha criado com exito, vai retornar o **id** do post.

Resumindo é só enviar um ```POST[data]``` no mesmo modelo no qual você recebe ele. 

No caso do envio da imagem/video, só enviar dentro de ```FILE[file]```. Lembrando que no caso de novos posts, que não forem respostas, o arquivo é mandatório.


Considerações
-----------------

Lembrando que essa é a penas a interface web. Só listei acima como vai funcionar inicialmente o modelo de conexão. Vou soltar o codigo da API(que já esta bem mais adiantada) depois do beta.

Muitas coisas vão ser atualizadas nesse meio tempo, por exemplo o post vai retornar um array com as **Tags** e na criação dos posts o anão vai poder apontar um de seus arquivos salvos no perfil, ao enves de subir imagem/video.

Conforme for fazendo/alterando vou atualizando esse arquivo juntamente com o código.
