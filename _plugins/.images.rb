require "jekyll-assets"
require 'base64'

module Jekyll
  
  class ImageAbsolute < Jekyll::Assets::Liquid::Tag
    def initialize(tag, args, tokens)
      super("img", args, tokens)
    end
  
    private
    def build_html(args, sprockets, asset)
      "file://" + asset.filename
    end
    
  end
  
  class ImageBase64 < Jekyll::Assets::Liquid::Tag
    def initialize(tag, args, tokens)
      super("img", args, tokens)
    end
  
    private
    def build_html(args, sprockets, asset)
      "data:" + asset.content_type + ";base64, " + Base64.encode64(asset.source).delete("\n")
    end
    
  end
  
  class ImagePath < Jekyll::Assets::Liquid::Tag
    def initialize(tag, args, tokens)
      super("img", args, tokens)
    end
  
    private
    def build_html(args, sprockets, asset, path = get_path(sprockets, asset))
        path
    end
  
  end

end


Liquid::Template.register_tag('image_path', Jekyll::ImagePath)
Liquid::Template.register_tag('img_path', Jekyll::ImagePath)

Liquid::Template.register_tag('image_base64', Jekyll::ImageAbsolute)
Liquid::Template.register_tag('img_base64', Jekyll::ImageAbsolute)

#Liquid::Template.register_tag('image_base64', Jekyll::ImageBase64)
#Liquid::Template.register_tag('img_base64', Jekyll::ImageBase64)