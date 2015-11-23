all: clean build

build:
	cd ../book && make && cd ../site && $$(which node) build.js ../book/out/ughcode.html

deploy_heroku:
	git checkout heroku && git push heroku heroku:master

deploy_gh:
	git checkout master && git push central master

clean:
	rm -rf www/*.html