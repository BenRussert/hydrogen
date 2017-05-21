# Contributing to Hydrogen

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

**Working on your first Pull Request?** You can learn how from this *free* series
[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github).

Please join our [Slack channel](https://slackin-nteract.now.sh/) if you have any questions or just want to say hi.

## Project setup

### Quick and dirty setup

`apm develop hydrogen`

This will clone the `hydrogen` repository to `~/github` unless you set the
`ATOM_REPOS_HOME` environment variable.

### I already cloned it!

If you cloned it somewhere else, you'll want to use `apm link --dev` within the
package directory, followed by `apm install` to get dependencies.

### Workflow

After pulling upstream changes, make sure to run `apm update`.

To start hacking, run `atom --dev .` from the package directory.
Cut a branch while you're working then either submit a Pull Request when done
or when you want some feedback!

### Running specs

You can run specs by triggering the `window:run-package-specs` command in Atom. To run tests on the command line use `apm test` within the package directory.

We use [Jasmine](https://jasmine.github.io/2.5/introduction) for writing specs.

### Build Documentation

To build the website locally, first install gitbook-cli:
```bash
npm install gitbook-cli -g
```
Then, to install project dependencies:
```bash
gitbook install
```

Now you should be all set up! To start a local server run:
```bash
gitbook serve
```
The default address will be `localhost:4000`, navigate there in your browser of choice to preview your branch!


For more information take a look at https://toolchain.gitbook.com/setup.html.
