$:.unshift File.expand_path("../", __FILE__)
require 'sinatra'
require 'haml'
require 'sass'
require 'sprockets'
require 'application'

map '/assets' do
  environment = Sprockets::Environment.new
  environment.append_path 'assets/javascripts'
  environment.append_path 'assets/stylesheets'
  run environment
end

map '/' do
  run Application
end
