module Jekyll
    module AssetFilter
        def img_size(input) 
            require 'fastimage'
            FastImage.size(input)
        end
    end
    
end

Liquid::Template.register_filter(Jekyll::AssetFilter)