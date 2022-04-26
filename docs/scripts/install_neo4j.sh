# add repository
sudo rpm --import https://debian.neo4j.com/neotechnology.gpg.key
sudo cat <<EOF >  /etc/yum.repos.d/neo4j.repo
[neo4j]
name=Neo4j RPM Repository
baseurl=https://yum.neo4j.com/stable
enabled=1
gpgcheck=1
EOF

# TODO ensure correct Java version

# install neo4j
sudo yum install neo4j-4.4.6