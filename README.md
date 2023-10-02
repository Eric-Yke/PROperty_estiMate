# PRO estiMate

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# How to run this project locally

## 1. Install Node.js on your system

1.1 Go to the Node.js's official site: "https://nodejs.org/en"

1.2 Download Version 20.8.0 of the installer according to your operating system.

1.3 After installation, check if the Node.js has already been installed, open the terminal and type:

```bash
node -v
```

If v20.8.0 appears, it means the installation was successful! Otherwise, install it again.

## 2. Install the project

### 2.1 Clone the project to your local machine:

2.1.1 Navigate to the folder in which you want to clone the project.

```bash
cd <folder-directory>
```

2.1.2 Clone the project into your specified folder

```bash
git clone https://github.com/Eric-Yke/PROperty_estiMate.git
```

2.1.3 Navigate to the root folder of the project.

```bash
cd PROperty_estiMate
```

### 2.2 Install project dependencies:

```bash
npm install
```

### 2.3 Running the Project

2.3.1 Run the following command to build a production version of this application:\

```bash
npm run build
```

This generates an optimised, compressed production version and outputs the files to the build directory.

2.3.2 Install 'serve' package:

```bash
npm install -g serve
```

2.3.3 Start 'serve' in the build directory:

```bash
serve -s build
```

This will start an HTTP server serving the files in the build directory.

2.3.4 Copied local address to clipboard and access the application in the browser according to the pop-up information
