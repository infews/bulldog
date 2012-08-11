task :default => :test

task :test => "build:dev" do
  system "rake jasmine:ci"
  system "rspec spec/integration"
end