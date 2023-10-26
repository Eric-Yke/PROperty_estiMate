# PRO estiMate

The core objective of the Pro Estimate project is to deliver a user-friendly, efficient, and humanized web application platform where users can obtain accurate real estate price forecasts. Our team will employ iterative development and prototype design methodologies to continually refine the product, ultimately delivering a Pro Estimate application that meets user needs.
Additionally, we will place a strong emphasis on user experience, optimizing product performance through user feedback. The project is anchored in the development of a system utilizing microservices technology, with a focus on predicting future property values and rents based on quantitative data from end users. Several milestones mark the path of Pro Estimate, including the development of a microservices architecture, the collection of quantitative data, and the application of machine learning to analyze and present predictive property values to users.
A user-friendly web interface is a cornerstone of the project, facilitating accurate data input and ease of use. We will develop a microservices architecture, utilize machine learning technology for data analysis, and provide a user-friendly web interface to assist users in accurately inputting data and easily utilizing the system.
With the continuous development of the real estate market and the enhancement of people's investment awareness, we foresee widespread application and recognition of the ProEstimate system in the future. Our services not only meet users' needs for housing price prediction but also promote innovation and development in the entire real estate tech market. We plan to gradually enhance ProEstimate's competitiveness in the market through continuous technological research and development and market promotion. As we gain more market share, we anticipate sustainable revenue growth, creating more value for the company.

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

2.3.1 Run the following command to build a production version of this application:

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

2.3.4 Copy local address to clipboard and access the application in the browser according to the pop-up information
