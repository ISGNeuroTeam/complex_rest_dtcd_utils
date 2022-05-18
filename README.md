# dtcd_server

Plugin for [complex rest](https://github.com/ISGNeuroTeam/complex_rest/tree/develop)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- Deploy [complex rest](https://github.com/ISGNeuroTeam/complex_rest/tree/develop).
- Install [Neo4j](https://neo4j.com/docs/operations-manual/current/installation/) graph database.
    - Follow installation instructions [ [Linux](https://neo4j.com/docs/operations-manual/current/installation/linux/) | [Windows](https://neo4j.com/docs/operations-manual/current/installation/windows/) | [Mac](https://neo4j.com/docs/operations-manual/current/installation/osx/) ]. Pay attention to the [required Java version](https://neo4j.com/docs/operations-manual/current/installation/requirements/#deployment-requirements-java); you may need to change system defaults
    - Run the service, make sure is as available at port `7687`.
    - Set initial password to `password` with the following command:
        ```sh
        neo4j-admin set-initial-password password
        ```
    - (optional) If you installed *Cypher shell*, you can try to connect to Neo4j to make sure everything is ok with
        ```sh
        cypher-shell -a neo4j://localhost:7687 -u neo4j -p password
        ```

### Installing

* TODO assets
* TODO conf files
* TODO install requirements
* The library `py2neo` we use for graph operations has a *bug* [[Issue 942](https://github.com/py2neo-org/py2neo/issues/942)]. For now, you have to manually fix the line **691** in `venv/lib/python3.9/site-packages/py2neo/data.py` file. Change it to
    ```python
            if self.graph and self.identity is not None:
    ```
* Make symlink for `./dtcd_server/dtcd_server` in plugins directory.
* Run complex rest server.

## Running the tests
Run all tests:
```bash
python ./complex_rest/manage.py test ./plugin_dev/dtcd_server/tests --settings=core.settings.test
```

## Deployment

* Make plugin archive:
```bash
make pack
```
* Unpack archive into complex_rest plugins directory

## Built With

* [Django](https://docs.djangoproject.com/en/3.2/) - The web framework used


## Contributing

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors


## License

[OT.PLATFORM. License agreement.](LICENSE.md)

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc