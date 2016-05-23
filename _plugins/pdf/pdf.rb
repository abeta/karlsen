require 'pdfkit'
require 'active_support/core_ext/hash/deep_merge'
    
module Jekyll
  class PdfPage < Page
    def initialize(site, base, page)
      @site = site
      @base = base
      @dir = File.dirname(page.url)
      @name = File.basename(page.url, File.extname(page.url)) + ".pdf"
      @settings = site.config['pdf'] || {}
      @partials = ['header_html','footer_html']
    
      self.process(@name)
      self.data = page.data.clone
      self.content = page.content.clone
      
      # Set layout to the PDF layout
      self.data['layout'] = layout
      
      # Get PDF settings from the layouts
      @settings = (site.config['pdf'] || {}).deep_merge(self.getConfig(self.data))
      
      # Set pdf_url variable in the source page (for linking to the PDF version)
      page.data['pdf_url'] = self.url
      
      # Set html_url variable in the source page (for linking to the HTML version)
      self.data['html_url'] = page.url
      
      # create the partial objects
      @partials.each do |partial|
        @settings[partial] = Jekyll::PdfPartial.new(self, @settings[partial]) if @settings[partial] != nil
      end
      
      #@settings['header_html'] = Jekyll::PdfPartial.new(self, @settings['header_html']) if @settings['header_html'] != nil
      #@settings['footer_html'] = Jekyll::PdfPartial.new(self, @settings['footer_html']) if @settings['footer_html'] != nil
    end
    
    
    def layout()
      # Set page layout to the PDF layout
      layout = self.data['pdf_layout'] || @settings['layout']
      
      # Check if a PDF version exists for the current layout (e.g. layout_pdf)
      if layout == nil && self.data['layout'] != nil && File.exist?("_layouts/" + self.data['layout'] + "_pdf.html")
        layout = self.data['layout'] + "_pdf" 
      end
      
      layout || 'pdf'
    end
    
    def write(dest_prefix, dest_suffix = nil)
      self.render(@site.layouts, @site.site_payload) if self.output == nil
      
      path = File.join(dest_prefix, CGI.unescape(self.url))
      dest = File.dirname(path)
      
      # Create directory
      FileUtils.mkdir_p(dest) unless File.exist?(dest)
      
      # write partials
      @partials.each do |partial|
        @settings[partial].write if @settings[partial] != nil
      end
      
      # Debugging - create html version of PDF
      File.open("#{path}.html", 'w') {|f| f.write(self.output) } if @settings["debug"]
      @settings.delete("debug")
      
      # Build PDF file
      kit = PDFKit.new(self.output, @settings)
      file = kit.to_file(path)
      
      #self.output = kit.to_pdf
    end
    
    # Recursively merge settings from the page, layout, site config & jekyll-pdf defaults
    def getConfig(data)
      settings = data['pdf'].is_a?(Hash) ? data['pdf'] : {}
      layout = @site.layouts[data['layout']].data.clone if data['layout'] != nil
      
      # No parent layout found - return settings hash
      return settings if layout == nil
      
      # Merge settings with parent layout settings
      layout['pdf'] = (layout['pdf'] || {}).deep_merge(settings)
      
      return self.getConfig(layout)
    end
    
  end
  
end
