# ui5-local-neo

Custom Server middleware to provide proxy capabilities and support neo-app.json.

## Installation

With [Nodejs](https://nodejs.org/en/) installed run the installation command in a terminal:

```bash
npm i ui5-local-neo
```

## Usage

### destinations.json File

Create a `destination.json` file in the root of your ui5 project with the following content:

```json
{
    "sapui5": {
        "Description": "SAPUI5 Resources",
        "uri": "https://sapui5.hana.ondemand.com/"
    }
}
```

The above example is mandatory to load ui5 tools, but you can create your own destinations like this:

```json
{
    "sapui5": {
        "Description": "SAPUI5 Resources",
        "uri": "https://sapui5.hana.ondemand.com/"
    },
    "awesome_destination": {
        "uri": "<sample-uri>",
        "credentials": {
            "user": "<username-to-basic-authentication>",
            "password": "<password-to-basic-authentication>"
        }
    }
}
```

The object key name in the destinations file must be the same configured in the neo-app.json file. You can find it inside the routes array. The name you're looking for is the property `target.name` in the file

### neo-app.json File
```json
{
	"welcomeFile": "/webapp/index.html",
	"routes": [{
		"path": "/resources",
		"target": {
			"type": "service",
			"name": "sapui5",
			"entryPath": "/resources"
		},
		"description": "SAPUI5 Resources"
	}, {
		"path": "/some-endpoint",
		"target": {
			"type": "destination",
			"name": "awesome_destination", // this is the name you must put in your destinations.json file
			"entryPath": "/path/to/some/endpoint"
		},
		"description": "Description"
	}],
	"sendWelcomeFileRedirect": true
}
```

When the ui5 requests to the `/some-endpoint` it will be redirected to our middleware and it will to the request to the uri you put inside `destinations.json` file.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)