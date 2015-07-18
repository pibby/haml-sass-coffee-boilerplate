# Boilerplate
Sinatra, HAML, Sass, CoffeeScript, Sprockets, Live Reload, Heroku

It comes with
 * [Sprockets](https://github.com/sstephenson/sprockets): to enable direct development in haml, sass and coffeescript.
 * [LiveReload](https://github.com/guard/guard-livereload): automatically reloads pages during development to speed up debugging


## Installation

Start by running

    bundle install

Run the app with

    bundle exec rackup

## Development

To automatically reload pages when you make changes to its source code, run in a seperate console:

    bundle exec guard

## Deploying

Ready for Heroku
		heroku apps:create app-name
		git push heroku master