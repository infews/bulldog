# Bulldog
## An HTML viewer for Todo.Txt

Be tenacious, like a bulldog, on your task list.

Bulldog is a single-page HTML view of your [todo.txt](http://http://todotxt.com/) file. Use the [command line interface](http://https://github.com/ginatrapani/todo.txt-cli/downloads) for capture, editing, and completing tasks. But if you want something a little bit more "app-y" for managing your tasks, Bulldog is for you.

## Installation

Bulldog is released as a single HTML file, called `index.html`, that needs to live in the same directory as your `todo.txt` file.

You will also need to set up a web server to point to this directory or configure your browser to allow AJAX requests from a `file://` URL. Bulldog makes an AJAX request to read in `todo.txt`

This isn't very user-friendly at this point in time. 

## Usage

Bulldog is a read-only view of your tasks. It is not meant as a replacement for the command line interface. Use the CLI for operations on tasks and then view the new state in Bulldog.

When you open Bulldog, you see all of your tasks in the pane on the right. You should see each task's number, the action of the task, as well as its context and project. Contexts are set with the '@' syntax, and Projects with the '+' syntax.

The left column defaults to showing you all of your projects, including the 'All' project that shows all tasks and the '(none)' project for tasks that have no project assigned. Clicking on a project shows all of the tasks for that project, sorted by number. The left column's tabs allow you to toggle between grouping by project and grouping by context.

If you've updated or added any tasks, just reload your browser to refresh the tasks.

## Roadmap?

* Make it easier to install
* Display priority of a task
* Add some concept of "Next Action" - is this a syntax addition? Or is priority 'A' enough?
* Editing tasks & storing back to `todo.txt`? Maybe, but this would require a server...

## Implementation

Bulldog is a single-page HTML application. It uses jQuery and Backbone.js (which means it also uses Underscore.js) to read in the todo.txt file via AJAX, build out local data objects (Backbone models & collections), and then display the tasks and UI.

The base CSS and navigation UI from Twitter's Bootstrap.

All of the CSS and JavaScript is included inline so that no server is required.

## Contributions

I welcome contributions and suggestions. Any code changes should include tests.

## License

Bulldog is &copy; Infews LLC and is provided under the MIT License.

