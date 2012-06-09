require 'jammit'
module Jasmine
  class Config

    # Override to pull source files in from JAMMIT configuration
    def src_files
      root = File.dirname(__FILE__) + '/../../..'

      # Compile templates each time, put them in the helpers dir as template.js
      Jammit.package!({
        :config_path => "#{root}/config/templates.yml",
        :output_folder => "#{root}/spec/helpers"
      })

      # app lib & src files, from JAMMIT config
      options = ''
      lib_js =  File.read("#{root}/config/dev_lib.yml")
      jammit_config = YAML::load(ERB.new(File.read("#{root}/config/assets.yml.erb")).result(binding))
      files = jammit_config['javascripts']['lib'] + jammit_config['javascripts']['app']

      # remove .mustache files & init file
      files.reject! {|f| f.match(/mustache$/) || f.match(/init.js$/) }

      match_files(src_dir, files)
    end
  end
end


# Note - this is necessary for rspec2, which has removed the backtrace
module Jasmine
  class SpecBuilder
    def declare_spec(parent, spec)
      me = self
      example_name = spec["name"]
      @spec_ids << spec["id"]
      backtrace = @example_locations[parent.action + " " + example_name]
      parent.it example_name, {} do
        me.report_spec(spec["id"])
      end
    end
  end
end
