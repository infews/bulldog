require 'erb'
require 'tilt'
require 'fileutils'
require 'ostruct'

namespace :build do

  task :del_assets_yml do
    del_file 'assets.yml'
  end

  task :del_dev_assets do
    Dir.glob("#{root}/build/dev/*.js").each { |f| del_file f }
  end

  desc "Build assets for development"
  task :dev_assets => [:del_assets_yml, :del_dev_assets] do
    write_assets_yml :dev
    system "jammit -o #{root}/build/dev"
  end

  desc "build HTML for development"
  task :dev => :dev_assets do
    bulldog_dev = "#{root}/build/dev/bulldog.html"

    del_file bulldog_dev

    single_page = Tilt.new("#{root}/app/html/bulldog.html.haml")

    File.open(bulldog_dev, 'w') do |f|
      f << single_page.render
    end
  end

  def del_file(filepath)
    FileUtils.rm(filepath) if File.exist?(filepath)
  end

  def config_dir
    "#{root}/config"
  end

  def write_assets_yml(mode)
    context = context_for mode

    template = Tilt.new("#{root}/config/assets.yml.erb")
    Dir.chdir(config_dir) do
      File.open('assets.yml', 'w') do |f|
        f << template.render(context)
      end
    end

  end

  def context_for(mode)
    cxt = nil
    Dir.chdir(config_dir) do
      cxt = OpenStruct.new(
        :options => File.read("#{mode}_options.yml"),
        :lib_js => File.read("#{mode}_lib.yml")
      )
    end
    cxt
  end
end