# Skip unpublished pages & documents
Jekyll::Hooks.register :site, :pre_render do |jekyll|
  jekyll.pages.delete_if { |i| i.data['published'] == false || i.data['published'] == 0 }

  jekyll.collections.each do |collection|
    collection.last.docs.delete_if { |i| i.data['published'] == false || i.data['published'] == 0 }
  end
end
