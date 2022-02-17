# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_02_17_060607) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "favorites", force: :cascade do |t|
    t.string "name"
    t.integer "fmid"
    t.string "address"
    t.string "dates"
    t.string "times"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_favorites_on_user_id"
  end

  create_table "markets", force: :cascade do |t|
    t.string "fmid"
    t.string "marketname"
    t.string "website"
    t.string "facebook"
    t.string "twitter"
    t.string "youtube"
    t.string "othermedia"
    t.string "street"
    t.string "city"
    t.string "county"
    t.string "state"
    t.string "zip"
    t.string "season1date"
    t.string "season1time"
    t.string "season2date"
    t.string "season2time"
    t.string "season3date"
    t.string "season3time"
    t.string "season4date"
    t.string "season4time"
    t.string "x"
    t.string "y"
    t.string "location"
    t.string "credit"
    t.string "wic"
    t.string "wiccash"
    t.string "sfmnp"
    t.string "snap"
    t.boolean "organic"
    t.boolean "bakedgoods"
    t.boolean "cheese"
    t.boolean "crafts"
    t.boolean "flowers"
    t.boolean "eggs"
    t.boolean "seafood"
    t.boolean "herbs"
    t.boolean "vegetables"
    t.boolean "honey"
    t.boolean "jams"
    t.boolean "maple"
    t.boolean "meat"
    t.boolean "nursery"
    t.boolean "nuts"
    t.boolean "plants"
    t.boolean "poultry"
    t.boolean "prepared"
    t.boolean "soap"
    t.boolean "trees"
    t.boolean "wine"
    t.boolean "coffee"
    t.boolean "beans"
    t.boolean "fruits"
    t.boolean "grains"
    t.boolean "juices"
    t.boolean "mushrooms"
    t.boolean "petfood"
    t.boolean "tofu"
    t.boolean "wildharvested"
    t.string "updatetime"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "default_location"
  end

  add_foreign_key "favorites", "users"
end
