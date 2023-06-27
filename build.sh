docker stop foda
docker rm   foda
docker rmi  foda

docker build -t foda .
docker run -d -it -p 15000:15000 --name=foda foda