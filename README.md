# insurance-web-api
As an insurance company we've been asked to develop an application that manages some information about our insurance policies and company clients. We want to create a Web API that exposes API services.

## Table of contents
- [Local Setup](#local-setup)
- [Installation](#installation)
- [Contributing](#contributing)

### Local Setup
To preview the website locally:
1. Install [git](https://git-scm.com/) if you don't have them already.
2. Install [npm](https://www.npmjs.com/) to run the service.
3. You also need to install [nodejs](https://nodejs.org/en/) on your local machine.

### Installation

Clone the git repository

```sh
$ git clone https://github.com/FabioAnsaldi/insurance-web-api.git
```

Go to the repository directory and run the following commands:

```sh
$ cd insurance-web-api
$ npm install
$ npm run start
```

Custom settings (optional)

If you want to set a custom configuration for IP address or service port:
Go to ***config*** directory, copy the ***default.json*** file and edit the ***custom.json*** file

```json
{
  "address": "your_local_address_ip",
  "port": "your_local_service_port"
}
```

You have to run the service with the optional parameter like below:

```sh
$ npm run start custom.json
```
If the your_local_address_ipyou is 127.0.0.1, you will see somethink like below:

```sh
Web API are listening on 
127.0.0.1:80
```

### Contributing

Feel free to make changes to the template files or the document files.
