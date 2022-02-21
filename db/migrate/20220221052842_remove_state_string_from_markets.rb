class RemoveStateStringFromMarkets < ActiveRecord::Migration[7.0]
  def change
    change_table :markets do |t|
      t.remove :state
      t.belongs_to :state
    end
  end
end
