class ChangeUserMarketsTabletoFavorites < ActiveRecord::Migration[7.0]
  def change
    rename_table :user_markets, :favorites
  end
end
