require 'open-uri'
require 'savon'

# FIXME: Could be cool to use method_missing with the SOAP API
class Tradera

  # Credentials for Campanja test app
  # TODO: Move this outside the module!
  AppId = ENV['APP_ID']
  ServiceKey = ENV['SERVICE_KEY']
  PublicKey = ENV['PUBLIC_KEY']
  Domain = ENV['DOMAIN']

  def initialize
    service = 'v3/PublicService.asmx'
    @client = Savon.client do
      log false
      wsdl "#{Domain}/#{service}?WSDL"
      endpoint "#{Domain}/#{service}?appId=#{AppId}&appKey=#{ServiceKey}"
    end
  end

  def get_categories
    response = @client.call(:get_categories)
    response.body[:get_categories_response][:get_categories_result]
  end

  def get_seller_items(user_id)
    message = {
      userId: user_id,
      categoryId: 0,
      filterType: 0,
      minEndDate: nil,
      maxEndDate: nil,
    }
    response = @client.call(:get_seller_items, message: message)
    response.body[:get_seller_items_response][:get_seller_items_result]
  end
end
