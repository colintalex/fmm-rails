require 'csv'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
Market.destroy_all
State.destroy_all

def import_csv_data
  CSV.foreach(Rails.root.join('db/seed_data/2022_markets.csv'), headers: true, :header_converters => lambda { |h| h.try(:downcase) }) do |row|
    if row.to_h['state'].nil? 
      state = State.find_by(name: 'EMPTY')
      if state.nil?
        state = State.create(name: 'EMPTY')
      end
    else
      state = State.find_by(name: row.to_h['state'].downcase)
      if state.nil?
        state = State.create!(name: row.to_h['state'].downcase)
      end
    end

    state.markets.create(row.to_h.except('state'))
  end
end

import_csv_data