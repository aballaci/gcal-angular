#!/bin/sh
npm run release && scp -r dist/* root@h2770347.stratoserver.net:/var/www/html
