#!/bin/sh
npm run build:ssr && scp -r dist root@h2770347.stratoserver.net:/var/www/html
