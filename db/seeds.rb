puts "start seeding..."

puts "getting token..."

session = RestClient.get "https://opentdb.com/api_token.php?command=request"

token = JSON.parse(session)["token"]

puts "getting questions..."

Question.get_and_save_questions(token)

puts "done seeding!"