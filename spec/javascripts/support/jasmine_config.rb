require 'jammit'
module Jasmine
  class Config

    root = File.dirname(__FILE__) + '/../../..'

    Jammit.package!({
      :config_path => "#{root}/config/templates.yml",
      :output_folder => "#{root}/spec/helpers"
    })

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
