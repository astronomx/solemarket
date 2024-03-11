# Solemarket

<span align="center">![Masterhead](public/images/carousel/banner.jpg)</span>

<br />

Solemarket is a sneaker website that's inspired by various resell websites like StockX, Goat and Restocks. The website is built with NextJs, Tailwind and Supabase. The website is hosted on Vervel and can be found [here](https://solemarket.vercel.app/). The website has a lot of simalarities of these websites but also has some unique features. The website is built for a school project and is not meant to be used in production. Down below you can find how to install the project and run it locally.

<br />

## Installation
**Clone the repository**
```
git clone git@github.com:astronomx/solemarket.git
```

### Install the dependencies**
```
npm install
```

or
```
pnpm dev
```

or depending on your package manager
```
bun dev
```

### Pulling env variables from vercel
```
vercel env pull .env.local
```

## Run the project

To run the project, make sure you have done every step above. If you did do the following:

1. Install Docker **[click here](https://docs.docker.com/get-docker/)** to install Docker
2. In your terminal run: docker-compose up (to stop docker gracefully press Ctrl + C)
3. If you want to delete the image because you've run into some problems run: docker-compose down

After installing the dependencies and running the project you can go to [localhost:3000](http://localhost:3000/) to view the project.

