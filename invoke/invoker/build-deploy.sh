rm -rf device/ simulator/ invoker.zip
zip invoker.zip * -r
~/Documents/ci/packager4/bbwp -d invoker.zip
blackberry-deploy -installapp -launchapp -device 169.254.0.1 -password qaqa -package device/invoker.bar
