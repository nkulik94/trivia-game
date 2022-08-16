puts "start seeding..."

puts "getting token..."

session = RestClient.get "https://opentdb.com/api_token.php?command=request"

token = JSON.parse(session)["token"]

puts "getting questions..."

Question.get_all_questions(token)

puts "Creating users..."

def user_info
    username = Faker::Beer.name
    username = username.split(' ').join('')
    name = Faker::Name.name
    info = {
    name: name,
    username: username,
    password: Faker::Alphanumeric.alphanumeric(number: 8, min_numeric: 3),
    avatar_url: Faker::Avatar.image,
    email: "#{name.split(' ').join('')}@fakedomain.com",
    points: 500
    }
end

User.create(user_info) until User.count == 10

def random_boolean?
    rand(1..2) == 1
end

User.all.each do |user|
    if random_boolean?
        user.create_challenge(stakes: 100)
    end
end

puts "done seeding!"