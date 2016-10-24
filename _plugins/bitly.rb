require 'bitly'

module Jekyll
  class BitlyFilterCache
    def initialize
      @result_cache = {}
      config = Jekyll.configuration({})
      username = config['bitly']['username']
      key = config['bitly']['api_key']
      Bitly.use_api_version_3
      @bitly = Bitly.new(username, key)
    end

    @@instance = BitlyFilterCache.new

    def self.instance
      @@instance
    end

    def shorten(input)
      input.strip!
      return @result_cache[input] if @result_cache.has_key?(input)
      puts "Shortening #{input}..."
      u = @bitly.shorten(input, :history => 1)
      @result_cache[input] = u.short_url
      puts "New url: #{u.short_url}"
      return u.short_url
    end
  end

  module BitlyFilter
    def bitly(input)
      BitlyFilterCache.instance.shorten(input)
    end
  end
end

Liquid::Template.register_filter(Jekyll::BitlyFilter)
