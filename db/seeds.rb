require 'csv'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

def import_csv_data
  CSV.foreach(Rails.root.join('db/seed_data/2022_markets.csv'), headers: true, :header_converters => lambda { |h| h.try(:downcase) }) do |row|
    Market.create(row.to_h)
  end
end
