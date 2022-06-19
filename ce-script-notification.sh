set -v

# Talk to the metadata server to get the project id
GCP_PROJECT_ID=$(curl -s "http://metadata.google.internal/computeMetadata/v1/project/project-id" -H "Metadata-Flavor: Google")

# Set repository URL
REPOSITORY_URL=https://github.com/valdiearsanur/google-pub-sub-notification.git

# Install logging monitor. The monitor will automatically pick up logs sent to
# syslog.
# (it will coss us on log service)
# curl -s "https://storage.googleapis.com/signals-agents/logging/google-fluentd-install.sh" | bash
# service google-fluentd restart &

# Install dependencies from apt
apt-get update
apt-get install -yq ca-certificates git build-essential

# Install nodejs
mkdir /opt/nodejs
curl https://nodejs.org/dist/v16.15.0/node-v16.15.0-linux-x64.tar.gz | tar xvzf - -C /opt/nodejs --strip-components=1
ln -s /opt/nodejs/bin/node /usr/bin/node
ln -s /opt/nodejs/bin/npm /usr/bin/npm

# Get the application source code from the Google Cloud Repository.
# git requires $HOME and it's not set during the startup script.
export HOME=/root
git config --global credential.helper gcloud.sh
git clone ${REPOSITORY_URL} /opt/app/new-repo

# Install app dependencies
cd /opt/app/new-repo
cat > .env <<EOL
export TOPIC_ID=projects/${GCP_PROJECT_ID}/topics/pubsub
export SUBSCRIPTION_ID=projects/${GCP_PROJECT_ID}/subscriptions/pubsub-sub
EOL
npm install

# Create a nodeapp user. The application will run as this user.
useradd -m -d /home/nodeapp nodeapp
chown -R nodeapp:nodeapp /opt/app
