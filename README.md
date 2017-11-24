# Data Mining Result Saving Server

This is a server, which accepts your submission and redirects to Mark Sterling's server, saving your error rate and displaying it in leaderboard

## Notes

* I can assure you, it does not save your submission files, only error rates (you can look it up in source code)
* This made for fun, and not intended to be a hacking machine of any kind

## If you want to run it

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Prerequisites

What things you need to install the software and how to install them

* [Node.js 0.10 or higher](https://nodejs.org/en/)
* [MongoDB](https://docs.mongodb.com/manual/installation/)

### Installing

Copy repo

```
git clone https://github.com/Tauka/dm-hack.git
```

Enter project folder

```
cd dm-hack
```

Install node dependencies

```
npm i
```

Create data folder for mongo

```
mkdir any/path/you/want
```

###### ~/mongo/data is good choice

Run mongo with your data folder

```
mongod --dbpath [yourPathToDataFolder]
```

Run Express server

```
npm run start
```

## Deployment

Just copy project to any remote server and do steps above

## Built With

* [Express](http://expressjs.com/) - Minimalist web framework for servers
* [MongoDB](https://docs.mongodb.com/) - Database engine used

## Contributing

PR me any functionality you want, or if you want to do refactoring

## Authors

* **Tauyekel Kunzhol** - *All work* - [Tauka](https://github.com/Tauka)

## License

This project is licensed under the MIT License

## Acknowledgments

* Aidar Babanov for letting me use his server
* Aidar Yessembayev for believing in me
* Serik Zhilibayev for being sexy
