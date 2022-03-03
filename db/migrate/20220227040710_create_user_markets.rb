class CreateUserMarkets < ActiveRecord::Migration[7.0]
  def change
    create_table :user_markets do |t|
      t.string :name
      t.belongs_to :user
      t.belongs_to :market

      t.timestamps
    end
  end
end
