require 'spec_helper'

describe Sinatra::Server do
  it 'has a version number' do
    expect(Sinatra::Server::VERSION).not_to be nil
  end

  it 'does something useful' do
    expect(false).to eq(true)
  end
end
