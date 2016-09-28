require 'net/http'
require 'json'

module Jekyll
  class MakesGenerator < Generator
    def generate(site)
      uri = URI('http://www.carqueryapi.com/api/0.3/?cmd=getMakes')
      response = Net::HTTP.get(uri)
      site.data['makes'] = JSON.parse(response)['Makes']
    end
  end
end
