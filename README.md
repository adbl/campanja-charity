To start the server, run the following commands in the repo:

    bundle install
    bundle exec ruby -I . web.rb

Sinatra automatically serves static content from the `/public` folder,
i.e. if there's a file `/public/css/style.css` in the repository, that
file will made be available at `/css/style.css`.

To interface with Tradera some environment variables with API keys are
required, consult your local Campañero for help.
