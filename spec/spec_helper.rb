require 'capybara/rspec'

RSpec.configure do |config|
  Capybara.default_driver = :selenium
  #Capybara.app = Rack::File.new("build/dev/bulldog.html")
end
