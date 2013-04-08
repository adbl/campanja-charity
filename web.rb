require 'json'
# External libs
require 'sinatra'
# Internal modules
require 'tradera.rb'

get '/' do
  redirect '/index.html'
end

get '/users/:id/items' do
  c = Tradera.new
  response = c.get_seller_items params[:id]
  products = response[:item].map do |x|
    {
      "headline" => x[:short_description],
      "productImage" => x[:thumbnail_link],
      "productUrl" => x[:item_link],
      "currentBid" => x[:max_bid],
      "hoursLeft" => 0,
      "minutesLeft" => 0,
    }
  end
  content_type 'application/json'
  {"products" => products}.to_json
end
