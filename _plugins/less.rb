module Sprockets
  class LESS

    class << self
      def instance
        @instance ||= new
      end

      def call(input)
        instance.call(input)
      end
    end

    def call(input)
      data = input[:data]
      paths = [input[:load_path]]
      paths += Dir.glob(input[:load_path] + '/*').select {|f| File.directory? f}
      parser = Less::Parser.new(paths: paths)
      parser.parse(data).to_css
    end
  end

  register_mime_type 'text/less', extensions: ['.less'], charset: :unicode
  register_transformer 'text/less', 'text/css', LESS
  register_engine '.less', LESS
end