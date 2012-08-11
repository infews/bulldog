require 'jammit'
require 'haml'
require 'tilt'

module Jasmine
  class Config

    # Override to pull source files in from JAMMIT configuration
    def src_files
      root = File.dirname(__FILE__) + '/../../..'

      # Compile app body html for use in test
      app_body = Tilt.new("#{root}/app/html/app_body.html.haml").render
      File.open("#{root}/spec/helpers/app_body.js", 'w') do |f|
        app_body.gsub!(/\n/, "")
        f << "var appBody = \"#{app_body}\";"
      end

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