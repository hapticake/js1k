#!/usr/bin/python

# Renders the template demo.template.html using the supplied arguments to make 
# a static standalone js1k demo page.
#
# The shim that the demo is run in is based on js1k.com with some minor tweaks.

import argparse
import sys
from jinja2 import Template, StrictUndefined

# mandatory

# title             - name of demo
# handle            - user handle
# blurb             - a blurb describing what it is / what to do
# demo              - filename containing text of demo (must be <= 1k if not in test mode)

# optional

# test              - does not enforce size

# options           - max width / max height (default = 0 = full)
#                   - lock aspect ratio      (default = off)
#                   - center canvas          (default = off)
#                   - rotate restarts        (default = true)

parser = argparse.ArgumentParser(description='Build a js1k demo.')
parser.add_argument('--title', dest="title", help="name of demo", required=True)
parser.add_argument('--handle', dest="handle", help="your user nick/name/handle", required=True)
parser.add_argument('--blurb', dest="blurb", help="blurb describing what to do with demo", required=True)
parser.add_argument('--demo', dest="demo", help="filename containing demo code", required=True)

parser.add_argument('--test', dest="test", help="Testing mode (no size limit)", action="store_true", default=False)
parser.add_argument('--max_width', dest="max_width", help="Max canvas width (default=0=full)", default=0, type=int, required=False)
parser.add_argument('--max_height', dest="max_height", help="Max canvas height (default=0=full)", default=0, type=int, required=False)
parser.add_argument('--lock_ratio', dest="lock_ratio", help="Lock Aspect Ratio (default=false)", default=False, type=bool, required=False)
parser.add_argument('--center_canvas', dest="center_canvas", help="Center canvas (default=false)", default=False, type=bool, required=False)
parser.add_argument('--rotate_restarts', dest="rotate_restarts", help="Rotate on restart (default=false)", default=False, type=bool, required=False)

args = parser.parse_args()

with open(args.demo) as f:
    args.democode = f.read()

if not args.test:
    if (len(args.democode) > 1024):
        print("demo rejected - size is too big %d bytes" % len(args.democode))
        sys.exit(1)
else:
    args.title += " TESTMODE TESTMODE TESTMODE TESTMODE"

with open('demo.template.html') as f:
    template_data = f.read()

t = Template(template_data)
t.environment.undefined = StrictUndefined

tvars = vars(args)

for k,v in tvars.iteritems():
    if (isinstance(v,bool)):
        if tvars[k]:
            tvars[k] = "true"
        else:
            tvars[k] = "false"

print(t.render(user = tvars))
