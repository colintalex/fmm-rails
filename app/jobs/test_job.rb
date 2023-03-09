class TestJob < RocketJob::Job
  def perform
    puts "Hello World" 
  end
end