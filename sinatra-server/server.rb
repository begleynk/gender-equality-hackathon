require 'sinatra'
require 'sinatra/cross_origin'
require 'json'
require 'securerandom'

configure do
  enable :cross_origin
end

options "*" do
  response.headers["Allow"] = "HEAD,GET,PUT,POST,DELETE,OPTIONS"

  response.headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Cache-Control, Accept"

  200
end

post '/stories' do
  params = JSON.parse(request.env["rack.input"].read)
  puts params
  story_json = params["story"]
  id = SecureRandom.hex(8)
  story_json["id"] = id

  File.write("./database/#{id}", story_json.to_json.to_s)
  
  {id: id}.to_json
end

get "/stories/:id" do
  content_type :json
  File.read("./database/#{params[:id]}")
end

get "/stories" do
  content_type :json

  Dir['./database/*'].map {|name| File.read(name)}
                     .map {|raw| JSON.load(raw)}
                     .to_json
end
