# dtcd_server

[Complex rest](https://github.com/ISGNeuroTeam/complex_rest/tree/develop) plugin for graph management.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- Deploy [complex rest](https://github.com/ISGNeuroTeam/complex_rest/tree/develop).
- Install [Neo4j](https://neo4j.com/docs/operations-manual/current/installation/) graph database.
    - Follow installation instructions [ [Linux](https://neo4j.com/docs/operations-manual/current/installation/linux/) | [Windows](https://neo4j.com/docs/operations-manual/current/installation/windows/) | [Mac](https://neo4j.com/docs/operations-manual/current/installation/osx/) ]. Pay attention to the [required Java version](https://neo4j.com/docs/operations-manual/current/installation/requirements/#deployment-requirements-java); you may need to change system defaults.
    - Run the service, make sure is as available at port `7687`.
    - Set initial password to `password` with the following command:
        ```sh
        neo4j-admin set-initial-password password
        ```
    - (optional) If you installed *Cypher shell*, you can try to connect to Neo4j to make sure everything is ok:
        ```sh
        cypher-shell -a neo4j://localhost:7687 -u neo4j -p password
        ```

### Installing

* TODO assets?
* Copy configuration files from `docs/` to `dtcd_server/` with the following command:
    ```sh
    cp docs/dtcd_server.conf.example  dtcd_server/dtcd_server.conf
	cp docs/log_configuration.json.example  dtcd_server/log_configuration.json
	cp docs/serialization.json.example  dtcd_server/serialization.json
	cp docs/exchange.json.example  dtcd_server/exchange.json
    ```
* TODO virtualenv?
* Install requirements; you should have access to Nexus:
    ```sh
    pip install -r requirements.txt
    ```
* The library `py2neo` we use for graph operations has a *bug* [[Issue 942](https://github.com/py2neo-org/py2neo/issues/942)]. For now, you have to manually fix the [line 691](https://github.com/py2neo-org/py2neo/blob/master/py2neo/data.py#L691) in `venv/lib/python3.9/site-packages/py2neo/data.py` file. Change it to (note 8 spaces)
    ```python
            if self.graph and self.identity is not None:
    ```
* Make a **symlink** for `./dtcd_server/dtcd_server` in `complex_rest/plugins` directory.
* Run complex rest server.

## Deployment

* Make plugin archive:
    ```bash
    make pack
    ```
* Fix `py2neo` bug (see [Installing](#installing) section).
* Unpack archive into `complex_rest/plugins` directory.

## Built With

- [Neo4j](https://neo4j.com/) - Graph data platform.


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

- Ilia Sagaidak (isagaidak@isgneuro.com)
- Aleksei Tsysin (atsysin@isgneuro.com)


## License

[OT.PLATFORM. License agreement.](LICENSE.md)