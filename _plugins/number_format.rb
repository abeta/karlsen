module Jekyll
  module NumberFormat
    def number_format(value, decimals = 0, delimiter = ',', point = '.')
      ##
      # Converts an integer to a string containing commas every three digits.
      # For example, 3000 becomes '3,000' and 45000 becomes '45,000'.
      # Optionally supports a delimiter override for commas.
      #
      # Usage:
      # {{ post.content | number_of_words }} >>> 12345
      # {{ post.content | number_of_words | intcomma }} >>> '12,345'
      # {{ post.content | number_of_words | intcomma: '.' }} >>> '12.345'

      begin
        orig = (value || 0).to_s
        delimiter = delimiter.to_s
        point = point.to_s

        orig = "%#{point}#{decimals}f" % orig if decimals > 0
      rescue Exception => e
        puts "#{e.class} #{e}"
        return value
      end

      copy = orig.strip
      copy = orig.gsub(/^(-?\d+)(\d{3})/, "\\1#{delimiter}\\2")
      orig == copy ? copy : number_format(copy, decimals, delimiter, point)
    end
  end
end

Liquid::Template.register_filter(Jekyll::NumberFormat)
