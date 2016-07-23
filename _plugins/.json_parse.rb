module Jekyll
    module JsonFilter
        require 'json'
        def json_parse(input) 
            JSON.parse(input)
        end
        def json_clean(input) 
            JSON.parse(input).to_json
        end
    end
    
end

Liquid::Template.register_filter(Jekyll::JsonFilter)