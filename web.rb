require 'json'
# External libs
require 'sinatra'
# Internal modules
require './tradera.rb'

get '/' do
  redirect '/index.html'
end

get '/users/:id/items' do
  c = Tradera.new
  response = c.get_seller_items params[:id]
  products = response[:item].map do |x|
    {
      "headline" => x[:short_description],
      "productImage" => get_image(x),
      "productUrl" => x[:item_link],
      "currentBid" => x[:max_bid],
      "hoursLeft" => 0,
      "minutesLeft" => 0,
    }
  end
  content_type 'application/json'
  {"products" => products[0..20]}.to_json
end

def get_image(item)
    image   = item[:image_links]
    image &&= image[:string]
    [*image][0]
end
