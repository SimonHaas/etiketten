Bei Rechtecken ist der Nullpunkt oben links
Beim Text ist der Nullpunkt unten links

docker buildx create --use
docker buildx build --platform linux/amd64,linux/arm64 --push -t registry.simon-haas.eu/etiketten .

docker build . -t registry.simon-haas.eu/etiketten
docker push registry.simon-haas.eu/etiketten