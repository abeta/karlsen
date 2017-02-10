require 'jekyll-assets'
require 'mini_magick'

Jekyll::Assets::Env.liquid_proxies.add :watermark, :img, 'watermark' do
  def initialize(asset, opts, args)
    @asset = asset
    @opts = opts
    @args = args
  end

  def process
    size = FastImage.new(@asset.filename).size
    width = (size.first * 0.2).floor
    padding_x = (width * 0.15).floor
    padding_y = (width * 0.1).floor

    @logo = MiniMagick::Image.open('./_assets/images/logo-black.png')
    @img = MiniMagick::Image.open(@asset.filename)
    img = @img.composite(@logo) do |c|
      c.compose 'Over'
      c.gravity 'SouthEast'
      c.geometry "#{width}x+#{padding_x}+#{padding_y}"
    end
    img.write(@asset.filename)
  end
end
