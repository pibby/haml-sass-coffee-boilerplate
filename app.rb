Bundler.require

require 'sinatra/asset_pipeline'

class App < Sinatra::Base
# CSS minification
  set :assets_css_compressor, :sass

  # JavaScript minification
  set :assets_js_compressor, :uglifier

  register Sinatra::AssetPipeline

  get '/' do
    haml :index
  end
end