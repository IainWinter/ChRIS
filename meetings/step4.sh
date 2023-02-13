cd ~/dev/ChRIS/ChRIS_ui
docker run --rm -d --name chris_ui -p 3000:3000 -e REACT_APP_CHRIS_UI_URL=http://localhost:8000/api/v1/ ghcr.io/fnndsc/chris_ui:latest