class CreateMarkets < ActiveRecord::Migration[7.0]
  def change
    create_table :markets do |t|
      t.string :fmid
      t.string :marketname
      t.string :website
      t.string :facebook
      t.string :twitter
      t.string :youtube
      t.string :othermedia
      t.string :street
      t.string :city
      t.string :county
      t.string :state
      t.string :zip
      t.string :season1date
      t.string :season1time
      t.string :season2date
      t.string :season2time
      t.string :season3date
      t.string :season3time
      t.string :season4date
      t.string :season4time
      t.string :x
      t.string :y
      t.string :location
      t.string :credit
      t.string :wic
      t.string :wiccash
      t.string :sfmnp
      t.string :snap
      t.boolean :organic
      t.boolean :bakedgoods
      t.boolean :cheese
      t.boolean :crafts
      t.boolean :flowers
      t.boolean :eggs
      t.boolean :seafood
      t.boolean :herbs
      t.boolean :vegetables
      t.boolean :honey
      t.boolean :jams
      t.boolean :maple
      t.boolean :meat
      t.boolean :nursery
      t.boolean :nuts
      t.boolean :plants
      t.boolean :poultry
      t.boolean :prepared
      t.boolean :soap
      t.boolean :trees
      t.boolean :wine
      t.boolean :coffee
      t.boolean :beans
      t.boolean :fruits
      t.boolean :grains
      t.boolean :juices
      t.boolean :mushrooms
      t.boolean :petfood
      t.boolean :tofu
      t.boolean :wildharvested
      t.string :updatetime

      t.timestamps
    end
  end
end
