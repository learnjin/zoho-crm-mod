#!/bin/sh

PATH_EXTENSION="/usr/lib/firefox-addons/extensions"

# download extension
wget -O addon.xpi "$1"

# get extension UID from install.rdf
UID_ADDON=`unzip -p addon.xpi install.rdf | grep "<em:id>" | head -n 1 | sed 's/^.*>\(.*\)<.*$/\1/g'`

# move extension to default installation path
sudo unzip addon.xpi -d "$PATH_EXTENSION/$UID_ADDON"
rm addon.xpi

# set root ownership
sudo chown -R root:root "$PATH_EXTENSION/$UID_ADDON"
sudo chmod -R a+rX "$PATH_EXTENSION/$UID_ADDON"

# end message
echo "Add-on added under $PATH_EXTENSION/$UID_ADDON"

