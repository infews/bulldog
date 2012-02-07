# Bulldog
## An HTML viewer for Todo.Txt

Be tenacious, like a bulldog, on your task list.

Bulldog is a single-page HTML view of your [todo.txt](http://http://todotxt.com/) file. Use the [command line interface](http://https://github.com/ginatrapani/todo.txt-cli/downloads) for capture, editing, and completing tasks. But if you want something a little bit more "app-y" for managing your tasks, Bulldog is for you.

## Installation

Bulldog is released as a single HTML file via the [Downloads page](http://github.com/infews/bulldog/downloads), called `index.html`, that needs to live in the same directory as your `todo.txt` file.

You will also need to set up a web server to point to this directory or configure your browser to allow AJAX requests from a `file://` URL. Bulldog makes an AJAX request to read in `todo.txt`

This isn't very user-friendly at this point in time. 

For these examples, I keep my `todo.txt` file (and all of my Todo.txt stuff) in `/Users/dwf/Dropbox/todo`.

### Via HTTP and a Local Web Server

These steps work on MacOS 10.7 (Lion), serving Bulldog via the built-in web server (Apache 2). Please look up the equivalent steps for your operating system and web server.

1. Make a symlink from Apache's directory to your ToDo.txt directory: `ln -s /Users/dwf/Dropbox/todo /Library/WebServer/Documents/todo`
1. Restart Apache by visiting the `Sharing` pane under `System Preferences`, and turning `Web Sharing` off (if it's on) and then on
1. Copy Bulldog's `index.html` to `/Users/dwf/Dropbox/todo`
1. Visit `http://localhost/todo`

### Via the Local File Protocol

With some tweaking of your browser settings, `file://path/to/index.html` will work

* Safari: no change needed
* Firefox: enable "cross domain AJAX requests" via config settings; this differs across versions of Firefox, so you'll need to Google it
* Chrome/Chromium: launch the executable with the `--disable-web-security` flag set

## Usage

Bulldog is a read-only view of your tasks. It is not meant as a replacement for the command line interface. Use the CLI for operations on tasks and then view the new state in Bulldog.

When you open Bulldog, you see all of your tasks in the pane on the right. You should see each task's number, the action of the task, as well as its context and project. Contexts are set with the '@' syntax, and Projects with the '+' syntax.

The left column defaults to showing you all of your projects, including the 'All' project that shows all tasks and the '(none)' project for tasks that have no project assigned. Clicking on a project shows all of the tasks for that project, sorted by number. The left column's tabs allow you to toggle between grouping by project and grouping by context.

If you've updated or added any tasks, just reload your browser to refresh the tasks.

## Roadmap?

* Make it easier to install
* Add some concept of "Next Action" - is this a syntax addition? Or is priority 'A' enough?
* Display priority of a task
* Editing tasks & storing back to `todo.txt` - this would require a server, which may be out of scope

## Implementation

Bulldog is a single-page HTML application. It uses jQuery and Backbone.js (which means it also uses Underscore.js) to read in the todo.txt file via AJAX, build out local data objects (Backbone models & collections), and then display the tasks and UI.

The base CSS and navigation UI are from Twitter's Bootstrap.

All of the CSS and JavaScript is included inline so that no server is required.

## Contributions

I welcome contributions and suggestions. Any code changes should include tests.

## License

Bulldog is &copy; Infews LLC and is provided under the MIT License.

