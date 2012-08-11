require 'spec_helper'

describe 'A User viewing To Dos', :type => :request, :js => true do

  before do
    visit '/bulldog.html'

    wait_until { page.has_content? 'Bulldog' }
  end

  it 'should be able to navigate between projects, contexts, and next actions' do

    # todos should be selected in the nav bar
    active_top_nav = page.find('.navbar.navbar-fixed-top li.active')
    active_top_nav.should have_content('To Do')

    # projects should be selected in the tabs
    active_left_nav_tab = page.find('nav ul.nav-tabs li.active')
    active_left_nav_tab.should have_content('+')

    # All should be selected in the list
    active_left_list = page.find('nav ul.nav-pills li.active')
    active_left_list.should have_content('All')

    # there should be tasks on the right
    page.all('section.tasks .task').length.should > 0

    # click on a new left nav tab
    page.find('.main nav ul.nav-tabs li.contexts a').click

    wait_until {
      active_left_nav_tab = page.find('nav ul.nav-tabs li.active')
      active_left_nav_tab.has_content?('@')
    }

    # there should be tasks on the right
    page.all('section.tasks .task').length.should > 0

    # click on a new left nav list item
    page.all('nav .items li a')[3].click

    wait_until {
      active_left_list_item = page.find('nav .items li.active')
      active_left_list_item.has_content?('Pc')
    }

    # there should be tasks on the right
    page.all('section.tasks .task').length.should > 0
  end
end