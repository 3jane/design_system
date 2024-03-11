# Figma swatch generator

## Install

### Step 1: Clone the Repository

To start, you need to clone the repository to your local machine. To do this you will need [git](https://github.com/git-guides/install-git). Open your terminal and run the following command:

```bash
git clone https://github.com/3jane/design_system.git
```

This command will copy the repository into the current directory of your local machine.

### Step 2: Install Node.js

The plugin requires Node.js to manage its dependencies and build process. If you haven't installed Node.js yet, visit the [official Node.js website](https://nodejs.org/en) and download the latest version for your operating system. The installer will also include npm (Node Package Manager), which is essential for managing the project's dependencies.

### Step 3: Build tokens

After cloning the repository and installing Node.js, use the terminal to navigate to the root directory and install dependencies and build tokens:

```bash
# Navigate to root folder
cd design_system

# Install dependencies
npm ci

# Build tokens
node packages/style_dict/scripts/tokenStudioToMinimalJSON.mjs
```

### Step 4: Build the Plugin

After that navigate to the plugin directory and install dependencies and build plugin:

```bash
# Navigate to root folder
cd design_system/packages/figma/swatch_generator

# Install dependencies
npm ci

# Build tokens
npm run build
```

This command initiates the build script, preparing your plugin for use in Figma. All necessary files will be created in the `design_system/packages/figma/swatch_generator/dist` folder.

### Step 6: Connect the Plugin in Figma

1. Open the Figma desktop app
2. In the upper-left corner, open the Figma menu and select Plugins.
3. Under Development:
   - Select Import new plugin from manifest... if you already have your source code on your computer.
4. Specify the path to the plugin's manifest file, which is usually located in `design_system/packages/figma/swatch_generator/dist/manifest.json`

After completing these steps, your plugin will be available in Figma for use in development mode. This allows you to test its functionality and make necessary adjustments during the development process.
