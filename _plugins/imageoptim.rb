require 'jekyll-assets'
require 'image_optim'

Jekyll::Assets::Env.liquid_proxies.add :image_optim, :img, 'optimize' do
  def initialize(asset, _opts, _args)
    @path = asset.filename
    @image_optim = ::ImageOptim.new
  end

  def process
    @image_optim.optimize_image!(@path)
  end
end
