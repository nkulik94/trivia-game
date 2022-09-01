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

ActiveRecord::Schema[7.0].define(version: 2022_09_01_183130) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admin_keys", force: :cascade do |t|
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "admins", force: :cascade do |t|
    t.string "username"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email"
  end

  create_table "challenges", force: :cascade do |t|
    t.integer "user_id"
    t.integer "stakes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "games", force: :cascade do |t|
    t.integer "stakes"
    t.integer "player_1_winnings", default: 0
    t.integer "player_2_winnings", default: 0
    t.integer "pool"
    t.integer "user_id"
    t.integer "player_2_id"
    t.integer "buzzed_by_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "player_1_turn"
    t.string "message", default: "Starting in..."
    t.integer "current_stakes"
    t.boolean "awaiting_form", default: false
    t.integer "current_question_id"
    t.string "current_answer"
  end

  create_table "games_questions", id: false, force: :cascade do |t|
    t.bigint "game_id", null: false
    t.bigint "question_id", null: false
  end

  create_table "questions", force: :cascade do |t|
    t.string "category"
    t.string "difficulty"
    t.string "question"
    t.string "correct_answer"
    t.string "all_answers_string"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "submissions", force: :cascade do |t|
    t.integer "user_id"
    t.string "question"
    t.string "answer"
    t.boolean "reviewed", default: false
    t.boolean "approved", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "upvotes_count", default: 0
  end

  create_table "upvotes", force: :cascade do |t|
    t.integer "user_id"
    t.integer "submission_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.integer "points"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "avatar_url"
    t.integer "wins", default: 0
    t.integer "losses", default: 0
    t.boolean "is_admin", default: false
  end

end
