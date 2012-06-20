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

  desc "build CSS"
  task :dev_css do
    del_file "#{root}/build/dev/*.css"
    system "compass compile ."
  end

  desc "build HTML for development"
  task :dev => [:dev_assets, :dev_css] do
    dev_html = "#{root}/build/dev/bulldog.html"

    del_file dev_html

    context = OpenStruct.new(
      :head => Tilt.new("#{html_dir}/css_js_dev.html.haml").render,
      :app_body => Tilt.new("#{html_dir}/app_body.html.haml").render,
      :about_box => Tilt.new("#{html_dir}/about_box.md").render,
      :bottom => ""
    )

    render_bulldog dev_html, context
  end

  desc "build assets for release"
  task :rel_assets => :dev_css do
    del_file "#{root}/build/rel/all.js"
    del_file "#{root}/build/rel/all.css"

    system "cp #{root}/config/release_assets.yml #{root}/config/assets.yml"
    system "jammit -o #{root}/build/release"
  end

  desc "build HTML for release"
  task :rel => :rel_assets do
    rel_html = "#{root}/build/release/index.html"

    del_file rel_html

    bottom_context = OpenStruct.new(
      :js => File.read("#{root}/build/release/all.js"),
      :css => File.read("#{root}/build/release/all.css")
    )

    context = OpenStruct.new(
      :head => "",
      :app_body => Tilt.new("#{html_dir}/app_body.html.haml").render,
      :about_box => Tilt.new("#{html_dir}/about_box.md").render,
      :bottom => Tilt.new("#{html_dir}/css_js_rel.html.haml").render(bottom_context)
    )

    render_bulldog rel_html, context
  end

  def render_bulldog(file, locals)
    File.open(file, 'w') do |f|
      f << Tilt.new("#{root}/app/html/bulldog.html.haml").render(locals)
    end
  end

  def del_file(filepath)
    FileUtils.rm(filepath) if File.exist?(filepath)
  end

  def config_dir
    "#{root}/config"
  end

  def html_dir
    "#{root}/app/html"
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