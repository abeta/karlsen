require 'less'

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

  if self.respond_to?(:register_transformer)
    register_mime_type 'text/less', extensions: ['.less'], charset: :unicode
    register_transformer 'text/less', 'text/css', LESS
  end

  if self.respond_to?(:register_engine)
    args = ['.less', LESS]
    args << { mime_type: 'text/less', silence_deprecation: true } if Sprockets::VERSION.start_with?("3")
    register_engine(*args)
  end

end