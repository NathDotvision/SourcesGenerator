# Sources Generator

## Explanation

With the aim of listing the sources and being useful for both developers and managers.

To do this, we have developed several programs that allow you to list the sources of a project.

### The Python files

You have a file (main.py)[./main.py] which allows you to launch the program.
But be careful:

- Do not put more than 100 lines of code in the reference files -> risk of memory saturation
- This file takes quite a long time to execute

It will generate a PDF file named (data.pdf)[./data.pdf] which will contain all the sources of your project with logos, links, and titles of the different pages.

#### Launching

Don't forget to run the command to install the dependencies.

```shell
pip install -r requirements.txt
```

Then launch the main.py file.

### The web interface

To launch the web interface, simply launch the file (app.py)[./app.py].

It will install the necessary dependencies for the proper functioning of the program via an `npm install`.

## Next steps

- Modify database into the website
- Log in different accounts
- Implementation of projects in the database
