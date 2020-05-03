<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<h1 align="center">
  Forkify
</h1>

## 🚀 Quick start

1.  **Clone application.**

    Use the GIT CLI to clone the application..

    ```shell
    git clone git@github.com:felixbec/forkify.git 
    ```

2.  **Before starting to develop.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd forkify/
    npm install
    ```

    At this point you have the repository download with all the dependencies installed, but if you try to start by running `npm start` you are going to receive these messages in the console:
    ```
    ERROR in Entry module not found: Error: Can't resolve './dist/bundle.js'.
    ```

    Due to Webpack Bundled Scripts not being setup.

3.  **Configure Webpack Bundled Scripts.**

    Run the following command `npm run dev`. The CLI popup will remove the existing `/dist/js/bundle.js` and create new bundled scripts file with the latest changes.

4.  **Open the source code and start editing!**

    Run the following command `npm start`. 

    Your site is now running at `https://localhost:8080`!

    Open the `forkify` directory in your code editor of choice and edit `src/js/index.js`. Save your changes and the browser will update in real time!

## 🧐 What's inside?

    A quick look at the top-level files and directories you'll see.

    .
    ├── dist
    ├── node_modules
    ├── src
    ├── .babelrc
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── webpack.config.js

1.  **`/dist`**: This directory will contain all of the bundled code related to what you will see on the front-end of your application.

2.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

3.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site.

4.  **`.babelrc`**: This file contains all of your Babel Presets configurations and other specific information relating to your build.

5.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

6.   **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

7.  **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.
8.  **`README.md`**: A text file containing useful reference information about your project.

9.  **`webpack.config.js`**: This file contains all of your configuration, loaders, and other specific information relating to your build.

<!-- AUTO-GENERATED-CONTENT:END -->