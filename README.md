# dtcd_utils

[Complex rest](https://github.com/ISGNeuroTeam/complex_rest/) plugin for front-end needs.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- Deploy [complex rest](https://github.com/ISGNeuroTeam/complex_rest/).

### Deploy from Nexus

For this plugin, you can get the latest build from Nexus.

* Unpack archive into `complex_rest/plugins` directory.

* Run complex rest server.

### Deploy via Make

* Clone the Git repository
    ```sh
    git clone https://github.com/ISGNeuroTeam/dtcd_utils.git
    ```
* Run the following from inside the repository root (you'll get the same archive as in Nexus):
    ```sh
    make pack
    ```
* Unpack archive into `complex_rest/plugins` directory.

* Run complex rest server.

### Deploy manually

* Clone the Git repository
    ```sh
    git clone https://github.com/ISGNeuroTeam/dtcd_utils.git
    ```
* Copy configuration files from `docs/` to `dtcd_utils/` with the following command:
    ```sh
    cp docs/dtcd_utils.conf.example  dtcd_utils/dtcd_utils.conf
	cp docs/log_configuration.json.example  dtcd_utils/log_configuration.json
    ```
* Create virtual environment
    ```sh
    python -m venv venv
    ```
* Activate virtual environment, install requirements; you should have access to Nexus:
    ```sh
    pip install -r requirements.txt
    ```

* Make a **symlink** for `./dtcd_utils/dtcd_utils` in `complex_rest/plugins` directory.
* Run complex rest server.

## Built With


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

- Ilia Sagaidak (isagaidak@isgneuro.com)
- Aleksei Tsysin (atsysin@isgneuro.com)


## License

[OT.PLATFORM. License agreement.](LICENSE.md)