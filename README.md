# js1k demos

## Demos

This repository contains scripts and templates for building and sharing js1k demos.
The demos currently use the 2018 js1k rules and shim (canvas only).

The submission rules for the demo code are fairly simple. The demo :

    Must be no greater than 1024 bytes.
    Must not load any external resource.
    Must run in the shim provided on both firefox and chrome.

By default, the size limit of 1024 bytes is enforced, but can be overridden with the --test flag.

To build a demo (with test flag, no size limit), do this :

    ./make_demo.py --title example --handle mycoolnick --blurb "Left/right keys and space. Get coins, avoid boulders" \
        --demo example.js --lock_ratio true --center_canvas true --max_width 320 --max_height 320 --test > example.html

To build a demo for final submission (size must be <= 1024 bytes), do this :

    ./make_demo.py --title example --handle mycoolnick --blurb "Left/right keys and space. Get coins, avoid boulders" \
        --demo example_mini.js --lock_ratio true --center_canvas true --max_width 320 --max_height 320 > example.html

To publish the final submission, do this:

    Pick a unique filename for your demo
    Add the non minified source to the repo
    Add the minified source to the repo
    Add the generated file to the repo
    Add a link to your demo in index.html e.g. - <a href="example.html">example</a>
    Commit and push to master
    Hard reload the index page at https://hapticake.github.io/js1k/
    Click your link and check that it runs.
    You can also visit your demo at https://hapticake.github.io/js1k/example.html

It can take a few minutes for github/CDN to refresh changes if you are modifying an existing page.

To keep things working and reasonable, please don't modify the demo template or
the make demo script without consultation.

## Tips

The generated pages can easily be run locally from your own disk.

There are online tools available for crushing javascript, such as:

        http://www.iteral.com/jscrush/


