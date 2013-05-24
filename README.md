To start the server, run the following commands in the repo:

    bundle install
    bundle exec ruby web.rb

Sinatra automatically serves static content from the `/public` folder,
i.e. if there's a file `/public/css/style.css` in the repository, that
file will made be available at `/css/style.css`.

To interface with Tradera the following environment variables need to 
be set:

    APP_ID      # Id of the Tradera application
    SERVICE_KEY # The application's service key
    PUBLIC_KEY  # The application's public key
    DOMAIN      # URL to Tradera API endpoint (test or live)

Consult your local Campañero for help.
