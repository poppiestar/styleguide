Living Styleguide Project (Untitled)
====================================

This is currently a prototype project to develop a JavaScript-based component UI
library, based on the principles developed by Lonely Planet's [Rizzo](https://github.com/lonelyplanet/rizzo/)
project (of which I worked on for a while, alongside a bunch of far cleverer 
developers than me!).

As it stands now, it provides a _component_ method that can be called within a
template. When passed the name of the template and a rendering context, the 
compenent will be rendered into the page. There are a couple of example components
in this repository to demonstrate how I see components should be organised
and developed, however I'm open to all suggestions on how everything may be improved.

At the moment, this is all prototype code so please be gentle about what you might
see. I have loads of ideas for the direction where I'd like to see this project head,
some are probably insane or impossible.

If anyone out there is interested in helping me knock this project into a real solution
I would be eternally grateful. This whole world of living styleguides and styleguide-driven
development has become one of the most talked about areas in the front-end world lately
and there are many solutions being put forward. Having worked with various solutions over
the last few years, I remain convinced this is the best approach to developing a component
library that can be tied together with a living styleguide. Most of this code has been
heavily based on Rizzo, with various improvements made to file organisation.

The future
----------

Part of my vision for this project is to be able to install it as an npm module,
but to also include an executable that starts a web server for you to view your project's
styleguide, as well as a set of tools to help refactor and improve your code base. One
(very rough!) example is a colour scanner that finds any colours in your SASS files so
you can easily track down any duplicates.

Right now, the templates are written in Jade - this was not a deliberate choice, I'm
completely open to changing this to something more cross-platform.

There are also some technical problems I've run into that I'd like to solve, such as
nesting components within another, that I've not managed to find a solution to yet.

Thanks
------

I take no credit for any of these ideas, it's just my implementation. I offer the majority
of credit to [Ian Feather](https://github.com/Ianfeather) who went through multiple iterations
to get Rizzo to a usable state, as well as everyone at Lonely Planet who helped bring his
ideas to fruition.

