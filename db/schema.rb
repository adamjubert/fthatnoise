# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170210221550) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comments", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "idea_id",    null: false
    t.text     "body",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "idea_type",  null: false
    t.index ["idea_id", "idea_type"], name: "index_comments_on_idea_id_and_idea_type", using: :btree
    t.index ["user_id"], name: "index_comments_on_user_id", using: :btree
  end

  create_table "contacts", force: :cascade do |t|
    t.string   "email",      null: false
    t.text     "message",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "events", force: :cascade do |t|
    t.integer  "creator_id",  null: false
    t.string   "title",       null: false
    t.string   "address",     null: false
    t.string   "city",        null: false
    t.string   "state",       null: false
    t.text     "description", null: false
    t.date     "date",        null: false
    t.time     "start_time",  null: false
    t.time     "end_time"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "address2"
    t.float    "latitude"
    t.float    "longitude"
    t.index ["creator_id"], name: "index_events_on_creator_id", using: :btree
  end

  create_table "idea_categories", force: :cascade do |t|
    t.integer  "idea_id",     null: false
    t.string   "idea_type",   null: false
    t.integer  "category_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["category_id"], name: "index_idea_categories_on_category_id", using: :btree
    t.index ["idea_id", "idea_type"], name: "index_idea_categories_on_idea_id_and_idea_type", using: :btree
  end

  create_table "suggestions", force: :cascade do |t|
    t.integer  "creator_id",  null: false
    t.string   "title",       null: false
    t.text     "description", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["creator_id"], name: "index_suggestions_on_creator_id", using: :btree
  end

  create_table "upvotes", force: :cascade do |t|
    t.integer  "idea_id"
    t.string   "idea_type"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.integer  "user_id",                        null: false
    t.string   "status",     default: "pending", null: false
    t.index ["idea_type", "idea_id"], name: "index_upvotes_on_idea_type_and_idea_id", using: :btree
    t.index ["user_id"], name: "index_upvotes_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                           null: false
    t.string   "username",                        null: false
    t.string   "password_digest",                 null: false
    t.boolean  "admin",           default: false, null: false
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.string   "session_token",                   null: false
    t.integer  "zip_code"
    t.index ["username"], name: "index_users_on_username", unique: true, using: :btree
  end

end
