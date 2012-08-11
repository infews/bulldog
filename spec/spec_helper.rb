require 'capybara/rspec'
require 'capybara-webkit'
require 'rack'

RSpec.configure do |config|
  config.before :suite do
    system 'rake build:dev > /dev/null'
  end

  Capybara.default_driver = :selenium
  Capybara.javascript_driver = :webkit
  Capybara.app = Rack::File.new("build/dev")
end
