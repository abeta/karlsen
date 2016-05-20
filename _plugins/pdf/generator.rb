module Jekyll
  class PdfGenerator < Generator
    safe true
    priority :lowest

    def generate(site)
      # Build an array of all posts, pages & collection docs.
      sources = []
      sources.push(site.pages)
      site.collections.each do |collection|
        sources.push(collection.last.docs)
      end
      
      # Loop through items and build PDFs
      sources.each do |items|
        items.each do |item|
          site.static_files << PdfPage.new(site, site.source, item) if item.data['pdf']
        end
      end
      
    end
    
  end
end
