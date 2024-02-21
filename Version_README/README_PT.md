# Gerador de Fontes

## Explicação

Com o objetivo de listar as fontes e ser útil tanto para os desenvolvedores quanto para os gerentes.

Para isso, desenvolvemos vários programas que permitem listar as fontes de um projeto.

### Os arquivos Python

Você tem um arquivo (main.py)[./main.py] que permite iniciar o programa.
No entanto, observe o seguinte:

- Não ultrapasse 100 linhas de código nos arquivos referenciados -> risco de saturar a memória
- Este arquivo leva muito tempo para ser executado

Ele gerará um arquivo PDF chamado (data.pdf)[./data.pdf] que conterá todas as fontes do seu projeto com os logotipos, os links e os títulos das diferentes páginas.

#### Iniciando

Não se esqueça de executar o comando para instalar as dependências.

```shell
pip install -r requirements.txt
```

Em seguida, execute o arquivo main.py.

### A interface web

Para iniciar a interface web, basta executar o arquivo (app.py)[./app.py].

Ele se encarregará de instalar as dependências necessárias para o bom funcionamento do programa através de `npm install`.

## Próximos Passos

- Modificar o banco de dados do site
- Fazer login com diferentes contas
- Implementação dos projetos no banco de dados
