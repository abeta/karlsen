require "jekyll-assets"
require 'base64'

module Jekyll

  # Inline image (base64)
  class ImageBase64 < Jekyll::Assets::Liquid::Tag
    def initialize(tag, args, tokens)
      super("img", args, tokens)
    end

    private
    def build_html(args, sprockets, asset)
      unless asset.content_type.nil?
        "data:" + asset.content_type + ";base64, " + Base64.encode64(asset.source).delete("\n")
      end
    end

  end

  # For using proxies on images where only the path is required
  class ImagePath < Jekyll::Assets::Liquid::Tag
    def initialize(tag, args, tokens)
      super("img", args, tokens)
    end

    private
    def build_html(args, sprockets, asset, path = get_path(sprockets, asset))
        path
    end

  end

  class ImageAbsolute < Jekyll::Assets::Liquid::Tag
    def initialize(tag, args, tokens)
      super("img", args, tokens)
    end

    private
    def build_html(args, sprockets, asset)
      unless asset.filename.nil?
        "file://" + asset.filename
      end
    end

  end

end


Liquid::Template.register_tag('image_path', Jekyll::ImagePath)
Liquid::Template.register_tag('img_path', Jekyll::ImagePath)

Liquid::Template.register_tag('image_base64', Jekyll::ImageBase64)
Liquid::Template.register_tag('img_base64', Jekyll::ImageBase64)

Liquid::Template.register_tag('image_absolute', Jekyll::ImageAbsolute)
Liquid::Template.register_tag('img_absolute', Jekyll::ImageAbsolute)
