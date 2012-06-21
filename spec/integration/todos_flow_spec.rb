require 'spec_helper'

describe 'A User, when viewing To Dos', :type => :request, :js => true do

  before do
    visit '/bulldog.html'
  end

  it 'should be able to navigate between todos' do
    # todos should be selected in the nav bar

    # projects should be selected in the tabs
    # All should be selected in the list
    # there should be tasks

    # click a new project

    # tasks display should hide project name

    # list selection should change
    # tasks should be correct

    # click contexts
    # tab selection should change
    # tasks should change, only showing context

    # tasks display should hide context

    # click a new context
    # tasks should be correct

    # click next actions
    # tab selection should change
    # tasks should change, only showing next actions

  end
end