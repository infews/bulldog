require 'spec_helper'

describe 'When clicking on "about"', :type => :request, :js => true do

  before do
    visit '/bulldog.html'

    wait_until { page.has_content? 'Bulldog'}
  end

  it 'should show the user an about box' do
    click_link 'About'

    modal = page.find('.modal')

    modal.should be_visible
    modal.should have_content('Bulldog')
    modal.should have_content('v0.4.0')
    modal.should have_content('Infews LLC')
    modal.should have_content('Pivotal Tracker')
    modal.should have_content('todo.txt')
  end
end