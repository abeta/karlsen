require 'base64'

module Jekyll
  class ImgBase64 < Liquid::Tag

    def initialize(tag_name, path, tokens)
      super
      @path = path.strip
    end

    def render(context)
      "data:" + self.mime + ";base64, " + Base64.encode64(File.read(@path)).delete("\n")
    end
    
    def mime()
      mimetypes = {
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
        ".xwd" => "image/x-xwindowdump"
      }
      mimetypes[File.extname(@path)]
    end
  end
end

Liquid::Template.register_tag('imgbase64', Jekyll::ImgBase64)