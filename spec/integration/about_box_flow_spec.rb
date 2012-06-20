require 'spec_helper'

describe 'When clicking on "about"', :type => :request, :js => true do

  it 'should show the user an about box' do

    visit 'bulldog.html'

    click_link 'About'

    page.find('.modal').should be_visible

    # should have the heading
    # should show the version
    # should show the copyright notice
  end
end