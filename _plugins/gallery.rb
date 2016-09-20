require "jekyll-assets"
require 'base64'

module Jekyll

  # For using proxies on images where only the path is required
  class Gallery < Jekyll::Assets::Liquid::Tag
    def initialize(tag, args, tokens)
      super("img", args, tokens)
    end

    private
    def build_html(args, sprockets, asset, path = get_path(sprockets, asset))
        path
    end

  end

end


Liquid::Template.register_tag('gallery', Jekyll::Gallery)