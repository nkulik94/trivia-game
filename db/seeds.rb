puts "start seeding..."

# puts "getting token..."

# session = RestClient.get "https://opentdb.com/api_token.php?command=request"

# token = JSON.parse(session)["token"]

# puts "getting questions..."

# Question.get_all_questions(token)

User.destroy_all
Admin.destroy_all


puts "Creating users..."

def user_info
    username = Faker::Beer.name
    username = username.split(' ').join('')
    name = Faker::Name.name
    info = {
    name: name,
    username: username,
    password: Faker::Alphanumeric.alphanumeric(number: 8, min_numeric: 3),
    avatar_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/#{rand(1..700)}.png",
    email: "#{name.split(' ').join('')}@fakedomain.com",
    points: 500
    }
end

User.create(user_info) until User.count == 10

User.create(name: 'Naftali', username: 'nkulik', email: 'nkulik1994@gmail.com', password: 'nkulik', points: 500, avatar_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/149.png')
User.create(name: 'joe', username: 'joe', email: 'joe@joe.com', password: 'joe', points: 500, avatar_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/#{rand(1..700)}.png")

# AdminKey.create(password: ENV['ADMIN_KEY']) unless AdminKey.find(1)

def random_boolean?
    rand(1..2) == 1
end

User.all.each do |user|
    if random_boolean?
        user.create_challenge(stakes: 100) unless user.username == 'nkulik' || user.username == 'joe'
    end
    rand(1..15).times { user.submissions.create(question: Faker::Lorem.sentence, answer: Faker::Lorem.word) }
    rand(1..15).times { user.upvotes.create(submission_id: Submission.all.sample.id) }
end

Submission.all.each do |submission|
    submission.update(reviewed: true) if random_boolean?
    submission.update(approved: random_boolean?) if submission.reviewed
    submission.update(upvotes_count: submission.upvotes.count)
end

puts "done seeding!"