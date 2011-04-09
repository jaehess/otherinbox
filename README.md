# Tic-tac-toe game in SproutCore Using Jasmine

# Prerequisites

- Has been tested under Ruby 1.9.2-p136.
- Has been tested under SproutCore gem sproutcore version 1.5.0.pre.5
- I develop under OSX 10.6.8.  On other systems, YMMV.

# Pre-installation

If you really want to avoid "gem hell" issues, use **Ruby Version Manager** (**rvm**) to configure a pristine "exactly right" Ruby version and exactly the gem set you need.  I show you the versions I'm presently using for the "rubie" and gemset; I recommend you use those until you get things running.  Then change either one to your taste if you like.

Here's how:

    Install [rvm](https://rvm.beginrescueend.com/)
    $ rvm install ruby-1.9.2-p136
    $ rvm gemset create otherinbox
    $ rvm gemset use otherinbox
    $ gem install sproutcore -v 1.5.0.pre.5

The last command will take several minutes.

# Installation

    $ cd <your directory containing your projects>
    $ git clone git@github.com:erichocean/otherinbox.git
    $ cd otherinbox
    $ cd frameworks
    $ git clone https://github.com/gmoeck/jasmine-sproutcore.git
    $ git clone https://github.com/FrozenCanuck/Ki.git ki
    $ cd ..

# Setting the Default Rubie and Gemset for this SproutCore Application

*NOTE: Only do this if you are using **rvm** as described in the top section:*

So that **rvm** configures automatically to the rubie and gemset specified above, create a command file named '.rvmrc' with the following contents as in the following commands:

    $ echo rvm 1.9.2-p136@otherinbox >.rvmrc

Configure the rubie and gemset by executing the **.rvmrc** file using the following command:

    $ cd ../otherinbox

Note: you only have to do this once.  The next time you enter the project directory, this will happen automatically.

# Running the Application

    $ sc-server

# To see the application

- http://localhost:4020/otherinbox shows the application.

# To run the tests

- http://localhost:4020/otherinbox/en/current/tests.html
