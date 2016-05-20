require "jekyll-assets"

class Jekyll::ImageBase64 < Jekyll::Assets::Liquid::Tag

  def initialize(tag, args, tokens)
    #print args
    super("img", args, tokens)
  end

  private
  def build_html(args, sprockets, asset)
    require 'base64'
    "data:" + get_mime(get_path(sprockets, asset)) + ";base64, " + Base64.encode64(asset.source).delete("\n")
    
  end
  
  private
  def get_mime(path)
    get_mime = {
      ".art" => "image/x-jg",
      ".bmp" => "image/bmp",
      ".cmx" => "image/x-cmx",
      ".cod" => "image/cis-cod",
      ".dib" => "image/bmp",
      ".gif" => "image/gif",
      ".ico" => "image/x-icon",
      ".ief" => "image/ief",
      ".jfif" => "image/pjpeg",
      ".jpe" => "image/jpeg",
      ".jpeg" => "image/jpeg",
      ".jpg" => "image/jpeg",
      ".mac" => "image/x-macpaint",
      ".pbm" => "image/x-portable-bitmap",
      ".pct" => "image/pict",
      ".pgm" => "image/x-portable-graymap",
      ".pic" => "image/pict",
      ".pict" => "image/pict",
      ".png" => "image/png",
      ".pnm" => "image/x-portable-anymap",
      ".pnt" => "image/x-macpaint",
      ".pntg" => "image/x-macpaint",
      ".pnz" => "image/png",
      ".ppm" => "image/x-portable-pixmap",
      ".qti" => "image/x-quicktime",
      ".qtif" => "image/x-quicktime",
      ".ras" => "image/x-cmu-raster",
      ".rf" => "image/vnd.rn-realflash",
      ".rgb" => "image/x-rgb",
      ".tif" => "image/tiff",
      ".tiff" => "image/tiff",
      ".wbmp" => "image/vnd.wap.wbmp",
      ".wdp" => "image/vnd.ms-photo",
      ".xbm" => "image/x-xbitmap",
      ".xpm" => "image/x-xpixmap",
      ".xwd" => "image/x-xwindowdump",
    }
    return get_mime[File.extname(path)]
  end
  

end

Liquid::Template.register_tag('image_base64', Jekyll::ImageBase64)
Liquid::Template.register_tag('img_base64', Jekyll::ImageBase64)